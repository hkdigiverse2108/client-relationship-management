import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TicketChart } from '../components/charts/TicketCharts';import PageHeader from '../components/common/PageHeader';


const Tickets = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Tickets"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Tickets' },
						{ label: 'Tickets', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/tickets" className="btn btn-icon btn-sm active bg-primary text-white me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/tickets-grid" className="btn btn-icon btn-sm"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_ticket"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Ticket</a>
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
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="row">
									<div className="col-6 d-flex">
										<div className="flex-fill">
											<div
												className="border border-dashed border-primary rounded-circle d-inline-flex align-items-center justify-content-center p-1 mb-3">
												<span className="avatar avatar-lg avatar-rounded bg-primary-transparent "><i
														className="ti ti-ticket fs-20"></i></span>
											</div>
											<p className="fw-medium fs-12 mb-1">New Tickets</p>
											<h4>120</h4>
										</div>
									</div>
									<div className="col-6 text-end d-flex">
										<div className="d-flex flex-column justify-content-between align-items-end w-100">
											<span
												className="badge bg-transparent-purple d-inline-flex align-items-center mb-3">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												+19.01%
											</span>
											<TicketChart color="#F26522" data={[8,5,6,3,4,6,7,3,8,6,4,7]} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="row">
									<div className="col-6 d-flex">
										<div className="flex-fill">
											<div
												className="border border-dashed border-purple rounded-circle d-inline-flex align-items-center justify-content-center p-1 mb-3">
												<span className="avatar avatar-lg avatar-rounded bg-transparent-purple"><i
														className="ti ti-folder-open fs-20"></i></span>
											</div>
											<p className="fw-medium fs-12 mb-1">Open Tickets</p>
											<h4>60</h4>
										</div>
									</div>
									<div className="col-6 text-end d-flex">
										<div className="d-flex flex-column justify-content-between align-items-end w-100">
											<span
												className="badge bg-transparent-dark text-dark d-inline-flex align-items-center mb-3">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												+19.01%
											</span>
											<TicketChart color="#AB47BC" data={[8,5,6,3,4,6,7,3,8,6,4,7]} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="row">
									<div className="col-6 d-flex">
										<div className="flex-fill">
											<div
												className="border border-dashed border-success rounded-circle d-inline-flex align-items-center justify-content-center p-1 mb-3">
												<span className="avatar avatar-lg avatar-rounded bg-success-transparent"><i
														className="ti ti-checks fs-20"></i></span>
											</div>
											<p className="fw-medium fs-12 mb-1">Solved Tickets</p>
											<h4>50</h4>
										</div>
									</div>
									<div className="col-6 text-end d-flex">
										<div className="d-flex flex-column justify-content-between align-items-end w-100">
											<span
												className="badge bg-info-transparent d-inline-flex align-items-center mb-3">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												+19.01%
											</span>
											<TicketChart color="#03C95A" data={[8,5,6,3,4,6,7,3,8,6,4,7]} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-md-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="row">
									<div className="col-6 d-flex">
										<div className="flex-fill">
											<div
												className="border border-dashed border-info rounded-circle d-inline-flex align-items-center justify-content-center p-1 mb-3">
												<span className="avatar avatar-lg avatar-rounded bg-info-transparent"><i
														className="ti ti-progress-alert fs-20"></i></span>
											</div>
											<p className="fw-medium fs-12 mb-1">Pending Tickets</p>
											<h4>10</h4>
										</div>
									</div>
									<div className="col-6 text-end d-flex">
										<div className="d-flex flex-column justify-content-between align-items-end w-100">
											<span
												className="badge bg-secondary-transparent d-inline-flex align-items-center mb-3">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												+19.01%
											</span>
											<TicketChart color="#0DCAF0" data={[8,5,6,3,4,6,7,3,8,6,4,7]} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
							<h5>Ticket List</h5>
							<div className="d-flex align-items-center flex-wrap row-gap-3">
								<div className="dropdown me-2">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Priority
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Priority</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">High</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Low</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Medium</a>
										</li>
									</ul>
								</div>
								<div className="dropdown me-2">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Select Status
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Open</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">On Hold</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Reopened</a>
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
				<div className="row">
					<div className="col-xl-9 col-md-8">
						<div className="card">
							
							<div className="card-body">
								<div>
									<span className="badge badge-info rounded-pill mb-2">Tic - 001</span>
									<div className="d-flex align-items-center mb-2">
										<h5 className="fw-semibold me-2"><a href="/ticket-details">Laptop Issue</a></h5>
										<span className="badge bg-outline-pink d-flex align-items-center ms-1"><i
												className="ti ti-circle-filled fs-5 me-1"></i>Open</span>
									</div>
									<div className="d-flex align-items-center flex-wrap row-gap-2">
										<p className="d-flex align-items-center mb-0 me-2">
											<img src="/assets/img/profiles/avatar-03.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" /> Assigned to
											<span className="text-dark ms-1"> Edgar Hansel</span>
										</p>
										<p className="d-flex align-items-center mb-0 me-2"><i
												className="ti ti-calendar-bolt me-1"></i>Updated 10 hours ago</p>
										<p className="d-flex align-items-center mb-0"><i
												className="ti ti-message-share me-1"></i>9 Comments</p>
									</div>
								</div>
							</div>
						</div>
						<div className="card">
							
							<div className="card-body">
								<div>
									<span className="badge badge-info rounded-pill mb-2">Tic - 002</span>
									<div className="d-flex align-items-center mb-2">
										<h5 className="fw-semibold me-2"><a href="/ticket-details">Payment Issue</a>
										</h5>
										<span className="badge bg-outline-warning d-flex align-items-center ms-1"><i
												className="ti ti-circle-filled fs-5 me-1"></i>On Hold</span>
									</div>
									<div className="d-flex align-items-center flex-wrap row-gap-2">
										<p className="d-flex align-items-center mb-0 me-2">
											<img src="/assets/img/profiles/avatar-01.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" /> Assigned to
											<span className="text-dark ms-1">Ann Lynch</span>
										</p>
										<p className="d-flex align-items-center mb-0 me-2"><i
												className="ti ti-calendar-bolt me-1"></i>Updated 15 hours ago</p>
										<p className="d-flex align-items-center mb-0"><i
												className="ti ti-message-share me-1"></i>9 Comments</p>
									</div>
								</div>
							</div>
						</div>
						<div className="card">
							
							<div className="card-body">
								<div>
									<span className="badge badge-info rounded-pill mb-2">Tic - 003</span>
									<div className="d-flex align-items-center mb-2">
										<h5 className="fw-semibold me-2"><a href="/ticket-details">Bug Report</a></h5>
										<span className="badge bg-outline-purple d-flex align-items-center ms-1"><i
												className="ti ti-circle-filled fs-5 me-1"></i>Reopened</span>
									</div>
									<div className="d-flex align-items-center flex-wrap row-gap-2">
										<p className="d-flex align-items-center mb-0 me-2">
											<img src="/assets/img/profiles/avatar-06.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" /> Assigned to
											<span className="text-dark ms-1">Juan Hermann</span>
										</p>
										<p className="d-flex align-items-center mb-0 me-2"><i
												className="ti ti-calendar-bolt me-1"></i>Updated 20 hours ago</p>
										<p className="d-flex align-items-center mb-0"><i
												className="ti ti-message-share me-1"></i>9 Comments</p>
									</div>
								</div>
							</div>
						</div>
						<div className="card">
							
							<div className="card-body">
								<div>
									<span className="badge badge-info rounded-pill mb-2">Tic - 004</span>
									<div className="d-flex align-items-center mb-2">
										<h5 className="fw-semibold me-2"><a href="/ticket-details">Access Denied</a>
										</h5>
										<span className="badge bg-outline-pink d-flex align-items-center ms-1"><i
												className="ti ti-circle-filled fs-5 me-1"></i>Open</span>
									</div>
									<div className="d-flex align-items-center flex-wrap row-gap-2">
										<p className="d-flex align-items-center mb-0 me-2">
											<img src="/assets/img/profiles/avatar-05.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" /> Assigned to
											<span className="text-dark ms-1">Jessie Otero</span>
										</p>
										<p className="d-flex align-items-center mb-0 me-2"><i
												className="ti ti-calendar-bolt me-1"></i>Updated 23 hours ago</p>
										<p className="d-flex align-items-center mb-0"><i
												className="ti ti-message-share me-1"></i>9 Comments</p>
									</div>
								</div>
							</div>
						</div>
						<div className="text-center mb-4">
							<a href="#" className="btn btn-primary"><i className="ti ti-loader-3 me-1"></i>Load More</a>
						</div>
					</div>
					<div className="col-xl-3 col-md-4">
						<div className="card">
							
							<div className="card-header">
								<h4>Ticket Categories</h4>
							</div>
							<div className="card-body p-0">
								<div className="d-flex flex-column">
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<a href="#" onClick={(e) => e.preventDefault()}>Internet Issue</a>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">0</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<a href="#" onClick={(e) => e.preventDefault()}>Computer</a>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">1</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<a href="#" onClick={(e) => e.preventDefault()}>Redistribute</a>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">0</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<a href="#" onClick={(e) => e.preventDefault()}>Payment</a>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">2</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between p-3">
										<a href="#" onClick={(e) => e.preventDefault()}>Complaint</a>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">1</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card">
							
							<div className="card-header">
								<h4>Support Agents</h4>
							</div>
							<div className="card-body p-0">
								<div className="d-flex flex-column">
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<span className="d-flex align-items-center">
											<img src="/assets/img/profiles/avatar-01.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" />Edgar Hansel
										</span>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">0</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<span className="d-flex align-items-center">
											<img src="/assets/img/profiles/avatar-02.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" />Ann Lynch
										</span>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">1</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between border-bottom p-3">
										<span className="d-flex align-items-center">
											<img src="/assets/img/profiles/avatar-03.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" />Juan Hermann
										</span>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">0</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between p-3">
										<span className="d-flex align-items-center">
											<img src="/assets/img/profiles/avatar-04.jpg"
												className="avatar avatar-xs rounded-circle me-2" alt="img" />Jessie Otero
										</span>
										<div className="d-flex align-items-center">
											<span className="badge badge-xs bg-dark rounded-circle">2</span>
										</div>
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

export default Tickets;
