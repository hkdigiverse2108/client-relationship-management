import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';
import CustomEditor from '../components/common/CustomEditor';


const InvoiceSettings = () => {
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
						{ label: 'Invoice Settings', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
					<li className="nav-item">
						<a className="nav-link" href="/profile-settings"><i className="ti ti-settings me-2"></i>General
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
										className="d-inline-flex align-items-center rounded  py-2 px-3">Profile Settings</a>
									<a href="/approval-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Approval Settings</a>
									<a href="/invoice-settings"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Invoice Settings</a>
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
									<h4>Invoice Settings</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-12">
												<div>

													<div className="row">
														<div className=" col-md-3">
															<div className="mb-3">
																<h6>Invoice Logo</h6>
															</div>
														</div>
														<div className=" col-md-9">
															<div
																className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
																<div
																	className="d-flex align-items-center justify-content-center og-upload bg-white rounded border border-dashed me-2 flex-shrink-0 text-dark frames">
																	<i className="ti ti-photo text-gray-3 fs-16"></i>
																</div>
																<div className="profile-upload">
																	<div className="mb-2">
																		<h6 className="mb-1">Logo</h6>
																		<p className="fs-12">Recommended image size is 40px
																			x 40px</p>
																	</div>
																	<div
																		className="profile-uploader d-flex align-items-center">
																		<div
																			className="drag-upload-btn btn btn-sm btn-primary me-2">
																			Upload
																			<input type="file"
																				className="form-control image-sign"
																				multiple="" />
																		</div>
																		<a href="#" onClick={(e) => e.preventDefault()}
																			className="btn btn-light btn-sm">Cancel</a>
																	</div>

																</div>
															</div>
														</div>
													</div>
													<div className="row align-items-center">
														<div className=" col-md-3">
															<div className="mb-3">
																<h6>Invoice Prefix</h6>
															</div>
														</div>
														<div className=" col-md-5">
															<div className="mb-3">
																<input type="text" className="form-control" />
															</div>
														</div>
													</div>
													<div className="row align-items-center">
														<div className="col-md-3">
															<div className="mb-3">
																<h6>Invoice Due</h6>
															</div>
														</div>
														<div className=" col-md-5">
															<div className="mb-3">
																<div className="custom-select-wrapper"><CustomSelect className="select">
																	<option>Select</option>
																	<option>5</option>
																	<option>7</option>
																</CustomSelect></div>
															</div>
														</div>
														<div className=" col-md-5">
															<h6 className="mb-3">Days</h6>
														</div>
													</div>
													<div className="row align-items-center">
														<div className=" col-md-3">
															<div className="mb-3 d-flex">
																<h6>Invoice Round Off</h6>
															</div>
														</div>
														<div className=" col-md-5">
															<div className="mb-3">
																<div className="custom-select-wrapper"><CustomSelect className="select">
																	<option>Select</option>
																	<option>RoundOff Up</option>
																	<option>RoundOff Down</option>
																</CustomSelect></div>
															</div>
														</div>
														<div className="col-md-4">
															<div className="form-check form-switch">
																<input className="form-check-input" type="checkbox"
																	role="switch" id="flexSwitchCheckDefault" />
															</div>
														</div>
													</div>
													<div className="row">
														<div className="col-md-3">
															<div className="mb-3 d-flex">
																<h6>Show Company Details</h6>
															</div>
														</div>
														<div className="col-md-5">
															<div className="mb-3">
																<div className="form-check form-switch">
																	<input className="form-check-input" type="checkbox"
																		role="switch" id="flexSwitchCheckDefault2" />
																</div>
															</div>
														</div>
													</div>
													<div className="row align-items-center">
														<div className="col-md-3">
															<div className="mb-3">
																<h6>Invoice Terms</h6>
															</div>
														</div>
														<div className="col-md-9">
															<div className="mb-3">
																<CustomEditor />
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

export default InvoiceSettings;
