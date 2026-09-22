import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const BlogComments = () => {
  // Pagination state for blogcomments
  const [currentPage_blogcomments, setCurrentPage_blogcomments] = useState(1);
  const [rowsPerPage_blogcomments, setRowsPerPage_blogcomments] = useState(10);
  const [searchQuery_blogcomments, setSearchQuery_blogcomments] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Blog Comments"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Blogs' },
						{ label: 'Comments', active: true }
					]}
				>
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
						<div className="head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}



				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Blog Comments List</h5>
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
											value={rowsPerPage_blogcomments}
											onChange={(e) => { setRowsPerPage_blogcomments(Number(e.target.value)); setCurrentPage_blogcomments(1); }}
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
											value={searchQuery_blogcomments}
											onChange={(e) => { setSearchQuery_blogcomments(e.target.value); setCurrentPage_blogcomments(1); }}
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
										<th>Comment</th>
										<th>Created Date</th>
										<th>Review</th>
										<th>Blog</th>
										<th>By</th>
										<th></th>
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

										<td>Useful breakdown of HRMS evolution!</td>
										<td>12 Sep 2024</td>
										<td><span className="text-warning">
												<i className="ti ti-star-filled "></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
											</span></td>
										<td>The Evolution of HRMS: From Manual to Digital</td>
										<td>Gertrude</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Unpublish
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Unpublish</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Publish</a>
													</li>

												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">

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

										<td>Easy-to-follow HRMS guide!</td>
										<td>24 Oct 2024</td>
										<td><span className="text-warning">
												<i className="ti ti-star-filled "></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
											</span></td>
										<td>HRMS Implementation: A Step-by-Step Guide</td>
										<td>Edward</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Unpublish
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Unpublish</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Publish</a>
													</li>

												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">

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

										<td>Essential tips on HRMS data security!</td>
										<td>18 Feb 2024</td>
										<td><span className="text-warning">
												<i className="ti ti-star-filled "></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
											</span></td>
										<td> Data Security in HRMS: What Matters</td>
										<td>Mark</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Unpublish
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Unpublish</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Publish</a>
													</li>

												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">

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

										<td>Great HRMS recruitment tips</td>
										<td>17 Oct 2024</td>
										<td><span className="text-warning">
												<i className="ti ti-star-filled "></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
											</span></td>
										<td> Improving Recruitment with HRMS</td>
										<td>Nidia</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Unpublish
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Unpublish</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Publish</a>
													</li>

												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">

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

										<td>Great look at how HRMS affects culture</td>
										<td>20 Jul 2024</td>
										<td><span className="text-warning">
												<i className="ti ti-star-filled "></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
											</span></td>
										<td> Impact of HRMS on Company Culture</td>
										<td>Rebecca</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Unpublish
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Unpublish</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Publish</a>
													</li>

												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">

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

										<td>Valuable points on HRMS benefits</td>
										<td>10 Apr 2024</td>
										<td><span className="text-warning">
												<i className="ti ti-star-filled "></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
											</span></td>
										<td> Key Benefits of Implementing HRMS</td>
										<td>Jimmy</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Unpublish
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Unpublish</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Publish</a>
													</li>

												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">

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

										<td>Great points on why an HRMS is crucial</td>
										<td>29 Aug 2024</td>
										<td><span className="text-warning">
												<i className="ti ti-star-filled "></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
											</span></td>
										<td> Why Your Company Needs an HRMS</td>
										<td>Richard</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Unpublish
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Unpublish</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Publish</a>
													</li>

												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">

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

										<td>Great take on HRMS technology’s future</td>
										<td>22 Feb 2024</td>
										<td><span className="text-warning">
												<i className="ti ti-star-filled "></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
											</span></td>
										<td> The Future of HRMS Technology</td>
										<td>Rachael</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Unpublish
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Unpublish</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Publish</a>
													</li>

												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">

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

										<td>Valuable insights on scaling HR with HRMS!</td>
										<td>03 Nov 2024</td>
										<td><span className="text-warning">
												<i className="ti ti-star-filled "></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
											</span></td>
										<td> Scaling Your HR Operations with HRMS</td>
										<td>Tammy</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Unpublish
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Unpublish</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Publish</a>
													</li>

												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">

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

										<td>Useful points on how HRMS drives success</td>
										<td>17 Dec 2024</td>
										<td><span className="text-warning">
												<i className="ti ti-star-filled "></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
												<i className="ti ti-star-filled"></i>
											</span></td>
										<td> How HRMS Drives Organizational Success</td>
										<td>Judith</td>
										<td>
											<div className="dropdown me-3">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													Unpublish
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Unpublish</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1">Publish</a>
													</li>

												</ul>
											</div>
										</td>
										<td>
											<div className="action-icon d-inline-flex">

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
										Showing {Math.min((currentPage_blogcomments - 1) * rowsPerPage_blogcomments + 1, 11)}-{Math.min(currentPage_blogcomments * rowsPerPage_blogcomments, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_blogcomments === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_blogcomments(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_blogcomments === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_blogcomments(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_blogcomments === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_blogcomments(p => Math.min(p + 1, 2))}>
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

export default BlogComments;
