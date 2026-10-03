import React, { useState, useEffect } from 'react';
import PageHeader from '../components/common/PageHeader';
import ReminderModal from '../components/reminders/ReminderModal';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomSelect from '../components/common/CustomSelect';
import { FiClock, FiAlertCircle, FiCheckCircle, FiSearch, FiFilter } from 'react-icons/fi';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

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

const initialReminders = [];

const Reminders = () => {
  const [reminders, setReminders] = useState(initialReminders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [clients, setClients] = useState([]);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, id: null, title: '' });
  const [confirmStatusModal, setConfirmStatusModal] = useState({ isOpen: false, reminder: null, newStatus: '' });

  useEffect(() => {
    fetchReminders();
    const fetchClients = async () => {
      try {
        const res = await axiosClient.get('/clients');
        setClients(res || []);
      } catch (err) {
        console.error("Failed to fetch clients", err);
      }
    };
    fetchClients();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await axiosClient.get('/reminders');
      setReminders(res || []);
    } catch (err) {
      console.error("Failed to fetch reminders", err);
      toast.error("Failed to load reminders");
    }
  };

  const handleOpenModal = (reminder = null) => {
    setEditingReminder(reminder);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingReminder(null);
    setIsModalOpen(false);
  };

  const handleSaveReminder = async (reminderData) => {
    const selectedClient = clients.find(c => String(c._id) === String(reminderData.client_id) || String(c.client_id) === String(reminderData.client_id));
    const clientName = selectedClient ? selectedClient.client_name || selectedClient.company_name : 'Unknown Client';
    
    const payload = {
      ...reminderData,
      client_name: clientName,
      status: reminderData.status || 'pending'
    };

    try {
      if (payload.id) {
        await axiosClient.put(`/reminders/${payload.id}`, payload);
        toast.success("Reminder updated successfully!");
      } else {
        await axiosClient.post('/reminders', payload);
        toast.success("Reminder added successfully!");
      }
      fetchReminders();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save reminder", err);
      toast.error("Failed to save reminder");
    }
  };

  const handleToggleStatus = async () => {
    if (!confirmStatusModal.reminder) return;
    try {
      const { reminder, newStatus } = confirmStatusModal;
      await axiosClient.put(`/reminders/${reminder.id || reminder._id}`, { status: newStatus });
      toast.success(`Reminder marked as ${newStatus}!`);
      fetchReminders();
      setConfirmStatusModal({ isOpen: false, reminder: null, newStatus: '' });
    } catch (err) {
      console.error("Failed to update status", err);
      toast.error("Failed to update status");
    }
  };

  const handleDeleteReminder = async () => {
    if (!confirmDeleteModal.id) return;
    try {
      await axiosClient.delete(`/reminders/${confirmDeleteModal.id}`);
      toast.success("Reminder deleted!");
      fetchReminders();
      setConfirmDeleteModal({ isOpen: false, id: null, title: '' });
    } catch (err) {
      console.error("Failed to delete reminder", err);
      toast.error("Failed to delete reminder");
    }
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
      cell: row => <span className="text-capitalize">{row.category === '-' || !row.category ? '-' : row.category}</span>
    },
    {
      name: 'Linked Client',
      selector: row => row.client_name,
      sortable: true,
      cell: row => {
        const c = clients.find(cl => String(cl._id) === String(row.client_id) || String(cl.client_id) === String(row.client_id));
        const name = (c ? (c.client_name || c.company_name) : row.client_name) || 'Unknown';
        const image = c?.clientAvatar || c?.logo;
        
        const getInitials = (n) => {
          if (!n) return 'UN';
          return n.split(' ').map(part => part[0]).join('').substring(0, 2).toUpperCase();
        };

        return (
          <div className="d-flex align-items-center file-name-icon">
            <span className="avatar avatar-md border avatar-rounded flex-shrink-0">
              {image ? (
                <img src={image} className="img-fluid" alt="img" />
              ) : (
                <div className="avatar-title bg-primary rounded-circle text-white" style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   {getInitials(name)}
                </div>
              )}
            </span>
            <div className="ms-2">
              <h6 className="fw-medium mb-0">{name}</h6>
            </div>
          </div>
        );
      }
    },
    {
      name: 'Priority',
      selector: row => row.priority,
      sortable: true,
      cell: row => getPriorityBadge(row.priority)
    },
    {
      name: 'Due Date',
      selector: row => row.due_date,
      sortable: true,
      cell: row => new Date(row.due_date).toLocaleDateString('en-GB')
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
      cell: row => {
        const newStatus = row.status === 'completed' ? 'pending' : 'completed';
        return (
          <div className="action-icon d-inline-flex">
            <a href="#" className="me-2" onClick={(e) => { e.preventDefault(); setConfirmStatusModal({ isOpen: true, reminder: row, newStatus }); }} title={row.status === 'completed' ? "Mark as Pending" : "Mark as Completed"}>
              <i className={`ti ${row.status === 'completed' ? 'ti-restore text-warning' : 'ti-check text-success'}`}></i>
            </a>
            <a href="#" className="me-2" onClick={(e) => { e.preventDefault(); handleOpenModal(row); }}><i className="ti ti-edit"></i></a>
            <a href="#" onClick={(e) => { e.preventDefault(); setConfirmDeleteModal({ isOpen: true, id: row.id || row._id, title: row.description }); }}><i className="ti ti-trash"></i></a>
          </div>
        );
      }
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
              value={reminders.filter(r => r.status !== 'completed' && new Date(r.due_date) < new Date()).length} 
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
      <ReminderModal isOpen={isModalOpen} onClose={handleCloseModal} reminder={editingReminder} onSave={handleSaveReminder} clients={clients} />
      
      {/* Delete Confirmation Modal */}
      {confirmDeleteModal.isOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Reminder</h5>
                <button type="button" className="btn-close" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '' })} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center py-4">
                <i className="ti ti-alert-circle text-danger mb-3" style={{ fontSize: '48px' }}></i>
                <h5 className="mb-2">Are you sure?</h5>
                <p className="text-muted mb-0">Do you really want to delete the reminder <strong>{confirmDeleteModal.title}</strong>? This process cannot be undone.</p>
              </div>
              <div className="modal-footer justify-content-center border-0 pt-0">
                <button className="btn btn-light px-4" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '' })}>Cancel</button>
                <button className="btn btn-danger px-4" onClick={handleDeleteReminder}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Toggle Confirmation Modal */}
      {confirmStatusModal.isOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Change Status</h5>
                <button type="button" className="btn-close" onClick={() => setConfirmStatusModal({ isOpen: false, reminder: null, newStatus: '' })} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center py-4">
                <i className={`ti ${confirmStatusModal.newStatus === 'completed' ? 'ti-circle-check text-success' : 'ti-restore text-warning'} mb-3`} style={{ fontSize: '48px' }}></i>
                <h5 className="mb-2">Are you sure?</h5>
                <p className="text-muted mb-0">Do you want to mark this reminder as <strong>{confirmStatusModal.newStatus}</strong>?</p>
              </div>
              <div className="modal-footer justify-content-center border-0 pt-0">
                <button className="btn btn-light px-4" onClick={() => setConfirmStatusModal({ isOpen: false, reminder: null, newStatus: '' })}>Cancel</button>
                <button className={`btn ${confirmStatusModal.newStatus === 'completed' ? 'btn-success' : 'btn-warning'} px-4`} onClick={handleToggleStatus}>Yes, Mark as {confirmStatusModal.newStatus}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reminders;
