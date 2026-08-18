import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal/Modal";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import api from "@/api/axiosClient";

export default function TaskFormModal({ open, onClose, onSubmit, submitting, defaultValues }) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ 
    defaultValues: {
      status: "To Do",
      priority: "Medium",
      task_type: "Task",
      ...defaultValues 
    } 
  });

  useEffect(() => {
    if (open) {
      api.get("/projects").then(setProjects).catch(console.error);
      api.get("/users").then(res => setUsers(res?.users || res || [])).catch(console.error);
    }
  }, [open]);

  useEffect(() => {
    // Ensure the default values are re-applied if they load late or options change
    reset({
      status: "To Do",
      priority: "Medium",
      task_type: "Task",
      ...defaultValues 
    });
  }, [defaultValues, reset, projects.length, users.length]);

  return (
    <Modal open={open} onClose={onClose} title={defaultValues?.id ? "Edit Task" : "New Task"} size="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="form-label">Task Name <span className="text-danger">*</span></label>
            <Input
              {...register("title", { required: "Task name is required" })}
              error={errors.title?.message}
              placeholder="e.g., Client Follow-up"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Task Type <span className="text-danger">*</span></label>
            <select 
              className={`form-select ${errors.task_type ? 'is-invalid' : ''}`} 
              {...register("task_type", { required: "Task type is required" })}
            >
              <option value="Task">Task</option>
              <option value="Meeting">Meeting</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Call">Call</option>
              <option value="Review">Review</option>
            </select>
            {errors.task_type && <div className="invalid-feedback">{errors.task_type.message}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Priority <span className="text-danger">*</span></label>
            <select 
              className={`form-select ${errors.priority ? 'is-invalid' : ''}`} 
              {...register("priority", { required: "Priority is required" })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            {errors.priority && <div className="invalid-feedback">{errors.priority.message}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Status <span className="text-danger">*</span></label>
            <select 
              className={`form-select ${errors.status ? 'is-invalid' : ''}`} 
              {...register("status", { required: "Status is required" })}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
            {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Associated Project <span className="text-danger">*</span></label>
            <select 
              className={`form-select ${errors.project_id ? 'is-invalid' : ''}`} 
              {...register("project_id", { required: "Project is required" })}
            >
              <option value="">Select Project...</option>
              {projects.map(p => (
                <option key={p.id || p._id} value={p.id || p._id}>{p.title}</option>
              ))}
            </select>
            {errors.project_id && <div className="invalid-feedback">{errors.project_id.message}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Assign To <span className="text-danger">*</span></label>
            <select 
              className={`form-select ${errors.assigned_to ? 'is-invalid' : ''}`} 
              {...register("assigned_to", { required: "Assignee is required" })}
            >
              <option value="">Select User...</option>
              {users.map(u => (
                <option key={u.id || u._id} value={u.name || u.email}>{u.name || u.email}</option>
              ))}
            </select>
            {errors.assigned_to && <div className="invalid-feedback">{errors.assigned_to.message}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Start Date <span className="text-danger">*</span></label>
            <Input
              type="date"
              {...register("start_date", { required: "Start date is required" })}
              error={errors.start_date?.message}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Due Date <span className="text-danger">*</span></label>
            <Input
              type="date"
              {...register("end_date", { required: "Due date is required" })}
              error={errors.end_date?.message}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Reminder Date</label>
            <Input
              type="date"
              {...register("reminder_date")}
            />
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              {...register("description")}
              placeholder="Detailed description of the task"
            ></textarea>
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">Notes</label>
            <textarea
              className="form-control"
              rows="2"
              {...register("notes")}
              placeholder="Any additional notes"
            ></textarea>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" loading={submitting}>
            Save Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
