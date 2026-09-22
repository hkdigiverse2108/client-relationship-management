import React from 'react';
import { Link } from 'react-router-dom';
import CustomSelect from '../components/common/CustomSelect';

const JobGrid2 = () => {
  return (
    <>
      <div className="main-wrapper">

		<header className="header header-two">
			<div className="container">
				<div className="d-flex align-items-center justify-content-between">
					<div>
						<a href="/" className="logo">
							<img src="/assets/img/logo.svg" alt="Logo" />
						</a>
						<a href="/" className="dark-logo">
							<img src="/assets/img/logo-white.svg" alt="Logo" />
						</a>
					</div>
					<div className="d-flex align-items-center">
						<a href="/login" className="btn btn-dark d-inline-flex align-items-center me-2"><i
								className="ti ti-lock me-1"></i>Log in</a>
						<a href="/register" className="btn btn-primary d-inline-flex align-items-center"><i
								className="ti ti-user-circle me-1"></i>Register</a>
					</div>
				</div>
			</div>
		</header>

		{/* Page Wrapper */}
		<div className="page-wrapper job-wrapper ms-0">
			<div className="content px-0">
				<div className="container">
					<div className="row">
						<div className="col-xxl-3 col-lg-4 theiaStickySidebar">
							<div className="card shadow-none">
								<div className="card-body">
									<div
										className="d-flex align-items-center justify-content-between border-bottom mb-3 pb-3">
										<h5>Filter</h5>
										<a href="#" className="text-danger">Reset</a>
									</div>
									<div className="input-icon position-relative mb-3">
										<span className="input-icon-addon">
											<i className="ti ti-map-pin-search"></i>
										</span>
										<input type="text" className="form-control" placeholder="Location" />
									</div>
									<div className="accordion todo-accordion" id="accordionExample">
										<div className="accordion-item pb-3 mb-3 border-bottom">
											
											<div id="collapseTwo" className="accordion-collapse collapse show"
												aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
												<div className="accordion-body pt-3 mt-3">
													<div className="filter-range">
														<input type="text" id="range_03" />
													</div>
												</div>
											</div>
										</div>
										<div className="accordion-item pb-3 mb-3 border-bottom">
											
											<div id="collapseThree" className="accordion-collapse collapse"
												aria-labelledby="headingThree" data-bs-parent="#accordionExample">
												<div className="accordion-body pt-3">
													<div className="d-flex align-items-center justify-content-between mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm2" checked="" />
															<label className="form-check-label" htmlFor="checkebox-sm2">
																All
															</label>
														</div>
														<span className="badge badge-dark-transparent">300</span>
													</div>
													<div className="d-flex align-items-center justify-content-between mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm3" />
															<label className="form-check-label" htmlFor="checkebox-sm3">
																Full time
															</label>
														</div>
														<span className="badge badge-dark-transparent">120</span>
													</div>
													<div className="d-flex align-items-center justify-content-between mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm4" />
															<label className="form-check-label" htmlFor="checkebox-sm4">
																Part Time
															</label>
														</div>
														<span className="badge badge-dark-transparent">80</span>
													</div>
													<div className="d-flex align-items-center justify-content-between mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm5" />
															<label className="form-check-label" htmlFor="checkebox-sm5">
																Freelance
															</label>
														</div>
														<span className="badge badge-dark-transparent">30</span>
													</div>
													<div className="d-flex align-items-center justify-content-between mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm6" />
															<label className="form-check-label" htmlFor="checkebox-sm6">
																Internship
															</label>
														</div>
														<span className="badge badge-dark-transparent">20</span>
													</div>
													<div className="d-flex align-items-center justify-content-between mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm7" />
															<label className="form-check-label" htmlFor="checkebox-sm7">
																Contract
															</label>
														</div>
														<span className="badge badge-dark-transparent">30</span>
													</div>
													<div className="d-flex align-items-center justify-content-between">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm8" />
															<label className="form-check-label" htmlFor="checkebox-sm8">
																Volunteer
															</label>
														</div>
														<span className="badge badge-dark-transparent">20</span>
													</div>
												</div>
											</div>
										</div>
										<div className="accordion-item pb-3 mb-3 border-bottom">
											
											<div id="collapseFour" className="accordion-collapse collapse"
												aria-labelledby="headingFour" data-bs-parent="#accordionExample">
												<div className="accordion-body pt-3">
													<div className="mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm9" />
															<label className="form-check-label" htmlFor="checkebox-sm9">
																Below 1 year
															</label>
														</div>
													</div>
													<div className="mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm10" />
															<label className="form-check-label" htmlFor="checkebox-sm10">
																1 - 3 years
															</label>
														</div>
													</div>
													<div className="mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm11" />
															<label className="form-check-label" htmlFor="checkebox-sm11">
																3 - 5 years
															</label>
														</div>
													</div>
													<div className="mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm12" />
															<label className="form-check-label" htmlFor="checkebox-sm12">
																5 - 10 years
															</label>
														</div>
													</div>
													<div>
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm13" />
															<label className="form-check-label" htmlFor="checkebox-sm13">
																More than 10 years
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="accordion-item pb-3 mb-3 border-bottom">
											
											<div id="collapseFive" className="accordion-collapse collapse"
												aria-labelledby="headingFive" data-bs-parent="#accordionExample">
												<div className="accordion-body pt-3">
													<div className="mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm14" />
															<label className="form-check-label" htmlFor="checkebox-sm14">
																On Site
															</label>
														</div>
													</div>
													<div className="mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm15" />
															<label className="form-check-label" htmlFor="checkebox-sm15">
																Remote
															</label>
														</div>
													</div>
													<div>
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm16" />
															<label className="form-check-label" htmlFor="checkebox-sm16">
																Hybrid
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="accordion-item mb-0">
											
											<div id="collapseSix" className="accordion-collapse collapse"
												aria-labelledby="headingFive" data-bs-parent="#accordionExample">
												<div className="accordion-body pt-3">
													<div className="mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm17" />
															<label className="form-check-label" htmlFor="checkebox-sm17">
																Entry Level
															</label>
														</div>
													</div>
													<div className="mb-2">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm18" />
															<label className="form-check-label" htmlFor="checkebox-sm18">
																Mid Level
															</label>
														</div>
													</div>
													<div>
														<div className="form-check">
															<input className="form-check-input" type="checkbox" value=""
																id="checkebox-sm19" />
															<label className="form-check-label" htmlFor="checkebox-sm19">
																Expert
															</label>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xxl-9 col-lg-8">
							<div className="card">
								<div className="card-body p-3">
									<div className="row g-3">
										<div className="col-md-3">
											<div>
												<div className="custom-select-wrapper"><CustomSelect className="select">
													<option>Category</option>
													<option>Software</option>
												</CustomSelect></div>
											</div>
										</div>
										<div className="col-md-9">
											<div className="d-flex align-items-center">
												<div className="flex-fill me-3">
													<input type="text" className="form-control" placeholder="Search" />
												</div>
												<div>
													<a href="#" className="btn btn-primary">Search</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								className="d-md-flex d-block align-items-center justify-content-between border-bottom pb-1 mb-3">
								<div className="mb-2">
									<h5>Total Jobs (68)</h5>
								</div>
								<div className="d-flex right-content align-items-center flex-wrap">

									<div className="me-2 mb-2">
										<div
											className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
											<a href="/job-list-2" className="btn btn-icon btn-sm me-1"><i
													className="ti ti-list-tree"></i></a>
											<a href="/job-grid-2"
												className="btn btn-icon btn-sm active bg-dark text-white"><i
													className="ti ti-layout-grid"></i></a>
										</div>
									</div>
									<div className="dropdown mb-2">
										<a href="#" onClick={(e) => e.preventDefault()}
											className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											Sort By : Newly Post
										</a>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Newly
													Post</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Last
													Month</a>
											</li>
											<li>
												<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Last 7
													Days</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray"><img
																	src="/assets/img/icons/apple.svg"
																	className="w-auto h-auto" alt="icon" /></span>
														</a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">Senior IOS Developer</a>
															</h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray"><img
																	src="/assets/img/icons/php.svg" className="w-auto h-auto"
																	alt="icon" /></span></a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">Junior PHP Developer</a>
															</h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray"><img
																	src="/assets/img/icons/black.svg"
																	className="w-auto h-auto" alt="icon" /></span></a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">Network Engineer</a></h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray"><img
																	src="/assets/img/icons/react.svg"
																	className="w-auto h-auto" alt="icon" /></span></a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">React Developer </a></h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray"><img
																	src="/assets/img/icons/laravel.svg"
																	className="w-auto h-auto" alt="icon" /></span></a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">Laravel Developer</a></h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray"><img
																	src="/assets/img/icons/devops.svg"
																	className="w-auto h-auto" alt="icon" /></span></a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">DevOps Engineer</a></h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray"><img
																	src="/assets/img/icons/android.svg"
																	className="w-auto h-auto" alt="icon" /></span></a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">Android Developer</a></h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray"><img
																	src="/assets/img/icons/html.svg"
																	className="w-auto h-auto" alt="icon" /></span></a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">HTML Developer</a></h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray"><img
																	src="/assets/img/icons/ui.svg" className="w-auto h-auto"
																	alt="icon" /></span></a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">UI/UX Designer</a></h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray"><img
																	src="/assets/img/icons/grafic.svg"
																	className="w-auto h-auto" alt="icon" /></span></a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">Senior IOS Developer</a>
															</h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray"><img
																	src="/assets/img/icons/angular.svg"
																	className="w-auto h-auto" alt="icon" /></span></a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">Angular Developer</a></h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xxl-4 col-md-6">
									<div className="card">
										<div className="card-body">
											<div className="card bg-light">
												<div className="card-body p-3">
													<div className="d-flex align-items-center">
														<a href="/job-details" className="me-2">
															<span className="avatar avatar-lg bg-gray-100"><img
																	src="/assets/img/icons/nodejs.svg"
																	className="w-auto h-auto" alt="icon" /></span></a>
														<div>
															<h6 className="fw-medium mb-1 text-truncate"><a
																	href="/job-details">Node js Developer</a></h6>
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
												<span className="badge badge-pink-transparent me-1">Full Time</span>
												<span className="badge bg-secondary-transparent">Expert</span>
											</div>
											<div className="progress progress-xs mb-2">
												<div className="progress-bar bg-warning" role="progressbar"
													style={{width: '30%'}}></div>
											</div>
											<div>
												<p className="fs-12 text-gray fw-normal">10 of 25 filled</p>
											</div>
											<div
												className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
												<p className="d-inline-flex align-items-center text-gray-9 mb-0">
													<i className="ti ti-clock me-1"></i>10 hours ago
												</p>
												<div>
													<a href="#" className="btn btn-secondary" data-bs-toggle="modal"
														data-bs-target="#apply_job">Apply Now </a>
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
};

export default JobGrid2;
