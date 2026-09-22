import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const ProjectsGrid = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Projects"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Projects' },
						{ label: 'Projects Grid', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/projects" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/projects-grid" className="btn btn-icon btn-sm active bg-primary text-white"><i
										className="ti ti-layout-grid"></i></a>
							</div>
						</div>
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_project"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Project</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
							<h5>Projects Grid</h5>
							<div className="d-flex align-items-center flex-wrap row-gap-3">
								<div className="dropdown me-2">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Select Status
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Select
												Status</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Active</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Inactive</a>
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

				{/* Project Grid */}
				<div className="row">
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details">Office Management</a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">An office management app project
										streamlines administrative tasks by integrating
										tools for scheduling, communication, and
										task management, enhancing overall productivity and efficiency.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-39.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Anthony Lewis</a>
											</h6>
											<span className="fs-12 fw-normal ">Project Leader</span>
										</div>
									</div>
									<div className="d-flex align-items-center">
										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">14 Jan 2024</p>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">6</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-02.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-03.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-05.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details">Clinic Management </a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">A clinic management project streamlines
										patient records, appointments, and billing processes to improve operational
										efficiency.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-40.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Sophie
													Headrick</a></h6>
											<span className="fs-12 fw-normal ">Project Leader</span>
										</div>
									</div>
									<div className="d-flex align-items-center">

										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">15 Jan 2024</p>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">7</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-06.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-07.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-08.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+2
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details">Educational Platform</a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">An educational platform project provides
										a centralized space for delivering online courses, tracking progress, and
										managing student assessments.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-41.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Cameron Drake</a>
											</h6>
											<span className="fs-12 fw-normal ">Project Leader</span>
										</div>
									</div>
									<div className="d-flex align-items-center">

										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">16 Jan 2024</p>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">5</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-09.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-10.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-11.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+2
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details"> Chat & Call Mobile App</a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">A chat and call mobile app enables users
										to send messages, make voice and video calls, and share media seamlessly across
										devices.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-42.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Doris Crowley</a>
											</h6>
											<span className="fs-12 fw-normal ">Project Leader</span>
										</div>
									</div>
									<div className="d-flex align-items-center">

										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">17 Jan 2024</p>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">6</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-12.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-13.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-14.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+2
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details">Travel Planning Website</a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">A travel planning website helps users
										explore destinations, compare flights and accommodations, and create
										personalized itineraries.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-43.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Thomas
													Bordelon</a></h6>
											<span className="fs-12 fw-normal">Manager</span>
										</div>
									</div>
									<div className="d-flex align-items-center">

										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">18 Jan 2024</p>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">8</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-15.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-16.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-17.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+2
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details">Service Booking Software</a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">Service booking software enables users to
										schedule appointments, manage bookings, and handle payments for various
										services.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-45.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Kathleen
													Gutierrez</a></h6>
											<span className="fs-12 fw-normal">Project Leader</span>
										</div>
									</div>
									<div className="d-flex align-items-center">

										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">19 Jan 2024</p>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">8</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-18.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-19.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-20.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+2
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details">Hotel Booking App</a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">A hotel booking app allows users to
										search, compare, and book accommodations with ease, offering a wide range of
										options.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-46.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Bruce Wright</a>
											</h6>
											<span className="fs-12 fw-normal">Project Leader</span>
										</div>
									</div>
									<div className="d-flex align-items-center">

										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">20 Jan 2024</p>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">8</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-24.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-23.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-22.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details">Car & Bike Rental Software</a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">Car and bike rental software allows users
										to browse, reserve, and rent vehicles efficiently through an online platform.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-47.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Rebecca Smtih</a>
											</h6>
											<span className="fs-12 fw-normal ">Project Leader</span>
										</div>
									</div>
									<div className="d-flex align-items-center">

										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">17 Jan 2024</p>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">6</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-12.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-13.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-14.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+2
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details">Navigation and Safety App</a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">A navigation and safety app provides
										real-time GPS guidance, traffic updates, and route optimization to help users
										reach their destinations efficiently.A navigation and safety app provides
										real-time GPS guidance, traffic updates, and route optimization to help users
										reach their destinations efficiently.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-28.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Connie Waters</a>
											</h6>
											<span className="fs-12 fw-normal ">Project Leader</span>
										</div>
									</div>
									<div className="d-flex align-items-center">

										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">14 Jan 2024</p>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">6</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-02.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-03.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-05.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details">Food Order App</a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">A food order app allows users to browse
										menus, place orders, and track delivery from their favorite restaurants with
										ease.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-42.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Lori Broaddus</a>
											</h6>
											<span className="fs-12 fw-normal ">Project Leader</span>
										</div>
									</div>
									<div className="d-flex align-items-center">

										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">15 Jan 2024</p>
										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">7</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-06.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-07.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-08.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+2
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details">POS Admin Software</a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">POS admin software enables businesses to
										manage sales, track inventory, and process transactions efficiently through a
										centralized platform.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-48.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Stephen Dias</a>
											</h6>
											<span className="fs-12 fw-normal ">CEO</span>
										</div>
									</div>
									<div className="d-flex align-items-center">

										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">22 Jan 2024</p>

										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">5</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-26.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-27.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-28.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+2
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-2">
									<h6><a href="/project-details">Invoicing & Billing Software</a></h6>
									<div className="dropdown">
										<a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</a>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#edit_project"><i
														className="ti ti-edit me-2"></i>Edit</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="mb-3 pb-3 border-bottom">
									<p className="text-truncate line-clamb-3 mb-0">Invoicing and billing software automates
										the creation, sending, and tracking of invoices, making payment processes
										quicker and more efficient.
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
									<div className="d-flex align-items-center file-name-icon">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="avatar avatar-sm avatar-rounded flex-shrink-0">
											<img src="/assets/img/users/user-50.jpg" className="img-fluid" alt="img" />
										</a>
										<div className="ms-2">
											<h6 className="fw-normal fs-12"><a href="#" onClick={(e) => e.preventDefault()}>Angela Thomas</a>
											</h6>
											<span className="fs-12 fw-normal">Project Leader</span>
										</div>
									</div>
									<div className="d-flex align-items-center">

										<div>
											<span className="fs-12 fw-normal ">Deadline</span>
											<p className="mb-0 fs-12">23 Jan 2024</p>

										</div>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<span
											className="avatar avatar-sm avatar-rounded bg-success-transparent flex-shrink-0 me-2">
											<i className="ti ti-checklist text-success fs-16"></i>
										</span>
										<p>
											<small>Tasks : </small>
											<span className="text-dark">8</span>/10
										</p>
									</div>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-29.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-30.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-03.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12 fw-medium"
											href="#" onClick={(e) => e.preventDefault()}>
											+2
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-12">
						<div className="text-center mb-4">
							<a href="#" className="btn btn-primary"><i className="ti ti-loader-3 me-1"></i>Load More</a>
						</div>
					</div>
				</div>
				{/* / Project Grid */}

			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default ProjectsGrid;
