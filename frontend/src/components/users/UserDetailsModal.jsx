import React from 'react';

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  // Ensure mock data has these fields or provide fallbacks
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', overflowY: 'auto' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0 mt-3 mx-3">
            <h5 className="modal-title fs-18 fw-bold">User Details</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close">✖</button>
          </div>
          <div className="modal-body p-4">
            
            {/* Header Profile Section */}
            <div className="d-flex align-items-center mb-4">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center text-primary bg-light me-3"
                style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}
              >
                {getInitials(user.name)}
              </div>
              <div>
                <h5 className="mb-1 fs-18 fw-bold">{user.name}</h5>
                <p className="text-muted mb-2 fs-14">{user.email}</p>
                <div className="d-flex gap-2">
                  <span className="badge bg-primary-transparent px-3 py-1 rounded-pill fw-medium" style={{ fontSize: '12px' }}>
                    {user.role}
                  </span>
                  <span className={`badge ${user.is_active ? 'bg-success-transparent' : 'bg-danger-transparent'} px-3 py-1 rounded-pill fw-medium`} style={{ fontSize: '12px' }}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            <hr className="mb-4" />

            <div className="row">
              {/* Basic & Professional */}
              <div className="col-md-6 mb-4">
                <h6 className="d-flex align-items-center text-primary mb-4 fs-15 fw-bold">
                  <i className="ti ti-briefcase me-2 fs-18"></i> Basic & Professional
                </h6>
                
                <div className="mb-3">
                  <p className="text-muted mb-1 fs-13">Phone Number</p>
                  <p className="text-dark fw-medium fs-14 mb-0">{user.phone || 'N/A'}</p>
                </div>
                <div className="mb-3">
                  <p className="text-muted mb-1 fs-13">Designation</p>
                  <p className="text-dark fw-medium fs-14 mb-0">{user.designation || 'N/A'}</p>
                </div>
                <div className="mb-0">
                  <p className="text-muted mb-1 fs-13">Gender / DOB</p>
                  <p className="text-dark fw-medium fs-14 mb-0">{user.gender || 'N/A'} {user.dob ? `/ ${user.dob}` : ''}</p>
                </div>
              </div>

              {/* Location */}
              <div className="col-md-6 mb-4">
                <h6 className="d-flex align-items-center text-primary mb-4 fs-15 fw-bold">
                  <i className="ti ti-map-pin me-2 fs-18"></i> Location
                </h6>
                
                <div className="mb-3">
                  <p className="text-muted mb-1 fs-13">City</p>
                  <p className="text-dark fw-medium fs-14 mb-0">{user.city || 'N/A'}</p>
                </div>
                <div className="mb-3">
                  <p className="text-muted mb-1 fs-13">State</p>
                  <p className="text-dark fw-medium fs-14 mb-0">{user.state || 'N/A'}</p>
                </div>
                <div className="mb-0">
                  <p className="text-muted mb-1 fs-13">Country</p>
                  <p className="text-dark fw-medium fs-14 mb-0">{user.country || 'N/A'}</p>
                </div>
              </div>
            </div>

            <hr className="mb-4 mt-2" />

            {/* Financial & Compliance Details */}
            <div className="row">
              <div className="col-12 mb-4">
                <h6 className="d-flex align-items-center text-primary mb-4 fs-15 fw-bold">
                  <i className="ti ti-credit-card me-2 fs-18"></i> Financial & Compliance Details
                </h6>
              </div>
              
              <div className="col-md-6 mb-3">
                <p className="text-muted mb-1 fs-13">Bank Name</p>
                <p className="text-dark fw-medium fs-14 mb-0">{user.bank_name || 'N/A'}</p>
              </div>
              <div className="col-md-6 mb-3">
                <p className="text-muted mb-1 fs-13">Account Holder</p>
                <p className="text-dark fw-medium fs-14 mb-0">{user.account_holder_name || 'N/A'}</p>
              </div>
              
              <div className="col-md-6 mb-3">
                <p className="text-muted mb-1 fs-13">Account Number</p>
                <p className="text-dark fw-medium fs-14 mb-0">{user.account_number || 'N/A'}</p>
              </div>
              <div className="col-md-6 mb-3">
                <p className="text-muted mb-1 fs-13">IFSC Code</p>
                <p className="text-dark fw-medium fs-14 mb-0">{user.ifsc_code || 'N/A'}</p>
              </div>
              
              <div className="col-md-6 mb-3">
                <p className="text-muted mb-1 fs-13">PAN Card Number</p>
                <p className="text-dark fw-medium fs-14 mb-0">{user.pan_number || 'N/A'}</p>
              </div>
              <div className="col-md-6 mb-3">
                <p className="text-muted mb-1 fs-13">Aadhar Number</p>
                <p className="text-dark fw-medium fs-14 mb-0">{user.aadhar_number || 'N/A'}</p>
              </div>
            </div>
            
          </div>
          <div className="modal-footer border-0 pt-0 mx-3 mb-3">
            <button type="button" className="btn btn-light fw-bold px-4" onClick={onClose} style={{ fontSize: '15px' }}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
