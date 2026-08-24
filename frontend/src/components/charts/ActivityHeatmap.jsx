import React, { useMemo } from "react";
import { FiActivity } from "react-icons/fi";
import "./ActivityHeatmap.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function ActivityHeatmap({ data }) {
  // data is expected to be an array of objects: { day: 0..6, hour: 0..23, count: number }
  const heatmapMap = useMemo(() => {
    const map = new Map();
    if (data && data.length) {
      data.forEach((d) => {
        map.set(`${d.day}-${d.hour}`, d.count);
      });
    }
    return map;
  }, [data]);

  const maxCount = useMemo(() => {
    if (!data || data.length === 0) return 1;
    return Math.max(...data.map((d) => d.count), 1);
  }, [data]);

  // Function to calculate opacity based on count and maxCount.
  // We avoid returning 0 opacity if count > 0.
  const getOpacity = (count) => {
    if (!count) return 0.05; // Empty state subtle background
    return Math.max(0.2, count / maxCount);
  };

  return (
    <div className="aio-heatmap">
      <div className="aio-heatmap__header">
        <FiActivity className="aio-heatmap__icon" />
        <h3 className="aio-heatmap__title">Activity Heatmap — 30 Days</h3>
      </div>

      <div className="aio-heatmap__body">
        {/* X-axis labels (Hours) */}
        <div className="aio-heatmap__x-axis">
          <div className="aio-heatmap__y-spacer"></div>
          {HOURS.map((hour) => (
            <div key={hour} className="aio-heatmap__x-label">
              {hour.toString().padStart(2, "0")}
            </div>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="aio-heatmap__grid-container">
          {DAYS.map((dayName, dayIndex) => (
            <div key={dayName} className="aio-heatmap__row">
              <div className="aio-heatmap__y-label">{dayName}</div>
              <div className="aio-heatmap__cells">
                {HOURS.map((hour) => {
                  const count = heatmapMap.get(`${dayIndex}-${hour}`) || 0;
                  const opacity = getOpacity(count);
                  
                  return (
                    <div
                      key={hour}
                      className="aio-heatmap__cell"
                      style={{
                        backgroundColor: count > 0 ? "var(--color-primary)" : "var(--color-input-hover, #e2e8f0)",
                        opacity: count > 0 ? opacity : 1,
                      }}
                      title={`${dayName}, ${hour}:00 - ${count} activities`}
                    ></div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="aio-heatmap__legend">
          <span className="aio-heatmap__legend-text">Less</span>
          <div className="aio-heatmap__legend-box" style={{ backgroundColor: "var(--color-input-hover, #e2e8f0)" }}></div>
          <div className="aio-heatmap__legend-box" style={{ backgroundColor: "var(--color-primary)", opacity: 0.25 }}></div>
          <div className="aio-heatmap__legend-box" style={{ backgroundColor: "var(--color-primary)", opacity: 0.5 }}></div>
          <div className="aio-heatmap__legend-box" style={{ backgroundColor: "var(--color-primary)", opacity: 0.75 }}></div>
          <div className="aio-heatmap__legend-box" style={{ backgroundColor: "var(--color-primary)", opacity: 1 }}></div>
          <span className="aio-heatmap__legend-text">More</span>
        </div>
      </div>
    </div>
  );
}
