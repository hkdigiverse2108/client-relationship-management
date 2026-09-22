import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';import PageHeader from '../components/common/PageHeader';


const TaskReport = () => {
  // Pagination state for taskreport
  const [currentPage_taskreport, setCurrentPage_taskreport] = useState(1);
  const [rowsPerPage_taskreport, setRowsPerPage_taskreport] = useState(10);
  const [searchQuery_taskreport, setSearchQuery_taskreport] = useState('');

  const smallChartOptions = (color) => ({
    chart: {
      type: 'donut',
      height: 60,
      width: 60,
      sparkline: {
        enabled: true
      }
    },
    colors: [color, 'rgba(67, 87, 133, .09)'],
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false
    },
    tooltip: {
      enabled: false
    }
  });

  const taskReportsOptions = {
    series: [40, 30, 20, 10],
    chart: {
      type: 'donut',
      height: 250,
    },
    colors: ['#28C76F', '#03C9D7', '#FFC107', '#8E24AA'],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
        }
      }
    },
    stroke: {
      show: true,
      colors: 'transparent'
    }
  };
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Task Report"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Reports' },
						{ label: 'Task Report', active: true }
					]}
				>
					<div className="mb-2">
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
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">

					{/* Total Exponses */}
					<div className="col-lg-6 col-md-6 d-flex">
						<div className="row flex-fill">
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body ">
										<div className="row align-items-center">
											<div className="col-8">
												<div>
													<span className="fs-14 fw-normal text-truncate mb-1">Total Tasks</span>
													<h5>800</h5>
												</div>
											</div>
											<div className="col-4">
												<ReactApexChart options={smallChartOptions('#F26522')} series={[85, 15]} type="donut" height={60} width={60} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body ">
										<div className="row align-items-center">
											<div className="col-8">
												<div>
													<span className="fs-14 fw-normal text-truncate mb-1">Total Tasks</span>
													<h5>800</h5>
												</div>
											</div>
											<div className="col-4">
												<ReactApexChart options={smallChartOptions('#03C95A')} series={[57, 43]} type="donut" height={60} width={60} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="row align-items-center">
											<div className="col-8">
												<div>
													<span className="fs-14 fw-normal text-truncate mb-1">Total Tasks</span>
													<h5>800</h5>
												</div>
											</div>
											<div className="col-4">
												<ReactApexChart options={smallChartOptions('#FD3995')} series={[28, 72]} type="donut" height={60} width={60} />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body ">
										<div className="row align-items-center">
											<div className="col-8">
												<div>
													<span className="fs-14 fw-normal text-truncate mb-1">Total Tasks</span>
													<h5>800</h5>
												</div>
											</div>
											<div className="col-4">
												<ReactApexChart options={smallChartOptions('#0DCAF0')} series={[14, 86]} type="donut" height={60} width={60} />
											</div>
										</div>
									</div>
								</div>
							</div>
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
										<h5>Tasks</h5>
									</div>
									<div className="dropdown">
										<Link to="#"
											className="dropdown-toggle btn btn-sm fs-12 btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											Office Management App
										</Link>
										<ul className="dropdown-menu  dropdown-menu-end p-2">
											<li>
												<Link to="#"
													className="dropdown-item rounded-1">PRO-001</Link>
											</li>
											<li>
												<Link to="#"
													className="dropdown-item rounded-1">PRO-002</Link>
											</li>
											<li>
												<Link to="#"
													className="dropdown-item rounded-1">PRO-004</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body pt-0">
								<div className="row align-items-center">
									<div className="col-md-6 d-flex align-items-center justify-content-center">
										<div className="position-relative payment-total">
											<ReactApexChart options={taskReportsOptions} series={taskReportsOptions.series} type="donut" height={250} />
											<div className="position-absolute top-50 start-50 translate-middle text-center">
												<p className="fs-16 fw-normal mb-0 ">Pending</p>
												<span className="display-3 fs-24 fw-bold text-skyblue">30%</span>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="row gy-4">
											<div className="col-md-6">
												<div className="d-flex task-report-icons">
													<span className="me-2"><i
															className="ti ti-arrow-badge-right-filled text-success"></i></span>
													<h6 className="fs-16">Completed <span className="fs-14 fw-normal">40%</span>
													</h6>
												</div>
											</div>
											<div className="col-md-6">
												<div className="d-flex task-report-icons">
													<span className="me-2"><i
															className="ti ti-arrow-badge-right-filled text-skyblue"></i></span>
													<h6 className="fs-16">Pending <span className="fs-14 fw-normal">30 %</span>
													</h6>
												</div>
											</div>
											<div className="col-md-6">
												<div className="d-flex task-report-icons">
													<span className="me-2"><i
															className="ti ti-arrow-badge-right-filled text-warning"></i></span>
													<h6 className="fs-16">Inprogress <span className="fs-14 fw-normal">20
															%</span></h6>
												</div>
											</div>
											<div className="col-md-6">
												<div className="d-flex task-report-icons">
													<span className="me-2"><i
															className="ti ti-arrow-badge-right-filled text-purple"></i></span>
													<h6 className="fs-16">On Hold <span className="fs-14 fw-normal">10 %</span>
													</h6>
												</div>
											</div>
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
						<h5>Tasks List</h5>
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
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Priority
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Low</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Medium</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">High</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Status
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Completed</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Inprogress</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Pending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Onhold</Link>
									</li>
								</ul>
							</div>
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
											value={rowsPerPage_taskreport}
											onChange={(e) => { setRowsPerPage_taskreport(Number(e.target.value)); setCurrentPage_taskreport(1); }}
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
											value={searchQuery_taskreport}
											onChange={(e) => { setSearchQuery_taskreport(e.target.value); setCurrentPage_taskreport(1); }}
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
										<th>Task Name</th>
										<th>Project Name</th>
										<th>Created Date</th>
										<th>Due Date</th>
										<th>Priority</th>
										<th>Status</th>
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
												<h6 className="fw-medium"><a href="#">Patient Appointment Booking</a></h6>
											</div>
										</td>
										<td>
											Hospital Administration
										</td>
										<td>
											14 Jan 2024
										</td>
										<td>
											15 Jan 2024
										</td>
										<td>
											<span className="badge badge-success-transparent"><i
													className="ti ti-point-filled me-1"></i>Low</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Completed
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
												<h6 className="fw-medium"><a href="#">Payment Gateway</a></h6>
											</div>
										</td>
										<td>
											Educational Platform
										</td>
										<td>
											21 Jan 2024
										</td>
										<td>
											25 Jan 2024
										</td>
										<td>
											<span className="badge badge-warning-transparent"><i
													className="ti ti-point-filled me-1"></i>Medium</span>
										</td>
										<td>
											<span className="badge badge-purple d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Inprogress
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
												<h6 className="fw-medium"><a href="#">Doctor available module</a></h6>
											</div>
										</td>
										<td>
											Clinic Management
										</td>
										<td>
											20 Feb 2024
										</td>
										<td>
											22 Feb 2024
										</td>
										<td>
											<span className="badge badge-danger-transparent"><i
													className="ti ti-point-filled me-1"></i>High</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Completed
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
												<h6 className="fw-medium"><a href="#">Video Conferencing Module</a></h6>
											</div>
										</td>
										<td>
											Chat & Call Mobile App
										</td>
										<td>
											15 Mar 2024
										</td>
										<td>
											17 Mar 2024
										</td>
										<td>
											<span className="badge badge-success-transparent"><i
													className="ti ti-point-filled me-1"></i>Low</span>
										</td>
										<td>
											<span className="badge badge-warning d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>On Hold
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
												<h6 className="fw-medium"><a href="#">Private Chat Module</a></h6>
											</div>
										</td>
										<td>
											Travel Planning Website
										</td>
										<td>
											12 Apr 2024
										</td>
										<td>
											16 Apr 2024
										</td>
										<td>
											<span className="badge badge-danger-transparent"><i
													className="ti ti-point-filled me-1"></i>High</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Completed
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
												<h6 className="fw-medium"><a href="#">Services List & Grid View</a></h6>
											</div>
										</td>
										<td>
											Service Booking Software
										</td>
										<td>
											20 Apr 2024
										</td>
										<td>
											21 Apr 2024
										</td>
										<td>
											<span className="badge badge-success-transparent"><i
													className="ti ti-point-filled me-1"></i>Low</span>
										</td>
										<td>
											<span className="badge badge-skyblue d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Pending
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
												<h6 className="fw-medium"><a href="#">Car Detail Moodule</a></h6>
											</div>
										</td>
										<td>
											Car & Bike Rental Software
										</td>
										<td>
											06 Jul 2024
										</td>
										<td>
											06 Jul 2024
										</td>
										<td>
											<span className="badge badge-warning-transparent"><i
													className="ti ti-point-filled me-1"></i>Medium</span>
										</td>
										<td>
											<span className="badge badge-purple d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Inprogress
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
												<h6 className="fw-medium"><a href="#">Location Module</a></h6>
											</div>
										</td>
										<td>
											Food Order App
										</td>
										<td>
											02 Sep 2024
										</td>
										<td>
											04 Sep 2024
										</td>
										<td>
											<span className="badge badge-success-transparent"><i
													className="ti ti-point-filled me-1"></i>Low</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Completed
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
												<h6 className="fw-medium"><a href="#">Hotel List & Grid View</a></h6>
											</div>
										</td>
										<td>
											Hotel Booking App
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>
											<span className="badge badge-warning-transparent"><i
													className="ti ti-point-filled me-1"></i>Medium</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Completed
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
												<h6 className="fw-medium"><a href="#">Warehouse Module</a></h6>
											</div>
										</td>
										<td>
											POS Admin Software
										</td>
										<td>
											10 Dec 2024
										</td>
										<td>
											11 Dec 2024
										</td>
										<td>
											<span className="badge badge-success-transparent"><i
													className="ti ti-point-filled me-1"></i>Low</span>
										</td>
										<td>
											<span className="badge badge-skyblue d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Pending
											</span>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_taskreport - 1) * rowsPerPage_taskreport + 1, 11)}-{Math.min(currentPage_taskreport * rowsPerPage_taskreport, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_taskreport === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_taskreport(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_taskreport === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_taskreport(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_taskreport === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_taskreport(p => Math.min(p + 1, 2))}>
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

export default TaskReport;
