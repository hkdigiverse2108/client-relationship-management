import React from 'react';

const KanbanCard = ({ card, columnColor, onDragStart }) => {
  return (
    <div 
      className="card kanban-card mb-2" 
      draggable 
      onDragStart={(e) => onDragStart(e, card.id)}
      style={{ cursor: 'grab' }}
    >
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center">
            {card.tag && <span className="badge bg-outline-dark me-2">{card.tag}</span>}
            {card.probability && (
              <span className={`badge bg-${columnColor} badge-xs d-flex align-items-center justify-content-center`}>
                <i className="fas fa-circle fs-6 me-1"></i>{card.probability}
              </span>
            )}
          </div>
          <div className="dropdown">
            <a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center" data-bs-toggle="dropdown">
              <i className="ti ti-dots-vertical"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end p-3">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-edit me-2"></i>Edit</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-trash me-2"></i>Delete</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mb-2">
          <h6 className="d-flex align-items-center">{card.title}</h6>
          {card.client && <p className="text-muted fs-12 mb-0 mt-1">{card.client}</p>}
        </div>
        
        {card.value && (
          <div className="d-flex align-items-center mb-2">
            <span className="fw-semibold text-dark fs-15">{card.value}</span>
          </div>
        )}
        
        {card.dueDate && (
          <p className="fw-medium mb-0">Expected Close : <span className="text-gray-9"> {card.dueDate}</span></p>
        )}
        
        <div className="d-flex align-items-center justify-content-between border-top pt-2 mt-2">
          <div className="avatar-list-stacked avatar-group-sm me-3">
            {card.assignees && card.assignees.map((avatar, idx) => (
              <span key={idx} className="avatar avatar-rounded">
                <img className="border border-white" src={avatar} alt="img" />
              </span>
            ))}
          </div>
          <div className="d-flex align-items-center">
            <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center text-dark me-2">
              <i className="ti ti-message-circle text-gray me-1"></i>{card.comments || 0}
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} className="d-flex align-items-center text-dark">
              <i className="ti ti-paperclip text-gray me-1"></i>{card.attachments || 0}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
