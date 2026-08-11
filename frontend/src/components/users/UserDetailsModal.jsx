import React from 'react';
import Avatar from "@/components/common/Avatar/Avatar";
import Badge from "@/components/common/Badge/Badge";
import Modal from "@/components/common/Modal/Modal";
import { FiX, FiMapPin, FiBriefcase, FiCreditCard } from "react-icons/fi";
import { getProfilePhotoUrl } from "@/utils/helpers";

export default function UserDetailsModal({ open, onClose, user }) {
  if (!open || !user) return null;

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="User Details" 
      size="lg"
      footer={
        <button type="button" className="btn btn-light" onClick={onClose}>Close</button>
      }
    >
      <div className="p-2">
        {/* Header Info */}
        <div className="d-flex align-items-center gap-3 mb-4 pb-4 border-bottom">
          <Avatar name={user.name} size={64} src={getProfilePhotoUrl(user.profile_photo)} />
          <div>
            <h4 className="mb-1" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{user.name}</h4>
            <div className="text-muted" style={{ fontSize: "0.9rem" }}>{user.email}</div>
            <div className="mt-2">
              <Badge variant="primary">{user.role}</Badge>
              {user.is_active ? (
                <Badge variant="success" className="ms-2">Active</Badge>
              ) : (
                <Badge variant="danger" className="ms-2">Inactive</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Basic & Professional Info */}
          <div className="col-md-6">
            <h6 className="d-flex align-items-center gap-2 mb-3 text-primary" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              <FiBriefcase /> Basic & Professional
            </h6>
            <div className="mb-2">
              <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Phone Number</small>
              <div style={{ fontSize: "0.9rem" }}>{user.phone || "N/A"}</div>
            </div>
            <div className="mb-2">
              <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Designation</small>
              <div style={{ fontSize: "0.9rem" }}>{user.designation || "N/A"}</div>
            </div>
            <div className="mb-2">
              <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Gender / DOB</small>
              <div style={{ fontSize: "0.9rem" }}>
                {user.gender || "N/A"} {user.dob ? ` / ${new Date(user.dob).toLocaleDateString()}` : ""}
              </div>
            </div>
          </div>

          {/* Location Info */}
          <div className="col-md-6">
            <h6 className="d-flex align-items-center gap-2 mb-3 text-primary" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              <FiMapPin /> Location
            </h6>
            <div className="mb-2">
              <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>City</small>
              <div style={{ fontSize: "0.9rem" }}>{user.city || "N/A"}</div>
            </div>
            <div className="mb-2">
              <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>State</small>
              <div style={{ fontSize: "0.9rem" }}>{user.state || "N/A"}</div>
            </div>
            <div className="mb-2">
              <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Country</small>
              <div style={{ fontSize: "0.9rem" }}>{user.country || "N/A"}</div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="col-12 mt-4 pt-4 border-top">
            <h6 className="d-flex align-items-center gap-2 mb-3 text-primary" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              <FiCreditCard /> Financial & Compliance Details
            </h6>
            <div className="row g-3">
              <div className="col-sm-6">
                <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Bank Name</small>
                <div style={{ fontSize: "0.9rem" }}>{user.bank_name || "N/A"}</div>
              </div>
              <div className="col-sm-6">
                <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Account Holder</small>
                <div style={{ fontSize: "0.9rem" }}>{user.account_holder_name || "N/A"}</div>
              </div>
              <div className="col-sm-6">
                <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Account Number</small>
                <div style={{ fontSize: "0.9rem" }}>{user.account_number || "N/A"}</div>
              </div>
              <div className="col-sm-6">
                <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>IFSC Code</small>
                <div style={{ fontSize: "0.9rem" }}>{user.ifsc_code || "N/A"}</div>
              </div>
              <div className="col-sm-6">
                <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>PAN Card Number</small>
                <div style={{ fontSize: "0.9rem", textTransform: "uppercase" }}>{user.pan_number || "N/A"}</div>
              </div>
              <div className="col-sm-6">
                <small className="text-muted d-block" style={{ fontSize: "0.75rem" }}>Aadhar Number</small>
                <div style={{ fontSize: "0.9rem" }}>{user.aadhar_number || "N/A"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
