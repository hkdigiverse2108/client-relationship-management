import React from 'react';
import { Link } from 'react-router-dom';

const getStatusColor = (s) => {
  if (!s) return 'secondary';
  const sl = s.toLowerCase();
  if (sl === 'active' || sl === 'in_progress') return 'success';
  if (sl === 'completed') return 'primary';
  if (sl === 'on hold' || sl === 'hold') return 'warning';
  if (sl === 'cancelled') return 'danger';
  return 'info';
};

const getPriorityColor = (p) => {
  if (!p) return 'secondary';
  const pl = p.toLowerCase();
  if (pl === 'critical' || pl === 'high') return 'danger';
  if (pl === 'medium') return 'warning';
  if (pl === 'low') return 'secondary';
  return 'primary';
};

const getInitials = (name) => {
  if (!name) return 'UN';
  const parts = name.split(' ').filter(p => p.length > 0);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return 'UN';
};

const backendUrl = import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';

const ProjectsGridView = ({ data, users = {}, clients = {}, setProjectToEdit, setIsProjectModalOpen, setProjectToDelete, hideClient = false }) => {
  return (
    <div className="row p-3">
      {data.map((row) => {
        const user = users[row.assigned_to] || {};
        const avatarRaw = user.profile_photo || user.avatar;
        const getAvatarUrl = (str) => {
          if (!str) return null;
          if (str.startsWith('http') || str.startsWith('/assets')) return str;
          const slash = str.startsWith('/') ? '' : '/';
          return `${backendUrl}${slash}${str}`;
        };
        const avatarUrl = getAvatarUrl(avatarRaw);
        const leaderName = user.name || 'Unassigned';
        const statusColor = getStatusColor(row.status);
        const statusText = row.status ? row.status.charAt(0).toUpperCase() + row.status.slice(1) : 'Active';
        const priorityColor = getPriorityColor(row.priority);
        const prioText = row.priority ? row.priority.charAt(0).toUpperCase() + row.priority.slice(1) : 'Medium';
        
        const client = clients[row.client_id] || {};
        const clientName = client.client_name || client.company_name || `${client.first_name || ''} ${client.last_name || ''}`.trim() || 'Unknown Client';
        const clientAvatarRaw = client.profile_photo || client.avatar || client.clientAvatar;
        const clientAvatarUrl = getAvatarUrl(clientAvatarRaw);
        
        return (
        <div className="col-xxl-3 col-lg-4 col-md-6 mb-4" key={row._id || row.id}>
          <div className="card h-100 shadow-sm border">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-0 text-truncate" title={row.title}><Link to={`/projects/${row._id}`}>{row.title}</Link></h6>
                <div className="dropdown">
                  <Link to="#" className="d-inline-flex align-items-center text-muted" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="ti ti-dots-vertical"></i>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <Link to="/all-projects" className="dropdown-item rounded-1"><i className="ti ti-eye me-2"></i>View</Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1" onClick={(e) => {
                        e.preventDefault();
                        setProjectToEdit(row);
                        setIsProjectModalOpen(true);
                      }}><i className="ti ti-edit me-2"></i>Edit</Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1" onClick={() => {
                        setProjectToDelete(row);
                      }} data-bs-toggle="modal" data-bs-target="#delete_project_modal"><i className="ti ti-trash me-1"></i>Delete</Link>
                    </li>
                  </ul>
                </div>
              </div>

              {!hideClient && (
                <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom flex-wrap row-gap-2">
                  <div className="d-flex flex-column">
                    <span className="fs-12 fw-normal text-muted mb-1">Client</span>
                    <div className="d-flex align-items-center">
                      {clientAvatarUrl ? (
                        <span className="avatar avatar-xs avatar-rounded me-2">
                          <img src={clientAvatarUrl} className="img-fluid rounded-circle" alt="img" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                        </span>
                      ) : (
                        <span className="avatar avatar-xs border-0 me-2 d-flex align-items-center justify-content-center bg-primary text-white" style={{ borderRadius: '50%' }}>
                          <span className="fw-bold" style={{ fontSize: '10px' }}>{getInitials(clientName)}</span>
                        </span>
                      )}
                      <h6 className="fw-normal fs-13 mb-0 text-truncate" style={{maxWidth: '100px'}} title={clientName}>{clientName}</h6>
                    </div>
                  </div>
                  <div className="d-flex flex-column text-end">
                    <span className="fs-12 fw-normal text-muted mb-1">Category</span>
                    <h6 className="fw-normal fs-13 mb-0 text-truncate" style={{maxWidth: '80px'}} title={row.category || 'N/A'}>{row.category || 'N/A'}</h6>
                  </div>
                </div>
              )}
              <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                <div className="d-flex align-items-center file-name-icon">
                  {avatarUrl ? (
                    <span className="avatar avatar-sm avatar-rounded flex-shrink-0">
                      <img src={avatarUrl} className="img-fluid rounded-circle" alt="img" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                    </span>
                  ) : (
                    <span className={`avatar avatar-sm border-0 flex-shrink-0 d-flex align-items-center justify-content-center ${leaderName === 'Unassigned' ? 'bg-light text-secondary' : 'bg-primary text-white'}`} style={{ borderRadius: '50%' }}>
                      <span className="fw-bold" style={{ fontSize: '12px' }}>{getInitials(leaderName)}</span>
                    </span>
                  )}
                  <div className="ms-2 text-truncate">
                    <h6 className="fw-normal fs-12 mb-0 text-truncate" title={leaderName}>
                      <span className={leaderName === 'Unassigned' ? 'text-muted' : ''}>{leaderName}</span>
                    </h6>
                    <span className="fs-12 fw-normal text-muted">Assigned To</span>
                  </div>
                </div>
                <div className="d-flex flex-column text-end flex-shrink-0 ms-2">
                  <span className="fs-12 fw-normal text-muted">Deadline</span>
                  <p className="mb-0 fs-12 fw-medium">{row.end_date || 'N/A'}</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className={`avatar avatar-sm avatar-rounded bg-${statusColor}-transparent flex-shrink-0 me-2`}>
                    <i className={`ti ti-point-filled text-${statusColor} fs-16`}></i>
                  </span>
                  <p className="mb-0 fs-13">
                    <small className="text-muted">Status: </small>
                    <span className="text-dark fw-medium">{statusText}</span>
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <span className={`badge bg-${priorityColor}-transparent text-${priorityColor} badge-sm d-flex align-items-center`} style={{ padding: '0.4rem 0.6rem' }}>
                    <i className="ti ti-point-filled me-1"></i>{prioText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )})}
      {data.length === 0 && (
        <div className="col-12 text-center text-muted py-5">
          <p>No projects found matching the criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsGridView;
