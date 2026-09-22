import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import { toast } from 'react-hot-toast';

const GSTReports = () => {
  const [gstin, setGstin] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [crmSummary, setCrmSummary] = useState(null);

  const handleVerify = (e) => {
    e?.preventDefault();
    if (!gstin) {
      toast.error('Please enter a GSTIN');
      return;
    }
    
    // Client-side regex check
    const pattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!pattern.test(gstin.toUpperCase())) {
      toast.error('GST number is invalid');
      return;
    }

    setLoading(true);
    setReportData(null);
    setCrmSummary(null);

    // Mock API Call
    setTimeout(() => {
      setReportData({
        legal_name: 'RELIANCE INDUSTRIES LIMITED',
        trade_name: 'RELIANCE DIGITAL',
        gstin_status: 'Active',
        taxpayer_type: 'Regular',
        constitution_of_business: 'Public Limited Company',
        date_of_registration: '01-Jul-2017',
        state_jurisdiction: 'Maharashtra',
        center_jurisdiction: 'Mumbai',
        nature_of_business: 'Retail, Telecommunications, Petrochemicals',
        last_update_date: '15-Aug-2023',
        gstin: gstin.toUpperCase()
      });
      
      setCrmSummary({
        sales: {
          count: 124,
          total_billed: 4500000.50,
          total_gst_collected: 810000.09
        },
        purchases: {
          count: 45,
          total_purchases: 1200000.00,
          total_gst_paid: 216000.00
        }
      });

      setLoading(false);
      toast.success('GST Details Verified successfully');
    }, 1500);
  };

  const handleDownloadPDF = () => {
    toast.success('PDF download started');
  };

  const getStatusBadge = (statusStr) => {
    if (!statusStr) return null;
    const str = String(statusStr).toLowerCase();
    if (str.includes('active')) {
      return <span className="badge badge-success"><i className="ti ti-check me-1"></i> {statusStr}</span>;
    }
    return <span className="badge badge-danger"><i className="ti ti-x me-1"></i> {statusStr}</span>;
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader 
          title="GST Reports"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'Finance' },
            { label: 'GST Reports', active: true }
          ]}
        />

        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            
            {/* Search Card */}
            <div className="card border-0 mb-4">
              <div className="card-body p-4">
                <h5 className="mb-3">Verify GSTIN</h5>
                <form onSubmit={handleVerify} className="d-flex flex-column flex-md-row gap-3">
                  <div style={{ flex: 1 }}>
                    <div className="input-icon position-relative w-100 h-100">
                      <span className="input-icon-addon"><i className="ti ti-search fs-18"></i></span>
                      <input
                        type="text"
                        className="form-control form-control-lg text-uppercase h-100"
                        placeholder="Enter 15-digit Company GST Number"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value.toUpperCase())}
                        maxLength={15}
                      />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
                    disabled={loading}
                    style={{ minWidth: '150px' }}
                  >
                    {loading ? (
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <i className="ti ti-shield-check me-2 fs-18"></i>
                    )}
                    Verify
                  </button>
                </form>
                <div className="form-text mt-2 text-muted">
                  Standard format: 2 numbers, 5 letters, 4 numbers, 1 letter, 1 number/letter, Z, 1 number/letter. Example: 27AAACR1234A1Z5
                </div>
              </div>
            </div>

            {/* Result Card */}
            {reportData && (
              <div className="card border-0">
                <div className="card-header bg-transparent border-bottom p-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                  <h5 className="mb-0 d-flex align-items-center gap-2">
                    <i className="ti ti-file-text text-primary fs-20"></i>
                    Company Report
                  </h5>
                  <button className="btn btn-white border d-flex align-items-center" onClick={handleDownloadPDF}>
                    <i className="ti ti-download me-2"></i> Download PDF
                  </button>
                </div>
                
                <div className="card-body p-4">
                  
                  <div className="row g-4 mb-4 border-bottom pb-4">
                    <div className="col-12 col-md-8">
                      <h2 className="mb-2 fw-bold text-dark">
                        {reportData.legal_name || reportData.trade_name || 'Business Entity'}
                      </h2>
                      {reportData.trade_name && reportData.trade_name !== reportData.legal_name && (
                        <p className="text-muted mb-3 fs-16">{reportData.trade_name}</p>
                      )}
                      <div className="d-flex flex-wrap gap-3 mt-3">
                        {getStatusBadge(reportData.gstin_status || reportData.status)}
                        <span className="badge badge-soft-dark border">
                          <i className="ti ti-briefcase me-1"></i> {reportData.taxpayer_type || 'Regular'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {crmSummary && (crmSummary.sales.count > 0 || crmSummary.purchases.count > 0) && (
                    <>
                      <h6 className="text-uppercase text-muted fw-bold mb-3 mt-2 fs-12" style={{ letterSpacing: '1px' }}>
                        CRM Financial Summary
                      </h6>
                      <div className="row g-4 mb-4 border-bottom pb-4">
                        <div className="col-md-6">
                          <div className="p-3 bg-white shadow-sm rounded h-100 border border-light">
                            <h6 className="text-dark fw-bold mb-3 d-flex align-items-center"><i className="ti ti-briefcase text-primary me-2 fs-18"></i>Sales (We Billed Them)</h6>
                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-muted fs-14">Invoices Generated</span>
                              <span className="fw-bold">{crmSummary.sales.count}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-muted fs-14">Total Billed</span>
                              <span className="fw-bold text-dark">₹ {crmSummary.sales.total_billed.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="text-muted fs-14">Total GST Collected</span>
                              <span className="fw-bold text-success">₹ {crmSummary.sales.total_gst_collected.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="p-3 bg-white shadow-sm rounded h-100 border border-light">
                            <h6 className="text-dark fw-bold mb-3 d-flex align-items-center"><i className="ti ti-file-invoice text-danger me-2 fs-18"></i>Purchases (We Paid Them)</h6>
                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-muted fs-14">Expenses Logged</span>
                              <span className="fw-bold">{crmSummary.purchases.count}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-muted fs-14">Total Paid</span>
                              <span className="fw-bold text-dark">₹ {crmSummary.purchases.total_purchases.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="text-muted fs-14">Total GST Paid</span>
                              <span className="fw-bold text-danger">₹ {crmSummary.purchases.total_gst_paid.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <h6 className="text-uppercase text-muted fw-bold mb-3 fs-12" style={{ letterSpacing: '1px' }}>
                    Business Details
                  </h6>
                  <div className="row g-4">
                    <div className="col-md-6 col-lg-4">
                      <div className="p-3 bg-light border rounded h-100">
                        <div className="fs-13 mb-1 text-muted">GSTIN Number</div>
                        <div className="fw-bold text-dark">{reportData.gstin || reportData.GSTIN || gstin}</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="p-3 bg-light border rounded h-100">
                        <div className="fs-13 mb-1 text-muted">Registration Date</div>
                        <div className="fw-bold text-dark">{reportData.date_of_registration || 'N/A'}</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="p-3 bg-light border rounded h-100">
                        <div className="fs-13 mb-1 text-muted">Constitution of Business</div>
                        <div className="fw-bold text-dark">{reportData.constitution_of_business || 'N/A'}</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="p-3 bg-light border rounded h-100">
                        <div className="fs-13 mb-1 text-muted">State Jurisdiction</div>
                        <div className="fw-bold text-dark">{reportData.state_jurisdiction || 'N/A'}</div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="p-3 bg-light border rounded h-100">
                        <div className="fs-13 mb-1 text-muted">Center Jurisdiction</div>
                        <div className="fw-bold text-dark">{reportData.center_jurisdiction || 'N/A'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="mt-5">
                    <h6 className="text-uppercase text-muted fw-bold mb-3 fs-12" style={{ letterSpacing: '1px' }}>
                      Extended Information
                    </h6>
                    <div className="table-responsive border rounded">
                      <table className="table table-hover table-borderless mb-0">
                        <thead>
                          <tr className="border-bottom">
                            <th className="py-3 px-4 bg-light text-dark fw-bold">Attribute</th>
                            <th className="py-3 px-4 bg-light text-dark fw-bold">Value</th>
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
                                <td className="py-3 px-4 fw-medium text-muted" style={{ width: '30%' }}>
                                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </td>
                                <td className="py-3 px-4 text-dark">{String(value)}</td>
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
     
    </div>
  );
};

export default GSTReports;
