import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { clientSchema } from "@/utils/validators";
import { 
  CLIENT_STATUS_LABEL, 
  LEAD_CUSTOMER_TYPES 
} from "@/utils/constants";
import api from "@/api/axiosClient";
import "./ClientFormModal.css";

export default function ClientFormModal({ open, onClose, onSubmit, initialValues, submitting }) {
  const isEdit = !!(initialValues?.id || initialValues?._id);
  const [users, setUsers] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(clientSchema),
    defaultValues: initialValues || {
      client_name: "", company_name: "", contact_person: "",
      mobile_number: "", alternate_number: "", email: "", website: "",
      industry: "", customer_type: "individual", status: "active",
      assigned_to: "", address: "", city: "", state: "", country: "", pincode: "",
      contract_value: "", requirement: "", notes: "", converted_from_lead_id: "Manual"
    },
  });

  useEffect(() => {
    if (open) {
      if (initialValues) {
        reset(initialValues);
      } else {
        reset({
          client_name: "", company_name: "", contact_person: "",
          mobile_number: "", alternate_number: "", email: "", website: "",
          industry: "", customer_type: "individual", status: "active",
          assigned_to: "", address: "", city: "", state: "", country: "", pincode: "",
          contract_value: "", requirement: "", notes: "", converted_from_lead_id: "Manual"
        });
      }
      
      // Fetch users for 'Assign To'
      api.get("/users").then((res) => {
        setUsers(res || []);
      }).catch(err => console.error(err));
    }
  }, [open, initialValues, reset]);

  const submit = async (values) => {
    await onSubmit(values);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Client" : "Create New Client"}
      size="xl"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(submit)} loading={submitting}>
            {isEdit ? "Save Changes" : "Create Client"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)} noValidate className="client-form-scrollable">
        
        <h5 className="form-section-title">Basic Information</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-4"><Input label="Client Name *" error={errors.client_name?.message} {...register("client_name")} /></div>
          <div className="col-md-4"><Input label="Company Name *" error={errors.company_name?.message} {...register("company_name")} /></div>
          <div className="col-md-4"><Input label="Contact Person" error={errors.contact_person?.message} {...register("contact_person")} /></div>
        </div>

        <h5 className="form-section-title">Contact Details</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-3"><Input label="Mobile Number *" error={errors.mobile_number?.message} {...register("mobile_number")} /></div>
          <div className="col-md-3"><Input label="Alternate Number" error={errors.alternate_number?.message} {...register("alternate_number")} /></div>
          <div className="col-md-3"><Input label="Email Address *" type="email" error={errors.email?.message} {...register("email")} /></div>
          <div className="col-md-3"><Input label="Website" error={errors.website?.message} {...register("website")} /></div>
        </div>

        <h5 className="form-section-title">Client Qualification & Assignment</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Client Status *</label>
            <select className={`form-select ${errors.status ? 'is-invalid' : ''}`} {...register("status")}>
              {Object.entries(CLIENT_STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Customer Type</label>
            <select className="form-select" {...register("customer_type")}>
              <option value="">Select Type</option>
              {LEAD_CUSTOMER_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-md-3"><Input label="Industry" error={errors.industry?.message} {...register("industry")} /></div>
          <div className="col-md-3"><Input label="Contract Value (₹)" type="number" error={errors.contract_value?.message} {...register("contract_value")} /></div>
          
          <div className="col-md-4 mt-3">
            <label className="form-label">Account Manager (Assign To) *</label>
            <select className={`form-select ${errors.assigned_to ? 'is-invalid' : ''}`} {...register("assigned_to")}>
              <option value="">Select User</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
            </select>
            {errors.assigned_to && <div className="invalid-feedback">{errors.assigned_to.message}</div>}
          </div>
        </div>

        <h5 className="form-section-title">Address Information</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-12"><Input label="Address" error={errors.address?.message} {...register("address")} /></div>
          <div className="col-md-3"><Input label="City *" error={errors.city?.message} {...register("city")} /></div>
          <div className="col-md-3"><Input label="State *" error={errors.state?.message} {...register("state")} /></div>
          <div className="col-md-3"><Input label="Country *" error={errors.country?.message} {...register("country")} /></div>
          <div className="col-md-3"><Input label="Pincode *" error={errors.pincode?.message} {...register("pincode")} /></div>
        </div>

        <h5 className="form-section-title">Additional Information</h5>
        <div className="row g-3 mb-2">
          <div className="col-md-6">
            <label className="form-label">Client Type</label>
            <div className="form-control" style={{ backgroundColor: '#f8f9fa' }}>
              {isEdit ? (initialValues?.converted_from_lead_id === "Manual" ? "Manually Added" : "Auto Converted from Lead") : "Manually Added"}
            </div>
          </div>
          <div className="col-md-6">
            {isEdit && (
              <>
                <label className="form-label">Created At</label>
                <div className="form-control" style={{ backgroundColor: '#f8f9fa' }}>
                  {initialValues?.created_at ? new Date(initialValues.created_at).toLocaleString() : "—"}
                </div>
              </>
            )}
          </div>
          <div className="col-md-12">
            <label className="form-label">Requirement</label>
            <textarea className="form-control" rows="2" {...register("requirement")}></textarea>
          </div>
          <div className="col-md-12">
            <label className="form-label">Notes</label>
            <textarea className="form-control" rows="2" {...register("notes")}></textarea>
          </div>
        </div>

        {/* Hidden field for Manual flag */}
        <input type="hidden" {...register("converted_from_lead_id")} />

      </form>
    </Modal>
  );
}
