import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';


const ApprovalSettings = () => {
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
						{ label: 'Approval Settings', active: true }
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
										className="d-inline-flex align-items-center rounded  py-2 px-3">Salary Settings</a>
									<a href="/approval-settings"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Approval Settings</a>
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
									<h4>Approval Settings</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-12 d-flex">
												<div className="flex-fill">
													<h6 className="mb-3">Expense Approval</h6>
													<div
														className="d-flex justify align-items-start flex-wrap row-gap-3 pb-2 mb-2">
														<h5>Default Expense Approval</h5>

														<div className="form-check ms-3">
															<input className="form-check-input" type="radio"
																name="exampleRadios" id="exampleRadios1" value="option1"
																checked />
															<label className="form-check-label" htmlFor="exampleRadios1">
																Sequence Approval (Chain)
															</label>
														</div>
														<div className="form-check ms-3">
															<input className="form-check-input" type="radio"
																name="exampleRadios" id="exampleRadios2"
																value="option1" />
															<label className="form-check-label" htmlFor="exampleRadios2">
																Simultaneous Approval
															</label>
														</div>
													</div>
													<div className="col-md-6">
														<div className="d-flex align-items-center flex-wrap roe-gap-3 mb-3">
															<div className="me-3">
																<label className="form-label mb-0">Expense Approvers</label>
															</div>
															<div className="flex-fill">
																<div className="custom-select-wrapper"><div className="custom-select-wrapper"><CustomSelect className="select">
																	<option>Select</option>
																	<option>CEO</option>
																	<option>Manager</option>
																	<option>Team Lead</option>
																</CustomSelect></div></div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

									</div>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-12 d-flex">
												<div className="flex-fill">
													<h6 className="mb-3">Leave Approval</h6>
													<div
														className="d-flex justify align-items-start flex-wrap row-gap-3 pb-2 mb-2">
														<h5>Default Expense Approval</h5>
														<div className="form-check ms-3">
															<input className="form-check-input" type="radio"
																name="exampleRadioss" id="sequence" value="option1"
																checked />
															<label className="form-check-label" htmlFor="sequence">
																Sequence Approval (Chain)
															</label>
														</div>
														<div className="form-check ms-3">
															<input className="form-check-input" type="radio"
																name="exampleRadioss" id="sequence1" value="option1" />
															<label className="form-check-label" htmlFor="sequence1">
																Simultaneous Approval
															</label>
														</div>
													</div>
													<div className="col-md-6">
														<div className="d-flex align-items-center flex-wrap roe-gap-3 mb-3">
															<div className="me-3">
																<label className="form-label mb-0">Leave Approvers</label>
															</div>
															<div className="flex-fill">
																<CustomSelect className="select">
																	<option>Select</option>
																	<option>CEO</option>
																	<option>Manager</option>
																	<option>Team Lead</option>
																</CustomSelect>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-12 d-flex">
												<div className="flex-fill">
													<h6 className="mb-3">Offer Approval</h6>
													<div
														className="d-flex justify align-items-start flex-wrap row-gap-3 pb-2 mb-2">
														<h5>Default Expense Approval</h5>
														<div className="form-check ms-3">
															<input className="form-check-input" type="radio"
																name="exampleRadioss" id="sequence3" value="option1"
																checked />
															<label className="form-check-label" htmlFor="sequence3">
																Sequence Approval (Chain)
															</label>
														</div>
														<div className="form-check ms-3">
															<input className="form-check-input" type="radio"
																name="exampleRadioss" id="sequence4" value="option1" />
															<label className="form-check-label" htmlFor="sequence4">
																Simultaneous Approval
															</label>
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

export default ApprovalSettings;
