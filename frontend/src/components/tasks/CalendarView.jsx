import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import EventModal from './EventModal';

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

  const prevMonthDaysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<td key={`empty-${i}`} className="day old text-muted" style={{ opacity: 0.4 }}>{prevMonthDaysInMonth - firstDay + i + 1}</td>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();
    days.push(<td key={i} className={`day ${isToday ? "active text-white" : ""}`}>{i}</td>);
  }
  // Fill remaining days to complete the last row
  const remainingDays = (7 - (days.length % 7)) % 7;
  for (let i = 0; i < remainingDays; i++) {
    days.push(<td key={`empty-end-${i}`} className="day new text-muted" style={{ opacity: 0.4 }}>{i + 1}</td>);
  }

  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(<tr key={`row-${i}`}>{days.slice(i, i + 7)}</tr>);
  }

  return (
    <div className="bootstrap-datetimepicker-widget usetwentyfour" style={{ display: 'block', position: 'static', width: '100%', padding: 0, border: 'none', boxShadow: 'none', margin: 0 }}>
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
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

const CalendarView = () => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  useEffect(() => {
    let draggableEl = document.getElementById('external-events');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function(eventEl) {
          return {
            title: eventEl.innerText,
            className: eventEl.getAttribute('data-event-classname')
          };
        }
      });
    }
  }, []);

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
      <style>
        {`
          .fc .fc-button-primary:not(.fc-button-active) {
            background-color: #f3f4f6 !important;
            border-color: #f3f4f6 !important;
            color: #6b7280 !important;
          }
          .fc .fc-button-primary.fc-button-active {
            background-color: #ff6f28 !important;
            border-color: #ff6f28 !important;
            color: #fff !important;
          }
          .fc .fc-button-primary:hover:not(.fc-button-active) {
            background-color: #e5e7eb !important;
            border-color: #e5e7eb !important;
          }
          #external-events .fc-event {
            color: #333 !important;
            cursor: grab;
          }
        `}
      </style>
      {/* Calendar Header Actions */}
      <div className="d-flex my-xl-auto right-content align-items-center flex-wrap mb-4">
       
    
     
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
                  <a href="#" className="link-primary" onClick={(e) => { e.preventDefault(); setIsEventModalOpen(true); }}>
                    <i className="ti ti-square-rounded-plus-filled fs-16"></i>
                  </a>
                </div>
                <p className="fs-12 mb-2">Drag and drop your event or click in the calendar</p>
                <div id='external-events'>
                  <div className="fc-event bg-transparent-success mb-1" data-event='{ "title": "Team Events" }' data-event-classname="bg-transparent-success">
                    <i className="ti ti-square-rounded text-success me-2"></i>Team Events
                  </div>
                  <div className="fc-event bg-transparent-warning mb-1" data-event='{ "title": "Team Events" }' data-event-classname="bg-transparent-warning">
                    <i className="ti ti-square-rounded text-warning me-2"></i>Work
                  </div>
                  <div className="fc-event bg-transparent-danger mb-1" data-event='{ "title": "External" }' data-event-classname="bg-transparent-danger">
                    <i className="ti ti-square-rounded text-danger me-2"></i>External
                  </div>
                  <div className="fc-event bg-transparent-skyblue mb-1" data-event='{ "title": "Projects" }' data-event-classname="bg-transparent-skyblue">
                    <i className="ti ti-square-rounded text-skyblue me-2"></i>Projects
                  </div>
                  <div className="fc-event bg-transparent-purple mb-1" data-event='{ "title": "Applications" }' data-event-classname="bg-transparent-purple">
                    <i className="ti ti-square-rounded text-purple me-2"></i>Applications
                  </div>
                  <div className="fc-event bg-transparent-info mb-0" data-event='{ "title": "Desgin" }' data-event-classname="bg-transparent-info">
                    <i className="ti ti-square-rounded text-info me-2"></i>Desgin
                  </div>
                </div>
              </div>
              {/* /Event */}

              {/* Upcoming Event */}
              <div className="pb-2">
                <h5 className="mb-2">Upcoming Event<span className="badge badge-success rounded-pill ms-2">15</span></h5>
                <div className="border-start border-purple border-3 mb-3">
                  <div className="ps-3">
                    <h6 className="fw-medium mb-1">Meeting with Team Dev</h6>
                    <p className="fs-12"><i className="ti ti-calendar-check text-info me-2"></i>15 Mar 2025</p>
                  </div>
                </div>
                <div className="border-start border-pink border-3 mb-3">
                  <div className="ps-3">
                    <h6 className="fw-medium mb-1">Design System With Client</h6>
                    <p className="fs-12"><i className="ti ti-calendar-check text-info me-2"></i>24 Mar 2025</p>
                  </div>
                </div>
                <div className="border-start border-success border-3 mb-3">
                  <div className="ps-3">
                    <h6 className="fw-medium mb-1">UI/UX Team Call</h6>
                    <p className="fs-12"><i className="ti ti-calendar-check text-info me-2"></i>28 Mar 2025</p>
                  </div>
                </div>
              </div>
              {/* /Upcoming Event */}

             
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
                droppable={true}
              />
            </div>
          </div>
        </div>
      </div>
      <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
    </>
  );
};

export default CalendarView;
