import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';


const Appearance = () => {
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
						{ label: 'Appearance', active: true }
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
										className="d-inline-flex align-items-center rounded py-2 px-3">SEO Settings</a>
									<a href="/localization-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">Localization</a>
									<a href="/prefixes"
										className="d-inline-flex align-items-center rounded py-2 px-3">Prefixes</a>
									<a href="/preferences"
										className="d-inline-flex align-items-center rounded py-2 px-3">Preferences</a>
									<a href="/appearance"
										className="d-inline-flex align-items-center rounded active py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Appearance</a>
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
									<h4>Appearance</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row align-items-center">
											<div className="col-xl-3 col-lg-12 col-md-3">
												<div className="setting-info mb-4">
													<h6 className="fs-14 fw-medium">Select Theme</h6>
												</div>
											</div>
											<div className="col-xl-9 col-lg-12 col-md-9">
												<div className="d-flex align-items-center">
													<div className="me-3">
														<div className="card shadow-none border-primary">
															<div className="card-body">
																<a href="#">
																	<div className="border rounded border-gray mb-2">
																		<img src="/assets/img/theme/light.svg"
																			className="img-fluid rounded" alt="theme" />
																	</div>
																	<p className="text-dark text-center">Light</p>
																</a>
															</div>
														</div>
													</div>
													<div className="me-3">
														<div className="card shadow-none">
															<div className="card-body">
																<a href="#">
																	<div className="border rounded border-gray mb-2">
																		<img src="/assets/img/theme/dark.svg"
																			className="img-fluid rounded" alt="theme" />
																	</div>
																	<p className="text-dark text-center">Dark</p>
																</a>
															</div>
														</div>
													</div>
													<div>
														<div className="card shadow-none">
															<div className="card-body">
																<a href="#">
																	<div className="border rounded border-gray mb-2">
																		<img src="/assets/img/theme/automatic.svg"
																			className="img-fluid rounded" alt="theme" />
																	</div>
																	<p className="text-dark text-center">Automatic</p>
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="row align-items-center">
											<div className="col-xl-3 col-lg-12 col-md-3">
												<div className="setting-info mb-4">
													<h6 className="fs-14 fw-medium">Accent Color</h6>
												</div>
											</div>
											<div className="col-xl-4 col-lg-12 col-md-4">
												<div className="theme-colors mb-4">
													<ul className="d-flex align-items-center">
														<li>
															<span className="themecolorset">
																<span className="primecolor bg-primary">
																	<span className="colorcheck text-white"><i
																			className="ti ti-check text-primary fs-10"></i></span>
																</span>
															</span>
														</li>
														<li>
															<span className="themecolorset">
																<span className="primecolor bg-secondary">
																	<span className="colorcheck text-white"><i
																			className="ti ti-check text-primary fs-10"></i></span>
																</span>
															</span>
														</li>
														<li>
															<span className="themecolorset">
																<span className="primecolor bg-info">
																	<span className="colorcheck text-white"><i
																			className="ti ti-check text-primary fs-10"></i></span>
																</span>
															</span>
														</li>
														<li>
															<span className="themecolorset">
																<span className="primecolor bg-purple">
																	<span className="colorcheck text-white"><i
																			className="ti ti-check text-primary fs-10"></i></span>
																</span>
															</span>
														</li>
														<li>
															<span className="themecolorset">
																<span className="primecolor bg-pink">
																	<span className="colorcheck text-white"><i
																			className="ti ti-check text-primary fs-10"></i></span>
																</span>
															</span>
														</li>
														<li>
															<span className="themecolorset">
																<span className="primecolor bg-warning">
																	<span className="colorcheck text-white"><i
																			className="ti ti-check text-primary fs-10"></i></span>
																</span>
															</span>
														</li>
														<li>
															<span className="themecolorset active">
																<span className="primecolor bg-danger">
																	<span className="colorcheck text-white"><i
																			className="ti ti-check text-primary fs-10"></i></span>
																</span>
															</span>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="row align-items-center mb-4">
											<div className="col-xl-3 col-lg-12 col-md-3">
												<div className="">
													<h6 className="fs-14 fw-medium">Sidebar Size</h6>
												</div>
											</div>
											<div className="col-xl-3 col-lg-12 col-md-3">
												<div className="custom-select-wrapper"><CustomSelect className="select">
													<option>Select</option>
													<option>Small - 85px</option>
													<option>Large - 250px</option>
												</CustomSelect></div>
											</div>
										</div>
										<div className="row align-items-center mb-3">
											<div className="col-xl-3 col-lg-12 col-md-3">
												<div className="">
													<h6 className="fs-14 fw-medium">Font Family</h6>
												</div>
											</div>
											<div className="col-xl-3 col-lg-12 col-md-3">
												<div className="custom-select-wrapper"><CustomSelect className="select">
													<option>Select</option>
													<option>Nunito</option>
													<option>Poppins</option>
												</CustomSelect></div>
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

export default Appearance;
