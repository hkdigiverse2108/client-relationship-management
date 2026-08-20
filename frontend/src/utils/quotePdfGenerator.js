import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generateQuotePDF = (quote, clientsMap = {}) => {
  const doc = new jsPDF();
  
  const formatAmount = (amt) => "Rs. " + Number(amt || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(33, 37, 41);
  doc.text("QUOTATION", 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(108, 117, 125);
  doc.text(`Quote Number: ${quote.quote_number}`, 14, 30);
  doc.text(`Date Sent: ${new Date(quote.date_sent || new Date()).toLocaleDateString()}`, 14, 35);
  doc.text(`Valid Until: ${new Date(quote.valid_until || new Date()).toLocaleDateString()}`, 14, 40);
  doc.text(`Status: ${(quote.status || 'Draft').toUpperCase()}`, 14, 45);
  
  // Company Info
  doc.setFontSize(14);
  doc.setTextColor(33, 37, 41);
  doc.text("AIO CRM Ltd.", 196, 22, { align: 'right' });
  doc.setFontSize(10);
  doc.setTextColor(108, 117, 125);
  doc.text("123 Business Avenue", 196, 30, { align: 'right' });
  doc.text("Tech City, TC 10010", 196, 35, { align: 'right' });
  doc.text("contact@aiocrm.com", 196, 40, { align: 'right' });

  // Client Info
  doc.setFontSize(12);
  doc.setTextColor(33, 37, 41);
  doc.text("Quotation For:", 14, 60);
  doc.setFontSize(10);
  doc.setTextColor(108, 117, 125);
  const clientName = clientsMap[quote.client_id] || quote.client_id || 'Unknown Client';
  doc.text(`Client: ${clientName}`, 14, 66);

  // Table
  const tableData = [
    ["Product / Service", "Qty", "Unit Price", "Discount", "Total"]
  ];
  
  const lineTotal = (quote.unit_price * quote.quantity) - quote.discount;
  
  tableData.push([
    quote.product_name || 'Item',
    quote.quantity.toString(),
    formatAmount(quote.unit_price),
    formatAmount(quote.discount),
    formatAmount(lineTotal)
  ]);
  
  doc.autoTable({
    startY: 80,
    head: [tableData[0]],
    body: tableData.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [74, 111, 165] },
    margin: { top: 10 },
    columnStyles: { 
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right' },
      4: { halign: 'right' }
    }
  });

  // Totals
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(10);
  doc.setTextColor(108, 117, 125);
  doc.text(`Subtotal: ${formatAmount(quote.sub_total)}`, 196, finalY, { align: 'right' });
  if (quote.tax_amount > 0) {
    doc.text(`Tax (${quote.tax_percentage}%): ${formatAmount(quote.tax_amount)}`, 196, finalY + 7, { align: 'right' });
  }
  doc.setFontSize(12);
  doc.setTextColor(33, 37, 41);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Amount: ${formatAmount(quote.total_amount)}`, 196, finalY + 15, { align: 'right' });
  
  // Notes
  if (quote.notes) {
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(108, 117, 125);
    doc.text("Notes/Terms:", 14, finalY + 10);
    
    const splitNotes = doc.splitTextToSize(quote.notes, 100);
    doc.text(splitNotes, 14, finalY + 16);
  }

  // Footer
  doc.setFontSize(8);
  doc.text("Thank you for considering our proposal!", 14, 280);

  // Save the PDF
  doc.save(`${quote.quote_number}.pdf`);
};
