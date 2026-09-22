import React from 'react';
import { Link } from 'react-router-dom';
import { FaCircle, FaFileExport, FaChevronDown } from 'react-icons/fa';
import { TenantSupportChart } from '../components/charts/TenantSupportCharts';import PageHeader from '../components/common/PageHeader';


const TenantSupportTickets = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Tenant Support Tickets"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Super Admin' },
						{ label: 'Tenant Support Tickets', active: true }
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
						<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_ticket"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add New Ticket</a>
						</div>
						<div className="ms-2 mb-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">
					<div className="col-md-6 col-xl-3 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="row justify-content-between">
									<div className="col-8">
										<div className="flex-fill">
											<div
												className="rounded d-inline-flex align-items-center justify-content-center mb-3">
												<span className="avatar avatar-lg rounded bg-primary-transparent "><i
														className="ti ti-ticket fs-20"></i></span>
											</div>
											<div className="d-flex align-items-center mb-2">
												<h2 className="me-2">80</h2>
												<div
													className="d-flex flex-column justify-content-between align-items-center">
													<span
														className="badge bg-transparent-purple d-inline-flex align-items-center">
														<i className="ti ti-arrow-wave-right-down me-1"></i>
														+5.50%
													</span>
												</div>
											</div>
											<span className="fs-12 fw-medium text-gray-5">New Tickets</span>
										</div>
									</div>
									<div className="col-4">
										<div className="text-end">
											<TenantSupportChart color="#0C4B5E" data={60} bgColor="#F8F9FA" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6 col-xl-3 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="row">
									<div className="col-8">
										<div className="flex-fill">
											<div
												className="rounded d-inline-flex align-items-center justify-content-center mb-3">
												<span className="avatar avatar-lg rounded bg-transparent-purple "><i
														className="ti ti-ticket fs-20"></i></span>
											</div>
											<div className="d-flex align-items-center mb-2">
												<h2 className="me-2">25</h2>
												<div
													className="d-flex flex-column justify-content-between align-items-center">
													<span
														className="badge bg-transparent-purple d-inline-flex align-items-center">
														<i className="ti ti-arrow-wave-right-down me-1"></i>
														+5.50%
													</span>
												</div>
											</div>
											<span className="fs-12 fw-medium text-gray-5">Open Tickets</span>
										</div>
									</div>
									<div className="col-4">
										<div className="text-end">
											<TenantSupportChart color="#AB47BC" data={30} bgColor="#F7EEF9" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6 col-xl-3 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="row">
									<div className="col-8">
										<div className="flex-fill">
											<div
												className="rounded d-inline-flex align-items-center justify-content-center mb-3">
												<span
													className="avatar avatar-lg rounded bg-transparent-skyblue text-skyblue"><i
														className="ti ti-ticket fs-20"></i></span>
											</div>
											<div className="d-flex align-items-center mb-2">
												<h2 className="me-2">40</h2>
												<div
													className="d-flex flex-column justify-content-between align-items-center">
													<span
														className="badge bg-transparent-purple d-inline-flex align-items-center">
														<i className="ti ti-arrow-wave-right-down me-1"></i>
														+5.50%
													</span>
												</div>
											</div>
											<span className="fs-12 fw-medium text-gray-5">Pending Tickets</span>
										</div>
									</div>
									<div className="col-4">
										<div className="text-end">
											<TenantSupportChart color="#0DCAF0" data={50} bgColor="#E9FAFE" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-6 col-xl-3 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="row">
									<div className="col-8">
										<div className="flex-fill">
											<div
												className="rounded d-inline-flex align-items-center justify-content-center mb-3">
												<span
													className="avatar avatar-lg rounded bg-transparent-success text-success"><i
														className="ti ti-ticket fs-20"></i></span>
											</div>
											<div className="d-flex align-items-center mb-2">
												<h2 className="me-2">70</h2>
												<div
													className="d-flex flex-column justify-content-between align-items-center">
													<span
														className="badge bg-transparent-purple d-inline-flex align-items-center">
														<i className="ti ti-arrow-wave-right-down me-1"></i>
														+5.50%
													</span>
												</div>
											</div>
											<span className="fs-12 fw-medium text-gray-5">Solved Tickets</span>
										</div>
									</div>
									<div className="col-4">
										<div className="text-end">
											<TenantSupportChart color="#28C76F" data={80} bgColor="#EAF9F1" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
							<h5>Ticket List</h5>
							<div className="d-flex align-items-center flex-wrap row-gap-3">
								<div className="dropdown me-2">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Priority
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Priority</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">High</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Low</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Medium</a>
										</li>
									</ul>
								</div>
								<div className="dropdown me-2">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Select Status
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Open</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">On Hold</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Reopened</a>
										</li>
									</ul>
								</div>
								<div className="dropdown">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Sort By : Last 7 Days
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Recently
												Added</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Ascending</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Descending</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Last Month</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Last 7
												Days</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-xl-9 col-md-8">
						<div className="card">
							<div className="card-body">
								<div className="row row-gap-3">
									<div className="col-xl-3 col-lg-4 col-md-4">
										<div className="bg-light border rounded p-4 text-center">
											<p className="fs-12 fw-medium text-gray-9 mb-2">#TIC0016</p>
											<span className="badge badge-danger mb-2"><i
													className="ti ti-point-filled me-1"></i>High</span>
											<p className="fs-12 fw-medium text-gray-9 mb-0">15 Dec 2025</p>
										</div>
									</div>
									<div className="col-xl-9 col-lg-8 col-md-8">
										<div
											className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
											<h5>Login not working <span
													className="badge rounded-pill badge-info fs-10 text-white ms-2">Access
													Issue</span></h5>
											<div className="d-flex align-items-center gap-2">
												<a href="/tenant-ticket-details"><i
														className="ti ti-eye fs-16 text-gray-5"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_ticket"><i
														className="ti ti-edit fs-16 text-gray-5"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash fs-16 text-gray-5"></i></a>
											</div>
										</div>
										<div
											className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-2">Ticket Raised By</h6>
												<div className="d-flex align-items-center gap-2">
													<span
														className="avatar avatar-md rounded-circle border p-1 flex-shrink-0">
														<img src="/assets/img/company/company-01.svg"
															className="rounded-circle" alt="logo" />
													</span>
													<p className="fw-medium text-gray-9 mb-0">BrightWave Innovations</p>
												</div>
											</div>
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-3">Assignee</h6>
												<div className="d-flex align-items-center gap-2">
													<img src="/assets/img/agents/agent-11.jpg"
														className="avatar avatar-xs rounded-circle" alt="logo" />
													<p className="fw-medium text-gray-9 mb-0">Edgar Hansel</p>
												</div>
											</div>
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-3">Status</h6>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<span
															className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																className="ti ti-point-filled text-success"></i></span> Open
													</a>
													<ul className="dropdown-menu  dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-success"></i></span>Open</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-danger"></i></span>Close</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-purple"></i></span>New</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-body">
								<div className="row row-gap-3">
									<div className="col-xl-3 col-lg-4 col-md-4">
										<div className="bg-light border rounded p-4 text-center">
											<p className="fs-12 fw-medium text-gray-9 mb-2">#TIC0015</p>
											<span className="badge badge-warning mb-2"><i
													className="ti ti-point-filled me-1"></i>Medium</span>
											<p className="fs-12 fw-medium text-gray-9 mb-0">10 Dec 2025</p>
										</div>
									</div>
									<div className="col-xl-9 col-lg-8 col-md-8">
										<div
											className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
											<h5>HR module not loading <span
													className="badge rounded-pill badge-pink fs-10 text-white ms-2">Module
													Issue</span></h5>
											<div className="d-flex align-items-center gap-2">
												<a href="/tenant-ticket-details"><i
														className="ti ti-eye fs-16 text-gray-5"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_ticket"><i
														className="ti ti-edit fs-16 text-gray-5"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash fs-16 text-gray-5"></i></a>
											</div>
										</div>
										<div className="d-flex align-items-center justify-content-between flex-wrap">
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-2">Ticket Raised By</h6>
												<div className="d-flex align-items-center gap-2">
													<span
														className="avatar avatar-md rounded-circle border p-1 flex-shrink-0">
														<img src="/assets/img/company/company-02.svg"
															className="rounded-circle" alt="logo" />
													</span>
													<p className="fw-medium text-gray-9 mb-0">Ann Lynch</p>
												</div>
											</div>
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-3">Assignee</h6>
												<div className="d-flex align-items-center gap-2">
													<img src="/assets/img/agents/agent-12.jpg"
														className="avatar avatar-xs rounded-circle" alt="logo" />
													<p className="fw-medium text-gray-9 mb-0">Edgar Hansel</p>
												</div>
											</div>
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-3">Status</h6>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<span
															className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																className="ti ti-point-filled text-success"></i></span> Open
													</a>
													<ul className="dropdown-menu  dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-success"></i></span>Open</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-danger"></i></span>Close</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-purple"></i></span>New</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-body">
								<div className="row row-gap-3">
									<div className="col-xl-3 col-lg-4 col-md-4">
										<div className="bg-light border rounded p-4 text-center">
											<p className="fs-12 fw-medium text-gray-9 mb-2">#TIC0014</p>
											<span className="badge badge-success mb-2"><i
													className="ti ti-point-filled me-1"></i>Low</span>
											<p className="fs-12 fw-medium text-gray-9 mb-0">08 Dec 2025</p>
										</div>
									</div>
									<div className="col-xl-9 col-lg-8 col-md-8">
										<div
											className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
											<h5>Unable to access dashboard <span
													className="badge rounded-pill badge-info fs-10 text-white ms-2">Access
													Issue</span></h5>
											<div className="d-flex align-items-center gap-2">
												<a href="/tenant-ticket-details"><i
														className="ti ti-eye fs-16 text-gray-5"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_ticket"><i
														className="ti ti-edit fs-16 text-gray-5"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash fs-16 text-gray-5"></i></a>
											</div>
										</div>
										<div className="d-flex align-items-center justify-content-between flex-wrap">
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-2">Ticket Raised By</h6>
												<div className="d-flex align-items-center gap-2">
													<span
														className="avatar avatar-md rounded-circle border p-1 flex-shrink-0">
														<img src="/assets/img/company/company-03.svg"
															className="rounded-circle" alt="logo" />
													</span>
													<p className="fw-medium text-gray-9 mb-0">Aurora Technologies</p>
												</div>
											</div>
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-3">Assignee</h6>
												<div className="d-flex align-items-center gap-2">
													<img src="/assets/img/agents/agent-13.jpg"
														className="avatar avatar-xs rounded-circle" alt="logo" />
													<p className="fw-medium text-gray-9 mb-0">Juan Hermann</p>
												</div>
											</div>
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-3">Status</h6>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<span
															className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																className="ti ti-point-filled text-success"></i></span> Open
													</a>
													<ul className="dropdown-menu  dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-success"></i></span>Open</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-danger"></i></span>Close</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-purple"></i></span>New</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-body">
								<div className="row row-gap-3">
									<div className="col-xl-3 col-lg-4 col-md-4">
										<div className="bg-light border rounded p-4 text-center">
											<p className="fs-12 fw-medium text-gray-9 mb-2">#TIC0013</p>
											<span className="badge badge-warning mb-2"><i
													className="ti ti-point-filled me-1"></i>Medium</span>
											<p className="fs-12 fw-medium text-gray-9 mb-0">02 Dec 2025</p>
										</div>
									</div>
									<div className="col-xl-9 col-lg-8 col-md-8">
										<div
											className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
											<h5>Billing amount incorrect<span
													className="badge rounded-pill badge-purple fs-10 text-white ms-2">Billing
													& Payments</span></h5>
											<div className="d-flex align-items-center gap-2">
												<a href="/tenant-ticket-details"><i
														className="ti ti-eye fs-16 text-gray-5"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#edit_ticket"><i
														className="ti ti-edit fs-16 text-gray-5"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash fs-16 text-gray-5"></i></a>
											</div>
										</div>
										<div className="d-flex align-items-center justify-content-between flex-wrap">
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-2">Ticket Raised By</h6>
												<div className="d-flex align-items-center gap-2">
													<span
														className="avatar avatar-md rounded-circle border p-1 flex-shrink-0">
														<img src="/assets/img/company/company-04.svg"
															className="rounded-circle" alt="logo" />
													</span>
													<p className="fw-medium text-gray-9 mb-0">Quantum Nexus</p>
												</div>
											</div>
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-3">Assignee</h6>
												<div className="d-flex align-items-center gap-2">
													<img src="/assets/img/agents/agent-14.jpg"
														className="avatar avatar-xs rounded-circle" alt="logo" />
													<p className="fw-medium text-gray-9 mb-0">Jessie Otero</p>
												</div>
											</div>
											<div className="">
												<h6 className="fs-12 fw-normal text-gray-5 mb-3">Status</h6>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<span
															className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																className="ti ti-point-filled text-success"></i></span> Open
													</a>
													<ul className="dropdown-menu  dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-success"></i></span>Open</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-danger"></i></span>Close</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																	className="rounded-circle bg-transparent-purple d-flex justify-content-center align-items-center me-2"><i
																		className="ti ti-point-filled text-purple"></i></span>New</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="text-center mb-4">
							<a href="#" className="btn btn-primary"><i className="ti ti-loader-3 me-1"></i>Load More</a>
						</div>
					</div>
					<div className="col-xl-3 col-md-4">
						<div className="card">
							
							<div className="card-header">
								<h4>Ticket Categories</h4>
							</div>
							<div className="card-body p-0">
								<div className="d-flex flex-column">
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<a href="#" onClick={(e) => e.preventDefault()}>Access Issue</a>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">1</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<a href="#" onClick={(e) => e.preventDefault()}>Module Issue</a>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">1</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<a href="#" onClick={(e) => e.preventDefault()}>Billing & Payments</a>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">0</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<a href="#" onClick={(e) => e.preventDefault()}>API / Integration Issues</a>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">2</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between p-3">
										<a href="#" onClick={(e) => e.preventDefault()}>Plan / Subscription Issues</a>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">1</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card">
							
							<div className="card-header">
								<h4>Support Agents</h4>
							</div>
							<div className="card-body p-0">
								<div className="d-flex flex-column">
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<span className="d-flex align-items-center">
											<img src="/assets/img/profiles/avatar-01.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" />Edgar Hansel
										</span>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">0</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<span className="d-flex align-items-center">
											<img src="/assets/img/agents/agent-12.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" />Ann Lynch
										</span>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">1</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<span className="d-flex align-items-center">
											<img src="/assets/img/agents/agent-13.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" />Juan Hermann
										</span>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">0</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between p-3">
										<span className="d-flex align-items-center">
											<img src="/assets/img/agents/agent-14.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" />Jessie Otero
										</span>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">2</span>
										</div>
									</div>
								</div>
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

export default TenantSupportTickets;
