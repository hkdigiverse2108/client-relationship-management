import React, { useState, useEffect, useRef } from 'react';
import KanbanCard from './KanbanCard';

const KanbanBoard = ({ initialColumns, itemType = 'Deal', onAddDeal, onEditCard, onDeleteCard, onCardDropIntercept, onCardMove }) => {
  const [columns, setColumns] = useState(initialColumns);
  const scrollRef = useRef(null);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

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

    const targetCol = columns.find(c => c.id === targetColumnId);
    if (!targetCol) return;

    const performDrop = (reason = '') => {
      // Pre-compute if the card actually needs moving
      let sourceColIdx = -1;
      let card = null;

      for (let i = 0; i < columns.length; i++) {
        const foundCard = columns[i].cards.find(c => c.id === cardId);
        if (foundCard) {
          sourceColIdx = i;
          card = foundCard;
          break;
        }
      }

      if (!card || columns[sourceColIdx].id === targetColumnId) {
        return; // No move needed
      }

      // Execute API call/toast exactly once
      if (onCardMove) {
        onCardMove(cardId, targetCol.title, reason);
      }

      // Update local UI state
      setColumns((prevCols) => {
        let prevSourceColIdx = -1;
        let prevCard = null;

        for (let i = 0; i < prevCols.length; i++) {
          const foundCard = prevCols[i].cards.find(c => c.id === cardId);
          if (foundCard) {
            prevSourceColIdx = i;
            prevCard = foundCard;
            break;
          }
        }

        if (!prevCard || prevCols[prevSourceColIdx].id === targetColumnId) {
          return prevCols;
        }

        const newCols = prevCols.map(col => ({ ...col, cards: [...col.cards] }));
        newCols[prevSourceColIdx].cards = newCols[prevSourceColIdx].cards.filter(c => c.id !== cardId);
        
        const targetColIdx = newCols.findIndex(col => col.id === targetColumnId);
        if (targetColIdx !== -1) {
          prevCard.reason = reason;
          newCols[targetColIdx].cards.push(prevCard);
        }

        return newCols;
      });
    };

    if (onCardDropIntercept) {
      onCardDropIntercept(cardId, targetCol.title, performDrop);
    } else {
      performDrop();
    }
  };

  const handleDragOverContainer = (e) => {
    e.preventDefault();
    if (!scrollRef.current) return;
    
    const { clientX } = e;
    const { left, right } = scrollRef.current.getBoundingClientRect();
    const scrollThreshold = 100;
    
    if (clientX - left < scrollThreshold) {
      scrollRef.current.scrollLeft -= 15;
    } else if (right - clientX < scrollThreshold) {
      scrollRef.current.scrollLeft += 15;
    }
  };

  return (
    <div 
      ref={scrollRef}
      className="d-flex align-items-start overflow-auto project-status pb-4" 
      style={{ minHeight: '60vh' }}
      onDragOver={handleDragOverContainer}
    >
      {columns.map((col) => (
        <div 
          key={col.id} 
          className="p-3 rounded bg-transparent-secondary w-100 me-3"
          style={{ minWidth: '320px', flex: '0 0 320px' }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, col.id)}
        >
          <div className="bg-white p-2 rounded mb-2">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <div className="d-flex align-items-center">
                <span className={`bg-transparent-${col.color} p-1 d-flex rounded-circle me-2`}>
                  <span className={`bg-${col.color} rounded-circle d-block p-1`}></span>
                </span>
                <h5 className="me-2 mb-0">{col.title}</h5>
                <span className="badge bg-light rounded-pill text-dark">{col.cards.length}</span>
              </div>
            </div>
            {col.totalAmount !== undefined && (
              <div className="text-muted fs-13 ps-4">
                Total: ₹{col.totalAmount.toLocaleString()}
              </div>
            )}
          </div>
          
          <div className="kanban-drag-wrap" style={{ minHeight: '150px' }}>
            {col.cards.map(card => (
              <KanbanCard 
                key={card.id} 
                card={card} 
                columnColor={col.color} 
                onDragStart={handleDragStart}
                onEdit={() => onEditCard && onEditCard(card.id)}
                onDelete={() => onDeleteCard && onDeleteCard(card.id)}
              />
            ))}
          </div>
          
          <div className="pt-2">
            <a href="#" onClick={(e) => { e.preventDefault(); onAddDeal && onAddDeal(col.title); }} className="btn btn-white border border-dashed d-flex align-items-center justify-content-center text-dark">
              <i className="ti ti-plus me-2"></i> Add {itemType}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
