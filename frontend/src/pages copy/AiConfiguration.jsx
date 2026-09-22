import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';
import CustomSelect from '../components/common/CustomSelect';


const AiConfiguration = () => {
  // Pagination state for aiconfiguration
  const [currentPage_aiconfiguration, setCurrentPage_aiconfiguration] = useState(1);
  const [rowsPerPage_aiconfiguration, setRowsPerPage_aiconfiguration] = useState(10);
  const [searchQuery_aiconfiguration, setSearchQuery_aiconfiguration] = useState('');
  return (
    <>
      <div className="page-wrapper">
            <div className="content">

                {/* Breadcrumb */}
				<PageHeader 
					title="AI Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'AI Center' },
						{ label: 'AI Settings', active: true }
					]}
				>
					<div className="me-2 mb-2">
                            <div className="dropdown">
                                <a href="#" onClick={(e) => e.preventDefault()}
                                    className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                    data-bs-toggle="dropdown">
                                    <i className="ti ti-file-export me-1"></i>Export
                                </a>
                                <ul className="dropdown-menu  dropdown-menu-end p-3">
                                    <li>
                                        <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
                                                className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
                                                className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <a href="#" className="btn btn-primary-gradient mb-2"><i className="ti ti-refresh me-2"></i>Run AI
                            Scan</a>
                        <div className="ms-2 mb-2 head-icons">
                            <a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
                                data-bs-original-title="Collapse" id="collapse-header">
                                <i className="ti ti-chevrons-up"></i>
                            </a>
                        </div>
				</PageHeader>
				{/* /Breadcrumb */}
                {/* Start Content */}

                <div className="customer-item-wrap">
                    <div className="row g-4 justify-content-center">
                        <div className="col-xxl-8">

                            <div className="card">
                                <div className="card-body">


                                    <ul className="nav nav-tabs nav-bordered border-0 nav-bordered-primary">
                                        <li className="nav-item">
                                            <a href="#ai-configuration" data-bs-toggle="tab" aria-expanded="false"
                                                className="nav-link active d-md-inline-block fw-bold">AI Configuration
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#ai-model-settings" data-bs-toggle="tab" aria-expanded="true"
                                                className="nav-link d-md-inline-block fw-bold">AI Model Settings
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#data-training-settings" data-bs-toggle="tab" aria-expanded="false"
                                                className="nav-link d-md-inline-block fw-bold">Data Training Settings
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#ai-permissions" data-bs-toggle="tab" aria-expanded="false"
                                                className="nav-link d-md-inline-block fw-bold">AI Permissions
                                            </a>
                                        </li>
                                    </ul>

                                    <div className="tab-content">
                                        <div className="tab-pane fade" id="ai-model-settings">
                                            <p className="fw-bold text-dark mb-3 mt-3">Model Configuration</p>
                                            {/* Row 1 */}
                                            <div className="border-bottom mb-3">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className="mb-1 fw-medium text-dark">Model Type</label>
                                                        <CustomSelect className="select mb-2">
                                                            <option value="s-1">Select</option>
                                                            <option value="s-2">AI Attendance Insights</option>
                                                            <option value="s-3">AI Payroll Forecast</option>
                                                            <option value="s-4">AI Hiring Forecast</option>
                                                            <option value="s-5">AI Team Performance Insights</option>
                                                        </CustomSelect>
                                                        <p className="fs-13 mb-3 mt-1">Select the AI model to use for
                                                            processing
                                                            requests</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="mb-1 fw-medium text-dark">Maximum Tokens</label>
                                                        <CustomSelect className="select mb-2">
                                                            <option value="s-1">Select</option>
                                                            <option value="s-2">256 Tokens</option>
                                                            <option value="s-3">512 Tokens</option>
                                                            <option value="s-4">1024 Tokens</option>
                                                            <option value="s-5">2048 Tokens</option>
                                                            <option value="s-5">3072 Tokens</option>
                                                        </CustomSelect>
                                                        <p className="fs-13 mt-1">Maximum number of tokens to generate
                                                            (1-4096)
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Row 2 */}
                                            <div className="row">
                                                <p className="fw-bold text-dark mb-2">Advanced Parameters</p>
                                                <div className="col-md-6">
                                                    <label className="mb-1 fw-medium text-dark">Prediction Accuracy
                                                        Level</label>
                                                    <div className="d-flex align-items-center gap-2 mb-3">
                                                        <div className="progress w-100" role="progressbar"
                                                            aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                                            <div className="progress-bar bg-primary" style={{width: '75%'}}>
                                                            </div>
                                                        </div>
                                                        <span className="fw-medium">75%</span>
                                                    </div>
                                                    <p className="fs-13 mt-1">Higher accuracy uses more computational
                                                        resources
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="mb-1 fw-medium text-dark">Response Language</label>
                                                    <CustomSelect className="select mb-2">
                                                        <option value="s-1">Select</option>
                                                        <option value="en">English</option>
                                                        <option value="es">Spanish</option>
                                                        <option value="fr">French</option>
                                                        <option value="de">German</option>
                                                        <option value="it">Italian</option>
                                                    </CustomSelect>
                                                    <p className="fs-13 mt-1">Maximum number of tokens to generate (1-4096)
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="tab-pane fade show active" id="ai-configuration">
                                            {/* Row 1 */}
                                            <div
                                                className="d-flex justify-content-between align-items-center mt-2 py-3 border-bottom">
                                                <div>
                                                    <h6 className="mb-1">Natural Language Processing</h6>
                                                    <p className="mb-0 fs-13">Enable AI-powered text analysis
                                                        and understanding</p>
                                                </div>
                                                <div className="form-check form-switch mb-0 ps-0">
                                                    <input className="form-check-input ms-0" type="checkbox" role="switch"
                                                        checked />
                                                </div>
                                            </div>
                                            {/* Row 2 */}
                                            <div
                                                className="d-flex justify-content-between align-items-center py-3 border-bottom">
                                                <div>
                                                    <h6 className="mb-1">Computer Vision</h6>
                                                    <p className="mb-0 fs-13">Image recognition and visual
                                                        content analysis</p>
                                                </div>
                                                <div className="form-check form-switch mb-0 ps-0">
                                                    <input className="form-check-input ms-0" type="checkbox" role="switch"
                                                        checked />
                                                </div>
                                            </div>
                                            {/* Row 3 */}
                                            <div
                                                className="d-flex justify-content-between align-items-center py-3 border-bottom">
                                                <div>
                                                    <h6 className="mb-1">Content Generation</h6>
                                                    <p className="mb-0 fs-13">Automated content creation and
                                                        text generation</p>
                                                </div>
                                                <div className="form-check form-switch mb-0 ps-0">
                                                    <input className="form-check-input ms-0" type="checkbox" role="switch" />
                                                </div>
                                            </div>
                                            {/* Row 4 */}
                                            <div
                                                className="d-flex justify-content-between align-items-center py-3 border-bottom">
                                                <div>
                                                    <h6 className="mb-1">Predictive Analytics</h6>
                                                    <p className="mb-0 fs-13">Data forecasting and trend
                                                        prediction</p>
                                                </div>
                                                <div className="form-check form-switch mb-0 ps-0">
                                                    <input className="form-check-input ms-0" type="checkbox" role="switch"
                                                        checked />
                                                </div>
                                            </div>
                                            {/* Row 5 */}
                                            <div className="d-flex justify-content-between align-items-center pt-3">
                                                <div>
                                                    <h6 className="mb-1">Recommendation Engine</h6>
                                                    <p className="mb-0 fs-13">Personalized content and product
                                                        recommendations</p>
                                                </div>
                                                <div className="form-check form-switch mb-0 ps-0">
                                                    <input className="form-check-input ms-0" type="checkbox" role="switch" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id="data-training-settings">
                                            <div className="col-md-6 my-3">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <label className="mb-1 text-dark fw-bold">Training
                                                            Configuration</label>
                                                        <p>Configure automatic retraining and data
                                                            quality settings</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-bottom mb-3">
                                                <div className="row mb-3">
                                                    {/* Row 1 */}
                                                    <div className="col-md-6">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <label className="mb-1 text-dark fw-bold">Automatic
                                                                    Retraining</label>
                                                                <p className="fs-13">Automatically retrain models with
                                                                    new data</p>
                                                            </div>
                                                            <div className="form-check form-switch mb-0 ps-0">
                                                                <input className="form-check-input ms-0" type="checkbox"
                                                                    role="switch" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="mb-2 text-dark fw-bold">Retrain Frequency</label>
                                                        <CustomSelect className="select mb-2">
                                                            <option value="s-1">Select</option>
                                                            <option value="s-2">Every 6 Hours</option>
                                                            <option value="s-3">Daily</option>
                                                            <option value="s-4">Weekly</option>
                                                            <option value="s-5">Monthly</option>
                                                            <option value="s-6">Manual Only</option>
                                                        </CustomSelect>
                                                    </div>
                                                </div>
                                                {/* Row 2 */}
                                                <div className="row mb-3">
                                                    <div className="col-md-6">
                                                        <label className="mb-2 text-dark fw-bold">Response Language</label>
                                                        <CustomSelect className="select mb-2">
                                                            <option value="s-1">Select</option>
                                                            <option value="s-2">30 Days</option>
                                                            <option value="s-4">60 Days</option>
                                                            <option value="s-5">90 Days</option>
                                                            <option value="s-6">180 Days</option>
                                                            <option value="s-7">365 Days</option>
                                                            <option value="s-7">Unlimited</option>
                                                        </CustomSelect>
                                                        <p className="fs-13 mt-1">Maximum number of tokens to generate
                                                            (1-4096)
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="mb-2 text-dark fw-bold">Prediction Accuracy
                                                            Level</label>
                                                        <div className="d-flex align-items-center gap-2 mb-3">
                                                            <div className="progress w-100" role="progressbar"
                                                                aria-valuenow="75" aria-valuemin="0"
                                                                aria-valuemax="100">
                                                                <div className="progress-bar bg-primary" style={{width: '75%'}}>
                                                                </div>
                                                            </div>
                                                            <span className="fw-medium">75%</span>
                                                        </div>
                                                        <p className="fs-13 mt-1">Higher accuracy uses more computational
                                                            resources</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <div>
                                                    <label className="mb-1 text-dark fw-bold">Training Datasets</label>
                                                    <p>Manage datasets used for model training
                                                    </p>
                                                </div>
                                                <button type="button" className="btn btn-dark btn-md bg-gradient">
                                                    <i className="ti ti-upload me-1"></i>Update Dataset
                                                </button>
                                            </div>
                                            <div className="card">
                                                <div
                                                    className="card-body d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <p className="text-dark fw-bold mb-1">Customer Interactions
                                                            Dataset
                                                        </p>
                                                        <p className="mb-0 small">
                                                            2.4 GB
                                                            <i className="ti ti-point-filled mx-1 text-danger"></i>
                                                            125 records
                                                            <i className="ti ti-point-filled mx-1 text-danger"></i>
                                                            Updated 2 hours ago
                                                        </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <button className="btn btn-icon">
                                                            <i className="ti ti-refresh"></i>
                                                        </button>
                                                        <button className="btn btn-icon">
                                                            <i className="ti ti-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mb-0">
                                                <div
                                                    className="card-body d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <p className="text-dark fw-bold mb-1">Customer Interactions
                                                            Dataset
                                                        </p>
                                                        <p className="mb-0 small">
                                                            2.4 GB
                                                            <i className="ti ti-point-filled mx-1 text-danger"></i>
                                                            125 records
                                                            <i className="ti ti-point-filled mx-1 text-danger"></i>
                                                            Updated 2 hours ago
                                                        </p>
                                                    </div>
                                                    <div className="d-flex">
                                                        <button className="btn btn-icon">
                                                            <i className="ti ti-refresh"></i>
                                                        </button>
                                                        <button className="btn btn-icon">
                                                            <i className="ti ti-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="tab-pane fade" id="ai-permissions">
                                                <div className="row g-2 align-items-center my-3">

                                                    {/* Search */}
                                                    <div className="col-sm-8">
                                                        <div className="input-group input-group-sm">
                                                            <span className="input-group-text bg-white border-end-0">
                                                                <i className="ti ti-search"></i>
                                                            </span>
                                                            <input type="text"
                                                                className="form-control form-control-sm border-start-0"
                                                                placeholder="Search users..." />
                                                        </div>
                                                    </div>

                                                    {/* Admin Dropdown */}
                                                    <div className="col-sm-2">
                                                        <div className="custom-select-wrapper"><CustomSelect className="select">
                                                            <option>Admin</option>
                                                            <option>HR Manager</option>
                                                            <option>Recruitment Manager</option>
                                                            <option>Payroll Manager</option>
                                                            <option>Leave Manager</option>
                                                            <option>Performance Manager</option>
                                                            <option>Reports Analyst</option>
                                                            <option>Employee</option>
                                                            <option>Client</option>
                                                            <option>Department Head</option>
                                                        </CustomSelect></div>
                                                    </div>

                                                    {/* Add User Button */}
                                                    <div className="col-sm-2">
                                                        <a href="#" data-bs-toggle="modal" data-bs-target="#add_users"
                                                            className="btn btn-dark text-nowrap d-flex align-items-center justify-content-center">
                                                            <i className="ti ti-plus me-1"></i>Add User
                                                        </a>
                                                    </div>

                                                </div>


                                                {/* Table */}
                                                
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<CustomSelect
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_aiconfiguration}
											onChange={(e) => { setRowsPerPage_aiconfiguration(Number(e.target.value)); setCurrentPage_aiconfiguration(1); }}
										>
											<option value={10}>10</option>
											<option value={20}>20</option>
											<option value={50}>50</option>
										</CustomSelect>
									</div>
									<div className="input-icon-start position-relative">
										<span className="input-icon-addon">
											<i className="ti ti-search"></i>
										</span>
										<input
											type="text"
											className="form-control form-control-sm"
											placeholder="Search"
											value={searchQuery_aiconfiguration}
											onChange={(e) => { setSearchQuery_aiconfiguration(e.target.value); setCurrentPage_aiconfiguration(1); }}
										/>
									</div>
								</div>
