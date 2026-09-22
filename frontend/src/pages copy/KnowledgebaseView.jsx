import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const KnowledgebaseView = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Knowledgebase"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Help & Supports' },
						{ label: 'Knowledgebase', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="card">
					<div className="card-body p-3">
						<div className="d-flex align-items-center justify-content-between">
							<h5>Knowledgebase</h5>
							<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
								<div className="me-3">
									<div className="input-icon position-relative">
										<span className="input-icon-addon">
											<i className="ti ti-calendar text-gray-9"></i>
										</span>
										<input type="text" className="form-control date-range bookingrange"
											placeholder="dd/mm/yyyy - dd/mm/yyyy" />
									</div>
								</div>
								<div className="dropdown">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										Sort By : Last 7 Days
									</a>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Recently
												Added</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Ascending</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Descending</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Last Month</a>
										</li>
										<li>
											<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Last 7
												Days</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-xl-8">
						<div className="card">
							<div className="card-body pb-1">
								<div className="d-flex align-items-center mb-3">
									<i className="ti ti-folder text-primary fs-24 me-1"></i>
									<a href="#" className="text-dark fs-16 fw-medium text-truncate">Introduction to HRMS
										<span className="text-primary">( 06 )</span></a>
								</div>
								<div className="col-xl-12">
									<div className="card mb-3">
										<div className="card-body">
											<div className="d-flex align-items-center mb-2 pb-1">
												<i className="ti ti-file me-1"></i>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="text-dark fs-14 fw-medium text-truncate">What is an HRMS and
													Why is it Important? </a>
											</div>
											<div className="ps-3">
												<p className="fs-14 fw-normal mb-1">An HRMS is software that centralizes and
													automates human resource tasks such as payroll, recruitment, and
													employee management. It improves efficiency and reduces
													administrative burden for HR teams.</p>
												<a href="/knowledgebase-details"
													className="text-primary fs-12 fw-medium">Read More</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-12">
									<div className="card mb-3">
										<div className="card-body">
											<div className="d-flex align-items-center mb-2 pb-1">
												<i className="ti ti-file me-1"></i>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="text-dark fs-14 fw-medium text-truncate">The Key Features of
													an HRMS Explained </a>
											</div>
											<div className="ps-3">
												<p className="fs-14 fw-normal mb-1">Key features of an HRMS include employee
													data management, payroll, time tracking, leave management,
													performance reviews, and compliance. These features help streamline
													HR operations.</p>
												<a href="/knowledgebase-details"
													className="text-primary fs-12 fw-medium">Read More</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-12">
									<div className="card mb-3">
										<div className="card-body">
											<div className="d-flex align-items-center mb-2 pb-1">
												<i className="ti ti-file me-1"></i>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="text-dark fs-14 fw-medium text-truncate">How HRMS Helps
													Automate HR Tasks </a>
											</div>
											<div className="ps-3">
												<p className="fs-14 fw-normal mb-1">HRMS automates repetitive tasks like
													payroll processing, attendance tracking, and benefits
													administration, freeing up HR personnel to focus on strategic
													activities. This enhances productivity and accuracy.</p>
												<a href="/knowledgebase-details"
													className="text-primary fs-12 fw-medium">Read More</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-12">
									<div className="card mb-3">
										<div className="card-body">
											<div className="d-flex align-items-center mb-2 pb-1">
												<i className="ti ti-file me-1"></i>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="text-dark fs-14 fw-medium text-truncate">HRMS Terminology : A
													Beginner’s Guide</a>
											</div>
											<div className="ps-3">
												<p className="fs-14 fw-normal mb-1">Common HRMS terms like ESS (Employee
													Self-Service), and MSS (Manager Self-Service) are essential for
													navigating the system effectively. This guide breaks down key terms
													for new users.</p>
												<a href="/knowledgebase-details"
													className="text-primary fs-12 fw-medium">Read More</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-12">
									<div className="card mb-3">
										<div className="card-body">
											<div className="d-flex align-items-center mb-2 pb-1">
												<i className="ti ti-file me-1"></i>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="text-dark fs-14 fw-medium text-truncate">Cloud vs On-Premise
													HRMS vs Hybrid</a>
											</div>
											<div className="ps-3">
												<p className="fs-14 fw-normal mb-1">Cloud HRMS offers flexibility and remote
													access, while on-premise gives full control over data. Hybrid HRMS
													combines both, offering a balance between flexibility and data
													security.</p>
												<a href="/knowledgebase-details"
													className="text-primary fs-12 fw-medium">Read More</a>
											</div>
										</div>
									</div>
								</div>
								<div className="col-xl-12">
									<div className="card mb-3">
										<div className="card-body">
											<div className="d-flex align-items-center mb-2 pb-1">
												<i className="ti ti-file me-1"></i>
												<a href="#" onClick={(e) => e.preventDefault()}
													className="text-dark fs-14 fw-medium text-truncate">Common Challenges
													When Implementing an HRMS</a>
											</div>
											<div className="ps-3">
												<p className="fs-14 fw-normal mb-1">Implementing an HRMS can face challenges
													such as data migration & integration with existing systems. This
													guide covers solutions to overcome these common obstacles for a
													smoother transition.</p>
												<a href="/knowledgebase-details"
													className="text-primary fs-12 fw-medium">Read More</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 theiaStickySidebar">
						<div className="card">
							<div className="card-body pb-1">
								<div className="d-flex align-items-center border-bottom mb-3 pb-3">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-dark fs-16 fw-semibold text-truncate">Categories</a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-folder text-primary fs-16 me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Employee Self-Service (ESS)
										<span className="text-primary">( 10 )</span> </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-folder text-primary fs-16 me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Manager Self-Service (MSS) <span
											className="text-primary">( 12 )</span> </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-folder text-primary fs-16 me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Payroll Management <span
											className="text-primary">( 08 )</span> </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-folder text-primary fs-16 me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Attendance & Time Tracking <span
											className="text-primary">( 07 )</span> </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-folder text-primary fs-16 me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">Leave
										Management <span className="text-primary">( 06 )</span> </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-folder text-primary fs-16 me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Performance Management <span
											className="text-primary">( 13 )</span> </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-folder text-primary fs-16 me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Reports & Analytics <span
											className="text-primary">( 15 )</span> </a>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-body pb-1">
								<div className="d-flex align-items-center border-bottom mb-3 pb-3">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-dark fs-16 fw-semibold text-truncate">Popular Articles</a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">What
										is an HRMS and Why is it Important? </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										view & update your personal information </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Viewing and managing team
										attendance </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How
										Payroll is Processed : A Step-by-Step Guide </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										clock in/out using the hrms portal </a>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="card-body pb-1">
								<div className="d-flex align-items-center border-bottom mb-3 pb-3">
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-dark fs-16 fw-semibold text-truncate">Latest Articles</a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										update & view team’s work schedules </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										clock in/out using the hrms portal </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										Apply for Internal Job Postings in Hrms </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										track your attendance and work hours </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										conduct performance reviews </a>
								</div>
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

export default KnowledgebaseView;
