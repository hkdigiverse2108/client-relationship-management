import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';


const BusinessSettings = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Website Settings' },
						{ label: 'Business', active: true }
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
						<a className="nav-link active" href="/business-settings"><i
								className="ti ti-world-cog me-2"></i>Website Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/salary-settings"><i
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
									<a href="/business-settings"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Business Settings</a>
									<a href="/seo-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">SEO Settings</a>
									<a href="/localization-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Localization</a>
									<a href="/prefixes"
										className="d-inline-flex align-items-center rounded py-2 px-3">Prefixes</a>
									<a href="/preferences"
										className="d-inline-flex align-items-center rounded py-2 px-3">Preferences</a>
									<a href="/appearance"
										className="d-inline-flex align-items-center rounded py-2 px-3">Appearance</a>
									<a href="/language"
										className="d-inline-flex align-items-center rounded py-2 px-3">Language</a>
									<a href="/authentication-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Authentication
										Settings</a>
									<a href="/ai-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">AI Settings</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							<div className="card-body">
								<div className="border-bottom mb-3 pb-3">
									<h4>Business Settings</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-12">
												<div>
													<h6 className="mb-3">Basic Information</h6>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Company Name</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Email Address</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Phone</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Fax</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="row align-items-center mb-3">
													<div className="col-md-2">
														<label className="form-label mb-md-0">Web</label>
													</div>
													<div className="col-md-10">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="border-bottom mb-3">
										<h6 className="mb-3">Company Images</h6>
										<div className="row">
											<div className="col-md-6">
												<div
													className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
													<div
														className="d-flex align-items-center justify-content-center avatar avatar-xxl bg-white rounded border border-dashed me-2 flex-shrink-0 text-dark frames px-2">
														<img src="/assets/img/logo.svg" className="img-fluid" alt="logo" />
													</div>
													<div className="profile-upload">
														<div className="mb-2">
															<h6 className="mb-1">White Logo</h6>
															<p className="fs-12">Recommended image size is 160px x 50px</p>
														</div>
														<div className="profile-uploader d-flex align-items-center">
															<div className="drag-upload-btn btn btn-sm btn-primary me-2">
																Change
																<input type="file" className="form-control image-sign"
																	multiple="" />
															</div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="btn btn-light btn-sm">Cancel</a>
														</div>

													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div
													className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
													<div
														className="d-flex align-items-center justify-content-center avatar bg-dark avatar-xxl rounded border border-dashed me-2 px-2 flex-shrink-0 text-dark frames">
														<img src="/assets/img/logo-white.svg"
															className="img-fluid text-white" alt="logo" />
													</div>
													<div className="profile-upload">
														<div className="mb-2">
															<h6 className="mb-1">Dark Logo</h6>
															<p className="fs-12">Recommended image size is 160px x 50px</p>
														</div>
														<div className="profile-uploader d-flex align-items-center">
															<div className="drag-upload-btn btn btn-sm btn-primary me-2">
																Change
																<input type="file" className="form-control image-sign"
																	multiple="" />
															</div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="btn btn-light btn-sm">Cancel</a>
														</div>

													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div
													className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
													<div
														className="d-flex align-items-center justify-content-center avatar avatar-xxl bg-white rounded border border-dashed me-2 p-3 flex-shrink-0 text-dark frames">
														<img src="/assets/img/logo-small.svg" className="img-fluid"
															alt="logo" />
													</div>
													<div className="profile-upload">
														<div className="mb-2">
															<h6 className="mb-1">White Mini Logo</h6>
															<p className="fs-12">Recommended image size is 80px x 80px</p>
														</div>
														<div className="profile-uploader d-flex align-items-center">
															<div className="drag-upload-btn btn btn-sm btn-primary me-2">
																Change
																<input type="file" className="form-control image-sign"
																	multiple="" />
															</div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="btn btn-light btn-sm">Cancel</a>
														</div>

													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div
													className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
													<div
														className="d-flex align-items-center justify-content-center avatar avatar-xxl bg-dark rounded border border-dashed me-2 flex-shrink-0 text-dark frames">
														<i className="ti ti-photo text-gray-3 fs-16"></i>
													</div>
													<div className="profile-upload">
														<div className="mb-2">
															<h6 className="mb-1">Dark Mini Logo</h6>
															<p className="fs-12">Recommended image size is 80px x 80px</p>
														</div>
														<div className="profile-uploader d-flex align-items-center">
															<div className="drag-upload-btn btn btn-sm btn-primary me-2">
																Upload
																<input type="file" className="form-control image-sign"
																	multiple="" />
															</div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="btn btn-light btn-sm">Cancel</a>
														</div>

													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div
													className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
													<div
														className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded bg-white p-3 border border-dashed me-2 flex-shrink-0 text-dark frames">
														<img src="/assets/img/logo-small.svg" className="img-fluid"
															alt="logo" />
													</div>
													<div className="profile-upload">
														<div className="mb-2">
															<h6 className="mb-1">Favicon</h6>
															<p className="fs-12">Recommended image size is 128px x 128px</p>
														</div>
														<div className="profile-uploader d-flex align-items-center">
															<div className="drag-upload-btn btn btn-sm btn-primary me-2">
																Change
																<input type="file" className="form-control image-sign"
																	multiple="" />
															</div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="btn btn-light btn-sm">Cancel</a>
														</div>

													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div
													className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
													<div
														className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded bg-white p-3 border border-dashed me-2 flex-shrink-0 text-dark frames">
														<img src="/assets/img/logo-small.svg" className="img-fluid"
															alt="logo" />
													</div>
													<div className="profile-upload">
														<div className="mb-2">
															<h6 className="mb-1">Apple Icon</h6>
															<p className="fs-12">Recommended image size is 180px x 180px</p>
														</div>
														<div className="profile-uploader d-flex align-items-center">
															<div className="drag-upload-btn btn btn-sm btn-primary me-2">
																Change
																<input type="file" className="form-control image-sign"
																	multiple="" />
															</div>
															<a href="#" onClick={(e) => e.preventDefault()}
																className="btn btn-light btn-sm">Cancel</a>
														</div>

													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="border-bottom mb-3">
										<h6 className="mb-3">Address Information</h6>
										<div className="row">
											<div className="col-md-12">
												<div className="row align-items-center mb-3">
													<div className="col-md-2">
														<label className="form-label mb-md-0">Address</label>
													</div>
													<div className="col-md-10">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Country</label>
													</div>
													<div className="col-md-8">
														<div>
															<div className="custom-select-wrapper"><CustomSelect className="select">
																<option>Select</option>
																<option>USA</option>
																<option>Canada</option>
																<option>Germany</option>
																<option>France</option>
															</CustomSelect></div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">State</label>
													</div>
													<div className="col-md-8">
														<div>
															<div className="custom-select-wrapper"><CustomSelect className="select">
																<option>Select</option>
																<option>California</option>
																<option>New York</option>
																<option>Texas</option>
																<option>Florida</option>
															</CustomSelect></div>
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">City</label>
													</div>
													<div className="col-md-8">
														<div className="custom-select-wrapper"><CustomSelect className="select">
															<option>Select</option>
															<option>Los Angeles</option>
															<option>San Diego</option>
															<option>Fresno</option>
															<option>San Francisco</option>
														</CustomSelect></div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Postal Code</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" />
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

export default BusinessSettings;
