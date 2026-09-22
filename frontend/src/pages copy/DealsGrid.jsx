import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const DealsGrid = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Deals"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Deals Grid', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/deals" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/deals-grid" className="btn btn-icon btn-sm active bg-primary text-white"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_deals"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Deal</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Deals Grid */}
				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between">
							<h5>Deals Grid</h5>
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

				<div className="d-flex overflow-x-auto align-items-start mb-4">
					<div className="kanban-list-items bg-white">
						<div className="card mb-0">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="fw-medium d-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-8 text-purple me-2"></i>
											New
										</h4>
										<span className="fw-normal text-default">03 Deals - $16,90,000</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="action-icon d-inline-flex">
											<a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
											<a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_deals"><i
													className="ti ti-edit"></i></a>
											<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
												data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="kanban-drag-wrap pt-4">
							<div>
								<div className="card kanban-card">
									<div className="card-body">
										<div className="d-block">
											<div className="border-purple border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/deals-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">WR</span></a>
												<h6 className="fw-medium"><a href="/deals-details">Website Redesign</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-currency-dollar text-dark me-2"></i>
												$4,50,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-2"></i>
												darleeo@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-2"></i>
												(163) 2459 315
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-2 text-dark me-2"></i>
												Newyork, United States
											</p>
										</div>
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md avatar-rounded flex-shrink-0 me-2"><img
														src="/assets/img/profiles/avatar-20.jpg" alt="image" /></a>
												<a href="#" onClick={(e) => e.preventDefault()} className="text-dark">Sharon Roy</a>
											</div>
											<span className="badge badge-sm badge-info-transparent"><i
													className="ti ti-progress me-1"></i>85%</span>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<span className="text-dark"><i className="ti ti-calendar-due text-gray-5"></i> 10
												Jan 2024</span>
											<div className="d-flex  align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-check"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-message-circle-2"></i></a>
												<a href="#" className="d-flex align-items-center justify-content-center"><i
														className="ti ti-color-swatch"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div className="card kanban-card">
									<div className="card-body">
										<div className="d-block">
											<div className="border-purple border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/deals-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">CB</span></a>
												<h6 className="fw-medium"><a href="/deals-details">Cloud Backup</a></h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-currency-dollar text-dark me-2"></i>
												$5,00,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-2"></i>
												sheron@example.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-2"></i>
												(146) 1249 296
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-2 text-dark me-2"></i>
												Exeter, United States
											</p>
										</div>
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md avatar-rounded flex-shrink-0 me-2"><img
														src="/assets/img/profiles/avatar-20.jpg" alt="image" /></a>
												<a href="#" onClick={(e) => e.preventDefault()} className="text-dark">Darlee Robertson</a>
											</div>
											<span className="badge badge-sm badge-info-transparent"><i
													className="ti ti-progress me-1"></i>15%</span>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<span className="text-dark"><i className="ti ti-calendar-due text-gray-5"></i> 12
												Jan 2024</span>
											<div className="d-flex  align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-check"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-message-circle-2"></i></a>
												<a href="#" className="d-flex align-items-center justify-content-center"><i
														className="ti ti-color-swatch"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div className="card kanban-card mb-0">
									<div className="card-body">
										<div className="d-block">
											<div className="border-purple border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/deals-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">EM</span></a>
												<h6 className="fw-medium"><a href="/deals-details">Email Marketing</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-currency-dollar text-dark me-2"></i>
												$7,40,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-2"></i>
												vaughan@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-2"></i>
												(135) 3489 516
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-2 text-dark me-2"></i>
												Phoenix, United States
											</p>
										</div>
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md avatar-rounded flex-shrink-0 me-2"><img
														src="/assets/img/profiles/avatar-21.jpg" alt="image" /></a>
												<a href="#" onClick={(e) => e.preventDefault()} className="text-dark">Vaughan Lewis</a>
											</div>
											<span className="badge badge-sm badge-info-transparent"><i
													className="ti ti-progress me-1"></i>95%</span>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<span className="text-dark"><i className="ti ti-calendar-due text-gray-5"></i> 10
												Jan 2024</span>
											<div className="d-flex  align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-check"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-message-circle-2"></i></a>
												<a href="#" className="d-flex align-items-center justify-content-center"><i
														className="ti ti-color-swatch"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="kanban-list-items bg-white">
						<div className="card mb-0">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="fw-medium d-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-8 text-skyblue me-2"></i>Prospect</h4>
										<span className="fw-normal text-default">30 Leads - $19,94,938</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="action-icon d-inline-flex">
											<a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
											<a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_deals"><i
													className="ti ti-edit"></i></a>
											<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
												data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="kanban-drag-wrap pt-4">
							<div>
								<div className="card kanban-card">
									<div className="card-body">
										<div className="d-block">
											<div className="border-skyblue border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/deals-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">AP</span></a>
												<h6 className="fw-medium"><a href="/deals-details">App Development</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-currency-dollar text-dark me-2"></i>
												$3,15,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-2"></i>
												jessica@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-2"></i>
												(158) 3459 596
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-2 text-dark me-2"></i>
												Chester, United Kingdom
											</p>
										</div>
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md avatar-rounded flex-shrink-0 me-2"><img
														src="/assets/img/profiles/avatar-01.jpg" alt="image" /></a>
												<a href="#" onClick={(e) => e.preventDefault()} className="text-dark">Jessica Louise</a>
											</div>
											<span className="badge badge-sm badge-info-transparent"><i
													className="ti ti-progress me-1"></i>95%</span>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<span className="text-dark"><i className="ti ti-calendar-due text-gray-5"></i> 10
												Jan 2024</span>
											<div className="d-flex  align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-check"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-message-circle-2"></i></a>
												<a href="#" className="d-flex align-items-center justify-content-center"><i
														className="ti ti-color-swatch"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div className="card kanban-card">
									<div className="card-body">
										<div className="d-block">
											<div className="border-skyblue border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/deals-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">SL</span></a>
												<h6 className="fw-medium"><a href="/deals-details">SaaS Licensing</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-currency-dollar text-dark me-2"></i>
												$6,20,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-2"></i>
												rachel@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-2"></i>
												(154) 6481 075
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-2 text-dark me-2"></i>
												Bristol, United Kingdom
											</p>
										</div>
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md avatar-rounded flex-shrink-0 me-2"><img
														src="/assets/img/profiles/avatar-23.jpg" alt="image" /></a>
												<a href="#" onClick={(e) => e.preventDefault()} className="text-dark">Rachel Hampton</a>
											</div>
											<span className="badge badge-sm badge-info-transparent">
												<i className="ti ti-progress me-1"></i>15%
											</span>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<span className="text-dark"><i className="ti ti-calendar-due text-gray-5"></i> 12
												Jan 2024</span>
											<div className="d-flex  align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-check"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-message-circle-2"></i></a>
												<a href="#" className="d-flex align-items-center justify-content-center"><i
														className="ti ti-color-swatch"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div className="card kanban-card mb-0">
									<div className="card-body">
										<div className="d-block">
											<div className="border-skyblue border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/deals-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">MA</span></a>
												<h6 className="fw-medium"><a href="/deals-details">Mobile App Design</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-currency-dollar text-dark me-2"></i>
												$5,50,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-2"></i>
												dawn@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-2"></i>
												(163) 6498 256
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-2 text-dark me-2"></i>
												Charlotte, United States
											</p>
										</div>
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md avatar-rounded flex-shrink-0 me-2"><img
														src="/assets/img/profiles/avatar-22.jpg" alt="image" /></a>
												<a href="#" onClick={(e) => e.preventDefault()} className="text-dark">Dawn Mercha</a>
											</div>
											<span className="badge badge-sm badge-info-transparent"><i
													className="ti ti-progress me-1"></i>65%</span>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<span className="text-dark"><i className="ti ti-calendar-due text-gray-5"></i> 10
												Jan 2024</span>
											<div className="d-flex  align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-check"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-message-circle-2"></i></a>
												<a href="#" className="d-flex align-items-center justify-content-center"><i
														className="ti ti-color-swatch"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="kanban-list-items bg-white">
						<div className="card mb-0">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="fw-medium d-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-8 text-warning me-2"></i>Proposal</h4>
										<span className="fw-normal text-default">30 Leads - $19,94,938</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="action-icon d-inline-flex">
											<a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
											<a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_deals"><i
													className="ti ti-edit"></i></a>
											<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
												data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="kanban-drag-wrap pt-4">
							<div>
								<div className="card kanban-card">
									<div className="card-body">
										<div className="d-block">
											<div className="border-warning border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/deals-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">SS</span></a>
												<h6 className="fw-medium"><a href="/deals-details">SEO Services</a></h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-currency-dollar text-dark me-2"></i>
												$8,40,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-2"></i>
												jonelle@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-2"></i>
												(184) 6348 195
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-2 text-dark me-2"></i>
												Coventry, United Kingdom
											</p>
										</div>
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md avatar-rounded flex-shrink-0 me-2"><img
														src="/assets/img/profiles/avatar-24.jpg" alt="image" /></a>
												<a href="#" onClick={(e) => e.preventDefault()} className="text-dark">Jonelle Curtiss</a>
											</div>
											<span className="badge badge-sm badge-info-transparent"><i
													className="ti ti-progress me-1"></i>60%</span>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<span className="text-dark"><i className="ti ti-calendar-due text-gray-5"></i> 10
												Jan 2024</span>
											<div className="d-flex  align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-check"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-message-circle-2"></i></a>
												<a href="#" className="d-flex align-items-center justify-content-center"><i
														className="ti ti-color-swatch"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div className="card kanban-card">
									<div className="card-body">
										<div className="d-block">
											<div className="border-warning border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/deals-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">UI</span></a>
												<h6 className="fw-medium"><a href="/deals-details">UX/UI Design</a></h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-currency-dollar text-dark me-2"></i>
												$4,50,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-2"></i>
												carol@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-2"></i>
												(196) 4862 196
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-2 text-dark me-2"></i>
												Manchester, United Kingdom
											</p>
										</div>
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md avatar-rounded flex-shrink-0 me-2"><img
														src="/assets/img/profiles/avatar-16.jpg" alt="image" /></a>
												<a href="#" onClick={(e) => e.preventDefault()} className="text-dark">Carol Thomas</a>
											</div>
											<span className="badge badge-sm badge-info-transparent"><i
													className="ti ti-progress me-1"></i>15%</span>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<span className="text-dark"><i className="ti ti-calendar-due text-gray-5"></i> 12
												Jan 2024</span>
											<div className="d-flex  align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-check"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-message-circle-2"></i></a>
												<a href="#" className="d-flex align-items-center justify-content-center"><i
														className="ti ti-color-swatch"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="kanban-list-items bg-white me-0">
						<div className="card mb-0">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="fw-medium d-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-8 text-success me-2"></i>Won</h4>
										<span className="fw-normal text-default">30 Leads - $19,94,938</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="action-icon d-inline-flex">
											<a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
											<a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_deals"><i
													className="ti ti-edit"></i></a>
											<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
												data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="kanban-drag-wrap pt-4">
							<div>
								<div className="card kanban-card">
									<div className="card-body">
										<div className="d-block">
											<div className="border-success border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/deals-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">CM</span></a>
												<h6 className="fw-medium"><a href="/deals-details">Cloud Migration</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-currency-dollar text-dark me-2"></i>
												$2,45,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-2"></i>
												jonathan@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-2"></i>
												(163) 2459 315
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-2 text-dark me-2"></i>
												London, United Kingdom
											</p>
										</div>
										<div className="d-flex justify-content-between align-items-center">
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar avatar-md avatar-rounded flex-shrink-0 me-2"><img
														src="/assets/img/profiles/avatar-10.jpg" alt="image" /></a>
												<a href="#" onClick={(e) => e.preventDefault()} className="text-dark">Jonathan Smith</a>
											</div>
											<span className="badge badge-sm badge-info-transparent"><i
													className="ti ti-progress me-1"></i>85%</span>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<span className="text-dark"><i className="ti ti-calendar-due text-gray-5"></i> 10
												Jan 2024</span>
											<div className="d-flex  align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-check"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-message-circle-2"></i></a>
												<a href="#" className="d-flex align-items-center justify-content-center"><i
														className="ti ti-color-swatch"></i></a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Deals Grid */}
			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default DealsGrid;
