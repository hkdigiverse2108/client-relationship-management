import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const JobGrid = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Jobs"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Recruitment' },
						{ label: 'Jobs', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/job-list" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/job-grid" className="btn btn-icon btn-sm active bg-primary text-white"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_post"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Post Job</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between">
							<h5>Job Grid</h5>
							<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
								<div className="me-3">
									<div className="input-icon position-relative">
										<span className="input-icon-addon">
											<i className="ti ti-calendar text-gray-9"></i>
										</span>
										<input type="text" className="form-control date-range bookingrange"
											placeholder="dd/mm/yyyy - dd/mm/yyyy" />
									</div>
								</div>
								<div className="dropdown me-3">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Role
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Senior IOS
												Developer</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Junior PHP
												Developer</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Network
												Engineer</a>
										</li>
									</ul>
								</div>
								<div className="dropdown me-3">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Status
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
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

				<div className="row">
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray"><img
														src="/assets/img/icons/apple.svg" className="w-auto h-auto"
														alt="icon" /></span>
											</a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">Senior IOS
														Developer</a></h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										New York, USA
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										30, 000 - 35, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										2 years of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray"><img
														src="/assets/img/icons/php.svg" className="w-auto h-auto"
														alt="icon" /></span></a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">Junior PHP
														Developer</a></h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										Los Angeles, USA
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										20, 000 - 25, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										4 years of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray"><img
														src="/assets/img/icons/black.svg" className="w-auto h-auto"
														alt="icon" /></span></a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">Network
														Engineer</a></h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										Bristol, UK
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										30, 000 - 35, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										1 year of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray"><img
														src="/assets/img/icons/react.svg" className="w-auto h-auto"
														alt="icon" /></span></a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">React Developer
													</a></h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										Birmingham, UK
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										28, 000 - 32, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										3 years of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray"><img
														src="/assets/img/icons/laravel.svg" className="w-auto h-auto"
														alt="icon" /></span></a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">Laravel
														Developer</a></h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										Washington, USA
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										32, 000 - 36, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										1 years of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray"><img
														src="/assets/img/icons/devops.svg" className="w-auto h-auto"
														alt="icon" /></span></a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">DevOps Engineer</a>
												</h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										Coventry, UK
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										25, 000 - 35, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										6 years of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray"><img
														src="/assets/img/icons/android.svg" className="w-auto h-auto"
														alt="icon" /></span></a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">Android
														Developer</a></h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										Chicago, USA
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										28, 000 - 32, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										5 years of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray"><img
														src="/assets/img/icons/html.svg" className="w-auto h-auto"
														alt="icon" /></span></a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">HTML Developer</a>
												</h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										Carlisle, UK
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										25, 000 - 28, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										3 years of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray"><img
														src="/assets/img/icons/ui.svg" className="w-auto h-auto"
														alt="icon" /></span></a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">UI/UX Designer</a>
												</h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										UI/UX Designer
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										20, 000 - 25, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										4 years of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray"><img
														src="/assets/img/icons/grafic.svg" className="w-auto h-auto"
														alt="icon" /></span></a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">Senior IOS
														Developer</a></h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										San Diego, USA
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										22, 000 - 28, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										3 years of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray"><img
														src="/assets/img/icons/angular.svg" className="w-auto h-auto"
														alt="icon" /></span></a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">Angular
														Developer</a></h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										Sheffield, UK
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										28, 000 - 30, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										2 years of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="card bg-light">
									<div className="card-body p-3">
										<div className="d-flex align-items-center">
											<a href="#" className="me-2">
												<span className="avatar avatar-lg bg-gray-100"><img
														src="/assets/img/icons/nodejs.svg" className="w-auto h-auto"
														alt="icon" /></span></a>
											<div>
												<h6 className="fw-medium mb-1 text-truncate"><a href="#">Node js
														Developer</a></h6>
												<p className="fs-12 text-gray fw-normal">25 Applicants</p>
											</div>
										</div>
									</div>
								</div>
								<div className="d-flex flex-column mb-3">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
										Boston, USA
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
										25, 000 - 28, 000 / month
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-briefcase text-gray-5 me-2"></i>
										3 years of experience
									</p>

								</div>
								<div className="mb-3">
									<span className="badge badge-pink-transparent me-2">Full Time</span>
									<span className="badge bg-secondary-transparent">Expert</span>
								</div>
								<div className="progress progress-xs mb-2">
									<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}></div>
								</div>
								<div>
									<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
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

export default JobGrid;
