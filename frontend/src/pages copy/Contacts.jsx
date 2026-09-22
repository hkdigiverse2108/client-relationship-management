import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import { contactsData } from './contactsData';


const Contacts = () => {
  // Pagination state for contacts
        
  const columns = [
    {
      name: (
        <div className="form-check form-check-md">
          <input className="form-check-input" type="checkbox" id="select-all" />
        </div>
      ),
      cell: (row) => (
        <div className="form-check form-check-md">
          <input className="form-check-input" type="checkbox" />
        </div>
      ),
      width: '60px',
    },
    {
      name: 'Name',
      sortable: true,
      selector: row => row.name,
      cell: (row) => (
        <div className="d-flex align-items-center file-name-icon">
          <Link to="/contact-details" className="avatar avatar-md border avatar-rounded">
            <img src={row.avatar} className="img-fluid" alt="img" />
          </Link>
          <div className="ms-2">
            <h6 className="fw-medium"><Link to="/contact-details">{row.name}</Link></h6>
            <span className="fs-12 fw-normal ">{row.role}</span>
          </div>
        </div>
      ),
      minWidth: '200px'
    },
    {
      name: 'Email',
      sortable: true,
      selector: row => row.email,
    },
    {
      name: 'Phone',
      sortable: true,
      selector: row => row.phone,
    },
    {
      name: 'Location',
      sortable: true,
      selector: row => row.location,
    },
    {
      name: 'Rating',
      sortable: true,
      selector: row => row.rating,
      cell: (row) => (
        <span className="d-flex align-items-center">
          <i className="ti ti-star-filled text-warning me-2"></i>{row.rating}
        </span>
      ),
    },
    {
      name: 'Owner',
      sortable: true,
      selector: row => row.owner,
    },
    {
      name: 'Contact',
      cell: (row) => (
        <ul className="contact-icon d-flex align-items-center ">
          <li><Link to="#" className="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span className="d-flex align-items-center justify-content-center"><i className="ti ti-mail text-gray-5"></i></span></Link></li>
          <li><Link to="#" className="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span className="d-flex align-items-center justify-content-center"><i className="ti ti-phone-call text-gray-5"></i></span></Link></li>
          <li><Link to="#" className="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span className="d-flex align-items-center justify-content-center"><i className="ti ti-message-2 text-gray-5"></i></span></Link></li>
          <li><Link to="#" className="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span className="d-flex align-items-center justify-content-center"><i className="ti ti-brand-skype text-gray-5"></i></span></Link></li>
          <li><Link to="#" className="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span className="d-flex align-items-center justify-content-center"><i className="ti ti-brand-facebook text-gray-5"></i></span></Link></li>
        </ul>
      ),
      minWidth: '220px'
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
      cell: (row) => (
        <span className="badge badge-success d-inline-flex align-items-center badge-xs">
          <i className="ti ti-point-filled me-1"></i>{row.status}
        </span>
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" data-bs-toggle="modal" data-bs-target="#edit_contact"><i className="ti ti-edit"></i></Link>
          <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash"></i></Link>
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
					title="Contacts"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Contacts List', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<Link to="/contacts" className="btn btn-icon btn-sm active bg-primary text-white me-1"><i
										className="ti ti-list-tree"></i></Link>
								<Link to="/contacts-grid" className="btn btn-icon btn-sm"><i
										className="ti ti-layout-grid"></i></Link>
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
										<Link to="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-pdf me-1"></i>Export as PDF</Link>
									</li>
									<li>
										<Link to="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-xls me-1"></i>Export as Excel </Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="mb-2">
							<Link to="#" data-bs-toggle="modal" data-bs-target="#add_contact"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Contact</Link>
						</div>
						<div className="head-icons ms-2">
							<Link to="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</Link>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Contact List */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Contact List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="me-3">
								<div className="input-icon position-relative">
									<span className="input-icon-addon">
										<i className="ti ti-calendar text-gray-9"></i>
									</span>
									<input type="text" className="form-control date-range bookingrange"
										placeholder="dd/mm/yyyy - dd/mm/yyyy" />
								</div>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Status
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Active</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Inactive</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Sort By : Last 7 Days
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Recently Added</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Ascending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Descending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Last Month</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Last 7 Days</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
							<div className="card-body p-0">
						

<div className="custom-datatable-filter table-responsive">
							<CustomDataTable columns={columns} data={contactsData} />


						</div>
					</div>
				</div>
				{/* /Contact List */}

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <Link to="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</Link></p>
			</div>

		</div>
		
    </>
  );
};

export default Contacts;
