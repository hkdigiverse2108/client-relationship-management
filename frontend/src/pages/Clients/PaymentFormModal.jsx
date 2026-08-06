import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { paymentSchema } from "@/utils/validators";

export default function PaymentFormModal({ open, onClose, onSubmit, submitting, initialData }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      amount_received: "",
      payment_date: "",
      payment_method: "bank_transfer",
      transaction_reference: "",
      notes: ""
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {
        reset(initialData);
      } else {
        reset({
          amount_received: "",
          payment_date: "",
          payment_method: "bank_transfer",
          transaction_reference: "",
          notes: ""
        });
      }
    }
  }, [open, initialData, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialData ? "Edit Payment" : "Add Received Payment"}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} loading={submitting}>
            {initialData ? "Save Changes" : "Add Payment"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-3">
          <div className="col-12">
            <Input label="Amount Received (₹) *" type="number" error={errors.amount_received?.message} {...register("amount_received")} />
          </div>
          <div className="col-12">
            <Input label="Payment Date *" type="date" error={errors.payment_date?.message} {...register("payment_date")} />
          </div>
          <div className="col-12">
            <label className="form-label">Payment Method *</label>
            <select className={`form-select ${errors.payment_method ? 'is-invalid' : ''}`} {...register("payment_method")}>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
              <option value="cheque">Cheque</option>
              <option value="upi">UPI / Online</option>
            </select>
            {errors.payment_method && <div className="invalid-feedback">{errors.payment_method.message}</div>}
          </div>
          <div className="col-12">
            <Input label="Transaction Reference" placeholder="e.g. UTR Number" error={errors.transaction_reference?.message} {...register("transaction_reference")} />
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
