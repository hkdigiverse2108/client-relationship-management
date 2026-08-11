import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { contactSchema } from "@/utils/validators";
import { 
  CONTACT_STATUS_LABEL, 
  CONTACT_DEPARTMENTS 
} from "@/utils/constants";
import "../Leads/LeadFormModal.css"; // Reuse styling

export default function ContactFormModal({ open, onClose, onSubmit, initialValues, submitting }) {
  const isEdit = !!(initialValues?.id || initialValues?._id);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: initialValues || {
      contact_name: "", company_name: "", contact_number: "", email: "",
      address: "", city: "", state: "", country: "", gstin: "",
      department: "", status: "active", tags: "", notes: ""
    },
  });

  useEffect(() => {
    if (open) {
      if (initialValues) {
        reset(initialValues);
      } else {
        reset({
          contact_name: "", company_name: "", contact_number: "", email: "",
          address: "", city: "", state: "", country: "", gstin: "",
          department: "", status: "active", tags: "", notes: ""
        });
      }
    }
  }, [open, initialValues, reset]);

  const submit = async (values) => {
    await onSubmit(values);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Contact" : "Create New Contact"}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(submit)} loading={submitting}>
            {isEdit ? "Save Changes" : "Create Contact"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)} noValidate className="lead-form-scrollable">
        
        <h5 className="form-section-title">Basic Information</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-6"><Input label="Contact Persona Name *" error={errors.contact_name?.message} {...register("contact_name")} /></div>
          <div className="col-md-6"><Input label="Company Name *" error={errors.company_name?.message} {...register("company_name")} /></div>
          <div className="col-md-6"><Input label="Contact Number *" error={errors.contact_number?.message} {...register("contact_number")} /></div>
          <div className="col-md-6"><Input label="Email Address *" error={errors.email?.message} {...register("email")} /></div>
        </div>

        <h5 className="form-section-title">Address Information</h5>
        <div className="row g-3 mb-4">
          <div className="col-12"><Input label="Full Address" {...register("address")} /></div>
          <div className="col-md-4"><Input label="City" {...register("city")} /></div>
          <div className="col-md-4"><Input label="State" {...register("state")} /></div>
          <div className="col-md-4"><Input label="Country" {...register("country")} /></div>
        </div>

        <h5 className="form-section-title">Additional Details</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-6"><Input label="GSTIN" error={errors.gstin?.message} {...register("gstin")} placeholder="e.g. 22AAAAA0000A1Z5" /></div>
          <div className="col-md-6">
            <label className="form-label">Department</label>
            <select className="form-select" {...register("department")}>
              <option value="">Select Department...</option>
              {Object.entries(CONTACT_DEPARTMENTS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Contact Status *</label>
            <select className="form-select" {...register("status")}>
              {Object.entries(CONTACT_STATUS_LABEL).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6"><Input label="Tags (comma-separated)" {...register("tags")} /></div>
          <div className="col-12">
            <label className="form-label">Notes</label>
            <textarea className="form-control" rows="3" {...register("notes")} />
          </div>
        </div>
      </form>
    </Modal>
  );
}
