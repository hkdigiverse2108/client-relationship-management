import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const LeadsGrid = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Leads"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Leads Grid', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/leads" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/leads-grid" className="btn btn-icon btn-sm active bg-primary text-white"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_leads"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Lead</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Leads Grid */}
				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between">
							<h5>Leads Grid</h5>
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


				{/* Leads Kanban */}
				<div className="d-flex overflow-x-auto align-items-start mb-4">
					<div className="kanban-list-items bg-white">
						<div className="card mb-0">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-center">
									<div>
										<h4 className="fw-semibold d-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-8 text-warning me-2"></i>Contacted
										</h4>
										<span className="fw-medium text-default">02 Leads - $7,50,000</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="action-icon d-inline-flex">
											<a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
											<a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_leads"><i
													className="ti ti-edit"></i></a>
											<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
													className="ti ti-trash"></i></a>
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
												<a href="/leads-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">SM</span></a>
												<h6 className="fw-medium"><a href="/leads-details">Linda White</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-report-money text-dark me-1"></i>
												$03,50,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-1"></i>
												linda@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-1"></i>
												(193) 7839 748
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-pin text-dark me-1"></i>
												Austin, United States
											</p>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="avatar avatar-sm  avatar-rounded flex-shrink-0 me-2"><img
													src="/assets/img/company/company-04.svg" alt="image" /></a>
											<div className="icons-social d-flex align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-call"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-brand-hipchat"></i></a>
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
												<a href="/leads-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">CJ</span></a>
												<h6 className="fw-medium"><a href="/leads-details">Chris Johnson</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-report-money text-dark me-1"></i>
												$3,50,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-1"></i>
												chris@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-1"></i>
												(162) 8920 713
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-pin text-dark me-1"></i>
												Atlanta, United States
											</p>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="avatar avatar-sm  avatar-rounded flex-shrink-0 me-2"><img
													src="/assets/img/company/company-07.svg" alt="image" /></a>
											<div className="icons-social d-flex align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-call"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-brand-hipchat"></i></a>
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
										<h4 className="fw-semibold d-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-8 text-purple me-2"></i>Not
											Contacted</h4>
										<span className="fw-medium text-default">02 Leads - $7,60,000</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="action-icon d-inline-flex">
											<a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
											<a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_leads"><i
													className="ti ti-edit"></i></a>
											<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
													className="ti ti-trash"></i></a>
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
												<a href="/leads-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">EJ</span></a>
												<h6 className="fw-medium"><a href="/leads-details">Emily Johnson</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-report-money text-dark me-1"></i>
												$3,50,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-1"></i>
												emily@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-1"></i>
												(179) 7382 829
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-pin text-dark me-1"></i>
												Newyork, United States
											</p>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="avatar avatar-sm  avatar-rounded flex-shrink-0 me-2"><img
													src="/assets/img/company/company-06.svg" alt="image" /></a>
											<div className="icons-social d-flex align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-call"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-brand-hipchat"></i></a>
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
												<a href="/leads-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">MG</span></a>
												<h6 className="fw-medium"><a href="/leads-details">Maria Garcia</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-report-money text-dark me-1"></i>
												$4,10,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-1"></i>
												maria@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-1"></i>
												(120) 3728 039
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-pin text-dark me-1"></i>
												Denver, United States
											</p>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="avatar avatar-sm  avatar-rounded flex-shrink-0 me-2"><img
													src="/assets/img/company/company-05.svg" alt="image" /></a>
											<div className="icons-social d-flex align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-call"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-brand-hipchat"></i></a>
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
										<h4 className="fw-semibold d-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-8 text-success me-2"></i>Closed
										</h4>
										<span className="fw-medium text-default">45 Leads - $15,44,540</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="action-icon d-inline-flex">
											<a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
											<a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_leads"><i
													className="ti ti-edit"></i></a>
											<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
													className="ti ti-trash"></i></a>
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
												<a href="/leads-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">JS</span></a>
												<h6 className="fw-medium"><a href="/leads-details">John Smith</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-report-money text-dark me-1"></i>
												$3,20,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-1"></i>
												john@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-1"></i>
												(123) 4567 890
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-pin text-dark me-1"></i>
												Chester, United Kingdom
											</p>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="avatar avatar-sm  avatar-rounded flex-shrink-0 me-2"><img
													src="/assets/img/company/company-01.svg" alt="image" /></a>
											<div className="icons-social d-flex align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-call"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-brand-hipchat"></i></a>
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
											<div className="border-success border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/leads-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">DL</span></a>
												<h6 className="fw-medium"><a href="/leads-details">David Lee</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-report-money text-dark me-1"></i>
												$3,10,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-1"></i>
												david@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-1"></i>
												(183) 9302 890
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-pin text-dark me-1"></i>
												Charlotte, United States
											</p>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="avatar avatar-sm  avatar-rounded flex-shrink-0 me-2"><img
													src="/assets/img/company/company-08.svg" alt="image" /></a>
											<div className="icons-social d-flex align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-call"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-brand-hipchat"></i></a>
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
											<div className="border-success border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/leads-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">RM</span></a>
												<h6 className="fw-medium"><a href="/leads-details">Robert Martinez</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-report-money text-dark me-1"></i>
												$4,50,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-1"></i>
												robert@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-1"></i>
												(163) 2459 315
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-pin text-dark me-1"></i>
												Bristol, United Kingdom
											</p>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="avatar avatar-sm  avatar-rounded flex-shrink-0 me-2"><img
													src="/assets/img/company/company-09.svg" alt="image" /></a>
											<div className="icons-social d-flex align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-call"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-brand-hipchat"></i></a>
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
										<h4 className="fw-semibold d-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-8 text-danger me-2"></i>Lost</h4>
										<span className="fw-medium text-default">15 Leads - $14,89,543</span>
									</div>
									<div className="d-flex align-items-center">
										<div className="action-icon d-inline-flex">
											<a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-circle-plus"></i></a>
											<a href="#" className="" data-bs-toggle="modal" data-bs-target="#edit_leads"><i
													className="ti ti-edit"></i></a>
											<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
													className="ti ti-trash"></i></a>
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
											<div className="border-danger border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/leads-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">MB</span></a>
												<h6 className="fw-medium"><a href="/leads-details">Michael Brown</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-report-money text-dark me-1"></i>
												$4,10,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-1"></i>
												micael@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-1"></i>
												(184) 2719 738
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-pin text-dark me-1"></i>
												London, United Kingdom
											</p>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="avatar avatar-sm  avatar-rounded flex-shrink-0 me-2"><img
													src="/assets/img/company/company-03.svg" alt="image" /></a>
											<div className="icons-social d-flex align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-call"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-brand-hipchat"></i></a>
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
											<div className="border-danger border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/leads-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">KD</span></a>
												<h6 className="fw-medium"><a href="/leads-details">Karen Davis</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-report-money text-dark me-1"></i>
												$4,00,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-1"></i>
												darleeo@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-1"></i>
												(163) 2459 315
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-pin text-dark me-1"></i>
												Detroit, United States
											</p>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="avatar avatar-sm  avatar-rounded flex-shrink-0 me-2"><img
													src="/assets/img/company/company-02.svg" alt="image" /></a>
											<div className="icons-social d-flex align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-call"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-brand-hipchat"></i></a>
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
											<div className="border-danger border border-2 mb-3"></div>
											<div className="d-flex align-items-center mb-3">
												<a href="/leads-details"
													className="avatar avatar-lg bg-gray flex-shrink-0 me-2"><span
														className="avatar-title text-dark">JA</span></a>
												<h6 className="fw-medium"><a href="/leads-details">James Anderson</a>
												</h6>
											</div>
										</div>
										<div className="mb-3 d-flex flex-column">
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-report-money text-dark me-1"></i>
												$3,40,000
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-mail text-dark me-1"></i>
												james@gmail.com
											</p>
											<p className="text-default d-inline-flex align-items-center mb-2">
												<i className="ti ti-phone text-dark me-1"></i>
												(168) 8392 823
											</p>
											<p className="text-default d-inline-flex align-items-center">
												<i className="ti ti-map-pin-pin text-dark me-1"></i>
												Manchester, United Kingdom
											</p>
										</div>
										<div
											className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
											<a href="#" onClick={(e) => e.preventDefault()}
												className="avatar avatar-sm  avatar-rounded flex-shrink-0 me-2"><img
													src="/assets/img/company/company-03.svg" alt="image" /></a>
											<div className="icons-social d-flex align-items-center">
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-phone-call"></i></a>
												<a href="#"
													className="d-flex align-items-center justify-content-center me-2"><i
														className="ti ti-brand-hipchat"></i></a>
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
				{/* /Leads Kanban */}

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default LeadsGrid;
