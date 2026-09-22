import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomDatePicker from '../components/common/CustomDatePicker';

const TaskBoard = () => {
  const [activePriority, setActivePriority] = useState('All');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">
				{/* Breadcrumb */}
				<div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
					<div className="my-auto mb-2">
						<h2 className="mb-1">Task Board</h2>
						<nav>
							<ol className="breadcrumb mb-0">
								<li className="breadcrumb-item">
									<a href="/"><i className="ti ti-smart-home"></i></a>
								</li>
								<li className="breadcrumb-item">
									Projects
								</li>
								<li className="breadcrumb-item active" aria-current="page">Task Board</li>
							</ol>
						</nav>
					</div>
					<div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
						<div className="dropdown me-2">
							<a href="#" onClick={(e) => e.preventDefault()}
								className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
								data-bs-toggle="dropdown">
								<i className="ti ti-file-export me-2"></i> Export
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
						<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-primary d-inline-flex align-items-center"
							data-bs-toggle="modal" data-bs-target="#add_board">
							<i className="ti ti-circle-plus me-1"></i>Add Board
						</a>
						<div className="head-icons ms-2 mb-0">
							<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
					</div>
				</div>
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h4>Hospital Administration</h4>
						<div className="d-flex align-items-center flex-wrap row-gap-3">
							<div className="avatar-list-stacked avatar-group-sm me-3">
								<span className="avatar avatar-rounded">
									<img className="border border-white" src="assets/img/profiles/avatar-19.jpg" alt="img" />
								</span>
								<span className="avatar avatar-rounded">
									<img className="border border-white" src="assets/img/profiles/avatar-29.jpg" alt="img" />
								</span>
								<span className="avatar avatar-rounded">
									<img className="border border-white" src="assets/img/profiles/avatar-16.jpg" alt="img" />
								</span>
								<span className="avatar avatar-rounded bg-primary fs-12">
									1+
								</span>
							</div>
							<div className="d-flex align-items-center me-3">
								<p className="mb-0 me-3 pe-3 border-end fs-14">Total Task : <span className="text-dark"> 55
									</span></p>
								<p className="mb-0 me-3 pe-3 border-end fs-14">Pending : <span className="text-dark"> 15 </span>
								</p>
								<p className="mb-0 fs-14">Completed : <span className="text-dark"> 40 </span></p>
							</div>
							<div className="input-icon-start position-relative">
								<span className="input-icon-addon">
									<i className="ti ti-search"></i>
								</span>
								<input type="text" className="form-control" placeholder="Search Project" />
							</div>
						</div>
					</div>
							<div className="card-body">
						<div className="row">
							<div className="col-lg-4">
								<div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
									<h6 className="me-2">Priority</h6>
									<ul className="nav nav-pills border d-inline-flex p-1 rounded bg-light todo-tabs"
										id="pills-tab" role="tablist">
										<li className="nav-item" role="presentation">
											<button
												className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'All' ? 'active' : ''}`}
												onClick={() => setActivePriority('All')}
												type="button"
												role="tab">All</button>
										</li>
										<li className="nav-item" role="presentation">
											<button
												className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'High' ? 'active' : ''}`}
												onClick={() => setActivePriority('High')}
												type="button"
												role="tab">High</button>
										</li>
										<li className="nav-item" role="presentation">
											<button
												className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'Medium' ? 'active' : ''}`}
												onClick={() => setActivePriority('Medium')}
												type="button"
												role="tab">Medium</button>
										</li>
										<li className="nav-item" role="presentation">
											<button
												className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'Low' ? 'active' : ''}`}
												onClick={() => setActivePriority('Low')}
												type="button"
												role="tab">Low</button>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-8">
								<div className="d-flex align-items-center justify-content-lg-end flex-wrap row-gap-3 mb-3">
									<div className="dropdown me-2">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											Clients
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Clients</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Sophie</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Cameron</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Doris</a>
											</li>
										</ul>
									</div>
									<div className="input-icon w-120 position-relative me-2">
										<span className="input-icon-addon">
											<i className="ti ti-calendar"></i>
										</span>
										<CustomDatePicker type="text" className="form-control "
											placeholder="Created Date"  isRange={false} />
									</div>
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
											Select Status
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Inprogress</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">On-hold</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="dropdown-item rounded-1">Completed</a>
											</li>
										</ul>
									</div>
									<div className="d-flex align-items-center border rounded p-2">
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
														className="dropdown-item rounded-1">High</a>
												</li>
												<li>
													<a href="#" onClick={(e) => e.preventDefault()}
														className="dropdown-item rounded-1">Medium</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="tab-content" id="pills-tabContent">
							<div className="tab-pane fade show active" id="pills-home" role="tabpanel">
								<div className="d-flex align-items-start overflow-auto project-status pb-4">
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span
														className="bg-transparent-purple p-1 d-flex rounded-circle me-2"><span
															className="bg-purple rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">To Do</h5>
													<span className="badge bg-light rounded-pill">02</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Payment Gateway</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 18
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-19.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-29.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-16.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-02.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient appointment
																booking</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '20%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">20%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
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
																		src="/assets/img/profiles/avatar-04.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-pink p-1 d-flex rounded-circle me-2"><span
															className="bg-pink rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Pending</h5>
													<span className="badge bg-light rounded-pill">13</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient appointment
																booking</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '20%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">20%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
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
																		src="/assets/img/profiles/avatar-04.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Payment Gateway</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-10.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-12.jpg"
																		alt="img" />
																</span>
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-skyblue p-1 d-flex rounded-circle me-2"><span
															className="bg-skyblue rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Inprogress</h5>
													<span className="badge bg-light rounded-pill">04</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Doctor Module</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '35%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">35%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 20
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-17.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-18.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-19.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Inventory and Supplies
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-purple" style={{width: '60%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">60%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 21
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-success p-1 d-flex rounded-circle me-2"><span
															className="bg-success rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Completed</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Billing and Payments
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-25.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-26.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-27.jpg"
																		alt="img" />
																</span>
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-warning p-1 d-flex rounded-circle me-2"><span
															className="bg-warning rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">On-hold</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient Feedback</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '15%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">15%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Telemedicine
																Implementation</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-skyblue p-1 d-flex rounded-circle me-2"><span
															className="bg-skyblue rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Review</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient Feedback</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 16
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Appointment Scheduling
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 24
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="tab-pane fade" id="pills-contact" role="tabpanel">
								<div className="d-flex align-items-start overflow-auto project-status pb-4">
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span
														className="bg-transparent-purple p-1 d-flex rounded-circle me-2"><span
															className="bg-purple rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">To Do</h5>
													<span className="badge bg-light rounded-pill">02</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Payment Gateway</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 18
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-19.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-29.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-16.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-02.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient appointment
																booking</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '20%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">20%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
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
																		src="/assets/img/profiles/avatar-04.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-pink p-1 d-flex rounded-circle me-2"><span
															className="bg-pink rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Pending</h5>
													<span className="badge bg-light rounded-pill">13</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient appointment
																booking</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '20%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">20%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
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
																		src="/assets/img/profiles/avatar-04.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Payment Gateway</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-10.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-12.jpg"
																		alt="img" />
																</span>
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-skyblue p-1 d-flex rounded-circle me-2"><span
															className="bg-skyblue rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Inprogress</h5>
													<span className="badge bg-light rounded-pill">04</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Doctor Module</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '35%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">35%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 20
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-17.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-18.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-19.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Inventory and Supplies
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-purple" style={{width: '60%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">60%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 21
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-success p-1 d-flex rounded-circle me-2"><span
															className="bg-success rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Completed</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Billing and Payments
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-25.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-26.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-27.jpg"
																		alt="img" />
																</span>
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-warning p-1 d-flex rounded-circle me-2"><span
															className="bg-warning rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">On-hold</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient Feedback</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '15%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">15%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Telemedicine
																Implementation</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-skyblue p-1 d-flex rounded-circle me-2"><span
															className="bg-skyblue rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Review</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient Feedback</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 16
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Appointment Scheduling
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 24
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="tab-pane fade" id="pills-medium" role="tabpanel">
								<div className="d-flex align-items-start overflow-auto project-status pb-4">
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span
														className="bg-transparent-purple p-1 d-flex rounded-circle me-2"><span
															className="bg-purple rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">To Do</h5>
													<span className="badge bg-light rounded-pill">02</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Payment Gateway</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 18
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-19.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-29.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-16.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-02.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient appointment
																booking</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '20%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">20%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
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
																		src="/assets/img/profiles/avatar-04.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-pink p-1 d-flex rounded-circle me-2"><span
															className="bg-pink rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Pending</h5>
													<span className="badge bg-light rounded-pill">13</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient appointment
																booking</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '20%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">20%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
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
																		src="/assets/img/profiles/avatar-04.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Payment Gateway</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-10.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-12.jpg"
																		alt="img" />
																</span>
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-skyblue p-1 d-flex rounded-circle me-2"><span
															className="bg-skyblue rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Inprogress</h5>
													<span className="badge bg-light rounded-pill">04</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Doctor Module</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '35%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">35%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 20
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-17.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-18.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-19.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Inventory and Supplies
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-purple" style={{width: '60%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">60%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 21
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-success p-1 d-flex rounded-circle me-2"><span
															className="bg-success rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Completed</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Billing and Payments
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-25.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-26.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-27.jpg"
																		alt="img" />
																</span>
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-warning p-1 d-flex rounded-circle me-2"><span
															className="bg-warning rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">On-hold</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient Feedback</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '15%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">15%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Telemedicine
																Implementation</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-skyblue p-1 d-flex rounded-circle me-2"><span
															className="bg-skyblue rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Review</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient Feedback</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 16
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Appointment Scheduling
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 24
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="tab-pane fade" id="pills-low" role="tabpanel">
								<div className="d-flex align-items-start overflow-auto project-status pb-4">
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span
														className="bg-transparent-purple p-1 d-flex rounded-circle me-2"><span
															className="bg-purple rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">To Do</h5>
													<span className="badge bg-light rounded-pill">02</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Payment Gateway</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 18
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-19.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-29.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-16.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-02.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient appointment
																booking</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '20%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">20%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
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
																		src="/assets/img/profiles/avatar-04.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-pink p-1 d-flex rounded-circle me-2"><span
															className="bg-pink rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Pending</h5>
													<span className="badge bg-light rounded-pill">13</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient appointment
																booking</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '20%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">20%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-01.jpg"
																		alt="img" />
																</span>
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
																		src="/assets/img/profiles/avatar-04.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Payment Gateway</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 15
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-10.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-12.jpg"
																		alt="img" />
																</span>
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-skyblue p-1 d-flex rounded-circle me-2"><span
															className="bg-skyblue rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Inprogress</h5>
													<span className="badge bg-light rounded-pill">04</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Doctor Module</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '35%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">35%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 20
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-17.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-18.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-19.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Inventory and Supplies
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-purple" style={{width: '60%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">60%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 21
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-success p-1 d-flex rounded-circle me-2"><span
															className="bg-success rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Completed</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Billing and Payments
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-25.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-26.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-27.jpg"
																		alt="img" />
																</span>
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100 me-3">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-warning p-1 d-flex rounded-circle me-2"><span
															className="bg-warning rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">On-hold</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient Feedback</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-danger" style={{width: '15%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">15%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-success badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Low</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Telemedicine
																Implementation</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-warning" style={{width: '40%'}}>
																</div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">40%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 22
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
										</div>
									</div>
									<div className="p-3 rounded bg-transparent-secondary w-100">
										<div className="bg-white p-2 rounded mb-2">
											<div className="d-flex align-items-center justify-content-between">
												<div className="d-flex align-items-center">
													<span className="bg-soft-skyblue p-1 d-flex rounded-circle me-2"><span
															className="bg-skyblue rounded-circle d-block p-1"></span></span>
													<h5 className="me-2">Review</h5>
													<span className="badge bg-light rounded-pill">10</span>
												</div>
												<div className="dropdown">
													<a href="#" onClick={(e) => e.preventDefault()}
														className="d-inline-flex align-items-center"
														data-bs-toggle="dropdown">
														<i className="ti ti-dots-vertical"></i>
													</a>
													<ul className="dropdown-menu dropdown-menu-end p-3">
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#edit_task"><i
																	className="ti ti-edit me-2"></i>Edit</a>
														</li>
														<li>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="dropdown-item rounded-1" data-bs-toggle="modal"
																data-bs-target="#delete_modal"><i
																	className="ti ti-trash me-2"></i>Delete</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="kanban-drag-wrap">
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-warning badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>Medium</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Patient Feedback</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 16
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-30.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-31.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-05.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-09.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded">
																	<img className="border border-white"
																		src="/assets/img/profiles/avatar-11.jpg"
																		alt="img" />
																</span>
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div>
												<div className="card kanban-card mb-2">
													<div className="card-body">
														<div
															className="d-flex align-items-center justify-content-between mb-3">
															<div className="d-flex align-items-center">
																<span className="badge bg-outline-dark me-2">Web
																	Layout</span>
																<span
																	className="badge bg-danger badge-xs d-flex align-items-center justify-content-center"><i
																		className="fas fa-circle fs-6 me-1"></i>High</span>
															</div>
															<div className="dropdown">
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
																</ul>
															</div>
														</div>
														<div className="mb-2">
															<h6 className="d-flex align-items-center">Appointment Scheduling
															</h6>
														</div>
														<div className="d-flex align-items-center mb-2">
															<div className="progress progress-sm flex-fill"
																role="progressbar" aria-label="Basic example"
																aria-valuenow="0" aria-valuemin="0" aria-valuemax="20">
																<div className="progress-bar bg-success"
																	style={{width: '100%'}}></div>
															</div>
															<span className="d-block ms-2 text-gray-9 fw-medium">100%</span>
														</div>
														<p className="fw-medium mb-0">Due on : <span className="text-gray-9"> 24
																Apr 2024</span></p>
														<div
															className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
															<div className="avatar-list-stacked avatar-group-sm me-3">
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
																<span className="avatar avatar-rounded bg-primary fs-12">
																	1+
																</span>
															</div>
															<div className="d-flex align-items-center">
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark me-2"><i
																		className="ti ti-message-circle text-gray me-1"></i>14</a>
																<a href="#" onClick={(e) => e.preventDefault()}
																	className="d-flex align-items-center text-dark"><i
																		className="ti ti-paperclip text-gray me-1"></i>14</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="pt-2">
											<a href="#"
												className="btn btn-white border border-dashed d-flex align-items-center justify-content-center"
												data-bs-toggle="modal" data-bs-target="#add_task">
												<i className="ti ti-plus me-2"></i> New Task
											</a>
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

export default TaskBoard;
