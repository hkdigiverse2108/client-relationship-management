import React from 'react';

const dealsData = [
  {
    id: 'DEL-001', title: 'Enterprise Software License', stage: 'Proposal', amount: '$45,000',
    probability: '70%', closeDate: '30 Jun 2025', owner: 'avatar-01.jpg', ownerName: 'Adrian',
    stageClass: 'bg-transparent-purple'
  },
  {
    id: 'DEL-002', title: 'Annual Support Contract', stage: 'Negotiation', amount: '$18,500',
    probability: '85%', closeDate: '15 Jul 2025', owner: 'avatar-02.jpg', ownerName: 'Mathis',
    stageClass: 'bg-soft-warning'
  },
  {
    id: 'DEL-003', title: 'Cloud Migration Project', stage: 'Won', amount: '$72,000',
    probability: '100%', closeDate: '01 Apr 2025', owner: 'avatar-03.jpg', ownerName: 'Leona',
    stageClass: 'badge-soft-success'
  },
];

function DealTable({ data }) {
  return (
    <div className="table-responsive">
      <table className="table table-nowrap mb-0">
        <thead className="thead-light">
          <tr>
            <th>Deal</th>
            <th>Stage</th>
            <th>Value</th>
            <th>Probability</th>
            <th>Close Date</th>
            <th>Owner</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((deal) => (
            <tr key={deal.id}>
              <td>
                <div>
                  <h6 className="fs-14 mb-0">{deal.title}</h6>
                  <small className="text-muted">{deal.id}</small>
                </div>
              </td>
              <td>
                <span className={`badge ${deal.stageClass} d-inline-flex align-items-center`}>
                  <i className="fas fa-circle fs-6 me-1"></i>{deal.stage}
                </span>
              </td>
              <td className="fw-medium">{deal.amount}</td>
              <td>
                <div className="d-flex align-items-center">
                  <div className="progress flex-grow-1 me-2" style={{ height: '6px' }}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: deal.probability }}></div>
                  </div>
                  <small>{deal.probability}</small>
                </div>
              </td>
              <td>{deal.closeDate}</td>
              <td>
                <div className="d-flex align-items-center">
                  <img className="avatar avatar-xs rounded-circle me-1" src={`/assets/img/profiles/${deal.owner}`} alt="img" />
                  <span>{deal.ownerName}</span>
                </div>
              </td>
              <td className="text-end">
                <div className="dropdown">
                  <a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center" data-bs-toggle="dropdown">
                    <i className="ti ti-dots-vertical"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-eye me-2"></i>View</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-edit me-2"></i>Edit</a></li>
                    <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-trash me-2"></i>Delete</a></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ClientDeals({ isAccordion }) {
  if (isAccordion) {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingClientDeals">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientDeals" aria-expanded="false" aria-controls="collapseClientDeals">
            Deal
          </button>
        </h2>
        <div id="collapseClientDeals" className="accordion-collapse collapse" aria-labelledby="headingClientDeals" data-bs-parent="#overviewAccordion">
          <div className="accordion-body pb-0">
            <DealTable data={dealsData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="accordion accordions-items-seperate">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingDealsTab">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDealsTab" aria-expanded="true" aria-controls="collapseDealsTab">
              Deal
            </button>
          </h2>
          <div id="collapseDealsTab" className="accordion-collapse collapse show" aria-labelledby="headingDealsTab">
            <div className="accordion-body p-0">
              <DealTable data={dealsData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
