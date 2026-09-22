import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Faq = () => {
  // Pagination state for faq
  const [currentPage_faq, setCurrentPage_faq] = useState(1);
  const [rowsPerPage_faq, setRowsPerPage_faq] = useState(10);
  const [searchQuery_faq, setSearchQuery_faq] = useState('');
  return (
    <>
      <div className="page-wrapper">
			{/* Start Content */}
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Faq"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Content' },
						{ label: 'Faq', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_faq"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add New Faq</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>FAQ List</h5>
					</div>
							<div className="card-body p-0">
						
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_faq}
											onChange={(e) => { setRowsPerPage_faq(Number(e.target.value)); setCurrentPage_faq(1); }}
										>
											<option value={10}>10</option>
											<option value={20}>20</option>
											<option value={50}>50</option>
										</select>
									</div>
									<div className="input-icon-start position-relative">
										<span className="input-icon-addon">
											<i className="ti ti-search"></i>
										</span>
										<input
											type="text"
											className="form-control form-control-sm"
											placeholder="Search"
											value={searchQuery_faq}
											onChange={(e) => { setSearchQuery_faq(e.target.value); setCurrentPage_faq(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
							<table className="table datatable">
								<thead className="thead-light">
									<tr>
										<th className="no-sort">
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" id="select-all" />
											</div>
										</th>
										<th>Questions</th>
										<th>Answers</th>
										<th>Categories</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">What is an HRMS?</a></h6>
										</td>
										<td>Software system that automates and manages various human resources tasks
										</td>
										<td>General</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_faq"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">How does an HRMS benefit
													organizations?</a></h6>
										</td>
										<td>It enhances operational efficiency, reduces manual errors, and centralizes
											HR tasks</td>
										<td>General</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_faq"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">Is the data stored in an SmartHR
													secure?</a></h6>
										</td>
										<td>Yes, SmartHR is design with advanced security measures, including data
											encryption</td>
										<td>Feature</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_faq"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">How do I add a new employee to the
													HRMS?</a></h6>
										</td>
										<td>Add new employees by entering their personal details & setting up their
											profiles.</td>
										<td>Employee</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_faq"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">How do I generate custom reports in the
													SmartHR?</a></h6>
										</td>
										<td>Custom reports can be generated using the reporting module within the HRMS
										</td>
										<td>Reports</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_faq"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">How do I schedule training sessions in the
													HRMS?</a></h6>
										</td>
										<td>Creating training events, setting dates and times, and enrolling employees
										</td>
										<td>Leaves</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_faq"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">How do I process payroll in the
													SmartHR?</a></h6>
										</td>
										<td>Reviewing employee hours and deductions and executing payments.</td>
										<td>Payroll</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_faq"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">How do I export reports from the HRMS?</a>
											</h6>
										</td>
										<td>Export reports by selecting the desired report format and using the export
											function</td>
										<td>Reports</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_faq"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">Can I track employee attendance and
													absences?</a></h6>
										</td>
										<td>Yes, track attendance and absences by using the attendance management</td>
										<td>Employee</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_faq"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">Is the data stored in an SmartHR
													secure?</a></h6>
										</td>
										<td>Yes, SmartHR is design with advanced security measures, including data
											encryption</td>
										<td>Employee</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_faq"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">How does an HRMS benefit
													organizations?</a></h6>
										</td>
										<td>It enhances operational efficiency, reduces manual errors, and centralizes
											HR tasks</td>
										<td>Tickets</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_faq"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_faq - 1) * rowsPerPage_faq + 1, 11)}-{Math.min(currentPage_faq * rowsPerPage_faq, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_faq === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_faq(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_faq === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_faq(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_faq === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_faq(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>

			</div>
			{/* End Content */}

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default Faq;
