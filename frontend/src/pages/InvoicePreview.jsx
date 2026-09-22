import React, { useRef, useEffect, useState } from 'react';

// Number to words converter
function numberToWords(num) {
    if (num === 0) return 'Zero';
    const a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    const b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
    let numStr = Math.floor(num).toString();
    if (numStr.length > 9) return 'overflow';
    const n = ('000000000' + numStr).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return '';
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str.trim() + ' Rupees Only';
}

const fmt = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

const InvoicePreview = () => {
  const printRef = useRef();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('invoicePreviewData');
    if (stored) {
      try { setInvoice(JSON.parse(stored)); } catch(e) { console.error(e); }
    }
    // Set page title
    document.title = 'Invoice Preview';
  }, []);

  const handleDownloadPDF = () => {
    const element = printRef.current;
    const invoiceId = invoice?.invoice_number || invoice?.invoiceId || 'invoice';

    // Dynamically load html2pdf from CDN if not already loaded
    const doDownload = () => {
      window.html2pdf().set({
        margin: [8, 8, 8, 8],
        filename: `Invoice-${invoiceId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(element).save();
    };

    if (window.html2pdf) {
      doDownload();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = doDownload;
      document.head.appendChild(script);
    }
  };

  if (!invoice) {
    return (
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', backgroundColor:'#f5f6fa', fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ width:40, height:40, border:'3px solid #718d52', borderTopColor:'transparent', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 12px' }}></div>
          <p style={{ color:'#6c757d', margin:0 }}>Loading invoice...</p>
        </div>
      </div>
    );
  }

  const lineItems = invoice.line_items || [
    { description: 'Website Design & Development', sac: '998314', qty: 1, rate: 50000, discount: 0 }
  ];
  const taxType = invoice.tax_type || 'CGST + SGST';
  const isCgst = taxType === 'CGST + SGST';
  const totalBase = parseFloat(invoice.total_amount) || 50000;
  const taxAmount = parseFloat(invoice.total_tax_amount) || 9000;
  const totalDue = parseFloat(invoice.total_due) || 59000;
  const roundOff = parseFloat(invoice.calculated_round_off) || 0;
  const cgstAmt = isCgst ? taxAmount / 2 : 0;
  const sgstAmt = isCgst ? taxAmount / 2 : 0;
  const igstAmt = isCgst ? 0 : taxAmount;
  const invoiceId = invoice.invoice_number || invoice.invoiceId;
  const amountInWords = numberToWords(totalDue);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f6fa; }

        /* Action bar - hidden when printing */
        .no-print { display: flex; }
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          .invoice-page { padding: 0 !important; background: #fff !important; }
          .invoice-box { box-shadow: none !important; border: none !important; max-width: 100% !important; }
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Invoice box styles */
        .invoice-box {
          background: #fff;
          max-width: 900px;
          margin: 0 auto;
          border-radius: 8px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.10);
          overflow: hidden;
        }
        .inv-header-bar {
          background: #718d52;
          height: 5px;
        }
        .inv-body { padding: 36px 40px; }
        .inv-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; }
        .inv-logo { color: #718d52; font-weight: 900; font-size: 3.5rem; letter-spacing: -4px; line-height: 1; }
        .inv-company h4 { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
        .inv-company p { font-size: 11px; line-height: 1.6; color: #555; }
        .inv-type-badge {
          background: #264653;
          color: #fff;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          border-radius: 3px;
          white-space: nowrap;
        }
        .inv-divider { border: none; border-top: 2px solid #e0e0e0; margin: 16px 0 24px; }
        .inv-meta { display: flex; gap: 40px; margin-bottom: 28px; }
        .inv-billto { flex: 1; }
        .inv-billto .label { font-size: 10px; font-weight: 700; color: #6c757d; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
        .inv-billto h5 { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
        .inv-billto p { font-size: 12px; color: #555; line-height: 1.6; margin: 0; }
        .inv-details-table { font-size: 12px; }
        .inv-details-table td { padding: 3px 0 3px 20px; }
        .inv-details-table td:first-child { color: #6c757d; }
        .inv-details-table td:last-child { font-weight: 700; text-align: right; color: #1a1a1a; }

        /* Line items table */
        .inv-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 24px; }
        .inv-table thead tr { background: #718d52; color: #fff; }
        .inv-table thead th { padding: 10px 10px; font-weight: 600; }
        .inv-table thead th:first-child { border-radius: 0; }
        .inv-table tbody td { padding: 8px 10px; border-bottom: 1px solid #f0f0f0; color: #1a1a1a; }
        .inv-table tbody tr:last-child td { border-bottom: none; }
        .inv-table .total-row { background: #f8f9fa; font-weight: 700; }
        .inv-table .total-row td { border-bottom: none; padding: 10px 10px; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }

        /* Totals */
        .inv-totals { display: flex; justify-content: flex-end; margin-bottom: 20px; }
        .inv-totals-table { width: 320px; font-size: 12px; border-collapse: collapse; }
        .inv-totals-table td { padding: 5px 8px; }
        .inv-totals-table tr.sep td { border-top: 1px solid #e9ecef; }
        .inv-totals-table .lbl { color: #6c757d; }
        .inv-totals-table .val { text-align: right; font-weight: 600; color: #1a1a1a; }
        .inv-totals-table .grand-row td { background: #718d52; color: #fff; font-weight: 700; padding: 9px 10px; }
        .inv-totals-table .grand-row .val { color: #fff; }

        /* Amount in words */
        .inv-words { background: #f8f9fa; border-left: 3px solid #718d52; padding: 10px 14px; border-radius: 0 4px 4px 0; font-size: 13px; margin-bottom: 28px; }
        .inv-words span:first-child { color: #6c757d; margin-right: 6px; }
        .inv-words span:last-child { font-weight: 700; color: #1a1a1a; }

        /* Terms */
        .inv-terms .label { font-size: 10px; font-weight: 700; color: #6c757d; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .inv-terms p { font-size: 11px; color: #555; line-height: 1.8; white-space: pre-line; }
        .inv-terms .advance { font-size: 12px; font-weight: 700; color: #1a1a1a; margin-top: 12px; }

        /* Action bar */
        .action-bar {
          position: sticky;
          top: 0;
          z-index: 999;
          background: #fff;
          border-bottom: 1px solid #e9ecef;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .action-bar-left { display: flex; align-items: center; gap: 12px; }
        .action-bar-logo { color: #718d52; font-weight: 900; font-size: 1.8rem; letter-spacing: -2px; line-height: 1; }
        .action-bar h5 { font-size: 15px; font-weight: 700; color: #1a1a1a; margin: 0; }
        .action-bar p { font-size: 12px; color: #6c757d; margin: 0; }
        .action-bar-btns { display: flex; gap: 8px; }
        .btn-download {
          background: #718d52;
          color: #fff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background 0.2s;
        }
        .btn-download:hover { background: #5e7a44; }
        .btn-close-tab {
          background: #f8f9fa;
          color: #6c757d;
          border: 1px solid #dee2e6;
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-close-tab:hover { background: #e9ecef; }

        .invoice-page { padding: 24px; background: #f5f6fa; min-height: 100vh; }
      `}</style>

      {/* Top Action Bar - hidden on print */}
      <div className="action-bar no-print">
        <div className="action-bar-left">
          <span className="action-bar-logo">HK</span>
          <div>
            <h5>Invoice {invoiceId}</h5>
            <p>Harikrushn DigiVerse LLP</p>
          </div>
        </div>
        <div className="action-bar-btns">
          <button className="btn-download" onClick={handleDownloadPDF}>
            ⬇ Download PDF
          </button>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="invoice-page">
        <div className="invoice-box" ref={printRef}>
          <div className="inv-header-bar"></div>
          <div className="inv-body">

            {/* Company Header */}
            <div className="inv-top">
              <div style={{ display:'flex', alignItems:'flex-start', gap:'20px' }}>
                <span className="inv-logo">HK</span>
                <div className="inv-company">
                  <h4>Harikrushn DigiVerse LLP</h4>
                  <p>
                    FLAT-204, 2nd FLOOR, RS NO-67/1, WING-A, HARIKRUSHANA COMPLEX, OPP.<br/>
                    BHAGAT NAGAR, VED, GURUKULROAD, KATARGAM, SURAT- 395004,<br/>
                    GUJARAT, INDIA.<br/>
                    Ph: +91 87805 64463 | sales@hkdigiverse.com<br/>
                    GSTIN: 24APQPN3916P1Z4 | PAN: AAXFN3372M | LLPIN: ACK-1143 | State: 24
                  </p>
                </div>
              </div>
              <div className="inv-type-badge">{(invoice.invoice_type || 'TAX INVOICE').toUpperCase()}</div>
            </div>

            <hr className="inv-divider" />

            {/* Bill To + Invoice Meta */}
            <div className="inv-meta">
              <div className="inv-billto">
                <div className="label">Bill To</div>
                <h5>{invoice.client_name || 'Client Name'}</h5>
                <p>{invoice.client_address || 'Client Address'}</p>
                <p>Ph: {invoice.client_phone || 'N/A'}</p>
                <p>GSTIN: {invoice.client_gstin || 'N/A'}</p>
              </div>
              <table className="inv-details-table">
                <tbody>
                  <tr><td>Invoice No.</td><td>{invoiceId}</td></tr>
                  <tr><td>Date</td><td>{invoice.issue_date ? new Date(invoice.issue_date).toLocaleDateString() : 'N/A'}</td></tr>
                  <tr><td>Place of Supply</td><td>{invoice.state ? invoice.state.split('-')[1] || invoice.state : 'Gujarat'}</td></tr>
                </tbody>
              </table>
            </div>

            {/* Line Items */}
            <table className="inv-table">
              <thead>
                <tr>
                  <th style={{width:'5%'}} className="text-center">S.No</th>
                  <th>Product Description</th>
                  <th style={{width:'8%'}} className="text-center">SAC</th>
                  <th style={{width:'8%'}} className="text-center">Qty</th>
                  <th style={{width:'12%'}} className="text-right">Rate</th>
                  <th style={{width:'12%'}} className="text-right">Amount</th>
                  <th style={{width:'10%'}} className="text-right">Disc.</th>
                  <th style={{width:'15%'}} className="text-right">Taxable Amt</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, idx) => {
                  const qty = parseFloat(item.qty) || 0;
                  const rate = parseFloat(item.rate) || 0;
                  const disc = parseFloat(item.discount) || 0;
                  const amount = qty * rate;
                  const taxable = amount - disc;
                  return (
                    <tr key={idx}>
                      <td className="text-center">{idx + 1}</td>
                      <td>{item.description}</td>
                      <td className="text-center">{item.sac}</td>
                      <td className="text-center">{qty}</td>
                      <td className="text-right">{fmt(rate)}</td>
                      <td className="text-right">{fmt(amount)}</td>
                      <td className="text-right">{fmt(disc)}</td>
                      <td className="text-right">{fmt(taxable)}</td>
                    </tr>
                  );
                })}
                <tr className="total-row">
                  <td colSpan="3"><strong>Total</strong></td>
                  <td className="text-center"><strong>{lineItems.reduce((a,c) => a + (parseFloat(c.qty)||0), 0)}</strong></td>
                  <td colSpan="3"></td>
                  <td className="text-right"><strong>{fmt(totalBase)}</strong></td>
                </tr>
              </tbody>
            </table>

            {/* Totals */}
            <div className="inv-totals">
              <table className="inv-totals-table">
                <tbody>
                  <tr className="sep">
                    <td className="lbl">Total Before Tax</td>
                    <td className="val">{fmt(totalBase)}</td>
                  </tr>
                  {isCgst ? (
                    <>
                      <tr><td className="lbl">Add: CGST @ {invoice.cgst_percent || 9}%</td><td className="val">{fmt(cgstAmt)}</td></tr>
                      <tr className="sep"><td className="lbl">Add: SGST @ {invoice.sgst_percent || 9}%</td><td className="val">{fmt(sgstAmt)}</td></tr>
                    </>
                  ) : (
                    <tr className="sep"><td className="lbl">Add: IGST @ {invoice.igst_percent || 18}%</td><td className="val">{fmt(igstAmt)}</td></tr>
                  )}
                  <tr><td className="lbl" style={{fontWeight:700,color:'#1a1a1a'}}>Total Tax Amount</td><td className="val">{fmt(taxAmount)}</td></tr>
                  <tr className="sep"><td className="lbl">Round Off</td><td className="val">{roundOff >= 0 ? '+' : ''}{fmt(roundOff)}</td></tr>
                  <tr className="grand-row">
                    <td>Total After Tax</td>
                    <td className="val">{fmt(totalDue)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Amount in Words */}
            <div className="inv-words">
              <span>Amount In Words:</span>
              <span>{amountInWords}</span>
            </div>

            {/* Terms */}
            <div className="inv-terms">
              <div className="label">Terms & Conditions</div>
              <p>{invoice.notes || '1. Payment is due within 3 days of the invoice date.\n2. Late payments may incur additional charges.\n3. All disputes are subject to Gujarat Jurisdiction.'}</p>
              <div className="advance">Development First 70% Advance I Mentioned</div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePreview;
