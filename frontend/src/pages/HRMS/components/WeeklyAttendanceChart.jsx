import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import api from '@/api/axiosClient';

export default function WeeklyAttendanceChart() {
  const { isDark } = useTheme();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const res = await api.get('/hrms/attendance/weekly');
        if (res) setData(res);
      } catch (err) {
        console.error("Failed to fetch weekly attendance", err);
      }
    };
    fetchWeeklyData();
  }, []);

  return (
    <div className="hrms-panel">
      <div className="hrms-panel-header">
        <div>
          <h3 className="hrms-panel-title">Weekly Attendance Analytics</h3>
          <p className="hrms-panel-subtitle">Present ratio percentages for the past 6 operational days.</p>
        </div>
      </div>

      <div style={{ width: '100%', height: 250, marginTop: '2rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis 
              dataKey="name" 
              tickFormatter={(value, i) => `${value} (${data[i]?.present || 0}%)`} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: isDark ? '#cbd5e1' : '#64748b', fontSize: 12 }}
              dy={10}
            />
            <Tooltip 
              cursor={{ stroke: 'var(--color-border)' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="present" 
              stroke="var(--color-primary)" 
              strokeWidth={3} 
              dot={{ r: 5, fill: 'var(--color-primary)', strokeWidth: 0 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
