import React from 'react';

const invoicesData = [
  { id: 'INV-001', title: 'Website Redesign Project', amount: '$12,500', date: '10 Jan 2025', dueDate: '10 Feb 2025', status: 'Paid', statusClass: 'badge-soft-success' },
  { id: 'INV-002', title: 'Mobile App Development', amount: '$8,750', date: '15 Feb 2025', dueDate: '15 Mar 2025', status: 'Pending', statusClass: 'badge-secondary-transparent' },
  { id: 'INV-003', title: 'UI/UX Consultation', amount: '$3,200', date: '01 Mar 2025', dueDate: '01 Apr 2025', status: 'Overdue', statusClass: 'badge-soft-danger' },
  { id: 'INV-004', title: 'Backend API Integration', amount: '$6,400', date: '20 Mar 2025', dueDate: '20 Apr 2025', status: 'Draft', statusClass: 'badge-secondary-transparent' },
];

function InvoiceTable({ data }) {
  return (
    <div className="table-responsive">
      <table className="table table-nowrap mb-0">
        <thead className="thead-light">
          <tr>
            <th>Invoice ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Invoice Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((inv) => (
            <tr key={inv.id}>
              <td><span className="text-primary fw-medium">{inv.id}</span></td>
              <td>{inv.title}</td>
              <td className="fw-medium">{inv.amount}</td>
              <td>{inv.date}</td>
              <td>{inv.dueDate}</td>
              <td>
                <span className={`badge ${inv.statusClass} d-inline-flex align-items-center`}>
                  <i className="fas fa-circle fs-6 me-1"></i>{inv.status}
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

export default function ClientInvoices({ isAccordion }) {
  if (isAccordion) {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingClientInvoices">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientInvoices" aria-expanded="false" aria-controls="collapseClientInvoices">
            Invoices
          </button>
        </h2>
        <div id="collapseClientInvoices" className="accordion-collapse collapse" aria-labelledby="headingClientInvoices" data-bs-parent="#overviewAccordion">
          <div className="accordion-body pb-0">
            <InvoiceTable data={invoicesData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="accordion accordions-items-seperate">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingInvoicesTab">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInvoicesTab" aria-expanded="true" aria-controls="collapseInvoicesTab">
              Invoices
            </button>
          </h2>
          <div id="collapseInvoicesTab" className="accordion-collapse collapse show" aria-labelledby="headingInvoicesTab">
            <div className="accordion-body p-0">
              <InvoiceTable data={invoicesData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
