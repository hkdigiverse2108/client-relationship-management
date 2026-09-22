import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeDetails = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
					<div className="my-auto mb-2">
						<h6 className="fw-medium d-inline-flex align-items-center mb-3 mb-sm-0"><a href="/employees">
								<i className="ti ti-arrow-left me-2"></i>Employee Details</a>
						</h6>
					</div>
					<div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
						<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_bank_satutory"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Bank & Statutory</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
					</div>
				</div>
				{/* /Breadcrumb */}

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
										<span className="badge badge-soft-dark fw-medium me-2">
											<i className="ti ti-point-filled me-1"></i>Software Developer
										</span>
										<span className="badge badge-soft-secondary fw-medium">10+ years of
											Experience</span>
									</div>
									<div>
										<div className="d-flex align-items-center justify-content-between mb-2">
											<span className="d-inline-flex align-items-center">
												<i className="ti ti-id me-2"></i>
												Client ID
											</span>
											<p className="text-dark">CLT-0024</p>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-2">
											<span className="d-inline-flex align-items-center">
												<i className="ti ti-star me-2"></i>
												Team
											</span>
											<p className="text-dark">UI/UX Design</p>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-2">
											<span className="d-inline-flex align-items-center">
												<i className="ti ti-calendar-check me-2"></i>
												Date Of Join
											</span>
											<p className="text-dark">1st Jan 2023</p>
										</div>
										<div className="d-flex align-items-center justify-content-between">
											<span className="d-inline-flex align-items-center">
												<i className="ti ti-calendar-check me-2"></i>
												Report Office
											</span>
											<div className="d-flex align-items-center">
												<span className="avatar avatar-sm avatar-rounded mx-1 me-2">
													<img src="/assets/img/profiles/avatar-12.jpg" alt="Img" />
												</span>
												<p className="text-gray-9 mb-0">Doglas Martini</p>
											</div>
										</div>
										<div className="row gx-2 mt-3">
											<div className="col-6">
												<div>
													<a href="#" className="btn btn-dark w-100" data-bs-toggle="modal"
														data-bs-target="#edit_employee"><i
															className="ti ti-edit me-1"></i>Edit Info</a>
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
											data-bs-target="#edit_employee"><i className="ti ti-edit"></i></a>
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
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-gender-male me-2"></i>
											Gender
										</span>
										<p className="text-dark text-end">Male</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-cake me-2"></i>
											Birdthday
										</span>
										<p className="text-dark text-end">24th July 2000</p>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-map-pin-check me-2"></i>
											Address
										</span>
										<p className="text-dark text-end">1861 Bayonne Ave, <br /> Manchester, NJ, 08759</p>
									</div>
								</div>
								<div className="p-3 border-bottom">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6>Personal Information</h6>
										<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm" data-bs-toggle="modal"
											data-bs-target="#edit_personal"><i className="ti ti-edit"></i></a>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-e-passport me-2"></i>
											Passport No
										</span>
										<p className="text-dark">QRET4566FGRT</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-calendar-x me-2"></i>
											Passport Exp Date
										</span>
										<p className="text-dark text-end">15 May 2029</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-gender-male me-2"></i>
											Nationality
										</span>
										<p className="text-dark text-end">Indian</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-bookmark-plus me-2"></i>
											Religion
										</span>
										<p className="text-dark text-end">Christianity</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-hotel-service me-2"></i>
											Marital status
										</span>
										<p className="text-dark text-end">Yes</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-briefcase-2 me-2"></i>
											Employment of spouse
										</span>
										<p className="text-dark text-end">No</p>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-baby-bottle me-2"></i>
											No. of children
										</span>
										<p className="text-dark text-end">2</p>
									</div>
								</div>
							</div>
						</div>
						<div className="d-flex align-items-center justify-content-between mb-2">
							<h6>Emergency Contact Number</h6>
							<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm" data-bs-toggle="modal"
								data-bs-target="#edit_emergency"><i className="ti ti-edit"></i></a>
						</div>
						<div className="card">
							<div className="card-body p-0">
								<div className="p-3 border-bottom">
									<div className="d-flex align-items-center justify-content-between">
										<div>
											<span className="d-inline-flex align-items-center">
												Primary
											</span>
											<h6 className="d-flex align-items-center fw-medium mt-1">Adrian Peralt <span
													className="d-inline-flex mx-1"><i
														className="ti ti-point-filled text-danger"></i></span>Father</h6>
										</div>
										<p className="text-dark">+1 127 2685 598</p>
									</div>
								</div>
								<div className="p-3 border-bottom">
									<div className="d-flex align-items-center justify-content-between">
										<div>
											<span className="d-inline-flex align-items-center">
												Secondry
											</span>
											<h6 className="d-flex align-items-center fw-medium mt-1">Karen Wills <span
													className="d-inline-flex mx-1"><i
														className="ti ti-point-filled text-danger"></i></span>Mother</h6>
										</div>
										<p className="text-dark">+1 989 7774 787</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-8">
						<div>
							<div className="tab-content custom-accordion-items">
								<div className="tab-pane active show" id="bottom-justified-tab1" role="tabpanel">
									<div className="accordion accordions-items-seperate" id="accordionExample">
										<div className="accordion-item">
											
											<div id="primaryBorderOne"
												className="accordion-collapse collapse show border-top"
												aria-labelledby="headingOne" data-bs-parent="#accordionExample">
												<div className="accordion-body mt-2">
													As an award winning designer, I deliver exceptional quality work and
													bring value to your brand! With 10 years of experience and 350+
													projects completed worldwide with satisfied customers, I developed
													the 360° brand approach, which helped me to create numerous brands
													that are relevant, meaningful and loved.
												</div>
											</div>
										</div>
										<div className="accordion-item">
											
											<div id="primaryBorderTwo" className="accordion-collapse collapse border-top"
												aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
												<div className="accordion-body">
													<div className="row">
														<div className="col-md-3">
															<span className="d-inline-flex align-items-center">
																Bank Name
															</span>
															<h6 className="d-flex align-items-center fw-medium mt-1">Swiz
																Intenational Bank</h6>
														</div>
														<div className="col-md-3">
															<span className="d-inline-flex align-items-center">
																Bank account no
															</span>
															<h6 className="d-flex align-items-center fw-medium mt-1">
																159843014641</h6>
														</div>
														<div className="col-md-3">
															<span className="d-inline-flex align-items-center">
																IFSC Code
															</span>
															<h6 className="d-flex align-items-center fw-medium mt-1">
																ICI24504</h6>
														</div>
														<div className="col-md-3">
															<span className="d-inline-flex align-items-center">
																Branch
															</span>
															<h6 className="d-flex align-items-center fw-medium mt-1">Alabama
																USA</h6>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											
											<div id="primaryBorderThree" className="accordion-collapse collapse border-top"
												aria-labelledby="headingThree" data-bs-parent="#accordionExample">
												<div className="accordion-body">
													<div className="row">
														<div className="col-md-3">
															<span className="d-inline-flex align-items-center">
																Name
															</span>
															<h6 className="d-flex align-items-center fw-medium mt-1">Hendry
																Peralt</h6>
														</div>
														<div className="col-md-3">
															<span className="d-inline-flex align-items-center">
																Relationship
															</span>
															<h6 className="d-flex align-items-center fw-medium mt-1">Brother
															</h6>
														</div>
														<div className="col-md-3">
															<span className="d-inline-flex align-items-center">
																Date of birth
															</span>
															<h6 className="d-flex align-items-center fw-medium mt-1">25 May
																2014</h6>
														</div>
														<div className="col-md-3">
															<span className="d-inline-flex align-items-center">
																Phone
															</span>
															<h6 className="d-flex align-items-center fw-medium mt-1">+1 265
																6956 961</h6>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<div className="accordion-item">
													<div className="row">
														
														<div id="primaryBorderFour"
															className="accordion-collapse collapse border-top"
															aria-labelledby="headingFour"
															data-bs-parent="#accordionExample">
															<div className="accordion-body">
																<div>
																	<div className="mb-3">
																		<div
																			className="d-flex align-items-center justify-content-between">
																			<div>
																				<span
																					className="d-inline-flex align-items-center fw-normal">
																					Oxford University
																				</span>
																				<h6
																					className="d-flex align-items-center mt-1">
																					Computer Science</h6>
																			</div>
																			<p className="text-dark">2020 - 2022</p>
																		</div>
																	</div>
																	<div className="mb-3">
																		<div
																			className="d-flex align-items-center justify-content-between">
																			<div>
																				<span
																					className="d-inline-flex align-items-center fw-normal">
																					Cambridge University
																				</span>
																				<h6
																					className="d-flex align-items-center mt-1">
																					Computer Network & Systems</h6>
																			</div>
																			<p className="text-dark">2016- 2019</p>
																		</div>
																	</div>
																	<div>
																		<div
																			className="d-flex align-items-center justify-content-between">
																			<div>
																				<span
																					className="d-inline-flex align-items-center fw-normal">
																					Oxford School
																				</span>
																				<h6
																					className="d-flex align-items-center mt-1">
																					Grade X</h6>
																			</div>
																			<p className="text-dark">2012 - 2016</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="accordion-item">
													<div className="row">
														
														<div id="primaryBorderFive"
															className="accordion-collapse collapse border-top"
															aria-labelledby="headingFive"
															data-bs-parent="#accordionExample">
															<div className="accordion-body">
																<div>
																	<div className="mb-3">
																		<div
																			className="d-flex align-items-center justify-content-between">
																			<div>
																				<h6
																					className="d-inline-flex align-items-center fw-medium">
																					Google
																				</h6>
																				<span
																					className="d-flex align-items-center badge bg-secondary-transparent mt-1"><i
																						className="ti ti-point-filled me-1"></i>UI/UX
																					Developer</span>
																			</div>
																			<p className="text-dark">Jan 2013 - Present</p>
																		</div>
																	</div>
																	<div className="mb-3">
																		<div
																			className="d-flex align-items-center justify-content-between">
																			<div>
																				<h6
																					className="d-inline-flex align-items-center fw-medium">
																					Salesforce
																				</h6>
																				<span
																					className="d-flex align-items-center badge bg-secondary-transparent mt-1"><i
																						className="ti ti-point-filled me-1"></i>Web
																					Developer</span>
																			</div>
																			<p className="text-dark">Dec 2012- Jan 2015</p>
																		</div>
																	</div>
																	<div>
																		<div
																			className="d-flex align-items-center justify-content-between">
																			<div>
																				<h6
																					className="d-inline-flex align-items-center fw-medium">
																					HubSpot
																				</h6>
																				<span
																					className="d-flex align-items-center badge bg-secondary-transparent mt-1"><i
																						className="ti ti-point-filled me-1"></i>Software
																					Developer</span>
																			</div>
																			<p className="text-dark">Dec 2011- Jan 2012</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="card">
											<div className="card-body">
												<div className="contact-grids-tab p-0 mb-3">
													<ul className="nav nav-underline" id="myTab" role="tablist">
														<li className="nav-item" role="presentation">
															<button className="nav-link active" id="info-tab2"
																data-bs-toggle="tab" data-bs-target="#basic-info2"
																type="button" role="tab"
																aria-selected="true">Projects</button>
														</li>
														<li className="nav-item" role="presentation">
															<button className="nav-link" id="address-tab2"
																data-bs-toggle="tab" data-bs-target="#address2"
																type="button" role="tab"
																aria-selected="false">Assets</button>
														</li>
													</ul>
												</div>
												<div className="tab-content" id="myTabContent3">
													<div className="tab-pane fade show active" id="basic-info2"
														role="tabpanel" aria-labelledby="info-tab2" tabIndex="0">
														<div className="row">
															<div className="col-md-6 d-flex">
																<div className="card flex-fill mb-4 mb-md-0">
																	<div className="card-body">
																		<div
																			className="d-flex align-items-center pb-3 mb-3 border-bottom">
																			<a href="/project-details"
																				className="flex-shrink-0 me-2">
																				<img src="/assets/img/social/project-03.svg"
																					alt="Img" />
																			</a>
																			<div>
																				<h6 className="mb-1"><a
																						href="/project-details">World
																						Health</a></h6>
																				<div className="d-flex align-items-center">
																					<p className="mb-0 fs-13">8 tasks</p>
																					<p className="fs-13"><span
																							className="mx-1"><i
																								className="ti ti-point-filled text-primary"></i></span>15
																						Completed</p>
																				</div>
																			</div>
																		</div>
																		<div className="row">
																			<div className="col-md-6">
																				<div>
																					<span
																						className="mb-1 d-block">Deadline</span>
																					<p className="text-dark">31 July 2025
																					</p>
																				</div>
																			</div>
																			<div className="col-md-6">
																				<div>
																					<span className="mb-1 d-block">Project
																						Lead</span>
																					<a href="#"
																						className="fw-normal d-flex align-items-center">
																						<img className="avatar avatar-sm rounded-circle me-2"
																							src="/assets/img/profiles/avatar-01.jpg"
																							alt="Img" />
																						Leona
																					</a>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="col-md-6 d-flex">
																<div className="card flex-fill mb-0">
																	<div className="card-body">
																		<div
																			className="d-flex align-items-center pb-3 mb-3 border-bottom">
																			<a href="/project-details"
																				className="flex-shrink-0 me-2">
																				<img src="/assets/img/social/project-01.svg"
																					alt="Img" />
																			</a>
																			<div>
																				<h6 className="mb-1 text-truncate"><a
																						href="/project-details">Hospital
																						Administration</a></h6>
																				<div className="d-flex align-items-center">
																					<p className="mb-0 fs-13">8 tasks</p>
																					<p className="fs-13"><span
																							className="mx-1"><i
																								className="ti ti-point-filled text-primary"></i></span>15
																						Completed</p>
																				</div>
																			</div>
																		</div>
																		<div className="row">
																			<div className="col-md-6">
																				<div>
																					<span
																						className="mb-1 d-block">Deadline</span>
																					<p className="text-dark">31 July 2025
																					</p>
																				</div>
																			</div>
																			<div className="col-md-6">
																				<div>
																					<span className="mb-1 d-block">Project
																						Lead</span>
																					<a href="#"
																						className="fw-normal d-flex align-items-center">
																						<img className="avatar avatar-sm rounded-circle me-2"
																							src="/assets/img/profiles/avatar-01.jpg"
																							alt="Img" />
																						Leona
																					</a>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="tab-pane fade" id="address2" role="tabpanel"
														aria-labelledby="address-tab2" tabIndex="0">
														<div className="row">
															<div className="col-md-12 d-flex">
																<div className="card flex-fill">
																	<div className="card-body">
																		<div className="row align-items-center">
																			<div className="col-md-8">
																				<div className="d-flex align-items-center">
																					<a href="/project-details"
																						className="flex-shrink-0 me-2">
																						<img src="/assets/img/products/product-05.jpg"
																							className="img-fluid rounded-circle"
																							alt="img" />
																					</a>
																					<div>
																						<h6 className="mb-1"><a
																								href="/project-details">Dell
																								Laptop - #343556656</a>
																						</h6>
																						<div
																							className="d-flex align-items-center">
																							<p><span
																									className="text-primary">AST
																									- 001<i
																										className="ti ti-point-filled text-primary mx-1"></i></span>Assigned
																								on 22 Nov, 2022 10:32AM
																							</p>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div className="col-md-3">
																				<div>
																					<span className="mb-1 d-block">Assigned
																						by</span>
																					<a href="#"
																						className="fw-normal d-flex align-items-center">
																						<img className="avatar avatar-sm rounded-circle me-2"
																							src="/assets/img/profiles/avatar-01.jpg"
																							alt="Img" />
																						Andrew Symon
																					</a>
																				</div>
																			</div>
																			<div className="col-md-1">
																				<div className="dropdown ms-2">
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="d-inline-flex align-items-center"
																						data-bs-toggle="dropdown"
																						aria-expanded="false">
																						<i
																							className="ti ti-dots-vertical"></i>
																					</a>
																					<ul
																						className="dropdown-menu dropdown-menu-end p-3">
																						<li>
																							<a href="#" onClick={(e) => e.preventDefault()}
																								className="dropdown-item rounded-1"
																								data-bs-toggle="modal"
																								data-bs-target="#asset_info">View
																								Info</a>
																						</li>
																						<li>
																							<a href="#" onClick={(e) => e.preventDefault()}
																								className="dropdown-item rounded-1"
																								data-bs-toggle="modal"
																								data-bs-target="#refuse_msg">Raise
																								Issue </a>
																						</li>
																					</ul>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="col-md-12 d-flex">
																<div className="card flex-fill mb-0">
																	<div className="card-body">
																		<div className="row align-items-center">
																			<div className="col-md-8">
																				<div className="d-flex align-items-center">
																					<a href="/project-details"
																						className="flex-shrink-0 me-2">
																						<img src="/assets/img/products/product-06.jpg"
																							className="img-fluid rounded-circle"
																							alt="img" />
																					</a>
																					<div>
																						<h6 className="mb-1"><a
																								href="/project-details">Bluetooth
																								Mouse - #478878</a></h6>
																						<div
																							className="d-flex align-items-center">
																							<p><span
																									className="text-primary">AST
																									- 001<i
																										className="ti ti-point-filled text-primary mx-1"></i></span>Assigned
																								on 22 Nov, 2022 10:32AM
																							</p>
																						</div>
																					</div>
																				</div>
																			</div>
																			<div className="col-md-3">
																				<div>
																					<span className="mb-1 d-block">Assigned
																						by</span>
																					<a href="#"
																						className="fw-normal d-flex align-items-center">
																						<img className="avatar avatar-sm rounded-circle me-2"
																							src="/assets/img/profiles/avatar-01.jpg"
																							alt="Img" />
																						Andrew Symon
																					</a>
																				</div>
																			</div>
																			<div className="col-md-1">
																				<div className="dropdown ms-2">
																					<a href="#" onClick={(e) => e.preventDefault()}
																						className="d-inline-flex align-items-center"
																						data-bs-toggle="dropdown"
																						aria-expanded="false">
																						<i
																							className="ti ti-dots-vertical"></i>
																					</a>
																					<ul
																						className="dropdown-menu dropdown-menu-end p-3">
																						<li>
																							<a href="#" onClick={(e) => e.preventDefault()}
																								className="dropdown-item rounded-1"
																								data-bs-toggle="modal"
																								data-bs-target="#asset_info">View
																								Info</a>
																						</li>
																						<li>
																							<a href="#" onClick={(e) => e.preventDefault()}
																								className="dropdown-item rounded-1"
																								data-bs-toggle="modal"
																								data-bs-target="#refuse_msg">Raise
																								Issue </a>
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

export default EmployeeDetails;
