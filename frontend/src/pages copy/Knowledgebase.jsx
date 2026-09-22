import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Knowledgebase = () => {
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
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<i className="ti ti-folder text-primary fs-24 me-1"></i>
									<a href="/knowledgebase-view"
										className="text-dark fs-16 fw-medium text-truncate">Introduction to HRMS <span
											className="text-primary">( 06 )</span></a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">What
										is an HRMS and Why is it Important? </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">The
										Key Features of an HRMS Explained </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How
										HRMS Helps Automate HR Tasks </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">HRMS
										Terminology : A Beginner’s Guide </a>
								</div>
								<div className="d-flex align-items-center">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">Cloud
										vs On-Premise HRMS vs Hybrid </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<i className="ti ti-folder text-primary fs-24 me-1"></i>
									<a href="/knowledgebase-view"
										className="text-dark fs-16 fw-medium text-truncate">Employee Self-Service (ESS)
										<span className="text-primary">( 10 )</span></a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										view & update your personal information </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">Steps
										to Apply for Leave via the Employee Portal </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										access and download your payslips </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Submitting & Tracking Expense
										Reimbursements </a>
								</div>
								<div className="d-flex align-items-center">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										track your attendance and work hours </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<i className="ti ti-folder text-primary fs-24 me-1"></i>
									<a href="/knowledgebase-view"
										className="text-dark fs-16 fw-medium text-truncate">Manager Self-Service (MSS) <span
											className="text-primary">( 12 )</span></a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										Approve or Reject Employee Requests </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Viewing and managing team
										attendance </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										conduct performance reviews </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Approving expense claims for
										your team </a>
								</div>
								<div className="d-flex align-items-center">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										update & view team’s work schedules </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<i className="ti ti-folder text-primary fs-24 me-1"></i>
									<a href="/knowledgebase-view"
										className="text-dark fs-16 fw-medium text-truncate">Payroll Management <span
											className="text-primary">( 08 )</span></a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How
										Payroll is Processed : A Step-by-Step Guide </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Deductions, Overtime, and
										Bonuses </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">What
										to Do if There’s a Payroll Discrepancy </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										Access Historical Payroll Information </a>
								</div>
								<div className="d-flex align-items-center">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Managing Employee Tax
										Information and Filing </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<i className="ti ti-folder text-primary fs-24 me-1"></i>
									<a href="/knowledgebase-view"
										className="text-dark fs-16 fw-medium text-truncate">Attendance & Time Tracking <span
											className="text-primary">( 07 )</span></a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										clock in/out using the hrms portal </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Submitting timesheets for
										approval </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Tracking overtime & managing
										work hours in hrms </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										view and manage shifts and schedules </a>
								</div>
								<div className="d-flex align-items-center">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Generating attendance reports
										for your team </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<i className="ti ti-folder text-primary fs-24 me-1"></i>
									<a href="/knowledgebase-view"
										className="text-dark fs-16 fw-medium text-truncate">Leave Management <span
											className="text-primary">( 06 )</span></a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										Request Casual or Medical Leave </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How
										Leave Balances Are Calculated in Hrms </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">Leave
										Approval Workflow : Guide for Managers </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Viewing Your Leave History &
										Pending Requests </a>
								</div>
								<div className="d-flex align-items-center">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Understanding Different Types of
										Leaves </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<i className="ti ti-folder text-primary fs-24 me-1"></i>
									<a href="/knowledgebase-view"
										className="text-dark fs-16 fw-medium text-truncate">Recruitment & Onboarding <span
											className="text-primary">( 10 )</span></a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										Apply for Internal Job Postings in Hrms </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Creating & Posting Job Openings
										as a Recruiter </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Tracking Applicants and
										Scheduling Interviews </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										Complete New Hire Onboarding Process </a>
								</div>
								<div className="d-flex align-items-center">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Uploading & Verifying New
										Employee Documents </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<i className="ti ti-folder text-primary fs-24 me-1"></i>
									<a href="/knowledgebase-view"
										className="text-dark fs-16 fw-medium text-truncate">Performance Management <span
											className="text-primary">( 13 )</span></a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Setting and Tracking Your
										Employee Goals </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Conducting 360-degree Feedback
										in Hrms </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										Complete a Performance Review </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										Update Employee Development Plans </a>
								</div>
								<div className="d-flex align-items-center">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Generating Performance Reports
										and Metrics </a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-md-6">
						<div className="card">
							<div className="card-body">
								<div className="d-flex align-items-center mb-3">
									<i className="ti ti-folder text-primary fs-24 me-1"></i>
									<a href="/knowledgebase-view"
										className="text-dark fs-16 fw-medium text-truncate">Reports & Analytics <span
											className="text-primary">( 15 )</span></a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										Generate Employee Attendance Reports </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Creating Custom Payroll Reports
									</a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Analyzing Workforce Metrics in
										Hrms </a>
								</div>
								<div className="d-flex align-items-center mb-2 pb-1">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()} className="text-gray fs-14 fw-normal text-truncate">How to
										Track Performance Metrics and KPIs </a>
								</div>
								<div className="d-flex align-items-center">
									<i className="ti ti-file me-1"></i>
									<a href="#" onClick={(e) => e.preventDefault()}
										className="text-gray fs-14 fw-normal text-truncate">Viewing and Analyzing
										Compensation </a>
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

export default Knowledgebase;
