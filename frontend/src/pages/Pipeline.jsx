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

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CustomDatePicker from '../components/common/CustomDatePicker';

const Pipeline = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePriority, setActivePriority] = useState('All');
  const [viewMode, setViewMode] = useState('pipeline');

  const allDeals = useMemo(() => {
    return initialPipelineData.flatMap(col => 
      col.cards.map(card => ({
        ...card,
        stage: col.title,
        amount: card.value ? parseInt(card.value.replace(/[^0-9]/g, ''), 10) : 0,
        expected_close_date: new Date(new Date().setDate(new Date().getDate() + Math.random() * 60)), // mock date since original data lacks it
        probability: Math.floor(Math.random() * (100 - 40 + 1) + 40) // mock probability
      }))
    );
  }, []);

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
              <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="btn btn-primary d-inline-flex align-items-center mb-2">
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
                    <p className="mb-0 me-3 pe-3 border-end fs-14">Total Deals : <span className="text-dark"> 6 </span></p>
                    <p className="mb-0 me-3 pe-3 border-end fs-14">Total Value : <span className="text-dark"> $595,000 </span></p>
                    <p className="mb-0 fs-14">Won Value : <span className="text-dark"> $30,000 </span></p>
                  </div>
                  <div className="input-icon-start position-relative">
                    <span className="input-icon-addon">
                      <i className="ti ti-search"></i>
                    </span>
                    <input type="text" className="form-control" placeholder="Search Deals" />
                  </div>
                </div>
              </div>
            )}
            <div className="card-body">
              {viewMode === 'pipeline' && (
                <div className="row">
                  <div className="col-lg-4">
                    <div className="d-flex align-items-center flex-wrap row-gap-3 mb-3">
                    <h6 className="me-2">Priority</h6>
                    <ul className="nav nav-pills border d-inline-flex p-1 rounded bg-light todo-tabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'All' ? 'active' : ''}`}
                          onClick={() => setActivePriority('All')}
                          type="button">All</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'High' ? 'active' : ''}`}
                          onClick={() => setActivePriority('High')}
                          type="button">High</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'Medium' ? 'active' : ''}`}
                          onClick={() => setActivePriority('Medium')}
                          type="button">Medium</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link btn btn-sm btn-icon py-3 d-flex align-items-center justify-content-center w-auto ${activePriority === 'Low' ? 'active' : ''}`}
                          onClick={() => setActivePriority('Low')}
                          type="button">Low</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="d-flex align-items-center justify-content-lg-end flex-wrap row-gap-3 mb-3">
                    <div className="dropdown me-2">
                      <a href="#" onClick={(e) => e.preventDefault()}
                        className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                        data-bs-toggle="dropdown">
                        Stage
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end p-3">
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Lead</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Contacted</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Proposal Sent</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Negotiation</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Won</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1">Lost</a></li>
                      </ul>
                    </div>
                    <div className="input-icon position-relative me-2">
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar"></i>
                      </span>
                      <CustomDatePicker type="text" className="form-control" placeholder="" isRange={true} />
                    </div>
                    
                  </div>
                </div>
              </div>
              )}

            {/* Render View based on toggle */}
            {viewMode === 'pipeline' ? (
              <KanbanBoard initialColumns={initialPipelineData} />
            ) : (
              <ForecastView deals={allDeals} />
            )}

          </div>
        </div>
      </div>
    </div>

    {/* Deal Form Modal Component */}
    <DealFormModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />

  </>
);
};

export default Pipeline;
