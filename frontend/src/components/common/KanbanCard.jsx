import React from 'react';

const KanbanCard = ({ card, columnColor, onDragStart, onEdit, onDelete }) => {
  const getInitials = (name) => {
    if (!name) return 'UN';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

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
                <a href="#" onClick={(e) => { e.preventDefault(); onEdit && onEdit(); }} className="dropdown-item rounded-1"><i className="ti ti-edit me-2"></i>Edit</a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onDelete && onDelete(); }} className="dropdown-item rounded-1" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash me-2"></i>Delete</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mb-2">
          <h6 className="d-flex align-items-center">{card.title}</h6>
          {card.client && <p className="text-muted fs-12 mb-0 mt-1">{card.client}</p>}
          {card.reason && (
            <p className={`text-${columnColor} fs-12 mb-0 mt-1 fst-italic`}>Reason: {card.reason}</p>
          )}
        </div>
        
        {card.value && (
          <div className="d-flex align-items-center mb-2">
            <span className="fw-semibold text-dark fs-15">{card.value}</span>
          </div>
        )}
        
        {card.dueDate && (
          <p className="fw-medium mb-0">Expected Close : <span className="text-gray-9"> {card.dueDate}</span></p>
        )}
        
        <div className="d-flex align-items-center border-top pt-2 mt-2">
          {card.assignee && (
            <div className="d-flex align-items-center">
              {card.assignee.avatar ? (
                <span className="avatar avatar-sm avatar-rounded me-2">
                  <img src={card.assignee.avatar} alt="img" />
                </span>
              ) : (
                <span className="avatar avatar-sm avatar-rounded bg-primary text-white d-flex align-items-center justify-content-center me-2 fw-semibold fs-11">
                  {getInitials(card.assignee.name)}
                </span>
              )}
              <span className="fs-13 fw-medium text-dark">{card.assignee.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
