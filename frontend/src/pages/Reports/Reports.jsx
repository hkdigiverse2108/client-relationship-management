import React, { useState, useEffect, useMemo } from "react";
import { FiPlus, FiAlertCircle, FiDollarSign, FiTrendingUp, FiPieChart, FiBarChart2 } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import StatCard from "@/components/common/StatCard/StatCard";
import BarChart from "@/components/charts/BarChart";
import DoughnutChart from "@/components/charts/DoughnutChart";
import Table from "@/components/common/Table/Table";
import Badge from "@/components/common/Badge/Badge";
import SearchInput from "@/components/common/PageHeaderSearchBar/SearchInput";
import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";
import api from "@/api/axiosClient";
import toast from "react-hot-toast";
import ProjectFormModal from "../Project/ProjectFormModal";
import { formatCurrency, formatDate } from "@/utils/formatters";

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "hold" },
  { label: "Cancelled", value: "cancelled" },
];

const STAGE_OPTIONS = [
  { label: "All Stages", value: "all" },
  { label: "New", value: "new" },
  { label: "In Progress", value: "in_progress" },
  { label: "In Review", value: "review" },
  { label: "Completed", value: "completed" },
  { label: "On Hold", value: "hold" }
];

export default function Reports() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projRes, cliRes, usrRes] = await Promise.all([
        api.get("/projects"),
        api.get("/clients"),
        api.get("/users")
      ]);
      setProjects(projRes || []);
      setClients(cliRes || []);
      setUsers(usrRes || []);
    } catch (err) {
      toast.error("Failed to load report data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const clientsMap = useMemo(() => {
    const map = {};
    clients.forEach(c => map[c.id || c._id] = c.company_name || c.client_name);
    return map;
  }, [clients]);

  const usersMap = useMemo(() => {
    const map = {};
    users.forEach(u => map[u.id || u._id] = u.name);
    return map;
  }, [users]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchSearch = !searchQuery || 
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (clientsMap[p.client_id] || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      const matchStage = stageFilter === "all" || (p.stage || "new") === stageFilter;
      return matchSearch && matchStatus && matchStage;
    });
  }, [projects, searchQuery, statusFilter, stageFilter, clientsMap]);

  // KPIs
  const totalProjects = filteredProjects.length;
  const totalBudget = filteredProjects.reduce((sum, p) => sum + (p.budget || 0), 0);
  const totalValue = filteredProjects.reduce((sum, p) => sum + (p.project_value || 0), 0);
  
  const today = new Date();
  const overdueProjects = useMemo(() => {
    return filteredProjects.filter(p => {
      if (p.status === "completed" || p.status === "cancelled") return false;
      if (!p.end_date) return false;
      const endDate = new Date(p.end_date);
      return endDate < today;
    });
  }, [filteredProjects, today]);

  // Charts Data
  const workloadData = useMemo(() => {
    const counts = {};
    filteredProjects.forEach(p => {
      if (p.status !== "completed" && p.status !== "cancelled") {
        const userName = usersMap[p.assigned_to] || "Unassigned";
        counts[userName] = (counts[userName] || 0) + 1;
      }
    });
    return {
      labels: Object.keys(counts),
      datasets: [
        {
          label: "Active Projects",
          data: Object.values(counts),
          backgroundColor: "rgba(99, 102, 241, 0.8)",
          borderRadius: 4
        }
      ]
    };
  }, [filteredProjects, usersMap]);

  const clientRevenueData = useMemo(() => {
    const revenue = {};
    filteredProjects.forEach(p => {
      const clientName = clientsMap[p.client_id] || "Unknown Client";
      revenue[clientName] = (revenue[clientName] || 0) + (p.project_value || 0);
    });
    
    const sortedClients = Object.entries(revenue).sort((a, b) => b[1] - a[1]);
    const topClients = sortedClients.slice(0, 5);
    const others = sortedClients.slice(5).reduce((sum, [, val]) => sum + val, 0);
    
    const labels = topClients.map(c => c[0]);
    const data = topClients.map(c => c[1]);
    if (others > 0) {
      labels.push("Others");
      data.push(others);
    }

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#64748b"],
          borderWidth: 0,
        }
      ]
    };
  }, [filteredProjects, clientsMap]);

  const handleSaveProject = async (values) => {
    setSubmitting(true);
    try {
      await api.post("/projects", values);
      toast.success("Project created successfully");
      setModalOpen(false);
      loadData();
    } catch (err) {
      toast.error("Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { 
      key: "title", 
      label: "Project", 
      sortable: true,
      render: (r) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.title}</div>
          <div className="text-subtle" style={{ fontSize: 12 }}>{clientsMap[r.client_id] || "Unknown"}</div>
        </div>
      )
    },
    { 
      key: "status", 
      label: "Status",
      render: (r) => {
        const variants = { active: "success", hold: "warning", completed: "primary", cancelled: "danger" };
        return <Badge variant={variants[r.status] || "secondary"} className="text-capitalize">{r.status}</Badge>;
      }
    },
    { 
      key: "stage", 
      label: "Stage",
      render: (r) => {
        const s = STAGE_OPTIONS.find(opt => opt.value === (r.stage || "new"));
        return <span>{s ? s.label : r.stage}</span>;
      }
    },
    { 
      key: "priority", 
      label: "Priority",
      render: (r) => (
        <span className={`text-capitalize text-${r.priority === 'critical' ? 'danger' : r.priority === 'high' ? 'warning' : 'primary'}`}>
          {r.priority}
        </span>
      )
    },
    { key: "budget", label: "Budget", sortable: true, render: (r) => formatCurrency(r.budget || 0) },
    { key: "project_value", label: "Value", sortable: true, render: (r) => formatCurrency(r.project_value || 0) },
    { key: "end_date", label: "Deadline", sortable: true, render: (r) => r.end_date ? formatDate(r.end_date) : "-" },
  ];

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader
        title="Project Reports"
        description="Comprehensive insights into project performance, workload, and financials."
        actions={
          <>
            {/* Desktop Actions */}
            <div className="d-none d-lg-flex align-items-center gap-2">
              <SearchInput
                dark
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select 
                className="form-select form-select-sm"
                style={{ width: "130px", height: "38px", borderRadius: "var(--radius-full)" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <select 
                className="form-select form-select-sm"
                style={{ width: "130px", height: "38px", borderRadius: "var(--radius-full)" }}
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
              >
                {STAGE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <Button icon={FiPlus} onClick={() => setModalOpen(true)}>New Project</Button>
            </div>

            {/* Mobile Actions */}
            <div className="d-flex d-lg-none">
              <Button icon={FiPlus} onClick={() => setModalOpen(true)}>New Project</Button>
            </div>
          </>
        }
      />

      {/* Mobile Toolbar */}
      <div className="row d-lg-none g-3 mb-4">
        <div className="col-12 col-md-4">
          <SearchInput
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-4">
          <select 
            className="form-select"
            style={{ borderRadius: "var(--radius-full)", width: "100%" }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-4">
          <select 
            className="form-select"
            style={{ borderRadius: "var(--radius-full)", width: "100%" }}
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
          >
            {STAGE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <StatCard 
            label="Total Projects"
            value={totalProjects}
            icon={FiTrendingUp}
            format="number"
          />
        </div>
        <div className="col-12 col-md-4">
          <StatCard 
            label="Total Project Value"
            value={totalValue}
            icon={FiDollarSign}
            format="currency"
          />
        </div>
        <div className="col-12 col-md-4">
          <StatCard 
            label="Overdue Projects"
            value={overdueProjects.length}
            icon={FiAlertCircle}
            format="number"
            variant={overdueProjects.length > 0 ? "danger" : "default"}
          />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-8">
          <div className="card h-100">
            <div className="card-header bg-transparent border-0 pt-4 px-4 pb-2 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 d-flex align-items-center gap-2">
                <FiBarChart2 className="text-primary" /> Team Workload Distribution
              </h5>
            </div>
            <div className="card-body px-4 pb-4">
              <BarChart 
                labels={workloadData.labels} 
                formatLabel={(name) => {
                  const parts = name.trim().split(" ");
                  if (parts.length > 1) {
                    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
                  }
                  return name;
                }}
                datasets={workloadData.datasets} 
                height={300} 
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-header bg-transparent border-0 pt-4 px-4 pb-2 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 d-flex align-items-center gap-2">
                <FiPieChart className="text-primary" /> Client Revenue
              </h5>
            </div>
            <div className="card-body px-4 pb-4">
              <DoughnutChart 
                labels={clientRevenueData.labels} 
                values={clientRevenueData.datasets[0].data} 
                colors={clientRevenueData.datasets[0].backgroundColor}
                height={300} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-9">
          <div className="card overflow-hidden">
            <div className="card-header bg-transparent border-bottom-0 pt-4 px-4 pb-3">
              <h5 className="mb-0">Project Performance Summary</h5>
            </div>
            <div className="px-4 pb-4">
              <Table columns={columns} data={filteredProjects} loading={loading} />
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-3">
          <div className="card h-100">
            <div className="card-header bg-transparent border-bottom-0 pt-4 px-4 pb-3">
              <h5 className="mb-0 text-danger d-flex align-items-center gap-2">
                <FiAlertCircle /> Overdue Projects
              </h5>
            </div>
            <div className="card-body px-4 pb-4">
              {overdueProjects.length === 0 ? (
                <div className="text-center p-4 text-subtle bg-light rounded">
                  No overdue projects! 🎉
                </div>
              ) : (
                <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
                  {overdueProjects.slice(0, 5).map(p => (
                    <li key={p.id || p._id} className="p-3 border rounded bg-white shadow-sm">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-0 text-truncate pe-2">{p.title}</h6>
                        <Badge variant="danger" className="text-capitalize">{p.status}</Badge>
                      </div>
                      <div className="text-subtle mb-1" style={{ fontSize: 13 }}>
                        Client: {clientsMap[p.client_id] || "Unknown"}
                      </div>
                      <div className="text-danger fw-medium d-flex align-items-center gap-1" style={{ fontSize: 13 }}>
                        <FiAlertCircle size={12} /> Due: {formatDate(p.end_date)}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ProjectFormModal 
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSaveProject}
          submitting={submitting}
        />
      )}
    </>
  );
}