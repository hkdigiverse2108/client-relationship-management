import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';import PageHeader from '../components/common/PageHeader';


const LearningAnalytics = () => {
  const [currentPage_learninganalytics, setCurrentPage_learninganalytics] = useState(1);
  const [rowsPerPage_learninganalytics, setRowsPerPage_learninganalytics] = useState(10);
  const [searchQuery_learninganalytics, setSearchQuery_learninganalytics] = useState('');

  const learnEmployeeOptions = {
    series: [{
      name: 'Inprogress',
      type: 'column',
      data: [50, 70, 60, 180, 120, 90, 140, 100, 130, 100, 90, 70]
    }, {
      name: 'Completed',
      type: 'column',
      data: [90, 130, 170, 270, 150, 130, 180, 150, 200, 280, 240, 310]
    }, {
      name: 'Total Employees',
      type: 'line',
      data: [140, 200, 260, 470, 310, 260, 370, 340, 370, 420, 350, 430]
    }],
    chart: {
      height: 350,
      type: 'line',
      stacked: true,
      toolbar: { show: false }
    },
    stroke: {
      width: [0, 0, 3],
      curve: 'smooth'
    },
    plotOptions: {
      bar: { columnWidth: '50%' }
    },
    colors: ['#FF8A65', '#264653', '#FFCA28'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    markers: {
      size: 4,
      colors: ["#FFCA28"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 7 }
    },
    legend: { position: 'bottom' }
  };

  const certificationChartOptions = {
    series: [{
      name: 'Certifications',
      data: [20, 40, 25, 60, 30, 70, 40, 50, 30]
    }],
    chart: {
      type: 'area',
      height: 150,
      sparkline: { enabled: true },
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: ['#FF7043'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100]
      }
    }
  };

  const enrollCourseOptions = {
    series: [{
      data: [50, 55, 45, 15, 40, 20]
    }],
    chart: {
      type: 'bar',
      height: 250,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '30%',
      }
    },
    dataLabels: { enabled: false },
    colors: ['#F2711C'],
    xaxis: {
      categories: ['Git', 'HTML', 'Nodejs', 'MySQL', 'React', 'Java'],
    }
  };

  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Learning Analytics"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Training' },
						{ label: 'Learning Analytics', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">

					{/* Total Exponses */}
					<div className="col-xxl-5 col-lg-12 col-md-12 d-flex">
						<div className="card flex-fill">
							
							<div className="card-header border-0">
								<div className="d-flex flex-wrap justify-content-between align-items-center">
									<div className="d-flex align-items-center ">
										<h5>Learning Employees</h5>
									</div>
									<div className="dropdown">
										<Link to="#"
											className="btn btn-white border d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1"></i>2025
										</Link>
										<ul className="dropdown-menu  dropdown-menu-end p-3">
											<li>
												<Link to="#" className="dropdown-item rounded-1">2024</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">2023</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">2022</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body py-0">
								<ReactApexChart options={learnEmployeeOptions} series={learnEmployeeOptions.series} type="line" height={350} />
							</div>
						</div>
					</div>
					{/* /Total Exponses */}

					{/* Total Exponses */}
					<div className="col-xxl-7 col-lg-12 col-md-12 d-flex">
						<div className="row flex-fill">
							<div className="col-lg-5 col-md-6 d-flex">
								<div className="card flex-fill">
							
							<div className="card-body pb-0">
										<div className="d-flex flex-column align-items-center">
											<div
												className="p-2 rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-2">
												<i className="ti ti-certificate fs-22"></i>
											</div>
											<p className="fw-semibold text-dark mb-1">Certification Completed</p>
											<div className="fw-bold text-dark fs-24 mb-1">225</div>
											<span
												className="badge badge-soft-success rounded-pill border border-success mb-1"><i
													className="ti ti-arrow-up"></i>12%</span>
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate">from last
												month</p>
										</div>
										<ReactApexChart options={certificationChartOptions} series={certificationChartOptions.series} type="area" height={150} />
									</div>
								</div>
							</div>
							<div className="col-lg-7 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-header border-0 pb-2 d-flex align-items-center justify-content-between flex-wrap">
										<h5 className="mb-2">Highly Enrolled Courses</h5>
										<div className="dropdown mb-2">
											<Link to="#"
												className="btn btn-white border btn-md d-inline-flex align-items-center"
												data-bs-toggle="dropdown">
												<i className="ti ti-calendar me-1"></i>2025
											</Link>
											<ul className="dropdown-menu  dropdown-menu-end p-3">
												<li>
													<Link to="#" className="dropdown-item rounded-1">This Month</Link>
												</li>
												<li>
													<Link to="#" className="dropdown-item rounded-1">This Week</Link>
												</li>
												<li>
													<Link to="#" className="dropdown-item rounded-1">Last Week</Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="card-body pt-0">
										<ReactApexChart options={enrollCourseOptions} series={enrollCourseOptions.series} type="bar" height={250} />
										<div>
											<p className="mb-0"><i className="ti ti-point-filled me-1 text-info"></i>No of Employees
												increased by <span className="text-success">+20%</span> from last Week
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
					{/* /Total Exponses */}


				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Learning Employee List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="dropdown">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Sort By : Last 7 Days
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Recently Added</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Ascending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Descending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Last Month</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Last 7 Days</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
							<div className="card-body p-0">
						
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_learninganalytics}
											onChange={(e) => { setRowsPerPage_learninganalytics(Number(e.target.value)); setCurrentPage_learninganalytics(1); }}
										>
											<option value={10}>10</option>
											<option value={20}>20</option>
											<option value={50}>50</option>
										</select>
									</div>
									<div className="input-icon-start position-relative">
										<span className="input-icon-addon">
											<i className="ti ti-search"></i>
										</span>
										<input
											type="text"
											className="form-control form-control-sm"
											placeholder="Search"
											value={searchQuery_learninganalytics}
											onChange={(e) => { setSearchQuery_learninganalytics(e.target.value); setCurrentPage_learninganalytics(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
							<table className="table datatable">
								<thead className="thead-light">
									<tr>
										<th className="no-sort">
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" id="select-all" />
											</div>
										</th>
										<th>Employee Name</th>
										<th>Designation</th>
										<th>Training Course</th>
										<th>Status</th>
										<th>Score(%)</th>
										<th>Completion Date</th>
										<th>Feedback</th>
										<th>Attempts</th>
										<th>Certificate</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-11.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Anthony Lewis</a>
												</div>
											</div>
										</td>
										<td>Accountant</td>
										<td>
											<p className="fw-medium text-dark mb-0">Git Training</p>
										</td>
										<td><span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">Completed</span>
										</td>
										<td>80</td>
										<td>14 Jun 2025</td>
										<td>Good</td>
										<td>01</td>
										<td><span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Issued
											</span></td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-13.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Brian Villalobos</a>
												</div>
											</div>
										</td>
										<td>App Developer</td>
										<td>
											<p className="fw-medium text-dark mb-0">HTML Training</p>
										</td>
										<td><span
												className="badge badge-info-transparent d-inline-flex align-items-center badge-xs">In
												Progress</span></td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>
											-
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-12.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Harvey Smith</a>
												</div>
											</div>
										</td>
										<td>Technician</td>
										<td>
											<p className="fw-medium text-dark mb-0">React Training</p>
										</td>
										<td><span
												className="badge badge-purple-transparent d-inline-flex align-items-center badge-xs">Not
												Started</span></td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>
											-
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-16.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Stephan Peralt</a>
												</div>
											</div>
										</td>
										<td>Web Developer</td>
										<td>
											<p className="fw-medium text-dark mb-0">Nodejs Training</p>
										</td>
										<td><span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">Completed</span>
										</td>
										<td>90</td>
										<td>28 Apr 2025</td>
										<td>Excellent</td>
										<td>02</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Issued
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-15.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Doglas Martini</a>
												</div>
											</div>
										</td>
										<td>Sales Executive Officer</td>
										<td>
											<p className="fw-medium text-dark mb-0">Django Training</p>
										</td>
										<td><span
												className="badge badge-purple-transparent d-inline-flex align-items-center badge-xs">Not
												Started</span></td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>
											-
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-14.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Linda Ray</a>
												</div>
											</div>
										</td>
										<td>Designer</td>
										<td>
											<p className="fw-medium text-dark mb-0">Java Training</p>
										</td>
										<td><span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">Completed</span>
										</td>
										<td>85</td>
										<td>20 Mar 2025</td>
										<td>Excellent</td>
										<td>01</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Issued
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-17.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Elliot Murray</a>
												</div>
											</div>
										</td>
										<td>Account Manager</td>
										<td>
											<p className="fw-medium text-dark mb-0">MySQL Training</p>
										</td>
										<td><span
												className="badge badge-purple-transparent d-inline-flex align-items-center badge-xs">Not
												Started</span></td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>
											-
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-18.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Rebecca Smtih</a>
												</div>
											</div>
										</td>
										<td>SEO Analyst</td>
										<td>
											<p className="fw-medium text-dark mb-0">DevOps Training</p>
										</td>
										<td><span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">Completed</span>
										</td>
										<td>70</td>
										<td>17 Feb 2025</td>
										<td>Good</td>
										<td>02</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Issued
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-20.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Connie Waters</a>
												</div>
											</div>
										</td>
										<td>Admin</td>
										<td>
											<p className="fw-medium text-dark mb-0">Angular Training</p>
										</td>
										<td><span
												className="badge badge-info-transparent d-inline-flex align-items-center badge-xs">In
												Progress</span></td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>
											-
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-19.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<a className="fw-medium fs-14">Lori Broaddus</a>
												</div>
											</div>
										</td>
										<td>Business Analyst</td>
										<td>
											<p className="fw-medium text-dark mb-0">Vuejs Training</p>
										</td>
										<td><span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">Completed</span>
										</td>
										<td>95</td>
										<td>24 Jan 2025</td>
										<td>Excellent</td>
										<td>01</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Issued
											</span>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_learninganalytics - 1) * rowsPerPage_learninganalytics + 1, 11)}-{Math.min(currentPage_learninganalytics * rowsPerPage_learninganalytics, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_learninganalytics === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_learninganalytics(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_learninganalytics === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_learninganalytics(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_learninganalytics === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_learninganalytics(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
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

export default LearningAnalytics;
