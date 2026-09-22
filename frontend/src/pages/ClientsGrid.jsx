import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const ClientsGrid = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Clients"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Projects' },
						{ label: 'Client Grid', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/clients" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/clients-grid" className="btn btn-icon btn-sm active bg-primary text-white"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_client"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Client</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Clients Info */}
				<div className="row">
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="p-2 br-10 bg-pink-transparent border border-pink d-flex align-items-center justify-content-center">
												<i className="ti ti-users-group text-pink fs-18"></i>
											</span>
										</div>
										<div>
											<p className="fs-12 fw-medium mb-0 text-gray-5 mb-1">Total Clients</p>
											<h4>300</h4>
										</div>
									</div>
									<span
										className="badge bg-transparent-purple d-inline-flex align-items-center fw-normal">
										<i className="ti ti-arrow-wave-right-down me-1"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="p-2 br-10 bg-success-transparent border border-success d-flex align-items-center justify-content-center">
												<i className="ti ti-user-share fs-18"></i>
											</span>
										</div>
										<div>
											<p className="fs-12 fw-medium mb-0 text-gray-5 mb-1">Active Clients</p>
											<h4>270</h4>
										</div>
									</div>
									<span
										className="badge bg-transparent-primary text-primary d-inline-flex align-items-center fw-normal">
										<i className="ti ti-arrow-wave-right-down me-1"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="p-2 br-10 bg-danger-transparent border border-danger d-flex align-items-center justify-content-center">
												<i className="ti ti-user-pause fs-18"></i>
											</span>
										</div>
										<div>
											<p className="fs-12 fw-medium mb-0 text-gray-5 mb-1">Inactive Clients</p>
											<h4>30</h4>
										</div>
									</div>
									<span
										className="badge bg-transparent-dark text-dark d-inline-flex align-items-center fw-normal">
										<i className="ti ti-arrow-wave-right-down me-1"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div className="d-flex align-items-center">
										<div className="flex-shrink-0 me-2">
											<span
												className="p-2 br-10 bg-info-transparent border border-info d-flex align-items-center justify-content-center">
												<i className="ti ti-user-plus fs-18"></i>
											</span>
										</div>
										<div>
											<p className="fs-12 fw-medium mb-0 text-gray-5 mb-1">New Clients</p>
											<h4>300</h4>
										</div>
									</div>
									<span
										className="badge bg-transparent-secondary text-dark d-inline-flex align-items-center fw-normal">
										<i className="ti ti-arrow-wave-right-down me-1"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Clients Info */}

				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
							<h5>Client Grid</h5>
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

				{/* Clients Grid */}
				<div className="row">
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-39.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Michael Walker</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">CEO</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project : Office Management App</p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-purple" role="progressbar" style={{width: '60%'}}></div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-01.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-02.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-03.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+1
											</a>
										</div>
										<span className="text-purple">60%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">BrightWave Innovations</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-40.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Sophie Headrick</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Manager</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project : Clinic Management </p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-warning" role="progressbar" style={{width: '40%'}}>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-04.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-05.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-06.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+2
											</a>
										</div>
										<span className="text-warning">40%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">Stellar Dynamics</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-41.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Cameron Drake</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Director</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project :Educational Platform</p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-danger" role="progressbar" style={{width: '15%'}}></div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-07.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-08.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-09.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+2
											</a>
										</div>
										<span className="text-danger">15%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">Quantum Nexus</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-42.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Doris Crowley</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Consultant</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project : Navigation and Safety App</p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-pink" role="progressbar" style={{width: '85%'}}></div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-10.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-11.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-12.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+2
											</a>
										</div>
										<span className="text-pink">85%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">EcoVision Enterprises</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-43.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Thomas Bordelon</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Manager</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project : Travel Planning Website</p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-danger" role="progressbar" style={{width: '20%'}}></div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-10.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-11.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-12.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+2
											</a>
										</div>
										<span className="text-danger">20%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">Aurora Technologies</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-45.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Kathleen Gutierrez</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Director</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project : Service Booking Software</p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-success" role="progressbar" style={{width: '95%'}}>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-13.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-14.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-15.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+3
											</a>
										</div>
										<span className="text-success">95%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">BlueSky Ventures</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-46.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Bruce Wright</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">CEO</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project : Hotel Booking App</p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-pink" role="progressbar" style={{width: '78%'}}></div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-16.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-17.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-18.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+3
											</a>
										</div>
										<span className="text-pink">78%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">TerraFusion Energy</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-47.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Estelle Morgan</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Manager</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project :Car & Bike Rental Software</p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-warning" role="progressbar" style={{width: '45%'}}>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-19.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-20.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-21.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+2
											</a>
										</div>
										<span className="text-warning">45%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">UrbanPulse Design</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-48.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Stephen Dias</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">CEO</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project : Food Order App</p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-warning" role="progressbar" style={{width: '35%'}}>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-22.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-23.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-24.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+2
											</a>
										</div>
										<span className="text-warning">35%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">Nimbus Networks</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-43.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Angela Thomas</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Consultant</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project : POS Admin Software</p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-purple" role="progressbar" style={{width: '55%'}}></div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-25.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-26.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-27.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+1
											</a>
										</div>
										<span className="text-purple">55%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">Epicurean Delights</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-49.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Charles Ramos</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">CEO</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project : Chat & Call Mobile App</p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-danger" role="progressbar" style={{width: '25%'}}></div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-28.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-29.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-30.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+1
											</a>
										</div>
										<span className="text-danger">25%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">AlphaTech Solutions</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/client-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-50.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
									</div>
									<div className="dropdown">
										<button className="btn btn-icon btn-sm rounded-circle" type="button"
											data-bs-toggle="dropdown" aria-expanded="false">
											<i className="ti ti-dots-vertical"></i>
										</button>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#edit_client">
													<i className="ti ti-edit me-1"></i>Edit
												</a>
											</li>
											<li>
												<a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
													data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash me-1"></i>Delete</a>
											</li>
										</ul>
									</div>
								</div>
								<div className="text-center mb-3">
									<h6 className="mb-1"><a href="/client-details">Shirley Begaye</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Manager</span>
								</div>
								<div>
									<p className="mb-2 text-truncate">Project : Invoicing & Billing Software</p>
									<div className="progress progress-xs mb-2">
										<div className="progress-bar bg-success" role="progressbar" style={{width: '98%'}}>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-31.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-32.jpg" className="border border-white"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/users/user-33.jpg" className="border border-white"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
												href="#" onClick={(e) => e.preventDefault()}>
												+1
											</a>
										</div>
										<span className="text-success">98%</span>
									</div>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
									<div>
										<p className="mb-1 fs-12">Company</p>
										<h6 className="fw-normal text-truncate">Phoenix Solutions</h6>
									</div>
									<div className="icons-social d-flex align-items-center">
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i
												className="ti ti-message"></i></a>
										<a href="#" className="avatar avatar-rounded avatar-sm bg-light"><i
												className="ti ti-phone"></i></a>
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
				{/* /Clients Grid */}

			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default ClientsGrid;
