import KanbanBoard from '../components/common/KanbanBoard';
import PageHeader from '../components/common/PageHeader';
import DealFormModal from '../components/common/DealFormModal';
import ForecastView from './ForecastView';

const initialPipelineData = [
  {
    id: 'col-1',
    title: 'Lead',
    color: 'purple',
    cards: [
      {
        id: 'deal-1',
        title: 'Enterprise Software Upgrade',
        client: 'TechCorp Industries',
        tag: 'Software',
        value: '$120,000',
        probability: 'Low',
        dueDate: '15 Oct 2024',
        assignees: ['/assets/img/profiles/avatar-19.jpg', '/assets/img/profiles/avatar-29.jpg'],
        comments: 3,
        attachments: 2
      },
      {
        id: 'deal-2',
        title: 'Cloud Migration',
        client: 'Global Finance',
        tag: 'Services',
        value: '$85,000',
        probability: 'Medium',
        dueDate: '22 Oct 2024',
        assignees: ['/assets/img/profiles/avatar-16.jpg'],
        comments: 5,
        attachments: 1
      }
    ]
  },
  {
    id: 'col-2',
    title: 'Contacted',
    color: 'pink',
    cards: [
      {
        id: 'deal-3',
        title: 'Security Audit',
        client: 'HealthPlus Clinics',
        tag: 'Consulting',
        value: '$45,000',
        probability: 'Medium',
        dueDate: '10 Nov 2024',
        assignees: ['/assets/img/profiles/avatar-02.jpg'],
        comments: 8,
        attachments: 4
      }
    ]
  },
  {
    id: 'col-3',
    title: 'Proposal Sent',
    color: 'warning',
    cards: [
      {
        id: 'deal-4',
        title: 'ERP Implementation',
        client: 'Manufacturing Hub',
        tag: 'Software',
        value: '$250,000',
        probability: 'High',
        dueDate: '05 Sep 2024',
        assignees: ['/assets/img/profiles/avatar-03.jpg', '/assets/img/profiles/avatar-04.jpg'],
        comments: 12,
        attachments: 7
      }
    ]
  },
  {
    id: 'col-4',
    title: 'Negotiation',
    color: 'info',
    cards: [
      {
        id: 'deal-5',
        title: 'Marketing Automation',
        client: 'Retail Giants',
        tag: 'SaaS',
        value: '$65,000',
        probability: 'High',
        dueDate: '12 Sep 2024',
        assignees: ['/assets/img/profiles/avatar-05.jpg'],
        comments: 15,
        attachments: 3
      }
    ]
  },
  {
    id: 'col-5',
    title: 'Won',
    color: 'success',
    cards: [
      {
        id: 'deal-6',
        title: 'Network Setup',
        client: 'EduTech Academy',
        tag: 'Hardware',
        value: '$30,000',
        probability: 'Won',
        dueDate: '01 Sep 2024',
        assignees: ['/assets/img/profiles/avatar-01.jpg'],
        comments: 2,
        attachments: 5
      }
    ]
  },
  {
    id: 'col-6',
    title: 'Lost',
    color: 'danger',
    cards: []
  }
];

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomDatePicker from '../components/common/CustomDatePicker';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';
import ConfirmationModal from '../components/ConfirmationModal';
import Modal from '../components/common/Modal';
import CustomSelect from '../components/common/CustomSelect';

