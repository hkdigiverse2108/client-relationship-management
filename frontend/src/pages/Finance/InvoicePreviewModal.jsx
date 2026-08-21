import React, { useRef } from 'react';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import { FiDownload, FiPrinter } from 'react-icons/fi';
import { formatCurrency } from '@/utils/formatters';

// Number to words converter
function numberToWords(num) {
    if (num === 0) return 'Zero';
    const a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    const b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

    let numStr = Math.floor(num).toString();
    if (numStr.length > 9) return 'overflow';
    const n = ('000000000' + numStr).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str.trim() + ' Rupees Only';
}

const InvoicePreviewModal = ({ isOpen, onClose, invoice }) => {
  const printRef = useRef();

  if (!invoice) return null;

  // Safe parsing
  const lineItems = invoice.line_items || [];
  const taxType = invoice.tax_type || 'IGST';
  const isCgst = taxType === 'CGST + SGST';
  
  const totalBase = parseFloat(invoice.total_amount) || 0;
  const taxAmount = parseFloat(invoice.total_tax_amount) || 0;
  const totalDue = parseFloat(invoice.total_due) || 0;
  const roundOff = parseFloat(invoice.calculated_round_off) || 0;
  
  const cgstAmt = isCgst ? taxAmount / 2 : 0;
  const sgstAmt = isCgst ? taxAmount / 2 : 0;
  const igstAmt = isCgst ? 0 : taxAmount;

  const amountInWords = numberToWords(totalDue);

  return (
    <Modal open={isOpen} onClose={onClose} title="Invoice Preview" size="xl">
      <div className="invoice-container border rounded p-4 bg-white shadow-sm" ref={printRef} style={{ maxWidth: '900px', margin: '0 auto', color: '#333' }}>
        
        {/* Header Section */}
        <div className="row mb-4 align-items-start">
          <div className="col-1">
             <h1 style={{color: '#718d52', fontWeight: 900, letterSpacing: '-2px', fontSize: '3rem', margin: 0, lineHeight: 1}}>HK</h1>
          </div>
          <div className="col-8 ps-4">
             <h4 className="fw-bold mb-1" style={{color: '#1a1a1a'}}>Harikrushn DigiVerse LLP</h4>
             <p className="mb-0" style={{fontSize: '11px', lineHeight: '1.4', color: '#555'}}>
               FLAT-204, 2nd FLOOR, RS NO-67/1, WING-A, HARIKRUSHANA COMPLEX, OPP. <br/>
               BHAGAT NAGAR, VED, GURUKULROAD, KATARGAM, SURAT- 395004,<br/>
               GUJARAT, INDIA.<br/>
               Ph: +91 87805 64463 | sales@hkdigiverse.com<br/>
               GSTIN: 24APQPN3916P1Z4 | PAN: AAXFN3372M | LLPIN: ACK-1143 | State: 24
             </p>
          </div>
          <div className="col-3 text-end">
             <span className="badge rounded-1 px-3 py-2 text-white" style={{backgroundColor: '#264653', fontSize: '11px', letterSpacing: '1px'}}>
               {(invoice.invoice_type || 'TAX INVOICE').toUpperCase()}
             </span>
          </div>
        </div>

        <hr style={{borderTop: '2px solid #ddd'}}/>

        {/* Bill To & Meta Section */}
        <div className="row mb-4 mt-4">
          <div className="col-7">
             <h6 className="text-muted small fw-bold text-uppercase mb-1" style={{letterSpacing: '1px'}}>Bill To</h6>
             <h5 className="fw-bold mb-1" style={{color: '#1a1a1a'}}>{invoice.client_name || 'Client Name'}</h5>
             <p className="mb-1" style={{fontSize: '12px', color: '#555'}}>{invoice.client_address || 'Client Address'}</p>
             <p className="mb-1" style={{fontSize: '12px', color: '#555'}}>Ph: {invoice.client_phone || 'N/A'}</p>
             <p className="mb-0" style={{fontSize: '12px', color: '#555'}}>GSTIN: {invoice.client_gstin || 'N/A'}</p>
          </div>
          <div className="col-5">
             <table className="table table-sm table-borderless mb-0" style={{fontSize: '12px'}}>
               <tbody>
                 <tr>
                   <td className="text-muted pb-1">Invoice No.</td>
                   <td className="fw-bold text-end pb-1">{invoice.invoice_number}</td>
                 </tr>
                 <tr>
                   <td className="text-muted pb-1">Date</td>
                   <td className="fw-bold text-end pb-1">{new Date(invoice.issue_date).toLocaleDateString()}</td>
                 </tr>
                 <tr>
                   <td className="text-muted">Place of Supply</td>
                   <td className="fw-bold text-end">{invoice.state ? invoice.state.split('-')[1] || invoice.state : 'Gujarat'}</td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>

        {/* Line Items Table */}
        <table className="table table-bordered border-light" style={{fontSize: '12px'}}>
          <thead>
            <tr className="table-header" style={{backgroundColor: '#718d52', color: 'white'}}>
              <th className="py-2" style={{width: '5%'}}>S.No</th>
              <th className="py-2">Product Description</th>
              <th className="py-2 text-center" style={{width: '8%'}}>SAC</th>
              <th className="py-2 text-center" style={{width: '8%'}}>Qty</th>
              <th className="py-2 text-end" style={{width: '12%'}}>Rate</th>
              <th className="py-2 text-end" style={{width: '12%'}}>Amount</th>
              <th className="py-2 text-end" style={{width: '10%'}}>Disc.</th>
              <th className="py-2 text-end" style={{width: '15%'}}>Taxable Amt</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, index) => {
               const qty = parseFloat(item.qty) || 0;
               const rate = parseFloat(item.rate) || 0;
               const disc = parseFloat(item.discount) || 0;
               const amount = qty * rate;
               const taxable = amount - disc;
               
               return (
                 <tr key={index} className="border-bottom">
                   <td className="text-center">{index + 1}</td>
                   <td>{item.description}</td>
                   <td className="text-center">{item.sac}</td>
                   <td className="text-center">{qty}</td>
                   <td className="text-end">{formatCurrency(rate)}</td>
                   <td className="text-end">{formatCurrency(amount)}</td>
                   <td className="text-end">{formatCurrency(disc)}</td>
                   <td className="text-end">{formatCurrency(taxable)}</td>
                 </tr>
               )
            })}
            <tr className="fw-bold bg-light-gray" style={{backgroundColor: '#f8f9fa'}}>
               <td colSpan="3">Total</td>
               <td className="text-center">{lineItems.reduce((a,c) => a + (parseFloat(c.qty)||0), 0)}</td>
               <td colSpan="3"></td>
               <td className="text-end">{formatCurrency(totalBase)}</td>
            </tr>
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="row justify-content-end mt-4">
          <div className="col-5">
            <table className="table table-sm table-borderless" style={{fontSize: '12px'}}>
              <tbody>
                <tr className="border-bottom border-light">
                  <td className="text-muted">Total Before Tax</td>
                  <td className="text-end fw-bold">{formatCurrency(totalBase)}</td>
                </tr>
                {isCgst ? (
                  <>
                    <tr>
                      <td className="text-muted">Add: CGST @ {invoice.cgst_percent}%</td>
                      <td className="text-end">{formatCurrency(cgstAmt)}</td>
                    </tr>
                    <tr className="border-bottom border-light">
                      <td className="text-muted">Add: SGST @ {invoice.sgst_percent}%</td>
                      <td className="text-end">{formatCurrency(sgstAmt)}</td>
                    </tr>
                  </>
                ) : (
                  <tr className="border-bottom border-light">
                    <td className="text-muted">Add: IGST @ {invoice.igst_percent}%</td>
                    <td className="text-end">{formatCurrency(igstAmt)}</td>
                  </tr>
                )}
                <tr>
                  <td className="fw-bold text-dark">Total Tax Amount</td>
                  <td className="text-end fw-bold text-dark">{formatCurrency(taxAmount)}</td>
                </tr>
                <tr className="border-bottom border-light">
                  <td className="text-muted">Round Off</td>
                  <td className="text-end">{roundOff >= 0 ? '+' : ''}{formatCurrency(roundOff)}</td>
                </tr>
                <tr className="total-footer" style={{backgroundColor: '#718d52', color: 'white'}}>
                  <td className="fw-bold py-2 ps-2">Total After Tax</td>
                  <td className="text-end fw-bold py-2 pe-2">{formatCurrency(totalDue)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Amount in Words */}
        <div className="bg-light-gray p-2 px-3 rounded-1 mt-3 mb-4 d-flex align-items-center" style={{backgroundColor: '#f1f3f5', fontSize: '13px'}}>
           <span className="text-muted me-2">Amount In Words:</span>
           <span className="fw-bold" style={{color: '#1a1a1a'}}>{amountInWords}</span>
        </div>

        {/* Bank Details Removed */}

        {/* Footer / Terms */}
        <div className="row mt-5" style={{fontSize: '11px', color: '#555'}}>
           <div className="col-8">
              <h6 className="text-muted small fw-bold text-uppercase mb-2" style={{letterSpacing: '1px', fontSize: '10px'}}>Terms & Conditions</h6>
              <div style={{whiteSpace: 'pre-line'}}>
                 {invoice.notes || '1. Payment is due within 3 days of the invoice date.\n2. Late payments may incur additional charges.\n3. All disputes are subject to Gujarat Jurisdiction.'}
              </div>
              <div className="mt-4 fw-bold">Development First 70% Advance I Mentioned</div>
           </div>
           <div className="col-4 text-end d-flex flex-column justify-content-end align-items-end">
           </div>
        </div>

      </div>
    </Modal>
  );
};

export default InvoicePreviewModal;
