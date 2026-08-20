import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generateInvoicePDF = (invoice, clientsMap = {}) => {
  const doc = new jsPDF();
  
  // Custom format without unsupported currency symbols (like ₹) to avoid font issues in basic jsPDF
  const formatAmount = (amt) => "Rs. " + Number(amt || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  // Header
  doc.setFontSize(22);
  doc.setTextColor(33, 37, 41);
  doc.text("INVOICE", 14, 22);
  
  doc.setFontSize(10);
  doc.setTextColor(108, 117, 125);
  doc.text(`Invoice Number: ${invoice.invoice_number}`, 14, 30);
  doc.text(`Issue Date: ${new Date(invoice.issue_date).toLocaleDateString()}`, 14, 35);
  doc.text(`Due Date: ${new Date(invoice.due_date).toLocaleDateString()}`, 14, 40);
  doc.text(`Status: ${(invoice.status || 'Draft').toUpperCase()}`, 14, 45);
  
  // Company Info (Right aligned to page width 210)
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
  doc.text("Billed To:", 14, 60);
  doc.setFontSize(10);
  doc.setTextColor(108, 117, 125);
  const clientName = invoice.source_id || clientsMap[invoice.client_id] || invoice.client_id || 'N/A';
  doc.text(`Client: ${clientName}`, 14, 66);
  if (invoice.source_type) {
    doc.text(`Source: ${invoice.source_type}`, 14, 71);
  }

  // Table
  const tableData = [
    ["Description", "Amount"]
  ];
  
  // Basic line item
  tableData.push([
    `Professional Services / ${invoice.source_type || 'General'}`,
    formatAmount(invoice.total_amount)
  ]);
  
  if (invoice.gst_amount > 0) {
    tableData.push(["GST (Tax)", formatAmount(invoice.gst_amount)]);
  }
  
  const grandTotal = (invoice.total_amount || 0) + (invoice.gst_amount || 0);

  doc.autoTable({
    startY: 80,
    head: [tableData[0]],
    body: tableData.slice(1),
    theme: 'grid',
    headStyles: { fillColor: [74, 111, 165] },
    margin: { top: 10 },
    columnStyles: { 
      1: { halign: 'right' } // Align amount column to right
    }
  });

  // Totals
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.setFontSize(12);
  doc.setTextColor(33, 37, 41);
  doc.text(`Total Base: ${formatAmount(invoice.total_amount)}`, 196, finalY, { align: 'right' });
  if (invoice.gst_amount > 0) {
    doc.text(`GST: ${formatAmount(invoice.gst_amount)}`, 196, finalY + 7, { align: 'right' });
  }
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text(`Grand Total: ${formatAmount(grandTotal)}`, 196, finalY + 16, { align: 'right' });
  
  // Notes
  if (invoice.notes) {
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(108, 117, 125);
    doc.text("Notes/Terms:", 14, finalY + 10);
    
    // Split text to fit width
    const splitNotes = doc.splitTextToSize(invoice.notes, 100);
    doc.text(splitNotes, 14, finalY + 16);
  }

  // Footer
  doc.setFontSize(8);
  doc.text("Thank you for your business!", 14, 280);

  // Save the PDF
  doc.save(`${invoice.invoice_number}.pdf`);
};
