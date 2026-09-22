import React, { useState } from 'react';

export default function ClientTasks({ isAccordion }) {
  const [currentPage_clientdetails, setCurrentPage_clientdetails] = useState(1);
  const [rowsPerPage_clientdetails, setRowsPerPage_clientdetails] = useState(10);
  const [searchQuery_clientdetails, setSearchQuery_clientdetails] = useState('');
  if (isAccordion) {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingClientTasks">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientTasks" aria-expanded="false" aria-controls="collapseClientTasks">
            Tasks
          </button>
        </h2>
        <div id="collapseClientTasks" className="accordion-collapse collapse" aria-labelledby="headingClientTasks" data-bs-parent="#overviewAccordion">
          <div className="accordion-body pb-0">
            {/* Wrapped accordion content */}
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
																	<p className='py-0 fs-20 text-dark'>Tasks</p>
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
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="accordion accordions-items-seperate">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTasksTab">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTasksTab" aria-expanded="true" aria-controls="collapseTasksTab">
              Tasks
            </button>
          </h2>
          <div id="collapseTasksTab" className="accordion-collapse collapse show" aria-labelledby="headingTasksTab">
											
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
    </>
  );
}
