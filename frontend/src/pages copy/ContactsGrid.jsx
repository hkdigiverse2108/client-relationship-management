import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const ContactsGrid = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Contacts"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Contacts Grid', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/contacts" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/contacts-grid" className="btn btn-icon btn-sm active bg-primary text-white"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_contact"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Contact</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Contact Grid */}
				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between">
							<h5>Contact Grid</h5>
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
										<a href="/contact-details"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Darlee Robertson</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Facility Manager</span>
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
										<a href="/contact-details"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Sharon Roy</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Installer</span>
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
										<a href="/contact-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-51.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Vaughan Lewis</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Senior Manager</span>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										vaughan@example.com
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
										<a href="/contact-details"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Jessica Louise</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Test Engineer</span>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										jessica@example.com
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
										<a href="/contact-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-52.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Carol Thomas</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">UI /UX Designer</span>
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
										<a href="/contact-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-53.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Dawn Mercha</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">UI /UX Designer</span>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										carol@example.com
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
										<a href="/contact-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-57.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Rachel Hampton</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Software Developer</span>
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
											className="ti ti-star-filled text-warning me-1"></i>3.1</span>
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
										<a href="/contact-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-54.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Jonelle Curtiss</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Supervisor</span>
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
										<a href="/contact-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-08.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Jonathan Smith</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Team Lead Dev</span>
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
										<a href="/contact-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-07.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Patricia Carter</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Team Lead Dev</span>
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
										<a href="/contact-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-20.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Jeffrey Jarrett</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Team Lead Dev</span>
								</div>
								<div className="d-flex flex-column">
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-mail-forward text-gray-5 me-2"></i>
										jeffrey@example.com
									</p>
									<p className="text-dark d-inline-flex align-items-center mb-2">
										<i className="ti ti-phone text-gray-5 me-2"></i>
										(167) 4526 5496
									</p>
									<p className="text-dark d-inline-flex align-items-center">
										<i className="ti ti-map-pin text-gray-5 me-2"></i>
										Iran
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
										<a href="/contact-details"
											className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
											<img src="/assets/img/users/user-24.jpg" className="img-fluid h-auto w-auto"
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
													data-bs-toggle="modal" data-bs-target="#edit_contact"><i
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
									<h6 className="mb-1"><a href="/contact-details">Gloria Rubio</a></h6>
									<span className="badge bg-pink-transparent fs-10 fw-medium">Team Lead Dev</span>
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
											className="ti ti-star-filled text-warning me-1"></i>4.1</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Contact Grid */}

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default ContactsGrid;