const Pipeline = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProbability, setActiveProbability] = useState('All');
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || '');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [viewMode, setViewMode] = useState('pipeline');
  const [deals, setDeals] = useState([]);
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [dealToEdit, setDealToEdit] = useState(null);
  const [dealToDelete, setDealToDelete] = useState(null);
  const [defaultStageForModal, setDefaultStageForModal] = useState('Lead');
  
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [pendingDrop, setPendingDrop] = useState(null);
  const [dropReason, setDropReason] = useState('');
  
  const [dealStats, setDealStats] = useState({});
  const [forecastStats, setForecastStats] = useState({
    won_value: 0,
    total_pipeline: 0,
    weighted_pipeline: 0,
    expected_this_month: 0,
    percentages: { total_pipeline: 0, weighted_pipeline: 0, expected_this_month: 0, won_value: 0 },
    growth: { total_pipeline: 0, weighted_pipeline: 0, expected_this_month: 0, won_value: 0 },
    monthly_forecast: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    hot_deals: []
  });
  
  const fetchDealsAndClients = async () => {
    try {
      const [dealsRes, clientsRes, usersRes, statsRes, forecastRes] = await Promise.all([
        axiosClient.get('/deals'),
        axiosClient.get('/clients'),
        axiosClient.get('/users'),
        axiosClient.get('/deals/summary/stats'),
        axiosClient.get('/deals/forecast/stats')
      ]);
      setDeals(dealsRes || []);
      setClients(clientsRes || []);
      setUsers(usersRes || []);
      setDealStats(statsRes || {});
      if (forecastRes) setForecastStats(forecastRes);
    } catch (err) {
      console.error("Failed to fetch pipeline data", err);
    }
  };

  useEffect(() => {
    fetchDealsAndClients();
  }, []);

  const handleDeleteDeal = async () => {
    if (!dealToDelete) return;
    try {
      await axiosClient.delete(`/deals/${dealToDelete}`);
      toast.success("Deal deleted successfully");
      setDealToDelete(null);
      fetchDealsAndClients();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete deal");
    }
  };

  const handleEditCard = (cardId) => {
    const deal = deals.find(d => (d._id || d.id) === cardId);
    if (deal) {
      setDealToEdit(deal);
      setDefaultStageForModal(deal.stage);
      setIsModalOpen(true);
    }
  };

  const handleCardDropIntercept = (cardId, targetColTitle, performDrop) => {
    if (targetColTitle === 'Won' || targetColTitle === 'Lost') {
      setPendingDrop({ cardId, targetColTitle, performDrop });
      setDropReason('');
      setReasonModalOpen(true);
    } else {
      performDrop('');
    }
  };

  const submitReasonDrop = (e) => {
    e.preventDefault();
    if (pendingDrop) {
      pendingDrop.performDrop(dropReason);
    }
    setReasonModalOpen(false);
    setPendingDrop(null);
  };

  const handleCardMove = async (cardId, targetColTitle, reason) => {
    try {
      const deal = deals.find(d => (d._id || d.id) === cardId);
      if (!deal) return;
      const updatedDeal = { ...deal, stage: targetColTitle };
      if (reason) updatedDeal.reason = reason;
      await axiosClient.put(`/deals/${cardId}`, updatedDeal);
      toast.success("Deal stage updated");
      fetchDealsAndClients();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update deal stage");
    }
  };

  const pipelineData = useMemo(() => {
    const columns = [
      { id: 'col-1', title: 'Lead', color: 'purple', cards: [] },
      { id: 'col-2', title: 'Contacted', color: 'pink', cards: [] },
      { id: 'col-3', title: 'Proposal Sent', color: 'warning', cards: [] },
      { id: 'col-4', title: 'Negotiation', color: 'info', cards: [] },
      { id: 'col-5', title: 'Won', color: 'success', cards: [] },
      { id: 'col-6', title: 'Lost', color: 'danger', cards: [] }
    ];

    const filteredDeals = deals.filter(deal => {
      // 1. Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const titleMatch = (deal.title || '').toLowerCase().includes(query);
        const clientName = (deal.company_name || '').toLowerCase();
        const clientMatch = clientName.includes(query);
        if (!titleMatch && !clientMatch) return false;
      }

      // 2. Probability filter
      if (activeProbability !== 'All') {
        const prob = Number(deal.probability) || 0;
        if (activeProbability === 'High' && prob < 70) return false;
        if (activeProbability === 'Medium' && (prob < 30 || prob >= 70)) return false;
        if (activeProbability === 'Low' && prob >= 30) return false;
      }

      // 3. Client Filter
      if (selectedClient) {
        if (deal.client_id !== selectedClient) return false;
      }

      // 4. Company Filter
      if (selectedCompany) {
        const dealClient = clients.find(c => (c._id || c.id) === deal.client_id);
        const company = deal.company_name || (dealClient ? dealClient.company_name : '');
        if (company !== selectedCompany) return false;
      }

      // 5. Assigned User Filter
      if (selectedUser) {
        if (deal.assigned_to !== selectedUser) return false;
      }

      // 6. Date Filter (using expected_close_date or created_at)
      if (dateRange && dateRange[0] && dateRange[1]) {
        // Fallback to created_at if expected_close_date is not set
        const dealDateStr = deal.expected_close_date || deal.created_at;
        if (dealDateStr) {
          const dealDate = new Date(dealDateStr);
          // Set to start of day for comparison
          dealDate.setHours(0, 0, 0, 0);
          const start = new Date(dateRange[0]);
          start.setHours(0, 0, 0, 0);
          const end = new Date(dateRange[1]);
          end.setHours(23, 59, 59, 999);
          
          if (dealDate < start || dealDate > end) {
            return false;
          }
        } else {
            return false; // Exclude deals with no date if a date range is selected
        }
      }

      return true;
    });

    filteredDeals.forEach(deal => {
      let normalizedStage = deal.stage || 'Lead';
      const sLower = normalizedStage.toLowerCase();
      if (sLower === 'new_lead' || sLower === 'lead') normalizedStage = 'Lead';
      else if (sLower === 'contacted') normalizedStage = 'Contacted';
      else if (sLower === 'proposal_sent' || sLower === 'proposal sent') normalizedStage = 'Proposal Sent';
      else if (sLower === 'negotiation') normalizedStage = 'Negotiation';
      else if (sLower === 'won') normalizedStage = 'Won';
      else if (sLower === 'lost') normalizedStage = 'Lost';

      const col = columns.find(c => c.title === normalizedStage) || columns[0];
      const client = clients.find(c => (c._id || c.id) === deal.client_id);
      const user = users.find(u => (u._id || u.id) === deal.assigned_to);
      
      let formattedDate = 'N/A';
      if (deal.expected_close_date) {
        const d = new Date(deal.expected_close_date);
        if (!isNaN(d.getTime())) {
          formattedDate = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }
      }

      col.cards.push({
        id: deal._id || deal.id,
        title: deal.title || 'Untitled Deal',
        client: deal.company_name || (client ? client.client_name : 'Unknown Client'),
        tag: 'Deal',
        reason: deal.reason || '',
        value: deal.amount ? `₹${deal.amount.toLocaleString()}` : '₹0',
        probability: deal.probability ? `${deal.probability}%` : '0%',
        dueDate: formattedDate,
        assignee: user ? { name: user.name, avatar: user.avatar } : null
      });
    });

    const getNormalizedStageKey = (s) => {
      let normalizedStage = s || 'Lead';
      const sLower = normalizedStage.toLowerCase();
      if (sLower === 'new_lead' || sLower === 'lead') return 'Lead';
      if (sLower === 'contacted') return 'Contacted';
      if (sLower === 'proposal_sent' || sLower === 'proposal sent') return 'Proposal Sent';
      if (sLower === 'negotiation') return 'Negotiation';
      if (sLower === 'won') return 'Won';
      if (sLower === 'lost') return 'Lost';
      return normalizedStage;
    };

    columns.forEach(col => {
      let colTotal = 0;
      Object.keys(dealStats).forEach(backendStage => {
        if (getNormalizedStageKey(backendStage) === col.title) {
          colTotal += dealStats[backendStage]?.total_amount || 0;
        }
      });
      col.totalAmount = colTotal;
    });

    return columns;
  }, [deals, clients, users, dealStats, searchQuery, activeProbability, selectedClient, selectedCompany, selectedUser, dateRange]);

  const clientOptions = [{ value: '', label: 'All Clients' }, ...clients.map(c => ({ value: c._id || c.id, label: c.client_name || c.company_name }))];
  const companyNames = [...new Set([...clients.map(c => c.company_name), ...deals.map(d => d.company_name)].filter(Boolean))];
  const companyOptions = [{ value: '', label: 'All Companies' }, ...companyNames.map(name => ({ value: name, label: name }))];
  const userOptions = [{ value: '', label: 'All Employees' }, ...users.map(u => ({ value: u._id || u.id, label: u.name }))];

  const hasActiveFilters = searchQuery !== '' || activeProbability !== 'All' || selectedClient !== '' || selectedCompany !== '' || selectedUser !== '' || (dateRange && dateRange[0] !== null);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveProbability('All');
    setSelectedClient('');
    setSelectedCompany('');
    setSelectedUser('');
    setDateRange([null, null]);
  };

  const totalValue = deals.reduce((acc, deal) => acc + (deal.amount || 0), 0);
  const wonValue = deals.filter(d => {
      const sLower = (d.stage || '').toLowerCase();
      return sLower === 'won';
  }).reduce((acc, deal) => acc + (deal.amount || 0), 0);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          {/* Breadcrumb */}
          <PageHeader 
            title={viewMode === 'pipeline' ? 'Sales Pipeline' : 'Sales Forecast'}
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'CRM & Sales' },
              { label: viewMode === 'pipeline' ? 'Pipeline Board' : 'Sales Forecast', active: true }
            ]}
          >
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
              <div className="me-2 mb-2">
                <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
                  <a href="#" onClick={(e) => { e.preventDefault(); setViewMode('pipeline'); }} className={`btn btn-sm ${viewMode === 'pipeline' ? 'bg-primary text-white border-0' : 'text-muted'}`}>Pipeline</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setViewMode('forecast'); }} className={`btn btn-sm ${viewMode === 'forecast' ? 'bg-primary text-white border-0' : 'text-muted'}`}>Forecast</a>
                </div>
              </div>
              <a href="#" onClick={(e) => { e.preventDefault(); setDealToEdit(null); setDefaultStageForModal('Lead'); setIsModalOpen(true); }} className="btn btn-primary d-inline-flex align-items-center mb-2">
                <i className="ti ti-circle-plus me-1"></i>New Deal
              </a>
             
            </div>
          </PageHeader>
          {/* /Breadcrumb */}

          <div className="card">
            {viewMode === 'pipeline' && (
              <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                <h4 className="mb-0">Sales Pipeline Overview</h4>
                <div className="d-flex align-items-center flex-wrap row-gap-3">
                  <div className="d-flex align-items-center me-3">
                    <p className="mb-0 me-3 pe-3 border-end fs-14">Total Deals : <span className="text-dark"> {deals.length} </span></p>
                    <p className="mb-0 me-3 pe-3 border-end fs-14">Total Value : <span className="text-dark"> ₹{totalValue.toLocaleString()} </span></p>
                    <p className="mb-0 fs-14">Won Value : <span className="text-dark"> ₹{wonValue.toLocaleString()} </span></p>
                  </div>
                  <div className="input-icon-start position-relative">
                    <span className="input-icon-addon">
                      <i className="ti ti-search"></i>
                    </span>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Search Deals or Clients" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="card-body">
              {viewMode === 'pipeline' && (
                <div className="row">
                  <div className="col-lg-4">
                    <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                    <h6 className="me-2">Probability</h6>
                    <ul className="nav nav-pills border d-inline-flex p-1 rounded bg-light todo-tabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activeProbability === 'All' ? 'active' : ''}`}
                          onClick={() => setActiveProbability('All')}
                          type="button">All</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activeProbability === 'High' ? 'active' : ''}`}
                          onClick={() => setActiveProbability('High')}
                          title="70% and above"
                          type="button">High</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activeProbability === 'Medium' ? 'active' : ''}`}
                          onClick={() => setActiveProbability('Medium')}
                          title="30% to 69%"
                          type="button">Medium</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activeProbability === 'Low' ? 'active' : ''}`}
                          onClick={() => setActiveProbability('Low')}
                          title="Below 30%"
                          type="button">Low</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="d-flex align-items-center justify-content-lg-end flex-wrap row-gap-3 mb-3">
                    <div className="me-2" style={{ width: '150px' }}>
                      <CustomSelect
                        options={clientOptions}
                        value={clientOptions.find(o => o.value === selectedClient) || clientOptions[0]}
                        onChange={(opt) => setSelectedClient(opt ? opt.value : '')}
                      />
                    </div>
                    <div className="me-2" style={{ width: '150px' }}>
                      <CustomSelect
                        options={companyOptions}
                        value={companyOptions.find(o => o.value === selectedCompany) || companyOptions[0]}
                        onChange={(opt) => setSelectedCompany(opt ? opt.value : '')}
                      />
                    </div>
                    <div className="me-2" style={{ width: '150px' }}>
                      <CustomSelect
                        options={userOptions}
                        value={userOptions.find(o => o.value === selectedUser) || userOptions[0]}
                        onChange={(opt) => setSelectedUser(opt ? opt.value : '')}
                      />
                    </div>
                    <div className="input-icon position-relative me-2" style={{ width: '200px' }}>
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar"></i>
                      </span>
                      <CustomDatePicker 
                        type="text" 
                        className="form-control" 
                        placeholderText="Date Range" 
                        isRange={true} 
                        selected={dateRange[0]}
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        onChange={(update) => setDateRange(update)}
                      />
                    </div>
                    {hasActiveFilters && (
                      <div className="ms-2">
                        <button className="btn btn-outline-danger btn-sm d-flex align-items-center" onClick={clearFilters}>
                          <i className="ti ti-x me-1"></i>Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              )}

            {/* Render View based on toggle */}
            {viewMode === 'pipeline' ? (
              <KanbanBoard 
                initialColumns={pipelineData} 
                onAddDeal={(stage) => {
                  setDefaultStageForModal(stage);
                  setDealToEdit(null);
                  setIsModalOpen(true);
                }}
                onEditCard={handleEditCard}
                onDeleteCard={(id) => setDealToDelete(id)}
                onCardDropIntercept={handleCardDropIntercept}
                onCardMove={handleCardMove}
              />
            ) : (
              <ForecastView deals={deals} forecastStats={forecastStats} />
            )}

          </div>
        </div>
      </div>
    </div>

    {/* Deal Form Modal Component */}
    <DealFormModal 
      open={isModalOpen} 
      onClose={() => { setIsModalOpen(false); setDealToEdit(null); }} 
      onSubmit={fetchDealsAndClients}
      initialData={dealToEdit}
      defaultStage={defaultStageForModal}
    />

    {/* Delete Confirmation Modal */}
    <ConfirmationModal
      id="delete_modal"
      onConfirm={handleDeleteDeal}
      title="Delete Deal"
      description="Are you sure you want to delete this deal? This action cannot be undone."
    />

    {/* Reason Modal */}
    <Modal open={reasonModalOpen} onClose={() => { setReasonModalOpen(false); setPendingDrop(null); }} title={`Reason for marking as ${pendingDrop?.targetColTitle}`}>
      <form onSubmit={submitReasonDrop}>
        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea 
            className="form-control" 
            rows="3" 
            value={dropReason} 
            onChange={(e) => setDropReason(e.target.value)} 
            placeholder="Please enter the reason..."
            required
          ></textarea>
        </div>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-light" onClick={() => { setReasonModalOpen(false); setPendingDrop(null); }}>Cancel</button>
          <button type="submit" className="btn btn-primary">Save & Move</button>
        </div>
      </form>
    </Modal>

  </>
);
};

export default Pipeline;
