import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Chart from 'react-apexcharts';
import ReportProgressCard from '../components/common/ReportProgressCard';
import ProjectFormModal from '../components/projects/ProjectFormModal';
import CustomSelect from '../components/common/CustomSelect';
import ProjectReportTable from '../components/projects/ProjectReportTable';
import ImageChart from '../components/charts/ImageChart';


const ProjectReport = () => {
  const [statusFilter, setStatusFilter] = useState({ value: 'all', label: 'All Status' });
  const [stageFilter, setStageFilter] = useState({ value: 'all', label: 'All Stages' });

  const projectReportOptions = {
    series: [30000, 10000, 20000, 40000],
    labels: ['NovaCorp', 'BlueSky', 'Acme Inc', 'GlobalTech'],
    chart: {
      type: 'pie',
      height: 200,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹" + val.toLocaleString();
        }
      }
    },
    colors: ['#03C9D7', '#8E24AA', '#FFC107', '#28C76F'],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    stroke: {
      show: true,
      colors: 'transparent'
    }
  };

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Project Performance Analytics"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Projects' },
						{ label: 'Project Report', active: true }
					]}
				>
					<div className="d-flex align-items-center flex-wrap gap-2">
						<div className="input-icon position-relative">
							<span className="input-icon-addon"><i className="ti ti-search"></i></span>
							<input type="text" className="form-control" placeholder="Search Project..." />
						</div>
						<div className="custom-select-wrapper">
							<CustomSelect className="select" value={statusFilter} onChange={setStatusFilter}>
								<option value="all">All Status</option>
								<option value="active">Active</option>
								<option value="completed">Completed</option>
								<option value="onhold">On Hold</option>
								<option value="cancelled">Cancelled</option>
							</CustomSelect>
						</div>
						<div className="custom-select-wrapper">
							<CustomSelect className="select" value={stageFilter} onChange={setStageFilter}>
								<option value="all">All Stages</option>
								<option value="new">New</option>
								<option value="inprogress">In Progress</option>
								<option value="inreview">In Review</option>
								<option value="onhold">On Hold</option>
								<option value="completed">Completed</option>
							</CustomSelect>
						</div>
						<a href="#" onClick={(e) => { e.preventDefault(); setIsProjectModalOpen(true); }} className="btn btn-primary d-flex align-items-center">
							<i className="ti ti-circle-plus me-2"></i>New Project
						</a>
					</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">

					{/* Total Exponses */}
					<div className="col-lg-6 col-md-6 d-flex">
						<div className="row flex-fill">
							<ReportProgressCard 
								title="Total Projects"
								value="300"
								progressBarColor="pink"
								progressPercent={70}
								trendIcon="ti-arrow-wave-right-up"
								trendColor="success"
								trendValue="+10.54%"
								trendText="from last month"
							/>
							<ReportProgressCard 
								title="Completed Projects"
								value="250"
								progressBarColor="success"
								progressPercent={80}
								trendIcon="ti-arrow-wave-right-up"
								trendColor="success"
								trendValue="+12.84%"
								trendText="from last month"
							/>
							<ReportProgressCard 
								title="Pending Projects"
								value="50"
								progressBarColor="danger"
								progressPercent={20}
								trendIcon="ti-arrow-wave-right-up"
								trendColor="danger"
								trendValue="-10.75%"
								trendText="from last month"
							/>
							<ReportProgressCard 
								title="Overdue Projects"
								value="30"
								progressBarColor="purple"
								progressPercent={60}
								trendIcon="ti-arrow-wave-right-up"
								trendColor="danger"
								trendValue="+15.74%"
								trendText="from last month"
							/>
						</div>
					</div>
					{/* /Total Exponses */}

					{/* Total Exponses */}
					<div className="col-lg-6 col-md-6 d-flex">
						<div className="card flex-fill">
							
							<div className="card-header border-0">
								<div className="d-flex flex-wrap justify-content-between align-items-center">
									<div className="d-flex align-items-center ">
										<span className="me-2"><i className="ti ti-chart-pie text-danger"></i></span>
										<h5>Revenue by Client</h5>
									</div>
									<div className="dropdown">
										<Link to="#"
											className="dropdown-toggle btn btn-sm fs-12 btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											This Year
										</Link>
										<ul className="dropdown-menu  dropdown-menu-end p-2">
											<li>
												<Link to="#"
													className="dropdown-item rounded-1">This Year</Link>
											</li>
											<li>
												<Link to="#"
													className="dropdown-item rounded-1">Last Year</Link>
											</li>
											<li>
												<Link to="#"
													className="dropdown-item rounded-1">Last 3 Years</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body pt-0">
								<div className="row align-items-center">
									<div className="col-md-6 d-flex justify-content-center">
										<Chart options={projectReportOptions} series={projectReportOptions.series} type="pie" height={250} />
									</div>
									<div className="col-md-6">
										<div className="row gy-4">
											<div className="col-md-6">
												<p className="fs-16 project-report-badge-blue fw-normal mb-0 text-gray-5">
													NovaCorp </p>
												<p className="fs-20 fw-bold text-dark ">₹30,000 <span className="fs-14 text-muted fw-normal">(30%)</span></p>
											</div>
											<div className="col-md-6">
												<p
													className="fs-16 project-report-badge-purple mb-0  fw-normal text-gray-5">
													BlueSky</p>
												<p className="fs-20 fw-bold text-dark ">₹10,000 <span className="fs-14 text-muted fw-normal">(10%)</span></p>
											</div>
											<div className="col-md-6">
												<p
													className="fs-16 project-report-badge-warning  mb-0 fw-normal text-gray-5">
													Acme Inc </p>
												<p className="fs-20 fw-bold text-dark ">₹20,000 <span className="fs-14 text-muted fw-normal">(20%)</span></p>
											</div>
											<div className="col-md-6">
												<p
													className="fs-16 project-report-badge-success  mb-0 fw-normal text-gray-5">
													GlobalTech</p>
												<p className="fs-20 fw-bold text-dark ">₹40,000 <span className="fs-14 text-muted fw-normal">(40%)</span></p>
											</div>
										</div>
									</div>
								</div>


							</div>
						</div>
					</div>
					{/* /Total Exponses */}


				</div>

				<div className="row">
					{/* Team Workload Distribution */}
					<div className="col-lg-8 col-md-12 d-flex">
						<div className="card flex-fill">
							<div className="card-header border-0 pb-0">
								<div className="d-flex align-items-center">
									<span className="me-2"><i className="ti ti-users text-primary fs-18"></i></span>
									<h5>Team Workload Distribution</h5>
								</div>
							</div>
							<div className="card-body">
								<ImageChart id="workloadChart" />
							</div>
						</div>
					</div>
					{/* /Team Workload Distribution */}

					{/* Overdue Project Summary */}
					<div className="col-lg-4 col-md-12 d-flex">
						<div className="card flex-fill">
							<div className="card-header border-0 pb-0">
								<div className="d-flex align-items-center">
									<span className="me-2"><i className="ti ti-alert-triangle text-danger fs-18"></i></span>
									<h5>Overdue Project Summary</h5>
								</div>
							</div>
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
									<div>
										<h2 className="fw-bold text-danger mb-1">12</h2>
										<p className="fs-14 text-muted mb-0">Total Overdue Projects</p>
									</div>
									<div className="avatar avatar-lg bg-danger-transparent rounded-circle">
										<i className="ti ti-clock-hour-4 text-danger fs-24"></i>
									</div>
								</div>
								
								<div className="mt-4">
									<h6 className="fw-medium mb-3 text-gray-9">Critical Overdue</h6>
									
									<div className="overdue-scroll" style={{ maxHeight: '220px', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
										<style>{`.overdue-scroll::-webkit-scrollbar { display: none; }`}</style>
										<div className="mb-3 border p-3 rounded bg-light">
										<div className="d-flex align-items-center justify-content-between mb-2">
											<h6 className="fs-14 fw-semibold text-dark mb-0">E-commerce App</h6>
											<span className="badge badge-danger-transparent text-danger">15 Days Overdue</span>
										</div>
										<div className="d-flex justify-content-between text-muted fs-13 mt-2">
											<span><i className="ti ti-user-circle me-1"></i>NovaCorp</span>
											<span><i className="ti ti-calendar me-1"></i>01 Sep 2024</span>
										</div>
										<div className="mt-2 pt-2 border-top">
											<span className="badge badge-warning-transparent"><i className="ti ti-point-filled me-1"></i>In Progress</span>
										</div>
									</div>

									<div className="mb-3 border p-3 rounded bg-light">
										<div className="d-flex align-items-center justify-content-between mb-2">
											<h6 className="fs-14 fw-semibold text-dark mb-0">CRM Integration</h6>
											<span className="badge badge-danger-transparent text-danger">8 Days Overdue</span>
										</div>
										<div className="d-flex justify-content-between text-muted fs-13 mt-2">
											<span><i className="ti ti-user-circle me-1"></i>BlueSky</span>
											<span><i className="ti ti-calendar me-1"></i>08 Sep 2024</span>
										</div>
										<div className="mt-2 pt-2 border-top">
											<span className="badge badge-primary-transparent"><i className="ti ti-point-filled me-1"></i>In Review</span>
										</div>
									</div>

									<div className="border p-3 rounded bg-light">
										<div className="d-flex align-items-center justify-content-between mb-2">
											<h6 className="fs-14 fw-semibold text-dark mb-0">Website Redesign</h6>
											<span className="badge badge-warning-transparent text-warning">3 Days Overdue</span>
										</div>
										<div className="d-flex justify-content-between text-muted fs-13 mt-2">
											<span><i className="ti ti-user-circle me-1"></i>Acme Inc</span>
											<span><i className="ti ti-calendar me-1"></i>13 Sep 2024</span>
										</div>
										<div className="mt-2 pt-2 border-top">
											<span className="badge badge-secondary-transparent"><i className="ti ti-point-filled me-1"></i>On Hold</span>
										</div>
									</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* /Overdue Project Summary */}
				</div>

				<ProjectReportTable />
			</div>
		</div>

		<ProjectFormModal open={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />
    </>
  );
};

export default ProjectReport;
