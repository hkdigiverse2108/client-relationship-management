import React from 'react';
import { Link } from 'react-router-dom';

const ClientsGridView = ({ clients, users = [], handleEdit, setClientToDelete }) => {
  const getInitials = (name) => {
    if (!name) return 'C';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getUserName = (userId) => {
    if (!userId) return '-';
    const user = users.find(u => (u._id || u.id) === userId);
    return user ? user.name : userId;
  };

  if (!clients || clients.length === 0) {
    return <div className="text-center p-5">No clients found</div>;
  }

  return (
    <div className="row">
      {clients.map((client) => (
        <div className="col-xl-3 col-lg-4 col-md-6 d-flex" key={client._id || client.client_id}>
          <div className="card w-100 flex-fill">
            <div className="card-body">
              <div className="position-relative mb-2">
                <div className="dropdown position-absolute top-0 end-0">
                  <button className="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="ti ti-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <Link className="dropdown-item rounded-1" to="#" onClick={(e) => { e.preventDefault(); handleEdit(client); }}>
                        <i className="ti ti-edit me-1"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item rounded-1" to="#" data-bs-toggle="modal" data-bs-target="#delete_modal" onClick={(e) => { e.preventDefault(); setClientToDelete(client); }}>
                        <i className="ti ti-trash me-1"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
                
                <div className="d-flex justify-content-center pt-2">
                  <Link to="/client-details" state={{ client }} className="avatar avatar-xl avatar-rounded border p-1 border-primary rounded-circle d-flex align-items-center justify-content-center text-decoration-none">
                    {client.clientAvatar ? (
                      <img src={client.clientAvatar} className="img-fluid h-100 w-100 rounded-circle" alt="img" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div className="bg-primary text-white h-100 w-100 rounded-circle d-flex align-items-center justify-content-center fs-24 fw-bold">
                        {getInitials(client.client_name || client.company_name)}
                      </div>
                    )}
                  </Link>
                </div>
              </div>
              <div className="text-center mb-3">
                <h6 className="mb-1 text-truncate"><Link to="/client-details" state={{ client }}>{client.client_name}</Link></h6>
                {(() => {
                  const s = (client.status || '').toLowerCase();
                  let badgeColor = 'danger';
                  if (s === 'active') badgeColor = 'success';
                  else if (s === 'on_hold' || s === 'on hold') badgeColor = 'warning';
                  return (
                    <span className={`badge badge-${badgeColor} d-inline-flex align-items-center badge-xs`}>
                      <i className="ti ti-point-filled me-1"></i>{client.status || 'Active'}
                    </span>
                  );
                })()}
              </div>
              
              <div className="d-flex flex-column border-top pt-3 mt-3">
                <div className="d-flex justify-content-between mb-2 fs-12">
                  <span className="text-muted text-nowrap me-2">Client ID:</span>
                  <span className="fw-medium text-truncate">{client.client_id || client._id}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-12">
                  <span className="text-muted text-nowrap me-2">Company:</span>
                  <span className="fw-medium text-truncate">{client.company_name || '-'}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-12">
                  <span className="text-muted text-nowrap me-2">Contact Person:</span>
                  <span className="fw-medium text-truncate">{client.contact_person || '-'}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-12">
                  <span className="text-muted text-nowrap me-2">Email:</span>
                  <span className="fw-medium text-truncate" title={client.email}>{client.email || '-'}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-12">
                  <span className="text-muted text-nowrap me-2">Mobile:</span>
                  <span className="fw-medium text-truncate">{client.mobile_number || '-'}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-12">
                  <span className="text-muted text-nowrap me-2">Customer Type:</span>
                  <span className="fw-medium text-truncate">{client.customer_type ? client.customer_type.charAt(0).toUpperCase() + client.customer_type.slice(1) : '-'}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-12">
                  <span className="text-muted text-nowrap me-2">Client Type:</span>
                  <span className="fw-medium text-truncate">{client.converted_from_lead_id === "Manual" ? "Manually Added" : "Converted from Lead"}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-12">
                  <span className="text-muted text-nowrap me-2">Contract Value:</span>
                  <span className="fw-medium text-truncate">{client.contract_value ? `₹${client.contract_value}` : '-'}</span>
                </div>
                <div className="d-flex justify-content-between mb-2 fs-12">
                  <span className="text-muted text-nowrap me-2">Account Mgr:</span>
                  <span className="fw-medium text-truncate">{getUserName(client.assigned_to)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientsGridView;
