import React from 'react';
import { Link } from 'react-router-dom';

const JobDetails = () => {
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
			<div className="breadcrumb position-relative bg-secondary py-5">
				<div className="my-5"></div>
				<div className="breadcrumb-bg">
					<span><img src="/assets/img/bg/job-bg-01.png" className="job-bg-01" alt="Img" /></span>
					<span><img src="/assets/img/bg/job-bg-02.png" className="job-bg-02" alt="Img" /></span>
					<span><img src="/assets/img/bg/job-bg-03.png" className="job-bg-03" alt="Img" /></span>
					<span><img src="/assets/img/bg/job-bg-04.png" className="job-bg-04" alt="Img" /></span>
				</div>
			</div>
			<div className="content px-0">
				<div className="container">
					<div className="card card-translate-top">
						<div className="card-body">
							<div className="row align-items-center">
								<div className="col-xl-9 col-md-8">
									<div className="d-flex align-items-center mb-3">
										<a href="#" className="me-2">
											<span className="avatar avatar-lg bg-gray"><img src="/assets/img/icons/apple.svg"
													className="w-auto h-auto" alt="icon" /></span>
										</a>
										<div>
											<h2 className="fw-medium mb-1 text-truncate">Senior IOS Developer</h2>
											<p
												className="text-dark d-inline-flex align-items-center mb-0 me-2 pe-2 border-end">
												<i className="ti ti-user-check text-gray-5 me-2"></i>
												25 Applicants
											</p>
											<p className="text-dark d-inline-flex align-items-center mb-0">
												<i className="ti ti-briefcase text-gray-5 me-2"></i>
												10 hours ago
											</p>
										</div>
									</div>
								</div>
								<div className="col-xl-3 col-md-4">
									<div className="d-flex align-items-center justify-content-end mb-3">
										<p className="mb-0 me-3">Application End Date</p>
										<span className="badge bg-primary-transparent">05 Sep 2024</span>
									</div>
								</div>
							</div>
							<div className="row align-items-center">
								<div className="col-xl-9 col-md-8">
									<div className="d-flex align-items-center flex-wrap row-gap-2">
										<p className="text-dark d-inline-flex align-items-center mb-0 me-2 pe-2 border-end">
											<i className="ti ti-map-pin-check text-gray-5 me-2"></i>
											New York, USA
										</p>
										<p className="text-dark d-inline-flex align-items-center mb-0 me-2 pe-2 border-end">
											<i className="ti ti-currency-dollar text-gray-5 me-2"></i>
											30, 000 - 35, 000 / month
										</p>
										<p className="text-dark d-inline-flex align-items-center">
											<i className="ti ti-briefcase text-gray-5 me-2"></i>
											2 years of experience
										</p>
									</div>
								</div>
								<div className="col-xl-3 col-md-4">
									<div className="d-flex align-items-center justify-content-end">
										<a href="#" className="btn btn-secondary flex-fill me-2">Apply</a>
										<a href="#" className="btn btn-icon bg-transparent-dark"><i
												className="ti ti-star"></i></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-8">
							<div className="card">
								<div className="card-body">
									<div className="border-bottom pb-3 mb-3">
										<h4>Job Overview</h4>
									</div>
									<div className="row gy-4">
										<div className="col-xl-3 col-md-4 col-sm-6">
											<div className="d-flex align-items-center">
												<span
													className="avatar avatar-lg bg-primary-transparent flex-shrink-0 me-2">
													<i className="ti ti-calendar fs-24"></i>
												</span>
												<div>
													<h6 className="mb-1 fw-medium">Date Posted</h6>
													<p>30 Aug 2024</p>
												</div>
											</div>
										</div>
										<div className="col-xl-3 col-md-4 col-sm-6">
											<div className="d-flex align-items-center">
												<span
													className="avatar avatar-lg bg-primary-transparent flex-shrink-0 me-2">
													<i className="ti ti-calendar fs-24"></i>
												</span>
												<div>
													<h6 className="mb-1 fw-medium">Expiration Date</h6>
													<p>30 Aug 2024</p>
												</div>
											</div>
										</div>
										<div className="col-xl-3 col-md-4 col-sm-6">
											<div className="d-flex align-items-center">
												<span
													className="avatar avatar-lg bg-primary-transparent flex-shrink-0 me-2">
													<i className="ti ti-calendar fs-24"></i>
												</span>
												<div>
													<h6 className="mb-1 fw-medium">Location</h6>
													<p>London, UK</p>
												</div>
											</div>
										</div>
										<div className="col-xl-3 col-md-4 col-sm-6">
											<div className="d-flex align-items-center">
												<span
													className="avatar avatar-lg bg-primary-transparent flex-shrink-0 me-2">
													<i className="ti ti-calendar fs-24"></i>
												</span>
												<div>
													<h6 className="mb-1 fw-medium">Job Title</h6>
													<p>IOS Developer</p>
												</div>
											</div>
										</div>
										<div className="col-xl-3 col-md-4 col-sm-6">
											<div className="d-flex align-items-center">
												<span
													className="avatar avatar-lg bg-primary-transparent flex-shrink-0 me-2">
													<i className="ti ti-calendar fs-24"></i>
												</span>
												<div>
													<h6 className="mb-1 fw-medium">Hours</h6>
													<p>48 hours / week</p>
												</div>
											</div>
										</div>
										<div className="col-xl-3 col-md-4 col-sm-6">
											<div className="d-flex align-items-center">
												<span
													className="avatar avatar-lg bg-primary-transparent flex-shrink-0 me-2">
													<i className="ti ti-calendar fs-24"></i>
												</span>
												<div>
													<h6 className="mb-1 fw-medium">Date Posted</h6>
													<p>30 Aug 2024</p>
												</div>
											</div>
										</div>
										<div className="col-xl-3 col-md-4 col-sm-6">
											<div className="d-flex align-items-center">
												<span
													className="avatar avatar-lg bg-primary-transparent flex-shrink-0 me-2">
													<i className="ti ti-calendar fs-24"></i>
												</span>
												<div>
													<h6 className="mb-1 fw-medium">Date Posted</h6>
													<p>30 Aug 2024</p>
												</div>
											</div>
										</div>
										<div className="col-xl-3 col-md-4 col-sm-6">
											<div className="d-flex align-items-center">
												<span
													className="avatar avatar-lg bg-primary-transparent flex-shrink-0 me-2">
													<i className="ti ti-calendar fs-24"></i>
												</span>
												<div>
													<h6 className="mb-1 fw-medium">Date Posted</h6>
													<p>30 Aug 2024</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<div className="border-bottom pb-3 mb-3">
										<h4>Job Description</h4>
									</div>
									<p>
										We are seeking a skilled and experienced Senior iOS Developer to lead the
										design,
										development, and maintenance of our iOS applications. You will work closely with
										cross-functional teams
										to deliver high-quality, scalable, and user-friendly mobile applications.
									</p>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<div className="border-bottom pb-3 mb-3">
										<h4>Responsibilities</h4>
									</div>
									<ul>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Design and build advanced applications for the iOS platform
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Collaborate with cross-functional teams (designers, backend developers, QA)
											to define, design, and ship new features.
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Ensure the performance, quality, and responsiveness of applications.
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Identify and fix bugs and performance bottlenecks.
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Stay up-to-date with the latest iOS development trends and best practices.
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Conduct code reviews to ensure adherence to industry standards and best
											practices.
										</li>
										<li className="d-flex align-items-center">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Mentor junior developers and provide technical guidance.
										</li>
									</ul>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<div className="border-bottom pb-3 mb-3">
										<h4>Requirements</h4>
									</div>
									<ul>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Proven experience (5+ years) as an iOS developer
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Strong proficiency in Swift, Objective-C, and the iOS SDK.
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Experience with iOS frameworks such as Core Data, Core Animation, and Core
											Graphics.
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Familiarity with RESTful APIs to connect iOS applications to back-end
											services.
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Experience with unit testing, code reviews, and version control (e.g., Git).
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Strong understanding of Apple’s design principles and interface guidelines.
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Experience with Agile methodologies and CI/CD pipelines.
										</li>
										<li className="d-flex align-items-center mb-2">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Good communication skills and ability to work in a team environment.
										</li>
										<li className="d-flex align-items-center">
											<img src="/assets/img/icons/polygon-icon.svg" className="me-1" alt="Img" />
											Experience with App Store deployment and ongoing maintenance of released
											apps.
										</li>
									</ul>
								</div>
							</div>
							<div className="d-flex align-items-center mb-4">
								<h5 className="me-3">Share this job</h5>
								<div className="d-flex align-items-center">
									<a href="#" className="btn border btn-light-500 me-3"><img
											src="/assets/img/social/google.svg" alt="Img" /></a>
									<a href="#" className="btn border btn-light-500 me-3"><img
											src="/assets/img/social/facebook.svg" alt="Img" /></a>
									<a href="#" className="btn border btn-light-500 me-3"><img
											src="/assets/img/social/twitter.svg" alt="Img" /></a>
								</div>
							</div>
						</div>
						<div className="col-lg-4 theiaStickySidebar">
							<div className="card">
								<div className="card-body">
									<div className="border-bottom pb-3 mb-3">
										<h4>Comapany Overview</h4>
									</div>
									<div className="card bg-light mb-3">
										<div className="card-body p-3">
											<div className="d-flex align-items-center">
												<a href="#" className="me-2">
													<span className="avatar avatar-lg bg-gray-100"><img
															src="/assets/img/icons/apple.svg" className="w-auto h-auto"
															alt="icon" /></span>
												</a>
												<div>
													<h6 className="fw-medium mb-1 text-truncate"><a href="#">Senior IOS
															Developer</a></h6>
													<a href="#" className="text-info">https://dreamstechnologies.com</a>
												</div>
											</div>
										</div>
									</div>
									<div>
										<div className="d-flex align-items-center justify-content-between mb-2">
											<span>Primary Industry</span>
											<p className="text-gray-7">Software </p>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-2">
											<span>Founded in</span>
											<p className="text-gray-7">2014</p>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-2">
											<span>Phone</span>
											<p className="text-gray-7">+91 6789542132</p>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-2">
											<span>Email</span>
											<a href="#" className="text-info">business@example.com</a>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-2">
											<span>Location</span>
											<p className="text-gray-7">Location</p>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-2">
											<span>Social media</span>
											<div className="icons-social d-flex align-items-center">
												<a href="#" className="avatar avatar-rounded avatar-sm me-1"><i
														className="ti ti-mail"></i></a>
												<a href="#" className="avatar avatar-rounded avatar-sm me-1"><i
														className="ti ti-phone-call"></i></a>
												<a href="#" className="avatar avatar-rounded avatar-sm me-1"><i
														className="ti ti-message-2"></i></a>
												<a href="#" className="avatar avatar-rounded avatar-sm me-1"><i
														className="ti ti-brand-skype"></i></a>
												<a href="#" className="avatar avatar-rounded avatar-sm"><i
														className="ti ti-brand-facebook"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<div className="border-bottom pb-3 mb-3">
										<h4>Contact Us</h4>
									</div>
									<form onSubmit={(e) => e.preventDefault()}>
										<div className="mb-3">
											<label className="form-label">Name</label>
											<input type="text" className="form-control" />
										</div>
										<div className="mb-3">
											<label className="form-label">Email Address</label>
											<input type="text" className="form-control" />
										</div>
										<div className="mb-3">
											<label className="form-label">Message</label>
											<textarea className="form-control" rows="3"></textarea>
										</div>
										<button type="submit"
											className="btn btn-primary d-flex align-items-center justify-content-center w-100">Send
											Message<i className="ti ti-send ms-1"></i></button>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h4 className="mb-3">Related Posts</h4>
						<div className="row">
							<div className="col-xxl-3 col-lg-4 col-md-6">
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
														<h6 className="fw-medium mb-1 text-truncate"><a href="#">React
																Developer </a></h6>
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
											<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}>
											</div>
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
							<div className="col-xxl-3 col-lg-4 col-md-6">
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
											<span className="badge badge-pink-transparent me-1">Full Time</span>
											<span className="badge bg-secondary-transparent">Expert</span>
										</div>
										<div className="progress progress-xs mb-2">
											<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}>
											</div>
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
							<div className="col-xxl-3 col-lg-4 col-md-6">
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
														<h6 className="fw-medium mb-1 text-truncate"><a href="#">DevOps
																Engineer</a></h6>
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
											<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}>
											</div>
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
							<div className="col-xxl-3 col-lg-4 col-md-6">
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
											<span className="badge badge-pink-transparent me-1">Full Time</span>
											<span className="badge bg-secondary-transparent">Expert</span>
										</div>
										<div className="progress progress-xs mb-2">
											<div className="progress-bar bg-warning" role="progressbar" style={{width: '30%'}}>
											</div>
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
    </>
  );
};

export default JobDetails;
