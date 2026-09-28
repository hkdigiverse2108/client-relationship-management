import os

invoices_path = r"d:\hk digiverse\NEW-CRM\frontend\src\pages\Invoices.jsx"
client_invoices_path = r"d:\hk digiverse\NEW-CRM\frontend\src\components\clients\ClientInvoices.jsx"

with open(invoices_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract openInvoicePreview
start_idx = content.find("const openInvoicePreview = (row) => {")
end_idx = content.find("};", content.find("previewWindow.document.close();", start_idx)) + 2
open_preview_code = content[start_idx:end_idx]

new_content = f"""import React, {{ useState, useEffect }} from 'react';
import api from '../../api/axiosClient';
import toast from 'react-hot-toast';
import InvoiceModal from '../finance/InvoiceModal';

const formatCurrency = (amount) => {{
  if (amount === undefined || amount === null) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}};

const formatDate = (dateString) => {{
  if (!dateString) return '-';
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', {{ day: 'numeric', month: 'short', year: 'numeric' }});
}};

const getStatusClass = (status) => {{
  if (status === 'Paid') return 'badge-soft-success text-success';
  if (status === 'Partially Paid') return 'badge-soft-purple text-purple';
  if (status === 'Sent') return 'badge-soft-info text-info';
  if (status === 'Overdue') return 'badge-soft-danger text-danger';
  if (status === 'Draft') return 'badge-soft-warning text-warning';
  return 'bg-light text-dark';
}};

{open_preview_code}

function InvoiceTable({{ data, onView, onEdit, onDelete }}) {{
  return (
    <div className="table-responsive hide-scrollbar" style={{{{ minHeight: '410px', maxHeight: '450px', overflowY: 'auto' }}}}>
      <style>{{`.hide-scrollbar::-webkit-scrollbar {{ display: none !important; }}`}}</style>
      <table className="table table-nowrap mb-0">
        <thead className="thead-light">
          <tr>
            <th>Invoice ID</th>
            <th>Description</th>
            <th>Total Amount</th>
            <th>Due Amount</th>
            <th>Issue Date</th>
            <th>Status</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {{data.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-muted">No invoices found for this client.</td>
            </tr>
          ) : (
            data.map((inv) => (
              <tr key={{inv._id}}>
                <td><span className="text-primary fw-medium">{{inv.invoice_number || `INV-${{inv._id.substring(0,4)}}`}}</span></td>
                <td>
                  <h6 className="fs-14 mb-0 text-dark text-truncate" style={{{{ maxWidth: '200px' }}}}>{{inv.line_items?.[0]?.description || 'Invoice'}}</h6>
                </td>
                <td className="fw-medium">{{formatCurrency(inv.total_due || inv.total_amount)}}</td>
                <td className="fw-medium text-danger">{{formatCurrency((inv.total_due || inv.total_amount) - (inv.amount_paid || 0))}}</td>
                <td>{{formatDate(inv.issue_date)}}</td>
                <td>
                  <span className={{`badge ${{getStatusClass(inv.status)}} d-inline-flex align-items-center`}}>
                    <i className="fas fa-circle fs-6 me-1"></i>{{inv.status || 'Draft'}}
                  </span>
                </td>
                <td className="text-end">
                  <div className="dropdown">
                    <a href="#" onClick={{(e) => e.preventDefault()}} className="d-inline-flex align-items-center" data-bs-toggle="dropdown">
                      <i className="ti ti-dots-vertical"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end p-3" style={{{{ zIndex: 9999, position: 'absolute' }}}}>
                      <li>
                        <button type="button" onClick={{() => onView(inv)}} className="dropdown-item rounded-1 border-0 bg-transparent w-100 text-start">
                          <i className="ti ti-eye me-2"></i>View PDF
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={{() => onEdit(inv)}} className="dropdown-item rounded-1 border-0 bg-transparent w-100 text-start">
                          <i className="ti ti-edit me-2"></i>Edit
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={{() => onDelete(inv)}} className="dropdown-item rounded-1 border-0 bg-transparent text-danger w-100 text-start">
                          <i className="ti ti-trash me-2"></i>Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          )}}
        </tbody>
      </table>
    </div>
  );
}}

export default function ClientInvoices({{ isAccordion, client }}) {{
  const [invoices, setInvoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  
  const fetchInvoices = async () => {{
    if (!client || !client._id) return;
    try {{
      const res = await api.get('/invoices');
      const data = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
      const clientInvs = data.filter(i => i.client_id === client._id);
      setInvoices(clientInvs);
    }} catch (error) {{
      console.error("Failed to fetch invoices:", error);
    }}
  }};

  useEffect(() => {{
    fetchInvoices();
  }}, [client]);

  const handleView = (inv) => {{
    openInvoicePreview({{...inv, client_name: client.client_name, client_address: client.city, client_phone: client.phone, client_gstin: client.gstin}});
  }};

  const handleEdit = (inv) => {{
    setEditData(inv);
    setIsModalOpen(true);
  }};

  const handleDelete = async (inv) => {{
    if (window.confirm('Are you sure you want to delete this invoice?')) {{
      try {{
        await api.delete(`/invoices/${{inv._id}}`);
        toast.success('Invoice deleted successfully');
        fetchInvoices();
      }} catch (error) {{
        toast.error('Failed to delete invoice');
      }}
    }}
  }};

  const handleSaveInvoice = async (formData) => {{
    try {{
      const totalBeforeTax = formData.line_items.reduce((sum, item) => sum + Number(item.amount), 0) - Number(formData.additional_discount || 0);
      let taxAmount = 0;
      if (formData.tax_type === 'CGST + SGST') {{
        taxAmount = (totalBeforeTax * formData.cgst_percent / 100) + (totalBeforeTax * formData.sgst_percent / 100);
      }} else if (formData.tax_type === 'IGST') {{
        taxAmount = totalBeforeTax * formData.igst_percent / 100;
      }}
      const rawTotal = totalBeforeTax + taxAmount;
      const roundedTotal = Math.round(rawTotal);
      const roundOff = roundedTotal - rawTotal;

      const payload = {{
        ...formData,
        client_id: client._id,
        total_amount: totalBeforeTax,
        total_tax_amount: taxAmount,
        rounded_total: roundedTotal,
        calculated_round_off: roundOff,
        total_due: roundedTotal,
        status: formData.status || 'Draft'
      }};
      
      if (editData && editData._id) {{
         await api.put(`/invoices/${{editData._id}}`, payload);
         toast.success('Invoice updated successfully!');
      }} else {{
         await api.post('/invoices', payload);
         toast.success('Invoice created successfully!');
      }}
      
      setIsModalOpen(false);
      setEditData(null);
      fetchInvoices();
    }} catch (error) {{
      toast.error('Failed to save invoice');
    }}
  }};

  const renderContent = () => (
    <>
      <InvoiceTable data={{invoices}} onView={{handleView}} onEdit={{handleEdit}} onDelete={{handleDelete}} />
      <InvoiceModal 
        isOpen={{isModalOpen}} 
        onClose={{() => {{ setIsModalOpen(false); setEditData(null); }}}} 
        onSave={{handleSaveInvoice}} 
        editData={{editData}}
        fixedClientId={{client?._id}}
      />
    </>
  );

  if (isAccordion) {{
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingClientInvoices">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientInvoices" aria-expanded="false" aria-controls="collapseClientInvoices">
            Invoices
          </button>
        </h2>
        <div id="collapseClientInvoices" className="accordion-collapse collapse" aria-labelledby="headingClientInvoices" data-bs-parent="#overviewAccordion">
          <div className="accordion-body pb-0">
            {{renderContent()}}
          </div>
        </div>
      </div>
    );
  }}

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
              <div className="p-3 text-end border-bottom">
                <button onClick={{() => {{ setEditData(null); setIsModalOpen(true); }}}} className="btn btn-primary btn-sm"><i className="ti ti-plus me-1"></i>Add Invoice</button>
              </div>
              {{renderContent()}}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}}
"""

with open(client_invoices_path, "w", encoding="utf-8") as f:
    f.write(new_content)
