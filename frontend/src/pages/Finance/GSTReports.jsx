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
    try {
      const response = await gstService.verifyGSTIN(gstin.toUpperCase());
      const data = response.data?.data || response.data || response;
      setReportData(data);
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
    <div className="container-fluid p-4">
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
                <div className="input-group" style={{ flex: 1 }}>
                  <span className="input-group-text bg-light border-end-0">
                    <FiSearch className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light border-start-0 text-uppercase"
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
              <div className="form-text mt-2 text-muted">
                Standard format: 2 numbers, 5 letters, 4 numbers, 1 letter, 1 number/letter, Z, 1 number/letter. Example: 09AAACC1206D1Z5
              </div>
            </div>
          </div>

          {/* Result Card */}
          {reportData && (
            <div className="card shadow-sm border-0 animate__animated animate__fadeIn">
              <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
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
                      <span className="badge bg-light text-dark border">
                        <FiBriefcase className="me-1" /> {reportData.taxpayer_type || 'Regular'}
                      </span>
                    </div>
                  </div>
                </div>

                <h6 className="text-uppercase text-muted fw-bold mb-3" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
                  Business Details
                </h6>
                <div className="row g-4">
                  <div className="col-md-6 col-lg-4">
                    <div className="p-3 bg-light rounded-3 h-100">
                      <div className="text-muted small mb-1">GSTIN Number</div>
                      <div className="fw-bold">{reportData.gstin || reportData.GSTIN || gstin}</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="p-3 bg-light rounded-3 h-100">
                      <div className="text-muted small mb-1">Registration Date</div>
                      <div className="fw-bold">{reportData.date_of_registration || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="p-3 bg-light rounded-3 h-100">
                      <div className="text-muted small mb-1">Constitution of Business</div>
                      <div className="fw-bold">{reportData.constitution_of_business || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="p-3 bg-light rounded-3 h-100">
                      <div className="text-muted small mb-1">State Jurisdiction</div>
                      <div className="fw-bold">{reportData.state_jurisdiction || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="p-3 bg-light rounded-3 h-100">
                      <div className="text-muted small mb-1">Center Jurisdiction</div>
                      <div className="fw-bold">{reportData.center_jurisdiction || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {/* Additional Details (Raw Dump for Unmapped Fields) */}
                <div className="mt-5">
                  <h6 className="text-uppercase text-muted fw-bold mb-3" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>
                    Extended Information
                  </h6>
                  <div className="table-responsive border rounded-3">
                    <table className="table table-hover table-borderless mb-0">
                      <thead className="table-light border-bottom">
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
                              <td className="py-3 px-4 fw-medium text-secondary" style={{ width: '30%' }}>
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
