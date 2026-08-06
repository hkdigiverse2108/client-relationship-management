import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { invoiceSchema } from "@/utils/validators";

export default function InvoiceFormModal({ open, onClose, onSubmit, submitting, initialData }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(invoiceSchema),
    defaultValues: {
      invoice_number: "",
      total_amount: "",
      issue_date: "",
      due_date: "",
      status: "draft",
      notes: ""
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          invoice_number: "",
          total_amount: "",
          issue_date: "",
          due_date: "",
          status: "draft",
          notes: ""
        });
      }
    }
  }, [open, initialData, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialData ? "Edit Invoice" : "Create New Invoice"}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} loading={submitting}>
            {initialData ? "Save Changes" : "Create Invoice"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-3">
          <div className="col-12">
            <Input label="Invoice Number *" error={errors.invoice_number?.message} {...register("invoice_number")} />
          </div>
          <div className="col-12">
            <Input label="Total Amount (₹) *" type="number" error={errors.total_amount?.message} {...register("total_amount")} />
          </div>
          <div className="col-md-6">
            <Input label="Issue Date *" type="date" error={errors.issue_date?.message} {...register("issue_date")} />
          </div>
          <div className="col-md-6">
            <Input label="Due Date *" type="date" error={errors.due_date?.message} {...register("due_date")} />
          </div>
          <div className="col-12">
            <label className="form-label">Status *</label>
            <select className={`form-select ${errors.status ? 'is-invalid' : ''}`} {...register("status")}>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
            {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
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
