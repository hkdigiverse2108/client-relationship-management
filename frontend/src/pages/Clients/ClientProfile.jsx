import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axiosClient";
import { FiArrowLeft, FiDollarSign, FiCheckCircle, FiClock, FiFileText, FiBriefcase, FiLayers, FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import Button from "@/components/common/Button/Button";
import Avatar from "@/components/common/Avatar/Avatar";
import Table from "@/components/common/Table/Table";
import Badge from "@/components/common/Badge/Badge";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import { formatCurrency, formatDate } from "@/utils/formatters";
import toast from "react-hot-toast";
import InvoiceModal from "@/pages/Finance/InvoiceModal";
import PaymentModal from "@/pages/Finance/PaymentModal";
import DealFormModal from "./DealFormModal";
import ProjectFormModal from "./ProjectFormModal";
import "./ClientProfile.css"; // Basic CSS for tabs and cards

export default function ClientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [dealModalOpen, setDealModalOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [editData, setEditData] = useState(null);

  const openEdit = (data, setter) => {
    setEditData(data);
    setter(true);
  };

  const closeModals = () => {
    setInvoiceModalOpen(false);
    setPaymentModalOpen(false);
    setDealModalOpen(false);
    setProjectModalOpen(false);
    setEditData(null);
  };

  useEffect(() => {
    loadDashboard();
  }, [id]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/clients/${id}/dashboard`);
      setDashboard(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleSaveDeal = async (values) => {
    setSubmitting(true);
    try {
      if (editData) {
        await api.put(`/deals/${editData.id || editData._id}`, values);
        toast.success("Deal updated successfully");
      } else {
        await api.post("/deals", { ...values, client_id: id });
        toast.success("Deal created successfully");
      }
      closeModals();
      loadDashboard();
    } catch (e) {
      toast.error(e.message || "Failed to save deal");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveProject = async (values) => {
    setSubmitting(true);
    try {
      if (editData) {
        await api.put(`/projects/${editData.id || editData._id}`, values);
        toast.success("Project updated successfully");
      } else {
        await api.post("/projects", { ...values, client_id: id });
        toast.success("Project created successfully");
      }
      closeModals();
      loadDashboard();
    } catch (e) {
      toast.error(e.message || "Failed to save project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRecord = async (endpoint, recordId, name) => {
    const confirmed = await confirmDialog({ text: `Are you sure you want to delete ${name}?` });
    if (confirmed) {
      try {
        await api.delete(`/${endpoint}/${recordId}`);
        toast.success(`${name} deleted successfully`);
        loadDashboard();
      } catch (e) {
        toast.error(e.message || `Failed to delete ${name}`);
      }
    }
  };

  if (loading) return <div className="p-4 text-center">Loading Client Profile...</div>;
  if (!dashboard || !dashboard.client) return <div className="p-4 text-center">Client not found.</div>;

  const { client, financials, deals, projects, invoices, payments } = dashboard;

  const renderActions = (endpoint, record, name, setModalOpen) => (
    <Dropdown
      align="right"
      trigger={({ onClick }) => (
        <button className="btn btn-sm btn-light" onClick={(e) => { e.stopPropagation(); onClick(); }}>
          <FiMoreVertical />
        </button>
      )}
      items={[
        { label: "Edit", icon: FiEdit2, onClick: () => openEdit(record, setModalOpen) },
        { label: "Delete", icon: FiTrash2, danger: true, onClick: () => handleDeleteRecord(endpoint, record.id || record._id, name) },
      ]}
    />
  );

  const invoiceCols = [
    { key: "invoice_number", label: "Invoice #" },
    { key: "issue_date", label: "Issue Date" },
    { key: "total_amount", label: "Amount", render: r => formatCurrency(r.total_amount) },
    { key: "status", label: "Status", render: r => <Badge variant={r.status === 'paid' ? 'success' : 'warning'}>{r.status}</Badge> },
    { key: "actions", label: "", width: 60, align: "right", render: r => renderActions("invoices", r, `Invoice ${r.invoice_number}`, setInvoiceModalOpen) }
  ];

  const paymentCols = [
    { key: "payment_date", label: "Date" },
    { key: "payment_method", label: "Method" },
    { key: "amount_received", label: "Amount", render: r => formatCurrency(r.amount_received) },
    { key: "actions", label: "", width: 60, align: "right", render: r => renderActions("payments", r, `Payment`, setPaymentModalOpen) }
  ];

  const dealCols = [
    { key: "title", label: "Deal Title" },
    { key: "stage", label: "Stage" },
    { key: "amount", label: "Amount", render: r => formatCurrency(r.amount) },
    { key: "actions", label: "", width: 60, align: "right", render: r => renderActions("deals", r, `Deal "${r.title}"`, setDealModalOpen) }
  ];

  const projectCols = [
    { key: "title", label: "Project Title" },
    { key: "status", label: "Status" },
    { key: "end_date", label: "Deadline" },
    { key: "actions", label: "", width: 60, align: "right", render: r => renderActions("projects", r, `Project "${r.title}"`, setProjectModalOpen) }
  ];

  return (
    <div className="client-profile-page page-container">
      <div className="d-flex align-items-center mb-4 gap-3">
        <Button variant="secondary" icon={FiArrowLeft} onClick={() => navigate("/clients")} />
        <Avatar name={client.company_name || client.client_name} size={48} />
        <div>
          <h3 className="mb-0">{client.company_name || client.client_name}</h3>
          <span className="text-muted">Client ID: {client.client_id} | {client.email} | {client.mobile_number}</span>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card stat-card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted fw-bold">Total Contract Value</span>
                <FiDollarSign size={20} className="text-primary" />
              </div>
              <h2 className="mb-0">{formatCurrency(financials.total_contract_value)}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted fw-bold">Amount Received</span>
                <FiCheckCircle size={20} className="text-success" />
              </div>
              <h2 className="mb-0">{formatCurrency(financials.amount_received)}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted fw-bold">Pending Amount</span>
                <FiClock size={20} className="text-warning" />
              </div>
              <h2 className="mb-0">{formatCurrency(financials.pending_amount)}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header border-bottom-0 pt-4 pb-0" style={{ backgroundColor: "transparent" }}>
          <ul className="nav nav-tabs border-bottom">
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'invoices' ? 'active' : ''}`} onClick={() => setActiveTab('invoices')}><FiFileText className="me-2"/> Invoices & Payments</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'deals' ? 'active' : ''}`} onClick={() => setActiveTab('deals')}><FiBriefcase className="me-2"/> Deals</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}><FiLayers className="me-2"/> Projects</button>
            </li>
          </ul>
        </div>
        <div className="card-body p-4">
          {activeTab === 'overview' && (
            <div>
              <h5 style={{ color: "var(--color-text)" }}>Client Information</h5>
              <div className="row mt-3" style={{ color: "var(--color-text-subtle)" }}>
                <div className="col-md-6 mb-3"><strong style={{ color: "var(--color-text)" }}>Contact Person:</strong> {client.contact_person || 'N/A'}</div>
                <div className="col-md-6 mb-3"><strong style={{ color: "var(--color-text)" }}>Customer Type:</strong> {client.customer_type || 'N/A'}</div>
                <div className="col-md-6 mb-3"><strong style={{ color: "var(--color-text)" }}>Address:</strong> {client.address || 'N/A'}</div>
                <div className="col-md-6 mb-3"><strong style={{ color: "var(--color-text)" }}>City:</strong> {client.city || 'N/A'}</div>
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="row g-4">
              <div className="col-lg-7">
                <div className="d-flex justify-content-between mb-3 align-items-center">
                  <h5 className="mb-0">Invoices</h5>
                  <Button variant="gradient" size="sm" onClick={() => {
                    setEditData({ client_id: client.id || client._id, source_id: client.name || client.company_name, source_type: 'Project' });
                    setInvoiceModalOpen(true);
                  }}>+ New Invoice</Button>
                </div>
                <Table columns={invoiceCols} data={invoices} />
              </div>
              <div className="col-lg-5">
                <div className="d-flex justify-content-between mb-3 align-items-center">
                  <h5 className="mb-0">Payments</h5>
                  <Button variant="gradient" size="sm" onClick={() => setPaymentModalOpen(true)}>+ Add Payment</Button>
                </div>
                <Table columns={paymentCols} data={payments} />
              </div>
            </div>
          )}

          {activeTab === 'deals' && (
            <div>
              <div className="d-flex justify-content-between mb-3 align-items-center">
                <h5 className="mb-0">Deals Pipeline</h5>
                <Button variant="gradient" size="sm" onClick={() => setDealModalOpen(true)}>+ New Deal</Button>
              </div>
              <Table columns={dealCols} data={deals} />
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div className="d-flex justify-content-between mb-3 align-items-center">
                <h5 className="mb-0">Ongoing Projects</h5>
                <Button variant="gradient" size="sm" onClick={() => setProjectModalOpen(true)}>+ New Project</Button>
              </div>
              <Table columns={projectCols} data={projects} />
            </div>
          )}
        </div>
      </div>
      
      <InvoiceModal 
        isOpen={invoiceModalOpen} 
        onClose={closeModals} 
        onSave={() => { closeModals(); loadDashboard(); }} 
        invoice={editData}
      />
      <PaymentModal 
        isOpen={paymentModalOpen} 
        onClose={closeModals} 
        onSave={() => { closeModals(); loadDashboard(); }} 
        payment={editData || { client_id: id }}
      />
      
      <DealFormModal 
        open={dealModalOpen} 
        onClose={closeModals} 
        onSubmit={handleSaveDeal} 
        submitting={submitting} 
        initialData={editData}
      />
      
      <ProjectFormModal 
        open={projectModalOpen} 
        onClose={closeModals} 
        onSubmit={handleSaveProject} 
        submitting={submitting} 
        initialData={editData}
      />
    </div>
  );
}
