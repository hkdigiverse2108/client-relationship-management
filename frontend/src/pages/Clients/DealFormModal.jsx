import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { dealSchema } from "@/utils/validators";

export default function DealFormModal({ open, onClose, onSubmit, submitting, initialData }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(dealSchema),
    defaultValues: {
      title: "",
      amount: "",
      stage: "prospecting",
      contact: "",
      closeDate: ""
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          title: "",
          amount: "",
          stage: "prospecting",
          contact: "",
          closeDate: ""
        });
      }
    }
  }, [open, initialData, reset]);

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
          <div className="col-12">
            <Input label="Deal Title *" error={errors.title?.message} {...register("title")} />
          </div>
          <div className="col-12">
            <Input label="Amount (₹) *" type="number" error={errors.amount?.message} {...register("amount")} />
          </div>
          <div className="col-12">
            <label className="form-label">Stage *</label>
            <select className={`form-select ${errors.stage ? 'is-invalid' : ''}`} {...register("stage")}>
              <option value="prospecting">Prospecting</option>
              <option value="qualification">Qualification</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed_won">Closed Won</option>
              <option value="closed_lost">Closed Lost</option>
            </select>
            {errors.stage && <div className="invalid-feedback">{errors.stage.message}</div>}
          </div>
          <div className="col-12">
            <Input label="Expected Close Date" type="date" error={errors.closeDate?.message} {...register("closeDate")} />
          </div>
        </div>
      </form>
    </Modal>
  );
}
