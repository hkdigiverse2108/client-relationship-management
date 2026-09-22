import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Cities = () => {
  // Pagination state for cities
  const [currentPage_cities, setCurrentPage_cities] = useState(1);
  const [rowsPerPage_cities, setRowsPerPage_cities] = useState(10);
  const [searchQuery_cities, setSearchQuery_cities] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Cities"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Locations' },
						{ label: 'Cities', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_cities"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add City</a>
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
						<h5>Cities List</h5>
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
											value={rowsPerPage_cities}
											onChange={(e) => { setRowsPerPage_cities(Number(e.target.value)); setCurrentPage_cities(1); }}
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
											value={searchQuery_cities}
											onChange={(e) => { setSearchQuery_cities(e.target.value); setCurrentPage_cities(1); }}
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
										<th>City Name</th>
										<th>State Name</th>
										<th>Country Name</th>
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
											<h6 className="fw-medium"><a href="#">Los Angeles</a></h6>
										</td>
										<td>California</td>
										<td>United States</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_cities"
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
											<h6 className="fw-medium"><a href="#">New York City</a></h6>
										</td>
										<td>California</td>
										<td>United States</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_cities"
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
											<h6 className="fw-medium"><a href="#">Houston</a></h6>
										</td>
										<td>Texas</td>
										<td>United States</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_cities"
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
											<h6 className="fw-medium"><a href="#">Munich</a></h6>
										</td>
										<td>Bavaria</td>
										<td>Germany</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_cities"
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
											<h6 className="fw-medium"><a href="#">Montreal</a></h6>
										</td>
										<td>Quebec</td>
										<td>Canada</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_cities"
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
											<h6 className="fw-medium"><a href="#">Toronto</a></h6>
										</td>
										<td>Ontario</td>
										<td>Canada</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_cities"
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
											<h6 className="fw-medium"><a href="#">Miami</a></h6>
										</td>
										<td>Florida</td>
										<td>United States</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_cities"
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
											<h6 className="fw-medium"><a href="#">Calgary</a></h6>
										</td>
										<td>Berlin</td>
										<td>Germany</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_cities"
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
											<h6 className="fw-medium"><a href="#">Melbourne</a></h6>
										</td>
										<td>Victoria</td>
										<td>Australia</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_cities"
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
											<h6 className="fw-medium"><a href="#">Johannesburg</a></h6>
										</td>
										<td>Gauteng</td>
										<td>Egypt</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_cities"
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
										Showing {Math.min((currentPage_cities - 1) * rowsPerPage_cities + 1, 11)}-{Math.min(currentPage_cities * rowsPerPage_cities, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_cities === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_cities(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_cities === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_cities(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_cities === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_cities(p => Math.min(p + 1, 2))}>
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

export default Cities;
