import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const LeaveSettings = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Leave Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Leaves' },
						{ label: 'Leave Settings', active: true }
					]}
				>
					<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#new_custom_policy"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Custom Policy</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Leaves Info */}
				<div className="row">
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center">
									<div className="form-check form-check-md form-switch me-1">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" role="switch" checked />
										</label>
									</div>
									<h6 className="d-flex align-items-center">Annual Leave</h6>
								</div>
								<div className="d-flex align-items-center">
									<a href="#" onClick={(e) => e.preventDefault()} className="text-decoration-underline me-2"
										data-bs-toggle="modal" data-bs-target="#add_custom_policy">Custom Policy</a>
									<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
										data-bs-target="#annual_leave_settings"> <i className="ti ti-settings"></i> </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center">
									<div className="form-check form-check-md form-switch me-1">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" role="switch" />
										</label>
									</div>
									<h6 className="d-flex align-items-center">Sick Leave</h6>
								</div>
								<div className="d-flex align-items-center">
									<a href="#" onClick={(e) => e.preventDefault()} className="text-decoration-underline me-2"
										data-bs-toggle="modal" data-bs-target="#add_custom_policy">Custom Policy</a>
									<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
										data-bs-target="#sick_leave_settings"> <i className="ti ti-settings"></i> </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center">
									<div className="form-check form-check-md form-switch me-1">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" role="switch" checked />
										</label>
									</div>
									<h6 className="d-flex align-items-center">Hospitalisation</h6>
								</div>
								<div className="d-flex align-items-center">
									<a href="#" onClick={(e) => e.preventDefault()} className="text-decoration-underline me-2"
										data-bs-toggle="modal" data-bs-target="#add_custom_policy">Custom Policy</a>
									<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
										data-bs-target="#hospitalisation_settings"><i className="ti ti-settings"></i> </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center">
									<div className="form-check form-check-md form-switch me-1">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" role="switch" checked />
										</label>
									</div>
									<h6 className="d-flex align-items-center">Maternity</h6>
								</div>
								<div className="d-flex align-items-center">
									<a href="#" onClick={(e) => e.preventDefault()} className="text-decoration-underline me-2"
										data-bs-toggle="modal" data-bs-target="#add_custom_policy">Custom Policy</a>
									<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
										data-bs-target="#maternity_settings"> <i className="ti ti-settings"></i> </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-header">
								<h5 className="card-title">White Variant</h5>
							</div>
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center">
									<div className="form-check form-check-md form-switch me-1">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" role="switch" />
										</label>
									</div>
									<h6 className="d-flex align-items-center">Paternity</h6>
								</div>
								<div className="d-flex align-items-center">
									<a href="#" onClick={(e) => e.preventDefault()} className="text-decoration-underline me-2"
										data-bs-toggle="modal" data-bs-target="#add_custom_policy">Custom Policy</a>
									<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
										data-bs-target="#paternity_settings"> <i className="ti ti-settings"></i> </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-header">
								<h5 className="card-title">White Variant</h5>
							</div>
							<div className="card-body d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center">
									<div className="form-check form-check-md form-switch me-1">
										<label className="form-check-label">
											<input className="form-check-input" type="checkbox" role="switch" />
										</label>
									</div>
									<h6 className="d-flex align-items-center">LOP</h6>
								</div>
								<div className="d-flex align-items-center">
									<a href="#" onClick={(e) => e.preventDefault()} className="text-decoration-underline me-2"
										data-bs-toggle="modal" data-bs-target="#add_custom_policy">Custom Policy</a>
									<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal" data-bs-target="#lop_settings">
										<i className="ti ti-settings"></i> </a>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Leaves Info */}

			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default LeaveSettings;
