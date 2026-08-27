import React, { useState, useEffect } from 'react';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import Input from '@/components/common/Input/Input';
import { confirmDialog } from '@/components/common/ConfirmDialog/confirmDialog';
import { FiChevronLeft, FiChevronRight, FiGift, FiCalendar, FiPlus, FiEdit2, FiTrash2, FiTag } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { hrmsService } from '@/api/services/hrmsService';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  addDays, subMonths, addMonths, format, isSameMonth, isToday, parseISO
} from 'date-fns';

export default function EventsWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([
    { id: 't1', name: 'Holiday', value: 'holiday' },
    { id: 't2', name: 'Birthday', value: 'birthday' }
  ]);
  
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);

  const [editingEventId, setEditingEventId] = useState(null);
  
  const [eventData, setEventData] = useState({
    title: '',
    desc: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    type: 'holiday', 
    duration: 'Full Day'
  });

  const [newCustomType, setNewCustomType] = useState('');
  const [isAddingCustomType, setIsAddingCustomType] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsData, typesData] = await Promise.all([
        hrmsService.getEvents(),
        hrmsService.getEventTypes()
      ]);
      setEvents(eventsData || []);
      
      // Combine defaults with db custom types
      const dbTypes = (typesData || []).map(t => ({ id: t._id, name: t.name, value: t.value }));
      const allTypes = [
        { id: 't1', name: 'Holiday', value: 'holiday' },
        { id: 't2', name: 'Birthday', value: 'birthday' },
        ...dbTypes
      ];
      setEventTypes(allTypes);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load events");
    }
  };

  const handleAddCustomType = async () => {
    if (!newCustomType.trim()) return;
    const valueStr = newCustomType.trim().toLowerCase().replace(/\s+/g, '_');
    
    // Check if exists
    if (eventTypes.find(t => t.value === valueStr)) {
      toast.error("Type already exists");
      return;
    }

    try {
      const savedType = await hrmsService.createEventType({
        name: newCustomType.trim(),
        value: valueStr
      });
      const newTypeObj = { id: savedType._id, name: savedType.name, value: savedType.value };
      setEventTypes([...eventTypes, newTypeObj]);
      setEventData({...eventData, type: savedType.value});
      setNewCustomType('');
      setIsAddingCustomType(false);
      toast.success("Custom type added");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add custom type");
    }
  };

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const gridDates = [];
  let day = startDate;
  while (day <= endDate) {
    gridDates.push(day);
    day = addDays(day, 1);
  }

  const currentMonthEvents = events.filter(e => {
    try { return isSameMonth(parseISO(e.date), monthStart); } catch(err) { return false; }
  });

  const openAddEvent = () => {
    setEditingEventId(null);
    setEventData({ title: '', desc: '', date: format(new Date(), 'yyyy-MM-dd'), type: 'holiday', duration: 'Full Day' });
    setIsAddingCustomType(false);
    setIsEventModalOpen(true);
  };

  const openEditEvent = (event) => {
    setEditingEventId(event._id || event.id);
    setEventData({ title: event.title, desc: event.desc, date: event.date, type: event.type, duration: event.duration || 'Full Day' });
    setIsAddingCustomType(false);
    setIsEventModalOpen(true);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!eventData.title.trim() || !eventData.date) return;

    try {
      if (editingEventId) {
        const updatedEvent = await hrmsService.updateEvent(editingEventId, eventData);
        setEvents(events.map(ev => (ev._id || ev.id) === editingEventId ? updatedEvent : ev));
        toast.success("Event updated");
      } else {
        const newEvent = await hrmsService.createEvent(eventData);
        setEvents([...events, newEvent]);
        toast.success("Event added");
      }
      setIsEventModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save event");
    }
  };

  const handleDeleteEvent = async (id) => {
    const ok = await confirmDialog({
      title: "Delete Event?",
      text: "Are you sure you want to delete this event?",
    });
    if (!ok) return;
    
    try {
      await hrmsService.deleteEvent(id);
      setEvents(events.filter(ev => (ev._id || ev.id) !== id));
      toast.success("Event deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete event");
    }
  };

  return (
    <div className="hrms-panel">
      <div className="hrms-panel-header">
        <div>
          <h3 className="hrms-panel-title">View Events</h3>
          <p className="hrms-panel-subtitle">Manage company calendar</p>
        </div>
        <div className="d-flex gap-2">
          <Button variant="outline" size="sm" icon={FiPlus} onClick={openAddEvent}>Add Event</Button>
          <Button variant="ghost" size="sm" onClick={() => setIsViewAllModalOpen(true)}>View all</Button>
        </div>
      </div>

      <div className="hrms-calendar-widget">
        <div className="hrms-cal-header">
          <Button variant="ghost" size="sm" icon={FiChevronLeft} onClick={prevMonth} />
          <span>{format(currentDate, 'MMMM yyyy')}</span>
          <Button variant="ghost" size="sm" icon={FiChevronRight} onClick={nextMonth} />
        </div>

        <div className="hrms-cal-grid">
          {days.map((dayName, idx) => (
            <div key={idx} className="hrms-cal-day-name">{dayName}</div>
          ))}
          
          {gridDates.map((dateObj, idx) => {
            const isCurrentMonth = isSameMonth(dateObj, monthStart);
            const dateString = format(dateObj, 'yyyy-MM-dd');
            const hasEvent = (events || []).some(e => e.date === dateString);
            
            let className = "hrms-cal-date";
            if (!isCurrentMonth) className += " text-muted opacity-25";
            if (hasEvent) className += " active";
            if (isToday(dateObj)) className += " bg-primary text-white";

            return (
              <div key={idx} className={className}>
                {format(dateObj, 'd')}
              </div>
            );
          })}
        </div>

        <div className="hrms-cal-events">
          {currentMonthEvents.length === 0 ? (
            <div className="text-center p-3 text-muted" style={{fontSize: '0.85rem'}}>No events this month.</div>
          ) : (
            currentMonthEvents.map(event => (
              <div key={event._id || event.id} className={`hrms-event-item ${event.type}`}>
                <div className="hrms-event-icon">
                  {event.type === 'birthday' ? <FiGift /> : (event.type === 'holiday' ? <FiCalendar /> : <FiTag />)}
                </div>
                <div className="hrms-event-details">
                  <h6>{event.title}</h6>
                  <p>{event.desc}</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'right' }}>
                    {(() => { try { return format(parseISO(event.date), 'dd MMM'); } catch(e) { return event.date; } })()}
                    {event.type === 'holiday' && event.duration && <div style={{fontWeight: 'normal', fontSize: '0.75rem', color: 'var(--color-text-secondary)'}}>{event.duration}</div>}
                  </div>
                  <div className="d-flex gap-2 mt-1">
                    <button style={{border: 'none', background: 'transparent', color: 'var(--color-primary)', cursor: 'pointer', padding: 0}} onClick={() => openEditEvent(event)}><FiEdit2 size={12} /></button>
                    <button style={{border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', padding: 0}} onClick={() => handleDeleteEvent(event._id || event.id)}><FiTrash2 size={12} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal open={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} title={editingEventId ? "Edit Event" : "Add Event"} size="sm">
        <form onSubmit={handleEventSubmit} className="p-2">
          <Input 
            type="date"
            label="Event Date" 
            value={eventData.date}
            onChange={(e) => setEventData({...eventData, date: e.target.value})}
            required
            className="mb-3"
          />
          <Input 
            label="Event Title" 
            value={eventData.title}
            onChange={(e) => setEventData({...eventData, title: e.target.value})}
            required
            className="mb-3"
          />
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Event Description</label>
            <input 
              type="text"
              className="form-control" 
              value={eventData.desc}
              onChange={(e) => setEventData({...eventData, desc: e.target.value})}
              style={{ fontSize: '0.9rem' }}
              placeholder="e.g. National Holiday, Happy Birthday!"
            />
          </div>
          
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label mb-0" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Event Type</label>
              {!isAddingCustomType && (
                 <button type="button" onClick={() => setIsAddingCustomType(true)} style={{border: 'none', background: 'transparent', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600}}>+ Custom Type</button>
              )}
            </div>
            
            {isAddingCustomType ? (
              <div className="d-flex gap-2 align-items-center">
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  placeholder="New type name..." 
                  value={newCustomType}
                  onChange={(e) => setNewCustomType(e.target.value)}
                  autoFocus
                />
                <Button variant="primary" size="sm" type="button" onClick={handleAddCustomType}>Add</Button>
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddingCustomType(false)}>Cancel</Button>
              </div>
            ) : (
              <select 
                className="form-select"
                value={eventData.type}
                onChange={(e) => setEventData({...eventData, type: e.target.value})}
                style={{ fontSize: '0.9rem' }}
              >
                {eventTypes.map(t => (
                  <option key={t.id} value={t.value}>{t.name}</option>
                ))}
              </select>
            )}
          </div>

          {eventData.type === 'holiday' && (
            <div className="mb-4">
              <label className="form-label" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Duration</label>
              <select 
                className="form-select"
                value={eventData.duration}
                onChange={(e) => setEventData({...eventData, duration: e.target.value})}
                style={{ fontSize: '0.9rem' }}
              >
                <option value="Full Day">Full Day</option>
                <option value="First Half">First Half</option>
                <option value="Second Half">Second Half</option>
              </select>
            </div>
          )}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="outline" type="button" onClick={() => setIsEventModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Event</Button>
          </div>
        </form>
      </Modal>

      <Modal open={isViewAllModalOpen} onClose={() => setIsViewAllModalOpen(false)} title="All Events" size="md">
        <div className="p-3" style={{maxHeight: '65vh', overflowY: 'auto'}}>
          {events.length === 0 ? (
            <p className="text-center text-muted py-4">No events scheduled.</p>
          ) : (
            Object.entries(
              events.reduce((acc, ev) => {
                try {
                  const month = format(parseISO(ev.date), 'MM/yyyy');
                  if (!acc[month]) acc[month] = [];
                  acc[month].push(ev);
                } catch(e) {}
                return acc;
              }, {})
            ).map(([month, evts]) => (
              <div key={month} className="mb-4">
                <h6 className="mb-3" style={{color: 'var(--color-primary)', fontWeight: 700, borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem'}}>{month}</h6>
                <div className="d-flex flex-column gap-3">
                  {evts.sort((a,b) => new Date(a.date) - new Date(b.date)).map(ev => (
                    <div key={ev._id || ev.id} className="d-flex justify-content-between p-3 border rounded align-items-center shadow-sm" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                      <div className="d-flex gap-3 align-items-center">
                        <div style={{width: 45, height: 45, borderRadius: 10, background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          {ev.type === 'birthday' ? <FiGift size={22} /> : (ev.type === 'holiday' ? <FiCalendar size={22} /> : <FiTag size={22} />)}
                        </div>
                        <div>
                          <div style={{fontWeight: 700, color: 'var(--color-text-primary)'}}>
                            {ev.title} {ev.type === 'holiday' && '(Holiday)'}
                          </div>
                          <div style={{fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.1rem'}}>
                            {ev.desc || (eventTypes.find(t => t.value === ev.type)?.name || 'Event')}
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <div style={{fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.95rem'}}>
                          {(() => { try { return format(parseISO(ev.date), 'dd/MM/yyyy'); } catch(e) { return ev.date; } })()}
                        </div>
                        <div style={{fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.1rem'}}>
                          {ev.type === 'holiday' && ev.duration ? ev.duration : 'All Day'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}
