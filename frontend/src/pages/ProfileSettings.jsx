import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../config/appConfig';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: null,
    gender: '',
    designation: '',
    city: '',
    state: '',
    country: '',
    bank_name: '',
    account_holder_name: '',
    account_number: '',
    ifsc_code: '',
    pan_number: '',
    aadhar_number: ''
  });
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const fileInputRef = useRef(null);
  
  // Use environment variable or default to localhost:8000 for images
  const backendUrl = import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get('/users/me/profile');
        if (res) {
          setFormData({
            name: res.name || '',
            phone: res.phone || '',
            dob: res.dob ? new Date(res.dob) : null,
            gender: res.gender || '',
            designation: res.designation || '',
            city: res.city || '',
            state: res.state || '',
            country: res.country || '',
            bank_name: res.bank_name || '',
            account_holder_name: res.account_holder_name || '',
            account_number: res.account_number || '',
            ifsc_code: res.ifsc_code || '',
            pan_number: res.pan_number || '',
            aadhar_number: res.aadhar_number || ''
          });
          setEmail(res.email || '');
          setRole(res.role || '');
          setProfilePhoto(res.profile_photo || '');
        }
      } catch (error) {
        toast.error('Failed to load profile data');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (selected) => {
    setFormData(prev => ({ ...prev, gender: selected ? selected.value : '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (payload.dob) {
        payload.dob = payload.dob.toISOString();
      }
      const res = await axiosClient.patch('/users/me/profile', payload);
      toast.success('Profile updated successfully');
      
      const user = storage.get(STORAGE_KEYS.user) || {};
      storage.set(STORAGE_KEYS.user, { ...user, name: res.name });
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to update profile');
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPG, PNG, WEBP)');
      return;
    }
    
    const formPayload = new FormData();
    formPayload.append('file', file);
    
    try {
      const res = await axiosClient.post('/users/me/photo', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfilePhoto(res.profile_photo);
      toast.success('Profile photo updated');
      
      const user = storage.get(STORAGE_KEYS.user) || {};
      storage.set(STORAGE_KEYS.user, { ...user, profile_photo: res.profile_photo });
    } catch (error) {
      toast.error('Failed to upload photo');
    }
  };

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
								<form onSubmit={handleSubmit}>
									<div className="border-bottom mb-3">
										<div className="row">
											<div className="col-md-12">
												<div>
													<h6 className="mb-3">Basic Information</h6>
													<div
														className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
														<div
															className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
															{profilePhoto ? (
																<img src={profilePhoto.startsWith('http') ? profilePhoto : `${backendUrl}${profilePhoto}`} alt="Profile" className="img-fluid rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
															) : (
																<i className="ti ti-photo text-gray-3 fs-16"></i>
															)}
														</div>
														<div className="profile-upload">
															<div className="mb-2">
																<h6 className="mb-1">Profile Photo</h6>
																<p className="fs-12">Recommended image size is 40px x 40px
																</p>
															</div>
															<div className="profile-uploader d-flex align-items-center">
																<div
																	className="drag-upload-btn btn btn-sm btn-primary me-2" onClick={() => fileInputRef.current.click()}>
																	Upload
																	<input type="file" className="d-none" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" />
																</div>
																<button type="button" onClick={() => { setProfilePhoto(''); }}
																	className="btn btn-light btn-sm">Cancel</button>
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
														<input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Email</label>
													</div>
													<div className="col-md-8">
														<input type="email" className="form-control" readOnly value={email} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Phone</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Role</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" readOnly value={role} style={{ textTransform: 'capitalize' }} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Date of Birth</label>
													</div>
													<div className="col-md-8">
														<CustomDatePicker 
															selected={formData.dob} 
															onChange={(date) => setFormData(prev => ({ ...prev, dob: date }))} 
															className="form-control" 
															placeholderText="Select Date" 
														/>
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
															<CustomSelect 
																className="select" 
																value={formData.gender ? { value: formData.gender, label: formData.gender } : null}
																onChange={handleGenderChange}
																options={[
																	{ value: 'Male', label: 'Male' },
																	{ value: 'Female', label: 'Female' },
																	{ value: 'Other', label: 'Other' }
																]}
															/>
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
														<input type="text" className="form-control" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Senior Manager" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">City</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">State</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Country</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" name="country" value={formData.country} onChange={handleChange} />
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
														<input type="text" className="form-control" name="bank_name" value={formData.bank_name} onChange={handleChange} placeholder="e.g. HDFC Bank" />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Account Holder Name</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" name="account_holder_name" value={formData.account_holder_name} onChange={handleChange} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Account Number</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" name="account_number" value={formData.account_number} onChange={handleChange} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">IFSC Code</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" name="ifsc_code" value={formData.ifsc_code} onChange={handleChange} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">PAN Card Number</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" name="pan_number" value={formData.pan_number} onChange={handleChange} placeholder="ABCDE1234F" maxLength="10" style={{ textTransform: "uppercase" }} />
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="row align-items-center mb-3">
													<div className="col-md-4">
														<label className="form-label mb-md-0">Aadhar Number</label>
													</div>
													<div className="col-md-8">
														<input type="text" className="form-control" name="aadhar_number" value={formData.aadhar_number} onChange={handleChange} placeholder="123456789012" maxLength="12" />
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
