import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ClientStatCard from '../components/common/ClientStatCard';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomSelect from '../components/common/CustomSelect';

const Ledger = () => {
  const [searchQuery_ledger, setSearchQuery_ledger] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [typeFilter, setTypeFilter] = useState('');
  
  // Tab state
  const [activeTab, setActiveTab] = useState('chronological');
  const [expandedClients, setExpandedClients] = useState({});

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Credit', label: 'Credit (Inflow)' },
    { value: 'Debit', label: 'Debit (Outflow)' }
  ];

  const columns = [
    { name: 'Date', selector: row => row.date, sortable: true },
    { 
      name: 'Entry ID', 
      selector: row => row.entryId, 
      cell: row => <Link to="#" onClick={(e) => e.preventDefault()} className="text-primary fw-medium">{row.entryId}</Link>,
      sortable: true 
    },
    { name: 'Description', selector: row => row.description, sortable: true },
    { name: 'Client', selector: row => row.client, sortable: true },
    { 
      name: 'Type', 
      selector: row => row.type, 
      cell: row => {
        let badgeClass = row.type === 'Credit' ? 'badge-success' : 'badge-danger';
        return (
          <span className={`badge ${badgeClass} d-inline-flex align-items-center badge-xs`}>
            {row.type}
          </span>
        );
      },
      sortable: true 
    },
    { 
      name: 'Amount', 
      selector: row => row.amount, 
      cell: row => {
        let textClass = row.type === 'Credit' ? 'text-success' : 'text-danger';
        let prefix = row.type === 'Credit' ? '+' : '-';
        return (
          <span className={`fw-bold ${textClass}`}>
            {prefix} {row.amount}
          </span>
        );
      },
      sortable: true 
    },
    { 
      name: 'Status', 
      selector: row => row.status,
      cell: row => <span className="badge badge-secondary badge-xs">{row.status}</span>,
      sortable: true 
    }
  ];

  const ledgerList = [
    { date: '14 Jan 2024', entryId: 'LED-001', description: 'Payment Received', client: 'Anthony Lewis', clientId: 'c1', type: 'Credit', amount: '5,000', amountNum: 5000, referenceId: 'REF-001', status: 'Settled' },
    { date: '16 Jan 2024', entryId: 'LED-002', description: 'Server Hosting Fee', client: 'Internal / Unassigned', clientId: 'c0', type: 'Debit', amount: '1,200', amountNum: 1200, referenceId: 'REF-002', status: 'Settled' },
    { date: '21 Jan 2024', entryId: 'LED-003', description: 'Advance Payment', client: 'Brian Villalobos', clientId: 'c2', type: 'Credit', amount: '3,200', amountNum: 3200, referenceId: 'REF-003', status: 'Settled' },
    { date: '22 Jan 2024', entryId: 'LED-004', description: 'Refund', client: 'Anthony Lewis', clientId: 'c1', type: 'Debit', amount: '500', amountNum: 500, referenceId: 'REF-004', status: 'Settled' },
  ];

  // Grouped logic
  const toggleClientExpand = (clientId) => {
    setExpandedClients(prev => ({ ...prev, [clientId]: !prev[clientId] }));
  };

  const clientGroups = ledgerList.reduce((acc, entry) => {
    const clientId = entry.clientId;
    if (!acc[clientId]) {
      acc[clientId] = {
        id: clientId,
        name: entry.client,
        entries: [],
        total_credit: 0,
        total_debit: 0
      };
    }
    acc[clientId].entries.push(entry);
    if (entry.type === 'Credit') {
      acc[clientId].total_credit += entry.amountNum;
    } else {
      acc[clientId].total_debit += entry.amountNum;
    }
    return acc;
  }, {});

  return (
    <div className="page-wrapper">
      <div className="content">
        <PageHeader 
          title="General Ledger"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'Finance & Billing' },
            { label: 'Ledger', active: true }
          ]}
        >
          <div className="mb-2">
            <button className="btn btn-primary d-flex align-items-center">
              <i className="ti ti-download me-2"></i>Export PDF Ledger
            </button>
          </div>
        </PageHeader>

        <div className="row">
          <ClientStatCard 
            title="Net Balance" 
            value="₹ 250,500" 
            icon="ti ti-currency-dollar"
            iconBgClass="bg-primary-transparent"
            iconColorClass="text-primary"
            percentage="+12.5%" 
            badgeClass="badge-success" 
            badgeIcon="ti ti-trending-up"
          />
          <ClientStatCard 
            title="Total Inflow (Credits)" 
            value="₹ 320,000" 
            icon="ti ti-trending-up"
            iconBgClass="bg-success-transparent"
            iconColorClass="text-success"
            percentage="+15.0%" 
            badgeClass="badge-success" 
            badgeIcon="ti ti-trending-up"
          />
          <ClientStatCard 
            title="Total Outflow (Debits)" 
            value="₹ 69,500" 
            icon="ti ti-trending-down"
            iconBgClass="bg-danger-transparent"
            iconColorClass="text-danger"
            percentage="-5.0%" 
            badgeClass="badge-danger" 
            badgeIcon="ti ti-trending-down"
          />
          <ClientStatCard 
            title="Total Ledger Entries" 
            value="1,245" 
            icon="ti ti-list"
            iconBgClass="bg-purple-transparent"
            iconColorClass="text-purple"
            percentage="+2.1%" 
            badgeClass="badge-success" 
            badgeIcon="ti ti-trending-up"
          />
        </div>

        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-start gap-3">
              <h5 className="mb-0 text-nowrap">Ledger Entries</h5>
              <div className="btn-group border rounded" >
                <button 
                  className={`btn px-3 py-1 text-nowrap rounded ${activeTab === 'chronological' ? 'btn-primary' : 'btn-transparent border-0'}`}
                  onClick={() => setActiveTab('chronological')}
                >
                  Chronological
                </button>
                <button 
                  className={`btn px-3 py-1 text-nowrap rounded ${activeTab === 'grouped' ? 'btn-primary' : 'btn-transparent border-0'}`}
                  onClick={() => setActiveTab('grouped')}
                >
                  Group by Client
                </button>
              </div>
            </div>

            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
              <div className="me-3">
                <div className="input-icon position-relative w-100">
                  <span className="input-icon-addon"><i className="ti ti-calendar"></i></span>
                  <CustomDatePicker 
                    selected={dateRange[0]}
                    onChange={(update) => setDateRange(update)}
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    isRange={true}
                    placeholderText=""
                    className="form-control"
                  />
                </div>
              </div>
              <div style={{ minWidth: '150px' }}>
                <CustomSelect 
                  options={typeOptions}
                  value={typeOptions.find(o => o.value === typeFilter) || typeOptions[0]}
                  onChange={(option) => setTypeFilter(option ? option.value : '')}
                />
              </div>
            </div>
          </div>
          
          <div className="card-body p-0">
            {activeTab === 'chronological' ? (
              <CustomDataTable 
                columns={columns}
                data={ledgerList}
                searchQuery={searchQuery_ledger}
                onSearch={(e) => setSearchQuery_ledger(e.target.value)}
              />
            ) : (
              <div className="grouped-ledger-view p-3">
                {Object.values(clientGroups).length === 0 ? (
                  <div className="text-center p-5 text-muted">No ledger entries found.</div>
                ) : (
                  <div className="accordion" id="ledgerAccordion">
                    {Object.values(clientGroups).map((group) => (
                      <div className="accordion-item mb-3 border rounded" key={group.id}>
                        <h2 className="accordion-header">
                          <button 
                            className={`accordion-button ${!expandedClients[group.id] ? 'collapsed' : ''} fw-medium bg-light`}
                            type="button"
                            onClick={() => toggleClientExpand(group.id)}
                            style={{ boxShadow: 'none' }}
                          >
                            <div className="d-flex flex-wrap align-items-center gap-2 gap-sm-3 w-100 me-3">
                              <span className="flex-grow-1 fw-bold text-dark" style={{ minWidth: '150px' }}>{group.name}</span>
                              <span className="badge bg-white text-dark border">{group.entries.length} Entries</span>
                              <div className="d-flex gap-3 flex-wrap">
                                <span className="text-success fw-bold"><i className="ti ti-arrow-up-right me-1"></i>Inflow: ₹{group.total_credit.toLocaleString()}</span>
                                {group.total_debit > 0 && <span className="text-danger fw-bold"><i className="ti ti-arrow-down-right me-1"></i>Outflow: ₹{group.total_debit.toLocaleString()}</span>}
                              </div>
                            </div>
                          </button>
                        </h2>
                        {expandedClients[group.id] && (
                          <div className="accordion-collapse show">
                            <div className="accordion-body p-0">
                              <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                  <thead className="thead-light">
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
                                      <tr key={entry.entryId}>
                                        <td className="ps-4">{entry.date}</td>
                                        <td><span className="text-primary fw-medium">{entry.entryId}</span></td>
                                        <td>{entry.description}</td>
                                        <td><span className="text-muted">{entry.referenceId || '-'}</span></td>
                                        <td>
                                          <span className={`badge badge-xs ${entry.type === 'Credit' ? 'badge-success' : 'badge-danger'}`}>
                                            {entry.type}
                                          </span>
                                        </td>
                                        <td className={`text-end pe-4 fw-bold ${entry.type === 'Credit' ? 'text-success' : 'text-danger'}`}>
                                          {entry.type === 'Credit' ? '+' : '-'} ₹{entry.amountNum.toLocaleString()}
                                        </td>
                                      </tr>
                                    ))}
                                    {/* Group Total Row */}
                                    <tr className="bg-light">
                                      <td colSpan="5" className="text-end fw-bold text-dark">Net Position for {group.name}:</td>
                                      <td className={`text-end pe-4 fw-bold ${(group.total_credit - group.total_debit) >= 0 ? 'text-success' : 'text-danger'}`}>
                                        ₹{(group.total_credit - group.total_debit).toLocaleString()}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
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
    </div>
  );
};

export default Ledger;
