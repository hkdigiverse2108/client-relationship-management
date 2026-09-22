import React, { useState } from 'react';

export default function ClientProjects({ isAccordion }) {
  const [currentPage_clientdetails, setCurrentPage_clientdetails] = useState(1);
  const [rowsPerPage_clientdetails, setRowsPerPage_clientdetails] = useState(10);
  const [searchQuery_clientdetails, setSearchQuery_clientdetails] = useState('');
  if (isAccordion) {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingClientProjects">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientProjects" aria-expanded="false" aria-controls="collapseClientProjects">
            Projects
          </button>
        </h2>
        <div id="collapseClientProjects" className="accordion-collapse collapse" aria-labelledby="headingClientProjects" data-bs-parent="#overviewAccordion">
          <div className="accordion-body pb-0">
            {/* Wrapped accordion content */}
            <div className="accordion accordions-items-seperate">
										<div className="accordion-item">
											
											<div id="primaryBorderOne2"
												className="accordion-collapse collapse show border-top"
												aria-labelledby="headingOne2">
												<div className="accordion-body pb-0">
													<div className="row">
														<div className="col-xxl-6 col-lg-12 col-md-6">
															<div className="card">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center pb-3 mb-3 border-bottom">
																		<a href="/project-details"
																			className="flex-shrink-0 me-2">
																			<img src="/assets/img/social/project-01.svg"
																				alt="Img" />
																		</a>
																		<div>
																			<h6 className="mb-1"><a
																					href="/project-details">Hospital
																					Administration</a></h6>
																			<div className="d-flex align-items-center">
																				<span>8 tasks</span>
																				<span className="mx-1"><i
																						className="ti ti-point-filled text-primary"></i></span>
																				<span>15  Completed</span>
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span
																					className="mb-1 d-block">Deadline</span>
																				<p className="text-dark">31 July 2025</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Value</span>
																				<p className="text-dark">$549987</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Project
																					Lead</span>
																				<h6
																					className="fw-normal d-flex align-items-center">
																					<img className="avatar avatar-xs rounded-circle me-1"
																						src="/assets/img/profiles/avatar-01.jpg"
																						alt="Img" />
																					Leona
																				</h6>
																			</div>
																		</div>
																	</div>
																	<div className="bg-light p-2">
																		<div className="row align-items-center">
																			<div className="col-6">
																				<span
																					className="fw-medium d-flex align-items-center">
																					<i
																						className="ti ti-clock text-primary me-2"></i>Total
																					565 Hrs
																				</span>
																			</div>
																			<div className="col-6">
																				<div>
																					<div
																						className="d-flex align-items-center justify-content-between mb-1">
																						<small className="text-dark">495
																							Hrs</small>
																						<small className="text-dark">70
																							Hrs</small>
																					</div>
																					<div className="progress  progress-xs">
																						<div className="progress-bar bg-warning"
																							role="progressbar"
																							style={{width: '75%'}}></div>
																						<div className="progress-bar bg-success"
																							role="progressbar"
																							style={{width: '25%'}}></div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-xxl-6 col-lg-12 col-md-6">
															<div className="card">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center pb-3 mb-3 border-bottom">
																		<a href="/project-details"
																			className="flex-shrink-0 me-2">
																			<img src="/assets/img/social/project-02.svg"
																				alt="Img" />
																		</a>
																		<div>
																			<h6 className="mb-1"><a
																					href="/project-details">Video
																					Calling App</a></h6>
																			<div className="d-flex align-items-center">
																				<span>22 tasks</span>
																				<span className="mx-1"><i
																						className="ti ti-point-filled text-primary"></i></span>
																				<span>15 Completed</span>
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span
																					className="mb-1 d-block">Deadline</span>
																				<p className="text-dark">16 Jan 2025</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Value</span>
																				<p className="text-dark">$279987</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Project
																					Lead</span>
																				<h6
																					className="fw-normal d-flex align-items-center">
																					<img className="avatar avatar-xs rounded-circle me-1"
																						src="/assets/img/profiles/avatar-02.jpg"
																						alt="Img" />
																					Mathis
																				</h6>
																			</div>
																		</div>
																	</div>
																	<div className="bg-light p-2">
																		<div className="row align-items-center">
																			<div className="col-6">
																				<span
																					className="fw-medium d-flex align-items-center">
																					<i
																						className="ti ti-clock text-primary me-2"></i>Total
																					700 Hrs
																				</span>
																			</div>
																			<div className="col-6">
																				<div>
																					<div
																						className="d-flex align-items-center justify-content-between mb-1">
																						<small className="text-dark">605
																							Hrs</small>
																						<small className="text-dark">95
																							Hrs</small>
																					</div>
																					<div className="progress  progress-xs">
																						<div className="progress-bar bg-warning"
																							role="progressbar"
																							style={{width: '75%'}}></div>
																						<div className="progress-bar bg-success"
																							role="progressbar"
																							style={{width: '25%'}}></div>
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
									</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="accordion accordions-items-seperate">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingProjectsTab">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseProjectsTab" aria-expanded="true" aria-controls="collapseProjectsTab">
              Projects
            </button>
          </h2>
          <div id="collapseProjectsTab" className="accordion-collapse collapse show" aria-labelledby="headingProjectsTab">
											<div id="primaryBorderOne2"
												className="accordion-collapse collapse show border-top"
												aria-labelledby="headingOne2">
												<div className="accordion-body pb-0">
													<div className="row">
														<div className="col-xxl-6 col-lg-12 col-md-6">
															
															<div className="card">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center pb-3 mb-3 border-bottom">
																		<a href="/project-details"
																			className="flex-shrink-0 me-2">
																			<img src="/assets/img/social/project-01.svg"
																				alt="Img" />
																		</a>
																		<div>
																			<h6 className="mb-1"><a
																					href="/project-details">Hospital
																					Administration</a></h6>
																			<div className="d-flex align-items-center">
																				<span>8 tasks</span>
																				<span className="mx-1"><i
																						className="ti ti-point-filled text-primary"></i></span>
																				<span>15  Completed</span>
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span
																					className="mb-1 d-block">Deadline</span>
																				<p className="text-dark">31 July 2025</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Value</span>
																				<p className="text-dark">$549987</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Project
																					Lead</span>
																				<h6
																					className="fw-normal d-flex align-items-center">
																					<img className="avatar avatar-xs rounded-circle me-1"
																						src="/assets/img/profiles/avatar-01.jpg"
																						alt="Img" />
																					Leona
																				</h6>
																			</div>
																		</div>
																	</div>
																	<div className="bg-light p-2">
																		<div className="row align-items-center">
																			<div className="col-6">
																				<span
																					className="fw-medium d-flex align-items-center">
																					<i
																						className="ti ti-clock text-primary me-2"></i>Total
																					565 Hrs
																				</span>
																			</div>
																			<div className="col-6">
																				<div>
																					<div
																						className="d-flex align-items-center justify-content-between mb-1">
																						<small className="text-dark">495
																							Hrs</small>
																						<small className="text-dark">70
																							Hrs</small>
																					</div>
																					<div className="progress  progress-xs">
																						<div className="progress-bar bg-warning"
																							role="progressbar"
																							style={{width: '75%'}}></div>
																						<div className="progress-bar bg-success"
																							role="progressbar"
																							style={{width: '25%'}}></div>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-xxl-6 col-lg-12 col-md-6">
															<div className="card">
																<div className="card-body">
																	<div
																		className="d-flex align-items-center pb-3 mb-3 border-bottom">
																		<a href="/project-details"
																			className="flex-shrink-0 me-2">
																			<img src="/assets/img/social/project-02.svg"
																				alt="Img" />
																		</a>
																		<div>
																			<h6 className="mb-1"><a
																					href="/project-details">Video
																					Calling App</a></h6>
																			<div className="d-flex align-items-center">
																				<span>22 tasks</span>
																				<span className="mx-1"><i
																						className="ti ti-point-filled text-primary"></i></span>
																				<span>15 Completed</span>
																			</div>
																		</div>
																	</div>
																	<div className="row">
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span
																					className="mb-1 d-block">Deadline</span>
																				<p className="text-dark">16 Jan 2025</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Value</span>
																				<p className="text-dark">$279987</p>
																			</div>
																		</div>
																		<div className="col-sm-4">
																			<div className="mb-3">
																				<span className="mb-1 d-block">Project
																					Lead</span>
																				<h6
																					className="fw-normal d-flex align-items-center">
																					<img className="avatar avatar-xs rounded-circle me-1"
																						src="/assets/img/profiles/avatar-02.jpg"
																						alt="Img" />
																					Mathis
																				</h6>
																			</div>
																		</div>
																	</div>
																	<div className="bg-light p-2">
																		<div className="row align-items-center">
																			<div className="col-6">
																				<span
																					className="fw-medium d-flex align-items-center">
																					<i
																						className="ti ti-clock text-primary me-2"></i>Total
																					700 Hrs
																				</span>
																			</div>
																			<div className="col-6">
																				<div>
																					<div
																						className="d-flex align-items-center justify-content-between mb-1">
																						<small className="text-dark">605
																							Hrs</small>
																						<small className="text-dark">95
																							Hrs</small>
																					</div>
																					<div className="progress  progress-xs">
																						<div className="progress-bar bg-warning"
																							role="progressbar"
																							style={{width: '75%'}}></div>
																						<div className="progress-bar bg-success"
																							role="progressbar"
																							style={{width: '25%'}}></div>
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
														</div>
													</div>
											
										
        
       
      
    </>
  );
}
