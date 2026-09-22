import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const EmployeesGrid = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Employees Grid"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Employees' },
						{ label: 'Employees Grid', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/employees" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/employees-grid"
									className="btn btn-icon btn-sm active bg-primary text-white"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_employee"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Employee</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">

					{/* Total Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-dark rounded-circle"><i
												className="ti ti-users"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">Total Employee</p>
										<h4>1007</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-purple badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Total Plans */}

					{/* Total Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-success rounded-circle"><i
												className="ti ti-user-share"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">Active</p>
										<h4>1007</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-primary badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Total Plans */}

					{/* Inactive Plans */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-danger rounded-circle"><i
												className="ti ti-user-pause"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">InActive</p>
										<h4>1007</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-dark badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /Inactive Companies */}

					{/* No of Plans  */}
					<div className="col-lg-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center overflow-hidden">
									<div>
										<span className="avatar avatar-lg bg-info rounded-circle"><i
												className="ti ti-user-plus"></i></span>
									</div>
									<div className="ms-2 overflow-hidden">
										<p className="fs-12 fw-medium mb-1 text-truncate">New Joiners</p>
										<h4>67</h4>
									</div>
								</div>
								<div>
									<span className="badge badge-soft-secondary badge-sm fw-normal">
										<i className="ti ti-arrow-wave-right-down"></i>
										+19.01%
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /No of Plans */}

				</div>
				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
							<h5>Employees Grid</h5>
							<div className="d-flex align-items-center flex-wrap row-gap-3">
								<div className="dropdown me-3">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Designation
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Finance</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Developer</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Executive</a>
										</li>
									</ul>
								</div>
								<div className="dropdown">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-32.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Anthony Lewis</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Software Developer</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">20</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">13</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">7</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-purple"> 65%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-purple" role="progressbar" style={{width: '65%'}}></div>
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-09.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Brian Villalobos</a></h6>
									<span className="badge badge-purple-transparent fs-10 fw-medium">Developer</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">30</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">10</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">20</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-warning"> 30%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-01.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Harvey Smith</a></h6>
									<span className="badge badge-purple-transparent fs-10 fw-medium">Developer</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">25</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">7</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">18</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-danger"> 20%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-danger" role="progressbar" style={{width: '20%'}}></div>
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-33.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Stephan Peralt</a></h6>
									<span className="badge badge-dark-transparent fs-10 fw-medium">Software Developer</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">15</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">13</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">2</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-success"> 90%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-success" role="progressbar" style={{width: '90%'}}></div>
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-34.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Doglas Martini</a></h6>
									<span className="badge badge-secondary-transparent fs-10 fw-medium">Full Stack
										Developer</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">15</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">2</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">13</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-danger"> 10%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-danger" role="progressbar" style={{width: '10%'}}></div>
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-02.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Linda Ray</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Software Developer</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">20</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">10</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">10</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-purple"> 50%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-purple" role="progressbar" style={{width: '50%'}}></div>
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-35.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Elliot Murray</a></h6>
									<span className="badge badge-purple-transparent fs-10 fw-medium">Developer</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">40</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">35</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">5</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-success"> 93%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-success" role="progressbar" style={{width: '93%'}}></div>
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-36.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Rebecca Smtih</a></h6>
									<span className="badge badge-soft-skyblue fs-10 fw-medium">Tester</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">30</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">22</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">8</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-pink"> 80%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-pink" role="progressbar" style={{width: '80%'}}></div>
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-37.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Connie Waters</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Software Developer</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">25</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">11</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">14</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-warning"> 35%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '35%'}}></div>
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-38.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Lori Broaddus</a></h6>
									<span className="badge badge-secondary-transparent fs-10 fw-medium">Full Stack
										Developer</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">40</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">27</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">16</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-pink"> 75%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-pink" role="progressbar" style={{width: '75%'}}></div>
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-30.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Trent Frazier</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Software Developer</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">30</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">17</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">13</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-purple"> 60%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-purple" role="progressbar" style={{width: '60%'}}></div>
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
										<a href="/employee-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-31.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_employee">
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
									<h6 className="mb-1"><a href="/employee-details">Norene Valle</a></h6>
									<span className="badge bg-danger-transparent fs-10 fw-medium">Trainee</span>
								</div>
								<div className="row text-center">
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Projects</span>
											<h6 className="fw-medium">10</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Done</span>
											<h6 className="fw-medium">1</h6>
										</div>
									</div>
									<div className="col-4">
										<div className="mb-3">
											<span className="fs-12">Progress</span>
											<h6 className="fw-medium">9</h6>
										</div>
									</div>
								</div>
								<p className="mb-2 text-center">Productivity : <span className="text-danger"> 10%</span></p>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-danger" role="progressbar" style={{width: '10%'}}></div>
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

export default EmployeesGrid;
