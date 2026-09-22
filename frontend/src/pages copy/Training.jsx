import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Training = () => {
  // Pagination state for training
  const [currentPage_training, setCurrentPage_training] = useState(1);
  const [rowsPerPage_training, setRowsPerPage_training] = useState(10);
  const [searchQuery_training, setSearchQuery_training] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Training"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Training' },
						{ label: 'Add Training', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_training"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Training </a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Performance Indicator list */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Training List</h5>
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
											value={rowsPerPage_training}
											onChange={(e) => { setRowsPerPage_training(Number(e.target.value)); setCurrentPage_training(1); }}
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
											value={searchQuery_training}
											onChange={(e) => { setSearchQuery_training(e.target.value); setCurrentPage_training(1); }}
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
										<th>Training Type</th>
										<th>Trainer</th>
										<th>Employee</th>
										<th>Time Duration</th>
										<th>Description</th>
										<th>Cost</th>
										<th>Status</th>
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
											Git Training
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-32.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Anthony Lewis</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-01.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-02.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-03.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-04.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-05.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+4
												</span>
											</div>
										</td>
										<td>12 Jan 2024 - 12 Feb 2024</td>
										<td>Version control and code collaboration.</td>
										<td>$200</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_training"><i className="ti ti-edit"></i></a>
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
											HTML Training
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Brian Villalobos</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-30.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-28.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-03.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-07.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-09.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+3
												</span>
											</div>
										</td>
										<td>17 Jan 2024 - 17 Feb 2024</td>
										<td>Basics of web page structure and markup.</td>
										<td>$100</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_training"><i className="ti ti-edit"></i></a>
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
											React Training
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Harvey Smith</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-32.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-21.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-01.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-05.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-18.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+6
												</span>
											</div>
										</td>
										<td>10 Feb 2024 - 10 Mar 2024</td>
										<td>Dynamic web applications with components</td>
										<td>$300</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_training"><i className="ti ti-edit"></i></a>
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
											Nodejs Training
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-33.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stephan Peralt</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-28.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-19.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-11.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-22.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-17.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+5
												</span>
											</div>
										</td>
										<td>20 Feb 2024 - 20 Mar 2024</td>
										<td>Building scalable server-side applications</td>
										<td>$250</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_training"><i className="ti ti-edit"></i></a>
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
											Vuejs Training
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-23.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-13.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-12.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-25.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-19.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+7
												</span>
											</div>
										</td>
										<td>16 Mar 2024 - 16 Apr 2024</td>
										<td>Interactive single-page applications</td>
										<td>$280</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_training"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_training - 1) * rowsPerPage_training + 1, 11)}-{Math.min(currentPage_training * rowsPerPage_training, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_training === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_training(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_training === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_training(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_training === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_training(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>
				{/* /Performance Indicator list */}

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default Training;
