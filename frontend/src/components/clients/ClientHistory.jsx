import React from 'react';

const historyData = [
  {
    id: 1, type: 'invoice', icon: 'ti ti-file-invoice', iconBg: 'bg-soft-primary',
    title: 'Invoice INV-001 Created', desc: 'Invoice for Website Redesign Project worth $12,500 was created.',
    user: 'Adrian Lewis', avatar: 'avatar-01.jpg', time: '2 hours ago', date: '10 Jan 2025'
  },
  {
    id: 2, type: 'payment', icon: 'ti ti-cash', iconBg: 'bg-soft-success',
    title: 'Payment Received', desc: 'Payment of $12,500 received via Bank Transfer for INV-001.',
    user: 'System', avatar: 'avatar-02.jpg', time: '1 day ago', date: '12 Feb 2025'
  },
  {
    id: 3, type: 'deal', icon: 'ti ti-target', iconBg: 'bg-transparent-purple',
    title: 'Deal Updated', desc: 'Enterprise Software License deal moved to Negotiation stage.',
    user: 'Mathis Cooper', avatar: 'avatar-03.jpg', time: '3 days ago', date: '05 Mar 2025'
  },
  {
    id: 4, type: 'project', icon: 'ti ti-briefcase', iconBg: 'bg-soft-warning',
    title: 'Project Assigned', desc: 'Hospital Administration project assigned to client.',
    user: 'Leona Davis', avatar: 'avatar-04.jpg', time: '1 week ago', date: '20 Mar 2025'
  },
  {
    id: 5, type: 'note', icon: 'ti ti-notes', iconBg: 'bg-soft-info',
    title: 'Note Added', desc: 'Client prefers weekly status update calls on Fridays.',
    user: 'Adrian Lewis', avatar: 'avatar-01.jpg', time: '2 weeks ago', date: '01 Apr 2025'
  },
];

function HistoryList() {
  return (
    <div className="p-2">
      <ul className="list-unstyled mb-0">
        {historyData.map((item, index) => (
          <li key={item.id} className="d-flex align-items-start mb-3">
            <div className={`avatar avatar-md rounded-circle flex-shrink-0 me-3 ${item.iconBg} d-flex align-items-center justify-content-center`}>
              <i className={`${item.icon} fs-18`}></i>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <h6 className="fs-14 fw-medium mb-0">{item.title}</h6>
                <small className="text-muted">{item.time}</small>
              </div>
              <p className="text-muted fs-13 mb-1">{item.desc}</p>
              <div className="d-flex align-items-center">
                <img
                  className="avatar avatar-xs rounded-circle me-1"
                  src={`/assets/img/profiles/${item.avatar}`}
                  alt="img"
                />
                <small className="text-dark fw-medium">{item.user}</small>
                <span className="mx-1 text-muted">•</span>
                <small className="text-muted">{item.date}</small>
              </div>
            </div>
            {index < historyData.length - 1 && (
              <div style={{ position: 'absolute', left: '28px', marginTop: '40px', width: '1px', height: '20px', background: '#e9ecef' }}></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ClientHistory({ isAccordion }) {
  if (isAccordion) {
    return (
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingClientHistory">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseClientHistory" aria-expanded="false" aria-controls="collapseClientHistory">
            History
          </button>
        </h2>
        <div id="collapseClientHistory" className="accordion-collapse collapse" aria-labelledby="headingClientHistory" data-bs-parent="#overviewAccordion">
          <div className="accordion-body pb-0">
            <HistoryList />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="accordion accordions-items-seperate">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingHistoryTab">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseHistoryTab" aria-expanded="true" aria-controls="collapseHistoryTab">
              History
            </button>
          </h2>
          <div id="collapseHistoryTab" className="accordion-collapse collapse show" aria-labelledby="headingHistoryTab">
            <div className="accordion-body">
              <HistoryList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
