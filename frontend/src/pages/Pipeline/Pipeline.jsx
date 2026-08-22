import { useState, useCallback, useMemo } from "react";
import { FiPlus, FiDollarSign, FiEdit2, FiTrash2 } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";
import Avatar from "@/components/common/Avatar/Avatar";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import { useAsync } from "@/hooks/useAsync";
import { DEAL_STAGES } from "@/utils/constants";
import { formatCurrency, formatDate } from "@/utils/formatters";
import api from "@/api/axiosClient";
import toast from "react-hot-toast";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import DealFormModal from "@/pages/Clients/DealFormModal";
import SearchInput from "@/components/common/PageHeaderSearchBar/SearchInput";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import ForecastView from "./ForecastView";
import "./Pipeline.css";

export default function Pipeline() {
  const [deals, setDeals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("board"); // "board" or "forecast"
  const [reasonPrompt, setReasonPrompt] = useState(null); // { dealId, newStage, reasonText }
  const [submittingReason, setSubmittingReason] = useState(false);

  const load = useCallback(async () => {
    const res = await api.get("/deals");
    setDeals(res || []);
    return res || [];
  }, []);

  const { data: users = [] } = useAsync(() => api.get("/users"), [], []);
  const { loading } = useAsync(load, [], []);

  const usersMap = useMemo(() => {
    const m = {};
    users.forEach(u => m[u.id || u._id] = u.name);
    return m;
  }, [users]);

  const filteredDeals = useMemo(() => {
    const validDeals = Array.isArray(deals) ? deals : [];
    if (!searchQuery) return validDeals;
    const q = searchQuery.toLowerCase();
    return validDeals.filter(d => 
      d?.title?.toLowerCase().includes(q) || 
      (d?.company_name && d.company_name.toLowerCase().includes(q)) ||
      (d?.notes && d.notes.toLowerCase().includes(q))
    );
  }, [deals, searchQuery]);

  const grouped = useMemo(() => {
    const g = {};
    DEAL_STAGES.forEach(s => g[s.id] = []);
    filteredDeals.forEach(d => {
      if (g[d.stage]) {
        g[d.stage].push(d);
      } else {
        // Fallback for deals with old/invalid stages
        if (!g["new_lead"]) g["new_lead"] = [];
        g["new_lead"].push(d);
      }
    });
    return g;
  }, [filteredDeals]);

  const stageTotals = useMemo(() => {
    const totals = {};
    DEAL_STAGES.forEach((s) => {
      totals[s.id] = (grouped[s.id] || []).reduce((sum, d) => sum + Number(d.amount || 0), 0);
    });
    return totals;
  }, [grouped]);

  const handleDragStart = (e, dealId) => {
    e.dataTransfer.setData("dealId", dealId);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // necessary to allow dropping
  };

  const handleDrop = async (e, newStage) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData("dealId");
    if (!dealId) return;

    const dealToMove = deals.find(d => (d.id || d._id) === dealId);
    if (!dealToMove || dealToMove.stage === newStage) return;

    if (newStage === "won" || newStage === "lost") {
      setReasonPrompt({ dealId, newStage, reasonText: "" });
      return;
    }

    // Optimistic UI update
    setDeals(prev => prev.map(d => (d.id || d._id) === dealId ? { ...d, stage: newStage } : d));

    try {
      await api.put(`/deals/${dealId}`, { stage: newStage });
      toast.success("Deal stage updated");
    } catch (err) {
      toast.error("Failed to update deal stage");
      load(); // Revert on failure
    }
  };

  const handleReasonSubmit = async () => {
    if (!reasonPrompt) return;
    const { dealId, newStage, reasonText } = reasonPrompt;
    setSubmittingReason(true);
    
    // Optimistic UI update
    setDeals(prev => prev.map(d => (d.id || d._id) === dealId ? { ...d, stage: newStage, reason: reasonText } : d));

    try {
      await api.put(`/deals/${dealId}`, { stage: newStage, reason: reasonText });
      toast.success(`Deal marked as ${newStage}`);
      setReasonPrompt(null);
    } catch (err) {
      toast.error("Failed to update deal stage");
      load(); // Revert on failure
    } finally {
      setSubmittingReason(false);
    }
  };

  const handleSaveDeal = async (values) => {
    setSubmitting(true);
    try {
      if (editData) {
        await api.put(`/deals/${editData.id || editData._id}`, values);
        toast.success("Deal updated successfully");
      } else {
        // Find a client ID if possible, or just default to something for pipeline creation.
        // Actually deal schema requires client_id. Since we are creating from pipeline, we might need a client selector.
        // For now, if no client_id, backend might fail unless we provide one.
        // Let's prompt user or rely on a dummy for demo if missing, but ideally it should have one.
        const payload = { ...values };
        if (!payload.client_id) payload.client_id = "general"; // Placeholder
        await api.post("/deals", payload);
        toast.success("Deal created successfully");
      }
      setModalOpen(false);
      setEditData(null);
      load();
    } catch (e) {
      toast.error(e.message || "Failed to save deal");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (dealId) => {
    const confirmed = await confirmDialog({ text: "Are you sure you want to delete this deal?" });
    if (confirmed) {
      try {
        await api.delete(`/deals/${dealId}`);
        toast.success("Deal deleted successfully");
        load();
      } catch (err) {
        toast.error("Failed to delete deal");
      }
    }
  };

  const openEdit = (deal) => {
    setEditData(deal);
    setModalOpen(true);
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader
        title="Sales Pipeline"
        description={`${DEAL_STAGES.length} Deal Stages • Drag & drop to manage deals`}
        actions={
          <>
            {/* Desktop Actions (Hidden on small screens) */}
            <div className="d-none d-lg-flex align-items-center gap-2">
              <div className="d-flex align-items-center bg-white rounded-5 shadow-sm border">
                <Button 
                  variant={viewMode === 'board' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('board')}
                >
                  Pipeline
                </Button>
                <Button 
                  variant={viewMode === 'forecast' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('forecast')}
                >
                  Forecast
                </Button>
              </div>
              {viewMode === "board" && (
                <SearchInput
                  dark
                  placeholder="Search deals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              )}
              <Button icon={FiPlus} variant="gradient" onClick={() => { setEditData(null); setModalOpen(true); }}>Create deal</Button>
            </div>
            
            {/* Mobile Actions for PageHeader (Only shows create button) */}
            <div className="d-flex d-lg-none">
              <Button icon={FiPlus} variant="gradient" onClick={() => { setEditData(null); setModalOpen(true); }}>Create deal</Button>
            </div>
          </>
        }
      />

      {/* Mobile/Tablet Toolbar (Hidden on desktop) */}
      <div className="d-flex d-lg-none flex-column align-items-start mb-4 gap-3">
        <div className="d-flex align-items-center bg-white rounded-5 shadow-sm border p-1">
          <Button 
            variant={viewMode === 'board' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('board')}
          >
            Pipeline
          </Button>
          <Button 
            variant={viewMode === 'forecast' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('forecast')}
          >
            Forecast
          </Button>
        </div>
        {viewMode === "board" && (
          <div style={{ width: "100%", maxWidth: "100%" }}>
            <SearchInput
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>

      {viewMode === "forecast" ? (
        <ForecastView deals={deals} usersMap={usersMap} />
      ) : (
        <div className="aio-board">
        {DEAL_STAGES.map((stage) => {
          const items = grouped[stage.id] || [];
          return (
            <div 
              key={stage.id} 
              className="aio-board__column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <div className="aio-board__col-head">
                <div>
                  <div className="aio-board__col-title">{stage.label}</div>
                  <div className="aio-board__col-meta">
                    {items.length} deals · {formatCurrency(stageTotals[stage.id])}
                  </div>
                </div>
                <span className="aio-board__col-badge">{items.length}</span>
              </div>
              <div className="aio-board__list">
                {items.map((d) => (
                  <article 
                    key={d.id || d._id} 
                    className="aio-board__card"
                    draggable
                    onDragStart={(e) => handleDragStart(e, d.id || d._id)}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                      <div style={{ fontWeight: 600, fontSize: 14, cursor: "grab", lineHeight: 1.2 }}>{d.title}</div>
                      <Dropdown
                        align="right"
                        trigger={({ onClick }) => (
                          <button className="btn btn-sm btn-link p-0 text-muted" onClick={(e) => { e.stopPropagation(); onClick(); }}>
                            <FiEdit2 size={12} />
                          </button>
                        )}
                        items={[
                          { label: "Edit", icon: FiEdit2, onClick: () => openEdit(d) },
                          { label: "Delete", icon: FiTrash2, danger: true, onClick: () => handleDelete(d.id || d._id) },
                        ]}
                      />
                    </div>
                    {d.company_name && (
                      <div className="text-muted-2 mb-2" style={{ fontSize: 12 }}>
                        {d.company_name}
                      </div>
                    )}
                    
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="aio-board__amount text-success fw-bold" style={{ fontSize: 12 }}>
                        {formatCurrency(d.amount)}
                      </span>
                      {d.probability != null && (
                        <div className="d-flex align-items-center gap-1" style={{ fontSize: 11, color: "#64748b" }}>
                          <span>{d.probability}%</span>
                          <div style={{ width: 40, height: 4, backgroundColor: "#e2e8f0", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ width: `${d.probability}%`, height: "100%", backgroundColor: d.probability > 75 ? "#22c55e" : d.probability > 30 ? "#f59e0b" : "#ef4444" }}></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div className="d-flex align-items-center gap-2">
                        {d.assigned_to && (
                          <Avatar name={usersMap[d.assigned_to] || "Unknown"} size={22} />
                        )}
                        <span className="text-muted" style={{ fontSize: 11 }}>
                          {d.assigned_to ? (usersMap[d.assigned_to] || "Unknown") : "Unassigned"}
                        </span>
                      </div>
                      {d.expected_close_date && (
                        <span className="text-subtle" style={{ fontSize: 11 }}>
                          {formatDate(d.expected_close_date)}
                        </span>
                      )}
                    </div>
                    
                    {(d.stage === "won" || d.stage === "lost") && d.reason && (
                      <div className="mt-2 pt-2 border-top text-muted" style={{ fontSize: 11, fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        Reason: {d.reason}
                      </div>
                    )}
                  </article>
                ))}
                {items.length === 0 && (
                  <div className="aio-board__empty" style={{ border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '20px', textAlign: 'center', color: '#94a3b8', margin: '10px' }}>Drop here</div>
                )}
              </div>
            </div>
          );
        })}
        </div>
      )}

      {modalOpen && (
        <DealFormModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditData(null); }}
          onSubmit={handleSaveDeal}
          submitting={submitting}
          initialData={editData}
        />
      )}

      {reasonPrompt && (
        <Modal
          open={!!reasonPrompt}
          onClose={() => setReasonPrompt(null)}
          title={`Mark Deal as ${reasonPrompt.newStage === "won" ? "Won" : "Lost"}`}
          size="sm"
          footer={
            <>
              <Button variant="secondary" onClick={() => setReasonPrompt(null)}>Cancel</Button>
              <Button 
                variant={reasonPrompt.newStage === "won" ? "success" : "danger"} 
                onClick={handleReasonSubmit} 
                loading={submittingReason}
              >
                Save
              </Button>
            </>
          }
        >
          <div className="py-2">
            <Input 
              label={reasonPrompt.newStage === "won" ? "Reason for Winning" : "Reason for Losing"} 
              placeholder="E.g. Great price, Competitor X won..."
              value={reasonPrompt.reasonText}
              onChange={(e) => setReasonPrompt({ ...reasonPrompt, reasonText: e.target.value })}
              autoFocus
            />
          </div>
        </Modal>
      )}
    </>
  );
}