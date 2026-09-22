import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';


const ProfileSettings = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'General Settings' },
						{ label: 'Profile Settings', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
					<li className="nav-item">
						<a className="nav-link active" href="/profile-settings"><i
								className="ti ti-settings me-2"></i>General Settings</a>
					</li>
				</ul>
				<div className="row">
					<div className="col-xl-3 theiaStickySidebar">
						<div className="card">
							<div className="card-body">
								<div className="d-flex flex-column list-group settings-list">
									<Link to="/profile-settings"
										className="d-inline-flex align-items-center rounded active py-2 px-3">
										<i className="ti ti-user-circle me-2"></i>Profile Settings
									</Link>
									<Link to="/security-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">
										<i className="ti ti-lock me-2"></i>Security Settings
									</Link>
									<Link to="/notification-settings"
										className="d-inline-flex align-items-center rounded py-2 px-3">
										<i className="ti ti-bell me-2"></i>Notifications
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							<div className="card-body">
								<div className="border-bottom mb-3 pb-3">
									<h4>Profile Settings</h4>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-12">
												<div>
													<h6 className="mb-3">Basic Information</h6>
													<div
														className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
														<div
															className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
															<i className="ti ti-photo text-gray-3 fs-16"></i>
														</div>
														<div className="profile-upload">
															<div className="mb-2">
																<h6 className="mb-1">Profile Photo</h6>
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
										<div className="row">
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Full Name</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Email</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" readOnly defaultValue="user@example.com" />
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
														<label className="form-label mb-md-0">Role</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" readOnly defaultValue="Admin" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Date of Birth</label>
													</div>
													<div className="col-md-8">
														<CustomDatePicker type="text" className="form-control" placeholder="Select Date" isRange={false} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Gender</label>
													</div>
													<div className="col-md-8">
														<div className="custom-select-wrapper">
															<CustomSelect className="select">
																<option>Select Gender</option>
																<option>Male</option>
																<option>Female</option>
															</CustomSelect>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="border-bottom mb-3">
										<h6 className="mb-3">Professional & Location</h6>
										<div className="row">
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Designation</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" placeholder="e.g. Senior Manager" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">City</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">State</label>
													</div>
													<div className="col-md-8">
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
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="border-bottom mb-3">
										<h6 className="mb-3">Financial Details</h6>
										<div className="row">
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Bank Name</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" placeholder="e.g. HDFC Bank" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Account Holder Name</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Account Number</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">IFSC Code</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">PAN Card Number</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" placeholder="ABCDE1234F" maxLength="10" style={{ textTransform: "uppercase" }} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Aadhar Number</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" placeholder="123456789012" maxLength="12" />
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

export default ProfileSettings;
