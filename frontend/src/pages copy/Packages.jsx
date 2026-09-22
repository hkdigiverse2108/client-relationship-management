import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Packages = () => {
  // Pagination state for packages
  const [currentPage_packages, setCurrentPage_packages] = useState(1);
  const [rowsPerPage_packages, setRowsPerPage_packages] = useState(10);
  const [searchQuery_packages, setSearchQuery_packages] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Packages"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Super Admin' },
						{ label: 'Packages List', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/packages" className="btn btn-icon btn-sm active bg-primary text-white me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/packages-grid" className="btn btn-icon btn-sm"><i
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
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
									</li>
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
									</li>
								</ul>
							</div>
						</div>
						<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_plans"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add New Plan</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">

					{/* Total Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<p className="fs-12 fw-medium mb-1 text-truncate">Total Plans</p>
										<h4>08</h4>
									</div>
								</div>
								<div>
									<span className="avatar avatar-lg bg-primary flex-shrink-0">
										<i className="ti ti-box fs-16"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Total Plans */}

					{/* Total Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<p className="fs-12 fw-medium mb-1 text-truncate">Active Plans</p>
										<h4>08</h4>
									</div>
								</div>
								<div>
									<span className="avatar avatar-lg bg-success flex-shrink-0">
										<i className="ti ti-activity-heartbeat fs-16"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Total Plans */}

					{/* Inactive Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<p className="fs-12 fw-medium mb-1 text-truncate">Inactive Plans</p>
										<h4>0</h4>
									</div>
								</div>
								<div>
									<span className="avatar avatar-lg bg-danger flex-shrink-0">
										<i className="ti ti-player-pause fs-16"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Inactive Companies */}

					{/* No of Plans  */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<p className="fs-12 fw-medium mb-1 text-truncate">No of Plan Types</p>
										<h4>02</h4>
									</div>
								</div>
								<div>
									<span className="avatar avatar-lg bg-skyblue flex-shrink-0">
										<i className="ti ti-mask fs-16"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /No of Plans */}

				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Plan List</h5>
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
									Select Plan
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Monthly</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Yearly</Link>
									</li>
								</ul>
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
						
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_packages}
											onChange={(e) => { setRowsPerPage_packages(Number(e.target.value)); setCurrentPage_packages(1); }}
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
											value={searchQuery_packages}
											onChange={(e) => { setSearchQuery_packages(e.target.value); setCurrentPage_packages(1); }}
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
										<th>Plan Name</th>
										<th>Plan Type</th>
										<th>Total Subscribers</th>
										<th>Price</th>
										<th>Created Date</th>
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
											<h6 className="fw-medium"><a href="#">Basic</a></h6>
										</td>
										<td>Monthly</td>
										<td>56</td>
										<td>$50</td>
										<td>14 Jan 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_plans"><i className="ti ti-edit"></i></a>
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
											<h6 className="fw-medium"><a href="#">Advanced</a></h6>
										</td>
										<td>Monthly</td>
										<td>99</td>
										<td>$200</td>
										<td>21 Jan 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_plans"><i className="ti ti-edit"></i></a>
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
											<h6 className="fw-medium"><a href="#">Premium</a></h6>
										</td>
										<td>Monthly</td>
										<td>58</td>
										<td>$300</td>
										<td>10 Feb 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_plans"><i className="ti ti-edit"></i></a>
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
											<h6 className="fw-medium"><a href="#">Enterprise</a></h6>
										</td>
										<td>Monthly</td>
										<td>67</td>
										<td>$400</td>
										<td>18 Feb 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_plans"><i className="ti ti-edit"></i></a>
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
											<h6 className="fw-medium"><a href="#">Basic</a></h6>
										</td>
										<td>Yearly</td>
										<td>78</td>
										<td>$600</td>
										<td>15 Mar 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_plans"><i className="ti ti-edit"></i></a>
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
											<h6 className="fw-medium"><a href="#">Advanced</a></h6>
										</td>
										<td>Yearly</td>
										<td>99</td>
										<td>$2400</td>
										<td>26 Mar 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_plans"><i className="ti ti-edit"></i></a>
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
											<h6 className="fw-medium"><a href="#">Premium</a></h6>
										</td>
										<td>Yearly</td>
										<td>48</td>
										<td>$3600</td>
										<td>05 Apr 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_plans"><i className="ti ti-edit"></i></a>
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
											<h6 className="fw-medium"><a href="#">Enterprise</a></h6>
										</td>
										<td>Yearly</td>
										<td>17</td>
										<td>$4800</td>
										<td>16 Apr 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_plans"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_packages - 1) * rowsPerPage_packages + 1, 11)}-{Math.min(currentPage_packages * rowsPerPage_packages, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_packages === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_packages(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_packages === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_packages(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_packages === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_packages(p => Math.min(p + 1, 2))}>
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

export default Packages;
