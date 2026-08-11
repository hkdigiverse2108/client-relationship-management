import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { projectSchema } from "@/utils/validators";

export default function ProjectFormModal({ open, onClose, onSubmit, submitting, initialData }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(projectSchema),
    defaultValues: {
      title: "",
      status: "not_started",
      start_date: "",
      end_date: "",
      description: ""
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          title: "",
          status: "not_started",
          start_date: "",
          end_date: "",
          description: ""
        });
      }
    }
  }, [open, initialData, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialData ? "Edit Project" : "Create New Project"}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} loading={submitting}>
            {initialData ? "Save Changes" : "Create Project"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-3">
          <div className="col-12">
            <Input label="Project Title *" error={errors.title?.message} {...register("title")} />
          </div>
          <div className="col-12">
            <label className="form-label">Status *</label>
            <select className={`form-select ${errors.status ? 'is-invalid' : ''}`} {...register("status")}>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="on_hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
          </div>
          <div className="col-md-6">
            <Input label="Start Date" type="date" error={errors.start_date?.message} {...register("start_date")} />
          </div>
          <div className="col-md-6">
            <Input label="End Date (Deadline)" type="date" error={errors.end_date?.message} {...register("end_date")} />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="3" {...register("description")}></textarea>
          </div>
        </div>
      </form>
    </Modal>
  );
}
