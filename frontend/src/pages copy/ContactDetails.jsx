import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomEditor from '../components/common/CustomEditor';


const ContactDetails = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Contact Details"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Contact Details', active: true }
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

				<div className="row align-items-center mb-4">
					<div className="col-sm-6">
						<h6 className="fw-medium d-inline-flex align-items-center mb-3 mb-sm-0"><a href="/contacts">
								<i className="ti ti-arrow-left me-2"></i>Contacts</a>
							<span className="text-gray d-inline-flex ms-2">/ Darlee Robertson</span>
						</h6>
					</div>
					<div className="col-sm-6">
						<div className="d-flex align-items-center justify-content-sm-end">
							<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-primary d-inline-flex align-items-center me-2"
								data-bs-toggle="modal" data-bs-target="#add_deals">
								<i className="ti ti-circle-plus me-2"></i>Add Deal
							</a>
							<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-dark d-inline-flex align-items-center"><i
									className="ti ti-mail me-2"></i>Send Email</a>
							<div className="head-icons ms-2 mb-0">
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
									<img src="/assets/img/profiles/avatar-19.jpg" className="w-auto h-auto" alt="Img" />
								</span>
								<div className="text-center px-3 pb-3 border-bottom">
									<h5 className="d-flex align-items-center justify-content-center mb-1">Darlee Robertson
										<i className="ti ti-discount-check-filled text-success ms-1"></i>
									</h5>
									<p className="text-dark mb-1">BrightWave Innovations</p>
									<span className="badge bg-pink-transparent">Facility Manager</span>
								</div>
								<div className="p-3 border-bottom">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6>Basic information</h6>
										<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm" data-bs-toggle="modal"
											data-bs-target="#edit_contact"><i className="ti ti-edit"></i></a>
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
											className="text-info d-inline-flex align-items-center">darlee@example.com <i
												className="ti ti-copy text-dark ms-2"></i></a>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-gender-male me-2"></i>
											Gender
										</span>
										<p className="text-dark">Male</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-cake me-2"></i>
											Birdthday
										</span>
										<p className="text-dark">24th July 2000</p>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-map-pin-check me-2"></i>
											Address
										</span>
										<p className="text-dark text-end">1861 Bayonne Ave, <br /> Manchester, NJ, 08759 </p>
									</div>
								</div>
								<div className="p-3 border-bottom">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6>Other Information</h6>
										<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm"><i
												className="ti ti-edit"></i></a>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-e-passport me-2"></i>
											Language
										</span>
										<p className="text-dark">English</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-mail-check me-2"></i>
											Currency
										</span>
										<p className="text-dark">United States dollar</p>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-globe me-2"></i>
											Last Modified
										</span>
										<p className="text-dark">27 Sep 24, 11:45 pm </p>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<span className="d-inline-flex align-items-center">
											<i className="ti ti-bookmark-plus me-2"></i>
											Source
										</span>
										<p className="text-dark">Paid Campaign</p>
									</div>
								</div>
								<div className="p-3 border-bottom">
									<h5 className="mb-3">Tags</h5>
									<div className="d-flex align-items-center">
										<span className="badge badge-soft-success me-3">Collab</span>
										<span className="badge badge-soft-warning">Rated</span>
									</div>
								</div>
								<div className="p-3 border-bottom">
									<div className="d-flex align-items-center justify-content-between mb-3">
										<h5>Company</h5>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="text-primary d-inline-flex align-items-center" data-bs-toggle="modal"
											data-bs-target="#add_company">
											<i className="ti ti-circle-plus me-1"></i>Add New
										</a>
									</div>
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-md border rounded-circle">
											<img src="/assets/img/company/company-01.svg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-medium">BrightWave Innovations</h6>
											<span className="d-block">bwi.example.com</span>
										</div>
									</div>
								</div>
								<div className="p-3">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6>Social Links</h6>
										<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm"><i
												className="ti ti-edit"></i></a>
									</div>
									<div className="d-flex align-items-center mb-3">
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
									<div className="row gx-2">
										<div className="col-6">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="d-flex align-items-center justify-content-center btn btn-dark">
												<i className="ti ti-share-2 me-2"></i>Share
											</a>
										</div>
										<div className="col-6">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="d-flex align-items-center justify-content-center btn btn-primary">
												<i className="ti ti-trash me-2"></i>Delete
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-8">
						<div>
							<div className="bg-white rounded">
								<ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap mb-3" role="tablist">
									<li className="nav-item" role="presentation">
										<a className="nav-link active fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab1" data-bs-toggle="tab" aria-selected="false"
											role="tab">
											<i className="ti ti-activity me-1"></i>
											Activities
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab2" data-bs-toggle="tab" aria-selected="false"
											role="tab">
											<i className="ti ti-file-description me-1"></i>
											Notes
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab3" data-bs-toggle="tab" aria-selected="true"
											role="tab">
											<i className="ti ti-phone-call me-1"></i>
											Calls
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab4" data-bs-toggle="tab" aria-selected="true"
											role="tab">
											<i className="ti ti-files me-1"></i>
											Files
										</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium d-flex align-items-center justify-content-center"
											href="#bottom-justified-tab5" data-bs-toggle="tab" aria-selected="true"
											role="tab">
											<i className="ti ti-mail-check me-1"></i>
											Email
										</a>
									</li>
								</ul>

							</div>
							<div className="tab-content">
								<div className="tab-pane active show" id="bottom-justified-tab1" role="tabpanel">
									<div className="card border-0">
										
										<div className="card-header">
											<div className="d-flex align-items-center justify-content-between">
												<h5>Activities</h5>
												<div className="dropdown">
													<Link to="#"
														className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														Sort By : Last 7 Days
													</Link>
													<ul className="dropdown-menu  dropdown-menu-end p-3">
														<li>
															<Link to="#"
																className="dropdown-item rounded-1">Recently Added</Link>
														</li>
														<li>
															<Link to="#"
																className="dropdown-item rounded-1">Ascending</Link>
														</li>
														<li>
															<Link to="#"
																className="dropdown-item rounded-1">Descending</Link>
														</li>
														<li>
															<Link to="#"
																className="dropdown-item rounded-1">Last Month</Link>
														</li>
														<li>
															<Link to="#"
																className="dropdown-item rounded-1">Last 7 Days</Link>
														</li>
													</ul>
												</div>
											</div>
										</div>
							<div className="card-body">
											<span className="badge badge-soft-purple d-inline-flex align-items-center mb-3">
												<i className="ti ti-calendar me-1"></i>
												15 Feb 2024
											</span>
											<div className="border rounded p-3 mb-3">
												<div className="d-flex align-items-start">
													<span
														className="avatar avatar-md avatar-rounded flex-shrink-0 bg-skyblue me-2"><i
															className="ti ti-message-circle-2 fs-20"></i></span>
													<div>
														<h6 className="fw-medium mb-1">You sent 1 Message to the contact.
														</h6>
														<span>10:25 pm</span>
													</div>
												</div>
											</div>
											<div className="border rounded p-3 mb-3">
												<div className="d-flex align-items-start">
													<span
														className="avatar avatar-md avatar-rounded bg-success flex-shrink-0 me-2"><i
															className="ti ti-phone fs-20"></i></span>
													<div>
														<h6 className="fw-medium mb-1">Denwar responded to your appointment
															schedule question by call at 09:30pm.</h6>
														<span>09:25 pm</span>
													</div>
												</div>
											</div>
											<div className="border rounded p-3 mb-3">
												<div className="d-flex align-items-start">
													<span
														className="avatar avatar-md avatar-rounded flex-shrink-0 bg-warning me-2"><i
															className="ti ti-file-description fs-20"></i></span>
													<div>
														<h6 className="fw-medium mb-1">Notes added by Antony</h6>
														<p className="mb-1">Please accept my apologies for the inconvenience
															caused. It would be much appreciated if it's possible to
															reschedule to 6:00 PM, or any other day that week.</p>
														<span>10.00 pm</span>
													</div>
												</div>
											</div>
											<span className="badge badge-soft-purple d-inline-flex align-items-center mb-3">
												<i className="ti ti-calendar me-1"></i>
												15 Feb 2024
											</span>
											<div className="border rounded p-3 mb-3">
												<div className="d-flex align-items-start">
													<span
														className="avatar avatar-md avatar-rounded flex-shrink-0 bg-purple me-2"><i
															className="ti ti-user-circle fs-20"></i></span>
													<div>
														<h6 className="fw-medium d-flex align-items-center mb-1">
															Meeting With
															<span className="avatar avatar-sm avatar-rounded mx-1"><img
																	src="/assets/img/profiles/avatar-02.jpg"
																	alt="Img" /></span>
															Abraham
														</h6>
														<span>Schedueled on 05:00 pm</span>
													</div>
												</div>
											</div>
											<div className="border rounded p-3 mb-3">
												<div className="d-flex align-items-start">
													<span
														className="avatar avatar-md avatar-rounded bg-success flex-shrink-0 me-2"><i
															className="ti ti-phone fs-20"></i></span>
													<div>
														<h6 className="fw-medium mb-1">Drain responded to your appointment
															schedule question.</h6>
														<span>09:25 pm</span>
													</div>
												</div>
											</div>
											<span className="badge badge-soft-purple d-inline-flex align-items-center mb-3">
												<i className="ti ti-calendar me-1"></i>
												Upcoming Activity
											</span>
											<div className="border rounded p-3">
												<div className="d-flex align-items-start mb-2">
													<span
														className="avatar avatar-md avatar-rounded flex-shrink-0 bg-purple me-2"><i
															className="ti ti-user-circle fs-20"></i></span>
													<div>
														<h6 className="fw-medium mb-1">
															Product Meeting
														</h6>
														<p className="mb-1">A product team meeting is a gathering of the
															cross-functional product team — ideally including
															team members from product, engineering, marketing, and
															customer support.
														</p>
														<span>Schedueled on 05:00 pm</span>
													</div>
												</div>
												<div className="bg-light-500 rounded p-3">
													<div className="row">
														<div className="col-md-4 col-sm-6">
															<div>
																<h6 className="fs-12 fw-medium mb-2">Reminder</h6>
																<div className="dropdown">
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
																		data-bs-toggle="dropdown">
																		<i className="clock-hour-3 me-1"></i>
																		Reminder
																	</a>
																	<ul className="dropdown-menu  dropdown-menu-end p-3">
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Reminder</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">1 Hr</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">10
																				Hr</a>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
														<div className="col-md-4 col-sm-6">
															<div>
																<h6 className="fs-12 fw-medium mb-2">Task Priority</h6>
																<div className="dropdown">
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-toggle btn-sm btn btn-white d-inline-flex align-items-center"
																		data-bs-toggle="dropdown">
																		<span
																			className="border border-purple rounded-circle bg-soft-danger d-flex justify-content-center align-items-center me-1">
																			<i
																				className="ti ti-point-filled text-danger"></i>
																		</span>
																		High
																	</a>
																	<ul className="dropdown-menu  dropdown-menu-end p-3">
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">High</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Medium</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1">Low</a>
																		</li>
																	</ul>
																</div>
															</div>
														</div>
														<div className="col-md-4 col-sm-6">
															<div>
																<h6 className="fs-12 fw-medium mb-2">Assigned to</h6>
																<div className="dropdown">
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
																		data-bs-toggle="dropdown">
																		<span
																			className="avatar avatar-xs avatar-rounded me-1">
																			<img src="/assets/img/profiles/avatar-02.jpg"
																				alt="Img" />
																		</span>
																		John
																	</a>
																	<ul className="dropdown-menu  dropdown-menu-end p-3">
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1 d-flex align-items-center">
																				<span
																					className="avatar avatar-xs avatar-rounded me-1">
																					<img src="/assets/img/profiles/avatar-02.jpg"
																						alt="Img" />
																				</span>
																				John
																			</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1 d-flex align-items-center">
																				<span
																					className="avatar avatar-xs avatar-rounded me-1">
																					<img src="/assets/img/profiles/avatar-01.jpg"
																						alt="Img" />
																				</span>
																				Sophie
																			</a>
																		</li>
																		<li>
																			<a href="#" onClick={(e) => e.preventDefault()}
																				className="dropdown-item rounded-1 d-flex align-items-center">
																				<span
																					className="avatar avatar-xs avatar-rounded me-1">
																					<img src="/assets/img/profiles/avatar-03.jpg"
																						alt="Img" />
																				</span>
																				Estelle
																			</a>
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
								<div className="tab-pane" id="bottom-justified-tab2" role="tabpanel">
									<div className="card border-0">
										
										<div className="card-header">
											<div
												className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
												<h5>Notes</h5>
												<div className="d-flex align-items-center">
													<div className="dropdown me-2">
														<Link to="#"
															className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
															data-bs-toggle="dropdown">
															Sort By : Last 7 Days
														</Link>
														<ul className="dropdown-menu  dropdown-menu-end p-3">
															<li>
																<Link to="#"
																	className="dropdown-item rounded-1">Recently Added</Link>
															</li>
															<li>
																<Link to="#"
																	className="dropdown-item rounded-1">Ascending</Link>
															</li>
															<li>
																<Link to="#"
																	className="dropdown-item rounded-1">Descending</Link>
															</li>
															<li>
																<Link to="#"
																	className="dropdown-item rounded-1">Last Month</Link>
															</li>
															<li>
																<Link to="#"
																	className="dropdown-item rounded-1">Last 7 Days</Link>
															</li>
														</ul>
													</div>
													<Link to="#"
														className="d-inline-flex align-items-center text-primary fw-medium"
														data-bs-toggle="modal" data-bs-target="#add_notes">
														<i className="ti ti-circle-plus me-1"></i>
														Add Note
													</Link>
												</div>
											</div>
										</div>
							<div className="card-body">
											<div className="border rounded p-3 mb-3">
												<div className="d-flex align-items-center justify-content-between mb-3">
													<div className="d-flex align-items-center">
														<span
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/profiles/avatar-19.jpg" alt="Img" />
														</span>
														<div>
															<h6 className="fw-medium mb-1">Darlee Robertson</h6>
															<span>15 Sep 2023, 12:10 pm</span>
														</div>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm"><i
																className="ti ti-edit"></i></a>
														<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div>
													<h6 className="fw-medium mb-2">Notes added by Antony</h6>
													<p className="mb-3">A project review evaluates the success of an
														initiative and identifies areas for improvement.
														It can also evaluate a current project to determine whether
														it's on the right track. Or, it can determine the success of a
														completed project.
													</p>
													<div className="d-flex align-items-center flex-wrap gap-3 mb-3">
														<div
															className="border rounded d-flex align-items-center justify-content-between hover-border p-3">
															<div className="d-flex align-items-center me-4">
																<span
																	className="avatar avatar-lg bg-success avatar-rounded flex-shrink-0 me-2">
																	<i className="ti ti-file-type-xls fs-24"></i>
																</span>
																<div>
																	<h6 className="fw-medium">Project Specs.xls</h6>
																	<span>365 KB</span>
																</div>
															</div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="btn btn-icon btn-sm fs-16"><i
																	className="ti ti-download"></i></a>
														</div>
														<div
															className="border rounded d-flex align-items-center justify-content-between hover-border p-3">
															<div className="d-flex align-items-center me-4">
																<span
																	className="avatar avatar-lg avatar-rounded flex-shrink-0 me-2">
																	<img src="/assets/img/media/media-07.jpg" alt="Img" />
																</span>
																<div>
																	<h6 className="fw-medium">090224.jpg</h6>
																	<span>365 KB</span>
																</div>
															</div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="btn btn-icon btn-sm fs-16"><i
																	className="ti ti-download"></i></a>
														</div>
													</div>
													<div className="notes-editor">
														<div className="note-edit-wrap">
															<div className="mb-3">
																<CustomEditor value={'Write a new comment, send your team notification by typing @ followed by their name'} />
															</div>
															<div
																className="d-flex align-items-center justify-content-end mb-3">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="btn btn-outline-light border add-cancel me-3">Cancel</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="btn btn-primary">Save</a>
															</div>
														</div>
														<div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-flex align-items-center justify-content-end text-primary fw-medium add-comment">
																<i className="ti ti-circle-plus me-1"></i>
																Add Comment
															</a>
														</div>
													</div>
												</div>
											</div>
											<div className="border rounded p-3 mb-3">
												<div className="d-flex align-items-center justify-content-between mb-3">
													<div className="d-flex align-items-center">
														<span
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/profiles/avatar-03.jpg" alt="Img" />
														</span>
														<div>
															<h6 className="fw-medium mb-1">Sharon Roy</h6>
															<span>18 Sep 2023, 09:52 am</span>
														</div>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm"><i
																className="ti ti-edit"></i></a>
														<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div>
													<h6 className="fw-medium mb-2">Notes added by Antony</h6>
													<p className="mb-3">
														A project plan typically contains a list of the essential
														elements of a project,
														such as stakeholders, scope, timelines, estimated cost and
														communication methods.
														The project manager typically lists the information based on the
														assignment.
													</p>
													<div className="d-flex align-items-center flex-wrap gap-3 mb-3">
														<div
															className="border rounded d-flex align-items-center justify-content-between hover-border p-3">
															<div className="d-flex align-items-center me-4">
																<span
																	className="avatar avatar-lg bg-purple avatar-rounded flex-shrink-0 me-2">
																	<i className="ti ti-file-description fs-24"></i>
																</span>
																<div>
																	<h6 className="fw-medium">Andrewpass.txt</h6>
																	<span>365 KB</span>
																</div>
															</div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="btn btn-icon btn-sm fs-16"><i
																	className="ti ti-download"></i></a>
														</div>
													</div>
													<div className="bg-light-500 rounded p-3 mb-3">
														<p className="mb-2">The best way to get a project done faster is to
															start sooner. A goal without a
															timeline is just a dream.The goal you set must be
															challenging. At the same time,
															it should be realistic and attainable, not impossible to
															reach.
														</p>
														<p className="text-dark mb-2">Commented by <span
																className="text-primary"> Aeron</span> on 15 Sep 2023, 11:15
															pm</p>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-dark d-inline-flex align-items-center"><i
																className="ti ti-arrow-back-up me-1"></i>Reply</a>
													</div>
													<div className="notes-editor">
														<div className="note-edit-wrap">
															<div className="mb-3">
																<CustomEditor value={'Write a new comment, send your team notification by typing @ followed by their name'} />
															</div>
															<div
																className="d-flex align-items-center justify-content-end mb-3">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="btn btn-outline-light border add-cancel me-3">Cancel</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="btn btn-primary">Save</a>
															</div>
														</div>
														<div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-flex align-items-center justify-content-end text-primary fw-medium add-comment">
																<i className="ti ti-circle-plus me-1"></i>
																Add Comment
															</a>
														</div>
													</div>
												</div>
											</div>
											<div className="border rounded p-3 mb-3">
												<div className="d-flex align-items-center justify-content-between mb-3">
													<div className="d-flex align-items-center">
														<span
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/profiles/avatar-04.jpg" alt="Img" />
														</span>
														<div>
															<h6 className="fw-medium mb-1">Vaughan Lewis</h6>
															<span>20 Sep 2023, 10:26 pm</span>
														</div>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm"><i
																className="ti ti-edit"></i></a>
														<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-icon btn-sm"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div>
													<h6 className="fw-medium mb-2">Notes added by Antony</h6>
													<p className="mb-3">
														Projects play a crucial role in the success of organizations,
														and their importance cannot
														be overstated. Whether it's launching a new product, improving
														an existing
													</p>
													<div className="notes-editor">
														<div className="note-edit-wrap">
															<div className="mb-3">
																<CustomEditor value={'Write a new comment, send your team notification by typing @ followed by their name'} />
															</div>
															<div
																className="d-flex align-items-center justify-content-end mb-3">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="btn btn-outline-light border add-cancel me-3">Cancel</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="btn btn-primary">Save</a>
															</div>
														</div>
														<div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-flex align-items-center justify-content-end text-primary fw-medium add-comment">
																<i className="ti ti-circle-plus me-1"></i>
																Add Comment
															</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane" id="bottom-justified-tab3" role="tabpanel">
									<div className="card border-0">
										
										<div className="card-header">
											<div
												className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
												<h5>Calls</h5>
												<Link to="#"
													className="d-inline-flex align-items-center text-primary fw-medium"
													data-bs-toggle="modal" data-bs-target="#add_call">
													<i className="ti ti-circle-plus me-1"></i>
													Add New
												</Link>
											</div>
										</div>
							<div className="card-body">
											<div className="border rounded p-3 mb-3">
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3">
													<div className="d-flex align-items-center">
														<span
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/profiles/avatar-02.jpg" alt="Img" />
														</span>
														<div>
															<p className="fw-medium"><span className="text-dark">Darlee
																	Robertson </span> logged a call on 23 Jul 2023,
																10:00 pm</p>
														</div>
													</div>
													<div className="d-flex align-items-center">
														<div className="dropdown me-2">
															<a href="#"
																className="dropdown-toggle btn btn-sm bg-danger-transparent border-0"
																data-bs-toggle="dropdown" aria-expanded="false">Busy<i
																	className="las la-angle-down ms-1"></i></a>
															<div className="dropdown-menu dropdown-menu-end p-3">
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Busy</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>No Answer</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Unavailable</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Wrong Number</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Left Voice Message</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Moving Forward</a>
															</div>
														</div>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div>
													<p>A project review evaluates the success of an initiative and
														identifies areas for
														improvement. It can also evaluate a current project
														to determine whether it's on the right track. Or, it can
														determine the success of a completed project
													</p>
												</div>
											</div>
											<div className="border rounded p-3 mb-3">
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3">
													<div className="d-flex align-items-center">
														<span
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/profiles/avatar-03.jpg" alt="Img" />
														</span>
														<div>
															<p className="fw-medium"><span className="text-dark">Sharon Roy
																</span>  logged a call on 28 Jul 2023, 09:00 pm</p>
														</div>
													</div>
													<div className="d-flex align-items-center">
														<div className="dropdown me-2">
															<a href="#"
																className="dropdown-toggle btn btn-sm bg-transparent-purple border-0"
																data-bs-toggle="dropdown" aria-expanded="false">No
																Answer<i className="las la-angle-down ms-1"></i></a>
															<div className="dropdown-menu dropdown-menu-end p-3">
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Busy</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>No Answer</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Unavailable</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Wrong Number</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Left Voice Message</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Moving Forward</a>
															</div>
														</div>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div>
													<p>
														A project plan typically contains a list of the essential
														elements of a project,
														such as stakeholders, scope, timelines, estimated cost and
														communication methods.
														The project manager typically lists the information based on the
														assignment.
													</p>
												</div>
											</div>
											<div className="border rounded p-3">
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-3">
													<div className="d-flex align-items-center">
														<span
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/profiles/avatar-04.jpg" alt="Img" />
														</span>
														<div>
															<p className="fw-medium"><span className="text-dark">Vaughan Lewis
																</span> logged a call on 30 Jul 2023, 08:00 pm</p>
														</div>
													</div>
													<div className="d-flex align-items-center">
														<div className="dropdown me-2">
															<a href="#"
																className="dropdown-toggle btn btn-sm bg-transparent-purple border-0"
																data-bs-toggle="dropdown" aria-expanded="false">No
																Answer<i className="las la-angle-down ms-1"></i></a>
															<div className="dropdown-menu dropdown-menu-end p-3">
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Busy</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>No Answer</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Unavailable</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Wrong Number</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Left Voice Message</a>
																<a className="dropdown-item rounded-1"
																	href="#" onClick={(e) => e.preventDefault()}>Moving Forward</a>
															</div>
														</div>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div>
													<p>
														Projects play a crucial role in the success of organizations,
														and their importance cannot be
														overstated. Whether it's launching a new product, improving an
														existing
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane" id="bottom-justified-tab4" role="tabpanel">
									<div className="card border-0">
										
										<div className="card-header">
											<div
												className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
												<h5>Files</h5>
											</div>
										</div>
							<div className="card-body">
											<div className="border rounded p-3 mb-3">
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
													<div>
														<h6 className="fw-medium mb-1">Manage Documents</h6>
														<p>Send customizable quotes, proposals and contracts to close
															deals faster.</p>
													</div>
													<div>
														<a href="#" className="btn btn-primary" data-bs-toggle="modal"
															data-bs-target="#create_file">Create Document</a>
													</div>
												</div>
											</div>
											<div className="border rounded p-3 mb-3">
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-2">
													<div>
														<h6 className="fw-medium mb-1">Collier-Turner Proposal</h6>
														<p>Send customizable quotes, proposals and contracts to close
															deals faster.</p>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-download"></i></a>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-edit"></i></a>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
													<div className="d-flex align-items-center">
														<span
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/profiles/avatar-02.jpg" alt="Img" />
														</span>
														<div>
															<span className="d-inline-flex mb-1">Owner</span>
															<h6 className="fw-medium">Darlee Robertson</h6>
														</div>
													</div>
													<div className="d-flex align-items-center">
														<span className="badge bg-pink-transparent me-2">Proposal</span>
														<span className="badge badge-dark-transparent"><i
																className="ti ti-point-filled"></i>Proposal</span>
													</div>
												</div>
											</div>
											<div className="border rounded p-3 mb-3">
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-2">
													<div>
														<h6 className="fw-medium mb-1">Collier-Turner Proposal</h6>
														<p>Send customizable quotes, proposals and contracts to close
															deals faster.</p>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-download"></i></a>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-edit"></i></a>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
													<div className="d-flex align-items-center">
														<span
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/profiles/avatar-01.jpg" alt="Img" />
														</span>
														<div>
															<span className="d-inline-flex mb-1">Owner</span>
															<h6 className="fw-medium">Sharon Roy</h6>
														</div>
													</div>
													<div className="d-flex align-items-center">
														<span className="badge badge-soft-info me-2">Quote</span>
														<span className="badge badge-soft-success"><i
																className="ti ti-point-filled"></i>Sent</span>
													</div>
												</div>
											</div>
											<div className="border rounded p-3">
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-2">
													<div>
														<h6 className="fw-medium mb-1">Collier-Turner Proposal</h6>
														<p>Send customizable quotes, proposals and contracts to close
															deals faster.</p>
													</div>
													<div className="d-flex align-items-center">
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-download"></i></a>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-edit"></i></a>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="btn btn-icon btn-sm fs-20"><i
																className="ti ti-trash"></i></a>
													</div>
												</div>
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
													<div className="d-flex align-items-center">
														<span
															className="avatar avatar-md avatar-rounded flex-shrink-0 me-2">
															<img src="/assets/img/profiles/avatar-04.jpg" alt="Img" />
														</span>
														<div>
															<span className="d-inline-flex mb-1">Owner</span>
															<h6 className="fw-medium">Vaughan Lewis</h6>
														</div>
													</div>
													<div className="d-flex align-items-center">
														<span className="badge bg-pink-transparent me-2">Proposal</span>
														<span className="badge badge-dark-transparent"><i
																className="ti ti-point-filled"></i>Proposal</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane" id="bottom-justified-tab5" role="tabpanel">
									<div className="card border-0">
										
										<div className="card-header">
											<div
												className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
												<h5>Email</h5>
											</div>
										</div>
							<div className="card-body">
											<div className="border rounded p-3">
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
													<div>
														<h6 className="fw-medium mb-1">Manage Emails</h6>
														<p>You can send and reply to emails directly via this section.
														</p>
													</div>
													<div>
														<a href="#" className="btn btn-primary" data-bs-toggle="modal"
															data-bs-target="#connect_account">Connect Account</a>
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
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default ContactDetails;
