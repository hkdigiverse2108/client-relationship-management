import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const ProjectDetails = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Project Details"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Projects' },
						{ label: 'Project Details', active: true }
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
					<div className="d-md-flex d-sm-block justify-content-between align-items-center flex-wrap">
						<h6 className="fw-medium d-inline-flex align-items-center mb-3 mb-sm-0"><a href="/projects">
								<i className="ti ti-arrow-left me-2"></i>Back to List</a>
						</h6>
						<div className="d-flex">
							<div className="text-end">
								<a href="#" className="btn btn-primary" data-bs-toggle="modal"
									data-bs-target="#edit_project"><i className="ti ti-edit me-1"></i>Edit Project</a>
							</div>
							<div className="head-icons ms-2 text-end">
								<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="tooltip" data-bs-placement="top"
									data-bs-original-title="Collapse" id="collapse-header">
									<i className="ti ti-chevrons-up"></i>
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-xxl-3 col-xl-4 theiaStickySidebar">
						<div className="card">
							<div className="card-body">
								<h5 className="mb-3">Project Details</h5>
								<div className="list-group details-list-group mb-4">
									<div className="list-group-item">
										<span>Client</span>
										<p className="text-gray-9">EcoVision Enterprises</p>
									</div>
									<div className="list-group-item">
										<div className="d-flex align-items-center justify-content-between">
											<span>Project Total Cost</span>
											<p className="text-gray-9">$1400</p>
										</div>
									</div>
									<div className="list-group-item">
										<div className="d-flex align-items-center justify-content-between">
											<span>Hours of Work</span>
											<p className="text-gray-9">150 hrs</p>
										</div>
									</div>
									<div className="list-group-item">
										<div className="d-flex align-items-center justify-content-between">
											<span>Created on</span>
											<p className="text-gray-9">14 Nov 2026</p>
										</div>
									</div>
									<div className="list-group-item">
										<div className="d-flex align-items-center justify-content-between">
											<span>Started on</span>
											<p className="text-gray-9">15 Jan 2026</p>
										</div>
									</div>
									<div className="list-group-item">
										<div className="d-flex align-items-center justify-content-between">
											<span>Due Date</span>
											<div className="d-flex align-items-center">
												<p className="text-gray-9 mb-0">15 Nov 2026</p>
												<span
													className="badge badge-danger d-inline-flex align-items-center ms-2"><i
														className="ti ti-clock-stop"></i>1</span>
											</div>

										</div>
									</div>
									<div className="list-group-item">
										<div className="d-flex align-items-center justify-content-between">
											<span>Created by</span>
											<div className="d-flex align-items-center">
												<span className="avatar avatar-sm avatar-rounded me-2">
													<img src="/assets/img/profiles/avatar-02.jpg" alt="Img" />
												</span>
												<p className="text-gray-9 mb-0">Cameron</p>
											</div>

										</div>
									</div>
									<div className="list-group-item">
										<div className="d-flex align-items-center justify-content-between">
											<span>Priority</span>
											<div className="dropdown">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
													data-bs-toggle="dropdown">
													<span
														className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
															className="ti ti-point-filled text-danger"></i></span> High
												</a>
												<ul className="dropdown-menu  dropdown-menu-end p-3">
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-danger"></i></span>High</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-warning"></i></span>Medium</a>
													</li>
													<li>
														<a href="#" onClick={(e) => e.preventDefault()}
															className="dropdown-item rounded-1 d-flex justify-content-start align-items-center"><span
																className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2"><i
																	className="ti ti-point-filled text-success"></i></span>Low</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<h5 className="mb-3">Tasks Details</h5>
								<div className="bg-light p-2 rounded">
									<span className="d-block mb-1">Tasks Done</span>
									<h4 className="mb-2">0 / 0</h4>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar" role="progressbar"></div>
									</div>
									<p>0% Completed</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-9 col-xl-8">
						<div className="card">
							<div className="card-body">
								<div className="bg-light rounded p-3 mb-3">
									<div className="d-flex align-items-center">
										<a href="/project-details" className="flex-shrink-0 me-2">
											<img src="/assets/img/social/project-01.svg" alt="Img" />
										</a>
										<div>
											<h6 className="mb-1"><a href="/project-details">Hospital Administration</a>
											</h6>
											<p>Project ID : <span className="text-primary"> PRO-0004</span></p>
										</div>
									</div>
								</div>
								<div className="row align-items-center">
									<div className="col-sm-3">
										<p className="d-flex align-items-center mb-3"><i
												className="ti ti-square-rounded me-2"></i>Status</p>
									</div>
									<div className="col-sm-9">
										<span className="badge badge-soft-purple d-inline-flex align-items-center mb-3"><i
												className="ti ti-point-filled me-1"></i>InProgress</span>
									</div>
									<div className="col-sm-3">
										<p className="d-flex align-items-center mb-3"><i
												className="ti ti-users-group me-2"></i>Team</p>
									</div>
									<div className="col-sm-9">
										<div className="d-flex align-items-center mb-3">
											<div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
												<a href="#"
													className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
													<img src="/assets/img/profiles/avatar-12.jpg" alt="Img" />
												</a>
												<h6 className="fs-12"><a href="#">Lewis</a></h6>
											</div>
											<div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
												<a href="#"
													className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
													<img src="/assets/img/users/user-19.jpg" alt="Img" />
												</a>
												<h6 className="fs-12"><a href="#">Leona</a></h6>
											</div>
											<div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
												<a href="#"
													className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
													<img src="/assets/img/users/user-33.jpg" alt="Img" />
												</a>
												<h6 className="fs-12"><a href="#">Pineiro</a></h6>
											</div>
											<div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
												<a href="#"
													className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
													<img src="/assets/img/users/user-37.jpg" alt="Img" />
												</a>
												<h6 className="fs-12"><a href="#">Moseley</a></h6>
											</div>
											<div>
												<a href="#" className="d-flex align-items-center fs-12"><i
														className="ti ti-circle-plus me-1"></i>Add New</a>
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<p className="d-flex align-items-center mb-3"><i
												className="ti ti-user-shield me-2"></i>Team Lead</p>
									</div>
									<div className="col-sm-9">
										<div className="d-flex align-items-center mb-3">
											<div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
												<a href="#"
													className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
													<img src="/assets/img/users/user-42.jpg" alt="Img" />
												</a>
												<h6 className="fs-12"><a href="#">Ruth</a></h6>
											</div>
											<div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
												<a href="#"
													className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
													<img src="/assets/img/users/user-44.jpg" alt="Img" />
												</a>
												<h6 className="fs-12"><a href="#">Meredith</a></h6>
											</div>
											<div>
												<a href="#" className="d-flex align-items-center fs-12"><i
														className="ti ti-circle-plus me-1"></i>Add New</a>
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<p className="d-flex align-items-center mb-3"><i
												className="ti ti-user-star me-2"></i>Project Manager</p>
									</div>
									<div className="col-sm-9">
										<div className="d-flex align-items-center mb-3">
											<div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
												<a href="#"
													className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
													<img src="/assets/img/users/user-45.jpg" alt="Img" />
												</a>
												<h6 className="fs-12"><a href="#">Dwight</a></h6>
											</div>
											<div>
												<a href="#" className="d-flex align-items-center fs-12"><i
														className="ti ti-circle-plus me-1"></i>Add New</a>
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<p className="d-flex align-items-center mb-3"><i
												className="ti ti-bookmark me-2"></i>Tags</p>
									</div>
									<div className="col-sm-9">
										<div className="d-flex align-items-center mb-3">
											<a href="#" className="badge task-tag bg-pink rounded-pill me-2">Admin Panel</a>
											<a href="#" className="badge task-tag badge-info rounded-pill">High Tech</a>
										</div>
									</div>
									<div className="col-sm-12">
										<div className="mb-3">
											<h6 className="mb-1">Description</h6>
											<p>The Enhanced Patient Management System (EPMS) project aims to modernize
												and streamline
												the patient management processes within. By integrating advanced
												technologies and optimizing existing
												workflows, the project seeks to improve patient care, enhance
												operational
												efficiency, and ensure compliance with regulatory standards.
											</p>
										</div>
									</div>
									<div className="col-md-12">
										<div
											className="bg-soft-secondary p-3 rounded d-flex align-items-center justify-content-between">
											<p className="text-secondary mb-0">Time Spent on this project</p>
											<h3 className="text-secondary">65/120 <span className="fs-16">Hrs</span></h3>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="custom-accordion-items">
							<div className="accordion accordions-items-seperate" id="accordionExample">
								<div className="accordion-item">
									
									<div id="primaryBorderTwo" className="accordion-collapse collapse show border-top"
										aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
										<div className="accordion-body">
											<div className="list-group list-group-flush">
												<div className="list-group-item border rounded mb-2 p-2">
													<div className="row align-items-center row-gap-3">
														<div className="col-md-7">
															<div
																className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3">
																<span><i className="ti ti-grid-dots me-2"></i></span>
																<div className="form-check form-check-md me-2">
																	<input className="form-check-input" type="checkbox" />
																</div>
																<span
																	className="me-2 d-flex align-items-center rating-select"><i
																		className="ti ti-star-filled filled"></i></span>
																<div className="strike-info">
																	<h4 className="fs-14">Patient appointment booking</h4>
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
																	<div className="avatar-list-stacked avatar-group-sm">
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
																		<ul className="dropdown-menu dropdown-menu-end p-3">
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
																<span><i className="ti ti-grid-dots me-2"></i></span>
																<div className="form-check form-check-md me-2">
																	<input className="form-check-input" type="checkbox" />
																</div>
																<span
																	className="me-2 rating-select d-flex align-items-center"><i
																		className="ti ti-star"></i></span>
																<div className="strike-info">
																	<h4 className="fs-14">Appointment booking with payment
																		gateway</h4>
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
																	<div className="avatar-list-stacked avatar-group-sm">
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
																<span><i className="ti ti-grid-dots me-2"></i></span>
																<div className="form-check form-check-md me-2">
																	<input className="form-check-input" type="checkbox" />
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
																	<div className="avatar-list-stacked avatar-group-sm">
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
																		<ul className="dropdown-menu dropdown-menu-end p-3">
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
																className="todo-inbox-check d-flex align-items-center flex-wrap row-gap-3 todo-strike-content">
																<span><i className="ti ti-grid-dots me-2"></i></span>
																<div className="form-check form-check-md me-2">
																	<input className="form-check-input" type="checkbox"
																		checked="" />
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
																	<div className="avatar-list-stacked avatar-group-sm">
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
																		<ul className="dropdown-menu dropdown-menu-end p-3">
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
																<span><i className="ti ti-grid-dots me-2"></i></span>
																<div className="form-check form-check-md me-2">
																	<input className="form-check-input" type="checkbox" />
																</div>
																<span
																	className="me-2 rating-select d-flex align-items-center"><i
																		className="ti ti-star"></i></span>
																<div className="strike-info">
																	<h4 className="fs-14">Go-Live and Post-Implementation
																		Support</h4>
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
																	<div className="avatar-list-stacked avatar-group-sm">
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
												<button
													className="btn bg-primary-transparent border-dashed border-primary w-100 text-start"
													data-bs-toggle="modal" data-bs-target="#add_todo">
													<i className="ti ti-plus me-2"></i>New task
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className="accordion-item ">
									
									<div id="primaryBorderThree" className="accordion-collapse collapse show border-top"
										aria-labelledby="headingThree" data-bs-parent="#accordionExample">
										<div className="accordion-body">
											<div className="media-images-slider owl-carousel">
												<a href="assets/img/media/media-big-08.jpg" data-fancybox="gallery"
													className="gallery-item">
													<img src="/assets/img/media/media-08.jpg" className=" rounded" alt="img" />
													<div className="d-flex align-items-center hover-links">
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-maximize"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-link"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-trash"></i></span>
													</div>
												</a>
												<a href="assets/img/media/media-big-09.jpg" data-fancybox="gallery"
													className="gallery-item">
													<img src="/assets/img/media/media-09.jpg" className="rounded" alt="img" />
													<div className="d-flex align-items-center hover-links">
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-maximize"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-link"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-trash"></i></span>
													</div>
												</a>
												<a href="assets/img/media/media-big-10.jpg" data-fancybox="gallery"
													className="gallery-item">
													<img src="/assets/img/media/media-10.jpg" className="rounded" alt="img" />
													<div className="d-flex align-items-center hover-links">
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-maximize"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-link"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-trash"></i></span>
													</div>
												</a>
												<a href="assets/img/media/media-big-11.jpg" data-fancybox="gallery"
													className="gallery-item">
													<img src="/assets/img/media/media-11.jpg" className="rounded" alt="img" />
													<div className="d-flex align-items-center hover-links">
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-maximize"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-link"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-trash"></i></span>
													</div>
												</a>
												<a href="assets/img/media/media-big-12.jpg" data-fancybox="gallery"
													className="gallery-item">
													<img src="/assets/img/media/media-12.jpg" className="rounded" alt="img" />
													<div className="d-flex align-items-center hover-links">
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-maximize"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-link"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-trash"></i></span>
													</div>
												</a>
												<a href="assets/img/media/media-big-13.jpg" data-fancybox="gallery"
													className="gallery-item">
													<img src="/assets/img/media/media-13.jpg" className="rounded" alt="img" />
													<div className="d-flex align-items-center hover-links">
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-maximize"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-link"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-trash"></i></span>
													</div>
												</a>
												<a href="assets/img/media/media-big-14.jpg" data-fancybox="gallery"
													className="gallery-item">
													<img src="/assets/img/media/media-14.jpg" className="rounded" alt="img" />
													<div className="d-flex align-items-center hover-links">
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-maximize"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-link"></i></span>
														<span className="avatar avatar-md avatar-rounded"><i
																className="ti ti-trash"></i></span>
													</div>
												</a>
											</div>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									
									<div id="primaryBorderFour" className="accordion-collapse collapse show border-top"
										aria-labelledby="headingFour">
										<div className="accordion-body">
											<div className="files-carousel owl-carousel">
												<div className="card shadow-none mb-0">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
															<div className="d-flex align-items-center">
																<a href="#" className="avatar avatar-md bg-light me-2">
																	<img src="/assets/img/icons/file-02.svg"
																		className="w-auto h-auto" alt="img" />
																</a>
																<div>
																	<h6 className="mb-1">Project_1.docx</h6>
																	<span>7.6 MB</span>
																</div>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" className="btn btn-sm btn-icon"><i
																		className="ti ti-download"></i></a>
																<a href="#" className="btn btn-sm btn-icon"><i
																		className="ti ti-trash"></i></a>
															</div>
														</div>
														<div className="d-flex align-items-center justify-content-between">
															<p className="fw-medium mb-0">15 May 2024, 6:53 PM</p>
															<span className="avatar avatar-sm avatar-rounded"><img
																	src="/assets/img/profiles/avatar-02.jpg"
																	alt="Img" /></span>
														</div>
													</div>
												</div>
												<div className="card shadow-none mb-0">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
															<div className="d-flex align-items-center">
																<a href="#" className="avatar avatar-md bg-light me-2">
																	<img src="/assets/img/icons/file-01.svg"
																		className="w-auto h-auto" alt="img" />
																</a>
																<div>
																	<h6 className="mb-1">Proposal.pdf</h6>
																	<span>12.6 MB</span>
																</div>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" className="btn btn-sm btn-icon"><i
																		className="ti ti-download"></i></a>
																<a href="#" className="btn btn-sm btn-icon"><i
																		className="ti ti-trash"></i></a>
															</div>
														</div>
														<div className="d-flex align-items-center justify-content-between">
															<p className="fw-medium mb-0">15 May 2024, 6:53 PM</p>
															<span className="avatar avatar-sm avatar-rounded"><img
																	src="/assets/img/users/user-19.jpg" alt="Img" /></span>
														</div>
													</div>
												</div>
												<div className="card shadow-none mb-0">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
															<div className="d-flex align-items-center">
																<a href="#" className="avatar avatar-md bg-light me-2">
																	<img src="/assets/img/icons/file-04.svg"
																		className="w-auto h-auto" alt="img" />
																</a>
																<div>
																	<h6 className="mb-1">Logo-Img.zip</h6>
																	<span>6.2 MB</span>
																</div>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" className="btn btn-sm btn-icon"><i
																		className="ti ti-download"></i></a>
																<a href="#" className="btn btn-sm btn-icon"><i
																		className="ti ti-trash"></i></a>
															</div>
														</div>
														<div className="d-flex align-items-center justify-content-between">
															<p className="fw-medium mb-0">15 May 2024, 6:53 PM</p>
															<span className="avatar avatar-sm avatar-rounded"><img
																	src="/assets/img/users/user-20.jpg" alt="Img" /></span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-xl-6 d-flex">
										<div className="accordion-item flex-fill">
											
											<div id="primaryBorderFive"
												className="accordion-collapse collapse show border-top"
												aria-labelledby="headingFive">
												<div className="accordion-body">
													<div className="card">
														<div className="card-body">
															<div
																className="d-flex align-items-center justify-content-between mb-2">
																<h6 className="text-gray-5 fw-medium">15 May 2025</h6>
																<div className="dropdown">
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="d-inline-flex align-items-center"
																		data-bs-toggle="dropdown" aria-expanded="false">
																		<i className="ti ti-dots-vertical"></i>
																	</a>
																	<ul className="dropdown-menu dropdown-menu-end p-3">
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
																&amp; design</h6>
															<p className="text-truncate line-clamb-3">An office management
																app project streamlines administrative tasks by
																integrating
																tools for scheduling, communication, and
																task management, enhancing overall productivity and
																efficiency.
															</p>
														</div>
													</div>
													<div className="card mb-0">
														<div className="card-body">
															<div
																className="d-flex align-items-center justify-content-between mb-2">
																<h6 className="text-gray-5 fw-medium">15 May 2025</h6>
																<div className="dropdown">
																	<a href="#" onClick={(e) => e.preventDefault()}
																		className="d-inline-flex align-items-center"
																		data-bs-toggle="dropdown" aria-expanded="false">
																		<i className="ti ti-dots-vertical"></i>
																	</a>
																	<ul className="dropdown-menu dropdown-menu-end p-3">
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
																&amp; design</h6>
															<p className="text-truncate line-clamb-3">An office management
																app project streamlines administrative tasks by
																integrating
																tools for scheduling, communication, and
																task management, enhancing overall productivity and
																efficiency.
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-xl-6 d-flex">
										<div className="accordion-item flex-fill">
											
											<div id="primaryBorderSix"
												className="accordion-collapse collapse show border-top"
												aria-labelledby="headingSix">
												<div className="accordion-body">
													<div className="notice-widget">
														<div
															className="d-flex align-items-center justify-content-between mb-4">
															<div className="d-flex overflow-hidden">
																<span
																	className="bg-info avatar avatar-md me-3 rounded-circle flex-shrink-0">
																	<i className="ti ti-checkup-list fs-16"></i>
																</span>
																<div className="overflow-hidden">
																	<p className="text-truncate mb-1"><span
																			className="text-gray-9 fw-medium">Andrew
																		</span>added a New Task</p>
																	<p className="mb-1">15 May 2024, 6:53 PM</p>
																</div>
															</div>
														</div>
														<div
															className="d-flex align-items-center justify-content-between mb-4">
															<div className="d-flex overflow-hidden me-2">
																<span
																	className="bg-warning avatar avatar-md me-3 rounded-circle flex-shrink-0">
																	<i className="ti ti-circle-dot fs-16"></i>
																</span>
																<div className="overflow-hidden">
																	<p className="text-truncate mb-1"><span
																			className="text-gray-9 fw-medium">Jermai
																		</span>Moved task <span
																			className="text-gray-9 fw-medium"> “Private chat
																			module”</span></p>
																	<p className="mb-1">15 May 2024, 6:53 PM</p>
																	<div className="d-flex align-items-center">
																		<span className="badge badge-success me-2"><i
																				className="ti ti-point-filled me-1"></i>Completed</span>
																		<span><i
																				className="ti ti-arrows-left-right me-2"></i></span>
																		<span className="badge badge-purple"><i
																				className="ti ti-point-filled me-1"></i>Inprogress</span>
																	</div>
																</div>
															</div>
														</div>
														<div
															className="d-flex align-items-center justify-content-between mb-4">
															<div className="d-flex overflow-hidden me-2">
																<span
																	className="bg-purple avatar avatar-md me-3 rounded-circle flex-shrink-0">
																	<i className="ti ti-checkup-list fs-16"></i>
																</span>
																<div className="overflow-hidden">
																	<p className="text-truncate mb-1"><span
																			className="text-gray-9 fw-medium">Jermai
																		</span>Created task <span
																			className="text-gray-9 fw-medium"> “Private chat
																			module”</span></p>
																	<p className="mb-1">15 May 2024, 6:53 PM</p>
																</div>
															</div>
														</div>
														<div className="d-flex align-items-center justify-content-between">
															<div className="d-flex overflow-hidden">
																<span
																	className="bg-secondary avatar avatar-md me-3 rounded-circle flex-shrink-0">
																	<i className="ti ti-photo fs-16"></i>
																</span>
																<div className="overflow-hidden">
																	<p className="text-truncate mb-1"><span
																			className="text-gray-9 fw-medium">Hendry </span>
																		Updated Image <span
																			className="text-gray-9 fw-medium"> “logo.jpg”
																		</span></p>
																	<p className="mb-1">15 May 2024, 6:53 PM</p>
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
									
									<div id="primaryBorderSeven" className="accordion-collapse collapse show border-top"
										aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
										<div className="accordion-body">
											<div className="list-group list-group-flush">
												<div className="list-group-item border rounded mb-2 p-2">
													<div className="row align-items-center g-3">
														<div className="col-sm-6">
															<div className="d-flex align-items-center">
																<span
																	className="avatar avatar-lg bg-light flex-shrink-0 me-2"><i
																		className="ti ti-file-invoice text-dark fs-24"></i></span>
																<div>
																	<h6 className="fw-medium mb-1">Phase 2 Completion</h6>
																	<p><a href="#" className="text-info">#INV-123 </a> 11
																		Sep 2025, 05:35 pm</p>
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
																	<h6 className="fw-medium mb-1">Advance for Project</h6>
																	<p><a href="#" className="text-info">#INV-124 </a> 14
																		Sep 2025, 05:35 pm</p>
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
																	<p><a href="#" className="text-info">#INV-125 </a> 15
																		Sep 2025, 05:35 pm</p>
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
																	<h6 className="fw-medium mb-1">Added New Functionality
																	</h6>
																	<p><a href="#" className="text-info">#INV-126 </a> 16
																		Sep 2025, 05:35 pm</p>
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
																	<h6 className="fw-medium mb-1">Phase 1 Completion</h6>
																	<p><a href="#" className="text-info">#INV-127 </a> 17
																		Sep 2025, 05:35 pm</p>
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
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default ProjectDetails;
