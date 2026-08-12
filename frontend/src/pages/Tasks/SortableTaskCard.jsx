import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FiClock, FiEdit2, FiTrash2 } from "react-icons/fi";
import { formatDate } from "@/utils/formatters";

export default function SortableTaskCard({ task, onEdit, onDelete, getPriorityColor, getTypeBadge }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id || task._id,
    data: { task }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="pipeline-card" 
    >
      <div className="pipeline-card-header">
        <h6 className="pipeline-card-title mb-0">{task.title}</h6>
        <div className="pipeline-card-actions" onPointerDown={e => e.stopPropagation()}>
          <button className="btn btn-sm text-subtle p-1" onClick={onEdit}>
            <FiEdit2 size={14} />
          </button>
          <button className="btn btn-sm text-danger p-1" onClick={onDelete}>
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>
      <div className="mb-2 mt-2 d-flex justify-content-between align-items-center">
        {getTypeBadge(task.task_type)}
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: getPriorityColor(task.priority) }}>
          • {task.priority}
        </span>
      </div>
      <div className="pipeline-card-footer mt-2 pt-2 border-top">
        <div className="pipeline-card-assignee">
          {task.assigned_to}
        </div>
        {task.end_date && (
          <div className="pipeline-card-date">
            <FiClock className="me-1" />
            {formatDate(task.end_date)}
          </div>
        )}
      </div>
    </div>
  );
}
