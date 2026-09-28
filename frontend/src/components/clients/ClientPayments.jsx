import React, { useState, useEffect } from 'react';
import api from '../../api/axiosClient';
import toast from 'react-hot-toast';
import PaymentModal from '../finance/PaymentModal';
import ConfirmationModal from '../ConfirmationModal';
import { useNavigate } from 'react-router-dom';

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

const getStatusClass = (status) => {
  if (status === 'Completed') return 'badge-soft-success text-success';
  if (status === 'Failed') return 'badge-soft-danger text-danger';
  if (status === 'Pending') return 'badge-soft-warning text-warning';
  if (status === 'Partial') return 'badge-soft-purple text-purple';
  return 'bg-light text-dark';
};

function PaymentTable({ data, onView, onEdit, onDelete, modalId }) {
  return (
    <div className="table-responsive hide-scrollbar" style={{ minHeight: '410px', maxHeight: '450px', overflowY: 'auto' }}>
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none !important; }`}</style>
      <table className="table table-nowrap mb-0">
        <thead className="thead-light sticky-top" style={{ zIndex: 10 }}>
          <tr>
            <th className="border-0 bg-light text-muted fw-medium py-3">Payment ID</th>
            <th className="border-0 bg-light text-muted fw-medium py-3">Invoice</th>
            <th className="border-0 bg-light text-muted fw-medium py-3">Method</th>
            <th className="border-0 bg-light text-muted fw-medium py-3">Amount</th>
            <th className="border-0 bg-light text-muted fw-medium py-3">Date</th>
            <th className="border-0 bg-light text-muted fw-medium py-3">Status</th>
            <th className="border-0 bg-light text-muted fw-medium py-3 text-end">Action</th>
          </tr>
        </thead>
        <tbody className="border-top-0">
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-muted">No payments found for this client.</td>
            </tr>
          ) : (
            data.map((pay) => (
              <tr key={pay._id} className="border-bottom border-light">
                <td className="align-middle">
                  <span className="text-primary fw-medium">{pay.payment_id || `PAY-${pay._id.substring(0, 4)}`}</span>
                </td>
                <td className="align-middle">
                  <span className="text-dark fw-medium">{pay.invoice_number || '-'}</span>
                </td>
                <td className="align-middle">
                  <span className="d-flex align-items-center text-muted">
                    <i className="ti ti-credit-card me-2"></i>{pay.payment_method || 'Bank Transfer'}
                  </span>
                </td>
                <td className="align-middle fw-semibold text-dark">
                  {formatCurrency(parseFloat(pay.amount_received))}
                </td>
                <td className="align-middle text-muted">
                  {formatDate(pay.payment_date || pay.created_at)}
                </td>
                <td className="align-middle">
                  <span className={`badge ${getStatusClass(pay.status)} d-inline-flex align-items-center py-1 px-2 rounded-1`}>
                    <i className="fas fa-circle fs-6 me-1" style={{ fontSize: '6px' }}></i>{pay.status || 'Pending'}
                  </span>
                </td>
                <td className="align-middle text-end">
                  <div className="dropdown">
                    <a href="#" className="d-inline-flex align-items-center text-muted p-2 rounded-circle hover-bg-light text-decoration-none" data-bs-toggle="dropdown" onClick={(e) => e.preventDefault()}>
                      <i className="ti ti-dots-vertical"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end p-2 border-0 shadow-sm rounded-3" style={{ minWidth: '160px', zIndex: 9999 }}>
                      <li>
                        <button type="button" onClick={() => onView(pay)} className="dropdown-item rounded-1 border-0 bg-transparent w-100 text-start text-dark mb-1">
                          <i className="ti ti-eye me-2"></i>View
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => onEdit(pay)} className="dropdown-item rounded-1 border-0 bg-transparent w-100 text-start text-dark mb-1">
                          <i className="ti ti-edit me-2"></i>Edit
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => onDelete(pay)} data-bs-toggle="modal" data-bs-target={`#${modalId}`} className="dropdown-item rounded-1 border-0 bg-transparent text-danger w-100 text-start">
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

export default function ClientPayments({ isAccordion, client }) {
  const [payments, setPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const navigate = useNavigate();
  
  const modalId = isAccordion ? "deletePaymentModalAccordion" : "deletePaymentModalTab";

  const fetchPayments = async () => {
    if (!client || !client._id) return;
    try {
      const [paymentsRes, invoicesRes] = await Promise.all([
        api.get('/payments'),
        api.get('/invoices')
      ]);
      const data = Array.isArray(paymentsRes.data) ? paymentsRes.data : (Array.isArray(paymentsRes) ? paymentsRes : []);
      const invData = Array.isArray(invoicesRes.data) ? invoicesRes.data : (Array.isArray(invoicesRes) ? invoicesRes : []);
      
      const invMap = {};
      invData.forEach(inv => { invMap[inv._id] = inv.invoice_number; });

      const clientPayments = data.filter(p => p.client_id === client._id);
      
      const formatted = clientPayments.map(p => ({
        ...p,
        invoice_number: invMap[p.invoice_id] || p.invoice_id
      }));

      // Sort by latest first
      formatted.sort((a, b) => new Date(b.created_at || b.payment_date) - new Date(a.created_at || a.payment_date));
      setPayments(formatted);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
    }
  };

  useEffect(() => {
    fetchPayments();

    const handleOpenPaymentModal = () => {
      setEditData(null);
      setIsModalOpen(true);
    };

    document.addEventListener('openClientPaymentModal', handleOpenPaymentModal);
    return () => {
      document.removeEventListener('openClientPaymentModal', handleOpenPaymentModal);
    };
  }, [client]);

  const handleEdit = (pay) => {
    setEditData(pay);
    setIsModalOpen(true);
  };

  const handleSavePayment = async (data) => {
    try {
      if (data._id) {
        await api.put(`/payments/${data._id}`, data);
        toast.success('Payment updated successfully');
      } else {
        await api.post('/payments', data);
        toast.success('Payment added successfully');
      }
      fetchPayments();
      setIsModalOpen(false);
      setEditData(null);
    } catch (error) {
      toast.error('Failed to save payment');
    }
  };

  const handleDelete = (pay) => {
    setPaymentToDelete(pay);
  };

  const confirmDelete = async () => {
    if (!paymentToDelete) return;
    try {
      await api.delete(`/payments/${paymentToDelete._id}`);
      toast.success('Payment deleted successfully');
      setPaymentToDelete(null);
      fetchPayments();
    } catch (error) {
      toast.error('Failed to delete payment');
    }
  };

  const handleView = (pay) => {
    navigate('/payments');
  };

  const renderContent = () => (
    <>
      <PaymentTable data={payments} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} modalId={modalId} />
      {isModalOpen && (
        <PaymentModal 
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); setEditData(null); }} 
          onSave={handleSavePayment} 
          payment={editData}
          // The PaymentModal uses 'client_id' field inside form, but doesn't take fixedClientId explicitly, 
          // we might just let user select, but client is already selected ideally.
        />
      )}
      <ConfirmationModal 
        id={modalId}
        title="Confirm Delete"
        description="Are you sure you want to delete this payment? This action cannot be undone."
        onConfirm={confirmDelete}
      />
    </>
  );

  if (isAccordion) {
    return (
      <div className="accordion-item border-0 mb-3">
        <h2 className="accordion-header" id="headingClientPayments">
          <button className="accordion-button collapsed rounded fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientPayments" aria-expanded="false" aria-controls="collapseClientPayments">
            Payments
          </button>
        </h2>
        <div id="collapseClientPayments" className="accordion-collapse collapse" aria-labelledby="headingClientPayments" data-bs-parent="#overviewAccordion">
          <div className="accordion-body pb-0">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="accordion accordions-items-seperate">
        <div className="accordion-item border-0 mb-3">
          <h2 className="accordion-header" id="headingPaymentsTab">
            <button className="accordion-button rounded fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePaymentsTab" aria-expanded="true" aria-controls="collapsePaymentsTab">
              Payments
            </button>
          </h2>
          <div id="collapsePaymentsTab" className="accordion-collapse collapse show" aria-labelledby="headingPaymentsTab">
            <div className="accordion-body p-0 pt-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
