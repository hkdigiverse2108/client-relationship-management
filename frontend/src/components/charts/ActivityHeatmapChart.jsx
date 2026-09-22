import React, { useState } from 'react';

const ActivityHeatmapChart = () => {
  // Use the theme's primary CSS variable, fallback to default orange
  const primaryColor = typeof window !== 'undefined' 
    ? getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#FF6F28'
    : '#FF6F28';

  const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 111, 40';
  };
  
  const safeHex = primaryColor.length === 4 ? '#' + primaryColor[1]+primaryColor[1]+primaryColor[2]+primaryColor[2]+primaryColor[3]+primaryColor[3] : primaryColor;
  const rgb = hexToRgb(safeHex);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0'));

  // Generate data once
  const data = React.useMemo(() => {
    let _data = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      let isWeekend = dayIndex === 0 || dayIndex === 6;
      for (let hourIndex = 0; hourIndex < 24; hourIndex++) {
        let y = 0;
        if (isWeekend) {
          y = Math.random() > 0.6 ? Math.floor(Math.random() * 20) : 0; 
        } else {
          if (hourIndex >= 9 && hourIndex <= 17) {
            y = Math.floor(Math.random() * 80) + 10; 
          } else if (hourIndex > 17 && hourIndex <= 21) {
            y = Math.random() > 0.3 ? Math.floor(Math.random() * 40) : 0; 
          } else {
            y = Math.random() > 0.8 ? Math.floor(Math.random() * 10) : 0; 
          }
        }
        _data.push({ day: days[dayIndex], hour: hours[hourIndex], value: y });
      }
    }
    return _data;
  }, []);

  const getColor = (value) => {
    if (value === 0) return 'rgba(156, 163, 175, 0.15)'; // Empty state, works elegantly on both dark and light
    if (value <= 20) return `rgba(${rgb}, 0.3)`;
    if (value <= 50) return `rgba(${rgb}, 0.55)`;
    if (value <= 80) return `rgba(${rgb}, 0.8)`;
    return `rgba(${rgb}, 1)`;
  };

  // State for custom beautiful tooltip
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, text: '' });

  const handleMouseMove = (e, text) => {
    setTooltip({
      show: true,
      x: e.clientX,
      y: e.clientY - 35, // display slightly above the cursor
      text
    });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, show: false }));
  };

  return (
    <div className="activity-heatmap-wrapper w-100 position-relative pb-2 pt-2">
      <style>{`
        .github-heatmap-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: max-content;
          padding: 10px 0;
        }
        .heatmap-header-row {
          display: flex;
          margin-left: 43px;
          gap: 6px;
        }
        .heatmap-hour-label {
          width: 22px;
          font-size: 12px;
          color: #9CA3AF;
          text-align: center;
          font-weight: 500;
        }
        .heatmap-day-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .heatmap-day-label {
          width: 35px;
          font-size: 12px;
          color: #9CA3AF;
          text-align: right;
          margin-right: 8px;
          font-weight: 500;
        }
        .heatmap-cell {
          width: 22px;
          height: 22px;
          border-radius: 5px;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease, filter 0.2s ease;
        }
        .heatmap-cell:hover {
          transform: scale(1.6);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          z-index: 10;
          position: relative;
          filter: brightness(1.1);
        }
        
        /* Custom thin elegant scrollbar */
        .heatmap-scroll-area::-webkit-scrollbar {
          height: 5px;
        }
        .heatmap-scroll-area::-webkit-scrollbar-track {
          background: rgba(156, 163, 175, 0.1);
          border-radius: 4px;
        }
        .heatmap-scroll-area::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.4);
          border-radius: 4px;
        }
        .heatmap-scroll-area::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.6);
        }
      `}</style>
      
      <div className="heatmap-scroll-area" style={{ overflowX: 'auto', overflowY: 'hidden', paddingBottom: '10px' }}>
        <div className="github-heatmap-container px-2">
          
          {/* Header Row (Hours) */}
          <div className="heatmap-header-row">
            {hours.map(hour => (
              <div key={hour} className="heatmap-hour-label">{hour}</div>
            ))}
          </div>

          {/* Grid Rows */}
          {days.map(day => (
            <div key={day} className="heatmap-day-row">
              <div className="heatmap-day-label">{day}</div>
              {hours.map(hour => {
                const cellData = data.find(d => d.day === day && d.hour === hour);
                return (
                  <div 
                    key={`${day}-${hour}`}
                    className="heatmap-cell"
                    style={{ backgroundColor: getColor(cellData.value) }}
                    onMouseMove={(e) => handleMouseMove(e, `${day}, ${hour}:00 - ${cellData.value} activities`)}
                    onMouseLeave={handleMouseLeave}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Dynamic Floating Tooltip */}
      {tooltip.show && (
        <div 
          className="position-fixed rounded px-2 py-1 shadow-lg"
          style={{
            top: tooltip.y + 'px',
            left: tooltip.x + 'px',
            transform: 'translateX(-50%)',
            fontSize: '12px',
            zIndex: 9999,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            backgroundColor: '#1f2937', // Dark background for tooltip
            color: '#fff',
            border: '1px solid #374151'
          }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Legend */}
      <div className="d-flex align-items-center mt-3 px-3">
          <span className="fs-12 text-muted me-2">Less</span>
          <span className="d-inline-block rounded me-1" style={{ width: '13px', height: '13px', backgroundColor: 'rgba(156, 163, 175, 0.15)' }}></span>
          <span className="d-inline-block rounded me-1" style={{ width: '13px', height: '13px', backgroundColor: `rgba(${rgb}, 0.3)` }}></span>
          <span className="d-inline-block rounded me-1" style={{ width: '13px', height: '13px', backgroundColor: `rgba(${rgb}, 0.55)` }}></span>
          <span className="d-inline-block rounded me-1" style={{ width: '13px', height: '13px', backgroundColor: `rgba(${rgb}, 0.8)` }}></span>
          <span className="d-inline-block rounded me-2" style={{ width: '13px', height: '13px', backgroundColor: `rgba(${rgb}, 1)` }}></span>
          <span className="fs-12 text-muted">More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmapChart;
