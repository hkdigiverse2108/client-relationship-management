import React, { useState, useEffect } from 'react';
import { FiClock, FiCoffee, FiLogOut, FiLogIn } from 'react-icons/fi';

export default function PunchSystem() {
  const [liveTime, setLiveTime] = useState(new Date());
  
  // Stopwatch state
  const [punchState, setPunchState] = useState('out'); // 'out', 'in', 'break'
  const [workSeconds, setWorkSeconds] = useState(0);
  const [breakStartSeconds, setBreakStartSeconds] = useState(0); // to calculate duration of current break
  
  const [logs, setLogs] = useState([]);

  // Live time ticker
  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Work timer
  useEffect(() => {
    let interval = null;
    if (punchState === 'in') {
      interval = setInterval(() => {
        setWorkSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [punchState]);

  const formatClock = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const formatDuration = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  const logAction = (actionText) => {
    const timeStr = liveTime.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
    setLogs(prev => [
      { id: Date.now(), action: actionText, time: timeStr },
      ...prev
    ].slice(0, 5));
  };

  const handlePunchToggle = () => {
    if (punchState === 'out') {
      setPunchState('in');
      logAction('Punched In');
    } else {
      // If punching out from a break, log the break duration first
      if (punchState === 'break') {
        const breakDuration = Math.floor(Date.now() / 1000) - breakStartSeconds;
        logAction(`Break Over (${formatDuration(breakDuration)})`);
      }
      setPunchState('out');
      setWorkSeconds(0); // Reset instantly on punch out
      logAction('Punched Out');
    }
  };

  const handleBreakToggle = () => {
    if (punchState === 'in') {
      setPunchState('break');
      setBreakStartSeconds(Math.floor(Date.now() / 1000));
      logAction('Took Break');
    } else if (punchState === 'break') {
      const breakDuration = Math.floor(Date.now() / 1000) - breakStartSeconds;
      setPunchState('in');
      logAction(`Break Over (${formatDuration(breakDuration)})`);
    }
  };

  return (
    <>
    <div className="hrms-punch-widget">
      {/* Live standard time at the very top */}
      <div className="text-center mb-3">
        <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
          {liveTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          {liveTime.toLocaleTimeString('en-US', { hour12: true })}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', fontWeight: 600, marginBottom: '0.25rem' }}>
          Live Working Time
        </div>
        <div className="hrms-punch-clock" style={{ color: punchState === 'break' ? '#f59e0b' : 'var(--color-text-primary)'}}>
          {formatClock(workSeconds)}
        </div>
      </div>
      
      <div className="hrms-punch-actions">
        <button 
          className={`hrms-punch-btn ${punchState === 'out' ? 'btn-in' : 'btn-out'}`}
          onClick={handlePunchToggle}
        >
          {punchState === 'out' ? <><FiLogIn /> Punch In</> : <><FiLogOut /> Punch Out</>}
        </button>

        <button 
          className="hrms-punch-btn btn-break"
          disabled={punchState === 'out'}
          onClick={handleBreakToggle}
          style={{ opacity: punchState === 'out' ? 0.5 : 1 }}
        >
          {punchState === 'break' ? <><FiCoffee /> Break Out</> : <><FiCoffee /> Take Break</>}
        </button>
      </div>

      {logs.length > 0 && (
        <div className="hrms-punch-log">
          {logs.map(log => (
            <div key={log.id} className="hrms-log-item">
              <span className="action">{log.action}</span>
              <span className="time">{log.time}</span>
            </div>
          ))}
        </div>
      )}
      </div>

      {/* New Metrics Row Below Punch Widget */}
      <div className="row g-4 mb-4 mt-2">
        <div className="col-12 col-md-4">
          <div className="hrms-stat-card d-flex flex-row justify-content-between align-items-center">
            <div>
              <div style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '1rem'}}>Today's Hours</div>
              <div style={{fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)'}}>
                {Math.floor(workSeconds / 3600).toString().padStart(2, '0')}h {Math.floor((workSeconds % 3600) / 60).toString().padStart(2, '0')}m
              </div>
              <div style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem'}}>
                <span style={{color: '#10b981', fontWeight: 600}}>↗ 12%</span> vs yesterday
              </div>
            </div>
            <div style={{width: 40, height: 40, borderRadius: 8, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem'}}>
              <FiClock />
            </div>
          </div>
        </div>
        
        <div className="col-12 col-md-4">
          <div className="hrms-stat-card d-flex flex-row justify-content-between align-items-center">
            <div>
              <div style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '1rem'}}>All Time Hours</div>
              <div style={{fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)'}}>
                0h 0m
              </div>
              <div style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem'}}>
                Since joining the company
              </div>
            </div>
            <div style={{width: 40, height: 40, borderRadius: 8, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem'}}>
              <FiClock />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="hrms-stat-card d-flex flex-row justify-content-between align-items-center">
            <div>
              <div style={{fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '1rem'}}>Break Time (Today)</div>
              <div style={{fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)'}}>
                0h {Math.floor(breakStartSeconds ? (Math.floor(Date.now() / 1000) - breakStartSeconds) / 60 : 0)}m
              </div>
              <div style={{fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem'}}>
                60m daily limit
              </div>
            </div>
            <div style={{width: 40, height: 40, borderRadius: 8, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem'}}>
              <FiCoffee />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
