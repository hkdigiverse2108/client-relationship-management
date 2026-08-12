import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal/Modal";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import api from "@/api/axiosClient";

export default function ReminderFormModal({ open, onClose, onSubmit, submitting, defaultValues }) {
  const [clients, setClients] = useState([]);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ 
    defaultValues: {
      category: "call",
      priority: "medium",
      ...defaultValues 
    } 
  });

  useEffect(() => {
    if (open) {
      api.get("/clients").then(setClients).catch(console.error);
    }
  }, [open]);

  useEffect(() => {
    reset({
      category: "call",
      priority: "medium",
      ...defaultValues 
    });
  }, [defaultValues, reset, clients.length]);

  return (
    <Modal open={open} onClose={onClose} title={defaultValues?.id ? "Edit Reminder" : "New Reminder"} size="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <Input
            label="Description / Action"
            placeholder="What needs to be done?"
            error={errors.description?.message}
            {...register("description", { required: "Description is required" })}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Category Type</label>
            <select 
              className={`form-select ${errors.category ? 'is-invalid' : ''}`} 
              {...register("category", { required: "Category is required" })}
            >
              <option value="call">Call</option>
              <option value="document">Document</option>
              <option value="payment">Payment</option>
              <option value="meeting">Meeting</option>
              <option value="task">Task</option>
              <option value="debug">Debug</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Priority</label>
            <select 
              className={`form-select ${errors.priority ? 'is-invalid' : ''}`} 
              {...register("priority", { required: "Priority is required" })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            {errors.priority && <div className="invalid-feedback">{errors.priority.message}</div>}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Linked Client</label>
          <select 
            className={`form-select ${errors.client_id ? 'is-invalid' : ''}`} 
            {...register("client_id", { required: "Client is required" })}
          >
            <option value="">Select Client...</option>
            {clients.map(c => (
              <option key={c.id || c._id} value={c.id || c._id}>{c.client_name || c.company_name}</option>
            ))}
          </select>
          {errors.client_id && <div className="invalid-feedback">{errors.client_id.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Due Date & Time</label>
          <input 
            type="datetime-local"
            className={`form-control ${errors.due_date ? 'is-invalid' : ''}`}
            {...register("due_date", { required: "Due date is required" })}
          />
          {errors.due_date && <div className="invalid-feedback">{errors.due_date.message}</div>}
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting} loading={submitting}>
            Save Reminder
          </Button>
        </div>
      </form>
    </Modal>
  );
}
