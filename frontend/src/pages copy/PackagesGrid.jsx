import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const PackagesGrid = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Packages"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Super Admin' },
						{ label: 'Packages Grid', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/packages" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/packages-grid" className="btn btn-icon btn-sm bg-primary text-white active"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_plans"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Plan</a>
						</div>
						<div className="ms-2 head-icons">
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
										<p className="fs-12 fw-medium mb-1 text-truncate">Total Plans</p>
										<h4>08</h4>
									</div>
								</div>
								<div>
									<span className="avatar avatar-lg bg-primary flex-shrink-0">
										<i className="ti ti-box fs-16"></i>
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
										<p className="fs-12 fw-medium mb-1 text-truncate">Active Plans</p>
										<h4>08</h4>
									</div>
								</div>
								<div>
									<span className="avatar avatar-lg bg-success flex-shrink-0">
										<i className="ti ti-activity-heartbeat fs-16"></i>
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
										<p className="fs-12 fw-medium mb-1 text-truncate">Inactive Plans</p>
										<h4>0</h4>
									</div>
								</div>
								<div>
									<span className="avatar avatar-lg bg-danger flex-shrink-0">
										<i className="ti ti-player-pause fs-16"></i>
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
										<p className="fs-12 fw-medium mb-1 text-truncate">No of Plan Types</p>
										<h4>02</h4>
									</div>
								</div>
								<div>
									<span className="avatar avatar-lg bg-skyblue flex-shrink-0">
										<i className="ti ti-mask fs-16"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
					{/* /No of Plans */}

				</div>

				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between">
							<h5>Plans List</h5>
							<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
								<div className="dropdown me-3">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Select Plan
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Basic</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Advanced</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Premium</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Enterprise</a>
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

				<div className="card">
					<div className="card-body">
						<div className="d-flex justify-content-center align-items-center mb-4">
							<p className="mb-0 me-2">Monthly</p>
							<div className="form-check form-switch">
								<input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
							</div>
							<p>Yearly</p>
						</div>
						<div className="row justify-content-center">
							<div className="col-lg-3 col-md-6 col-sm-12 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="card">
											<div className="card-body">
												<h4>Basic</h4>
												<h1>$50<span className="fs-14 fw-normal text-gray">/monthly</span></h1>
											</div>
										</div>
										<div className="pricing-content rounded bg-light mb-3">
											<div className="price-hdr">
												<h6 className="fs-14 fw-medium text-gray w-100">Features Includes</h6>
											</div>
											<div>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>10
													Employees</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>50
													Projects</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>50
													Clients</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>50 GB
													Storage</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-circle-x-filled text-danger me-2"></i>Voice & Video
													Chat</span>
												<span className="text-dark d-flex align-items-center"><i
														className="ti ti-circle-x-filled text-danger me-2"></i>CRM</span>
											</div>
										</div>
										<a href="#" className="btn btn-dark w-100">Choose Plan</a>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-12 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="card">
											<div className="card-body">
												<h4>Advanced</h4>
												<h1>$200<span className="fs-14 fw-normal text-gray">/monthly</span></h1>
											</div>
										</div>
										<div className="pricing-content rounded bg-light mb-3">
											<div className="price-hdr">
												<h6 className="fs-14 fw-medium text-gray w-100">Features Includes</h6>
											</div>
											<div>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>50
													Employees</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>100
													Projects</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>100
													Clients</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>50 GB
													Storage</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>Voice
													& Video Chat</span>
												<span className="text-dark d-flex align-items-center"><i
														className="ti ti-circle-x-filled text-danger me-2"></i>CRM</span>
											</div>
										</div>
										<a href="#" className="btn btn-dark w-100">Choose Plan</a>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-12 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="card">
											<div className="card-body">
												<h4>Premium</h4>
												<h1>$300<span className="fs-14 fw-normal text-gray">/monthly</span></h1>
											</div>
										</div>
										<div className="pricing-content rounded bg-light mb-3">
											<div className="price-hdr">
												<h6 className="fs-14 fw-medium text-gray w-100">Features Includes</h6>
											</div>
											<div>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>100
													Employees</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>200
													Projects</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>100
													Clients</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>100 GB
													Storage</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>Voice
													& Video Chat</span>
												<span className="text-dark d-flex align-items-center"><i
														className="ti ti-circle-x-filled text-danger me-2"></i>CRM</span>
											</div>
										</div>
										<a href="#" className="btn btn-dark w-100">Choose Plan</a>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-md-6 col-sm-12 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="card">
											<div className="card-body">
												<h4>Enterprise</h4>
												<h1>$400<span className="fs-14 fw-normal text-gray">/monthly</span></h1>
											</div>
										</div>
										<div className="pricing-content rounded bg-light mb-3">
											<div className="price-hdr">
												<h6 className="fs-14 fw-medium text-gray w-100">Features Includes</h6>
											</div>
											<div>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>Unlimited
													Employees</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>Unlimited
													Clients</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>Unlimited
													Projects</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>Unlimited
													Storage</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>Voice
													& Video Chat</span>
												<span className="text-dark d-flex align-items-center"><i
														className="ti ti-discount-check-filled text-success me-2"></i>CRM</span>
											</div>
										</div>
										<a href="#" className="btn btn-dark w-100">Choose Plan</a>
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

export default PackagesGrid;
