import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const ClientDetails = () => {
  // Pagination state for clientdetails
  const [currentPage_clientdetails, setCurrentPage_clientdetails] = useState(1);
  const [rowsPerPage_clientdetails, setRowsPerPage_clientdetails] = useState(10);
  const [searchQuery_clientdetails, setSearchQuery_clientdetails] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Client Details"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Client Details', active: true }
					]}
				>
					<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row justify-content-between align-items-center mb-4">
					<div className="col-md-12">
						<div className="d-flex justify-content-between align-items-center">
							<h6 className="fw-medium d-inline-flex align-items-center mb-3 mb-sm-0"><a href="/clients">
									<i className="ti ti-arrow-left me-2"></i>Clients</a>
							</h6>
							<div className="ms-2 head-icons">
								<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
									data-bs-original-title="Collapse" id="collapse-header">
									<i className="ti ti-chevrons-up"></i>
								</a>
							</div>
						</div>
					</div>

				</div>
				<div className="row">
					<div className="col-xl-4 theiaStickySidebar">
						<div className="card card-bg-1">
							<div className="card-body p-0">
								<span
									className="avatar avatar-xl avatar-rounded border border-2 border-white m-auto d-flex mb-2">
									<img src="/assets/img/users/user-13.jpg" className="w-auto h-auto" alt="Img" />
								</span>
								<div className="text-center px-3 pb-3 border-bottom">
									<div className="mb-3">
										<h5 className="d-flex align-items-center justify-content-center mb-1">Stephan
											Peralt<i className="ti ti-discount-check-filled text-success ms-1"></i></h5>
										<p className="text-dark mb-1">EcoVision Enterprises</p>
										<span className="badge badge-soft-secondary fw-medium">Operational Manager</span>
									</div>
									<div>
										<div className="d-flex align-items-center justify-content-between mb-2">
											<span className="d-inline-flex align-items-center">
												<i className="ti ti-id me-2"></i>
												Client ID
											</span>
											<p className="text-dark">CLT-0024</p>
										</div>
										<div className="d-flex align-items-center justify-content-between">
											<span className="d-inline-flex align-items-center">
												<i className="ti ti-calendar-check me-2"></i>
												Added on
											</span>
											<p className="text-dark">1st Jan 2023</p>
										</div>
										<div className="row gx-2 mt-3">
											<div className="col-6">
												<div>
													<a href="/voice-call" className="btn btn-dark w-100"><i
															className="ti ti-phone-call me-1"></i>Call</a>
												</div>
											</div>
											<div className="col-6">
												<div>
													<a href="/chat" className="btn btn-primary w-100"><i
															className="ti ti-message-heart me-1"></i>Message</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="p-3 border-bottom">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6>Basic information</h6>
										<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm" data-bs-toggle="modal"
											data-bs-target="#edit_client"><i className="ti ti-edit"></i></a>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-phone me-2"></i>
											Phone
										</span>
										<p className="text-dark">(163) 2459 315</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-mail-check me-2"></i>
											Email
										</span>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="text-info d-inline-flex align-items-center">perralt12@example.com<i
												className="ti ti-copy text-dark ms-2"></i></a>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-map-pin-check me-2"></i>
											Address
										</span>
										<p className="text-dark text-end">1861 Bayonne Ave, <br /> Manchester, NJ, 08759</p>
									</div>
								</div>
								<div className="p-3">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6>Social Links</h6>
										<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm"><i
												className="ti ti-edit"></i></a>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-01.svg" alt="Img" /></a>
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-06.svg" alt="Img" /></a>
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-02.svg" alt="Img" /></a>
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-03.svg" alt="Img" /></a>
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-04.svg" alt="Img" /></a>
										<a href="#" onClick={(e) => e.preventDefault()} className="me-2"><img
												src="/assets/img/social/social-05.svg" alt="Img" /></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-8">
						<div>
							<div className="bg-white rounded">
								<ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap mb-4" role="tablist">
									<li className="nav-item" role="presentation">
										<a className="nav-link active fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab1" data-bs-toggle="tab" aria-selected="false"
											role="tab">
											<i className="ti ti-star me-1"></i>
											Overview
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab2" data-bs-toggle="tab" aria-selected="false"
											role="tab">
											<i className="ti ti-box me-1"></i>
											Projects
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab3" data-bs-toggle="tab" aria-selected="true"
											role="tab">
											<i className="ti ti-basket-code me-1"></i>
											Tasks
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab4" data-bs-toggle="tab" aria-selected="true"
											role="tab">
											<i className="ti ti-file-invoice me-1"></i>
											Invoices
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab5" data-bs-toggle="tab" aria-selected="true"
											role="tab">
											<i className="ti ti-file-description me-1"></i>
											Notes
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab6" data-bs-toggle="tab" aria-selected="true"
											role="tab">
											<i className="ti ti-folder-open me-1"></i>
											Documents
										</a>
									</li>
								</ul>
							</div>
							<div className="tab-content custom-accordion-items client-accordion">
								<div className="tab-pane active show" id="bottom-justified-tab1" role="tabpanel">
									<div className="accordion accordions-items-seperate" id="accordionExample">
										<div className="accordion-item">
											
											<div id="primaryBorderOne"
												className="accordion-collapse collapse show border-top"
												aria-labelledby="headingOne" data-bs-parent="#accordionExample">
												<div className="accordion-body pb-0">
													<div className="row">
														<div className="col-xxl-6 col-lg-12 col-md-6">
															<div className="card">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center pb-3 mb-3 border-bottom">
																		<a href="/project-details"
																			className="flex-shrink-0 me-2">
																			<img src="/assets/img/social/project-01.svg"
																				alt="Img" />
																		</a>
																		<div>
																			<h6 className="mb-1"><a
																					href="/project-details">Hospital
																					Administration</a></h6>
																			<div className="d-flex align-items-center">
																				<span>8 tasks</span>
																				<span className="mx-1"><i
																						className="ti ti-point-filled text-primary"></i></span>
																				<span>15  Completed</span>
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span
																					className="mb-1 d-block">Deadline</span>
																				<p className="text-dark">31 July 2025</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Value</span>
																				<p className="text-dark">$549987</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Project
																					Lead</span>
																				<h6
																					className="fw-normal d-flex align-items-center">
																					<img className="avatar avatar-xs rounded-circle me-1"
																						src="/assets/img/profiles/avatar-01.jpg"
																						alt="Img" />
																					Leona
																				</h6>
																			</div>
																		</div>
																	</div>
																	<div className="bg-light p-2">
																		<div className="row align-items-center">
																			<div className="col-6">
																				<span
																					className="fw-medium d-flex align-items-center">
																					<i
																						className="ti ti-clock text-primary me-2"></i>Total
																					565 Hrs
																				</span>
																			</div>
																			<div className="col-6">
																				<div>
																					<div
																						className="d-flex align-items-center justify-content-between mb-1">
																						<small className="text-dark">495
																							Hrs</small>
																						<small className="text-dark">70
																							Hrs</small>
																					</div>
																					<div className="progress  progress-xs">
																						<div className="progress-bar bg-warning"
																							role="progressbar"
																							style={{width: '75%'}}></div>
																						<div className="progress-bar bg-success"
																							role="progressbar"
																							style={{width: '25%'}}></div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-xxl-6 col-lg-12 col-md-6">
															<div className="card">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center pb-3 mb-3 border-bottom">
																		<a href="/project-details"
																			className="flex-shrink-0 me-2">
																			<img src="/assets/img/social/project-02.svg"
																				alt="Img" />
																		</a>
																		<div>
																			<h6 className="mb-1"><a
																					href="/project-details">Video
																					Calling App</a></h6>
																			<div className="d-flex align-items-center">
																				<span>22 tasks</span>
																				<span className="mx-1"><i
																						className="ti ti-point-filled text-primary"></i></span>
																				<span>15 Completed</span>
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span
																					className="mb-1 d-block">Deadline</span>
																				<p className="text-dark">16 Jan 2025</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Value</span>
																				<p className="text-dark">$279987</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Project
																					Lead</span>
																				<h6
																					className="fw-normal d-flex align-items-center">
																					<img className="avatar avatar-xs rounded-circle me-1"
																						src="/assets/img/profiles/avatar-02.jpg"
																						alt="Img" />
																					Mathis
																				</h6>
																			</div>
																		</div>
																	</div>
																	<div className="bg-light p-2">
																		<div className="row align-items-center">
																			<div className="col-6">
																				<span
																					className="fw-medium d-flex align-items-center">
																					<i
																						className="ti ti-clock text-primary me-2"></i>Total
																					700 Hrs
																				</span>
																			</div>
																			<div className="col-6">
																				<div>
																					<div
																						className="d-flex align-items-center justify-content-between mb-1">
																						<small className="text-dark">605
																							Hrs</small>
																						<small className="text-dark">95
																							Hrs</small>
																					</div>
																					<div className="progress  progress-xs">
																						<div className="progress-bar bg-warning"
																							role="progressbar"
																							style={{width: '75%'}}></div>
																						<div className="progress-bar bg-success"
																							role="progressbar"
																							style={{width: '25%'}}></div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											
											<div id="primaryBorderTwo" className="accordion-collapse collapse border-top"
												aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
												<div className="accordion-body">
													<div className="list-group list-group-flush">
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center row-gap-3">
																<div className="col-md-7">
																	<div
																		className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
																		<div className="form-check form-check-md me-2">
																			<input className="form-check-input"
																				type="checkbox" />
																		</div>
																		<span
																			className="me-2 d-flex align-items-center rating-select"><i
																				className="ti ti-star-filled filled"></i></span>
																		<div className="strike-info">
																			<h4 className="fs-14">Patient appointment
																				booking</h4>
																		</div>
																	</div>
																</div>
																<div className="col-md-5">
																	<div
																		className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
																		<span
																			className="badge bg-soft-pink d-inline-flex align-items-center me-3"><i
																				className="fas fa-circle fs-6 me-1"></i>Onhold</span>
																		<div className="d-flex align-items-center">
																			<div
																				className="avatar-list-stacked avatar-group-sm">
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-13.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-14.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-15.jpg"
																						alt="img" />
																				</span>
																			</div>
																			<div className="dropdown ms-2">
																				<a href="#" onClick={(e) => e.preventDefault()}
																					className="d-inline-flex align-items-center"
																					data-bs-toggle="dropdown">
																					<i className="ti ti-dots-vertical"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-end p-3">
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#edit_todo"><i
																								className="ti ti-edit me-2"></i>Edit</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#delete_modal"><i
																								className="ti ti-trash me-2"></i>Delete</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#view_todo"><i
																								className="ti ti-eye me-2"></i>View</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center row-gap-3">
																<div className="col-md-7">
																	<div
																		className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
																		<div className="form-check form-check-md me-2">
																			<input className="form-check-input"
																				type="checkbox" />
																		</div>
																		<span
																			className="me-2 rating-select d-flex align-items-center"><i
																				className="ti ti-star"></i></span>
																		<div className="strike-info">
																			<h4 className="fs-14">Appointment booking with
																				payment gateway</h4>
																		</div>
																	</div>
																</div>
																<div className="col-md-5">
																	<div
																		className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
																		<span
																			className="badge bg-transparent-purple d-flex align-items-center me-3"><i
																				className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
																		<div className="d-flex align-items-center">
																			<div
																				className="avatar-list-stacked avatar-group-sm">
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-20.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-21.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-22.jpg"
																						alt="img" />
																				</span>
																			</div>
																			<div className="dropdown ms-2">
																				<a href="#" onClick={(e) => e.preventDefault()}
																					className="d-inline-flex align-items-center"
																					data-bs-toggle="dropdown">
																					<i className="ti ti-dots-vertical"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-end p-3">
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#edit_todo"><i
																								className="ti ti-edit me-2"></i>Edit</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#delete_modal"><i
																								className="ti ti-trash me-2"></i>Delete</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#view_todo"><i
																								className="ti ti-eye me-2"></i>View</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center row-gap-3">
																<div className="col-md-7">
																	<div
																		className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
																		<div className="form-check form-check-md me-2">
																			<input className="form-check-input"
																				type="checkbox" />
																		</div>
																		<span
																			className="me-2 rating-select d-flex align-items-center"><i
																				className="ti ti-star"></i></span>
																		<div className="strike-info">
																			<h4 className="fs-14">Patient and Doctor video
																				conferencing</h4>
																		</div>
																	</div>
																</div>
																<div className="col-md-5">
																	<div
																		className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
																		<span
																			className="badge badge-soft-success align-items-center me-3"><i
																				className="fas fa-circle fs-6 me-1"></i>Completed</span>
																		<div className="d-flex align-items-center">
																			<div
																				className="avatar-list-stacked avatar-group-sm">
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-28.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-29.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-24.jpg"
																						alt="img" />
																				</span>
																			</div>
																			<div className="dropdown ms-2">
																				<a href="#" onClick={(e) => e.preventDefault()}
																					className="d-inline-flex align-items-center"
																					data-bs-toggle="dropdown">
																					<i className="ti ti-dots-vertical"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-end p-3">
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#edit_todo"><i
																								className="ti ti-edit me-2"></i>Edit</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#delete_modal"><i
																								className="ti ti-trash me-2"></i>Delete</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#view_todo"><i
																								className="ti ti-eye me-2"></i>View</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded p-2">
															<div className="row align-items-center row-gap-3">
																<div className="col-md-7">
																	<div
																		className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
																		<div className="form-check form-check-md me-2">
																			<input className="form-check-input"
																				type="checkbox" checked="" />
																		</div>
																		<span
																			className="me-2 rating-select d-flex align-items-center"><i
																				className="ti ti-star"></i></span>
																		<div className="strike-info">
																			<h4 className="fs-14">Private chat module</h4>
																		</div>
																	</div>
																</div>
																<div className="col-md-5">
																	<div
																		className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
																		<span
																			className="badge badge-secondary-transparent d-flex align-items-center me-3"><i
																				className="fas fa-circle fs-6 me-1"></i>Pending</span>
																		<div className="d-flex align-items-center">
																			<div
																				className="avatar-list-stacked avatar-group-sm">
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-23.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-24.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-25.jpg"
																						alt="img" />
																				</span>
																			</div>
																			<div className="dropdown ms-2">
																				<a href="#" onClick={(e) => e.preventDefault()}
																					className="d-inline-flex align-items-center"
																					data-bs-toggle="dropdown">
																					<i className="ti ti-dots-vertical"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-end p-3">
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#edit_todo"><i
																								className="ti ti-edit me-2"></i>Edit</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#delete_modal"><i
																								className="ti ti-trash me-2"></i>Delete</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#view_todo"><i
																								className="ti ti-eye me-2"></i>View</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											
											<div id="primaryBorderThree" className="accordion-collapse collapse border-top"
												aria-labelledby="headingThree" data-bs-parent="#accordionExample">
												<div className="accordion-body">
													<div className="row align-items-center g-3 mb-3">
														<div className="col-sm-8">
															<h6>Total No of Invoice : 45</h6>
														</div>
														<div className="col-sm-4">
															<div className="position-relative input-icon">
																<span className="input-icon-addon">
																	<i className="ti ti-search"></i>
																</span>
																<input type="text" className="form-control"
																	placeholder="Search" />
															</div>
														</div>
													</div>
													<div className="list-group list-group-flush mb-3">
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center g-3">
																<div className="col-sm-6">
																	<div className="d-flex align-items-center">
																		<span
																			className="avatar avatar-lg bg-light flex-shrink-0 me-2"><i
																				className="ti ti-file-invoice text-dark fs-24"></i></span>
																		<div>
																			<h6 className="fw-medium mb-1">Phase 2
																				Completion</h6>
																			<p><a href="#" className="text-info">#INV-123
																				</a> 11 Sep 2025, 05:35 pm</p>
																		</div>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div>
																		<span>Amount</span>
																		<p className="text-dark">$6,598</p>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div
																		className="d-flex align-items-center justify-content-sm-end">
																		<span
																			className="badge badge-soft-success d-inline-flex  align-items-center me-4"><i
																				className="ti ti-point-filled me-1"></i>Paid</span>
																		<a href="#" className="btn btn-icon btn-sm"><i
																				className="ti ti-edit"></i></a>
																		<a href="#" className="btn btn-icon btn-sm "><i
																				className="ti ti-trash"></i></a>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center g-3">
																<div className="col-sm-6">
																	<div className="d-flex align-items-center">
																		<span
																			className="avatar avatar-lg bg-light flex-shrink-0 me-2"><i
																				className="ti ti-file-invoice text-dark fs-24"></i></span>
																		<div>
																			<h6 className="fw-medium mb-1">Advance for
																				Project</h6>
																			<p><a href="#" className="text-info">#INV-124
																				</a> 14 Sep 2025, 05:35 pm</p>
																		</div>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div>
																		<span>Amount</span>
																		<p className="text-dark">$3312</p>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div
																		className="d-flex align-items-center justify-content-sm-end">
																		<span
																			className="badge badge-soft-success d-inline-flex  align-items-center me-4"><i
																				className="ti ti-point-filled me-1"></i>Hold</span>
																		<a href="#" className="btn btn-icon btn-sm"><i
																				className="ti ti-edit"></i></a>
																		<a href="#" className="btn btn-icon btn-sm "><i
																				className="ti ti-trash"></i></a>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center g-3">
																<div className="col-sm-6">
																	<div className="d-flex align-items-center">
																		<span
																			className="avatar avatar-lg bg-light flex-shrink-0 me-2"><i
																				className="ti ti-file-invoice text-dark fs-24"></i></span>
																		<div>
																			<h6 className="fw-medium mb-1">Changes & design
																				Alignments</h6>
																			<p><a href="#" className="text-info">#INV-125
																				</a> 15 Sep 2025, 05:35 pm</p>
																		</div>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div>
																		<span>Amount</span>
																		<p className="text-dark">$4154</p>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div
																		className="d-flex align-items-center justify-content-sm-end">
																		<span
																			className="badge badge-soft-success d-inline-flex  align-items-center me-4"><i
																				className="ti ti-point-filled me-1"></i>Paid</span>
																		<a href="#" className="btn btn-icon btn-sm"><i
																				className="ti ti-edit"></i></a>
																		<a href="#" className="btn btn-icon btn-sm "><i
																				className="ti ti-trash"></i></a>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center g-3">
																<div className="col-sm-6">
																	<div className="d-flex align-items-center">
																		<span
																			className="avatar avatar-lg bg-light flex-shrink-0 me-2"><i
																				className="ti ti-file-invoice text-dark fs-24"></i></span>
																		<div>
																			<h6 className="fw-medium mb-1">Added New
																				Functionality</h6>
																			<p><a href="#" className="text-info">#INV-126
																				</a> 16 Sep 2025, 05:35 pm</p>
																		</div>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div>
																		<span>Amount</span>
																		<p className="text-dark">$658</p>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div
																		className="d-flex align-items-center justify-content-sm-end">
																		<span
																			className="badge badge-soft-success d-inline-flex  align-items-center me-4"><i
																				className="ti ti-point-filled me-1"></i>Paid</span>
																		<a href="#" className="btn btn-icon btn-sm"><i
																				className="ti ti-edit"></i></a>
																		<a href="#" className="btn btn-icon btn-sm "><i
																				className="ti ti-trash"></i></a>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded p-2">
															<div className="row align-items-center g-3">
																<div className="col-sm-6">
																	<div className="d-flex align-items-center">
																		<span
																			className="avatar avatar-lg bg-light flex-shrink-0 me-2"><i
																				className="ti ti-file-invoice text-dark fs-24"></i></span>
																		<div>
																			<h6 className="fw-medium mb-1">Phase 1
																				Completion</h6>
																			<p><a href="#" className="text-info">#INV-127
																				</a> 17 Sep 2025, 05:35 pm</p>
																		</div>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div>
																		<span>Amount</span>
																		<p className="text-dark">$1259</p>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div
																		className="d-flex align-items-center justify-content-sm-end">
																		<span
																			className="badge badge-soft-danger d-inline-flex  align-items-center me-4"><i
																				className="ti ti-point-filled me-1"></i>Unpaid</span>
																		<a href="#" className="btn btn-icon btn-sm"><i
																				className="ti ti-edit"></i></a>
																		<a href="#" className="btn btn-icon btn-sm "><i
																				className="ti ti-trash"></i></a>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="text-center">
														<a href="#" className="btn btn-primary btn-sm">Load More</a>
													</div>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											
											<div id="primaryBorderFour" className="accordion-collapse collapse border-top"
												aria-labelledby="headingFour" data-bs-parent="#accordionExample">
												<div className="accordion-body">
													<div className="row align-items-center g-3 mb-3">
														<div className="col-sm-8">
															<h6>Total No of Notes : 45</h6>
														</div>
														<div className="col-sm-4">
															<div className="position-relative input-icon">
																<span className="input-icon-addon">
																	<i className="ti ti-search"></i>
																</span>
																<input type="text" className="form-control"
																	placeholder="Search" />
															</div>
														</div>
													</div>
													<div className="row">
														<div className="col-md-4 col-sm-6 d-flex">
															<div className="card flex-fill">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center justify-content-between mb-2">
																		<h6 className="text-gray-5 fw-medium">15 May 2025
																		</h6>
																		<div className="dropdown">
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="d-inline-flex align-items-center"
																				data-bs-toggle="dropdown"
																				aria-expanded="false">
																				<i className="ti ti-dots-vertical"></i>
																			</a>
																			<ul
																				className="dropdown-menu dropdown-menu-end p-3">
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-edit me-2"></i>Edit</a>
																				</li>
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-trash me-1"></i>Delete</a>
																				</li>
																			</ul>
																		</div>
																	</div>
																	<h6 className="d-flex align-items-center mb-2"><i
																			className="ti ti-point-filled text-primary me-1"></i>Changes
																		& design</h6>
																	<p className="text-truncate line-clamb-3">An office
																		management app project streamlines
																		administrative tasks by integrating
																		tools for scheduling, communication, and
																		task management, enhancing overall productivity
																		and efficiency.
																	</p>
																</div>
															</div>
														</div>
														<div className="col-md-4 col-sm-6 d-flex">
															<div className="card flex-fill">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center justify-content-between mb-2">
																		<h6 className="text-gray-5 fw-medium">16 May 2025
																		</h6>
																		<div className="dropdown">
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="d-inline-flex align-items-center"
																				data-bs-toggle="dropdown"
																				aria-expanded="false">
																				<i className="ti ti-dots-vertical"></i>
																			</a>
																			<ul
																				className="dropdown-menu dropdown-menu-end p-3">
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-edit me-2"></i>Edit</a>
																				</li>
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-trash me-1"></i>Delete</a>
																				</li>
																			</ul>
																		</div>
																	</div>
																	<h6 className="d-flex align-items-center mb-2"><i
																			className="ti ti-point-filled text-success me-1"></i>Phase
																		1 Completion</h6>
																	<p className="text-truncate line-clamb-3">
																		An office management app project streamlines
																		administrative tasks by integrating tools for
																		scheduling, communication, and task
																		management, enhancing overall productivity and
																		efficiency.
																	</p>
																</div>
															</div>
														</div>
														<div className="col-md-4 col-sm-6 d-flex">
															<div className="card flex-fill">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center justify-content-between mb-2">
																		<h6 className="text-gray-5 fw-medium">17 May 2025
																		</h6>
																		<div className="dropdown">
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="d-inline-flex align-items-center"
																				data-bs-toggle="dropdown"
																				aria-expanded="false">
																				<i className="ti ti-dots-vertical"></i>
																			</a>
																			<ul
																				className="dropdown-menu dropdown-menu-end p-3">
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-edit me-2"></i>Edit</a>
																				</li>
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-trash me-1"></i>Delete</a>
																				</li>
																			</ul>
																		</div>
																	</div>
																	<h6 className="d-flex align-items-center mb-2"><i
																			className="ti ti-point-filled text-danger me-1"></i>Phase
																		2 Completion</h6>
																	<p className="text-truncate line-clamb-3">
																		An office management app project streamlines
																		administrative tasks by integrating tools for
																		scheduling, communication, and task
																		management, enhancing overall productivity and
																		efficiency.
																	</p>
																</div>
															</div>
														</div>
														<div className="col-md-12">
															<div className="text-center">
																<a href="#" className="btn btn-primary btn-sm">Load More</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											
											<div id="primaryBorderFive" className="accordion-collapse collapse border-top"
												aria-labelledby="headingFive" data-bs-parent="#accordionExample">
												<div className="accordion-body">
													<div className="row align-items-center g-3 mb-3">
														<div className="col-sm-4">
															<h6>Total No of Documents : 45</h6>
														</div>
														<div className="col-sm-8">
															<div className="d-flex align-items-center">
																<div className="dropdown me-2">
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-toggle btn btn-white"
																		data-bs-toggle="dropdown" aria-expanded="false">
																		Sort By : Docs Type
																	</a>
																	<ul className="dropdown-menu dropdown-menu-end p-3">
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Docs</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Pdf</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Image</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Folder</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Xml</a>
																		</li>
																	</ul>
																</div>
																<div className="position-relative input-icon flex-fill">
																	<span className="input-icon-addon">
																		<i className="ti ti-search"></i>
																	</span>
																	<input type="text" className="form-control"
																		placeholder="Search" />
																</div>
															</div>
														</div>
													</div>
													
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_clientdetails}
											onChange={(e) => { setRowsPerPage_clientdetails(Number(e.target.value)); setCurrentPage_clientdetails(1); }}
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
											value={searchQuery_clientdetails}
											onChange={(e) => { setSearchQuery_clientdetails(e.target.value); setCurrentPage_clientdetails(1); }}
										/>
									</div>
								</div>
