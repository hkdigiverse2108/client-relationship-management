import React from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Timeline = () => {
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Timeline"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Pages' },
						{ label: 'Timeline', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}


				<div className="card">
					<div className="card-body schedule-timeline">
						<div className="d-flex align-items-center">
							<div className="d-flex align-items-center active-time">
								<span className="timeline-date text-dark">24 Sep 2024</span>
								<span className="timeline-border d-flex align-items-center justify-content-center bg-white">
									<i className="ti ti-point-filled text-gray-2 fs-18"></i>
								</span>
							</div>
							<div className="flex-fill ps-3 pb-4 timeline-hrline">
								<div className="mt-4">
									<p className="fw-medium text-gray-9 mb-1">Documentation</p>
									<span>Document system processes, policies, and procedures.</span>
								</div>
							</div>
						</div>
						<div className="d-flex align-items-center">
							<div className="d-flex align-items-center active-time">
								<span className="timeline-date text-dark">20 Sep 2024</span>
								<span className="timeline-border d-flex align-items-center justify-content-center bg-white">
									<i className="ti ti-point-filled text-gray-2 fs-18"></i>
								</span>
							</div>
							<div className="flex-fill ps-3 pb-4 timeline-hrline">
								<div className="mt-4">
									<p className="fw-medium text-gray-9 mb-1">Testing and Quality Assurance</p>
									<span> Perform unit testing, integration testing, and user acceptance testing</span>
								</div>
							</div>
						</div>
						<div className="d-flex align-items-center">
							<div className="d-flex align-items-center active-time">
								<span className="timeline-date text-dark">10 Sep 2024</span>
								<span className="timeline-border d-flex align-items-center justify-content-center bg-white">
									<i className="ti ti-point-filled text-gray-2 fs-18"></i>
								</span>
							</div>
							<div className="flex-fill ps-3 pb-4 timeline-hrline">
								<div className="mt-4">
									<p className="fw-medium text-gray-9 mb-1"> System Design and Configuration</p>
									<span>Set up modules, workflows, and user roles</span>
								</div>
							</div>
						</div>
						<div className="d-flex align-items-center">
							<div className="d-flex align-items-center active-time">
								<span className="timeline-date text-dark">02 Sep 2024</span>
								<span className="timeline-border d-flex align-items-center justify-content-center bg-white">
									<i className="ti ti-point-filled text-gray-2 fs-18"></i>
								</span>
							</div>
							<div className="flex-fill ps-3 pb-4 timeline-hrline">
								<div className="mt-4">
									<p className="fw-medium text-gray-9 mb-1">Requirements Gathering</p>
									<span> Collect requirements from HR, IT, and end-users.</span>
								</div>
							</div>
						</div>
						<div className="d-flex align-items-center">
							<div className="d-flex align-items-center active-time">
								<span className="timeline-date text-dark">01 Sep 2024</span>
								<span className="timeline-border d-flex align-items-center justify-content-center bg-white">
									<i className="ti ti-point-filled text-gray-2 fs-18"></i>
								</span>
							</div>
							<div className="flex-fill ps-3 pb-4 timeline-hrline">
								<div className="mt-4">
									<p className="fw-medium text-gray-9 mb-1">Planning and Preparation</p>
									<span>Identify objectives, deliverables, and stakeholders.</span>
								</div>
							</div>
						</div>
						<div className="d-flex align-items-center">
							<div className="flex-fill ps-3 pb-0 timeline-hrline"></div>
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

export default Timeline;
