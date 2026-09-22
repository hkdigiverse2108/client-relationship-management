import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Budgets = () => {
  // Pagination state for budgets
  const [currentPage_budgets, setCurrentPage_budgets] = useState(1);
  const [rowsPerPage_budgets, setRowsPerPage_budgets] = useState(10);
  const [searchQuery_budgets, setSearchQuery_budgets] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Budgets"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Accounting' },
						{ label: 'Budgets', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_budgets"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Budget</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Budgets list */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Budget List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">

							<div className="dropdown">
								<Link to="#"
									className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
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
											value={rowsPerPage_budgets}
											onChange={(e) => { setRowsPerPage_budgets(Number(e.target.value)); setCurrentPage_budgets(1); }}
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
											value={searchQuery_budgets}
											onChange={(e) => { setSearchQuery_budgets(e.target.value); setCurrentPage_budgets(1); }}
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
										<th>Budget Title</th>
										<th>Budget Type</th>
										<th>Start Date</th>
										<th>End Date</th>
										<th>Total Revenue</th>
										<th>Total Expense</th>
										<th>Tax Amount</th>
										<th>Budget Amount</th>
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
											<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Office Supplies</a></h6>
										</td>
										<td>
											Category
										</td>
										<td>
											14 Jan 2024
										</td>
										<td>
											13 Nov 2024
										</td>
										<td>
											250000
										</td>
										<td>
											150000
										</td>
										<td>
											10000
										</td>
										<td>
											90000
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_budgets"><i className="ti ti-edit"></i></a>
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
											<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Recruitment</a></h6>
										</td>
										<td>
											Category
										</td>
										<td>
											21 Jan 2024
										</td>
										<td>
											20 Nov 2024
										</td>
										<td>
											300000
										</td>
										<td>
											200000
										</td>
										<td>
											15000
										</td>
										<td>
											85000
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_budgets"><i className="ti ti-edit"></i></a>
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
											<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Tender</a></h6>
										</td>
										<td>
											Project
										</td>
										<td>
											10 Feb 2024
										</td>
										<td>
											08 Dec 2024
										</td>
										<td>
											200000
										</td>
										<td>
											170000
										</td>
										<td>
											5000
										</td>
										<td>
											25000
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_budgets"><i className="ti ti-edit"></i></a>
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
											<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Salary 2024</a></h6>
										</td>
										<td>
											Category
										</td>
										<td>
											18 Feb 2024
										</td>
										<td>
											16 Dec 2024
										</td>
										<td>
											300000
										</td>
										<td>
											200000
										</td>
										<td>
											15000
										</td>
										<td>
											85000
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_budgets"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_budgets - 1) * rowsPerPage_budgets + 1, 11)}-{Math.min(currentPage_budgets * rowsPerPage_budgets, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_budgets === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_budgets(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_budgets === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_budgets(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_budgets === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_budgets(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>
				{/* /Budgets list */}

			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default Budgets;
