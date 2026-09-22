import React, { useState } from 'react';
import CustomSelect from '../common/CustomSelect';
import CustomDatePicker from '../common/CustomDatePicker';

const TaskModal = ({ isOpen, onClose }) => {
  const [taskType, setTaskType] = useState('Task');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('To Do');
  const [project, setProject] = useState('');
  const [assignee, setAssignee] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(null);
  const [reminderDate, setReminderDate] = useState(null);

  if (!isOpen) return null;

  const taskTypeOptions = [
    { value: 'Task', label: 'Task' },
    { value: 'Meeting', label: 'Meeting' },
    { value: 'Follow-up', label: 'Follow-up' },
    { value: 'Call', label: 'Call' },
    { value: 'Review', label: 'Review' }
  ];

  const priorityOptions = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Critical', label: 'Critical' }
  ];

  const statusOptions = [
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'In Review', label: 'In Review' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Completed', label: 'Completed' }
  ];

  // Dummy data for select options
  const projectOptions = [
    { value: '1', label: 'Hospital Administration' },
    { value: '2', label: 'Clinic Management' },
    { value: '3', label: 'Educational Platform' }
  ];

  const assigneeOptions = [
    { value: '1', label: 'John Doe' },
    { value: '2', label: 'Jane Smith' },
    { value: '3', label: 'Michael Johnson' }
  ];

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Task</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close">×</button>
          </div>
          <div className="modal-body p-4">
            <form>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label">Task Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="e.g., Client Follow-up" />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label">Task Type</label>
                  <CustomSelect 
                    options={taskTypeOptions} 
                    value={taskTypeOptions.find(o => o.value === taskType) || taskTypeOptions[0]}
                    onChange={(sel) => setTaskType(sel ? sel.value : '')}
                    placeholder="Select Type" 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label">Priority</label>
                  <CustomSelect 
                    options={priorityOptions} 
                    value={priorityOptions.find(o => o.value === priority) || priorityOptions[1]}
                    onChange={(sel) => setPriority(sel ? sel.value : '')}
                    placeholder="Select Priority" 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <CustomSelect 
                    options={statusOptions} 
                    value={statusOptions.find(o => o.value === status) || statusOptions[0]}
                    onChange={(sel) => setStatus(sel ? sel.value : '')}
                    placeholder="Select Status" 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label">Associated Project</label>
                  <CustomSelect 
                    options={projectOptions} 
                    value={projectOptions.find(o => o.value === project) || null}
                    onChange={(sel) => setProject(sel ? sel.value : '')}
                    placeholder="Select Project" 
                  />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label">Assign To <span className="text-danger">*</span></label>
                  <CustomSelect 
                    options={assigneeOptions} 
                    value={assigneeOptions.find(o => o.value === assignee) || null}
                    onChange={(sel) => setAssignee(sel ? sel.value : '')}
                    placeholder="Select User" 
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Start Date</label>
                  <CustomDatePicker 
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Select Start Date"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Due Date <span className="text-danger">*</span></label>
                  <CustomDatePicker 
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    placeholderText="Select Due Date"
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Reminder Date</label>
                  <CustomDatePicker 
                    selected={reminderDate}
                    onChange={(date) => setReminderDate(date)}
                    placeholderText="Select Reminder Date"
                    className="form-control"
                  />
                </div>
                
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" placeholder="Detailed description of the task"></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label">Notes</label>
                  <textarea className="form-control" rows="2" placeholder="Any additional notes"></textarea>
                </div>

              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={onClose}>Save Task</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
