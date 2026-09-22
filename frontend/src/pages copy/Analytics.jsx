import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DealsStageChart from '../components/charts/DealsStageChart';
import DonutChart2 from '../components/charts/DonutChart2';
import PageHeader from '../components/common/PageHeader';
import CustomDatePicker from '../components/common/CustomDatePicker';

const Analytics = () => {
  // Pagination state for analytics
  const [currentPage_analytics, setCurrentPage_analytics] = useState(1);
  const [rowsPerPage_analytics, setRowsPerPage_analytics] = useState(10);
  const [searchQuery_analytics, setSearchQuery_analytics] = useState('');
  return (
    <>
      <div className="page-wrapper">
			{/* Start Content */}
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Analytics"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Analytics', active: true }
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
						<div className="input-icon w-120 position-relative mb-2">
							<span className="input-icon-addon">
								<i className="ti ti-calendar text-gray-9"></i>
							</span>
							<CustomDatePicker type="text" className="form-control " value="08-12-2025"  isRange={false} />
						</div>
						<div className="head-icons ms-2 ">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row ">
					<div className="col-xl-6">
						<div className="card">
							
							<div className="card-header">
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
									<h5>Recently Created Contacts</h5>
									<div className="dropdown mb-0">
										<Link to="#"
											className="btn btn-white border btn-sm d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1"></i>This Week
										</Link>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<Link to="#" className="dropdown-item rounded-1">This
													Month</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">This
													Week</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">Last
													Week</Link>
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
											value={rowsPerPage_analytics}
											onChange={(e) => { setRowsPerPage_analytics(Number(e.target.value)); setCurrentPage_analytics(1); }}
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
											value={searchQuery_analytics}
											onChange={(e) => { setSearchQuery_analytics(e.target.value); setCurrentPage_analytics(1); }}
										/>
									</div>
								</div>
<div className="table-responsive">
									<table className="table table-nowrap mb-0">
										<thead>
											<tr>
												<th>Contact</th>
												<th>Email</th>
												<th>Phone</th>
												<th>Created at</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/contact-details"
															className="avatar avatar-md border avatar-rounded">
															<img src="/assets/img/users/user-49.jpg" className="img-fluid"
																alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/contact-details">Darlee
																	Robertson</a></h6>
															<span className="fs-12 fw-normal ">Facility Manager</span>
														</div>
													</div>
												</td>
												<td>darlee@example.com </td>
												<td>(163) 2459 315</td>
												<td>14 Jan 2024</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/contact-details"
															className="avatar avatar-md border avatar-rounded">
															<img src="/assets/img/users/user-11.jpg" className="img-fluid"
																alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/contact-details">Sharon
																	Roy</a></h6>
															<span className="fs-12 fw-normal ">Installer</span>
														</div>
													</div>
												</td>
												<td>sharon@example.com </td>
												<td>(146) 1249 296 </td>
												<td>15 Jan 2024</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/contact-details"
															className="avatar avatar-md border avatar-rounded">
															<img src="/assets/img/users/user-51.jpg" className="img-fluid"
																alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/contact-details">Vaughan
																	Lewis</a></h6>
															<span className="fs-12 fw-normal ">Senior Manager</span>
														</div>
													</div>
												</td>
												<td>vaughan@example.com </td>
												<td>(135) 3489 516</td>
												<td>16 Jan 2024</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/contact-details"
															className="avatar avatar-md border avatar-rounded">
															<img src="/assets/img/users/user-02.jpg" className="img-fluid"
																alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/contact-details">Jessica
																	Louise</a></h6>
															<span className="fs-12 fw-normal ">Test Engineer</span>
														</div>
													</div>
												</td>
												<td>jessica@example.com</td>
												<td>(135) 1229 325</td>
												<td>17 Jan 2024</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/contact-details"
															className="avatar avatar-md border avatar-rounded">
															<img src="/assets/img/users/user-52.jpg" className="img-fluid"
																alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/contact-details">Carol
																	Thomas</a></h6>
															<span className="fs-12 fw-normal ">UI /UX Designer</span>
														</div>
													</div>
												</td>
												<td>carol@example.com</td>
												<td>(196) 4862 196</td>
												<td>18 Jan 2024</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/contact-details"
															className="avatar avatar-md border avatar-rounded">
															<img src="/assets/img/users/user-08.jpg" className="img-fluid"
																alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/contact-details">Sharon
																	Roy</a></h6>
															<span className="fs-12 fw-normal ">Developer</span>
														</div>
													</div>
												</td>
												<td>sharon@example.com</td>
												<td>(196) 2352 196</td>
												<td>28 Mar 2024</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6">
						<div className="card">
							
							<div className="card-header">
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
									<h5>Deals by Stage</h5>
									<div className="dropdown">
										<Link to="#"
											className="btn btn-white border btn-sm d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1"></i>This Week
										</Link>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<Link to="#" className="dropdown-item rounded-1">This Month</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">This Week</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">Last Week</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body pb-0">
								<div>
									<div className="d-flex align-items-center mb-1">
										<h3 className="me-2">98%</h3>
										<span
											className="badge badge-outline-success bg-success-transparent rounded-pill me-1">12%</span>
										<span>vs last years</span>
									</div>
									<DealsStageChart />
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6">
						<div className="card">
							
							<div className="card-header">
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
									<h6>Won Deals Stage</h6>
									<div className="dropdown">
										<Link to="#"
											className="btn btn-white border-0 dropdown-toggle btn-sm d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											Sales Pipeline
										</Link>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<Link to="#" className="dropdown-item rounded-1">Marketing
													Pipeline</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">Sales
													Pipeline</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">Email</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">Chats</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body">
								<div className="text-center mb-4">
									<p className="mb-1 fw-medium">Stages Won This Year</p>
									<div className="d-flex align-items-center justify-content-center">
										<h3 className="me-2">$45,899,79</h3>
										<span
											className="badge badge-soft-danger border-danger border rounded-pill me-1">$45,899,79</span>
									</div>
								</div>
								<div className="stage-chart-main">
									<div className="deal-stage-chart">
										<div
											className="text-center d-flex align-items-center justify-content-center flex-column bg-secondary rounded-circle chart-stage-1">
											<span className="d-block text-white mb-1">Conversion</span>
											<h6 className="text-white">48%</h6>
										</div>
										<div
											className="text-center d-flex align-items-center justify-content-center flex-column bg-danger rounded-circle chart-stage-2">
											<span className="d-block text-white mb-1">Calls</span>
											<h6 className="text-white">24%</h6>
										</div>
										<div
											className="text-center d-flex align-items-center justify-content-center flex-column bg-warning rounded-circle chart-stage-3">
											<span className="d-block text-white mb-1">Email</span>
											<h6 className="text-white">39%</h6>
										</div>
										<div
											className="text-center d-flex align-items-center justify-content-center flex-column bg-success rounded-circle chart-stage-4">
											<span className="d-block text-white mb-1">Chats</span>
											<h6 className="text-white">20%</h6>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6">
						<div className="card">
							
							<div className="card-header">
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
									<h5>Recent Activities</h5>
									<div>
										<Link to="/activity" className="btn btn-light btn-md">View All</Link>
									</div>
								</div>
							</div>
							<div className="card-body schedule-timeline activity-timeline">
								<div className="d-flex align-items-start">
									<div className="avatar avatar-md avatar-rounded bg-success flex-shrink-0">
										<i className="ti ti-phone fs-20"></i>
									</div>
									<div className="flex-fill ps-3 pb-4 timeline-flow">
										<p className="fw-medium text-gray-9 mb-1"><a href="/activity">Drain responded to
												your appointment schedule question.</a></p>
										<span>09:25 PM</span>
									</div>
								</div>
								<div className="d-flex align-items-start">
									<div className="avatar avatar-md avatar-rounded bg-info flex-shrink-0">
										<i className="ti ti-message-circle-2 fs-20"></i>
									</div>
									<div className="flex-fill ps-3 pb-4 timeline-flow">
										<p className="fw-medium text-gray-9 mb-1"><a href="/activity">You sent 1 Message
												to the James.</a></p>
										<span>10:25 PM</span>
									</div>
								</div>
								<div className="d-flex align-items-start">
									<div className="avatar avatar-md avatar-rounded bg-success flex-shrink-0">
										<i className="ti ti-phone fs-20"></i>
									</div>
									<div className="flex-fill ps-3 pb-4 timeline-flow">
										<p className="fw-medium text-gray-9 mb-1"><a href="/activity">Denwar responded
												to your appointment on 25 Jan 2025, 08:15 PM</a></p>
										<span>09:25 PM</span>
									</div>
								</div>
								<div className="d-flex align-items-start">
									<div className="avatar avatar-md avatar-rounded bg-purple flex-shrink-0">
										<i className="ti ti-user-circle fs-20"></i>
									</div>
									<div className="flex-fill ps-3 timeline-flow">
										<p className="fw-medium text-gray-9 mb-1"><a href="/activity"
												className="d-flex align-items-center">Meeting With
												<img src="/assets/img/users/user-58.jpg"
													className="avatar avatar-sm rounded-circle mx-2" alt="Img" />Abraham</a>
										</p>
										<span>09:25 PM</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6">
						<div className="card">
							<div className="card-header">
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
									<h5>Recent Deals</h5>
									<div>
										<Link to="#" className="btn btn-light btn-md">View All</Link>
									</div>
								</div>
							</div>
							<div className="card-body p-0">
								<div className="table-responsive">
									<table className="table table-nowrap mb-0">
										<thead>
											<tr>
												<th>Deal Name</th>
												<th>Stage</th>
												<th>Deal Value</th>
												<th>Owner</th>
												<th>Closed Date</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<h6><a href="/deals-details">Collins</a></h6>
												</td>
												<td>Quality To Buy</td>
												<td>
													$4,50,000
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="#"
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/users/user-32.jpg" alt="Img" />
														</a>
														<h6><a href="#">Anthony Lewis</a></h6>
													</div>
												</td>
												<td>14 Jan 2024</td>
											</tr>
											<tr>
												<td>
													<h6><a href="/deals-details">Konopelski</a></h6>
												</td>
												<td>Proposal Made</td>
												<td>
													$3,15,000
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="#"
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/users/user-09.jpg" alt="Img" />
														</a>
														<h6><a href="#">Brian Villalobos</a></h6>
													</div>
												</td>
												<td>21 Jan 2024</td>
											</tr>
											<tr>
												<td>
													<h6><a href="/deals-details">Adams</a></h6>
												</td>
												<td>Contact Made</td>
												<td>
													$8,40,000
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="#"
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/users/user-01.jpg" alt="Img" />
														</a>
														<h6><a href="#">Harvey Smith</a></h6>
													</div>
												</td>
												<td>20 Feb 2024</td>
											</tr>
											<tr>
												<td>
													<h6><a href="/deals-details">Schumm</a></h6>
												</td>
												<td>Quality To Buy</td>
												<td>
													$6,10,000
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="#"
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/users/user-33.jpg" alt="Img" />
														</a>
														<h6><a href="#">Stephan Peralt</a></h6>
													</div>
												</td>
												<td>15 Mar 2024</td>
											</tr>
											<tr>
												<td>
													<h6><a href="/deals-details">Wisozk</a></h6>
												</td>
												<td>Presentation</td>
												<td>
													$4,70,000
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="#"
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/users/user-34.jpg" alt="Img" />
														</a>
														<h6><a href="#">Doglas Martini</a></h6>
													</div>
												</td>
												<td>12 Apr 2024</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6">
						<div className="card flex-fill">
							
							<div className="card-header">
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
									<h5>Leads by Source</h5>
									<div className="dropdown">
										<Link to="#"
											className="btn btn-white border btn-md d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1 fs-14"></i>This Week
										</Link>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<Link to="#" className="dropdown-item rounded-1">This
													Month</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">This
													Week</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">Last
													Week</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body">
								<DonutChart2 />
								<div>
									<h6 className="mb-3">Status</h6>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<p className="f-13 mb-0"><i
												className="ti ti-circle-filled text-secondary me-1"></i>Google</p>
										<p className="f-13 fw-medium text-gray-9">40%</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<p className="f-13 mb-0"><i className="ti ti-circle-filled text-warning me-1"></i>Paid
										</p>
										<p className="f-13 fw-medium text-gray-9">35%</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<p className="f-13 mb-0"><i className="ti ti-circle-filled text-pink me-1"></i>Campaigns
										</p>
										<p className="f-13 fw-medium text-gray-9">15%</p>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<p className="f-13 mb-0"><i
												className="ti ti-circle-filled text-purple me-1"></i>Referals</p>
										<p className="f-13 fw-medium text-gray-9">10%</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6">
						<div className="card flex-fill">
							<div className="card-header">
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
									<h5>Recent Leads</h5>
									<div>
										<Link to="#" className="btn btn-light btn-md">View All</Link>
									</div>
								</div>
							</div>
							<div className="card-body p-0">
								<div className="table-responsive">
									<table className="table table-nowrap mb-0">
										<thead>
											<tr>
												<th>Lead Name</th>
												<th>Company Name</th>
												<th>Stage</th>
												<th>Created Date</th>
												<th>Lead Owner</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<h6><a href="/leads-details">Collins</a></h6>
												</td>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/company-details"
															className="avatar avatar-md border rounded-circle">
															<img src="/assets/img/company/company-01.svg"
																className="img-fluid" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a
																	href="/company-details">BrightWave
																	Innovations</a></h6>
														</div>
													</div>
												</td>
												<td>
													<span
														className="badge badge-secondary d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>
														Contacted
													</span>
												</td>
												<td>
													14 Jan 2024
												</td>
												<td>Hendry</td>
											</tr>
											<tr>
												<td>
													<h6><a href="/leads-details">Konopelski</a></h6>
												</td>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/company-details"
															className="avatar avatar-md border rounded-circle">
															<img src="/assets/img/company/company-02.svg"
																className="img-fluid" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/company-details">Stellar
																	Dynamics</a></h6>
														</div>
													</div>
												</td>
												<td>
													<span className="badge badge-success d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>
														Closed
													</span>
												</td>
												<td>
													21 Jan 2024
												</td>
												<td>Guilory</td>
											</tr>
											<tr>
												<td>
													<h6><a href="/leads-details">Adams</a></h6>
												</td>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/company-details"
															className="avatar avatar-md border rounded-circle">
															<img src="/assets/img/company/company-03.svg"
																className="img-fluid" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/company-details">Quantum
																	Nexus</a></h6>
														</div>
													</div>
												</td>
												<td>
													<span className="badge badge-danger d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>
														Lost
													</span>
												</td>
												<td>
													20 Feb 2024
												</td>
												<td>Jami</td>
											</tr>
											<tr>
												<td>
													<h6><a href="/leads-details">Schumm</a></h6>
												</td>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/company-details"
															className="avatar avatar-md border rounded-circle">
															<img src="/assets/img/company/company-04.svg"
																className="img-fluid" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a
																	href="/company-details">EcoVision
																	Enterprises</a></h6>
														</div>
													</div>
												</td>
												<td>
													<span className="badge badge-purple d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>
														Not Contacted
													</span>
												</td>
												<td>
													15 Mar 2024
												</td>
												<td>Theresa</td>
											</tr>
											<tr>
												<td>
													<h6><a href="/leads-details">Wisozk</a></h6>
												</td>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/company-details"
															className="avatar avatar-md border rounded-circle">
															<img src="/assets/img/company/company-05.svg"
																className="img-fluid" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/company-details">Aurora
																	Technologies</a></h6>
														</div>
													</div>
												</td>
												<td>
													<span className="badge badge-success d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>
														Closed
													</span>
												</td>
												<td>
													12 Apr 2024
												</td>
												<td>Smith</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6">
						<div className="card">
							
							<div className="card-header">
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
									<h5>Recently Created Companies</h5>
									<div className="dropdown mb-0">
										<Link to="#"
											className="btn btn-white border btn-sm d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1"></i>This Week
										</Link>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<Link to="#" className="dropdown-item rounded-1">This
													Month</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">This
													Week</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">Last
													Week</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body p-0">
								<div className="table-responsive">
									<table className="table table-nowrap mb-0">
										<thead>
											<tr>
												<th>Company Name</th>
												<th>Email</th>
												<th>Phone</th>
												<th>Created at</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/company-details"
															className="avatar avatar-md border rounded-circle">
															<img src="/assets/img/company/company-01.svg"
																className="img-fluid" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a
																	href="/company-details">BrightWave
																	Innovations</a></h6>
														</div>
													</div>
												</td>
												<td>darlee@example.com </td>
												<td>(163) 2459 315</td>
												<td>14 Jan 2024</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/company-details"
															className="avatar avatar-md border rounded-circle">
															<img src="/assets/img/company/company-02.svg"
																className="img-fluid" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/company-details">Stellar
																	Dynamics</a></h6>
														</div>
													</div>
												</td>
												<td>sharon@example.com </td>
												<td>(146) 1249 296 </td>
												<td>15 Jan 2024</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center file-name-icon">
														<a href="/company-details"
															className="avatar avatar-md border rounded-circle">
															<img src="/assets/img/company/company-03.svg"
																className="img-fluid" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/company-details">Quantum
																	Nexus</a></h6>
														</div>
													</div>
												</td>
												<td>jessica@example.com</td>
												<td>(148) 1229 235</td>
												<td>17 Jan 2024</td>
											</tr>
										</tbody>
									</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_analytics - 1) * rowsPerPage_analytics + 1, 11)}-{Math.min(currentPage_analytics * rowsPerPage_analytics, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_analytics === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_analytics(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_analytics === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_analytics(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_analytics === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_analytics(p => Math.min(p + 1, 2))}>
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

export default Analytics;
