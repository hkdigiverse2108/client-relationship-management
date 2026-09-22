import React from 'react';

const paymentsData = [
  { id: 'PAY-001', invoice: 'INV-001', method: 'Bank Transfer', amount: '$12,500', date: '12 Feb 2025', status: 'Completed', statusClass: 'badge-soft-success' },
  { id: 'PAY-002', invoice: 'INV-003', method: 'Credit Card', amount: '$1,600', date: '05 Mar 2025', status: 'Completed', statusClass: 'badge-soft-success' },
  { id: 'PAY-003', invoice: 'INV-002', method: 'UPI', amount: '$4,375', date: '20 Mar 2025', status: 'Pending', statusClass: 'badge-secondary-transparent' },
  { id: 'PAY-004', invoice: 'INV-004', method: 'Cheque', amount: '$6,400', date: '22 Apr 2025', status: 'Pending', statusClass: 'badge-secondary-transparent' },
];

function PaymentTable({ data }) {
  return (
    <div className="table-responsive">
      <table className="table table-nowrap mb-0">
        <thead className="thead-light">
          <tr>
            <th>Payment ID</th>
            <th>Invoice</th>
            <th>Method</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Status</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((pay) => (
            <tr key={pay.id}>
              <td><span className="text-primary fw-medium">{pay.id}</span></td>
              <td><span className="text-dark">{pay.invoice}</span></td>
              <td>
                <span className="d-flex align-items-center">
                  <i className="ti ti-credit-card me-1 text-muted"></i>{pay.method}
                </span>
              </td>
              <td className="fw-medium">{pay.amount}</td>
              <td>{pay.date}</td>
              <td>
                <span className={`badge ${pay.statusClass} d-inline-flex align-items-center`}>
                  <i className="fas fa-circle fs-6 me-1"></i>{pay.status}
                </span>
              </td>
              <td className="text-end">
                <div className="dropdown">
                  <a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center" data-bs-toggle="dropdown">
                    <i className="ti ti-dots-vertical"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-eye me-2"></i>View</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-edit me-2"></i>Edit</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-trash me-2"></i>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ClientPayments({ isAccordion }) {
  if (isAccordion) {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingClientPayments">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientPayments" aria-expanded="false" aria-controls="collapseClientPayments">
            Payments
          </button>
        </h2>
        <div id="collapseClientPayments" className="accordion-collapse collapse" aria-labelledby="headingClientPayments" data-bs-parent="#overviewAccordion">
          <div className="accordion-body pb-0">
            <PaymentTable data={paymentsData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="accordion accordions-items-seperate">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingPaymentsTab">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePaymentsTab" aria-expanded="true" aria-controls="collapsePaymentsTab">
              Payments
            </button>
          </h2>
          <div id="collapsePaymentsTab" className="accordion-collapse collapse show" aria-labelledby="headingPaymentsTab">
            <div className="accordion-body p-0">
              <PaymentTable data={paymentsData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
