import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomerFormModal from '../components/customers/CustomerFormModal';
import FilterBar from '../components/common/FilterBar';
import CustomersGridView from '../components/customers/CustomersGridView';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [currentEditCustomer, setCurrentEditCustomer] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, id: null, title: '' });
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [statusFilter, setStatusFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const getInitials = (name) => {
    if (!name) return 'UN';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/customers');
      const fetchedData = res.data?.data || res.data || res || [];
      setCustomers(Array.isArray(fetchedData) ? fetchedData : []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSaveCustomer = async (formData) => {
    try {
      if (currentEditCustomer) {
        await axiosClient.put(`/customers/${currentEditCustomer._id}`, formData);
        toast.success('Customer updated successfully');
      } else {
        await axiosClient.post('/customers', formData);
        toast.success('Customer added successfully');
      }
      fetchCustomers();
      setIsCustomerModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save customer');
    }
  };

  const handleEditClick = (customer) => {
    setCurrentEditCustomer(customer);
    setIsCustomerModalOpen(true);
  };

  const handleDeleteCustomer = async () => {
    if (!confirmDeleteModal.id) return;
    try {
      await axiosClient.delete(`/customers/${confirmDeleteModal.id}`);
      toast.success('Customer deleted successfully');
      fetchCustomers();
      setConfirmDeleteModal({ isOpen: false, id: null, title: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete customer');
    }
  };

  const hasFilters = startDate || endDate || statusFilter || cityFilter;

  const uniqueCities = Array.from(new Set(customers.map(c => c.city).filter(Boolean))).sort();
  const dynamicCityOptions = [
    { value: '', label: 'All Cities' },
    ...uniqueCities.map(city => ({ value: city, label: city }))
  ];

  const filterConfig = [
    {
      type: 'date',
      value: dateRange,
      onChange: setDateRange,
      placeholder: "Select Date Range"
    },
    {
      type: 'select',
      value: cityFilter,
      onChange: setCityFilter,
      options: dynamicCityOptions
    },
    {
      type: 'select',
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: '', label: 'All Status' },
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Blocked', label: 'Blocked' }
      ]
    }
  ];

  const clearFilters = () => {
    setDateRange([null, null]);
    setStatusFilter('');
    setCityFilter('');
  };

  const filteredCustomers = customers.filter(c => {
    let match = true;
    if (startDate && endDate) {
      const cDate = new Date(c.created_at);
      const start = new Date(startDate);
      start.setHours(0,0,0,0);
      const end = new Date(endDate);
      end.setHours(23,59,59,999);
      if (cDate < start || cDate > end) match = false;
    }
    if (statusFilter && c.status?.toLowerCase() !== statusFilter.toLowerCase()) match = false;
    if (cityFilter && c.city?.toLowerCase() !== cityFilter.toLowerCase()) match = false;
    return match;
  });
  // Pagination state for contacts
        
  const columns = [
    {
      name: 'Customer ID',
      sortable: true,
      selector: row => row.customer_id || row.id,
      cell: (row) => <span className="text-primary fw-semibold">{row.customer_id ? row.customer_id : `#${row.id}`}</span>,
      minWidth: '100px'
    },
    {
      name: 'Name',
      sortable: true,
      selector: row => row.name,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-md border avatar-rounded me-2">
            {row.avatar ? (
              <>
                <img 
                  src={row.avatar} 
                  className="img-fluid" 
                  alt="img" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if(e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="align-items-center justify-content-center bg-primary text-white fs-13 fw-semibold w-100 h-100 rounded-circle" style={{ display: 'none' }}>
                  {getInitials(row.name)}
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center bg-primary text-white fs-13 fw-semibold w-100 h-100 rounded-circle">
                {getInitials(row.name)}
              </div>
            )}
          </Link>
          <h6 className="fw-medium mb-0"><Link to="#">{row.name}</Link></h6>
        </div>
      ),
      minWidth: '220px'
    },
    {
      name: 'Contact',
      sortable: true,
      selector: row => row.email,
      cell: (row) => (
        <div>
          <span className="fs-13 fw-normal text-muted d-block">{row.email || '-'}</span>
          <span className="fs-12 fw-normal text-muted d-block mt-1">{row.phone || '-'}</span>
        </div>
      ),
      minWidth: '200px'
    },
    {
      name: 'Location',
      sortable: true,
      selector: row => row.city,
      cell: (row) => (
        <div>
          <span className="fs-13 fw-normal text-muted d-block">{[row.city, row.state].filter(Boolean).join(", ") || '-'}</span>
          <span className="fs-12 fw-normal text-muted d-block mt-1">{row.country || '-'}</span>
        </div>
      ),
      minWidth: '180px'
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
      cell: (row) => {
        let badgeClass = "badge-soft-secondary";
        let textClass = "text-secondary";
        if (row.status === "Active") {
          badgeClass = "bg-success-transparent";
          textClass = "text-success";
        } else if (row.status === "Inactive") {
          badgeClass = "bg-warning-transparent";
          textClass = "text-warning";
        } else if (row.status === "Blocked") {
          badgeClass = "bg-danger-transparent";
          textClass = "text-danger";
        }
        return (
          <span className={`badge ${badgeClass} ${textClass} d-inline-flex align-items-center badge-xs text-capitalize`}>
            <i className="ti ti-point-filled me-1"></i>{row.status}
          </span>
        );
      },
      minWidth: '120px'
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" onClick={(e) => { e.preventDefault(); handleEditClick(row); }}><i className="ti ti-edit"></i></Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); setConfirmDeleteModal({ isOpen: true, id: row._id, title: row.name }); }}><i className="ti ti-trash"></i></Link>
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
					title="Manage your E-Commerce customers"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'E-Commerce' },
						{ label: viewMode === 'list' ? 'Customers List' : 'Customers Grid', active: true }
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
						
						<div className="mb-2">
							<a href="#" onClick={(e) => { e.preventDefault(); setCurrentEditCustomer(null); setIsCustomerModalOpen(true); }}
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>New Customer</a>
						</div>
					
				</PageHeader>
				{/* /Breadcrumb */}

				{/*orders List */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>{viewMode === 'list' ? 'Customers List' : 'Customers Grid'}</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
              <FilterBar 
                filters={filterConfig} 
                onClear={clearFilters} 
                hasActiveFilters={hasFilters} 
              />
						</div>
					</div>
					<div className="card-body p-0">
						{viewMode === 'list' ? (
							<div className="custom-datatable-filter table-responsive">
								<CustomDataTable columns={columns} data={filteredCustomers} />
							</div>
						) : (
							<div className="p-3">
								<CustomersGridView 
                  data={filteredCustomers}
                  onEditClick={handleEditClick}
                  onDeleteClick={(row) => setConfirmDeleteModal({ isOpen: true, id: row._id, title: row.name })}
                />
							</div>
						)}
					</div>
				</div>
				{/* /customers list */}

			</div>


		</div>
		<CustomerFormModal 
      open={isCustomerModalOpen} 
      onClose={() => setIsCustomerModalOpen(false)} 
      onSave={handleSaveCustomer}
      initialData={currentEditCustomer}
    />

    {/* Delete Confirmation Modal */}
    {confirmDeleteModal.isOpen && (
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Customer</h5>
              <button type="button" className="btn-close" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '' })} aria-label="Close"></button>
            </div>
            <div className="modal-body text-center py-4">
              <i className="ti ti-alert-circle text-danger mb-3" style={{ fontSize: '48px' }}></i>
              <h5 className="mb-2">Are you sure?</h5>
              <p className="text-muted mb-0">Do you really want to delete the customer <strong>{confirmDeleteModal.title}</strong>? This process cannot be undone.</p>
            </div>
            <div className="modal-footer justify-content-center border-0 pt-0">
              <button className="btn btn-light px-4" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '' })}>Cancel</button>
              <button className="btn btn-danger px-4" onClick={handleDeleteCustomer}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Customers;
