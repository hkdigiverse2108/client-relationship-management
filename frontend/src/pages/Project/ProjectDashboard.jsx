import { useCallback, useMemo } from "react";
import { FiPlus, FiDollarSign } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Loader from "@/components/common/Loader/Loader";
import Avatar from "@/components/common/Avatar/Avatar";
import { dealService } from "@/api/services/dealService";
import { useAsync } from "@/hooks/useAsync";
import { DEAL_STAGES } from "@/utils/constants";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { groupBy } from "@/utils/helpers";
import SearchInput from "@/components/common/PageHeaderSearchBar/SearchInput";
import { useState } from "react";
import Select from "@/components/common/Select/Select";
import ProjectFormModal from "./ProjectFormModal";
import toast from "react-hot-toast";
import { projectService } from "@/api/services/projectService";

import "../Pipeline/Pipeline.css";
export default function DealsBoard() {
  const [status, setStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(() => dealService.list(), []);
  const { data: rawDeals, loading } = useAsync(load, [], []);
  const deals = useMemo(() => rawDeals || [], [rawDeals]);
  const grouped = useMemo(() => groupBy(deals, "stage"), [deals]);
  const stageTotals = useMemo(() => {
    const totals = {};
    DEAL_STAGES.forEach((s) => {
      totals[s.id] = (grouped[s.id] || []).reduce((sum, d) => sum + Number(d.amount || 0), 0);
    });
    return totals;
    return totals;
  }, [grouped]);

  const handleCreateProject = async (values) => {
    setSubmitting(true);
    try {
      await projectService.create(values);
      toast.success("Project created successfully!");
      setModalOpen(false);
    } catch (e) {
      toast.error(e.message || "Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <>
      <PageHeader
        title="Projects Command Center"
        description="Enterprise Project Lifecycle Management & Analytics"
        actions={  <>   <SearchInput
        dark
        placeholder="Search projects..."
      />  <Select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      options={[
        { label: "All Status", value: "all" },
        { label: "Active", value: "active" },
        { label: "Completed", value: "completed" },
        { label: "On Hold", value: "hold" },
        { label: "Cancelled", value: "cancelled" },
      ]}
    /> <Button icon={FiPlus} variant="gradient" onClick={() => setModalOpen(true)}>New Project</Button> </>}
      />
      <div className="aio-board">
        {DEAL_STAGES.map((stage) => {
          const items = grouped[stage.id] || [];
          return (
            <div key={stage.id} className="aio-board__column">
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
                  <article key={d.id} className="aio-board__card">
                    <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{d.title}</div>
                      <span className="aio-board__amount">
                        <FiDollarSign /> {formatCurrency(d.amount).replace("$", "")}
                      </span>
                    </div>
                    <div className="text-muted-2 mb-3" style={{ fontSize: 12 }}>{d.company}</div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Avatar name={d.owner} size={26} />
                      <span className="text-subtle" style={{ fontSize: 11 }}>
                        Close {formatDate(d.closeDate)}
                      </span>
                    </div>
                  </article>
                ))}
                {items.length === 0 && (
                  <div className="aio-board__empty">No deals</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ProjectFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateProject}
        submitting={submitting}
      />
    </>
  );
}