import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomSelect from '../common/CustomSelect';

// Reusing same colors/themes as Leads status badges
const getStatusTheme = (status) => {
  switch ((status || '').toLowerCase()) {
    case 'new': return 'primary';
    case 'contacted': return 'info';
    case 'qualified': return 'secondary';
    case 'negotiation': return 'warning';
    case 'won': return 'success';
    case 'lost': return 'danger';
    default: return 'gray'; // Fallback
  }
};

const getSelectValue = (val, options = []) => {
  if (!val) return null;
  const existing = options.find(o => o.value === val);
  if (existing) return existing;
  return { value: val, label: val.charAt(0).toUpperCase() + val.slice(1) };
};

const LeadsKanbanView = ({ data = [], users = [], onInlineUpdate, onEdit, onDelete, getStatusBadgeClass }) => {
  const [editingCell, setEditingCell] = useState({ rowId: null, field: null });

  // Define all statuses
  const statuses = [
    { label: 'New', value: 'new' },
    { label: 'Contacted', value: 'contacted' },
    { label: 'Qualified', value: 'qualified' },
    { label: 'Negotiation', value: 'negotiation' },
    { label: 'Won', value: 'won' },
    { label: 'Lost', value: 'lost' },
  ];

  return (
    <div className="d-flex overflow-x-auto align-items-start mb-4" style={{ minHeight: '650px' }}>
      {statuses.map(statusObj => {
        const theme = getStatusTheme(statusObj.value);
        const columnLeads = data.filter(lead => (lead.status || '').toLowerCase() === statusObj.value);
        
        return (
          <div key={statusObj.value} className="kanban-list-items bg-transparent" style={{ minWidth: '320px', maxWidth: '320px', marginRight: '20px' }}>
            <div className="card mb-0 shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="fw-semibold d-flex align-items-center mb-1">
                      <i className={`ti ti-circle-filled fs-8 text-${theme} me-2`}></i>{statusObj.label}
                    </h4>
                    <span className="fw-medium text-default">{columnLeads.length} Leads</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="kanban-drag-wrap pt-4">
              {columnLeads.map(lead => {
                const leadId = lead._id || lead.id;
                const isEditingStatus = editingCell.rowId === leadId && editingCell.field === 'status';
                const isEditingAssigned = editingCell.rowId === leadId && editingCell.field === 'assigned_to';
                const assignedUser = users.find(u => (u._id || u.id) === lead.assigned_to);
                const userOptions = users.map(u => ({ value: u._id || u.id, label: u.name }));

                return (
                  <div key={leadId} className="card kanban-card mb-3 shadow-sm border-0">
                    <div className="card-body">
                      <div className="d-block">
                        <div className={`border-${theme} border border-2 mb-3`}></div>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex align-items-center">
                            <div className="avatar avatar-lg bg-primary border-0 flex-shrink-0 me-2 d-flex align-items-center justify-content-center text-white fw-bold rounded">
                              {lead.lead_name ? lead.lead_name.substring(0, 2).toUpperCase() : 'LD'}
                            </div>
                            <h6 className="fw-medium">{lead.lead_name}</h6>
                          </div>
                          <div className="action-icon d-inline-flex flex-shrink-0">
                            <Link to="#" className="me-2" onClick={(e) => onEdit && onEdit(e, lead)} title="Edit"><i className="ti ti-edit"></i></Link>
                            <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_modal" onClick={(e) => onDelete && onDelete(e, lead)} title="Delete"><i className="ti ti-trash"></i></Link>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3 d-flex flex-column">
                        <p className="text-default d-inline-flex align-items-center mb-2 text-truncate" title={lead.company_name}>
                          <i className="ti ti-building text-dark me-2"></i>{lead.company_name}
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2 text-truncate" title={lead.email}>
                          <i className="ti ti-mail text-dark me-2"></i>{lead.email}
                        </p>
                        <p className="text-default d-inline-flex align-items-center mb-2">
                          <i className="ti ti-phone text-dark me-2"></i>{lead.mobile_number}
                        </p>
                        {lead.city && (
                          <p className="text-default d-inline-flex align-items-center text-truncate">
                            <i className="ti ti-map-pin-pin text-dark me-2"></i>{lead.city}{lead.country ? `, ${lead.country}` : ''}
                          </p>
                        )}
                      </div>
                      
                      <div className="d-flex align-items-end justify-content-between border-top pt-3 mt-3">
                        <div className="d-flex flex-column gap-2" style={{ maxWidth: '65%' }}>
                          
                          {/* Inline Status Edit */}
                          <div className="d-flex align-items-center">
                            <span className="text-muted fs-12" style={{ width: '45px' }}>Status:</span>
                            {isEditingStatus ? (
                              <div style={{ minWidth: '120px' }}>
                                <CustomSelect 
                                  options={statuses}
                                  value={getSelectValue(lead.status, statuses)}
                                  onChange={(selected) => onInlineUpdate(lead, 'status', selected.value)}
                                  menuPortalTarget={document.body}
                                  menuPosition="fixed"
                                  autoFocus
                                  defaultMenuIsOpen
                                  onBlur={() => setEditingCell({ rowId: null, field: null })}
                                />
                              </div>
                            ) : (
                              <span 
                                className={`badge ${getStatusBadgeClass ? getStatusBadgeClass(lead.status) : 'badge-secondary-transparent'} cursor-pointer text-truncate`}
                                onClick={() => setEditingCell({ rowId: leadId, field: 'status' })}
                                title="Click to edit status"
                                style={{ maxWidth: '120px' }}
                              >
                                {lead.status || 'New'}
                              </span>
                            )}
                          </div>
                          
                          {/* Inline Assigned To Edit */}
                          <div className="d-flex align-items-center mt-1">
                            <span className="text-muted fs-12" style={{ width: '45px' }}>Assign:</span>
                            {isEditingAssigned ? (
                              <div style={{ minWidth: '120px' }}>
                                <CustomSelect 
                                  options={userOptions}
                                  value={getSelectValue(lead.assigned_to, userOptions)}
                                  onChange={(selected) => onInlineUpdate(lead, 'assigned_to', selected.value)}
                                  menuPortalTarget={document.body}
                                  menuPosition="fixed"
                                  autoFocus
                                  defaultMenuIsOpen
                                  onBlur={() => setEditingCell({ rowId: null, field: null })}
                                />
                              </div>
                            ) : (
                              <span 
                                className="cursor-pointer text-primary fw-medium text-truncate d-flex align-items-center"
                                onClick={() => setEditingCell({ rowId: leadId, field: 'assigned_to' })}
                                title="Click to edit assignee"
                                style={{ maxWidth: '120px', fontSize: '13px' }}
                              >
                                {assignedUser && assignedUser.image ? (
                                  <img src={assignedUser.image} alt={assignedUser.name} className="avatar avatar-xs rounded-circle me-1 flex-shrink-0" style={{width: '20px', height: '20px', minWidth: '20px', objectFit: 'cover'}} />
                                ) : assignedUser ? (
                                  <span className="avatar avatar-xs rounded-circle bg-primary me-1 d-flex justify-content-center align-items-center text-white fw-bold flex-shrink-0" style={{width: '20px', height: '20px', minWidth: '20px', fontSize: '10px'}}>
                                    {assignedUser.name.substring(0, 2).toUpperCase()}
                                  </span>
                                ) : null}
                                <span className="text-truncate">{assignedUser ? assignedUser.name : (lead.assigned_to || 'Unassigned')}</span>
                              </span>
                            )}
                          </div>

                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
              {columnLeads.length === 0 && (
                <div className="text-center py-5 text-muted border border-dashed rounded bg-white mt-1">
                  <i className="ti ti-inbox fs-3 mb-2 d-block text-light"></i>
                  No Leads
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeadsKanbanView;
