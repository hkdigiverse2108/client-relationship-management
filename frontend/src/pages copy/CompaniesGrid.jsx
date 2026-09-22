import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const CompaniesGrid = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Companies"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Companies Grid', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/companies-crm" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/companies-grid"
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_company"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Company</a>
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
							<h5>Companies Grid</h5>
							<div className="dropdown">
								<a href="#" onClick={(e) => e.preventDefault()}
									className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Sort By : Last 7 Days
								</a>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Recently Added</a>
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
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Last 7 Days</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-xl-3 col-lg-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-2">
									<div className="form-check form-check-md">
										<input className="form-check-input" type="checkbox" />
									</div>
									<div>
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-12.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">BrightWave Innovations</a></h6>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-05.jpg"
												alt="img" />
										</span>
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
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-09.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										darlee@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(163) 2459 315
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										Germany
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>4.2</span>
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
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-13.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">Stellar Dynamics</a></h6>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-01.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-02.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-03.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-04.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-05.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										sharon@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(146) 1249 296
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										USA
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>5.0</span>
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
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-14.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">Quantum Nexus</a></h6>
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
											<img className="border border-white" src="/assets/img/profiles/avatar-03.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-04.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-05.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										vaughan@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(158) 3459 596
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										India
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>4.5</span>
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
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-15.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">EcoVision Enterprises</a></h6>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-08.jpg"
												alt="img" />
										</span>
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
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-12.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										jessica@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(135) 3489 516
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										Canada
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>4.5</span>
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
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-16.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">Aurora Technologies</a></h6>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-13.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-14.jpg"
												alt="img" />
										</span>
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
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										carol@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(196) 4862 196
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										China
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>3.0</span>
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
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-17.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">BlueSky Ventures</a></h6>
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
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-21.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-22.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										dawn@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(163) 6498 256
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										Japan
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>5.0</span>
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
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-18.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">TerraFusion Energy</a></h6>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-23.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-24.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-25.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-26.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-27.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										rachel@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(154) 6481 075
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										Indonesia
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>3.5</span>
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
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-19.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">UrbanPulse Design</a></h6>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-28.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-29.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-30.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-01.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-02.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										jonella@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(184) 6348 195
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										Cuba
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>4.5</span>
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
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-20.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">Nimbus Networks</a></h6>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-10.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-11.jpg"
												alt="img" />
										</span>
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
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										jonathan@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(175) 2496 125
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										Israel
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>4.4</span>
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
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-21.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">Epicurean Delights</a></h6>
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
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-18.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-19.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										patricia@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(132) 3145 977
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										Colombia
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>2.7</span>
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
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-22.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">Hermann Groups</a></h6>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-20.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-21.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-22.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-23.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-24.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										patricia@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(132) 3145 977
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										Colombia
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>4.6</span>
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
										<a href="/company-details"
											className="avatar avatar-xl avatar-rounded online border rounded-circle">
											<img src="/assets/img/company/company-23.svg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_company"><i
														className="ti ti-edit me-1"></i>Edit</a>
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
									<h6 className="mb-1"><a href="/company-details">Beacon Softwares</a></h6>
									<div className="avatar-list-stacked avatar-group-sm">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-25.jpg"
												alt="img" />
										</span>
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
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-29.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										gloria@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(134) 7589 6348
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										Brazil
									</p>
								</div>
								<div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
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
									<span className="d-inline-flex align-items-center"><i
											className="ti ti-star-filled text-warning me-1"></i>4.2</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="text-center mb-4">
					<a href="#" className="btn btn-white border"><i className="ti ti-loader-3 text-primary me-2"></i>Load
						More</a>
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

export default CompaniesGrid;
