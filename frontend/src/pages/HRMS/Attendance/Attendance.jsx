import React, { useState, useMemo, useEffect } from "react";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Table from "@/components/common/Table/Table";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Avatar from "@/components/common/Avatar/Avatar";
import Badge from "@/components/common/Badge/Badge";
import { FiUsers, FiUserX, FiClock, FiPercent, FiMonitor, FiSmartphone, FiCheckCircle } from "react-icons/fi";
import { getProfilePhotoUrl, filterBySearch } from "@/utils/helpers";
import { useDebounce } from "@/hooks/useDebounce";
import api from '@/api/axiosClient';
import "./Attendance.css";

export default function Attendance() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [totalStaff, setTotalStaff] = useState(0);

  const debounced = useDebounce(search, 250);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attRes, statsRes] = await Promise.all([
          api.get('/hrms/attendance'),
          api.get('/hrms/dashboard/department-stats')
        ]);
        setAttendanceRecords(attRes || []);
        setTotalStaff(statsRes?.total_employees || 0);
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
      }
    };
    fetchData();
  }, []);
  
  const filtered = useMemo(() => {
    let result = attendanceRecords;
    if (filterStatus !== "All") {
      result = result.filter(r => r.status === filterStatus);
    }
    return filterBySearch(result, debounced, ["employee_name", "employee_id"]);
  }, [attendanceRecords, debounced, filterStatus]);

  const formatDuration = (totalSeconds) => {
    if (!totalSeconds) return "-";
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const columns = [
    { 
      key: "employee", 
      label: "Employee", 
      render: (row) => (
        <div className="d-flex align-items-center gap-2">
          <Avatar src={getProfilePhotoUrl(row.photo)} name={row.employee_name} size={36} />
          <div>
            <div className="fw-semibold" style={{ color: "var(--color-text)" }}>{row.employee_name}</div>
            <div className="small text-muted">{row.employee_id}</div>
          </div>
        </div>
      ) 
    },
    { 
      key: "punch_in", 
      label: "Punch In",
      render: (row) => row.punch_in ? new Date(row.punch_in + 'Z').toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) : "-"
    },
    { 
      key: "punch_out", 
      label: "Punch Out",
      render: (row) => row.punch_out ? new Date(row.punch_out + 'Z').toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) : "-"
    },
    { 
      key: "work_hours", 
      label: "Working Hrs",
      render: (row) => formatDuration(row.work_seconds)
    },
    { 
      key: "break_duration", 
      label: "Break",
      render: (row) => formatDuration(row.break_seconds)
    },
    { 
      key: "overtime", 
      label: "Overtime",
      render: (row) => row.overtime_seconds > 0 ? <span className="text-success fw-medium">{formatDuration(row.overtime_seconds)}</span> : "-"
    },
    { 
      key: "method", 
      label: "Verification Method",
      render: (row) => {
        if (row.method === "Biometric") return <span className="text-muted"><FiCheckCircle className="me-1"/> Biometric</span>;
        if (row.method === "Mobile App") return <span className="text-muted"><FiSmartphone className="me-1"/> Mobile</span>;
        if (row.method === "Web Portal") return <span className="text-muted"><FiMonitor className="me-1"/> Web</span>;
        return "-";
      }
    },
    { 
      key: "status", 
      label: "Status", 
      render: (row) => {
        let variant = "secondary";
        if (row.status === "On Time") variant = "success";
        if (row.status === "Late") variant = "warning";
        if (row.status === "Absent") variant = "danger";
        if (row.status === "Half Day") variant = "info";
        return <Badge variant={variant}>{row.status}</Badge>;
      }
    },
  ];

  // Calculate live KPIs
  const presentCount = attendanceRecords.length;
  const absentCount = Math.max(0, totalStaff - presentCount);
  const lateCount = attendanceRecords.filter(r => r.status === "Late").length;
  const punctuality = totalStaff > 0 ? Math.round(((presentCount - lateCount) / totalStaff) * 100) : 0;

  const kpiData = {
    present: presentCount,
    total: totalStaff,
    absent: absentCount,
    late: lateCount,
    punctuality: isNaN(punctuality) ? 0 : punctuality
  };

  return (
    <div className="aio-attendance-page">
      <PageHeader 
        title="Attendance Management" 
        description="Track employee attendance, punch-in/out & work hours"
      />

      <div className="row g-4 mt-2">
        {/* Card 1: Staff Present Today */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="aio-card p-3 h-100 d-flex align-items-center gap-3">
            <div className="icon-wrapper bg-success-subtle text-success p-3 rounded-circle">
              <FiUsers size={24} />
            </div>
            <div>
              <div className="text-muted small fw-medium text-uppercase tracking-wider mb-1">Staff Present Today</div>
              <h3 className="mb-0 fw-bold">{kpiData.present} <span className="fs-6 text-muted fw-normal">/ {kpiData.total}</span></h3>
            </div>
          </div>
        </div>

        {/* Card 2: Absent Today */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="aio-card p-3 h-100 d-flex align-items-center gap-3">
            <div className="icon-wrapper bg-danger-subtle text-danger p-3 rounded-circle">
              <FiUserX size={24} />
            </div>
            <div>
              <div className="text-muted small fw-medium text-uppercase tracking-wider mb-1">Absent Today</div>
              <h3 className="mb-0 fw-bold">{kpiData.absent}</h3>
            </div>
          </div>
        </div>

        {/* Card 3: Late Punch In */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="aio-card p-3 h-100 d-flex align-items-center gap-3">
            <div className="icon-wrapper bg-warning-subtle text-warning p-3 rounded-circle">
              <FiClock size={24} />
            </div>
            <div>
              <div className="text-muted small fw-medium text-uppercase tracking-wider mb-1">Late Punch In</div>
              <h3 className="mb-0 fw-bold">{kpiData.late}</h3>
            </div>
          </div>
        </div>

        {/* Card 4: Punctuality Ratio in % */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="aio-card p-3 h-100 d-flex align-items-center gap-3">
            <div className="icon-wrapper bg-primary-subtle text-primary p-3 rounded-circle">
              <FiPercent size={24} />
            </div>
            <div>
              <div className="text-muted small fw-medium text-uppercase tracking-wider mb-1">Punctuality Ratio</div>
              <h3 className="mb-0 fw-bold">{kpiData.punctuality}%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Navigation Tabs */}
      <div className="hrms-tabs mt-4">
        {['Overview', 'Shift Schedules'].map(tab => (
          <button 
            key={tab} 
            className={`hrms-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="aio-card p-0 mt-4 dir-card">
          <div className="dir-toolbar p-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div style={{ width: "100%", maxWidth: "400px" }}>
              <SearchBar 
                value={search} 
                onChange={setSearch} 
                placeholder="Search employee name or ID..." 
              />
            </div>
            <div className="d-flex gap-2">
              <select 
                className="form-select form-select-sm text-muted" 
                style={{ width: "150px" }}
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="On Time">On Time</option>
                <option value="Late">Late</option>
                <option value="Absent">Absent</option>
                <option value="Half Day">Half Day</option>
              </select>
            </div>
          </div>
          
          <Table 
            columns={columns} 
            data={filtered} 
            emptyMessage="No attendance records found for today."
          />
        </div>
      )}

      {activeTab === 'Shift Schedules' && (
        <div className="row g-4 mt-2">
          {/* General Shift */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="aio-card p-0 h-100 d-flex flex-column border">
              <div className="p-3 bg-primary-subtle text-primary border-bottom">
                <h6 className="fw-bold mb-1" style={{ color: "inherit" }}>General Shift</h6>
                <div className="small opacity-75 d-flex align-items-center gap-1">
                  <FiClock size={12} /> 09:30 AM - 06:30 PM
                </div>
              </div>
              <div className="p-3 d-flex justify-content-between align-items-center flex-grow-1" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="text-muted small fw-medium">Assigned Count:</span>
                <span className="fw-bold" style={{ color: "var(--color-text)" }}>12 Staff</span>
              </div>
            </div>
          </div>

          {/* Morning Shift */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="aio-card p-0 h-100 d-flex flex-column border">
              <div className="p-3 bg-warning-subtle text-warning-emphasis border-bottom">
                <h6 className="fw-bold mb-1" style={{ color: "inherit" }}>Morning Shift</h6>
                <div className="small opacity-75 d-flex align-items-center gap-1">
                  <FiClock size={12} /> 06:00 AM - 02:00 PM
                </div>
              </div>
              <div className="p-3 d-flex justify-content-between align-items-center flex-grow-1" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="text-muted small fw-medium">Assigned Count:</span>
                <span className="fw-bold" style={{ color: "var(--color-text)" }}>4 Staff</span>
              </div>
            </div>
          </div>

          {/* Evening Shift */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="aio-card p-0 h-100 d-flex flex-column border">
              <div className="p-3 bg-info-subtle text-info-emphasis border-bottom">
                <h6 className="fw-bold mb-1" style={{ color: "inherit" }}>Evening Shift</h6>
                <div className="small opacity-75 d-flex align-items-center gap-1">
                  <FiClock size={12} /> 02:00 PM - 10:00 PM
                </div>
              </div>
              <div className="p-3 d-flex justify-content-between align-items-center flex-grow-1" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="text-muted small fw-medium">Assigned Count:</span>
                <span className="fw-bold" style={{ color: "var(--color-text)" }}>6 Staff</span>
              </div>
            </div>
          </div>

          {/* Night Shift */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="aio-card p-0 h-100 d-flex flex-column border">
              <div className="p-3 bg-secondary-subtle text-secondary-emphasis border-bottom">
                <h6 className="fw-bold mb-1" style={{ color: "inherit" }}>Night Shift</h6>
                <div className="small opacity-75 d-flex align-items-center gap-1">
                  <FiClock size={12} /> 10:00 PM - 06:00 AM
                </div>
              </div>
              <div className="p-3 d-flex justify-content-between align-items-center flex-grow-1" style={{ backgroundColor: "var(--color-surface)" }}>
                <span className="text-muted small fw-medium">Assigned Count:</span>
                <span className="fw-bold" style={{ color: "var(--color-text)" }}>3 Staff</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
