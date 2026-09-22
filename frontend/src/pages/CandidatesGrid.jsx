import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const CandidatesGrid = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Candidates"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Recruitment' },
						{ label: 'Candidates Grid', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/candidates-kanban" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-layout-kanban"></i></a>
								<a href="/candidates" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/candidates-grid"
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
						<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-3">
							<h5>Candidates Grid</h5>
							<div className="d-flex align-items-center flex-wrap row-gap-3">
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
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Accountant</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">App
												Developer</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Technician</a>
										</li>
									</ul>
								</div>
								<div className="dropdown me-3">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Select Status
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Scheduled</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()}
												className="dropdown-item rounded-1">Interviewed</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Offered</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Rejected</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Hired</a>
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

				{/* Candidates Grid */}
				<div className="row">
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-39.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"><a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">Harold Gaynor</a></h6>
												<span className="badge bg-primary-transparent">Cand-001</span>
											</div>
											<p className="text-gray fs-13 fw-normal">harold@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">Accountant</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-purple"> <i
												className="ti ti-point-filled"></i> New</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-40.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"> <a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">Sandra Ornellas</a></h6>
												<span className="badge bg-primary-transparent">Cand-002</span>
											</div>
											<p className="text-gray fs-13 fw-normal">sandra@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">Accountant</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-pink"> <i className="ti ti-point-filled"></i>
											Scheduled</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-41.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"><a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">John Harris</a></h6>
												<span className="badge bg-primary-transparent">Cand-003</span>
											</div>
											<p className="text-gray fs-13 fw-normal">john@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">Technician</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-info"> <i className="ti ti-point-filled"></i>
											Interviewed</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-42.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"><a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">Carole Langan</a></h6>
												<span className="badge bg-primary-transparent">Cand-004</span>
											</div>
											<p className="text-gray fs-13 fw-normal">carole@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">Web Developer</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-warning"> <i
												className="ti ti-point-filled"></i> Offered</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-44.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"><a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">Charles Marks</a></h6>
												<span className="badge bg-primary-transparent">Cand-005</span>
											</div>
											<p className="text-gray fs-13 fw-normal">charles@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">SEO</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-success"> <i
												className="ti ti-point-filled"></i> Hired</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-43.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"><a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">Kerry Drake</a></h6>
												<span className="badge bg-primary-transparent">Cand-006</span>
											</div>
											<p className="text-gray fs-13 fw-normal">kerry@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">Designer</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-danger"> <i
												className="ti ti-point-filled"></i> Rejected</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-46.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"><a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">David Carmona</a></h6>
												<span className="badge bg-primary-transparent">Cand-007</span>
											</div>
											<p className="text-gray fs-13 fw-normal">david@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">Account Manager</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-success"> <i
												className="ti ti-point-filled"></i> Hired</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-45.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"><a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">Margaret Soto</a></h6>
												<span className="badge bg-primary-transparent">Cand-008</span>
											</div>
											<p className="text-gray fs-13 fw-normal">margaret@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">SEO Analyst</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-pink"> <i className="ti ti-point-filled"></i>
											Scheduled</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-48.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"><a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">Jeffrey Thaler</a></h6>
												<span className="badge bg-primary-transparent">Cand-009</span>
											</div>
											<p className="text-gray fs-13 fw-normal">jeffrey@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">Admin</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-purple"> <i
												className="ti ti-point-filled"></i> New</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-47.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"><a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">Joyce Golston</a></h6>
												<span className="badge bg-primary-transparent">Cand-010</span>
											</div>
											<p className="text-gray fs-13 fw-normal">joyce@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">Business Analyst</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-success"> <i
												className="ti ti-point-filled"></i> Hired</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-49.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"><a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">Cedric Rosalez</a></h6>
												<span className="badge bg-primary-transparent">Cand-011</span>
											</div>
											<p className="text-gray fs-13 fw-normal">cedric@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">Financial Analyst</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-purple"> <i
												className="ti ti-point-filled"></i> New</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xxl-3 col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex justify-content-between align-items-start mb-3">
									<div className="d-flex align-items-center flex-shrink-0">
										<a href="#" className="avatar avatar-lg avatar rounded-circle me-2"
											data-bs-toggle="offcanvas" data-bs-target="#candidate_details">
											<img src="/assets/img/users/user-50.jpg" className="img-fluid h-auto w-auto"
												alt="img" />
										</a>
										<div className="d-flex flex-column">
											<div className="d-flex flex-wrap mb-1">
												<h6 className="fs-16 fw-semibold me-1"><a href="#"
														data-bs-toggle="offcanvas"
														data-bs-target="#candidate_details">Lillie Diaz</a></h6>
												<span className="badge bg-primary-transparent">Cand-012</span>
											</div>
											<p className="text-gray fs-13 fw-normal">lillie@example.com</p>
										</div>
									</div>
								</div>
								<div className="bg-light rounder p-2">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Role</h6>
										<span className="text-dark fs-14 fw-medium">Receptionist</span>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h6 className="text-gray fs-14 fw-normal">Applied Date</h6>
										<span className="text-dark fs-14 fw-medium">12 Sep 2024</span>
									</div>
									<div className="d-flex align-items-center justify-content-between">
										<h6 className="text-gray fs-14 fw-normal">Status</h6>
										<span className="fs-10 fw-medium badge bg-danger"> <i
												className="ti ti-point-filled"></i> Rejected</span>
									</div>
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
				{/* /Candidates Grid */}

			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default CandidatesGrid;
