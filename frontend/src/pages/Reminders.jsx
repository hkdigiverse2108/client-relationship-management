import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import ReminderModal from '../components/reminders/ReminderModal';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomSelect from '../components/common/CustomSelect';
import { FiClock, FiAlertCircle, FiCheckCircle, FiSearch, FiFilter } from 'react-icons/fi';

const MetricCard = ({ title, value, icon, color, percent, isUp }) => (
  <div className="col-md-4 d-flex">
    <div className="card flex-fill mb-3 mb-md-0">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center">
            <div>
              <p className="fs-12 fw-medium mb-1 text-truncate">{title}</p>
              <h4>{value}</h4>
            </div>
          </div>
          <div className="leave-report-icon">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <span className={`p-2 border border-${color} bg-transparent-${color} rounded-3 d-flex align-items-center justify-content-center`}>
                <i className={`${icon} text-${color}`}></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const initialReminders = [
  { id: 1, description: 'Follow up on the new CRM proposal', category: 'call', priority: 'high', client_id: '1', client_name: 'Acme Corp', due_date: '2026-09-20T10:00', status: 'pending' },
  { id: 2, description: 'Send NDA document', category: 'document', priority: 'critical', client_id: '2', client_name: 'Globex Inc', due_date: '2026-09-17T15:00', status: 'pending' },
  { id: 3, description: 'Invoice payment reminder', category: 'payment', priority: 'medium', client_id: '3', client_name: 'Initech', due_date: '2026-09-25T12:00', status: 'completed' },
];

const Reminders = () => {
  const [reminders, setReminders] = useState(initialReminders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleOpenModal = (reminder = null) => {
    setEditingReminder(reminder);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingReminder(null);
    setIsModalOpen(false);
  };

  const getPriorityBadge = (priority) => {
    const p = priority.toLowerCase();
    if (p === 'critical') return <span className="badge rounded-pill badge-soft-danger">Critical</span>;
    if (p === 'high') return <span className="badge rounded-pill badge-soft-warning">High</span>;
    if (p === 'medium') return <span className="badge rounded-pill badge-soft-info">Medium</span>;
    return <span className="badge rounded-pill badge-soft-success">Low</span>;
  };

  const columns = [
    {
      name: 'Reminder Details',
      selector: row => row.description,
      sortable: true,
      cell: row => <span className="fw-medium text-dark">{row.description}</span>
    },
    {
      name: 'Type',
      selector: row => row.category,
      sortable: true,
      cell: row => <span className="text-capitalize">{row.category}</span>
    },
    {
      name: 'Linked Client',
      selector: row => row.client_name,
      sortable: true,
    },
    {
      name: 'Priority',
      selector: row => row.priority,
      sortable: true,
      cell: row => getPriorityBadge(row.priority)
    },
    {
      name: 'Due Time',
      selector: row => row.due_date,
      sortable: true,
      cell: row => new Date(row.due_date).toLocaleString()
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span className={`badge rounded-pill ${row.status === 'completed' ? 'badge-soft-success' : 'badge-soft-warning'}`}>
          {row.status === 'completed' ? 'Completed' : 'Pending'}
        </span>
      )
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="action-icon d-inline-flex">
          <a href="#" className="me-2" onClick={(e) => { e.preventDefault(); handleOpenModal(row); }}><i className="ti ti-edit"></i></a>
          <a href="#" onClick={(e) => e.preventDefault()}><i className="ti ti-trash"></i></a>
        </div>
      )
    }
  ];

  const filteredReminders = reminders.filter(r => {
    // We let CustomDataTable handle the text search, so we only handle the priority filter here
    const matchesPriority = priorityFilter === 'all' || r.priority === priorityFilter;
    return matchesPriority;
  });

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader 
            title="Reminders"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'Tasks & Calendar'},
              { label: 'Reminders', active: true }
            ]}
          >
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <div className="mb-2">
                <button className="btn btn-primary d-flex align-items-center" onClick={() => handleOpenModal()}>
                  <i className="ti ti-circle-plus me-2"></i>Add Reminder
                </button>
              </div>
            </div>
          </PageHeader>

          {/* Metric Cards */}
          <div className="row mb-4">
            <MetricCard 
              title="Active Reminders" 
              value={reminders.filter(r => r.status === 'pending').length} 
              icon="ti ti-clock" 
              color="primary" 
              percent="+5.12%" 
              isUp={true} 
            />
            <MetricCard 
              title="Overdue Alerts" 
              value="1" 
              icon="ti ti-alert-circle" 
              color="danger" 
              percent="-2.01%" 
              isUp={false} 
            />
            <MetricCard 
              title="Completed Today" 
              value={reminders.filter(r => r.status === 'completed').length} 
              icon="ti ti-circle-check" 
              color="success" 
            />
          </div>

          <div className="card">
            <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
              <h4 className="card-title mb-0">Reminders List</h4>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="me-3 custom-select-wrapper" style={{ width: '150px' }}>
                  <CustomSelect 
                    options={[
                      { value: 'all', label: 'All Priorities' },
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                      { value: 'critical', label: 'Critical' }
                    ]}
                    value={{ value: priorityFilter, label: priorityFilter === 'all' ? 'All Priorities' : priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1) }}
                    onChange={(selected) => setPriorityFilter(selected ? selected.value : 'all')}
                  />
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="custom-datatable-filter table-responsive">
                <CustomDataTable columns={columns} data={filteredReminders} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReminderModal isOpen={isModalOpen} onClose={handleCloseModal} reminder={editingReminder} />
    </>
  );
};

export default Reminders;
