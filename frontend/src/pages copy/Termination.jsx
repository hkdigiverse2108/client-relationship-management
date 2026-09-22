import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Termination = () => {
  // Pagination state for termination
  const [currentPage_termination, setCurrentPage_termination] = useState(1);
  const [rowsPerPage_termination, setRowsPerPage_termination] = useState(10);
  const [searchQuery_termination, setSearchQuery_termination] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Termination"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'HRM' },
						{ label: 'Termination', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" className="btn btn-primary d-flex align-items-center" data-bs-toggle="modal"
								data-bs-target="#new_termination"><i className="ti ti-circle-plus me-2"></i>Add
								Termination</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Termination List */}
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
							
							<div className="card-body p-0">
								
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_termination}
											onChange={(e) => { setRowsPerPage_termination(Number(e.target.value)); setCurrentPage_termination(1); }}
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
											value={searchQuery_termination}
											onChange={(e) => { setSearchQuery_termination(e.target.value); setCurrentPage_termination(1); }}
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
												<th>Resigning Employee</th>
												<th>Department</th>
												<th>Termination Type</th>
												<th>Notice Date</th>
												<th>Reason</th>
												<th>Resignation Date</th>
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
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-md me-2">
															<img src="/assets/img/users/user-32.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<h6 className="fw-medium"><a href="/invoice-details">Anthony
																Lewis</a></h6>
													</div>
												</td>
												<td>Finance</td>
												<td>Retirement</td>
												<td>14 Jan 2024</td>
												<td>Employee retires</td>
												<td>14 Mar 2024</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="#" className="me-2" data-bs-toggle="modal"
															data-bs-target="#edit_termination"><i
																className="ti ti-edit"></i></a>
														<a href="#" data-bs-toggle="modal"
															data-bs-target="#delete_modal"><i
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
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-md me-2">
															<img src="/assets/img/users/user-09.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<h6 className="fw-medium"><a href="/invoice-details">Brian
																Villalobos</a></h6>
													</div>
												</td>
												<td>Application Development</td>
												<td>Insubordination</td>
												<td>21 Jan 2024</td>
												<td>Entrepreneurial Pursuits</td>
												<td>21 Mar 2024</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="#" className="me-2" data-bs-toggle="modal"
															data-bs-target="#edit_termination"><i
																className="ti ti-edit"></i></a>
														<a href="#" data-bs-toggle="modal"
															data-bs-target="#delete_modal"><i
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
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-md me-2">
															<img src="/assets/img/users/user-01.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<h6 className="fw-medium"><a href="/invoice-details">Harvey
																Smith</a></h6>
													</div>
												</td>
												<td>Web Development</td>
												<td>Layoff</td>
												<td>18 Feb 2024</td>
												<td>Workforce reduction</td>
												<td>18 Apr 2024</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="#" className="me-2" data-bs-toggle="modal"
															data-bs-target="#edit_termination"><i
																className="ti ti-edit"></i></a>
														<a href="#" data-bs-toggle="modal"
															data-bs-target="#delete_modal"><i
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
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-md me-2">
															<img src="/assets/img/users/user-33.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<h6 className="fw-medium"><a href="/invoice-details">Stephan
																Peralt</a></h6>
													</div>
												</td>
												<td>UI / UX</td>
												<td>Breach of Contract</td>
												<td>14 Mar 2024</td>
												<td>Violates the terms of the contract</td>
												<td>14 Apr 2024</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="#" className="me-2" data-bs-toggle="modal"
															data-bs-target="#edit_termination"><i
																className="ti ti-edit"></i></a>
														<a href="#" data-bs-toggle="modal"
															data-bs-target="#delete_modal"><i
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
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-md me-2">
															<img src="/assets/img/users/user-34.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<h6 className="fw-medium"><a href="/invoice-details">Doglas
																Martini</a></h6>
													</div>
												</td>
												<td>Marketing</td>
												<td>Lack of Skills</td>
												<td>10 Apr 2024</td>
												<td>Unable to perform job duties</td>
												<td>10 Jun 2024</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="#" className="me-2" data-bs-toggle="modal"
															data-bs-target="#edit_termination"><i
																className="ti ti-edit"></i></a>
														<a href="#" data-bs-toggle="modal"
															data-bs-target="#delete_modal"><i
																className="ti ti-trash"></i></a>
													</div>
												</td>
											</tr>

										</tbody>
									</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_termination - 1) * rowsPerPage_termination + 1, 11)}-{Math.min(currentPage_termination * rowsPerPage_termination, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_termination === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_termination(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_termination === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_termination(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_termination === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_termination(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Termination List  */}
			</div>

			{/* Footer */}
			<div className="footer d-sm-flex align-items-center justify-content-between bg-white border-top p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" className="text-primary">Dreams</a></p>
			</div>
			{/* /Footer */}
		</div>

		
    </>
  );
};

export default Termination;
