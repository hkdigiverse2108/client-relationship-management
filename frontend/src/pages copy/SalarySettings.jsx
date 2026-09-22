import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const SalarySettings = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'App Settings' },
						{ label: 'Salary Settings', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
					<li className="nav-item">
						<a className="nav-link " href="/profile-settings"><i className="ti ti-settings me-2"></i>General
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/business-settings"><i className="ti ti-world-cog me-2"></i>Website
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link active" href="/salary-settings"><i
								className="ti ti-device-ipad-horizontal-cog me-2"></i>App Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/email-settings"><i className="ti ti-server-cog me-2"></i>System
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/payment-gateways"><i
								className="ti ti-settings-dollar me-2"></i>Financial Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/custom-css"><i className="ti ti-settings-2 me-2"></i>Other
							Settings</a>
					</li>
				</ul>
				<div className="row">
					<div className="col-xl-3 theiaStickySidebar">
						<div className="card">
							<div className="card-body">
								<div className="d-flex flex-column list-group settings-list">
									<a href="/salary-settings"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Salary Settings</a>
									<a href="/approval-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Approval Settings</a>
									<a href="/invoice-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Invoice Settings</a>
									<a href="/leave-type"
										className="d-inline-flex align-items-center rounded py-2 px-3">Leave Type</a>
									<a href="/custom-fields"
										className="d-inline-flex align-items-center rounded py-2 px-3">Custom Fields</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							<div className="card-body">
								<div className="border-bottom mb-3 pb-3">
									<h4>Salary Settings</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">

										</div>
										<div className="row">
											<div className="col-md-4 d-flex">
												<div className="card flex-fill">
													<div className="card-body pb-1">
														<div
															className="content-head d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
															<h5>DA & HRA</h5>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" id="flexSwitchCheckDefault" />
															</div>
														</div>
														<div className="mb-3">
															<label className="form-label">DA (%)</label>
															<input type="text" className="form-control" />
														</div>
														<div className="mb-3">
															<label className="form-label">HRA (%)</label>
															<input type="text" className="form-control" />
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-4 d-flex">
												<div className="card flex-fill">
													<div className="card-body pb-1">
														<div
															className="content-head d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
															<h5>Provident Fund</h5>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" id="flexSwitchCheckDefault2" />
															</div>
														</div>
														<div className="mb-3">
															<label className="form-label">Employee Share (%)</label>
															<input type="text" className="form-control" />
														</div>
														<div className="mb-3">
															<label className="form-label">Organization Share (%)</label>
															<input type="text" className="form-control" />
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-4 d-flex">
												<div className="card flex-fill">
													<div className="card-body pb-1">
														<div
															className="content-head d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
															<h5>ESI</h5>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" id="flexSwitchCheckDefault3" />
															</div>
														</div>
														<div className="mb-3">
															<label className="form-label">Employee Share (%)</label>
															<input type="text" className="form-control" />
														</div>
														<div className="mb-3">
															<label className="form-label">Organization Share (%)</label>
															<input type="text" className="form-control" />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="border-bottom mb-3">

										<div className="row">
											<div className="col-md-12">
												<div className="card">
													<div className="card-body pb-1">
														<div
															className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
															<h5>TDS <span> Annual Salary</span></h5>
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" id="flexSwitchCheckDefault4" />
															</div>
														</div>
														<div className="row">
															<div className="col-md-12">
																<div className="add-salary-info">
																	<div className="row">
																		<div className="col-md-4">
																			<div className="mb-3">
																				<label className="form-label">Salary
																					From</label>
																				<input type="text" className="form-control" />
																			</div>
																		</div>
																		<div className="col-md-4">
																			<div className="mb-3">
																				<label className="form-label">Salary
																					To</label>
																				<input type="text" className="form-control" />
																			</div>
																		</div>
																		<div className="col-md-4">
																			<div className="d-flex align-items-center">
																				<div className="mb-3 flex-fill">
																					<label
																						className="form-label">Percentage</label>
																					<input type="text"
																						className="form-control" />
																				</div>
																				<div
																					className="d-flex align-items-center pt-3 ms-3">
																					<a href="#"
																						className="avatar avatar-md rounded bg-gray add-salary-btn text-primary"><i
																							className="ti ti-plus"></i></a>
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
									<div className="d-flex align-items-center justify-content-end">
										<button type="button" className="btn btn-outline-light border me-3">Cancel</button>
										<button type="submit" className="btn btn-primary">Save</button>
									</div>
								</form>
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

export default SalarySettings;