<div
														className="custom-datatable-filter table-responsive no-datatable-length border">
														<table className="table datatable">
															<thead className="thead-light">
																<tr>
																	<th>Name</th>
																	<th>Size</th>
																	<th>Type</th>
																	<th>Modified</th>
																	<th>Share</th>
																	<th></th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>
																		<div
																			className="d-flex align-items-center file-name-icon">
																			<a href="#"
																				className="avatar avatar-md bg-light"
																				data-bs-toggle="offcanvas"
																				data-bs-target="#preview">
																				<img src="/assets/img/icons/file-01.svg"
																					className="img-fluid" alt="img" /></a>
																			<div className="ms-2">
																				<p className="text-title fw-medium  mb-0"><a
																						href="#"
																						data-bs-toggle="offcanvas"
																						data-bs-target="#preview">Secret</a>
																				</p>
																			</div>
																		</div>
																	</td>
																	<td>7.6 MB</td>
																	<td>Doc</td>
																	<td>
																		<p className="text-title mb-0">Mar 15, 2025</p>
																		<span>05:00:14 PM</span>
																	</td>
																	<td>
																		<div
																			className="avatar-list-stacked avatar-group-sm">
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-27.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-29.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-12.jpg"
																					alt="img" />
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="d-flex align-items-center">
																			<div className="rating-select me-2">
																				<a href="#" onClick={(e) => e.preventDefault()}><i
																						className="ti ti-star"></i></a>
																			</div>
																			<div className="dropdown">
																				<a href="#"
																					className="d-flex align-items-center justify-content-center"
																					data-bs-toggle="dropdown"
																					aria-expanded="false">
																					<i className="ti ti-dots fs-14"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-right p-3">
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-trash me-2"></i>Permanent
																							Delete
																						</a>
																					</li>
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-edit-circle me-2"></i>Restore
																							File
																						</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>
																		<div
																			className="d-flex align-items-center file-name-icon">
																			<a href="#"
																				className="avatar avatar-md bg-light"
																				data-bs-toggle="offcanvas"
																				data-bs-target="#preview">
																				<img src="/assets/img/icons/file-02.svg"
																					className="img-fluid" alt="img" /></a>
																			<div className="ms-2">
																				<p className="text-title fw-medium  mb-0"><a
																						href="#"
																						data-bs-toggle="offcanvas"
																						data-bs-target="#preview">Sophie
																						Headrick</a></p>
																			</div>
																		</div>
																	</td>
																	<td>7.4 MB</td>
																	<td>PDF</td>
																	<td>
																		<p className="text-title mb-0">Jan 8, 2025</p>
																		<span>08:20:13 PM</span>
																	</td>
																	<td>
																		<div
																			className="avatar-list-stacked avatar-group-sm">
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-15.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-16.jpg"
																					alt="img" />
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="d-flex align-items-center">
																			<div className="rating-select me-2">
																				<a href="#" onClick={(e) => e.preventDefault()}><i
																						className="ti ti-star"></i></a>
																			</div>
																			<div className="dropdown">
																				<a href="#"
																					className="d-flex align-items-center justify-content-center"
																					data-bs-toggle="dropdown"
																					aria-expanded="false">
																					<i className="ti ti-dots fs-14"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-right p-3">
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-trash me-2"></i>Permanent
																							Delete
																						</a>
																					</li>
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-edit-circle me-2"></i>Restore
																							File
																						</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>
																		<div
																			className="d-flex align-items-center file-name-icon">
																			<a href="#"
																				className="avatar avatar-md bg-light"
																				data-bs-toggle="offcanvas"
																				data-bs-target="#preview">
																				<img src="/assets/img/icons/file-03.svg"
																					className="img-fluid" alt="img" /></a>
																			<div className="ms-2">
																				<p className="text-title fw-medium  mb-0"><a
																						href="#"
																						data-bs-toggle="offcanvas"
																						data-bs-target="#preview">Gallery</a>
																				</p>
																			</div>
																		</div>
																	</td>
																	<td>6.1 MB</td>
																	<td>Image</td>
																	<td>
																		<p className="text-title mb-0">Aug 6, 2025</p>
																		<span>04:10:12 PM</span>
																	</td>
																	<td>
																		<div
																			className="avatar-list-stacked avatar-group-sm">
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-02.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-03.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-05.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-06.jpg"
																					alt="img" />
																			</span>
																			<a className="avatar bg-primary avatar-rounded text-fixed-white"
																				href="#" onClick={(e) => e.preventDefault()}>
																				+1
																			</a>
																		</div>
																	</td>
																	<td>
																		<div className="d-flex align-items-center">
																			<div className="rating-select me-2">
																				<a href="#" onClick={(e) => e.preventDefault()}><i
																						className="ti ti-star"></i></a>
																			</div>
																			<div className="dropdown">
																				<a href="#"
																					className="d-flex align-items-center justify-content-center"
																					data-bs-toggle="dropdown"
																					aria-expanded="false">
																					<i className="ti ti-dots fs-14"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-right p-3">
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-trash me-2"></i>Permanent
																							Delete
																						</a>
																					</li>
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-edit-circle me-2"></i>Restore
																							File
																						</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>
																		<div
																			className="d-flex align-items-center file-name-icon">
																			<a href="#"
																				className="avatar avatar-md bg-light"
																				data-bs-toggle="offcanvas"
																				data-bs-target="#preview">
																				<img src="/assets/img/icons/file-04.svg"
																					className="img-fluid" alt="img" /></a>
																			<div className="ms-2">
																				<p className="text-title fw-medium  mb-0"><a
																						href="#"
																						data-bs-toggle="offcanvas"
																						data-bs-target="#preview">Doris
																						Crowley</a></p>
																			</div>
																		</div>
																	</td>
																	<td>5.2 MB</td>
																	<td>Folder</td>
																	<td>
																		<p className="text-title mb-0">Jan 6, 2025</p>
																		<span>03:40:14 PM</span>
																	</td>
																	<td>
																		<div
																			className="avatar-list-stacked avatar-group-sm">
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-06.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-10.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-15.jpg"
																					alt="img" />
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="d-flex align-items-center">
																			<div className="rating-select me-2">
																				<a href="#" onClick={(e) => e.preventDefault()}><i
																						className="ti ti-star"></i></a>
																			</div>
																			<div className="dropdown">
																				<a href="#"
																					className="d-flex align-items-center justify-content-center"
																					data-bs-toggle="dropdown"
																					aria-expanded="false">
																					<i className="ti ti-dots fs-14"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-right p-3">
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-trash me-2"></i>Permanent
																							Delete
																						</a>
																					</li>
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-edit-circle me-2"></i>Restore
																							File
																						</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>
																		<div
																			className="d-flex align-items-center file-name-icon">
																			<a href="#"
																				className="avatar avatar-md bg-light"
																				data-bs-toggle="offcanvas"
																				data-bs-target="#preview">
																				<img src="/assets/img/icons/file-05.svg"
																					className="img-fluid" alt="img" /></a>
																			<div className="ms-2">
																				<p className="text-title fw-medium  mb-0"><a
																						href="#"
																						data-bs-toggle="offcanvas"
																						data-bs-target="#preview">Cheat_codez</a>
																				</p>
																			</div>
																		</div>
																	</td>
																	<td>8 MB</td>
																	<td>Xml</td>
																	<td>
																		<p className="text-title mb-0">Oct 12, 2025</p>
																		<span>05:00:14 PM</span>
																	</td>
																	<td>
																		<div
																			className="avatar-list-stacked avatar-group-sm">
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-04.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-28.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-14.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-15.jpg"
																					alt="img" />
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="d-flex align-items-center">
																			<div className="rating-select me-2">
																				<a href="#" onClick={(e) => e.preventDefault()}><i
																						className="ti ti-star"></i></a>
																			</div>
																			<div className="dropdown">
																				<a href="#"
																					className="d-flex align-items-center justify-content-center"
																					data-bs-toggle="dropdown"
																					aria-expanded="false">
																					<i className="ti ti-dots fs-14"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-right p-3">
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-trash me-2"></i>Permanent
																							Delete
																						</a>
																					</li>
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-edit-circle me-2"></i>Restore
																							File
																						</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane" id="bottom-justified-tab2" role="tabpanel">
									<div className="accordion accordions-items-seperate">
										<div className="accordion-item">
											
											<div id="primaryBorderOne2"
												className="accordion-collapse collapse show border-top"
												aria-labelledby="headingOne2">
												<div className="accordion-body pb-0">
													<div className="row">
														<div className="col-xxl-6 col-lg-12 col-md-6">
															<div className="card">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center pb-3 mb-3 border-bottom">
																		<a href="/project-details"
																			className="flex-shrink-0 me-2">
																			<img src="/assets/img/social/project-01.svg"
																				alt="Img" />
																		</a>
																		<div>
																			<h6 className="mb-1"><a
																					href="/project-details">Hospital
																					Administration</a></h6>
																			<div className="d-flex align-items-center">
																				<span>8 tasks</span>
																				<span className="mx-1"><i
																						className="ti ti-point-filled text-primary"></i></span>
																				<span>15  Completed</span>
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span
																					className="mb-1 d-block">Deadline</span>
																				<p className="text-dark">31 July 2025</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Value</span>
																				<p className="text-dark">$549987</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Project
																					Lead</span>
																				<h6
																					className="fw-normal d-flex align-items-center">
																					<img className="avatar avatar-xs rounded-circle me-1"
																						src="/assets/img/profiles/avatar-01.jpg"
																						alt="Img" />
																					Leona
																				</h6>
																			</div>
																		</div>
																	</div>
																	<div className="bg-light p-2">
																		<div className="row align-items-center">
																			<div className="col-6">
																				<span
																					className="fw-medium d-flex align-items-center">
																					<i
																						className="ti ti-clock text-primary me-2"></i>Total
																					565 Hrs
																				</span>
																			</div>
																			<div className="col-6">
																				<div>
																					<div
																						className="d-flex align-items-center justify-content-between mb-1">
																						<small className="text-dark">495
																							Hrs</small>
																						<small className="text-dark">70
																							Hrs</small>
																					</div>
																					<div className="progress  progress-xs">
																						<div className="progress-bar bg-warning"
																							role="progressbar"
																							style={{width: '75%'}}></div>
																						<div className="progress-bar bg-success"
																							role="progressbar"
																							style={{width: '25%'}}></div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-xxl-6 col-lg-12 col-md-6">
															<div className="card">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center pb-3 mb-3 border-bottom">
																		<a href="/project-details"
																			className="flex-shrink-0 me-2">
																			<img src="/assets/img/social/project-02.svg"
																				alt="Img" />
																		</a>
																		<div>
																			<h6 className="mb-1"><a
																					href="/project-details">Video
																					Calling App</a></h6>
																			<div className="d-flex align-items-center">
																				<span>22 tasks</span>
																				<span className="mx-1"><i
																						className="ti ti-point-filled text-primary"></i></span>
																				<span>15 Completed</span>
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span
																					className="mb-1 d-block">Deadline</span>
																				<p className="text-dark">16 Jan 2025</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Value</span>
																				<p className="text-dark">$279987</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Project
																					Lead</span>
																				<h6
																					className="fw-normal d-flex align-items-center">
																					<img className="avatar avatar-xs rounded-circle me-1"
																						src="/assets/img/profiles/avatar-02.jpg"
																						alt="Img" />
																					Mathis
																				</h6>
																			</div>
																		</div>
																	</div>
																	<div className="bg-light p-2">
																		<div className="row align-items-center">
																			<div className="col-6">
																				<span
																					className="fw-medium d-flex align-items-center">
																					<i
																						className="ti ti-clock text-primary me-2"></i>Total
																					700 Hrs
																				</span>
																			</div>
																			<div className="col-6">
																				<div>
																					<div
																						className="d-flex align-items-center justify-content-between mb-1">
																						<small className="text-dark">605
																							Hrs</small>
																						<small className="text-dark">95
																							Hrs</small>
																					</div>
																					<div className="progress  progress-xs">
																						<div className="progress-bar bg-warning"
																							role="progressbar"
																							style={{width: '75%'}}></div>
																						<div className="progress-bar bg-success"
																							role="progressbar"
																							style={{width: '25%'}}></div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane" id="bottom-justified-tab3" role="tabpanel">
									<div className="accordion accordions-items-seperate">
										<div className="accordion-item">
											
											<div id="primaryBorderTwo2"
												className="accordion-collapse collapse show border-top"
												aria-labelledby="headingTwo2">
												<div className="accordion-body">
													<div className="list-group list-group-flush">
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center row-gap-3">
																<div className="col-md-7">
																	<div
																		className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
																		<div className="form-check form-check-md me-2">
																			<input className="form-check-input"
																				type="checkbox" />
																		</div>
																		<span
																			className="me-2 d-flex align-items-center rating-select"><i
																				className="ti ti-star-filled filled"></i></span>
																		<div className="strike-info">
																			<h4 className="fs-14">Patient appointment
																				booking</h4>
																		</div>
																	</div>
																</div>
																<div className="col-md-5">
																	<div
																		className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
																		<span
																			className="badge bg-soft-pink d-inline-flex align-items-center me-3"><i
																				className="fas fa-circle fs-6 me-1"></i>Onhold</span>
																		<div className="d-flex align-items-center">
																			<div
																				className="avatar-list-stacked avatar-group-sm">
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-13.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-14.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-15.jpg"
																						alt="img" />
																				</span>
																			</div>
																			<div className="dropdown ms-2">
																				<a href="#" onClick={(e) => e.preventDefault()}
																					className="d-inline-flex align-items-center"
																					data-bs-toggle="dropdown">
																					<i className="ti ti-dots-vertical"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-end p-3">
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#edit_todo"><i
																								className="ti ti-edit me-2"></i>Edit</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#delete_modal"><i
																								className="ti ti-trash me-2"></i>Delete</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#view_todo"><i
																								className="ti ti-eye me-2"></i>View</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center row-gap-3">
																<div className="col-md-7">
																	<div
																		className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
																		<div className="form-check form-check-md me-2">
																			<input className="form-check-input"
																				type="checkbox" />
																		</div>
																		<span
																			className="me-2 rating-select d-flex align-items-center"><i
																				className="ti ti-star"></i></span>
																		<div className="strike-info">
																			<h4 className="fs-14">Appointment booking with
																				payment gateway</h4>
																		</div>
																	</div>
																</div>
																<div className="col-md-5">
																	<div
																		className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
																		<span
																			className="badge bg-transparent-purple d-flex align-items-center me-3"><i
																				className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
																		<div className="d-flex align-items-center">
																			<div
																				className="avatar-list-stacked avatar-group-sm">
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-20.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-21.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-22.jpg"
																						alt="img" />
																				</span>
																			</div>
																			<div className="dropdown ms-2">
																				<a href="#" onClick={(e) => e.preventDefault()}
																					className="d-inline-flex align-items-center"
																					data-bs-toggle="dropdown">
																					<i className="ti ti-dots-vertical"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-end p-3">
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#edit_todo"><i
																								className="ti ti-edit me-2"></i>Edit</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#delete_modal"><i
																								className="ti ti-trash me-2"></i>Delete</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#view_todo"><i
																								className="ti ti-eye me-2"></i>View</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center row-gap-3">
																<div className="col-md-7">
																	<div
																		className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
																		<div className="form-check form-check-md me-2">
																			<input className="form-check-input"
																				type="checkbox" />
																		</div>
																		<span
																			className="me-2 rating-select d-flex align-items-center"><i
																				className="ti ti-star"></i></span>
																		<div className="strike-info">
																			<h4 className="fs-14">Patient and Doctor video
																				conferencing</h4>
																		</div>
																	</div>
																</div>
																<div className="col-md-5">
																	<div
																		className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
																		<span
																			className="badge badge-soft-success align-items-center me-3"><i
																				className="fas fa-circle fs-6 me-1"></i>Completed</span>
																		<div className="d-flex align-items-center">
																			<div
																				className="avatar-list-stacked avatar-group-sm">
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-28.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-29.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-24.jpg"
																						alt="img" />
																				</span>
																			</div>
																			<div className="dropdown ms-2">
																				<a href="#" onClick={(e) => e.preventDefault()}
																					className="d-inline-flex align-items-center"
																					data-bs-toggle="dropdown">
																					<i className="ti ti-dots-vertical"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-end p-3">
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#edit_todo"><i
																								className="ti ti-edit me-2"></i>Edit</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#delete_modal"><i
																								className="ti ti-trash me-2"></i>Delete</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#view_todo"><i
																								className="ti ti-eye me-2"></i>View</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded p-2">
															<div className="row align-items-center row-gap-3">
																<div className="col-md-7">
																	<div
																		className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
																		<div className="form-check form-check-md me-2">
																			<input className="form-check-input"
																				type="checkbox" checked="" />
																		</div>
																		<span
																			className="me-2 rating-select d-flex align-items-center"><i
																				className="ti ti-star"></i></span>
																		<div className="strike-info">
																			<h4 className="fs-14">Private chat module</h4>
																		</div>
																	</div>
																</div>
																<div className="col-md-5">
																	<div
																		className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
																		<span
																			className="badge badge-secondary-transparent d-flex align-items-center me-3"><i
																				className="fas fa-circle fs-6 me-1"></i>Pending</span>
																		<div className="d-flex align-items-center">
																			<div
																				className="avatar-list-stacked avatar-group-sm">
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-23.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-24.jpg"
																						alt="img" />
																				</span>
																				<span className="avatar avatar-rounded">
																					<img className="border border-white"
																						src="/assets/img/profiles/avatar-25.jpg"
																						alt="img" />
																				</span>
																			</div>
																			<div className="dropdown ms-2">
																				<a href="#" onClick={(e) => e.preventDefault()}
																					className="d-inline-flex align-items-center"
																					data-bs-toggle="dropdown">
																					<i className="ti ti-dots-vertical"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-end p-3">
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#edit_todo"><i
																								className="ti ti-edit me-2"></i>Edit</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#delete_modal"><i
																								className="ti ti-trash me-2"></i>Delete</a>
																					</li>
																					<li>
																						<a href="#" onClick={(e) => e.preventDefault()}
																							className="dropdown-item rounded-1"
																							data-bs-toggle="modal"
																							data-bs-target="#view_todo"><i
																								className="ti ti-eye me-2"></i>View</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane" id="bottom-justified-tab4" role="tabpanel">
									<div className="accordion accordions-items-seperate">
										<div className="accordion-item">
											
											<div id="primaryBorderThree2"
												className="accordion-collapse collapse show border-top"
												aria-labelledby="headingThree2">
												<div className="accordion-body">
													<div className="row align-items-center g-3 mb-3">
														<div className="col-sm-8">
															<h6>Total No of Invoice : 45</h6>
														</div>
														<div className="col-sm-4">
															<div className="position-relative input-icon">
																<span className="input-icon-addon">
																	<i className="ti ti-search"></i>
																</span>
																<input type="text" className="form-control"
																	placeholder="Search" />
															</div>
														</div>
													</div>
													<div className="list-group list-group-flush mb-3">
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center g-3">
																<div className="col-sm-6">
																	<div className="d-flex align-items-center">
																		<span
																			className="avatar avatar-lg bg-light flex-shrink-0 me-2"><i
																				className="ti ti-file-invoice text-dark fs-24"></i></span>
																		<div>
																			<h6 className="fw-medium mb-1">Phase 2
																				Completion</h6>
																			<p><a href="#" className="text-info">#INV-123
																				</a> 11 Sep 2025, 05:35 pm</p>
																		</div>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div>
																		<span>Amount</span>
																		<p className="text-dark">$6,598</p>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div
																		className="d-flex align-items-center justify-content-sm-end">
																		<span
																			className="badge badge-soft-success d-inline-flex  align-items-center me-4"><i
																				className="ti ti-point-filled me-1"></i>Paid</span>
																		<a href="#" className="btn btn-icon btn-sm"><i
																				className="ti ti-edit"></i></a>
																		<a href="#" className="btn btn-icon btn-sm "><i
																				className="ti ti-trash"></i></a>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center g-3">
																<div className="col-sm-6">
																	<div className="d-flex align-items-center">
																		<span
																			className="avatar avatar-lg bg-light flex-shrink-0 me-2"><i
																				className="ti ti-file-invoice text-dark fs-24"></i></span>
																		<div>
																			<h6 className="fw-medium mb-1">Advance for
																				Project</h6>
																			<p><a href="#" className="text-info">#INV-124
																				</a> 14 Sep 2025, 05:35 pm</p>
																		</div>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div>
																		<span>Amount</span>
																		<p className="text-dark">$3312</p>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div
																		className="d-flex align-items-center justify-content-sm-end">
																		<span
																			className="badge badge-soft-success d-inline-flex  align-items-center me-4"><i
																				className="ti ti-point-filled me-1"></i>Hold</span>
																		<a href="#" className="btn btn-icon btn-sm"><i
																				className="ti ti-edit"></i></a>
																		<a href="#" className="btn btn-icon btn-sm "><i
																				className="ti ti-trash"></i></a>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center g-3">
																<div className="col-sm-6">
																	<div className="d-flex align-items-center">
																		<span
																			className="avatar avatar-lg bg-light flex-shrink-0 me-2"><i
																				className="ti ti-file-invoice text-dark fs-24"></i></span>
																		<div>
																			<h6 className="fw-medium mb-1">Changes & design
																				Alignments</h6>
																			<p><a href="#" className="text-info">#INV-125
																				</a> 15 Sep 2025, 05:35 pm</p>
																		</div>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div>
																		<span>Amount</span>
																		<p className="text-dark">$4154</p>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div
																		className="d-flex align-items-center justify-content-sm-end">
																		<span
																			className="badge badge-soft-success d-inline-flex  align-items-center me-4"><i
																				className="ti ti-point-filled me-1"></i>Paid</span>
																		<a href="#" className="btn btn-icon btn-sm"><i
																				className="ti ti-edit"></i></a>
																		<a href="#" className="btn btn-icon btn-sm "><i
																				className="ti ti-trash"></i></a>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded mb-2 p-2">
															<div className="row align-items-center g-3">
																<div className="col-sm-6">
																	<div className="d-flex align-items-center">
																		<span
																			className="avatar avatar-lg bg-light flex-shrink-0 me-2"><i
																				className="ti ti-file-invoice text-dark fs-24"></i></span>
																		<div>
																			<h6 className="fw-medium mb-1">Added New
																				Functionality</h6>
																			<p><a href="#" className="text-info">#INV-126
																				</a> 16 Sep 2025, 05:35 pm</p>
																		</div>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div>
																		<span>Amount</span>
																		<p className="text-dark">$658</p>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div
																		className="d-flex align-items-center justify-content-sm-end">
																		<span
																			className="badge badge-soft-success d-inline-flex  align-items-center me-4"><i
																				className="ti ti-point-filled me-1"></i>Paid</span>
																		<a href="#" className="btn btn-icon btn-sm"><i
																				className="ti ti-edit"></i></a>
																		<a href="#" className="btn btn-icon btn-sm "><i
																				className="ti ti-trash"></i></a>
																	</div>
																</div>
															</div>
														</div>
														<div className="list-group-item border rounded p-2">
															<div className="row align-items-center g-3">
																<div className="col-sm-6">
																	<div className="d-flex align-items-center">
																		<span
																			className="avatar avatar-lg bg-light flex-shrink-0 me-2"><i
																				className="ti ti-file-invoice text-dark fs-24"></i></span>
																		<div>
																			<h6 className="fw-medium mb-1">Phase 1
																				Completion</h6>
																			<p><a href="#" className="text-info">#INV-127
																				</a> 17 Sep 2025, 05:35 pm</p>
																		</div>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div>
																		<span>Amount</span>
																		<p className="text-dark">$1259</p>
																	</div>
																</div>
																<div className="col-sm-3">
																	<div
																		className="d-flex align-items-center justify-content-sm-end">
																		<span
																			className="badge badge-soft-danger d-inline-flex  align-items-center me-4"><i
																				className="ti ti-point-filled me-1"></i>Unpaid</span>
																		<a href="#" className="btn btn-icon btn-sm"><i
																				className="ti ti-edit"></i></a>
																		<a href="#" className="btn btn-icon btn-sm "><i
																				className="ti ti-trash"></i></a>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="text-center">
														<a href="#" className="btn btn-primary btn-sm">Load More</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane" id="bottom-justified-tab5" role="tabpanel">
									<div className="accordion accordions-items-seperate">
										<div className="accordion-item">
											
											<div id="primaryBorderFour2"
												className="accordion-collapse collapse show border-top"
												aria-labelledby="headingFour2">
												<div className="accordion-body">
													<div className="row align-items-center g-3 mb-3">
														<div className="col-sm-8">
															<h6>Total No of Notes : 45</h6>
														</div>
														<div className="col-sm-4">
															<div className="position-relative input-icon">
																<span className="input-icon-addon">
																	<i className="ti ti-search"></i>
																</span>
																<input type="text" className="form-control"
																	placeholder="Search" />
															</div>
														</div>
													</div>
													<div className="row">
														<div className="col-md-4 col-sm-6 d-flex">
															<div className="card flex-fill">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center justify-content-between mb-2">
																		<h6 className="text-gray-5 fw-medium">15 May 2025
																		</h6>
																		<div className="dropdown">
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="d-inline-flex align-items-center"
																				data-bs-toggle="dropdown"
																				aria-expanded="false">
																				<i className="ti ti-dots-vertical"></i>
																			</a>
																			<ul
																				className="dropdown-menu dropdown-menu-end p-3">
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-edit me-2"></i>Edit</a>
																				</li>
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-trash me-1"></i>Delete</a>
																				</li>
																			</ul>
																		</div>
																	</div>
																	<h6 className="d-flex align-items-center mb-2"><i
																			className="ti ti-point-filled text-primary me-1"></i>Changes
																		& design</h6>
																	<p className="text-truncate line-clamb-3">An office
																		management app project streamlines
																		administrative tasks by integrating
																		tools for scheduling, communication, and
																		task management, enhancing overall productivity
																		and efficiency.
																	</p>
																</div>
															</div>
														</div>
														<div className="col-md-4 col-sm-6 d-flex">
															<div className="card flex-fill">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center justify-content-between mb-2">
																		<h6 className="text-gray-5 fw-medium">16 May 2025
																		</h6>
																		<div className="dropdown">
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="d-inline-flex align-items-center"
																				data-bs-toggle="dropdown"
																				aria-expanded="false">
																				<i className="ti ti-dots-vertical"></i>
																			</a>
																			<ul
																				className="dropdown-menu dropdown-menu-end p-3">
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-edit me-2"></i>Edit</a>
																				</li>
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-trash me-1"></i>Delete</a>
																				</li>
																			</ul>
																		</div>
																	</div>
																	<h6 className="d-flex align-items-center mb-2"><i
																			className="ti ti-point-filled text-success me-1"></i>Phase
																		1 Completion</h6>
																	<p className="text-truncate line-clamb-3">
																		An office management app project streamlines
																		administrative tasks by integrating tools for
																		scheduling, communication, and task
																		management, enhancing overall productivity and
																		efficiency.
																	</p>
																</div>
															</div>
														</div>
														<div className="col-md-4 col-sm-6 d-flex">
															<div className="card flex-fill">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center justify-content-between mb-2">
																		<h6 className="text-gray-5 fw-medium">17 May 2025
																		</h6>
																		<div className="dropdown">
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="d-inline-flex align-items-center"
																				data-bs-toggle="dropdown"
																				aria-expanded="false">
																				<i className="ti ti-dots-vertical"></i>
																			</a>
																			<ul
																				className="dropdown-menu dropdown-menu-end p-3">
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-edit me-2"></i>Edit</a>
																				</li>
																				<li>
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="dropdown-item rounded-1"><i
																							className="ti ti-trash me-1"></i>Delete</a>
																				</li>
																			</ul>
																		</div>
																	</div>
																	<h6 className="d-flex align-items-center mb-2"><i
																			className="ti ti-point-filled text-danger me-1"></i>Phase
																		2 Completion</h6>
																	<p className="text-truncate line-clamb-3">
																		An office management app project streamlines
																		administrative tasks by integrating tools for
																		scheduling, communication, and task
																		management, enhancing overall productivity and
																		efficiency.
																	</p>
																</div>
															</div>
														</div>
														<div className="col-md-12">
															<div className="text-center">
																<a href="#" className="btn btn-primary btn-sm">Load More</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane" id="bottom-justified-tab6" role="tabpanel">
									<div className="accordion accordions-items-seperate">
										<div className="accordion-item">
											
											<div id="primaryBorderFive2"
												className="accordion-collapse collapse show border-top"
												aria-labelledby="headingFive2">
												<div className="accordion-body">
													<div className="row align-items-center g-3 mb-3">
														<div className="col-sm-4">
															<h6>Total No of Documents : 45</h6>
														</div>
														<div className="col-sm-8">
															<div className="d-flex align-items-center">
																<div className="dropdown me-2">
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-toggle btn btn-white"
																		data-bs-toggle="dropdown" aria-expanded="false">
																		Sort By : Docs Type
																	</a>
																	<ul className="dropdown-menu dropdown-menu-end p-3">
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Docs</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Pdf</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Image</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Folder</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Xml</a>
																		</li>
																	</ul>
																</div>
																<div className="position-relative input-icon flex-fill">
																	<span className="input-icon-addon">
																		<i className="ti ti-search"></i>
																	</span>
																	<input type="text" className="form-control"
																		placeholder="Search" />
																</div>
															</div>
														</div>
													</div>
													<div
														className="custom-datatable-filter table-responsive no-datatable-length border">
														<table className="table datatable">
															<thead className="thead-light">
																<tr>
																	<th>Name</th>
																	<th>Size</th>
																	<th>Type</th>
																	<th>Modified</th>
																	<th>Share</th>
																	<th></th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td>
																		<div
																			className="d-flex align-items-center file-name-icon">
																			<a href="#"
																				className="avatar avatar-md bg-light"
																				data-bs-toggle="offcanvas"
																				data-bs-target="#preview">
																				<img src="/assets/img/icons/file-01.svg"
																					className="img-fluid" alt="img" /></a>
																			<div className="ms-2">
																				<p className="text-title fw-medium  mb-0"><a
																						href="#"
																						data-bs-toggle="offcanvas"
																						data-bs-target="#preview">Secret</a>
																				</p>
																			</div>
																		</div>
																	</td>
																	<td>7.6 MB</td>
																	<td>Doc</td>
																	<td>
																		<p className="text-title mb-0">Mar 15, 2025</p>
																		<span>05:00:14 PM</span>
																	</td>
																	<td>
																		<div
																			className="avatar-list-stacked avatar-group-sm">
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-27.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-29.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-12.jpg"
																					alt="img" />
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="d-flex align-items-center">
																			<div className="rating-select me-2">
																				<a href="#" onClick={(e) => e.preventDefault()}><i
																						className="ti ti-star"></i></a>
																			</div>
																			<div className="dropdown">
																				<a href="#"
																					className="d-flex align-items-center justify-content-center"
																					data-bs-toggle="dropdown"
																					aria-expanded="false">
																					<i className="ti ti-dots fs-14"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-right p-3">
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-trash me-2"></i>Permanent
																							Delete
																						</a>
																					</li>
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-edit-circle me-2"></i>Restore
																							File
																						</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>
																		<div
																			className="d-flex align-items-center file-name-icon">
																			<a href="#"
																				className="avatar avatar-md bg-light"
																				data-bs-toggle="offcanvas"
																				data-bs-target="#preview">
																				<img src="/assets/img/icons/file-02.svg"
																					className="img-fluid" alt="img" /></a>
																			<div className="ms-2">
																				<p className="text-title fw-medium  mb-0"><a
																						href="#"
																						data-bs-toggle="offcanvas"
																						data-bs-target="#preview">Sophie
																						Headrick</a></p>
																			</div>
																		</div>
																	</td>
																	<td>7.4 MB</td>
																	<td>PDF</td>
																	<td>
																		<p className="text-title mb-0">Jan 8, 2025</p>
																		<span>08:20:13 PM</span>
																	</td>
																	<td>
																		<div
																			className="avatar-list-stacked avatar-group-sm">
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-15.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-16.jpg"
																					alt="img" />
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="d-flex align-items-center">
																			<div className="rating-select me-2">
																				<a href="#" onClick={(e) => e.preventDefault()}><i
																						className="ti ti-star"></i></a>
																			</div>
																			<div className="dropdown">
																				<a href="#"
																					className="d-flex align-items-center justify-content-center"
																					data-bs-toggle="dropdown"
																					aria-expanded="false">
																					<i className="ti ti-dots fs-14"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-right p-3">
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-trash me-2"></i>Permanent
																							Delete
																						</a>
																					</li>
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-edit-circle me-2"></i>Restore
																							File
																						</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>
																		<div
																			className="d-flex align-items-center file-name-icon">
																			<a href="#"
																				className="avatar avatar-md bg-light"
																				data-bs-toggle="offcanvas"
																				data-bs-target="#preview">
																				<img src="/assets/img/icons/file-03.svg"
																					className="img-fluid" alt="img" /></a>
																			<div className="ms-2">
																				<p className="text-title fw-medium  mb-0"><a
																						href="#"
																						data-bs-toggle="offcanvas"
																						data-bs-target="#preview">Gallery</a>
																				</p>
																			</div>
																		</div>
																	</td>
																	<td>6.1 MB</td>
																	<td>Image</td>
																	<td>
																		<p className="text-title mb-0">Aug 6, 2025</p>
																		<span>04:10:12 PM</span>
																	</td>
																	<td>
																		<div
																			className="avatar-list-stacked avatar-group-sm">
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-02.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-03.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-05.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-06.jpg"
																					alt="img" />
																			</span>
																			<a className="avatar bg-primary avatar-rounded text-fixed-white"
																				href="#" onClick={(e) => e.preventDefault()}>
																				+1
																			</a>
																		</div>
																	</td>
																	<td>
																		<div className="d-flex align-items-center">
																			<div className="rating-select me-2">
																				<a href="#" onClick={(e) => e.preventDefault()}><i
																						className="ti ti-star"></i></a>
																			</div>
																			<div className="dropdown">
																				<a href="#"
																					className="d-flex align-items-center justify-content-center"
																					data-bs-toggle="dropdown"
																					aria-expanded="false">
																					<i className="ti ti-dots fs-14"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-right p-3">
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-trash me-2"></i>Permanent
																							Delete
																						</a>
																					</li>
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-edit-circle me-2"></i>Restore
																							File
																						</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>
																		<div
																			className="d-flex align-items-center file-name-icon">
																			<a href="#"
																				className="avatar avatar-md bg-light"
																				data-bs-toggle="offcanvas"
																				data-bs-target="#preview">
																				<img src="/assets/img/icons/file-04.svg"
																					className="img-fluid" alt="img" /></a>
																			<div className="ms-2">
																				<p className="text-title fw-medium  mb-0"><a
																						href="#"
																						data-bs-toggle="offcanvas"
																						data-bs-target="#preview">Doris
																						Crowley</a></p>
																			</div>
																		</div>
																	</td>
																	<td>5.2 MB</td>
																	<td>Folder</td>
																	<td>
																		<p className="text-title mb-0">Jan 6, 2025</p>
																		<span>03:40:14 PM</span>
																	</td>
																	<td>
																		<div
																			className="avatar-list-stacked avatar-group-sm">
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-06.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-10.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-15.jpg"
																					alt="img" />
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="d-flex align-items-center">
																			<div className="rating-select me-2">
																				<a href="#" onClick={(e) => e.preventDefault()}><i
																						className="ti ti-star"></i></a>
																			</div>
																			<div className="dropdown">
																				<a href="#"
																					className="d-flex align-items-center justify-content-center"
																					data-bs-toggle="dropdown"
																					aria-expanded="false">
																					<i className="ti ti-dots fs-14"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-right p-3">
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-trash me-2"></i>Permanent
																							Delete
																						</a>
																					</li>
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-edit-circle me-2"></i>Restore
																							File
																						</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</td>
																</tr>
																<tr>
																	<td>
																		<div
																			className="d-flex align-items-center file-name-icon">
																			<a href="#"
																				className="avatar avatar-md bg-light"
																				data-bs-toggle="offcanvas"
																				data-bs-target="#preview">
																				<img src="/assets/img/icons/file-05.svg"
																					className="img-fluid" alt="img" /></a>
																			<div className="ms-2">
																				<p className="text-title fw-medium  mb-0"><a
																						href="#"
																						data-bs-toggle="offcanvas"
																						data-bs-target="#preview">Cheat_codez</a>
																				</p>
																			</div>
																		</div>
																	</td>
																	<td>8 MB</td>
																	<td>Xml</td>
																	<td>
																		<p className="text-title mb-0">Oct 12, 2025</p>
																		<span>05:00:14 PM</span>
																	</td>
																	<td>
																		<div
																			className="avatar-list-stacked avatar-group-sm">
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-04.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-28.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-14.jpg"
																					alt="img" />
																			</span>
																			<span className="avatar avatar-rounded">
																				<img className="border border-white"
																					src="/assets/img/profiles/avatar-15.jpg"
																					alt="img" />
																			</span>
																		</div>
																	</td>
																	<td>
																		<div className="d-flex align-items-center">
																			<div className="rating-select me-2">
																				<a href="#" onClick={(e) => e.preventDefault()}><i
																						className="ti ti-star"></i></a>
																			</div>
																			<div className="dropdown">
																				<a href="#"
																					className="d-flex align-items-center justify-content-center"
																					data-bs-toggle="dropdown"
																					aria-expanded="false">
																					<i className="ti ti-dots fs-14"></i>
																				</a>
																				<ul
																					className="dropdown-menu dropdown-menu-right p-3">
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-trash me-2"></i>Permanent
																							Delete
																						</a>
																					</li>
																					<li>
																						<a className="dropdown-item rounded-1"
																							href="#">
																							<i
																								className="ti ti-edit-circle me-2"></i>Restore
																							File
																						</a>
																					</li>
																				</ul>
																			</div>
																		</div>
																	</td>
																</tr>
															</tbody>
														</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_clientdetails - 1) * rowsPerPage_clientdetails + 1, 11)}-{Math.min(currentPage_clientdetails * rowsPerPage_clientdetails, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_clientdetails === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_clientdetails(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_clientdetails === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_clientdetails(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_clientdetails === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_clientdetails(p => Math.min(p + 1, 2))}>
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
							</div>
							<div className="text-end mb-4">
								<div className="dropdown">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="d-inline-flex align-items-center avatar avatar-lg avatar-rounded bg-primary"
										data-bs-toggle="dropdown">
										<i className="ti ti-plus fs-24 text-white"></i>
									</a>
									<ul
										className="dropdown-menu dropdown-menu-end bg-gray-900 dropdown-menu-md dropdown-menu-dark p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()}
												className="dropdown-item rounded-1 d-flex align-items-center">
												<span className="avatar avatar-md bg-gray-800 flex-shrink-0 me-2"><i
														className="ti ti-basket-code"></i></span>
												<div>
													<h6 className="fw-medium text-white mb-1">Add a Task</h6>
													<p className="text-white">Create a new Priority tasks </p>
												</div>
											</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()}
												className="dropdown-item rounded-1 d-flex align-items-center">
												<span className="avatar avatar-md bg-gray-800 flex-shrink-0 me-2"><i
														className="ti ti-file-invoice"></i></span>
												<div>
													<h6 className="fw-medium text-white mb-1">Add Invoice</h6>
													<p className="text-white">Create a new Billing</p>
												</div>
											</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()}
												className="dropdown-item rounded-1 d-flex align-items-center">
												<span className="avatar avatar-md bg-gray-800 flex-shrink-0 me-2"><i
														className="ti ti-file-description"></i></span>
												<div>
													<h6 className="fw-medium text-white mb-1">Notes</h6>
													<p className="text-white">Create new note for you & team</p>
												</div>
											</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()}
												className="dropdown-item rounded-1 d-flex align-items-center">
												<span className="avatar avatar-md bg-gray-800 flex-shrink-0 me-2"><i
														className="ti ti-folder-open"></i></span>
												<div>
													<h6 className="fw-medium text-white mb-1">Add Files</h6>
													<p className="text-white">Upload New files for this Client</p>
												</div>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default ClientDetails;
