import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const SeoSettings = () => {
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
						{ label: 'SEO Settings', active: true }
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
										className="d-inline-flex align-items-center rounded py-2 px-3">Business Settings</a>
									<a href="/seo-settings"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>SEO Settings</a>
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
									<h4>SEO Settings</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-12">
												<div className="row align-items-center mb-3">
													<div className="col-xxl-2 col-md-3">
														<label className="form-label mb-md-0">Meta Title</label>
													</div>
													<div className="col-xxl-10 col-md-9">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="row align-items-center mb-3">
													<div className="col-xxl-2 col-md-3">
														<label className="form-label mb-md-0">Meta Keywords</label>
													</div>
													<div className="col-xxl-10 col-md-9">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="row align-items-start mb-3">
													<div className="col-xxl-2 col-md-3">
														<label className="form-label mb-md-0">Meta Description</label>
													</div>
													<div className="col-xxl-10 col-md-9">
														<textarea className="form-control" rows="3"></textarea>
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="row align-items-center mb-3">
													<div className="col-xxl-2 col-md-3">
														<label className="form-label mb-md-0">Canonical Url</label>
													</div>
													<div className="col-xxl-10 col-md-9">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="row align-items-center mb-3">
													<div className="col-xxl-2 col-md-3">
														<label className="form-label mb-md-0">Og Title</label>
													</div>
													<div className="col-xxl-10 col-md-9">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-12">
												<div className="row align-items-start mb-3">
													<div className="col-xxl-2 col-md-3">
														<label className="form-label mb-md-0">Og Description</label>
													</div>
													<div className="col-xxl-10 col-md-9">
														<textarea className="form-control" rows="3"></textarea>
													</div>
												</div>
											</div>
											<div className="col-md-12 d-flex align-items-start">
												<div className="col-xxl-2 col-md-3">
													<label className="form-label mb-md-0">Og Image</label>
												</div>
												<div className="col-xxl-10 col-md-9">
													<div
														className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
														<div
															className="d-flex align-items-center justify-content-center og-upload bg-white rounded border border-dashed me-2 flex-shrink-0 text-dark frames">
															<i className="ti ti-photo text-gray-3 fs-16"></i>
														</div>
														<div className="profile-upload">
															<div className="mb-2">
																<h6 className="mb-1">OG Image</h6>
																<p className="fs-12">Recommended image size is 40px x 40px
																</p>
															</div>
															<div className="profile-uploader d-flex align-items-center">
																<div
																	className="drag-upload-btn btn btn-sm btn-primary me-2">
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

export default SeoSettings;
