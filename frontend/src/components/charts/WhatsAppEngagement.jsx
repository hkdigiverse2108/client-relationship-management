import React from "react";
import { FiClock } from "react-icons/fi";
import "./WhatsAppEngagement.css";

export default function WhatsAppEngagement() {
  const chartData = [
    { day: "M", received: 45, sent: 30 },
    { day: "T", received: 70, sent: 50 },
    { day: "W", received: 60, sent: 45 },
    { day: "T", received: 80, sent: 65 },
    { day: "F", received: 65, sent: 50 },
    { day: "S", received: 40, sent: 30 },
    { day: "S", received: 35, sent: 20 },
  ];

  const maxVal = Math.max(...chartData.flatMap((d) => [d.received, d.sent]));

  return (
    <div className="wa-engage">
      <div className="wa-engage__header">
        <div className="wa-engage__title-wrapper">
          <div className="wa-engage__title-icon"></div>
          <h3 className="wa-engage__title">WhatsApp Engagement</h3>
        </div>
        <div className="wa-engage__badge">
          <span className="wa-engage__dot"></span>
          Live
        </div>
      </div>

      <div className="wa-engage__body">
        <div className="wa-engage__chart-container">
          <h4 className="wa-engage__subtitle">SENT VS. RECEIVED</h4>
          
          <div className="wa-engage__bars">
            {chartData.map((d, i) => {
              const receivedHeight = (d.received / maxVal) * 100;
              const sentHeight = (d.sent / maxVal) * 100;
              
              return (
                <div key={i} className="wa-engage__bar-group">
                  <div className="wa-engage__bar-pair">
                    <div className="wa-engage__bar wa-engage__bar--received" style={{ height: `${receivedHeight}%` }}></div>
                    <div className="wa-engage__bar wa-engage__bar--sent" style={{ height: `${sentHeight}%` }}></div>
                  </div>
                  <span className="wa-engage__day">{d.day}</span>
                </div>
              );
            })}
          </div>

          <div className="wa-engage__legend">
            <div className="wa-engage__legend-item">
              <span className="wa-engage__legend-dot wa-engage__legend-dot--received"></span> Received
            </div>
            <div className="wa-engage__legend-item">
              <span className="wa-engage__legend-dot wa-engage__legend-dot--sent"></span> Sent
            </div>
          </div>
        </div>

        <div className="wa-engage__metrics">
          <div className="wa-engage__metric-card">
            <div className="wa-engage__metric-icon-wrapper">
              <FiClock className="wa-engage__metric-icon" />
            </div>
            <h5 className="wa-engage__metric-title">AVG. RESPONSE TIME</h5>
            <div className="wa-engage__metric-value">1.8m</div>
            <p className="wa-engage__metric-desc">98% within SLA threshold</p>
          </div>
        </div>
      </div>
    </div>
  );
}
