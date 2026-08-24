import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/api/axiosClient";
import { FiArrowLeft } from "react-icons/fi";
import Button from "@/components/common/Button/Button";
import Avatar from "@/components/common/Avatar/Avatar";
import { CLIENT_STATUS_LABEL } from "@/utils/constants";
import { formatCurrency } from "@/utils/formatters";
import "./ClientFormModal.css"; // Reuse styles for the grid

export default function ClientDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(null);
  const [usersMap, setUsersMap] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [clientRes, usersRes, historyRes] = await Promise.all([
        api.get(`/clients/${id}/dashboard`),
        api.get("/users").catch(() => []),
        api.get(`/clients/${id}/history`).catch(() => [])
      ]);
      setHistory(historyRes || []);
      
      // Map users for account manager lookup
      const umap = {};
      (usersRes || []).forEach(u => umap[u.id] = u.name);
      setUsersMap(umap);

      // Note: the backend `/clients/:id` returns the dashboard object { client: {...}, financials: {...}, ... }
      if (clientRes && clientRes.client) {
        setClient(clientRes.client);
      } else {
        setClient(clientRes); // fallback if it just returns client
      }
    } catch (e) {
      console.error("Failed to load client details:", e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading Client Details...</div>;
  if (!client) return <div className="p-4 text-center">Client not found.</div>;

  const DetailRow = ({ label, value }) => (
    <div className="col-md-4 mb-4">
      <div className="text-muted" style={{ fontSize: '0.85rem', fontWeight: 500 }}>{label}</div>
      <div style={{ fontWeight: 500, color: 'var(--color-text)', marginTop: '4px' }}>{value || "—"}</div>
    </div>
  );

  return (
    <div className="client-profile-page page-container p-4">
      <div className="d-flex align-items-center mb-4 gap-3">
        <Button variant="secondary" icon={FiArrowLeft} onClick={() => navigate("/clients")} />
        <Avatar name={client.client_name || client.company_name} size={48} />
        <div>
          <h3 className="mb-0">{client.client_name || client.company_name}</h3>
          <span className="text-muted">
            Client ID: {client.client_id} | {client.email} | {client.mobile_number}
          </span>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header border-bottom-0 pt-4 pb-0" style={{ backgroundColor: "transparent" }}>
          <ul className="nav nav-tabs border-bottom">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} 
                onClick={() => setActiveTab('profile')}
                style={{ cursor: 'pointer', borderTop: 'none', borderLeft: 'none', borderRight: 'none', fontWeight: 500 }}
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'history' ? 'active' : ''}`} 
                onClick={() => setActiveTab('history')}
                style={{ cursor: 'pointer', borderTop: 'none', borderLeft: 'none', borderRight: 'none', fontWeight: 500 }}
              >
                History
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body p-4" style={{ borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
          
          {activeTab === 'profile' && (
            <div>
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
                  <div style={{ fontWeight: 400, color: 'var(--color-text)', marginTop: '4px', whiteSpace: 'pre-wrap', background: 'var(--color-surface-alt)', padding: '15px', borderRadius: '8px' }}>
                    {client.notes || "No notes available."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h5 className="form-section-title mb-4">Activity Timeline</h5>
              {history.length === 0 ? (
                <div className="text-center p-5 text-muted">
                  <p>No history records found for this client.</p>
                </div>
              ) : (
                <div className="timeline-container" style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--color-border)', marginLeft: '1rem' }}>
                  {history.map((item, index) => (
                    <div key={item._id || index} style={{ position: 'relative', marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                      <div style={{ position: 'absolute', left: '-2.1rem', top: '0', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)', border: '2px solid white' }}></div>
                      <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                        {new Date(item.timestamp).toLocaleString()} 
                        {item.user_name && <span> &bull; by {item.user_name}</span>}
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--color-text)', marginBottom: '4px' }}>{item.action}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{item.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
