import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomDatePicker from '../components/common/CustomDatePicker';


const Tasks = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Tasks"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Projects' },
						{ label: 'Tasks', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_project"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Project</a>
						</div>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">
					<div className="col-xl-4">
						<div>
							<div className="card">
								<div className="card-body">
									<div className="d-flex align-items-center pb-3 mb-3 border-bottom">
										<a href="/task-details" className="flex-shrink-0 me-2">
											<img src="/assets/img/social/project-01.svg" alt="Img" />
										</a>
										<div>
											<h6 className="mb-1"><a href="/task-details">Hospital Administration</a>
											</h6>
											<div className="d-flex align-items-center">
												<span>8 tasks</span>
												<span className="mx-1"><i
														className="ti ti-point-filled text-primary"></i></span>
												<span>15 &nbsp;Completed</span>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="mb-3">
												<span className="mb-1 d-block">Deadline</span>
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
												<span className="mb-1 d-block">Project Lead</span>
												<h6 className="fw-normal d-flex align-items-center">
													<img className="avatar avatar-xs rounded-circle me-1"
														src="/assets/img/profiles/avatar-01.jpg" alt="Img" />
													Leona
												</h6>
											</div>
										</div>
									</div>
									<div className="bg-light p-2">
										<div className="row align-items-center">
											<div className="col-6">
												<span className="fw-medium d-flex align-items-center">
													<i className="ti ti-clock text-primary me-2"></i>Total 565 Hrs
												</span>
											</div>
											<div className="col-6">
												<div>
													<div className="d-flex align-items-center justify-content-between mb-1">
														<small className="text-dark">54% Completed</small>
													</div>
													<div className="progress  progress-xs">
														<div className="progress-bar bg-info" role="progressbar"
															style={{width: '54%'}}></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<div className="d-flex align-items-center pb-3 mb-3 border-bottom">
										<a href="/task-details" className="flex-shrink-0 me-2">
											<img src="/assets/img/social/project-02.svg" alt="Img" />
										</a>
										<div>
											<h6 className="mb-1"><a href="/task-details">Educational Platform </a></h6>
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
												<span className="mb-1 d-block">Deadline</span>
												<p className="text-dark">20 Aug 2025</p>
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
												<span className="mb-1 d-block">Project Lead</span>
												<h6 className="fw-normal d-flex align-items-center">
													<img className="avatar avatar-xs rounded-circle me-1"
														src="/assets/img/profiles/avatar-06.jpg" alt="Img" />
													Harvey Smith
												</h6>
											</div>
										</div>
									</div>
									<div className="bg-light p-2">
										<div className="row align-items-center">
											<div className="col-6">
												<span className="fw-medium d-flex align-items-center">
													<i className="ti ti-clock text-primary me-2"></i>Total 700 Hrs
												</span>
											</div>
											<div className="col-6">
												<div>
													<div className="d-flex align-items-center justify-content-between mb-1">
														<small className="text-dark">89% Completed</small>
													</div>
													<div className="progress  progress-xs">
														<div className="progress-bar bg-success" role="progressbar"
															style={{width: '75%'}}></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<div className="d-flex align-items-center pb-3 mb-3 border-bottom">
										<a href="/task-details" className="flex-shrink-0 me-2">
											<img src="/assets/img/social/project-04.svg" alt="Img" />
										</a>
										<div>
											<h6 className="mb-1"><a href="/task-details">Chat & Call Mobile App</a></h6>
											<div className="d-flex align-items-center">
												<span>20 tasks</span>
												<span className="mx-1"><i
														className="ti ti-point-filled text-primary"></i></span>
												<span>10 Completed</span>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="mb-3">
												<span className="mb-1 d-block">Deadline</span>
												<p className="text-dark">18 Oct 2025</p>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="mb-3">
												<span className="mb-1 d-block">Value</span>
												<p className="text-dark">$345987</p>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="mb-3">
												<span className="mb-1 d-block">Project Lead</span>
												<h6 className="fw-normal d-flex align-items-center">
													<img className="avatar avatar-xs rounded-circle me-1"
														src="/assets/img/profiles/avatar-27.jpg" alt="Img" />
													Stephan Peralt
												</h6>
											</div>
										</div>
									</div>
									<div className="bg-light p-2">
										<div className="row align-items-center">
											<div className="col-6">
												<span className="fw-medium d-flex align-items-center">
													<i className="ti ti-clock text-primary me-2"></i>Total 700 Hrs
												</span>
											</div>
											<div className="col-6">
												<div>
													<div className="d-flex align-items-center justify-content-between mb-1">
														<small className="text-dark">61% Completed</small>
													</div>
													<div className="progress  progress-xs">
														<div className="progress-bar bg-purple" role="progressbar"
															style={{width: '61%'}}></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<div className="d-flex align-items-center pb-3 mb-3 border-bottom">
										<a href="/task-details" className="flex-shrink-0 me-2">
											<img src="/assets/img/social/project-05.svg" alt="Img" />
										</a>
										<div>
											<h6 className="mb-1"><a href="/task-details">Travel Planning Website</a>
											</h6>
											<div className="d-flex align-items-center">
												<span>18 tasks</span>
												<span className="mx-1"><i
														className="ti ti-point-filled text-primary"></i></span>
												<span>12 Completed</span>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-4">
											<div className="mb-3">
												<span className="mb-1 d-block">Deadline</span>
												<p className="text-dark">23 Nov 2025</p>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="mb-3">
												<span className="mb-1 d-block">Value</span>
												<p className="text-dark">$563987</p>
											</div>
										</div>
										<div className="col-sm-4">
											<div className="mb-3">
												<span className="mb-1 d-block">Project Lead</span>
												<h6 className="fw-normal d-flex align-items-center">
													<img className="avatar avatar-xs rounded-circle me-1"
														src="/assets/img/profiles/avatar-23.jpg" alt="Img" />
													Doglas Martini
												</h6>
											</div>
										</div>
									</div>
									<div className="bg-light p-2">
										<div className="row align-items-center">
											<div className="col-6">
												<span className="fw-medium d-flex align-items-center">
													<i className="ti ti-clock text-primary me-2"></i>Total 700 Hrs
												</span>
											</div>
											<div className="col-6">
												<div>
													<div className="d-flex align-items-center justify-content-between mb-1">
														<small className="text-dark">21% Completed</small>
													</div>
													<div className="progress  progress-xs">
														<div className="progress-bar bg-danger" role="progressbar"
															style={{width: '21%'}}></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-8">
						<div className="row">
							<div className="col-lg-5">
								<div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
									<h6 className="me-2">Priority</h6>
									<ul className="nav nav-pills border d-inline-flex p-1 rounded bg-light todo-tabs"
										id="pills-tab" role="tablist">
										<li className="nav-item" role="presentation">
											<button
												className="nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto active"
												data-bs-toggle="pill" data-bs-target="#pills-home" type="button"
												role="tab" aria-selected="true">All</button>
										</li>
										<li className="nav-item" role="presentation">
											<button
												className="nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto"
												data-bs-toggle="pill" data-bs-target="#pills-contact" type="button"
												role="tab" aria-selected="false" tabIndex="-1">High</button>
										</li>
										<li className="nav-item" role="presentation">
											<button
												className="nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto"
												data-bs-toggle="pill" data-bs-target="#pills-medium" type="button"
												role="tab" aria-selected="false" tabIndex="-1">Medium</button>
										</li>
										<li className="nav-item" role="presentation">
											<button
												className="nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto"
												data-bs-toggle="pill" data-bs-target="#pills-low" type="button"
												role="tab" aria-selected="false" tabIndex="-1">Low</button>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-7">
								<div className="d-flex align-items-center justify-content-lg-end flex-wrap row-gap-3 mb-3">
									<div className="input-icon w-120 position-relative me-2">
										<span className="input-icon-addon">
											<i className="ti ti-calendar"></i>
										</span>
										<CustomDatePicker type="text" className="form-control " placeholder="Due Date"  isRange={false} />
									</div>
									<div className="dropdown me-2">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											All Tags
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">All
													Tags</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Internal</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Projects</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Meetings</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Reminder</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Research</a>
											</li>
										</ul>
									</div>
									<div className="d-flex align-items-center">
										<span className="d-inline-flex me-2">Sort By : </span>
										<div className="dropdown">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="dropdown-toggle btn btn-white d-inline-flex align-items-center border-0 bg-transparent p-0 text-dark"
												data-bs-toggle="dropdown">
												Created Date
											</a>
											<ul className="dropdown-menu  dropdown-menu-end p-3">
												<li>
													<a href="#" onClick={(e) => e.preventDefault()}
														className="dropdown-item rounded-1">Created Date</a>
												</li>
												<li>
													<a href="#" onClick={(e) => e.preventDefault()}
														className="dropdown-item rounded-1">Priority</a>
												</li>
												<li>
													<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Due
														Date</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-content" id="pills-tabContent">
							<div className="tab-pane fade show active" id="pills-home" role="tabpanel">
								<div className="card">
									<div className="card-body">
										<h5 className="mb-3">Hospital Administration</h5>
										<div className="bg-light p-2 rounded">
											<span className="d-block mb-1">Tasks Done</span>
											<h4 className="mb-2">41 / 43</h4>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-info" role="progressbar"
													style={{width: '84%'}}></div>
											</div>
											<p>84% Completed</p>
										</div>
									</div>
								</div>
								<div className="text-end mb-3 pb-3 border-bottom">
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											<i className="ti ti-file-export me-1"></i> Mark All as Completed
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">All
													Tags</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Internal</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Projects</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Meetings</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Reminder</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Research</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="list-group list-group-flush mb-4">
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-lg-6 col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" />
													</div>
													<span className="me-2 d-flex align-items-center rating-select"><i
															className="ti ti-star-filled filled"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Patient appointment booking</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-lg-6 col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-skyblue me-3">Web Design</span>
													<span
														className="badge bg-soft-pink d-inline-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Onhold</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-13.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-14.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-15.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Appointment booking with payment
															gateway</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>25 May 2024</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-info me-3">Social</span>
													<span
														className="badge bg-transparent-purple d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-20.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-21.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-22.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Doctor available module</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-purple me-3">Meetings</span>
													<span
														className="badge badge-secondary-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Pending</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-23.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-24.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-25.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Private chat module</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-skyblue me-3">Web Design</span>
													<span
														className="badge badge-purple-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-28.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-29.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-30.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Patient and Doctor video
															conferencing</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-pink me-3">Research</span>
													<span
														className="badge badge-purple-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-18.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-01.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-14.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
							<div className="tab-pane fade" id="pills-contact" role="tabpanel">
								<div className="card">
									<div className="card-body">
										<h5 className="mb-3">Hospital Administration</h5>
										<div className="bg-light p-2 rounded">
											<span className="d-block mb-1">Tasks Done</span>
											<h4 className="mb-2">41 / 43</h4>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-info" role="progressbar"
													style={{width: '84%'}}></div>
											</div>
											<p>84% Completed</p>
										</div>
									</div>
								</div>
								<div className="text-end mb-3 pb-3 border-bottom">
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											<i className="ti ti-file-export me-1"></i> Mark All as Completed
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">All
													Tags</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Internal</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Projects</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Meetings</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Reminder</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Research</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="list-group list-group-flush mb-4">
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-lg-6 col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" />
													</div>
													<span className="me-2 d-flex align-items-center rating-select"><i
															className="ti ti-star-filled filled"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Patient appointment booking</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-lg-6 col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-skyblue me-3">Web Design</span>
													<span
														className="badge bg-soft-pink d-inline-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Onhold</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-13.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-14.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-15.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Appointment booking with payment
															gateway</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>25 May 2024</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-info me-3">Social</span>
													<span
														className="badge bg-transparent-purple d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-20.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-21.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-22.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Doctor available module</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-purple me-3">Meetings</span>
													<span
														className="badge badge-secondary-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Pending</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-23.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-24.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-25.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Private chat module</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-skyblue me-3">Web Design</span>
													<span
														className="badge badge-purple-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-28.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-29.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-30.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Patient and Doctor video
															conferencing</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-pink me-3">Research</span>
													<span
														className="badge badge-purple-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-18.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-01.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-14.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
							<div className="tab-pane fade" id="pills-medium" role="tabpanel">
								<div className="card">
									<div className="card-body">
										<h5 className="mb-3">Hospital Administration</h5>
										<div className="bg-light p-2 rounded">
											<span className="d-block mb-1">Tasks Done</span>
											<h4 className="mb-2">41 / 43</h4>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-info" role="progressbar"
													style={{width: '84%'}}></div>
											</div>
											<p>84% Completed</p>
										</div>
									</div>
								</div>
								<div className="text-end mb-3 pb-3 border-bottom">
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											<i className="ti ti-file-export me-1"></i> Mark All as Completed
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">All
													Tags</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Internal</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Projects</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Meetings</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Reminder</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Research</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="list-group list-group-flush mb-4">
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-lg-6 col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" />
													</div>
													<span className="me-2 d-flex align-items-center rating-select"><i
															className="ti ti-star-filled filled"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Patient appointment booking</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-lg-6 col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-skyblue me-3">Web Design</span>
													<span
														className="badge bg-soft-pink d-inline-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Onhold</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-13.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-14.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-15.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Appointment booking with payment
															gateway</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>25 May 2024</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-info me-3">Social</span>
													<span
														className="badge bg-transparent-purple d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-20.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-21.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-22.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Doctor available module</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-purple me-3">Meetings</span>
													<span
														className="badge badge-secondary-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Pending</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-23.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-24.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-25.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Private chat module</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-skyblue me-3">Web Design</span>
													<span
														className="badge badge-purple-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-28.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-29.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-30.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Patient and Doctor video
															conferencing</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-pink me-3">Research</span>
													<span
														className="badge badge-purple-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-18.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-01.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-14.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
							<div className="tab-pane fade" id="pills-low" role="tabpanel">
								<div className="card">
									<div className="card-body">
										<h5 className="mb-3">Hospital Administration</h5>
										<div className="bg-light p-2 rounded">
											<span className="d-block mb-1">Tasks Done</span>
											<h4 className="mb-2">41 / 43</h4>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-info" role="progressbar"
													style={{width: '84%'}}></div>
											</div>
											<p>84% Completed</p>
										</div>
									</div>
								</div>
								<div className="text-end mb-3 pb-3 border-bottom">
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											<i className="ti ti-file-export me-1"></i> Mark All as Completed
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">All
													Tags</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Internal</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Projects</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Meetings</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Reminder</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Research</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="list-group list-group-flush mb-4">
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-lg-6 col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" />
													</div>
													<span className="me-2 d-flex align-items-center rating-select"><i
															className="ti ti-star-filled filled"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Patient appointment booking</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-lg-6 col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-skyblue me-3">Web Design</span>
													<span
														className="badge bg-soft-pink d-inline-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Onhold</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-13.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-14.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-15.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Appointment booking with payment
															gateway</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>25 May 2024</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-info me-3">Social</span>
													<span
														className="badge bg-transparent-purple d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-20.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-21.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-22.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Doctor available module</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-purple me-3">Meetings</span>
													<span
														className="badge badge-secondary-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Pending</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-23.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-24.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-25.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded mb-2 p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Private chat module</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-skyblue me-3">Web Design</span>
													<span
														className="badge badge-purple-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-28.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-29.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-30.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
									<div className="list-group-item list-item-hover shadow-sm rounded p-3">
										<div className="row align-items-center row-gap-3">
											<div className="col-md-7">
												<div
													className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
													<span className="me-2 d-flex align-items-center"><i
															className="ti ti-grid-dots text-dark"></i></span>
													<div className="form-check form-check-md me-2">
														<input className="form-check-input" type="checkbox" checked="" />
													</div>
													<span className="me-2 rating-select d-flex align-items-center"><i
															className="ti ti-star"></i></span>
													<div className="strike-info">
														<h4 className="fs-14 text-truncate">Patient and Doctor video
															conferencing</h4>
													</div>
													<span
														className="badge bg-transparent-dark text-dark rounded-pill ms-2"><i
															className="ti ti-calendar me-1"></i>15 Jan 2025</span>
												</div>
											</div>
											<div className="col-md-5">
												<div
													className="d-flex align-items-center justify-content-md-end flex-wrap row-gap-3">
													<span className="badge badge-pink me-3">Research</span>
													<span
														className="badge badge-purple-transparent d-flex align-items-center me-3"><i
															className="fas fa-circle fs-6 me-1"></i>Inprogress</span>
													<div className="d-flex align-items-center">
														<div className="avatar-list-stacked avatar-group-sm">
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-18.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-01.jpg" alt="img" />
															</span>
															<span className="avatar avatar-rounded">
																<img className="border border-white"
																	src="/assets/img/profiles/avatar-14.jpg" alt="img" />
															</span>
														</div>
														<div className="dropdown ms-2">
															<a href="#" onClick={(e) => e.preventDefault()}
																className="d-inline-flex align-items-center"
																data-bs-toggle="dropdown">
																<i className="ti ti-dots-vertical"></i>
															</a>
															<ul className="dropdown-menu dropdown-menu-end p-3">
																<li>
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="dropdown-item rounded-1"
																		data-bs-toggle="modal"
																		data-bs-target="#edit_task"><i
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
						<div className="text-center mb-4">
							<a href="#" className="btn btn-primary"><i className="ti ti-loader me-1"></i>Load More</a>
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

export default Tasks;
