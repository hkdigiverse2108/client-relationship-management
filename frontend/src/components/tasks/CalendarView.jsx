import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import EventModal from './EventModal';
import axiosClient from '../../api/axiosClient';
import toast from 'react-hot-toast';

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

const CalendarView = ({ onReady }) => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventModalData, setEventModalData] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, id: null, title: '' });

  useEffect(() => {
    if (onReady) {
      onReady({
        openEventModal: () => {
          setEventModalData(null);
          setIsEventModalOpen(true);
        }
      });
    }
  }, [onReady]);

  const fetchEvents = async () => {
    try {
      const res = await axiosClient.get('/events');
      if (Array.isArray(res)) {
        // FullCalendar expects 'start' property
        const formattedEvents = res.map(e => ({
          ...e,
          id: e.id || e._id,
          start: e.start_time ? `${e.date}T${e.start_time}` : e.date,
          end: e.end_time ? `${e.date}T${e.end_time}` : undefined,
        }));
        setEvents(formattedEvents);
      }
    } catch (err) {
      toast.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSaveEvent = async (formData) => {
    try {
      if (formData.id) {
        await axiosClient.put(`/events/${formData.id}`, formData);
        toast.success("Event updated successfully!");
      } else {
        await axiosClient.post('/events', formData);
        toast.success("Event created successfully!");
      }
      setIsEventModalOpen(false);
      setEventModalData(null);
      fetchEvents();
    } catch (err) {
      toast.error("Failed to save event");
    }
  };

  const handleDeleteEvent = async () => {
    if (!confirmDeleteModal.id) return;
    try {
      await axiosClient.delete(`/events/${confirmDeleteModal.id}`);
      toast.success("Event deleted successfully!");
      setConfirmDeleteModal({ isOpen: false, id: null, title: '' });
      fetchEvents();
    } catch (err) {
      toast.error("Failed to delete event");
    }
  };

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
            color: #000 !important;
          }
          .fc-event, .fc-event-main, .fc-event-title, .fc-event-time {
            color: #000 !important;
          }
          html[data-theme="dark"] #external-events .fc-event,
          html[data-theme="dark"] .fc-event, 
          html[data-theme="dark"] .fc-event-main, 
          html[data-theme="dark"] .fc-event-title,
          html[data-theme="dark"] .fc-event-time {
            color: #fff !important;
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
                  <a href="#" className="link-primary" onClick={(e) => { e.preventDefault(); setEventModalData(null); setIsEventModalOpen(true); }}>
                    <i className="ti ti-square-rounded-plus-filled fs-16"></i>
                  </a>
                </div>
                <p className="fs-12 mb-2">Click on the calendar to add your event</p>
                <div id='external-events' style={{ maxHeight: '250px', overflowY: 'auto', overflowX: 'hidden', paddingRight: '5px' }}>
                  {events.length > 0 ? (
                    events.sort((a, b) => new Date(b.date) - new Date(a.date)).map((e, idx) => {
                      const colorMap = {
                        'bg-transparent-skyblue': 'border-skyblue',
                        'bg-transparent-success': 'border-success',
                        'bg-transparent-danger': 'border-danger',
                        'bg-transparent-warning': 'border-warning',
                        'bg-transparent-info': 'border-info',
                        'bg-transparent-purple': 'border-purple',
                      };
                      const borderClass = colorMap[e.className] || 'border-skyblue';
                      const iconClass = borderClass.replace('border-', 'text-');
                      return (
                        <div key={e.id || idx} className={`fc-event ${e.className} mb-1 d-flex align-items-center justify-content-between p-2 rounded`} style={{ cursor: 'pointer' }} onClick={() => { setEventModalData(e); setIsEventModalOpen(true); }}>
                          <div>
                            <i className={`ti ti-square-rounded ${iconClass} me-2`}></i>
                            {e.title}
                          </div>
                          <a href="#" className="text-muted" onClick={(evt) => { evt.preventDefault(); evt.stopPropagation(); setConfirmDeleteModal({ isOpen: true, id: e.id, title: e.title }); }}>
                            <i className="ti ti-trash"></i>
                          </a>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-muted fs-14">No events found.</p>
                  )}
                </div>
              </div>
              {/* /Event */}

              {/* Upcoming Event */}
              <div className="pb-2">
                <h5 className="mb-2">Upcoming Event<span className="badge badge-success rounded-pill ms-2">{events.filter(e => new Date(e.date) >= new Date(new Date().setHours(0,0,0,0))).length}</span></h5>
                {events
                  .filter(e => new Date(e.date) >= new Date(new Date().setHours(0,0,0,0)))
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .slice(0, 5)
                  .map((e, index) => {
                    const colorMap = {
                      'bg-transparent-skyblue': 'border-skyblue',
                      'bg-transparent-success': 'border-success',
                      'bg-transparent-danger': 'border-danger',
                      'bg-transparent-warning': 'border-warning',
                      'bg-transparent-info': 'border-info',
                      'bg-transparent-purple': 'border-purple',
                    };
                    const borderClass = colorMap[e.className] || 'border-skyblue';
                    const iconClass = borderClass.replace('border-', 'text-');
                    return (
                      <div key={e.id || index} className={`border-start ${borderClass} border-3 mb-3 cursor-pointer`} onClick={() => { setEventModalData(e); setIsEventModalOpen(true); }}>
                        <div className="ps-3">
                          <h6 className="fw-medium mb-1">{e.title}</h6>
                          <p className="fs-12"><i className={`ti ti-calendar-check ${iconClass} me-2`}></i>{new Date(e.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                    );
                })}
                {events.filter(e => new Date(e.date) >= new Date(new Date().setHours(0,0,0,0))).length === 0 && (
                  <p className="text-muted fs-14">No upcoming events.</p>
                )}
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
                eventClick={(info) => {
                  const localDateStr = info.event.start ? `${info.event.start.getFullYear()}-${String(info.event.start.getMonth() + 1).padStart(2, '0')}-${String(info.event.start.getDate()).padStart(2, '0')}` : info.event.extendedProps.date;
                  setEventModalData({
                    id: info.event.extendedProps.id || info.event.id,
                    title: info.event.title,
                    date: localDateStr,
                    start_time: info.event.extendedProps.start_time,
                    end_time: info.event.extendedProps.end_time,
                    location: info.event.extendedProps.location,
                    description: info.event.extendedProps.description,
                    className: info.event.extendedProps.className || info.event.classNames?.find(c => c.startsWith('bg-')) || 'bg-transparent-skyblue'
                  });
                  setIsEventModalOpen(true);
                }}
                select={(info) => {
                  setEventModalData({
                    date: info.startStr // e.g. "2026-10-28"
                  });
                  setIsEventModalOpen(true);
                }}
                eventDrop={async (info) => {
                  try {
                    const eventId = info.event.extendedProps.id || info.event.id;
                    if (!eventId) {
                      info.revert();
                      return;
                    }
                    const localDateStr = `${info.event.start.getFullYear()}-${String(info.event.start.getMonth() + 1).padStart(2, '0')}-${String(info.event.start.getDate()).padStart(2, '0')}`;
                    const updatedEvent = {
                      title: info.event.title,
                      date: localDateStr,
                      start_time: info.event.start.toTimeString().slice(0, 5), // basic formatting
                      className: info.event.extendedProps.className || info.event.classNames?.find(c => c.startsWith('bg-')) || 'bg-transparent-skyblue'
                    };
                    await axiosClient.put(`/events/${eventId}`, updatedEvent);
                    toast.success("Event moved!");
                  } catch (e) {
                    info.revert();
                    toast.error("Failed to move event");
                  }
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
              />
            </div>
          </div>
        </div>
      </div>
      <EventModal isOpen={isEventModalOpen} onClose={() => {setIsEventModalOpen(false); setEventModalData(null);}} onSave={handleSaveEvent} initialData={eventModalData} />
      {/* Delete Confirmation Modal */}
      {confirmDeleteModal.isOpen && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <button type="button" className="btn-close" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '' })} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center pt-0">
                <div className="mb-4">
                  <i className="ti ti-alert-circle text-danger display-4"></i>
                </div>
                <h4>Delete Event</h4>
                <p className="text-muted mb-0">Do you really want to delete the event <strong>{confirmDeleteModal.title}</strong>?</p>
                <div className="d-flex justify-content-center mt-4">
                  <button className="btn btn-light px-4 me-2" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '' })}>Cancel</button>
                  <button className="btn btn-danger px-4" onClick={handleDeleteEvent}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarView;
