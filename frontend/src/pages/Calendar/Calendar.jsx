import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import Button from '@/components/common/Button/Button';
import axiosClient from '@/api/axiosClient';
import './Calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Custom Toolbar to match the UI screenshot
const CustomEvent = ({ event }) => {
  let colorClass = 'bg-primary';
  if (event.type === 'task') colorClass = 'bg-success';
  else if (event.type === 'reminder') colorClass = 'bg-danger';

  return (
    <div className="d-flex align-items-center gap-1 px-1">
      <span className={`legend-dot ${colorClass}`} style={{ flexShrink: 0 }}></span>
      <span className="text-truncate" style={{ fontSize: '0.8rem', color: 'var(--color-text)', fontWeight: 500 }}>{event.title}</span>
    </div>
  );
};

const CustomToolbar = (toolbar) => {
  const goToBack = () => toolbar.onNavigate('PREV');
  const goToNext = () => toolbar.onNavigate('NEXT');
  const goToCurrent = () => toolbar.onNavigate('TODAY');

  const label = () => {
    const date = toolbar.date;
    return format(date, 'MMMM yyyy');
  };

  return (
    <div className="calendar-toolbar">
      <div className="d-flex justify-content-between align-items-center w-100 p-3">
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-link text-dark p-0" onClick={goToBack}>
            <FiChevronLeft size={20} />
          </button>
          <h4 className="mb-0 fw-bold" style={{ fontSize: '1.1rem', minWidth: '130px', textAlign: 'center' }}>
            {label()}
          </h4>
          <button className="btn btn-link text-dark p-0" onClick={goToNext}>
            <FiChevronRight size={20} />
          </button>
        </div>
        <div className="calendar-view-buttons d-flex gap-1">
          <button 
            className={`btn btn-sm rounded-pill px-3 ${toolbar.view === 'month' ? 'btn-primary text-white' : 'btn-light'}`}
            onClick={() => toolbar.onView('month')}
          >
            Month
          </button>
          <button 
            className={`btn btn-sm rounded-pill px-3 ${toolbar.view === 'week' ? 'btn-primary text-white' : 'btn-light'}`}
            onClick={() => toolbar.onView('week')}
          >
            Week
          </button>
          <button 
            className={`btn btn-sm rounded-pill px-3 ${toolbar.view === 'day' ? 'btn-primary text-white' : 'btn-light'}`}
            onClick={() => toolbar.onView('day')}
          >
            Day
          </button>
        </div>
      </div>
      <div className="calendar-legend px-3 pb-2 border-bottom">
        <span className="legend-item"><span className="legend-dot bg-primary"></span> Meetings</span>
        <span className="legend-item"><span className="legend-dot bg-success"></span> Tasks</span>
        <span className="legend-item"><span className="legend-dot bg-danger"></span> Reminders</span>
      </div>
    </div>
  );
};

export default function Calendar({ hideHeader = false }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setLoading(true);
        // Fetch tasks and reminders simultaneously
        const [tasksRes, remindersRes] = await Promise.all([
          axiosClient.get('/tasks'),
          axiosClient.get('/reminders')
        ]);

        const mappedEvents = [];

        // Map Tasks
        if (Array.isArray(tasksRes)) {
          tasksRes.forEach(task => {
            if (task.end_date) {
              // Show task only on due date (Option A)
              mappedEvents.push({
                id: `task_${task.id || task._id}`,
                title: task.title,
                start: new Date(task.end_date),
                end: new Date(task.end_date),
                type: 'task',
                allDay: true,
                resource: task
              });
            }
          });
        }

        // Map Reminders
        if (Array.isArray(remindersRes)) {
          remindersRes.forEach(rem => {
            if (rem.due_date) {
              mappedEvents.push({
                id: `rem_${rem.id || rem._id}`,
                title: rem.description || 'Reminder',
                start: new Date(rem.due_date),
                end: new Date(rem.due_date),
                type: 'reminder',
                allDay: false, // Reminders might have specific times
                resource: rem
              });
            }
          });
        }

        setEvents(mappedEvents);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    return {
      style: {
        backgroundColor: 'transparent',
        borderRadius: '0',
        color: 'inherit',
        border: 'none',
        display: 'block',
        padding: '0',
        boxShadow: 'none'
      }
    };
  };

  return (
    <>
      {!hideHeader && (
        <PageHeader
          title="Calendar"
          description="Manage your schedule, tasks, and follow-ups in one view."
          actions={<Button icon={FiPlus}>New event</Button>}
        />
      )}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="calendar-container">
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc(100vh - 220px)', minHeight: '600px' }}
            views={['month', 'week', 'day']}
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            components={{
              toolbar: CustomToolbar,
              event: CustomEvent
            }}
            eventPropGetter={eventStyleGetter}
            popup={true}
          />
        </div>
      </div>
    </>
  );
}