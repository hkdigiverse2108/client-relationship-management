import React from "react";
import "./ConversionFunnel.css";

export default function ConversionFunnel({ data }) {
  if (!data || data.length === 0) return null;

  // Find max value to determine the 100% width, fallback to 1 to avoid division by zero.
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="aio-funnel">
      <div className="aio-funnel__list">
        {data.map((item, index) => {
          const percentage = Math.min((item.value / maxValue) * 100, 100);
          
          return (
            <div key={index} className="aio-funnel__stage">
              <div className="aio-funnel__stage-header">
                <span className="aio-funnel__label">{item.label}</span>
                <span className="aio-funnel__value">{item.value}</span>
              </div>
              <div className="aio-funnel__track">
                <div 
                  className="aio-funnel__fill" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
