import React, { useState } from 'react';
import KanbanCard from './KanbanCard';

const KanbanBoard = ({ initialColumns, itemType = 'Deal' }) => {
  const [columns, setColumns] = useState(initialColumns);

  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    if (!cardId) return;

    setColumns((prevCols) => {
      let sourceColIdx = -1;
      let card = null;

      // Find the card and its source column
      for (let i = 0; i < prevCols.length; i++) {
        const foundCard = prevCols[i].cards.find(c => c.id === cardId);
        if (foundCard) {
          sourceColIdx = i;
          card = foundCard;
          break;
        }
      }

      if (!card || prevCols[sourceColIdx].id === targetColumnId) {
        return prevCols; // Card not found or dropped in the same column
      }

      // Create new columns array to update state immutably
      const newCols = prevCols.map(col => ({
        ...col,
        cards: [...col.cards]
      }));

      // Remove from source
      newCols[sourceColIdx].cards = newCols[sourceColIdx].cards.filter(c => c.id !== cardId);

      // Add to target
      const targetColIdx = newCols.findIndex(col => col.id === targetColumnId);
      if (targetColIdx !== -1) {
        newCols[targetColIdx].cards.push(card);
      }

      return newCols;
    });
  };

  return (
    <div className="d-flex align-items-start overflow-auto project-status pb-4" style={{ minHeight: '60vh' }}>
      {columns.map((col) => (
        <div 
          key={col.id} 
          className="p-3 rounded bg-transparent-secondary w-100 me-3"
          style={{ minWidth: '320px', flex: '0 0 320px' }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, col.id)}
        >
          <div className="bg-white p-2 rounded mb-2">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <span className={`bg-transparent-${col.color} p-1 d-flex rounded-circle me-2`}>
                  <span className={`bg-${col.color} rounded-circle d-block p-1`}></span>
                </span>
                <h5 className="me-2">{col.title}</h5>
                <span className="badge bg-light rounded-pill text-dark">{col.cards.length}</span>
              </div>
              <div className="dropdown">
                <a href="#" onClick={(e) => e.preventDefault()} className="d-inline-flex align-items-center" data-bs-toggle="dropdown">
                  <i className="ti ti-dots-vertical text-dark"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-edit me-2"></i>Edit</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i className="ti ti-trash me-2"></i>Delete</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="kanban-drag-wrap" style={{ minHeight: '150px' }}>
            {col.cards.map(card => (
              <KanbanCard 
                key={card.id} 
                card={card} 
                columnColor={col.color} 
                onDragStart={handleDragStart} 
              />
            ))}
          </div>
          
          <div className="pt-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-white border border-dashed d-flex align-items-center justify-content-center text-dark">
              <i className="ti ti-plus me-2"></i> Add {itemType}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
