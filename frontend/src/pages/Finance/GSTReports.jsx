import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import Button from '@/components/common/Button/Button';
import { gstService } from '@/api/services/gstService';
import { toast } from 'react-hot-toast';
import { FiSearch, FiDownload, FiCheckCircle, FiXCircle, FiMapPin, FiBriefcase, FiFileText } from 'react-icons/fi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GSTReports = () => {
  const [gstin, setGstin] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [crmSummary, setCrmSummary] = useState(null);

  const handleVerify = async (e) => {
    e?.preventDefault();
    if (!gstin) {
      toast.error('Please enter a GSTIN');
      return;
    }
    
    // Client-side regex check
    const pattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!pattern.test(gstin.toUpperCase())) {
      toast.error('GST no is invalid');
      return;
    }

    setLoading(true);
    setReportData(null);
    setCrmSummary(null);
    try {
      const response = await gstService.verifyGSTIN(gstin.toUpperCase());
      const data = response.data?.data || response.data || response;
      setReportData(data);
      
      try {
        const summaryResp = await gstService.getCrmSummary(gstin.toUpperCase());
        setCrmSummary(summaryResp.data?.data || null);
      } catch(err) {
        console.error("CRM Summary fetch failed", err);
      }

      toast.success('GST Details Verified');
    } catch (error) {
      const msg = error.response?.data?.detail || 'Failed to verify GSTIN';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!reportData) return;

    const doc = new jsPDF();
    const gstinValue = reportData.gstin || reportData.GSTIN || gstin;
    const legalName = reportData.legal_name || reportData.legalName || reportData.trade_name || 'Business Entity';
    
    // Header
    doc.setFontSize(20);
    doc.text('GST Verification Report', 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`GSTIN: ${gstinValue.toUpperCase()}`, 14, 36);

    const tableData = [];
    
    // Extract standard fields
    const fieldsToExtract = [
      { key: 'legal_name', label: 'Legal Name' },
      { key: 'trade_name', label: 'Trade Name' },
      { key: 'gstin_status', label: 'Status' },
      { key: 'taxpayer_type', label: 'Taxpayer Type' },
      { key: 'constitution_of_business', label: 'Business Constitution' },
      { key: 'date_of_registration', label: 'Registration Date' },
      { key: 'state_jurisdiction', label: 'State Jurisdiction' },
      { key: 'center_jurisdiction', label: 'Center Jurisdiction' },
    ];

    fieldsToExtract.forEach(field => {
      const val = reportData[field.key] || reportData[field.label] || reportData[field.key.replace(/_/g, '')];
      if (val) tableData.push([field.label, val]);
    });

    // Add remaining keys that aren't objects/arrays
    Object.keys(reportData).forEach(key => {
      if (typeof reportData[key] !== 'object' && !fieldsToExtract.some(f => f.key === key)) {
        const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        tableData.push([formattedKey, String(reportData[key])]);
      }
    });

    doc.autoTable({
      startY: 45,
      head: [['Attribute', 'Value']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 10, cellPadding: 5 }
    });

    doc.save(`GST_Report_${gstinValue}.pdf`);
  };

  const getStatusBadge = (statusStr) => {
    if (!statusStr) return null;
    const str = String(statusStr).toLowerCase();
    if (str.includes('active')) {
      return <span className="badge bg-success bg-opacity-10 text-success border border-success"><FiCheckCircle className="me-1"/> {statusStr}</span>;
    }
    return <span className="badge bg-danger bg-opacity-10 text-danger border border-danger"><FiXCircle className="me-1"/> {statusStr}</span>;
  };

  return (
    <div className="container-fluid p-2 p-md-4">
      <PageHeader
        title="GST Reports"
        description="Generate statutory GST compliance reports"
      />

      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          
          {/* Search Card */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h5 className="mb-3">Verify GSTIN</h5>
              <form onSubmit={handleVerify} className="d-flex flex-column flex-md-row gap-3">
                <div style={{ flex: 1, position: 'relative' }}>
                  <div className="position-absolute d-flex align-items-center h-100" style={{ left: '16px', top: -3, pointerEvents: 'none' }}>
                    <FiSearch style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }} />
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-lg text-uppercase"
                    style={{ paddingLeft: '48px' }}
                    placeholder="Enter 15-digit Company GST Number"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    maxLength={15}
                  />
                </div>
                <Button 
                  variant="primary" 
                  size="lg" 
                  type="submit" 
                  loading={loading}
                  style={{ minWidth: '150px' }}
                >
                  Verify
                </Button>
              </form>
              <div className="form-text mt-2" style={{ color: 'var(--color-text-muted)' }}>
                Standard format: 2 numbers, 5 letters, 4 numbers, 1 letter, 1 number/letter, Z, 1 number/letter. Example: 09AAACC1206D1Z5
              </div>
            </div>
          </div>

          {/* Result Card */}
          {reportData && (
            <div className="card shadow-sm border-0 animate__animated animate__fadeIn">
              <div className="card-header bg-transparent border-bottom p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <h5 className="mb-0 d-flex align-items-center gap-2">
                  <FiFileText className="text-primary" />
                  Company Report
                </h5>
                <Button variant="secondary" onClick={handleDownloadPDF}>
                  <FiDownload className="me-2" /> Download PDF
                </Button>
              </div>
              
              <div className="card-body p-4">
                
                <div className="row g-4 mb-5">
                  <div className="col-12 col-md-8">
                    <h2 className="mb-1 fw-bold">
                      {reportData.legal_name || reportData.trade_name || 'Business Entity'}
                    </h2>
                    {reportData.trade_name && reportData.trade_name !== reportData.legal_name && (
                      <p className="text-muted mb-3 fs-5">{reportData.trade_name}</p>
                    )}
                    <div className="d-flex flex-wrap gap-3 mt-3">
                      {getStatusBadge(reportData.gstin_status || reportData.status)}
                      <span className="badge bg-surface-alt border" style={{ color: 'var(--color-text)' }}>
                        <FiBriefcase className="me-1" /> {reportData.taxpayer_type || 'Regular'}
                      </span>
                    </div>
                  </div>
                </div>

                {crmSummary && (crmSummary.sales.count > 0 || crmSummary.purchases.count > 0) && (
                  <>
                    <h6 className="text-uppercase text-muted fw-bold mb-3 mt-2" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
                      CRM Financial Summary
                    </h6>
                    <div className="row g-4 mb-5">
                      <div className="col-md-6">
                        <div className="p-3 bg-success bg-opacity-10 rounded-3 h-100 border border-success border-opacity-25">
                          <h6 className="text-success fw-bold mb-3"><FiBriefcase className="me-2"/>Sales (We Billed Them)</h6>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted small">Invoices Generated</span>
                            <span className="fw-bold">{crmSummary.sales.count}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted small">Total Billed</span>
                            <span className="fw-bold text-dark">₹ {crmSummary.sales.total_billed.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted small">Total GST Collected</span>
                            <span className="fw-bold text-success">₹ {crmSummary.sales.total_gst_collected.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="p-3 bg-danger bg-opacity-10 rounded-3 h-100 border border-danger border-opacity-25">
                          <h6 className="text-danger fw-bold mb-3"><FiFileText className="me-2"/>Purchases (We Paid Them)</h6>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted small">Expenses Logged</span>
                            <span className="fw-bold">{crmSummary.purchases.count}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted small">Total Paid</span>
                            <span className="fw-bold text-dark">₹ {crmSummary.purchases.total_purchases.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted small">Total GST Paid</span>
                            <span className="fw-bold text-danger">₹ {crmSummary.purchases.total_gst_paid.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <h6 className="text-uppercase text-muted-2 fw-bold mb-3" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
                  Business Details
                </h6>
                <div className="row g-4">
                  <div className="col-md-6 col-lg-4">
                    <div className="p-3 bg-surface-alt border rounded-3 h-100">
                      <div className="small mb-1" style={{ color: 'var(--color-text-muted)' }}>GSTIN Number</div>
                      <div className="fw-bold" style={{ color: 'var(--color-text)' }}>{reportData.gstin || reportData.GSTIN || gstin}</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="p-3 bg-surface-alt border rounded-3 h-100">
                      <div className="small mb-1" style={{ color: 'var(--color-text-muted)' }}>Registration Date</div>
                      <div className="fw-bold" style={{ color: 'var(--color-text)' }}>{reportData.date_of_registration || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="p-3 bg-surface-alt border rounded-3 h-100">
                      <div className="small mb-1" style={{ color: 'var(--color-text-muted)' }}>Constitution of Business</div>
                      <div className="fw-bold" style={{ color: 'var(--color-text)' }}>{reportData.constitution_of_business || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="p-3 bg-surface-alt border rounded-3 h-100">
                      <div className="small mb-1" style={{ color: 'var(--color-text-muted)' }}>State Jurisdiction</div>
                      <div className="fw-bold" style={{ color: 'var(--color-text)' }}>{reportData.state_jurisdiction || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="p-3 bg-surface-alt border rounded-3 h-100">
                      <div className="small mb-1" style={{ color: 'var(--color-text-muted)' }}>Center Jurisdiction</div>
                      <div className="fw-bold" style={{ color: 'var(--color-text)' }}>{reportData.center_jurisdiction || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {/* Additional Details (Raw Dump for Unmapped Fields) */}
                <div className="mt-5">
                  <h6 className="text-uppercase text-muted-2 fw-bold mb-3" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
                    Extended Information
                  </h6>
                  <div className="table-responsive border rounded-3">
                    <table className="table table-hover table-borderless mb-0">
                      <thead>
                        <tr>
                          <th className="py-3 px-4">Attribute</th>
                          <th className="py-3 px-4">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(reportData).map(([key, value]) => {
                          // Skip objects/arrays or main fields already shown
                          if (typeof value === 'object' || 
                              ['legal_name', 'trade_name', 'gstin_status', 'taxpayer_type', 'constitution_of_business', 'date_of_registration', 'state_jurisdiction', 'center_jurisdiction', 'gstin', 'GSTIN'].includes(key)) {
                            return null;
                          }
                          return (
                            <tr key={key} className="border-bottom">
                              <td className="py-3 px-4 fw-medium" style={{ width: '30%', color: 'var(--color-text-muted)' }}>
                                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </td>
                              <td className="py-3 px-4">{String(value)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default GSTReports;
