import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import InvoiceStatCard from '../components/common/InvoiceStatCard';
import CustomDataTable from '../components/common/CustomDataTable';
import Footer from '../components/common/Footer';
import InvoiceModal from '../components/finance/InvoiceModal';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomSelect from '../components/common/CustomSelect';

const Invoices = () => {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  
  // For CustomDataTable, we don't need manual pagination states, but we keep the Search Query
  const [searchQuery_invoices, setSearchQuery_invoices] = useState('');

  const [dateRange, setDateRange] = useState([null, null]);
  const [amountFilter, setAmountFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');

  const amountOptions = [
    { value: '', label: '$0.00 - $0.00' },
    { value: '2500', label: '$2500' },
    { value: '2800', label: '$2800' },
    { value: '3000', label: '$3000' },
  ];

  const statusOptions = [
    { value: '', label: 'Select Status' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Sent', label: 'Sent' },
    { value: 'Partially Paid', label: 'Partially Paid' },
  ];

  const sortOptions = [
    { value: '', label: 'Sort By : Last 7 Days' },
    { value: 'Recently Added', label: 'Recently Added' },
    { value: 'Ascending', label: 'Ascending' },
    { value: 'Descending', label: 'Descending' },
    { value: 'Last Month', label: 'Last Month' },
    { value: 'Last 7 Days', label: 'Last 7 Days' },
  ];

  // Helper: open invoice preview in new tab (fast, non-React, pure HTML)
  const openInvoicePreview = (row) => {
    const invoiceId = row.invoice_number || row.invoiceId;
    const lineItems = row.line_items || [
      { description: 'Website Design & Development', sac: '998314', qty: 1, rate: 50000, amount: 50000, discount: 0 }
    ];
    const taxType = row.tax_type || 'CGST + SGST';
    const isCgst = taxType === 'CGST + SGST';
    const totalBase = parseFloat(row.total_amount) || 50000;
    const taxAmount = parseFloat(row.total_tax_amount) || 9000;
    const totalDue = parseFloat(row.total_due) || 59000;
    const roundOff = parseFloat(row.calculated_round_off) || 0;
    const cgstAmt = isCgst ? taxAmount / 2 : 0;
    const sgstAmt = isCgst ? taxAmount / 2 : 0;
    const igstAmt = isCgst ? 0 : taxAmount;
    const fc = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(v);

    const lineItemsHtml = lineItems.map((item, i) => {
      const qty = parseFloat(item.qty) || 0;
      const rate = parseFloat(item.rate) || 0;
      const disc = parseFloat(item.discount) || 0;
      const amount = qty * rate;
      const taxable = amount - disc;
      return `<tr><td style="text-align:center;padding:8px 10px;border-bottom:1px solid #f0f0f0">${i+1}</td><td style="padding:8px 10px;border-bottom:1px solid #f0f0f0">${item.description}</td><td style="text-align:center;padding:8px 10px;border-bottom:1px solid #f0f0f0">${item.sac}</td><td style="text-align:center;padding:8px 10px;border-bottom:1px solid #f0f0f0">${qty}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(rate)}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(amount)}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(disc)}</td><td style="text-align:right;padding:8px 10px;border-bottom:1px solid #f0f0f0">${fc(taxable)}</td></tr>`;
    }).join('');

    const taxRows = isCgst
      ? `<tr><td style="color:#6c757d;padding:5px 8px">Add: CGST @ ${row.cgst_percent || 9}%</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(cgstAmt)}</td></tr><tr style="border-top:1px solid #e9ecef"><td style="color:#6c757d;padding:5px 8px">Add: SGST @ ${row.sgst_percent || 9}%</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(sgstAmt)}</td></tr>`
      : `<tr style="border-top:1px solid #e9ecef"><td style="color:#6c757d;padding:5px 8px">Add: IGST @ ${row.igst_percent || 18}%</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(igstAmt)}</td></tr>`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${invoiceId}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f6fa; }
          .action-bar { position: sticky; top: 0; z-index: 999; background: #fff; border-bottom: 1px solid #e9ecef; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
          .btn-download { background: #718d52; color: #fff; border: none; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
          .btn-download:hover { background: #5e7a44; }
          .invoice-page { padding: 24px; min-height: 100vh; }
          .invoice-box { background: #fff; max-width: 900px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.10); overflow: hidden; }
          .inv-header-bar { background: #718d52; height: 5px; }
          .inv-body { padding: 36px 40px; color: #1a1a1a; }
        </style>
      </head>
      <body>
        <div class="action-bar">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="color:#718d52;font-weight:900;font-size:1.8rem;letter-spacing:-2px;line-height:1">HK</span>
            <div><h5 style="font-size:15px;font-weight:700;color:#1a1a1a;margin:0">Invoice ${invoiceId}</h5><p style="font-size:12px;color:#6c757d;margin:0">Harikrushn DigiVerse LLP</p></div>
          </div>
          <button class="btn-download" id="download-btn">⬇ Download PDF</button>
        </div>
        <div class="invoice-page">
          <div class="invoice-box" id="invoice-pdf">
            <div class="inv-header-bar"></div>
            <div class="inv-body">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px">
                <div style="display:flex;align-items:flex-start;gap:20px">
                  <span style="color:#718d52;font-weight:900;font-size:3.5rem;letter-spacing:-4px;line-height:1">HK</span>
                  <div>
                    <h4 style="font-size:16px;font-weight:700;margin:0 0 4px">Harikrushn DigiVerse LLP</h4>
                    <p style="font-size:11px;line-height:1.6;color:#555;margin:0">FLAT-204, 2nd FLOOR, RS NO-67/1, WING-A, HARIKRUSHANA COMPLEX, OPP.<br/>BHAGAT NAGAR, VED, GURUKULROAD, KATARGAM, SURAT- 395004,<br/>GUJARAT, INDIA.<br/>Ph: +91 87805 64463 | sales@hkdigiverse.com<br/>GSTIN: 24APQPN3916P1Z4 | PAN: AAXFN3372M | LLPIN: ACK-1143 | State: 24</p>
                  </div>
                </div>
                <div style="background:#264653;color:#fff;padding:6px 14px;font-size:11px;font-weight:600;letter-spacing:1px;border-radius:3px;white-space:nowrap">${(row.invoice_type||'TAX INVOICE').toUpperCase()}</div>
              </div>
              <hr style="border:none;border-top:2px solid #e0e0e0;margin:16px 0 24px"/>
              <div style="display:flex;gap:40px;margin-bottom:28px">
                <div style="flex:1">
                  <div style="font-size:10px;font-weight:700;color:#6c757d;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Bill To</div>
                  <h5 style="font-size:15px;font-weight:700;margin:0 0 4px">${row.client_name||'Client Name'}</h5>
                  <p style="font-size:12px;color:#555;line-height:1.6;margin:0">${row.client_address||'Client Address'}<br/>Ph: ${row.client_phone||'N/A'}<br/>GSTIN: ${row.client_gstin||'N/A'}</p>
                </div>
                <table style="font-size:12px;border-collapse:collapse">
                  <tr><td style="color:#6c757d;padding:3px 0 3px 20px">Invoice No.</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 20px">${invoiceId}</td></tr>
                  <tr><td style="color:#6c757d;padding:3px 0 3px 20px">Date</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 20px">${row.issue_date ? new Date(row.issue_date).toLocaleDateString() : 'N/A'}</td></tr>
                  <tr><td style="color:#6c757d;padding:3px 0 3px 20px">Place of Supply</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 20px">${row.state ? row.state.split('-')[1]||row.state : 'Gujarat'}</td></tr>
                </table>
              </div>
              <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:24px">
                <thead><tr style="background:#718d52;color:#fff">
                  <th style="padding:10px;font-weight:600;text-align:center;width:5%">S.No</th>
                  <th style="padding:10px;font-weight:600;text-align:left">Product Description</th>
                  <th style="padding:10px;font-weight:600;text-align:center;width:8%">SAC</th>
                  <th style="padding:10px;font-weight:600;text-align:center;width:8%">Qty</th>
                  <th style="padding:10px;font-weight:600;text-align:right;width:12%">Rate</th>
                  <th style="padding:10px;font-weight:600;text-align:right;width:12%">Amount</th>
                  <th style="padding:10px;font-weight:600;text-align:right;width:10%">Disc.</th>
                  <th style="padding:10px;font-weight:600;text-align:right;width:15%">Taxable Amt</th>
                </tr></thead>
                <tbody>
                  ${lineItemsHtml}
                  <tr style="background:#f8f9fa;font-weight:700">
                    <td style="padding:10px" colspan="3">Total</td>
                    <td style="padding:10px;text-align:center">${lineItems.reduce((a,c)=>a+(parseFloat(c.qty)||0),0)}</td>
                    <td colspan="3"></td>
                    <td style="padding:10px;text-align:right">${fc(totalBase)}</td>
                  </tr>
                </tbody>
              </table>
              <div style="display:flex;justify-content:flex-end;margin-bottom:20px">
                <table style="width:320px;font-size:12px;border-collapse:collapse">
                  <tr><td style="color:#6c757d;padding:5px 8px">Total Before Tax</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(totalBase)}</td></tr>
                  ${taxRows}
                  <tr><td style="color:#6c757d;padding:5px 8px;font-weight:700;color:#1a1a1a">Total Tax Amount</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${fc(taxAmount)}</td></tr>
                  <tr style="border-top:1px solid #e9ecef"><td style="color:#6c757d;padding:5px 8px">Round Off</td><td style="text-align:right;font-weight:600;color:#1a1a1a;padding:5px 8px">${roundOff>=0?'+':''}${fc(roundOff)}</td></tr>
                  <tr><td style="background:#718d52;color:#fff;font-weight:700;padding:9px 10px">Total After Tax</td><td style="background:#718d52;color:#fff;font-weight:700;text-align:right;padding:9px 10px">${fc(totalDue)}</td></tr>
                </table>
              </div>
              <div style="background:#f8f9fa;border-left:3px solid #718d52;padding:10px 14px;border-radius:0 4px 4px 0;font-size:13px;margin-bottom:28px">
                <span style="color:#6c757d;margin-right:6px">Amount In Words:</span>
                <span style="font-weight:700;color:#1a1a1a">${totalDue} Rupees Only</span>
              </div>
              <div>
                <div style="font-size:10px;font-weight:700;color:#6c757d;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Terms &amp; Conditions</div>
                <p style="font-size:11px;color:#555;line-height:1.8;white-space:pre-line;margin:0">${(row.notes||'1. Payment is due within 3 days of the invoice date.\n2. Late payments may incur additional charges.\n3. All disputes are subject to Gujarat Jurisdiction.').replace(/\n/g,'<br/>')}</p>
                <div style="font-size:12px;font-weight:700;color:#1a1a1a;margin-top:12px">Development First 70% Advance I Mentioned</div>
              </div>
            </div>
          </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
        <script>
          document.getElementById('download-btn').addEventListener('click', function() {
            var element = document.getElementById('invoice-pdf');
            html2pdf().set({
              margin: [8, 8, 8, 8],
              filename: 'Invoice-${invoiceId}.pdf',
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2, useCORS: true, logging: false },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }).from(element).save();
          });
        </script>
      </body>
      </html>
    `;

    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(htmlContent);
    previewWindow.document.close();
  };

  // Helper: direct PDF download without any preview or print dialog
  const downloadInvoicePDF = (row) => {
    const invoiceId = row.invoice_number || row.invoiceId;
    const lineItems = row.line_items || [
      { description: 'Website Design & Development', sac: '998314', qty: 1, rate: 50000, amount: 50000, discount: 0 }
    ];
    const taxType = row.tax_type || 'CGST + SGST';
    const isCgst = taxType === 'CGST + SGST';
    const totalBase = parseFloat(row.total_amount) || 50000;
    const taxAmount = parseFloat(row.total_tax_amount) || 9000;
    const totalDue = parseFloat(row.total_due) || 59000;
    const roundOff = parseFloat(row.calculated_round_off) || 0;
    const cgstAmt = isCgst ? taxAmount / 2 : 0;
    const sgstAmt = isCgst ? taxAmount / 2 : 0;
    const igstAmt = isCgst ? 0 : taxAmount;
    const fc = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(v);

    const lineItemsHtml = lineItems.map((item, i) => {
      const qty = parseFloat(item.qty) || 0;
      const rate = parseFloat(item.rate) || 0;
      const disc = parseFloat(item.discount) || 0;
      const amount = qty * rate;
      const taxable = amount - disc;
      return `<tr><td style="text-align:center;padding:6px 8px;border-bottom:1px solid #eee">${i+1}</td><td style="padding:6px 8px;border-bottom:1px solid #eee">${item.description}</td><td style="text-align:center;padding:6px 8px;border-bottom:1px solid #eee">${item.sac}</td><td style="text-align:center;padding:6px 8px;border-bottom:1px solid #eee">${qty}</td><td style="text-align:right;padding:6px 8px;border-bottom:1px solid #eee">${fc(rate)}</td><td style="text-align:right;padding:6px 8px;border-bottom:1px solid #eee">${fc(amount)}</td><td style="text-align:right;padding:6px 8px;border-bottom:1px solid #eee">${fc(disc)}</td><td style="text-align:right;padding:6px 8px;border-bottom:1px solid #eee">${fc(taxable)}</td></tr>`;
    }).join('');

    const taxRows = isCgst
      ? `<tr><td style="color:#6c757d;padding:4px 8px">Add: CGST @ ${row.cgst_percent || 9}%</td><td style="text-align:right;padding:4px 8px">${fc(cgstAmt)}</td></tr><tr><td style="color:#6c757d;padding:4px 8px">Add: SGST @ ${row.sgst_percent || 9}%</td><td style="text-align:right;padding:4px 8px">${fc(sgstAmt)}</td></tr>`
      : `<tr><td style="color:#6c757d;padding:4px 8px">Add: IGST @ ${row.igst_percent || 18}%</td><td style="text-align:right;padding:4px 8px">${fc(igstAmt)}</td></tr>`;

    const htmlContent = `
      <div id="invoice-pdf" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;padding:24px;max-width:800px;margin:0 auto">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px">
          <div style="display:flex;align-items:flex-start;gap:16px">
            <span style="color:#718d52;font-weight:900;font-size:42px;letter-spacing:-4px;line-height:1">HK</span>
            <div>
              <h4 style="font-weight:700;font-size:16px;margin:0 0 4px">Harikrushn DigiVerse LLP</h4>
              <p style="font-size:10px;line-height:1.6;color:#555;margin:0">FLAT-204, 2nd FLOOR, RS NO-67/1, WING-A, HARIKRUSHANA COMPLEX, OPP. BHAGAT NAGAR, VED, GURUKULROAD, KATARGAM, SURAT- 395004, GUJARAT, INDIA.<br/>Ph: +91 87805 64463 | sales@hkdigiverse.com<br/>GSTIN: 24APQPN3916P1Z4 | PAN: AAXFN3372M | LLPIN: ACK-1143 | State: 24</p>
            </div>
          </div>
          <span style="background:#264653;color:#fff;padding:6px 14px;font-size:10px;font-weight:600;letter-spacing:1px;border-radius:3px">${(row.invoice_type||'TAX INVOICE').toUpperCase()}</span>
        </div>
        <hr style="border:none;border-top:2px solid #e0e0e0;margin:12px 0 20px"/>
        <div style="display:flex;gap:40px;margin-bottom:24px">
          <div style="flex:1">
            <p style="font-size:10px;font-weight:700;color:#6c757d;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px">Bill To</p>
            <h5 style="font-size:14px;font-weight:700;margin:0 0 4px">${row.client_name||'Client Name'}</h5>
            <p style="font-size:11px;color:#555;margin:0;line-height:1.6">${row.client_address||'Client Address'}<br/>Ph: ${row.client_phone||'N/A'}<br/>GSTIN: ${row.client_gstin||'N/A'}</p>
          </div>
          <table style="font-size:11px;border-collapse:collapse">
            <tr><td style="color:#6c757d;padding:3px 0 3px 16px">Invoice No.</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 16px">${invoiceId}</td></tr>
            <tr><td style="color:#6c757d;padding:3px 0 3px 16px">Date</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 16px">${row.issue_date ? new Date(row.issue_date).toLocaleDateString() : 'N/A'}</td></tr>
            <tr><td style="color:#6c757d;padding:3px 0 3px 16px">Place of Supply</td><td style="font-weight:700;text-align:right;padding:3px 0 3px 16px">${row.state ? row.state.split('-')[1]||row.state : 'Gujarat'}</td></tr>
          </table>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:11px;margin-bottom:20px">
          <thead><tr style="background:#718d52;color:#fff">
            <th style="padding:8px;text-align:center;width:5%">S.No</th>
            <th style="padding:8px">Product Description</th>
            <th style="padding:8px;text-align:center;width:8%">SAC</th>
            <th style="padding:8px;text-align:center;width:8%">Qty</th>
            <th style="padding:8px;text-align:right;width:12%">Rate</th>
            <th style="padding:8px;text-align:right;width:12%">Amount</th>
            <th style="padding:8px;text-align:right;width:10%">Disc.</th>
            <th style="padding:8px;text-align:right;width:15%">Taxable Amt</th>
          </tr></thead>
          <tbody>
            ${lineItemsHtml}
            <tr style="background:#f8f9fa;font-weight:700">
              <td style="padding:8px" colspan="3">Total</td>
              <td style="padding:8px;text-align:center">${lineItems.reduce((a,c)=>a+(parseFloat(c.qty)||0),0)}</td>
              <td colspan="3"></td>
              <td style="padding:8px;text-align:right">${fc(totalBase)}</td>
            </tr>
          </tbody>
        </table>
        <div style="display:flex;justify-content:flex-end;margin-bottom:16px">
          <table style="width:300px;font-size:11px;border-collapse:collapse">
            <tr style="border-top:1px solid #e9ecef"><td style="color:#6c757d;padding:4px 8px">Total Before Tax</td><td style="text-align:right;font-weight:600;padding:4px 8px">${fc(totalBase)}</td></tr>
            ${taxRows}
            <tr><td style="font-weight:700;padding:4px 8px">Total Tax Amount</td><td style="text-align:right;font-weight:700;padding:4px 8px">${fc(taxAmount)}</td></tr>
            <tr style="border-top:1px solid #e9ecef"><td style="color:#6c757d;padding:4px 8px">Round Off</td><td style="text-align:right;padding:4px 8px">${roundOff>=0?'+':''}${fc(roundOff)}</td></tr>
            <tr><td style="background:#718d52;color:#fff;font-weight:700;padding:8px">Total After Tax</td><td style="background:#718d52;color:#fff;font-weight:700;text-align:right;padding:8px">${fc(totalDue)}</td></tr>
          </table>
        </div>
        <div style="background:#f8f9fa;border-left:3px solid #718d52;padding:8px 12px;font-size:12px;margin-bottom:20px">
          <span style="color:#6c757d;margin-right:6px">Amount In Words:</span>
          <strong>${totalDue} Rupees Only</strong>
        </div>
        <div style="font-size:10px;color:#555">
          <p style="font-size:10px;font-weight:700;color:#6c757d;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Terms &amp; Conditions</p>
          <p>${(row.notes||'1. Payment is due within 3 days of the invoice date.\n2. Late payments may incur additional charges.\n3. All disputes are subject to Gujarat Jurisdiction.').replace(/\n/g,'<br/>')}</p>
          <p style="margin-top:12px;font-weight:700;color:#1a1a1a">Development First 70% Advance I Mentioned</p>
        </div>
      </div>
    `;

    // Create a hidden container, render HTML, use html2pdf to download
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:800px;background:#fff';
    container.innerHTML = htmlContent;
    document.body.appendChild(container);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => {
      const element = container.querySelector('#invoice-pdf');
      window.html2pdf().set({
        margin: [8, 8, 8, 8],
        filename: `Invoice-${invoiceId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(element).save().then(() => {
        document.body.removeChild(container);
        document.head.removeChild(script);
      });
    };
    document.head.appendChild(script);
  };


  const columns = [

    {
      name: 'Invoice',
      selector: row => row.invoiceId,
      cell: row => <Link to="#" onClick={(e) => { e.preventDefault(); openInvoicePreview(row); }} className="tb-data text-primary fw-medium">{row.invoiceId}</Link>,
      sortable: true,
    },
    {
      name: 'Name',
      cell: row => (
        <div className="d-flex align-items-center">
          <Link to="/invoice" className="avatar avatar-md me-2">
            <img src={row.avatar} className="rounded-circle" alt="user" />
          </Link>
          <div>
            <h6 className="fw-medium mb-0"><Link to="/invoice">{row.name}</Link></h6>
            <span className="fs-12 text-muted">{row.email}</span>
          </div>
        </div>
      ),
      sortable: true,
    },
    { name: 'Created On', selector: row => row.createdOn, sortable: true },
    { name: 'Total', selector: row => row.total, sortable: true },
    { name: 'Amount Due', selector: row => row.amountDue, sortable: true },
    { name: 'Due Date', selector: row => row.dueDate, sortable: true },
    {
      name: 'Status',
      cell: row => {
        let badgeClass = 'badge-soft-success';
        if (row.status === 'Overdue') badgeClass = 'badge-soft-danger';
        if (row.status === 'Pending') badgeClass = 'badge-soft-purple';
        if (row.status === 'Draft') badgeClass = 'badge-soft-warning';
        return (
          <span className={`badge ${badgeClass} d-inline-flex align-items-center`}>
            <i className="ti ti-point-filled me-1"></i>{row.status}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => (
        <div className="action-icon d-inline-flex">
          <Link 
            to="#" 
            onClick={(e) => { 
              e.preventDefault(); 
              if (row.status !== 'Paid') handleMarkAsPaid(row.invoiceId); 
            }} 
            className={`me-2 ${row.status === 'Paid' ? 'invisible' : 'text-success'}`} 
            style={{ visibility: row.status === 'Paid' ? 'hidden' : 'visible' }}
            title={row.status !== 'Paid' ? "Mark as Paid" : ""}
          >
            <i className="ti ti-check" style={{fontSize: '18px'}}></i>
          </Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); downloadInvoicePDF(row); }} className="me-2 text-muted" title="Download PDF"><i className="ti ti-download"></i></Link>
          <Link to="/edit-invoices" className="me-2 text-muted"><i className="ti ti-edit"></i></Link>
          <Link to="#" className="text-muted"><i className="ti ti-trash"></i></Link>
        </div>
      ),
    }
  ];

  const [invoices, setInvoices] = useState([
    { invoiceId: 'INV-1454', avatar: '/assets/img/users/user-32.jpg', name: 'Anthony Lewis', email: 'anthony@example.com', createdOn: '14 Jan 2024, 04:27 AM', total: '$300', amountDue: '$0', dueDate: '14 Jan 2024, 04:27 AM', status: 'Paid' },
    { invoiceId: 'INV-6571', avatar: '/assets/img/users/user-09.jpg', name: 'Brian Villalobos', email: 'brian@example.com', createdOn: '21 Jan 2024, 03:19 AM', total: '$547', amountDue: '$200', dueDate: '21 Jan 2024, 03:19 AM', status: 'Overdue' },
    { invoiceId: 'INV-2245', avatar: '/assets/img/users/user-01.jpg', name: 'Harvey Smith', email: 'harvey@example.com', createdOn: '20 Feb 2024, 12:15 PM', total: '$325', amountDue: '$65', dueDate: '20 Feb 2024, 12:15 PM', status: 'Pending' },
    { invoiceId: 'INV-1456', avatar: '/assets/img/users/user-33.jpg', name: 'Stephan Peralt', email: 'peral@example.com', createdOn: '15 Mar 2024, 12:11 AM', total: '$471', amountDue: '$145', dueDate: '15 Mar 2024, 12:11 AM', status: 'Pending' },
    { invoiceId: 'INV-0045', avatar: '/assets/img/users/user-34.jpg', name: 'Doglas Martini', email: 'martniwr@example.com', createdOn: '12 Apr 2024, 05:48 PM', total: '$147', amountDue: '$32', dueDate: '12 Apr 2024, 05:48 PM', status: 'Overdue' },
    { invoiceId: 'INV-6244', avatar: '/assets/img/users/user-02.jpg', name: 'Linda Ray', email: 'ray456@example.com', createdOn: '20 Apr 2024, 06:11 PM', total: '$654', amountDue: '$140', dueDate: '20 Apr 2024, 06:11 PM', status: 'Draft' },
  ]);

  const handleMarkAsPaid = (invoiceId) => {
    setInvoices(prev => prev.map(inv => 
      inv.invoiceId === invoiceId ? { ...inv, status: 'Paid', amountDue: '$0' } : inv
    ));
  };
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Invoice Management"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Finance & Billing' },
						{ label: 'Invoices', active: true }
					]}
				>
					
						<div className="mb-2">
							<button onClick={() => setIsInvoiceModalOpen(true)} className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Invoice</button>
						</div>
						
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Invoice Data */}
				<div className="row">
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						title="Total Invoice" 
						value="600" 
						trendValue="+19.01%" 
						trendColor="success" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						badgeColor="warning"
						title="Partially Paid" 
						value="80" 
						trendValue="+19.01%" 
						trendColor="success" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						badgeColor="success"
						title="Paid Invoices" 
						value="450" 
						trendValue="+19.01%" 
						trendColor="success" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						badgeColor="purple"
						title="Overdue Invoices" 
						value="40" 
						trendValue="+19.01%" 
						trendColor="success" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						badgeColor="danger"
						title="Unpaid Invoices" 
						value="150" 
						trendValue="+19.01%" 
						trendColor="success" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
					<InvoiceStatCard 
						colClass="col-xl-4 col-md-6 d-flex"
						badgeColor="skyblue"
						title="Revenue" 
						value="$25,340" 
						trendValue="+19.01%" 
						trendColor="success" 
						icon="ti-file-invoice" 
						iconColor="primary" 
					/>
				</div>
				{/* /Invoice Data */}

				{/* Invoice DataTable */}
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
							<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
								<h5>Invoice List</h5>
								<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
									<div className="me-0">
										<div className="input-icon position-relative" style={{ width: '250px' }}>
											<span className="input-icon-addon">
												<i className="ti ti-calendar text-gray-9"></i>
											</span>
											<CustomDatePicker 
												isRange={true}
												selected={dateRange[0]}
												startDate={dateRange[0]}
												endDate={dateRange[1]}
												onChange={(update) => setDateRange(update)}
												className="form-control date-range bookingrange ps-5"
												placeholderText=""
											/>
										</div>
									</div>
									
									<div className="" style={{ minWidth: '150px' }}>
										<CustomSelect 
											options={statusOptions} 
											value={statusOptions.find(opt => opt.value === statusFilter) || statusOptions[0]} 
											onChange={(selected) => setStatusFilter(selected ? selected.value : '')}
										/>
									</div>
								
								</div>
							</div>
							<div className="card-body p-0">

								
								{/* Custom DataTable Component */}
								<div className="custom-datatable-filter table-responsive">
									<CustomDataTable 
										columns={columns} 
										data={invoices.filter(item => 
											item.invoiceId.toLowerCase().includes(searchQuery_invoices.toLowerCase()) || 
											item.name.toLowerCase().includes(searchQuery_invoices.toLowerCase())
										)} 
									/>
								</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Invoice DataTable */}
			</div>

			
      <InvoiceModal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} />
    </>
  );
};

export default Invoices;
