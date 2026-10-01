import React from 'react';
import { Link } from 'react-router-dom';
import CustomDataTable from './../common/CustomDataTable';
import FilterBar from './../common/FilterBar';

const ProjectReportTable = ({ projects = [] }) => {
  const [priorityFilter, setPriorityFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [dateRange, setDateRange] = React.useState([null, null]);

  const tableData = React.useMemo(() => {
    let filtered = projects.filter(p => {
      const stage = (p.stage || '').toLowerCase();
      const status = (p.status || '').toLowerCase();
      return !['cancelled'].includes(stage) && !['cancelled'].includes(status);
    });

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(p => (p.priority || 'Low').toLowerCase() === priorityFilter.toLowerCase());
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => (p.status || 'Active').toLowerCase() === statusFilter.toLowerCase());
    }
    if (dateRange[0] && dateRange[1]) {
      filtered = filtered.filter(p => {
        if (!p.end_date) return false;
        const d = new Date(p.end_date);
        return d >= dateRange[0] && d <= dateRange[1];
      });
    }

    return filtered.map(p => {
      const stageLower = (p.stage || 'new').toLowerCase();
      let displayStage = 'New';
      if (stageLower === 'in_progress' || stageLower.includes('progress')) displayStage = 'In Progress';
      else if (stageLower === 'review' || stageLower.includes('review')) displayStage = 'In Review';
      else if (stageLower === 'completed') displayStage = 'Completed';
      else if (stageLower === 'hold' || stageLower.includes('hold')) displayStage = 'On Hold';
      else displayStage = p.stage || 'New';

      // Format currency
      const formatCurrency = (val) => {
        if (!val || isNaN(val)) return '-';
        return `₹${parseFloat(val).toLocaleString()}`;
      };

      const formatPriority = (p.priority || 'Low').charAt(0).toUpperCase() + (p.priority || 'Low').slice(1);
      const formatStatus = (p.status || 'Active').charAt(0).toUpperCase() + (p.status || 'Active').slice(1);

      return {
        id: p._id || p.id,
        name: p.project_name || p.title || 'Untitled',
        status: formatStatus,
        stage: displayStage,
        priority: formatPriority,
        budget: formatCurrency(p.budget),
        value: formatCurrency(p.project_value),
        deadline: p.end_date ? new Date(p.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'
      };
    });
  }, [projects, priorityFilter, statusFilter, dateRange]);

  const columns = [
    {
      name: 'Project',
      selectorKey: 'name',
      sortable: true,
      cell: (row) => (
        <div className="d-flex align-items-center file-name-icon py-2">
          <h6 className="fw-medium mb-0"><Link to="#">{row.name}</Link></h6>
        </div>
      )
    },
    {
      name: 'Status',
      selectorKey: 'status',
      sortable: true,
      cell: (row) => {
        let badgeClass = 'badge-primary';
        const st = row.status.toLowerCase();
        if (st === 'active') badgeClass = 'badge-success';
        else if (st === 'inactive' || st === 'cancelled') badgeClass = 'badge-danger';
        else if (st === 'completed') badgeClass = 'badge-info';
        else if (st === 'on hold' || st === 'hold') badgeClass = 'badge-secondary';

        return (
          <span className={`badge ${badgeClass} d-inline-flex align-items-center badge-xs`}>
            <i className="ti ti-point-filled me-1"></i>{row.status}
          </span>
        );
      }
    },
    {
      name: 'Stage',
      selectorKey: 'stage',
      sortable: true,
      cell: (row) => row.stage
    },
    {
      name: 'Priority',
      selectorKey: 'priority',
      sortable: true,
      cell: (row) => {
        let badgeClass = 'badge-success-transparent';
        if (row.priority === 'Medium') badgeClass = 'badge-warning-transparent';
        if (row.priority === 'High' || row.priority === 'Critical') badgeClass = 'badge-danger-transparent';
        
        return (
          <span className={`badge ${badgeClass}`}>
            <i className="ti ti-point-filled me-1"></i>{row.priority}
          </span>
        );
      }
    },
    {
      name: 'Budget',
      selectorKey: 'budget',
      sortable: true,
      cell: (row) => row.budget
    },
    {
      name: 'Value',
      selectorKey: 'value',
      sortable: true,
      cell: (row) => row.value
    },
    {
      name: 'Deadline',
      selectorKey: 'deadline',
      sortable: true,
      cell: (row) => row.deadline
    }
  ];

  const filterConfig = [
    { type: 'date', value: dateRange, onChange: (update) => setDateRange(update), placeholder: 'Select deadline range...' },
    { type: 'select', value: priorityFilter, onChange: setPriorityFilter, options: [
      { value: 'all', label: 'All Priorities' },
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'critical', label: 'Critical' }
    ]},
    { type: 'select', value: statusFilter, onChange: setStatusFilter, options: [
      { value: 'all', label: 'All Statuses' },
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'completed', label: 'Completed' },
      { value: 'on hold', label: 'On Hold' }
    ]}
  ];

  const hasActiveFilters = priorityFilter !== 'all' || statusFilter !== 'all' || (dateRange[0] && dateRange[1]);

  const handleClearFilters = () => {
    setPriorityFilter('all');
    setStatusFilter('all');
    setDateRange([null, null]);
  };

  return (
    <div className="card">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <h5>Project Performance Summary</h5>
        <FilterBar filters={filterConfig} onClear={handleClearFilters} hasActiveFilters={hasActiveFilters} />
      </div>
      <div className="card-body p-0">
        <CustomDataTable columns={columns} data={tableData} defaultRowsPerPage={10} />
      </div>
    </div>
  );
};

export default ProjectReportTable;
