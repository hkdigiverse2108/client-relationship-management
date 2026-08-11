import "./LeadsSidebar.css";
import { classNames } from "@/utils/helpers";

const SidebarSection = ({ title, items, selectedId, onSelect }) => {
  return (
    <div className="lead-sb-section">
      <div className="lead-sb-title">{title}</div>
      <div className="lead-sb-list">
        {items.map((item, i) => (
          <button
            key={i}
            className={classNames("lead-sb-item", selectedId === item.id && "is-active")}
            onClick={() => onSelect(item.id)}
          >
            <span className="lead-sb-label">{item.label}</span>
            {item.count !== undefined && (
              <span className="lead-sb-count">{item.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function LeadsSidebar({ leads, filters, setFilters }) {
  // Compute Status Counts
  const statuses = ["new", "contacted", "qualified", "negotiation", "won", "lost"];
  const statusCounts = { all: leads.length };
  statuses.forEach(s => statusCounts[s] = 0);
  
  // Compute Source Counts
  const sourceCounts = { all: leads.length };
  
  // Compute Tag Counts
  const tagCounts = { all: leads.length };

  leads.forEach(l => {
    // Status
    const status = l.status ? l.status.toLowerCase() : "new";
    if (statusCounts[status] !== undefined) {
      statusCounts[status]++;
    } else {
       statusCounts[status] = 1;
    }

    // Source
    const src = l.source || "website";
    sourceCounts[src] = (sourceCounts[src] || 0) + 1;

    // Tags
    const tags = (l.tags || "").split(",").map(t => t.trim()).filter(Boolean);
    tags.forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const statusItems = [
    { id: "all", label: "All", count: statusCounts.all },
    ...statuses.map(s => ({
       id: s, label: s.charAt(0).toUpperCase() + s.slice(1), count: statusCounts[s] || 0
    }))
  ];

  const sourceItems = [
    { id: "all", label: "All", count: sourceCounts.all },
    ...Object.keys(sourceCounts).filter(k => k !== "all").map(k => ({
      id: k, label: k.charAt(0).toUpperCase() + k.slice(1), count: sourceCounts[k]
    }))
  ];

  const tagItems = [
    { id: "all", label: "All", count: tagCounts.all },
    ...Object.keys(tagCounts).filter(k => k !== "all").map(k => ({
      id: k, label: k, count: tagCounts[k]
    }))
  ];

  return (
    <div className="lead-sidebar card">
      <div className="p-4">
        <SidebarSection 
          title="LEAD STATUSES" 
          items={statusItems} 
          selectedId={filters.status} 
          onSelect={(id) => setFilters(prev => ({ ...prev, status: id }))} 
        />
        <hr className="lead-sb-divider" />
        <SidebarSection 
          title="SOURCES" 
          items={sourceItems} 
          selectedId={filters.source} 
          onSelect={(id) => setFilters(prev => ({ ...prev, source: id }))} 
        />
        <hr className="lead-sb-divider" />
        <SidebarSection 
          title="LEAD TAGS" 
          items={tagItems} 
          selectedId={filters.tag} 
          onSelect={(id) => setFilters(prev => ({ ...prev, tag: id }))} 
        />
      </div>
    </div>
  );
}
