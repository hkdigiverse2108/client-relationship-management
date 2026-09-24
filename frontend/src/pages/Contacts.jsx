import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import { contactsData } from './contactsData';
import ContactFormModal from '../components/contacts/ContactFormModal';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import ContactsKanbanView from '../components/contacts/ContactsKanbanView';
import ConfirmationModal from '../components/ConfirmationModal';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';

const Contacts = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [statusFilter, setStatusFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  
  const [contactToEdit, setContactToEdit] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Dynamically derive filter options from contacts
  const deptOptions = React.useMemo(() => {
    const depts = [...new Set(contacts.map(c => c.department).filter(Boolean))];
    return [{ value: '', label: 'All Depts' }, ...depts.map(d => ({ value: d, label: d }))];
  }, [contacts]);

  const companyOptions = React.useMemo(() => {
    const companies = [...new Set(contacts.map(c => c.company_name).filter(Boolean))];
    return [{ value: '', label: 'All Companies' }, ...companies.map(c => ({ value: c, label: c }))];
  }, [contacts]);

  const tagOptions = React.useMemo(() => {
    const allTags = [];
    contacts.forEach(c => {
      if (c.tags) {
        c.tags.split(',').map(t => t.trim()).filter(Boolean).forEach(t => allTags.push(t));
      }
    });
    const uniqueTags = [...new Set(allTags)];
    return [{ value: '', label: 'All Tags' }, ...uniqueTags.map(t => ({ value: t, label: t }))];
  }, [contacts]);

  const fetchContacts = async () => {
    try {
      const res = await axiosClient.get('/contacts');
      setContacts(res || []);
      setFilteredContacts(res || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts');
    }
  };

  React.useEffect(() => {
    fetchContacts();
  }, []);

  React.useEffect(() => {
    let result = [...contacts];

    // Filter by Date Range
    if (startDate && endDate) {
      result = result.filter(contact => {
        const cDate = new Date(contact.created_at);
        return cDate >= startDate && cDate <= endDate;
      });
    }

    // Filter by Status
    if (statusFilter) {
      result = result.filter(contact => (contact.status || '').toLowerCase() === statusFilter.toLowerCase());
    }

    // Filter by Department
    if (deptFilter) {
      result = result.filter(contact => (contact.department || '').toLowerCase() === deptFilter.toLowerCase());
    }

    // Filter by Company
    if (companyFilter) {
      result = result.filter(contact => (contact.company_name || '').toLowerCase() === companyFilter.toLowerCase());
    }

    // Filter by Tag
    if (tagFilter) {
      result = result.filter(contact => (contact.tags || '').toLowerCase().includes(tagFilter.toLowerCase()));
    }

    setFilteredContacts(result);
  }, [contacts, startDate, endDate, statusFilter, deptFilter, companyFilter, tagFilter]);

  const hasFilters = startDate || endDate || statusFilter || deptFilter || companyFilter || tagFilter;

  const clearFilters = () => {
    setDateRange([null, null]);
    setStatusFilter('');
    setDeptFilter('');
    setCompanyFilter('');
    setTagFilter('');
  };

  const getInitials = (name) => {
    if (!name) return 'UN';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  // Pagination state for contacts
        
  const columns = [

    {
      name: 'Contact persona',
      sortable: true,
      selector: row => row.contact_name,
      cell: (row) => (
        <div className="d-flex align-items-center file-name-icon">
          <Link to="/contact-details" className="avatar border rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', overflow: 'hidden' }}>
            {row.avatar ? (
              <img src={row.avatar} className="img-fluid rounded-circle" alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-primary text-white fs-14 fw-semibold rounded-circle">
                {getInitials(row.contact_name)}
              </div>
            )}
          </Link>
          <div className="ms-2">
            <h6 className="fw-medium"><Link to="/contact-details">{row.contact_name || '-'}</Link></h6>
            <span className="fs-12 fw-normal ">{row.department || 'No Dept'}</span>
          </div>
        </div>
      ),
      minWidth: '200px'
    },
    {
      name: 'Company',
      sortable: true,
      selector: row => row.company_name,
      cell: row => row.company_name || '-'
    },
    {
      name: 'Phone',
      sortable: true,
      selector: row => row.contact_number,
      cell: row => row.contact_number || '-'
    },
    {
      name: 'Email',
      sortable: true,
      selector: row => row.email,
      cell: row => row.email || '-'
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
      cell: (row) => {
        const isActive = (row.status || '').toLowerCase() === 'active';
        return (
          <span className={`badge badge-${isActive ? 'success' : 'danger'} d-inline-flex align-items-center badge-xs`}>
            <i className="ti ti-point-filled me-1"></i>{row.status || 'Active'}
          </span>
        );
      },
    },
    {
      name: 'City',
      sortable: true,
      selector: row => row.city,
      cell: row => row.city || '-'
    },
    {
      name: 'Created',
      sortable: true,
      selector: row => row.created_at,
      cell: row => (
        <span>{row.created_at ? new Date(row.created_at).toLocaleDateString() : '-'}</span>
      )
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" onClick={(e) => { e.preventDefault(); setContactToEdit(row); setIsContactModalOpen(true); }}><i className="ti ti-edit"></i></Link>
          <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_modal" onClick={() => setContactToDelete(row)}><i className="ti ti-trash"></i></Link>
        </div>
      ),
    },
  ];

	const handleDelete = async () => {
		if (!contactToDelete) return;
		try {
		  await axiosClient.delete(`/contacts/${contactToDelete._id}`);
		  toast.success('Contact deleted successfully');
		  fetchContacts();
		} catch (error) {
		  console.error("Error deleting contact:", error);
		  toast.error(error.response?.data?.detail || "Failed to delete contact");
		}
	};

  const exportColumns = [
    { 
      header: 'Contact Name', 
      type: 'avatar',
      getAvatar: row => row.avatar,
      getName: row => row.contact_name,
      getSubText: row => row.department
    },
    { header: 'Company Name', selector: row => row.company_name },
    { header: 'Email', selector: row => row.email },
    { header: 'Phone', selector: row => row.contact_number },
    { header: 'Status', selector: row => row.status },
    { header: 'City', selector: row => row.city }
  ];

  const handleExportPDF = () => {
    exportToPDF('Contacts List', exportColumns, filteredContacts);
  };

  const handleExportExcel = () => {
    exportToExcel('Contacts_Export', exportColumns, filteredContacts);
  };

	return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Contacts"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM & Sales' },
						{ label: viewMode === 'list' ? 'Contacts List' : 'Contacts Grid', active: true }
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
								<Link to="#" onClick={(e) => e.preventDefault()}
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									<i className="ti ti-file-export me-1"></i>Export
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" onClick={(e) => { e.preventDefault(); handleExportPDF(); }} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-pdf me-1"></i>Export as PDF</Link>
									</li>
									<li>
										<Link to="#" onClick={(e) => { e.preventDefault(); handleExportExcel(); }} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-xls me-1"></i>Export as Excel </Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="mb-2">
							<a href="#" onClick={(e) => { e.preventDefault(); setContactToEdit(null); setIsContactModalOpen(true); }}
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Contact</a>
						</div>
					
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Contact List */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>{viewMode === 'list' ? 'Contact List' : 'Contact Grid'}</h5>
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
							<div className="me-3 custom-select-wrapper" style={{ width: '140px' }}>
								<CustomSelect 
									options={[
										{ value: '', label: 'All Status' },
										{ value: 'active', label: 'Active' },
										{ value: 'inactive', label: 'Inactive' }
									]}
									value={statusFilter ? { value: statusFilter, label: statusFilter === 'active' ? 'Active' : 'Inactive' } : { value: '', label: 'All Status' }}
									onChange={(selected) => setStatusFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="me-3 custom-select-wrapper" style={{ width: '140px' }}>
								<CustomSelect 
									options={deptOptions}
									value={deptFilter ? { value: deptFilter, label: deptFilter } : { value: '', label: 'All Depts' }}
									onChange={(selected) => setDeptFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="me-3 custom-select-wrapper" style={{ width: '150px' }}>
								<CustomSelect 
									options={companyOptions}
									value={companyFilter ? { value: companyFilter, label: companyFilter } : { value: '', label: 'All Companies' }}
									onChange={(selected) => setCompanyFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="custom-select-wrapper" style={{ width: '130px' }}>
								<CustomSelect 
									options={tagOptions}
									value={tagFilter ? { value: tagFilter, label: tagFilter } : { value: '', label: 'All Tags' }}
									onChange={(selected) => setTagFilter(selected ? selected.value : '')}
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
								<CustomDataTable columns={columns} data={filteredContacts} />
							</div>
						) : (
							<div className="p-3">
								<ContactsKanbanView 
									contacts={filteredContacts}
									onEdit={(e, contact) => { e.preventDefault(); setContactToEdit(contact); setIsContactModalOpen(true); }}
									onDelete={(e, contact) => { e?.preventDefault(); setContactToDelete(contact); }}
								/>
							</div>
						)}
					</div>
				</div>
				{/* /Contact List */}

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <Link to="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</Link></p>
			</div>

		</div>
		<ContactFormModal 
			open={isContactModalOpen} 
			onClose={() => {
				setIsContactModalOpen(false);
				setContactToEdit(null);
			}} 
			onSuccess={fetchContacts} 
			contactData={contactToEdit}
		/>
		<ConfirmationModal 
			id="delete_modal"
			onConfirm={handleDelete}
			title="Delete Contact"
			description={`Are you sure you want to delete "${contactToDelete?.contact_name}"? This action cannot be undone.`}
		/>
    </>
  );
};

export default Contacts;