<div className="table-responsive border rounded">
                                                    <table className="table mb-0 align-middle">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th>User</th>
                                                                <th>AI Config</th>
                                                                <th>Model Settings</th>
                                                                <th>Data Training</th>
                                                                <th>API Access</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <span
                                                                            className="avatar avatar me-2 away avatar-rounded">
                                                                            <img src="/assets/img/avatar/avatar-04.jpg"
                                                                                alt="avatar" />
                                                                        </span>
                                                                        <a href="#" className="text-dark fw-bold">Anthony
                                                                            Lewis</a>
                                                                    </div>
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox"
                                                                        checked />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox" />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox"
                                                                        checked />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox" />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <span
                                                                            className="avatar avatar me-2 away avatar-rounded">
                                                                            <img src="/assets/img/avatar/avatar-05.jpg"
                                                                                alt="avatar" />
                                                                        </span>
                                                                        <a href="#" className="text-dark fw-bold">Brian
                                                                            Villalobos
                                                                        </a>
                                                                    </div>
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox" />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox"
                                                                        checked />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox" />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox" />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <span
                                                                            className="avatar avatar me-2 away avatar-rounded">
                                                                            <img src="/assets/img/avatar/avatar-06.jpg"
                                                                                alt="avatar" />
                                                                        </span>
                                                                        <a href="#" className="text-dark fw-bold">Harvey
                                                                            Smith</a>
                                                                    </div>
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox" />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox" />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox"
                                                                        checked />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox" />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <span
                                                                            className="avatar avatar me-2 away avatar-rounded">
                                                                            <img src="/assets/img/avatar/avatar-07.jpg"
                                                                                alt="avatar" />
                                                                        </span>
                                                                        <a href="#" className="text-dark fw-bold">Doglas
                                                                            Martini</a>
                                                                    </div>
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox"
                                                                        checked />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox" />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox" />
                                                                </td>
                                                                <td><input className="form-check-input" type="checkbox"
                                                                        checked />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_aiconfiguration - 1) * rowsPerPage_aiconfiguration + 1, 11)}-{Math.min(currentPage_aiconfiguration * rowsPerPage_aiconfiguration, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_aiconfiguration === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_aiconfiguration(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_aiconfiguration === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_aiconfiguration(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_aiconfiguration === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_aiconfiguration(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
                                                </div>
                                            </div>

                                                    </div>
                                                </div>
                                        </div> {/* end col */}

                                    </div>{/* end tab-content */}

                                </div>{/* end card-body */}
                            </div>{/* end card */}

                            {/* Footer Buttons */}
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 py-2">
                                <p className="mb-0">Last Updated : 15 May 2026
                                </p>
                                <div className="d-flex gap-2">
                                    <button type="button"
                                        className="btn bg-white-gradient btn-white btn-effect">Cancel</button>
                                    <button type="button" className="btn bg-primary-gradient btn-primary btn-effect">Save
                                        Changes</button>
                                </div>
                            </div>

                        </div>
                    </div>
                
            {/* end content */}


            {/* Start Footer */}
            <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
                <p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
                <p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
            </div>
            {/* End Footer */}

         
    </>
  );
};

export default AiConfiguration;
