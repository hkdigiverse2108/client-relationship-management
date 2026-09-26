import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import toast from 'react-hot-toast';
import DealFormModal from '../common/DealFormModal';
import ConfirmationModal from '../ConfirmationModal';

const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getStageClass = (stage) => {
  const s = (stage || '').toLowerCase();
  if (s.includes('lead')) return 'bg-transparent-purple text-purple';
  if (s.includes('contacted')) return 'bg-transparent-pink text-pink';
  if (s.includes('proposal')) return 'bg-transparent-warning text-warning';
  if (s.includes('negotiation')) return 'bg-transparent-info text-info';
  if (s.includes('won')) return 'bg-transparent-success text-success';
  if (s.includes('lost')) return 'bg-transparent-danger text-danger';
  return 'bg-light text-dark';
};

function DealTable({ data, onView, onEdit, onDelete, modalId }) {
  return (
    <div className="table-responsive hide-scrollbar" style={{ minHeight: '410px', maxHeight: '450px', overflowY: 'auto' }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none !important; }`}</style>
      <table className="table table-nowrap mb-0">
        <thead className="thead-light">
          <tr>
            <th>Deal</th>
            <th>Stage</th>
            <th>Value</th>
            <th>Probability</th>
            <th>Close Date</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-muted">No deals found for this client.</td>
            </tr>
          ) : (
            data.map((deal) => (
              <tr key={deal._id}>
                <td>
                  <div>
                    <h6 className="fs-14 mb-0 text-dark text-truncate" style={{ maxWidth: '200px' }}>{deal.title}</h6>
                  </div>
                </td>
                <td>
                  <span className={`badge ${getStageClass(deal.stage)} d-inline-flex align-items-center`}>
                    <i className="fas fa-circle fs-6 me-1"></i>{deal.stage || 'Lead'}
                  </span>
                </td>
                <td className="fw-medium">{formatCurrency(deal.amount || deal.value)}</td>
                <td>
                  <div className="d-flex align-items-center" style={{ minWidth: "120px" }}>
                    <div className="progress flex-grow-1 me-2" style={{ height: '6px' }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${deal.probability || 0}%` }}></div>
                    </div>
                    <small>{deal.probability || 0}%</small>
                  </div>
                </td>
                <td>{formatDate(deal.expected_close_date)}</td>
                <td className="text-end">
                  <div className="dropdown">
                    <a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center" data-bs-toggle="dropdown">
                      <i className="ti ti-dots-vertical"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end p-3" style={{ zIndex: 9999, position: 'absolute' }}>
                      <li>
                        <button type="button" onClick={() => onView(deal)} className="dropdown-item rounded-1 border-0 bg-transparent w-100 text-start">
                          <i className="ti ti-eye me-2"></i>View
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => onEdit(deal)} className="dropdown-item rounded-1 border-0 bg-transparent w-100 text-start">
                          <i className="ti ti-edit me-2"></i>Edit
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => onDelete(deal)} data-bs-toggle="modal" data-bs-target={`#${modalId}`} className="dropdown-item rounded-1 border-0 bg-transparent text-danger w-100 text-start">
                          <i className="ti ti-trash me-2"></i>Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function ClientDeals({ client, isAccordion }) {
  const [deals, setDeals] = useState([]);
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [dealToEdit, setDealToEdit] = useState(null);
  const [dealToDelete, setDealToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchDeals = async () => {
    const clientId = client?._id || client?.id;
    if (!clientId) return;
    try {
      const res = await axiosClient.get(`/deals?client_id=${clientId}`);
      setDeals(res || []);
    } catch (err) {
      console.error("Failed to fetch client deals", err);
    }
  };

  useEffect(() => {
    fetchDeals();
    
    if (!isAccordion) {
      const handleOpenModal = () => {
        setDealToEdit(null);
        setIsDealModalOpen(true);
      };
      
      document.addEventListener('openClientDealModal', handleOpenModal);
      return () => document.removeEventListener('openClientDealModal', handleOpenModal);
    }
  }, [client, isAccordion]);

  const handleEdit = (deal) => {
    setDealToEdit(deal);
    setIsDealModalOpen(true);
  };

  const handleView = (deal) => {
    // Navigate to pipeline with search pre-filled or just navigate to pipeline
    navigate('/pipeline', { state: { searchQuery: deal.title } });
  };

  const handleDelete = (deal) => {
    setDealToDelete(deal);
  };

  const confirmDelete = async () => {
    if (!dealToDelete) return;
    try {
      await axiosClient.delete(`/deals/${dealToDelete._id || dealToDelete.id}`);
      toast.success("Deal deleted successfully");
      setDealToDelete(null);
      fetchDeals();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete deal");
    }
  };

  const handleDealUpdated = () => {
    setIsDealModalOpen(false);
    setDealToEdit(null);
    fetchDeals();
  };

  const modalId = `delete_deal_modal_${isAccordion ? 'mobile' : 'desktop'}`;

  const content = (
    <>
      <DealTable data={deals} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} modalId={modalId} />
      
      {!isAccordion && isDealModalOpen && (
        <DealFormModal
          open={isDealModalOpen}
          onClose={() => { setIsDealModalOpen(false); setDealToEdit(null); }}
          initialData={dealToEdit}
          onSubmit={handleDealUpdated}
          defaultClient={client?._id || client?.id}
        />
      )}
    </>
  );

  if (isAccordion) {
    return (
      <>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingClientDeals">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientDeals" aria-expanded="false" aria-controls="collapseClientDeals">
              Deal
            </button>
          </h2>
          <div id="collapseClientDeals" className="accordion-collapse collapse" aria-labelledby="headingClientDeals" data-bs-parent="#overviewAccordion">
            <div className="accordion-body p-0 pb-3">
              {content}
            </div>
          </div>
        </div>
        <ConfirmationModal 
          id={modalId}
          title="Confirm Delete"
          description="Are you sure you want to delete this deal? This action cannot be undone."
          onConfirm={confirmDelete}
        />
      </>
    );
  }

  return (
    <>
      <div className="accordion accordions-items-seperate">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingDealsTab">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDealsTab" aria-expanded="true" aria-controls="collapseDealsTab">
              Deal
            </button>
          </h2>
          <div id="collapseDealsTab" className="accordion-collapse collapse show" aria-labelledby="headingDealsTab">
            <div className="accordion-body p-0 pb-3">
              {content}
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal 
        id={modalId}
        title="Confirm Delete"
        description="Are you sure you want to delete this deal? This action cannot be undone."
        onConfirm={confirmDelete}
      />
    </>
  );
}
