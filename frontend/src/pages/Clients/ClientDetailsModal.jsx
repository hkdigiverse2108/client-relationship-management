import React from "react";
import Modal from "@/components/common/Modal/Modal";
import Button from "@/components/common/Button/Button";
import { CLIENT_STATUS_LABEL } from "@/utils/constants";
import { formatCurrency } from "@/utils/formatters";
import "./ClientFormModal.css"; // Reuse form modal styling for consistency

export default function ClientDetailsModal({ open, onClose, client, usersMap }) {
  if (!client) return null;

  const DetailRow = ({ label, value }) => (
    <div className="col-md-4 mb-3">
      <div className="text-muted" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{label}</div>
      <div style={{ fontWeight: 500, color: 'var(--color-text)', marginTop: '4px' }}>{value || "—"}</div>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Client Profile Details"
      size="xl"
      footer={<Button variant="secondary" onClick={onClose}>Close</Button>}
    >
      <div className="client-form-scrollable">
        <h5 className="form-section-title">Basic Information</h5>
        <div className="row">
          <DetailRow label="Client Name" value={client.client_name} />
          <DetailRow label="Company Name" value={client.company_name} />
          <DetailRow label="Contact Person" value={client.contact_person} />
        </div>

        <h5 className="form-section-title mt-4">Contact Details</h5>
        <div className="row">
          <DetailRow label="Email" value={client.email} />
          <DetailRow label="Mobile Number" value={client.mobile_number} />
          <DetailRow label="Alternate Number" value={client.alternate_number} />
          <DetailRow label="Website" value={client.website} />
        </div>

        <h5 className="form-section-title mt-4">Address Details</h5>
        <div className="row">
          <DetailRow label="Address" value={client.address} />
          <DetailRow label="City" value={client.city} />
          <DetailRow label="State" value={client.state} />
          <DetailRow label="Country" value={client.country} />
          <DetailRow label="Pincode" value={client.pincode} />
        </div>

        <h5 className="form-section-title mt-4">Business Information</h5>
        <div className="row">
          <DetailRow label="Industry" value={client.industry} />
          <DetailRow label="Customer Type" value={<span className="text-capitalize">{client.customer_type}</span>} />
          <DetailRow label="Status" value={CLIENT_STATUS_LABEL[client.status?.toLowerCase()] || client.status} />
          <DetailRow label="Account Manager" value={usersMap[client.assigned_to] || "Unknown"} />
          <DetailRow label="Contract Value" value={client.contract_value ? formatCurrency(client.contract_value) : "—"} />
          <DetailRow label="Client Type" value={client.converted_from_lead_id === "Manual" || !client.converted_from_lead_id ? "Manual" : "Converted"} />
        </div>

        <h5 className="form-section-title mt-4">Additional Info</h5>
        <div className="row">
          <DetailRow label="Requirement" value={client.requirement} />
        </div>
        <div className="row mt-2">
          <div className="col-12">
            <div className="text-muted" style={{ fontSize: '0.85rem', fontWeight: 500 }}>Notes</div>
            <div style={{ fontWeight: 400, color: 'var(--color-text)', marginTop: '4px', whiteSpace: 'pre-wrap', background: 'var(--color-bg-secondary)', padding: '10px', borderRadius: '8px' }}>
              {client.notes || "No notes available."}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
