import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import ClientStatCard from '../components/common/ClientStatCard';
import { clientsData } from './clientsData';
import ClientsGridView from '../components/clients/ClientsGridView';
import ClientFormModal from '../components/clients/ClientFormModal';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import ConfirmationModal from '../components/ConfirmationModal';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';

const Clients = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [statusFilter, setStatusFilter] = useState('');
  const [customerTypeFilter, setCustomerTypeFilter] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState('');
  const [clientNameFilter, setClientNameFilter] = useState('');
  const [companyNameFilter, setCompanyNameFilter] = useState('');
  const [stats, setStats] = useState({});
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [clientToDelete, setClientToDelete] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchClients();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosClient.get('/users');
      setUsers(res);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axiosClient.get('/clients');
      setClients(res);
    } catch (err) {
      console.error("Failed to fetch clients", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axiosClient.get('/clients/stats');
      setStats(res);
    } catch (err) {
      console.error("Failed to fetch client stats", err);
    }
  };

  const renderStatChange = (statDetail) => {
    if (!statDetail) return "+0.00%";
    const sign = statDetail.is_positive ? "+" : "-";
    return `${sign}${statDetail.percent_change.toFixed(2)}%`;
  };

  const getStatIcon = (statDetail) => {
    if (!statDetail) return "ti-arrow-wave-right-down";
    return statDetail.is_positive ? "ti-arrow-wave-right-up" : "ti-arrow-wave-right-down";
  };

  const hasFilters = startDate || endDate || statusFilter || customerTypeFilter || clientTypeFilter || clientNameFilter || companyNameFilter;

  const getInitials = (name) => {
    if (!name) return 'C';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const clearFilters = () => {
    setDateRange([null, null]);
    setStatusFilter('');
    setCustomerTypeFilter('');
    setClientTypeFilter('');
    setClientNameFilter('');
    setCompanyNameFilter('');
  };

  const getUniqueOptions = (key, label, valueMapper = null) => {
    if (!Array.isArray(clients)) return [{ value: '', label }];
    const uniqueVals = [...new Set(clients.map(c => c[key]).filter(Boolean))];
    return [
      { value: '', label },
      ...uniqueVals.map(val => ({
        value: val,
        label: valueMapper ? valueMapper(val) : (typeof val === 'string' ? val.charAt(0).toUpperCase() + val.slice(1) : val)
      }))
    ];
  };

  const statusOptions = getUniqueOptions('status', 'All Status');
  const customerTypeOptions = getUniqueOptions('customer_type', 'All Customer Types');
  const clientTypeOptions = [
    { value: '', label: 'All Client Types' },
    { value: 'Manual', label: 'Manually Added' },
    { value: 'Converted', label: 'Converted from Lead' }
  ];
  const clientNameOptions = getUniqueOptions('client_name', 'All Client Names');
  const companyNameOptions = getUniqueOptions('company_name', 'All Company Names');

  const filteredClients = React.useMemo(() => {
    if (!Array.isArray(clients)) return [];
    return clients.filter(c => {
      if (statusFilter && c.status !== statusFilter) return false;
      if (customerTypeFilter && c.customer_type !== customerTypeFilter) return false;
      if (clientTypeFilter) {
        if (clientTypeFilter === 'Manual' && c.converted_from_lead_id !== 'Manual') return false;
        if (clientTypeFilter === 'Converted' && (c.converted_from_lead_id === 'Manual' || !c.converted_from_lead_id)) return false;
      }
      if (clientNameFilter && c.client_name !== clientNameFilter) return false;
      if (companyNameFilter && c.company_name !== companyNameFilter) return false;
      if (startDate && endDate && c.created_at) {
        const d = new Date(c.created_at);
        if (d < startDate || d > endDate) return false;
      }
      return true;
    });
  }, [clients, statusFilter, customerTypeFilter, clientTypeFilter, clientNameFilter, companyNameFilter, startDate, endDate]);

  const getExportColumns = () => [
    { 
      header: 'Client Name', 
      type: 'avatar',
      getAvatar: row => row.clientAvatar,
      getName: row => row.client_name,
      getSubText: row => row.company_name
    },
    { header: 'Email', selector: row => row.email },
    { header: 'Mobile', selector: row => row.mobile_number },
    { header: 'Customer Type', selector: row => row.customer_type },
    { header: 'Client Type', selector: row => row.converted_from_lead_id === "Manual" ? "Manually Added" : "Converted from Lead" },
    { header: 'Contract Value', selector: row => row.contract_value ? `₹${row.contract_value}` : '-' },
    { header: 'Assigned To', selector: row => {
        const assignedUser = users.find(u => (u._id || u.id) === row.assigned_to);
        return assignedUser ? assignedUser.name : (row.assigned_to || '-');
      } 
    },
    { header: 'Status', selector: row => row.status }
  ];

  const exportToExcelHandler = (e) => {
    e.preventDefault();
    exportToExcel('Clients_Export', getExportColumns(), filteredClients);
  };

  const exportToPDFHandler = (e) => {
    e.preventDefault();
    exportToPDF('Clients List', getExportColumns(), filteredClients);
  };

  const handleEdit = (client) => {
    setClientToEdit({
      ...client,
      phone: client.mobile_number,
      client_role: client.contact_person
    });
    setIsClientModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!clientToDelete) return;
    try {
      await axiosClient.delete(`/clients/${clientToDelete._id}`);
      toast.success("Client deleted successfully");
      fetchClients();
      fetchStats();
      setClientToDelete(null);
    } catch (err) {
      console.error("Failed to delete client", err);
      toast.error("Failed to delete client");
    }
  };

  const columns = [
    {
      name: 'Client id',
      sortable: true,
      selector: row => row.client_id || row._id,
      cell: (row) => <Link to="/client-details">{row.client_id || row._id}</Link>,
    },
    {
      name: 'Client name',
      sortable: true,
      selector: row => row.client_name,
      cell: (row) => (
        <div className="d-flex align-items-center file-name-icon">
          <Link to="/client-details" className="avatar avatar-md border avatar-rounded flex-shrink-0">
            {row.clientAvatar ? (
              <img src={row.clientAvatar} className="img-fluid" alt="img" />
            ) : (
              <div className="avatar-title bg-primary rounded-circle text-white" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 {getInitials(row.client_name || row.company_name)}
              </div>
            )}
          </Link>
          <div className="ms-2">
            <h6 className="fw-medium mb-0"><Link to="/client-details">{row.client_name}</Link></h6>
          </div>
        </div>
      ),
    },
    {
      name: 'Company name',
      sortable: true,
      selector: row => row.company_name,
    },
    {
      name: 'Contact person',
      sortable: true,
      selector: row => row.contact_person,
    },
    {
      name: 'Email',
      sortable: true,
      selector: row => row.email,
    },
    {
      name: 'Mobile',
      sortable: true,
      selector: row => row.mobile_number,
    },
    {
      name: 'Customer type',
      sortable: true,
      selector: row => row.customer_type,
    },
    {
      name: 'Client type',
      sortable: true,
      selector: row => row.converted_from_lead_id === "Manual" ? "Manually Added" : "Converted from Lead",
    },
    {
      name: 'Contract value (₹)',
      sortable: true,
      selector: row => row.contract_value ? `₹${row.contract_value}` : '-',
    },
    {
      name: 'Account manager',
      sortable: true,
      selector: row => row.assigned_to,
      cell: (row) => {
        if (!row.assigned_to) return '-';
        const user = users.find(u => (u._id || u.id) === row.assigned_to);
        return user ? user.name : row.assigned_to;
      }
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
      cell: (row) => (
        <span className={`badge badge-${(row.status || '').toLowerCase() === 'active' ? 'success' : 'danger'} d-inline-flex align-items-center badge-xs`}>
          <i className="ti ti-point-filled me-1"></i>{row.status || 'Active'}
        </span>
      ),
    },
    {
      name: 'Created at',
      sortable: true,
      selector: row => row.created_at ? new Date(row.created_at).toLocaleDateString() : '',
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" onClick={(e) => { e.preventDefault(); handleEdit(row); }}><i className="ti ti-edit"></i></Link>
          <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_modal" onClick={(e) => { e.preventDefault(); setClientToDelete(row); }}><i className="ti ti-trash"></i></Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Clients"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM & Sales' },
						{ label: viewMode === 'list' ? 'Client List' : 'Client Grid', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="#" onClick={(e) => { e.preventDefault(); setViewMode('list'); }} className={`btn btn-icon btn-sm me-1 ${viewMode === 'list' ? 'active bg-primary text-white' : ''}`}><i
										className="ti ti-list-tree"></i></a>
								<a href="#" onClick={(e) => { e.preventDefault(); setViewMode('grid'); }} className={`btn btn-icon btn-sm ${viewMode === 'grid' ? 'active bg-primary text-white' : ''}`}><i
										className="ti ti-layout-grid"></i></a>
							</div>
						</div>
						<div className="me-2 mb-2">
							<div className="dropdown">
								<a href="#" onClick={(e) => e.preventDefault()}
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									<i className="ti ti-file-export me-1"></i>Export
								</a>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<a href="#" onClick={exportToPDFHandler} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
									</li>
									<li>
										<a href="#" onClick={exportToExcelHandler} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
									</li>
								</ul>
							</div>
						</div>
						<div className="mb-2">
							<a href="#" onClick={(e) => { e.preventDefault(); setClientToEdit(null); setIsClientModalOpen(true); }}
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Client</a>
						</div>
						
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Clients Info */}
				<div className="row">
					<ClientStatCard 
						title="Total Clients"
						value={stats?.total_clients?.count || "0"}
						icon="ti ti-users-group"
						iconBgClass="bg-pink-transparent border border-pink"
						iconColorClass="text-pink"
						badgeClass={`bg-transparent-${stats?.total_clients?.is_positive ? 'success text-success' : 'danger text-danger'}`}
						badgeIcon={`ti ${getStatIcon(stats?.total_clients)}`}
						percentage={renderStatChange(stats?.total_clients)}
					/>
					<ClientStatCard 
						title="Active Clients"
						value={stats?.active_clients?.count || "0"}
						icon="ti ti-user-share"
						iconBgClass="bg-success-transparent border border-success"
						iconColorClass=""
						badgeClass={`bg-transparent-${stats?.active_clients?.is_positive ? 'success text-success' : 'danger text-danger'}`}
						badgeIcon={`ti ${getStatIcon(stats?.active_clients)}`}
						percentage={renderStatChange(stats?.active_clients)}
					/>
					<ClientStatCard 
						title="Inactive Clients"
						value={stats?.inactive_clients?.count || "0"}
						icon="ti ti-user-pause"
						iconBgClass="bg-danger-transparent border border-danger"
						iconColorClass=""
						badgeClass={`bg-transparent-${stats?.inactive_clients?.is_positive ? 'success text-success' : 'danger text-danger'}`}
						badgeIcon={`ti ${getStatIcon(stats?.inactive_clients)}`}
						percentage={renderStatChange(stats?.inactive_clients)}
					/>
					<ClientStatCard 
						title="New Clients"
						value={stats?.new_clients?.count || "0"}
						icon="ti ti-user-plus"
						iconBgClass="bg-info-transparent border border-info"
						iconColorClass=""
						badgeClass={`bg-transparent-${stats?.new_clients?.is_positive ? 'success text-success' : 'danger text-danger'}`}
						badgeIcon={`ti ${getStatIcon(stats?.new_clients)}`}
						percentage={renderStatChange(stats?.new_clients)}
					/>
				</div>
				{/* /Clients Info */}

				{/* Clients list */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>{viewMode === 'list' ? 'Client List' : 'Client Grid'}</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="me-3" style={{ minWidth: '220px' }}>
								<CustomDatePicker 
									isRange={true}
									startDate={startDate}
									endDate={endDate}
									onChange={(update) => setDateRange(update)}
									placeholderText="Select Date Range"
								/>
							</div>
							<div className="me-3 custom-select-wrapper" style={{ width: '130px' }}>
								<CustomSelect 
									options={statusOptions}
									value={statusOptions.find(o => o.value === statusFilter)}
									onChange={(selected) => setStatusFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="me-3 custom-select-wrapper" style={{ width: '150px' }}>
								<CustomSelect 
									options={customerTypeOptions}
									value={customerTypeOptions.find(o => o.value === customerTypeFilter)}
									onChange={(selected) => setCustomerTypeFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="me-3 custom-select-wrapper" style={{ width: '130px' }}>
								<CustomSelect 
									options={clientTypeOptions}
									value={clientTypeOptions.find(o => o.value === clientTypeFilter)}
									onChange={(selected) => setClientTypeFilter(selected ? selected.value : '')}
								/>
							</div>
              <div className="me-3 custom-select-wrapper" style={{ width: '140px' }}>
								<CustomSelect 
									options={clientNameOptions}
									value={clientNameOptions.find(o => o.value === clientNameFilter)}
									onChange={(selected) => setClientNameFilter(selected ? selected.value : '')}
								/>
							</div>
              <div className="me-3 custom-select-wrapper" style={{ width: '150px' }}>
								<CustomSelect 
									options={companyNameOptions}
									value={companyNameOptions.find(o => o.value === companyNameFilter)}
									onChange={(selected) => setCompanyNameFilter(selected ? selected.value : '')}
								/>
							</div>
							{hasFilters ? (
								<div className="ms-2">
									<button 
										className="btn btn-outline-danger btn-sm d-flex align-items-center"
										onClick={clearFilters}
									>
										<i className="ti ti-x me-1"></i>Clear
									</button>
								</div>
							) : null}
						</div>
					</div>
							<div className="card-body p-0">
								{viewMode === 'list' ? (
									<div className="custom-datatable-filter table-responsive">
										<CustomDataTable columns={columns} data={filteredClients} />
									</div>
								) : (
									<div className="p-3">
										<ClientsGridView 
                      clients={filteredClients} 
                      users={users}
                      handleEdit={handleEdit} 
                      setClientToDelete={setClientToDelete} 
                    />
									</div>
								)}
							</div>
					</div>
				</div>
				{/* /Clients list */}

			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		
		
		
		<ClientFormModal 
			open={isClientModalOpen} 
			onClose={() => { setIsClientModalOpen(false); setClientToEdit(null); }} 
			onSuccess={() => { fetchClients(); fetchStats(); }}
			clientData={clientToEdit}
		/>
    <ConfirmationModal 
      id="delete_modal"
      onConfirm={confirmDelete}
      title="Delete Client"
      description={`Are you sure you want to delete client "${clientToDelete?.client_name || clientToDelete?.company_name}"? This action cannot be undone.`}
    />
    </>
  );
};

export default Clients;
