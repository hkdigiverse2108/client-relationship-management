import React from 'react';
import { Link } from 'react-router-dom';

const TaskDetails = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<div className="row align-items-center mb-4">
					<div className="d-md-flex d-sm-block justify-content-between align-items-center flex-wrap">
						<h6 className="fw-medium d-inline-flex align-items-center mb-3 mb-sm-0"><a href="/tasks">
								<i className="ti ti-arrow-left me-2"></i>Back to List</a>
						</h6>
						<div className="d-flex">
							<div className="text-end">
								<a href="#" className="btn btn-primary" data-bs-toggle="modal"
									data-bs-target="#edit_task"><i className="ti ti-edit me-1"></i>Edit Task</a>
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
				{/* /Breadcrumb */}

				<div className="row">
					<div className="col-xl-8">
						<div className="card">
							<div className="card-body pb-1">
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3 mb-4">
									<div>
										<h4 className="mb-1">Patient and Doctor video conferencing Module</h4>
										<p>Priority : <span className="badge badge-danger"><i
													className="ti ti-point-filled me-1"></i>High</span></p>
									</div>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
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
								<div className="row align-items-center">
									<div className="col-sm-12">
										<div className="mb-3">
											<h6 className="mb-1">Description</h6>
											<p>The Enhanced Patient Management System (EPMS) project aims to modernize
												and streamline the patient management processes within. By integrating
												advanced technologies and optimizing existing workflows, the project
												seeks to improve patient care, enhance operational efficiency, and
												ensure compliance with regulatory standards.
											</p>
										</div>
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
												className="ti ti-user-shield me-2"></i>Assignee</p>
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
								</div>
							</div>
						</div>
						<div className="custom-accordion-items">
							<div className="accordion accordions-items-seperate">
								<div className="accordion-item">
									
									<div id="primaryBorderFour" className="accordion-collapse collapse show border-top"
										aria-labelledby="headingFour">
										<div className="accordion-body">
											<div className="files-carousel owl-carousel">
												<div className="card shadow-none mb-0">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
															<div className="d-flex align-items-center overflow-hidden">
																<a href="#" className="avatar avatar-md bg-light me-2">
																	<img src="/assets/img/icons/file-02.svg"
																		className="w-auto h-auto" alt="img" />
																</a>
																<div className="overflow-hidden">
																	<h6 className="mb-1 text-truncate">Project_1.docx</h6>
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
															<div className="d-flex align-items-center overflow-hidden">
																<a href="#" className="avatar avatar-md bg-light me-2">
																	<img src="/assets/img/icons/file-01.svg"
																		className="w-auto h-auto" alt="img" />
																</a>
																<div className="overflow-hidden">
																	<h6 className="mb-1 text-truncate">Proposal.pdf</h6>
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
															<p className="fw-medium mb-0">16 Jan 2025, 7:25 PM</p>
															<span className="avatar avatar-sm avatar-rounded"><img
																	src="/assets/img/users/user-19.jpg" alt="Img" /></span>
														</div>
													</div>
												</div>
												<div className="card shadow-none mb-0">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
															<div className="d-flex align-items-center overflow-hidden">
																<a href="#" className="avatar avatar-md bg-light me-2">
																	<img src="/assets/img/icons/file-04.svg"
																		className="w-auto h-auto" alt="img" />
																</a>
																<div className="overflow-hidden">
																	<h6 className="mb-1 text-truncate">Logo-Img.zip</h6>
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
															<p className="fw-medium mb-0">31 July 2025, 8:40 AM</p>
															<span className="avatar avatar-sm avatar-rounded"><img
																	src="/assets/img/users/user-20.jpg" alt="Img" /></span>
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
					<div className="col-xl-4">
						<div className="card">
							<div className="card-body p-0">
								<div className="d-flex flex-column">
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<p className="mb-0">Project</p>
										<h6 className="fw-normal">Hospital Administration</h6>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<p className="mb-0">Created on</p>
										<h6 className="fw-normal">14 Nov 2026</h6>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<p className="mb-0">Started on</p>
										<h6 className="fw-normal">15 Jan 2026</h6>
									</div>
									<div className="d-flex align-items-center justify-content-between p-3">
										<p className="mb-0">Due Date</p>
										<h6 className="fw-normal">15 Nov 2026</h6>
									</div>
								</div>
							</div>
						</div>
						<div className="custom-accordion-items">
							<div className="accordion accordions-items-seperate">
								<div className="accordion-item flex-fill">
									
									<div id="primaryBorderSix" className="accordion-collapse collapse show border-top"
										aria-labelledby="headingSix">
										<div className="accordion-body">
											<div className="notice-widget">
												<div className="d-flex align-items-center justify-content-between mb-4">
													<div className="d-flex overflow-hidden">
														<span
															className="bg-info avatar avatar-md me-3 rounded-circle flex-shrink-0">
															<i className="ti ti-checkup-list fs-16"></i>
														</span>
														<div className="overflow-hidden">
															<p className="text-truncate mb-1"><span
																	className="text-gray-9 fw-medium">Andrew </span>added a
																New Task</p>
															<p className="mb-1">15 May 2024, 6:53 PM</p>
														</div>
													</div>
												</div>
												<div className="d-flex align-items-center justify-content-between mb-4">
													<div className="d-flex overflow-hidden me-2">
														<span
															className="bg-warning avatar avatar-md me-3 rounded-circle flex-shrink-0">
															<i className="ti ti-circle-dot fs-16"></i>
														</span>
														<div className="overflow-hidden">
															<p className="text-truncate mb-1"><span
																	className="text-gray-9 fw-medium">Jermai </span>Moved
																task <span className="text-gray-9 fw-medium"> “Private chat
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
												<div className="d-flex align-items-center justify-content-between mb-4">
													<div className="d-flex overflow-hidden me-2">
														<span
															className="bg-purple avatar avatar-md me-3 rounded-circle flex-shrink-0">
															<i className="ti ti-checkup-list fs-16"></i>
														</span>
														<div className="overflow-hidden">
															<p className="text-truncate mb-1"><span
																	className="text-gray-9 fw-medium">Jermai </span>Created
																task <span className="text-gray-9 fw-medium"> “Private chat
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
																	className="text-gray-9 fw-medium">Hendry </span> Updated
																Image <span className="text-gray-9 fw-medium"> “logo.jpg”
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

export default TaskDetails;
