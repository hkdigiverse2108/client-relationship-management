import React, { useState, useEffect } from 'react';
import PageHeader from '@/components/common/PageHeader/PageHeader';
import StatCard from '@/components/common/StatCard/StatCard';
import Table from '@/components/common/Table/Table';
import Button from '@/components/common/Button/Button';
import Badge from '@/components/common/Badge/Badge';
import { ledgerService } from '@/api/services/ledgerService';
import { FiTrendingUp, FiTrendingDown, FiList, FiDollarSign, FiDownload, FiSearch, FiFilter, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Ledger = () => {
  const [entries, setEntries] = useState([]);
  const [metrics, setMetrics] = useState({
    total_inflow: 0,
    total_outflow: 0,
    net_balance: 0,
    total_entries: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('grouped'); // 'grouped' or 'chronological'
  
  // For grouped view
  const [expandedClients, setExpandedClients] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [entriesData, metricsData] = await Promise.all([
        ledgerService.getLedgerEntries(),
        ledgerService.getMetrics()
      ]);
      setEntries(Array.isArray(entriesData) ? entriesData : (entriesData.data || []));
      setMetrics(metricsData);
    } catch (error) {
      toast.error("Failed to load ledger data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Title and Date
      doc.setFontSize(18);
      doc.text("General Ledger", 14, 22);
      
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Summary Metrics
      doc.setFontSize(10);
      doc.setTextColor(50);
      doc.text(`Net Balance: Rs. ${metrics.net_balance}`, 14, 40);
      doc.text(`Total Inflows: Rs. ${metrics.total_inflow}`, 74, 40);
      doc.text(`Total Outflows: Rs. ${metrics.total_outflow}`, 134, 40);
      
      // Table Data
      const tableColumn = ["Date", "Entry ID", "Client", "Description", "Type", "Amount", "Status"];
      const tableRows = [];
      
      entries.forEach(entry => {
        const rowData = [
          new Date(entry.date).toLocaleDateString(),
          entry.entry_id || "-",
          entry.client_name || "-",
          entry.description || "-",
          entry.type || "-",
          `Rs. ${entry.amount || 0}`,
          entry.status || "settled"
        ];
        tableRows.push(rowData);
      });
      
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 50,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [0, 82, 204] } // Primary color (blue)
      });
      
      doc.save(`General_Ledger_${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success("Ledger PDF Exported Successfully!");
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error(`Export failed: ${error.message || 'Unknown error'}`);
    }
  };

  const toggleClientExpand = (clientId) => {
    setExpandedClients(prev => ({
      ...prev,
      [clientId]: !prev[clientId]
    }));
  };

  // Group entries by client
  const clientGroups = entries.reduce((acc, entry) => {
    const clientId = entry.client_id || 'unassigned';
    const clientName = entry.client_name || (clientId === 'unassigned' ? 'Internal / Unassigned' : 'Unknown Client');
    
    if (!acc[clientId]) {
      acc[clientId] = {
        id: clientId,
        name: clientName,
        entries: [],
        total_credit: 0,
        total_debit: 0
      };
    }
    
    acc[clientId].entries.push(entry);
    if (entry.type.toLowerCase() === 'credit') {
      acc[clientId].total_credit += entry.amount;
    } else {
      acc[clientId].total_debit += entry.amount;
    }
    
    return acc;
  }, {});

  const chronoColumns = [
    { key: 'date', label: 'Date', render: (row) => new Date(row.date).toLocaleDateString() },
    { key: 'entry_id', label: 'Entry ID' },
    { key: 'description', label: 'Description' },
    { key: 'client_name', label: 'Client', render: (row) => row.client_name || '-' },
    { key: 'type', label: 'Type', render: (row) => (
      <Badge variant={String(row.type || '').toLowerCase() === 'credit' ? 'success' : 'danger'}>{row.type || 'Unknown'}</Badge>
    )},
    { key: 'amount', label: 'Amount', render: (row) => (
      <span className={`fw-bold text-${String(row.type || '').toLowerCase() === 'credit' ? 'success' : 'danger'}`}>
        {String(row.type || '').toLowerCase() === 'credit' ? '+' : '-'} ₹{(row.amount || 0).toLocaleString()}
      </span>
    )},
    { key: 'status', label: 'Status', render: (row) => <Badge variant="secondary">{row.status || 'Settled'}</Badge> }
  ];

  return (
    <div className="container-fluid p-4">
      <PageHeader
        title="General Ledger"
        description="Complete financial ledger & accounting records"
        actions={
          <Button variant="primary" onClick={handleExportPDF}>
            <FiDownload className="me-2" /> Export PDF Ledger
          </Button>
        }
      />

      {/* Metrics Row */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-3">
          <StatCard
            label="Net Balance"
            value={metrics.net_balance}
            format="currency"
            icon={FiDollarSign}
            trend={metrics.net_balance >= 0 ? "up" : "down"}
          />
        </div>
        <div className="col-12 col-md-3">
          <StatCard
            label="Total Inflow (Credits)"
            value={metrics.total_inflow}
            format="currency"
            icon={FiTrendingUp}
            trend="up"
          />
        </div>
        <div className="col-12 col-md-3">
          <StatCard
            label="Total Outflow (Debits)"
            value={metrics.total_outflow}
            format="currency"
            icon={FiTrendingDown}
            trend="down"
          />
        </div>
        <div className="col-12 col-md-3">
          <StatCard
            label="Total Ledger Entries"
            value={metrics.total_entries}
            format="number"
            icon={FiList}
          />
        </div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-header bg-white border-bottom pt-4 pb-3">
          <div className="d-flex align-items-center gap-4">
            <h5 className="mb-0">Ledger Entries</h5>
            <div className="btn-group shadow-sm" style={{ borderRadius: '6px' }}>
              <button 
                className="btn btn-sm"
                onClick={() => setActiveTab('grouped')}
                style={{ 
                  width: '130px',
                  backgroundColor: activeTab === 'grouped' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'grouped' ? '#fff' : 'var(--color-primary)',
                  border: '1px solid var(--color-primary)'
                }}
              >
                Group by Client
              </button>
              <button 
                className="btn btn-sm"
                onClick={() => setActiveTab('chronological')}
                style={{ 
                  width: '130px',
                  backgroundColor: activeTab === 'chronological' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'chronological' ? '#fff' : 'var(--color-primary)',
                  border: '1px solid var(--color-primary)'
                }}
              >
                Chronological
              </button>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : activeTab === 'chronological' ? (
            <div className="p-3">
              <Table 
                columns={chronoColumns} 
                data={entries} 
                emptyMessage="No ledger entries found."
              />
            </div>
          ) : (
            <div className="grouped-ledger-view">
              {Object.values(clientGroups).length === 0 ? (
                <div className="text-center p-5 text-muted">No ledger entries found.</div>
              ) : (
                <div className="accordion" id="ledgerAccordion">
                  {Object.values(clientGroups).map((group, idx) => (
                    <div className="accordion-item border-0 border-bottom" key={group.id}>
                      <h2 className="accordion-header">
                        <button 
                          className="accordion-button collapsed bg-light text-dark fw-medium d-flex justify-content-between align-items-center"
                          type="button"
                          onClick={() => toggleClientExpand(group.id)}
                          style={{ boxShadow: 'none' }}
                        >
                          <div className="d-flex align-items-center gap-3 w-100">
                            {expandedClients[group.id] ? <FiChevronDown /> : <FiChevronRight />}
                            <span className="flex-grow-1">{group.name}</span>
                            <span className="badge bg-white text-dark border me-3">{group.entries.length} Entries</span>
                            <span className="text-success fw-bold">Inflow: ₹{group.total_credit.toLocaleString()}</span>
                            {group.total_debit > 0 && <span className="text-danger fw-bold ms-3">Outflow: ₹{group.total_debit.toLocaleString()}</span>}
                          </div>
                        </button>
                      </h2>
                      {expandedClients[group.id] && (
                        <div className="accordion-collapse show">
                          <div className="accordion-body p-0">
                            <table className="table table-hover mb-0" style={{ fontSize: '0.9rem' }}>
                              <thead className="table-light">
                                <tr>
                                  <th className="ps-4">Date</th>
                                  <th>Entry ID</th>
                                  <th>Description</th>
                                  <th>Reference</th>
                                  <th>Type</th>
                                  <th className="text-end pe-4">Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                {group.entries.map(entry => (
                                  <tr key={entry.entry_id || entry.id || entry._id}>
                                    <td className="ps-4">{new Date(entry.date).toLocaleDateString()}</td>
                                    <td><small className="text-muted">{entry.entry_id}</small></td>
                                    <td>{entry.description}</td>
                                    <td><small className="text-muted">{entry.reference_id}</small></td>
                                    <td>
                                      <Badge variant={entry.type.toLowerCase() === 'credit' ? 'success' : 'danger'}>
                                        {entry.type}
                                      </Badge>
                                    </td>
                                    <td className={`text-end pe-4 fw-bold text-${entry.type.toLowerCase() === 'credit' ? 'success' : 'danger'}`}>
                                      {entry.type.toLowerCase() === 'credit' ? '+' : '-'} ₹{entry.amount.toLocaleString()}
                                    </td>
                                  </tr>
                                ))}
                                {/* Group Total Row */}
                                <tr className="table-active">
                                  <td colSpan="5" className="text-end fw-bold">Net Position for {group.name}:</td>
                                  <td className={`text-end pe-4 fw-bold text-${(group.total_credit - group.total_debit) >= 0 ? 'success' : 'danger'}`}>
                                    ₹{(group.total_credit - group.total_debit).toLocaleString()}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ledger;
