import React, { useState } from 'react';
import './HRMSDashboard.css';
import PunchSystem from './components/PunchSystem';
import DepartmentAllocations from './components/DepartmentAllocations';
import WeeklyAttendanceChart from './components/WeeklyAttendanceChart';
import EventsWidget from './components/EventsWidget';
import HRUpdatesWidget from './components/HRUpdatesWidget';
import CompanyAssets from './components/CompanyAssets';
import PerformanceAppraisals from './components/PerformanceAppraisals';
import ATSPipeline from './ATS/ATSPipeline';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import { FiUsers, FiCheckCircle, FiClock, FiCalendar, FiFileText } from 'react-icons/fi';

export default function HRMSDashboard() {
  const [activeTab, setActiveTab] = useState('Stats & Feed');

  const tabs = [
    'Stats & Feed',
    'ATS Recruitment Pipeline',
    'Company Assets Cabinet',
    'Performance Appraisals'
  ];

  return (
    <>
      {/* Header */}
      <PageHeader 
        title="HRMS Enterprise Command Center"
        description="Standalone Department & Resource Administration Panel"
      />

      {/* Top Stats Cards */}
      <div className="hrms-stats-grid">
        <div className="hrms-stat-card d-flex flex-row justify-content-between align-items-center">
          <div>
            <div className="hrms-stat-label">Total Staff</div>
            <div className="hrms-stat-value">42</div>
          </div>
          <div style={{fontSize: '1.5rem', color: 'var(--color-primary)', opacity: 0.8}}><FiUsers /></div>
        </div>
        <div className="hrms-stat-card d-flex flex-row justify-content-between align-items-center">
          <div>
            <div className="hrms-stat-label">Present Today</div>
            <div className="hrms-stat-value">38</div>
          </div>
          <div style={{fontSize: '1.5rem', color: '#10b981', opacity: 0.8}}><FiCheckCircle /></div>
        </div>
        <div className="hrms-stat-card d-flex flex-row justify-content-between align-items-center">
          <div>
            <div className="hrms-stat-label">Absent/Late</div>
            <div className="hrms-stat-value">4</div>
          </div>
          <div style={{fontSize: '1.5rem', color: '#ef4444', opacity: 0.8}}><FiClock /></div>
        </div>
        <div className="hrms-stat-card d-flex flex-row justify-content-between align-items-center">
          <div>
            <div className="hrms-stat-label">Leave Active</div>
            <div className="hrms-stat-value">2</div>
          </div>
          <div style={{fontSize: '1.5rem', color: '#f59e0b', opacity: 0.8}}><FiCalendar /></div>
        </div>
        <div className="hrms-stat-card d-flex flex-row justify-content-between align-items-center">
          <div>
            <div className="hrms-stat-label">Pending Leaves</div>
            <div className="hrms-stat-value">5</div>
          </div>
          <div style={{fontSize: '1.5rem', color: '#8b5cf6', opacity: 0.8}}><FiFileText /></div>
        </div>
      </div>

      {/* Punch Time System */}
      <PunchSystem />

      {/* Tabs */}
      <div className="hrms-tabs">
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`hrms-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Stats & Feed' && (
        <div className="hrms-content-grid">
          {/* Left Column */}
          <div className="hrms-left-col">
            <DepartmentAllocations />
            <WeeklyAttendanceChart />
          </div>

          {/* Right Column */}
          <div className="hrms-right-col">
            <EventsWidget />
            <HRUpdatesWidget />
          </div>
        </div>
      )}

      {activeTab === 'ATS Recruitment Pipeline' && (
        <ATSPipeline />
      )}

      {activeTab === 'Company Assets Cabinet' && (
        <CompanyAssets />
      )}

      {activeTab === 'Performance Appraisals' && (
        <PerformanceAppraisals />
      )}

      {activeTab !== 'Stats & Feed' && 
       activeTab !== 'ATS Recruitment Pipeline' && 
       activeTab !== 'Company Assets Cabinet' && 
       activeTab !== 'Performance Appraisals' && (
        <div className="hrms-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h3 className="hrms-panel-title">Coming Soon</h3>
          <p className="hrms-panel-subtitle">This section is currently under development.</p>
        </div>
      )}
    </>
  );
}
