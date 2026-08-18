import React from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/common/Modal/Modal";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

export default function TaskFormModal({ open, onClose, onSubmit, submitting, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  return (
    <Modal open={open} onClose={onClose} title={defaultValues?.id ? "Edit Task" : "New Task"} size="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Task Title</label>
          <Input
            {...register("title", { required: "Title is required" })}
            error={errors.title?.message}
            placeholder="e.g., Design Phase"
          />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Start Date</label>
            <Input
              type="date"
              {...register("start_date", { required: "Start date is required" })}
              error={errors.start_date?.message}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">End Date</label>
            <Input
              type="date"
              {...register("end_date", { required: "End date is required" })}
              error={errors.end_date?.message}
            />
          </div>
        </div>
        <div className="mb-3 form-check">
          <input 
            type="checkbox" 
            className="form-check-input" 
            id="isMilestone"
            {...register("is_milestone")}
          />
          <label className="form-check-label" htmlFor="isMilestone">
            Mark as Milestone (Displays as a single point)
          </label>
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
