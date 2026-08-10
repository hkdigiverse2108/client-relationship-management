import "./ProjectSidebar.css";
import { classNames } from "@/utils/helpers";

const SidebarSection = ({ title, items, selectedId, onSelect }) => {
  return (
    <div className="project-sb-section">
      <div className="project-sb-title">{title}</div>
      <div className="project-sb-list">
        {items.map((item, i) => (
          <button
            key={i}
            className={classNames("project-sb-item", selectedId === item.id && "is-active")}
            onClick={() => onSelect(item.id)}
          >
            <span className="project-sb-label">{item.label}</span>
            {item.count !== undefined && (
              <span className="project-sb-count">{item.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function ProjectSidebar({ projects, filters, setFilters }) {
  // Compute Status Counts
  const statuses = ["active", "hold", "completed", "cancelled"];
  const statusCounts = { all: projects.length };
  statuses.forEach(s => statusCounts[s] = 0);
  
  // Compute Priority Counts
  const priorities = ["critical", "high", "medium", "low"];
  const priorityCounts = { all: projects.length };
  priorities.forEach(p => priorityCounts[p] = 0);
  
  // Compute Category Counts
  const categoryCounts = { all: projects.length };

  projects.forEach(p => {
    // Status
    const status = p.status ? p.status.toLowerCase() : "active";
    if (statusCounts[status] !== undefined) {
      statusCounts[status]++;
    } else {
       statusCounts[status] = 1;
    }

    // Priority
    const priority = p.priority ? p.priority.toLowerCase() : "medium";
    if (priorityCounts[priority] !== undefined) {
      priorityCounts[priority]++;
    } else {
      priorityCounts[priority] = 1;
    }

    // Category
    const cat = p.category || "Web Development";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const statusItems = [
    { id: "all", label: "All", count: statusCounts.all },
    ...statuses.map(s => ({
       id: s, label: s === 'hold' ? 'On Hold' : s.charAt(0).toUpperCase() + s.slice(1), count: statusCounts[s] || 0
    }))
  ];

  const priorityItems = [
    { id: "all", label: "All", count: priorityCounts.all },
    ...priorities.map(p => ({
       id: p, label: p.charAt(0).toUpperCase() + p.slice(1), count: priorityCounts[p] || 0
    }))
  ];

  const categoryItems = [
    { id: "all", label: "All", count: categoryCounts.all },
    ...Object.keys(categoryCounts).filter(k => k !== "all").map(k => ({
      id: k, label: k, count: categoryCounts[k]
    }))
  ];

  return (
    <div className="project-sidebar card">
      <div className="p-4">
        <SidebarSection 
          title="PROJECT STATUS" 
          items={statusItems} 
          selectedId={filters.status} 
          onSelect={(id) => setFilters(prev => ({ ...prev, status: id }))} 
        />
        <hr className="project-sb-divider" />
        <SidebarSection 
          title="PRIORITY" 
          items={priorityItems} 
          selectedId={filters.priority} 
          onSelect={(id) => setFilters(prev => ({ ...prev, priority: id }))} 
        />
        <hr className="project-sb-divider" />
        <SidebarSection 
          title="CATEGORY" 
          items={categoryItems} 
          selectedId={filters.category} 
          onSelect={(id) => setFilters(prev => ({ ...prev, category: id }))} 
        />
      </div>
    </div>
  );
}
