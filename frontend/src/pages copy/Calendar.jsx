import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const MiniCalendar = () => {
  // Pagination state for calendar
  const [currentPage_calendar, setCurrentPage_calendar] = useState(1);
  const [rowsPerPage_calendar, setRowsPerPage_calendar] = useState(10);
  const [searchQuery_calendar, setSearchQuery_calendar] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<td key={`empty-${i}`} className="day old"></td>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
    days.push(<td key={i} className={`day ${isToday ? "active" : ""}`}>{i}</td>);
  }
  // Fill remaining days to complete the last row
  const remainingDays = (7 - (days.length % 7)) % 7;
  for (let i = 0; i < remainingDays; i++) {
    days.push(<td key={`empty-end-${i}`} className="day new"></td>);
  }

  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(<tr key={`row-${i}`}>{days.slice(i, i + 7)}</tr>);
  }

  return (
    <div className="bootstrap-datetimepicker-widget dropdown-menu usetwentyfour bottom" style={{ display: 'block', position: 'relative', width: '100%', padding: 0, border: 'none', boxShadow: 'none' }}>
      <ul className="list-unstyled mb-0">
        <li className="collapse show">
          <div className="datepicker">
            <div className="datepicker-days" style={{ display: 'block' }}>
              <table className="table-condensed w-100 text-center">
                <thead>
                  <tr>
                    <th className="prev" onClick={prevMonth} style={{ cursor: 'pointer' }}><i className="fas fa-angle-left"></i></th>
                    <th colSpan="5" className="picker-switch">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</th>
                    <th className="next" onClick={nextMonth} style={{ cursor: 'pointer' }}><i className="fas fa-angle-right"></i></th>
                  </tr>
                  <tr>
                    <th className="dow">Su</th><th className="dow">Mo</th><th className="dow">Tu</th><th className="dow">We</th><th className="dow">Th</th><th className="dow">Fr</th><th className="dow">Sa</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
              </table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_calendar - 1) * rowsPerPage_calendar + 1, 11)}-{Math.min(currentPage_calendar * rowsPerPage_calendar, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_calendar === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_calendar(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_calendar === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_calendar(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_calendar === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_calendar(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

const Calendar = () => {
  const events = [
    {
      title: 'Event Name 4',
      start: new Date(Date.now() + 148000000).toISOString().slice(0, 10),
      className: "bg-transparent-purple"
    },
    {
      title: 'Test Event 1',
      start: new Date(Date.now() + 168000000).toISOString().slice(0, 10),
      className: "bg-transparent-info"
    },
    {
      title: 'Test Event 2',
      start: new Date(Date.now() + 338000000).toISOString().slice(0, 10),
      className: "bg-transparent-success"
    },
    {
      title: 'Test Event 3',
      start: new Date(Date.now() + 168000000).toISOString().slice(0, 10),
      className: "bg-transparent-danger"
    }
  ];

  return (
    <>
      <div className="page-wrapper">
			<div className="content">
				{/* Breadcrumb */}
				<div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
					<div className="my-auto mb-2">
						<h2 className="mb-1">Calendar</h2>
						<nav>
							<ol className="breadcrumb mb-0">
								<li className="breadcrumb-item">
									<a href="/"><i className="ti ti-smart-home"></i></a>
								</li>
								<li className="breadcrumb-item">
									Applications
								</li>
								<li className="breadcrumb-item active" aria-current="page">Calendar</li>
							</ol>
						</nav>

					</div>
					<div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
						<div className="me-2 mb-2">
							<div className="input-icon-end position-relative">
								<input type="text" className="form-control date-range bookingrange"
									placeholder="dd/mm/yyyy - dd/mm/yyyy" />
								<span className="input-icon-addon">
									<i className="ti ti-chevron-down"></i>
								</span>
							</div>
						</div>
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
						<div className="mb-2">
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_event"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Create</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
					</div>
				</div>

				<div className="row">

					{/* Calendar Sidebar */}
					<div className="col-xxl-3 col-xl-4">
						<div className="card">
							<div className="card-body p-3">
								<div className="border-bottom pb-2 mb-4">
									<div className="datepic">
                                        <MiniCalendar />
                                    </div>
								</div>

								{/* Event */}
								<div className="border-bottom pb-4 mb-4">
									<div className="d-flex align-items-center justify-content-between mb-2">
										<h5>Event </h5>
										<a href="#" className="link-primary" data-bs-toggle="modal"
											data-bs-target="#add_event"><i
												className="ti ti-square-rounded-plus-filled fs-16"></i></a>
									</div>
									<p className="fs-12 mb-2">Drag and drop your event or click in the calendar</p>
									<div id='external-events'>
										<div className="fc-event bg-transparent-success mb-1"
											data-event='{ "title": "Team Events" }'
											data-event-classname="bg-transparent-success">
											<i className="ti ti-square-rounded text-success me-2"></i>Team Events
										</div>
										<div className="fc-event bg-transparent-warning mb-1"
											data-event='{ "title": "Team Events" }'
											data-event-classname="bg-transparent-warning">
											<i className="ti ti-square-rounded text-warning me-2"></i>Work
										</div>
										<div className="fc-event bg-transparent-danger mb-1"
											data-event='{ "title": "External" }'
											data-event-classname="bg-transparent-danger">
											<i className="ti ti-square-rounded text-danger me-2"></i>External
										</div>
										<div className="fc-event bg-transparent-skyblue mb-1"
											data-event='{ "title": "Projects" }'
											data-event-classname="bg-transparent-skyblue">
											<i className="ti ti-square-rounded text-skyblue me-2"></i>Projects
										</div>
										<div className="fc-event bg-transparent-purple mb-1"
											data-event='{ "title": "Applications" }'
											data-event-classname="bg-transparent-purple">
											<i className="ti ti-square-rounded text-purple me-2"></i>Applications
										</div>
										<div className="fc-event bg-transparent-info mb-0"
											data-event='{ "title": "Desgin" }'
											data-event-classname="bg-transparent-info">
											<i className="ti ti-square-rounded text-info me-2"></i>Desgin
										</div>
									</div>
								</div>
								{/* /Event */}

								{/* Upcoming Event */}
								<div className="border-bottom pb-2 mb-4">
									<h5 className="mb-2">Upcoming Event<span
											className="badge badge-success rounded-pill ms-2">15</span></h5>
									<div className="border-start border-purple border-3 mb-3">
										<div className="ps-3">
											<h6 className="fw-medium mb-1">Meeting with Team Dev</h6>
											<p className="fs-12"><i className="ti ti-calendar-check text-info me-2"></i>15 Mar
												2025</p>
										</div>
									</div>
									<div className="border-start border-pink border-3 mb-3">
										<div className="ps-3">
											<h6 className="fw-medium mb-1">Design System With Client</h6>
											<p className="fs-12"><i className="ti ti-calendar-check text-info me-2"></i>24 Mar
												2025</p>
										</div>
									</div>
									<div className="border-start border-success border-3 mb-3">
										<div className="ps-3">
											<h6 className="fw-medium mb-1">UI/UX Team Call</h6>
											<p className="fs-12"><i className="ti ti-calendar-check text-info me-2"></i>28 Mar
												2025</p>
										</div>
									</div>
								</div>
								{/* /Upcoming Event */}

								{/* Upgrade Details */}
								<div className="bg-dark rounded text-center position-relative p-4">
									<span className="avatar avatar-lg rounded-circle bg-white mb-2">
										<i className="ti ti-alert-triangle text-dark"></i>
									</span>
									<h6 className="text-white mb-3">Enjoy Unlimited Access on a small price monthly.</h6>
									<a href="#" className="btn btn-white">Upgrade Now <i className="ti ti-arrow-right"></i></a>
									<div className="box-bg">
										<span className="bg-right"><img src="/assets/img/bg/email-bg-01.png"
												alt="Img" /></span>
										<span className="bg-left"><img src="/assets/img/bg/email-bg-02.png" alt="Img" /></span>
									</div>
								</div>
								{/* /Upgrade Details */}

							</div>
						</div>

					</div>
					{/* /Calendar Sidebar */}

					<div className="col-xxl-9 col-xl-8 theiaStickySidebar">
						<div className="card border-0">
							<div className="card-header">
								<h5 className="card-title">White Variant</h5>
							</div>
							<div className="card-body">
                                <FullCalendar
                                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                  initialView="dayGridMonth"
                                  headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                  }}
                                  events={events}
                                  editable={true}
                                  selectable={true}
                                  selectMirror={true}
                                  dayMaxEvents={true}
                                />
							</div>
						</div>
					</div>

				</div>

			</div>
			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" className="text-primary">Dreams</a></p>
			</div>
		</div>
		
    </>
  );
};

export default Calendar;
