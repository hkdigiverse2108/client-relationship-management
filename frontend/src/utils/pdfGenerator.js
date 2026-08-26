import { jsPDF } from "jspdf";
import "jspdf-autotable";

export function numberToWords(num) {
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

const formatCurrency = (amount) => {
  return "Rs " + Number(amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const generateInvoicePDF = (invoice, clientsMap = {}) => {
  if (!invoice) return;

  const doc = new jsPDF();
  
  const primaryColor = [113, 141, 82]; // #718d52
  const darkColor = [26, 26, 26]; // #1a1a1a
  const grayColor = [85, 85, 85]; // #555

  // 1. Header (Left)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(...primaryColor);
  doc.text("HK", 14, 25);

  doc.setFontSize(12);
  doc.setTextColor(...darkColor);
  doc.text("Harikrushn DigiVerse LLP", 35, 20);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...grayColor);
  const addressLines = [
    "FLAT-204, 2nd FLOOR, RS NO-67/1, WING-A, HARIKRUSHANA COMPLEX, OPP.",
    "BHAGAT NAGAR, VED, GURUKULROAD, KATARGAM, SURAT- 395004,",
    "GUJARAT, INDIA.",
    "Ph: +91 87805 64463 | sales@hkdigiverse.com",
    "GSTIN: 24APQPN3916P1Z4 | PAN: AAXFN3372M | LLPIN: ACK-1143 | State: 24"
  ];
  doc.text(addressLines, 35, 25);

  // 1. Header (Right - Badge)
  const invoiceTypeStr = (invoice.invoice_type || 'TAX INVOICE').toUpperCase();
  doc.setFillColor(38, 70, 83); // #264653
  doc.rect(145, 16, 50, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(invoiceTypeStr, 170, 21, { align: 'center' });

  // Divider Line
  doc.setDrawColor(221, 221, 221); // #ddd
  doc.setLineWidth(0.5);
  doc.line(14, 45, 196, 45);

  // 2. Bill To & Meta Data
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("BILL TO", 14, 52);

  doc.setFontSize(10);
  doc.setTextColor(...darkColor);
  doc.text(invoice.client_name || 'Client Name', 14, 57);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...grayColor);
  doc.text(invoice.client_address || 'Client Address', 14, 62);
  doc.text(`Ph: ${invoice.client_phone || 'N/A'}`, 14, 67);
  doc.text(`GSTIN: ${invoice.client_gstin || 'N/A'}`, 14, 72);

  // Meta Data (Right Side)
  const placeOfSupply = invoice.state ? invoice.state.split('-')[1] || invoice.state : 'Gujarat';
  
  doc.setFontSize(9);
  doc.setTextColor(...grayColor);
  doc.text("Invoice No.", 130, 57);
  doc.text("Date", 130, 63);
  doc.text("Place of Supply", 130, 69);
  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkColor);
  doc.text(invoice.invoice_number || '', 196, 57, { align: 'right' });
  doc.text(new Date(invoice.issue_date).toLocaleDateString(), 196, 63, { align: 'right' });
  doc.text(placeOfSupply, 196, 69, { align: 'right' });

  // 3. Line Items Table
  const lineItems = invoice.line_items || [];
  const tableData = lineItems.map((item, index) => {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const disc = parseFloat(item.discount) || 0;
    const amount = qty * rate;
    const taxable = amount - disc;
    return [
      index + 1,
      item.description || '',
      item.sac || '',
      qty,
      formatCurrency(rate),
      formatCurrency(amount),
      formatCurrency(disc),
      formatCurrency(taxable)
    ];
  });

  const totalBase = parseFloat(invoice.total_amount) || 0;
  const totalQty = lineItems.reduce((a,c) => a + (parseFloat(c.qty)||0), 0);
  
  tableData.push([
    { content: 'Total', colSpan: 3, styles: { fontStyle: 'bold', halign: 'left' } },
    { content: totalQty.toString(), styles: { fontStyle: 'bold', halign: 'center' } },
    { content: '', colSpan: 3 },
    { content: formatCurrency(totalBase), styles: { fontStyle: 'bold', halign: 'right' } }
  ]);

  doc.autoTable({
    startY: 80,
    head: [['S.No', 'Product Description', 'SAC', 'Qty', 'Rate', 'Amount', 'Disc.', 'Taxable Amt']],
    body: tableData,
    theme: 'plain',
    headStyles: { fillColor: primaryColor, textColor: 255, fontSize: 8, cellPadding: 2 },
    styles: { fontSize: 8, cellPadding: 2, textColor: grayColor, lineWidth: { bottom: 0.2 }, lineColor: [230, 230, 230] },
    columnStyles: {
      0: { halign: 'center', cellWidth: 12 },
      2: { halign: 'center', cellWidth: 15 },
      3: { halign: 'center', cellWidth: 12 },
      4: { halign: 'right' },
      5: { halign: 'right' },
      6: { halign: 'right' },
      7: { halign: 'right' }
    }
  });

  let finalY = doc.lastAutoTable.finalY + 10;

  // 4. Totals Section
  const taxType = invoice.tax_type || 'IGST';
  const isCgst = taxType === 'CGST + SGST';
  const taxAmount = parseFloat(invoice.total_tax_amount) || 0;
  const totalDue = parseFloat(invoice.total_due) || 0;
  const roundOff = parseFloat(invoice.calculated_round_off) || 0;
  const cgstAmt = isCgst ? taxAmount / 2 : 0;
  const sgstAmt = isCgst ? taxAmount / 2 : 0;
  const igstAmt = isCgst ? 0 : taxAmount;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  
  doc.setTextColor(...grayColor);
  doc.text("Total Before Tax", 130, finalY);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkColor);
  doc.text(formatCurrency(totalBase), 196, finalY, { align: 'right' });
  
  doc.setDrawColor(240, 240, 240);
  doc.line(130, finalY + 2, 196, finalY + 2);
  finalY += 7;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  if (isCgst) {
    doc.text(`Add: CGST @ ${invoice.cgst_percent || 0}%`, 130, finalY);
    doc.text(formatCurrency(cgstAmt), 196, finalY, { align: 'right' });
    finalY += 7;
    doc.text(`Add: SGST @ ${invoice.sgst_percent || 0}%`, 130, finalY);
    doc.text(formatCurrency(sgstAmt), 196, finalY, { align: 'right' });
  } else {
    doc.text(`Add: IGST @ ${invoice.igst_percent || 0}%`, 130, finalY);
    doc.text(formatCurrency(igstAmt), 196, finalY, { align: 'right' });
  }
  doc.line(130, finalY + 2, 196, finalY + 2);
  finalY += 7;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkColor);
  doc.text("Total Tax Amount", 130, finalY);
  doc.text(formatCurrency(taxAmount), 196, finalY, { align: 'right' });
  doc.line(130, finalY + 2, 196, finalY + 2);
  finalY += 7;
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Round Off", 130, finalY);
  doc.text(`${roundOff >= 0 ? '+' : ''}${formatCurrency(roundOff)}`, 196, finalY, { align: 'right' });
  finalY += 5;

  // Final Total Bar
  doc.setFillColor(...primaryColor);
  doc.rect(125, finalY, 71, 8, 'F');
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Total After Tax", 128, finalY + 5.5);
  doc.text(formatCurrency(totalDue), 194, finalY + 5.5, { align: 'right' });
  
  finalY += 15;

  // 5. Amount in words
  doc.setFillColor(245, 245, 245);
  doc.rect(14, finalY, 182, 8, 'F');
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  doc.text("Amount In Words: ", 17, finalY + 5.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkColor);
  doc.text(numberToWords(totalDue), 45, finalY + 5.5);

  finalY += 20;

  // 6. Terms
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.setFont("helvetica", "bold");
  doc.text("TERMS & CONDITIONS", 14, finalY);
  finalY += 5;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...grayColor);
  
  const termsText = invoice.notes || '1. Payment is due within 3 days of the invoice date.\n2. Late payments may incur additional charges.\n3. All disputes are subject to Gujarat Jurisdiction.';
  const termsLines = doc.splitTextToSize(termsText, 100);
  doc.text(termsLines, 14, finalY);

  finalY += (termsLines.length * 4) + 5;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...darkColor);
  doc.text("Development First 70% Advance I Mentioned", 14, finalY);

  // Save document directly (Triggers download instantly)
  doc.save(`${invoice.invoice_number || 'invoice'}.pdf`);
};
