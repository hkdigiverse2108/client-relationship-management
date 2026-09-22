import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Testimonials = () => {
  // Pagination state for testimonials
  const [currentPage_testimonials, setCurrentPage_testimonials] = useState(1);
  const [rowsPerPage_testimonials, setRowsPerPage_testimonials] = useState(10);
  const [searchQuery_testimonials, setSearchQuery_testimonials] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Testimonials"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Content' },
						{ label: 'Testimonials', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_testimonials"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Testimonial</a>
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
						<h5>Testimonials List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
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
						
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_testimonials}
											onChange={(e) => { setRowsPerPage_testimonials(Number(e.target.value)); setCurrentPage_testimonials(1); }}
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
											value={searchQuery_testimonials}
											onChange={(e) => { setSearchQuery_testimonials(e.target.value); setCurrentPage_testimonials(1); }}
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
										<th>Author</th>
										<th>Role</th>
										<th>Content</th>
										<th>Created Date</th>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/testimonials/user-01.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Ivan Lucas</a></h6>
												</div>
											</div>
										</td>
										<td>HR Manager</td>
										<td>This system streamlined our HR processes, saving us time and boosting team
											efficiency.</td>
										<td>12 Sep 2024</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_testimonials"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/testimonials/user-02.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">John Mason</a></h6>
												</div>
											</div>
										</td>
										<td>HR Manager</td>
										<td>This system has made payroll and attendance tracking so much easier for our
											team</td>
										<td>24 Oct 2024</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_testimonials"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/testimonials/user-03.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Susan Hill</a></h6>
												</div>
											</div>
										</td>
										<td>HR Manager</td>
										<td>We've significantly reduced paperwork and manual errors since implementing
											this platform</td>
										<td>18 Feb 2024</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_testimonials"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/testimonials/user-04.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Gary Payton</a></h6>
												</div>
											</div>
										</td>
										<td>HR Manager</td>
										<td>Managing employee leave requests and benefits is now a hassle-free process
										</td>
										<td>17 Oct 2024</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_testimonials"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/testimonials/user-05.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Jennifer Vaughn</a></h6>
												</div>
											</div>
										</td>
										<td>HR Manager</td>
										<td>This platform has drastically cut down the time we spend on recruitment and
											onboarding.</td>
										<td>20 Jul 2024</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_testimonials"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/testimonials/user-06.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Ricky Easley</a></h6>
												</div>
											</div>
										</td>
										<td>HR Manager</td>
										<td>The system's ease of use has greatly improved our HR team's productivity.
										</td>
										<td>10 Apr 2024</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_testimonials"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/testimonials/user-07.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">David Rodriguez</a></h6>
												</div>
											</div>
										</td>
										<td>HR Manager</td>
										<td>The platform allows me to update my personal details and view my payslips
											instantly</td>
										<td>29 Aug 2024</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_testimonials"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/testimonials/user-08.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Dennis Lorenzo</a></h6>
												</div>
											</div>
										</td>
										<td>Employee</td>
										<td>Submitting my timesheets and checking my attendance is super easy with this
											tool.</td>
										<td>22 Feb 2024</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_testimonials"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/testimonials/user-09.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Barry Ducote</a></h6>
												</div>
											</div>
										</td>
										<td>Manager</td>
										<td>Enhanced employee performance tracking and simplified payroll management
											effortlessly.</td>
										<td>03 Nov 2024</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_testimonials"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/testimonials/user-10.jpg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Judy Walton</a></h6>
												</div>
											</div>
										</td>
										<td>Employee</td>
										<td>It’s great to see all my benefits and compensation details in one
											user-friendly interface.</td>
										<td>17 Dec 2024</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_testimonials"
													className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_testimonials - 1) * rowsPerPage_testimonials + 1, 11)}-{Math.min(currentPage_testimonials * rowsPerPage_testimonials, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_testimonials === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_testimonials(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_testimonials === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_testimonials(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_testimonials === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_testimonials(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default Testimonials;
