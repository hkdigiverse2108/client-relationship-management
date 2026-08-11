import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { dealSchema } from "@/utils/validators";
import { DEAL_STAGES } from "@/utils/constants";
import api from "@/api/axiosClient";
import { useAsync } from "@/hooks/useAsync";

export default function DealFormModal({ open, onClose, onSubmit, submitting, initialData }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(dealSchema),
    defaultValues: {
      title: "",
      company_name: "",
      amount: "",
      stage: "new_lead",
      probability: "",
      expected_close_date: "",
      assigned_to: "",
      notes: ""
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          title: "",
          company_name: "",
          amount: "",
          stage: "new_lead",
          probability: "",
          expected_close_date: "",
          assigned_to: "",
          notes: ""
        });
      }
    }
  }, [open, initialData, reset]);

  const { data: users = [] } = useAsync(() => api.get("/users"), [], []);

  const watchStage = register("stage").onChange; // To potentially show/hide reason, but we can also use useFormContext or just use react-hook-form's watch
  const formStage = initialData?.stage || "new_lead"; // Just fallback if we don't strictly watch

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialData ? "Edit Deal" : "Create New Deal"}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} loading={submitting}>
            {initialData ? "Save Changes" : "Create Deal"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <Input label="Deal Title *" error={errors.title?.message} {...register("title")} />
          </div>
          <div className="col-md-6">
            <Input label="Company Name" error={errors.company_name?.message} {...register("company_name")} />
          </div>
          <div className="col-md-6">
            <Input label="Amount (₹) *" type="number" error={errors.amount?.message} {...register("amount")} />
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Stage *</label>
            <select className={`form-select ${errors.stage ? 'is-invalid' : ''}`} {...register("stage")}>
              {DEAL_STAGES.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
            {errors.stage && <div className="invalid-feedback">{errors.stage.message}</div>}
          </div>
          
          <div className="col-md-6">
            <Input label="Probability (%)" type="number" min="0" max="100" error={errors.probability?.message} {...register("probability")} />
          </div>

          <div className="col-md-6">
            <Input label="Expected Close Date" type="date" error={errors.expected_close_date?.message} {...register("expected_close_date")} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Assigned To *</label>
            <select className={`form-select ${errors.assigned_to ? 'is-invalid' : ''}`} {...register("assigned_to")}>
              <option value="">Select User...</option>
              {users.map(u => (
                <option key={u.id || u._id} value={u.id || u._id}>{u.name}</option>
              ))}
            </select>
            {errors.assigned_to && <div className="invalid-feedback">{errors.assigned_to.message}</div>}
          </div>

          <div className="col-12">
            <label className="form-label">Notes</label>
            <textarea className="form-control" rows="2" {...register("notes")}></textarea>
          </div>
        </div>
      </form>
    </Modal>
  );
}
