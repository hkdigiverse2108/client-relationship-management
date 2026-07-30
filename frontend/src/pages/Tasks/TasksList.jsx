import { useCallback, useMemo, useState } from "react";
import { FiPlus, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Badge from "@/components/common/Badge/Badge";
import Loader from "@/components/common/Loader/Loader";
import { taskService } from "@/api/services/taskService";
import { useAsync } from "@/hooks/useAsync";
import { formatDate } from "@/utils/formatters";
import { classNames } from "@/utils/helpers";
const PRIORITY_VARIANT = { low: "neutral", medium: "info", high: "warning", urgent: "danger" };
export default function TasksList() {
  const load = useCallback(() => taskService.list(), []);
  const { data: tasks = [], loading, refetch } = useAsync(load, []);
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((t) => t.status === filter);
  }, [tasks, filter]);
  const toggle = async (t) => {
    await taskService.toggle(t.id);
    toast.success(t.status === "done" ? "Marked open" : "Task completed");
    refetch();
  };
  if (loading) return <Loader />;
  return (
    <>
      <PageHeader
        title="Tasks"
        description="Follow-ups, calls and to-dos across your accounts."
        actions={<Button icon={FiPlus}>New task</Button>}
      />
      <div className="card p-2 mb-3 d-inline-flex flex-wrap gap-1" role="tablist">
        {[
          { id: "all", label: "All" },
          { id: "todo", label: "Open" },
          { id: "in_progress", label: "In progress" },
          { id: "done", label: "Completed" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={classNames("btn btn-sm", filter === t.id ? "btn-primary" : "btn-light")}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="card">
        <ul className="list-unstyled m-0">
          {filtered.map((t) => (
            <li
              key={t.id}
              className="d-flex align-items-center gap-3 px-3 py-3"
              style={{ borderBottom: "1px solid var(--color-divider)" }}
            >
              <button
                onClick={() => toggle(t)}
                aria-label="Toggle task"
                className="d-inline-flex align-items-center justify-content-center"
                style={{
                  width: 22, height: 22, borderRadius: "50%",
                  border: `2px solid ${t.status === "done" ? "var(--color-success)" : "var(--color-border-strong)"}`,
                  background: t.status === "done" ? "var(--color-success)" : "transparent",
                  color: "#fff", cursor: "pointer", flexShrink: 0,
                }}
              >
                {t.status === "done" && <FiCheck size={12} />}
              </button>
              <div className="flex-grow-1 min-width-0">
                <div style={{
                  fontWeight: 500,
                  textDecoration: t.status === "done" ? "line-through" : "none",
                  color: t.status === "done" ? "var(--color-text-subtle)" : "var(--color-text)",
                }}>
                  {t.title}
                </div>
                <div className="text-subtle" style={{ fontSize: 12 }}>
                  {t.relatedTo} · Assigned to {t.assignee} · Due {formatDate(t.dueDate)}
                </div>
              </div>
              <Badge variant={PRIORITY_VARIANT[t.priority]}>{t.priority}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}