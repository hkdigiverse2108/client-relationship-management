import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';


const Profile = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Profile"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Pages' },
						{ label: 'Profile', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="card">
					<div className="card-body">
						<div className="border-bottom mb-3 pb-3">
							<h4>Profile </h4>
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
														<p className="fs-12">Recommended image size is 40px x 40px</p>
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
									</div>
								</div>
								<div className="row">
									<div className="col-md-6">
										<div className="row align-items-center mb-3">
											<div className="col-md-4">
												<label className="form-label mb-md-0">First Name</label>
											</div>
											<div className="col-md-8">
												<input type="text" className="form-control" />
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="row align-items-center mb-3">
											<div className="col-md-4">
												<label className="form-label mb-md-0">Last Name</label>
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
												<div>
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
							<div className="border-bottom mb-3">
								<h6 className="mb-3">Change Password</h6>
								<div className="row">
									<div className="col-md-4">
										<div className="row align-items-center mb-3">
											<div className="col-md-5">
												<label className="form-label mb-md-0">Current Password</label>
											</div>
											<div className="col-md-7">
												<div className="pass-group">
													<input type="password" className="pass-input form-control" />
													<span className="ti toggle-password ti-eye-off"></span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-4">
										<div className="row align-items-center mb-3">
											<div className="col-md-5">
												<label className="form-label mb-md-0">New Password</label>
											</div>
											<div className="col-md-7">
												<div className="pass-group">
													<input type="password" className="pass-inputs form-control" />
													<span className="ti toggle-passwords ti-eye-off"></span>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-4">
										<div className="row align-items-center mb-3">
											<div className="col-md-5">
												<label className="form-label mb-md-0">Confirm Password</label>
											</div>
											<div className="col-md-7">
												<div className="pass-group">
													<input type="password" className="pass-inputa form-control" />
													<span className="ti toggle-passworda ti-eye-off"></span>
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
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default Profile;
