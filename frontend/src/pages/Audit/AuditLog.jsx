import { useCallback, useMemo, useState } from "react";
import { FiDownload, FiCalendar, FiFilter, FiSearch } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Avatar from "@/components/common/Avatar/Avatar";
import Badge from "@/components/common/Badge/Badge";
import { auditService } from "@/api/services/auditService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBySearch } from "@/utils/helpers";
import { formatDateTime } from "@/utils/formatters";

export default function AuditLog() {
  const load = useCallback(() => auditService.list(), []);
  const { data: rawLogs, loading } = useAsync(load, [], []);
  const logs = useMemo(() => rawLogs || [], [rawLogs]);
  
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const debounced = useDebounce(search, 250);
  
  const filtered = useMemo(() => {
    let items = logs;
    if (moduleFilter !== "all") items = items.filter((l) => l.module === moduleFilter);
    return filterBySearch(items, debounced, ["user_name", "action", "module", "details", "ip_address"]);
  }, [logs, moduleFilter, debounced]);

  // Extract unique modules for the filter dropdown
  const uniqueModules = useMemo(() => {
    const modules = new Set(logs.map(l => l.module));
    return Array.from(modules).sort();
  }, [logs]);

  const columns = [
    { 
      key: "timestamp", 
      label: "Timestamp", 
      sortable: true, 
      render: (r) => formatDateTime(r.timestamp) 
    },
    {
      key: "user",
      label: "User",
      sortable: true,
      render: (r) => (
        <div className="d-flex align-items-center gap-2">
          <Avatar name={r.user_name || "System"} size={32} />
          <div style={{ fontWeight: 600, color: "var(--color-text)", fontSize: 14 }}>
            {r.user_name || "System"}
          </div>
        </div>
      ),
    },
    { 
      key: "action", 
      label: "Action", 
      sortable: true,
      render: (r) => {
        let variant = "secondary";
        if (r.action.toLowerCase().includes("create") || r.action.toLowerCase().includes("add")) variant = "success";
        if (r.action.toLowerCase().includes("delete") || r.action.toLowerCase().includes("remove")) variant = "danger";
        if (r.action.toLowerCase().includes("update") || r.action.toLowerCase().includes("edit")) variant = "warning";
        return <Badge variant={variant}>{r.action}</Badge>;
      }
    },
    { 
      key: "module", 
      label: "Module", 
      sortable: true,
      render: (r) => <span style={{ fontWeight: 500 }}>{r.module}</span>
    },
    { 
      key: "details", 
      label: "Details", 
      sortable: false,
      render: (r) => <span className="text-subtle" style={{ fontSize: 13 }}>{r.details}</span>
    },
    { 
      key: "ip_address", 
      label: "IP Address", 
      sortable: false,
      render: (r) => <span style={{ fontFamily: "monospace", fontSize: 13 }}>{r.ip_address || "N/A"}</span>
    }
  ];

  return (
    <>
      <PageHeader
        title="Audit Logs"
        description="Security tracking of employee actions, record updates, and permission changes"
        // actions={
        //   <>
        //     <Button variant="hero" icon={FiCalendar}>Last 30 Days</Button>
        //     <Button icon={FiDownload}>Export Report</Button>
        //   </>
        // }
      />
      <div className="card p-3 mb-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-6 col-lg-5">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by user, action, details..." />
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <select className="form-select" value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)}>
              <option value="all">All Modules</option>
              {uniqueModules.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-3 col-lg-2">
            <Button variant="secondary" icon={FiFilter} block>Filters</Button>
          </div>
          <div className="col-12 col-lg-3 text-lg-end">
            <span className="text-muted-2" style={{ fontSize: 13 }}>
              {filtered.length} of {logs.length} records
            </span>
          </div>
        </div>
      </div>
      <Table columns={columns} data={filtered} loading={loading} />
    </>
  );
}