import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { leadSchema } from "@/utils/validators";
import { 
  LEAD_STATUS_LABEL, 
  LEAD_STAGES, 
  LEAD_SOURCES, 
  LEAD_PRIORITIES, 
  LEAD_CUSTOMER_TYPES, 
  LEAD_COMM_CHANNELS, 
  LEAD_FOLLOWUP_STATUSES 
} from "@/utils/constants";
import api from "@/api/axiosClient";
import "./LeadFormModal.css";

export default function LeadFormModal({ open, onClose, onSubmit, initialValues, submitting }) {
  const isEdit = !!(initialValues?.id || initialValues?._id);
  const [users, setUsers] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(leadSchema),
    defaultValues: initialValues || {
      lead_name: "", first_name: "", last_name: "", company_name: "",
      mobile_number: "", alternate_number: "", email: "", website: "",
      industry: "", source: "website", status: "new", stage: "new", priority: "medium",
      tags: "", expected_value: "", probability: "", customer_type: "individual",
      preferred_channel: "Email", next_followup_date: "", followup_status: "scheduled",
      assigned_to: "", city: "", state: "", country: "", pincode: "",
      requirement: "", description: "", notes: ""
    },
  });

  useEffect(() => {
    if (open) {
      if (initialValues) {
        reset(initialValues);
      } else {
        reset({
          lead_name: "", first_name: "", last_name: "", company_name: "",
          mobile_number: "", alternate_number: "", email: "", website: "",
          industry: "", source: "website", status: "new", stage: "new", priority: "medium",
          tags: "", expected_value: "", probability: "", customer_type: "individual",
          preferred_channel: "Email", next_followup_date: "", followup_status: "scheduled",
          assigned_to: "", city: "", state: "", country: "", pincode: "",
          requirement: "", description: "", notes: ""
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
      title={isEdit ? "Edit Lead" : "Create New Lead"}
      size="xl"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(submit)} loading={submitting}>
            {isEdit ? "Save Changes" : "Create Lead"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)} noValidate className="lead-form-scrollable">
        
        <h5 className="form-section-title">Basic Information</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-3"><Input label="Lead Name *" error={errors.lead_name?.message} {...register("lead_name")} /></div>
          <div className="col-md-3"><Input label="First Name *" error={errors.first_name?.message} {...register("first_name")} /></div>
          <div className="col-md-3"><Input label="Last Name *" error={errors.last_name?.message} {...register("last_name")} /></div>
          <div className="col-md-3"><Input label="Company Name *" error={errors.company_name?.message} {...register("company_name")} /></div>
        </div>

        <h5 className="form-section-title">Contact Details</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-3"><Input label="Mobile Number *" error={errors.mobile_number?.message} {...register("mobile_number")} /></div>
          <div className="col-md-3"><Input label="Alternate Number" error={errors.alternate_number?.message} {...register("alternate_number")} /></div>
          <div className="col-md-3"><Input label="Email Address *" type="email" error={errors.email?.message} {...register("email")} /></div>
          <div className="col-md-3"><Input label="Website" error={errors.website?.message} {...register("website")} /></div>
        </div>

        <h5 className="form-section-title">Lead Qualification</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Lead Source *</label>
            <select className={`form-select ${errors.source ? 'is-invalid' : ''}`} {...register("source")}>
              {LEAD_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.source && <div className="invalid-feedback">{errors.source.message}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Lead Status *</label>
            <select className={`form-select ${errors.status ? 'is-invalid' : ''}`} {...register("status")}>
              {Object.entries(LEAD_STATUS_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Lead Stage *</label>
            <select className={`form-select ${errors.stage ? 'is-invalid' : ''}`} {...register("stage")}>
              {LEAD_STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            {errors.stage && <div className="invalid-feedback">{errors.stage.message}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Priority *</label>
            <select className={`form-select ${errors.priority ? 'is-invalid' : ''}`} {...register("priority")}>
              {LEAD_PRIORITIES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.priority && <div className="invalid-feedback">{errors.priority.message}</div>}
          </div>
          
          <div className="col-md-3"><Input label="Industry" error={errors.industry?.message} {...register("industry")} /></div>
          <div className="col-md-3"><Input label="Expected Value (₹) *" type="number" error={errors.expected_value?.message} {...register("expected_value")} /></div>
          <div className="col-md-3"><Input label="Probability (%)" type="number" error={errors.probability?.message} {...register("probability")} /></div>
          <div className="col-md-3">
            <label className="form-label">Customer Type</label>
            <select className="form-select" {...register("customer_type")}>
              {LEAD_CUSTOMER_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <h5 className="form-section-title">Follow-up & Assignment</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Pref. Comm Channel</label>
            <select className="form-select" {...register("preferred_channel")}>
              {LEAD_COMM_CHANNELS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-md-3"><Input label="Next Follow-up Date" type="date" error={errors.next_followup_date?.message} {...register("next_followup_date")} /></div>
          <div className="col-md-3">
            <label className="form-label">Follow-up Status</label>
            <select className="form-select" {...register("followup_status")}>
              {LEAD_FOLLOWUP_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Assign To *</label>
            <select className={`form-select ${errors.assigned_to ? 'is-invalid' : ''}`} {...register("assigned_to")}>
              <option value="">Select User</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
            </select>
            {errors.assigned_to && <div className="invalid-feedback">{errors.assigned_to.message}</div>}
          </div>
          <div className="col-md-12"><Input label="Tags (comma-separated)" placeholder="e.g. VIP, Urgent" error={errors.tags?.message} {...register("tags")} /></div>
        </div>

        <h5 className="form-section-title">Address Information</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-3"><Input label="City *" error={errors.city?.message} {...register("city")} /></div>
          <div className="col-md-3"><Input label="State *" error={errors.state?.message} {...register("state")} /></div>
          <div className="col-md-3"><Input label="Country *" error={errors.country?.message} {...register("country")} /></div>
          <div className="col-md-3"><Input label="Pincode *" error={errors.pincode?.message} {...register("pincode")} /></div>
        </div>

        <h5 className="form-section-title">Additional Information</h5>
        <div className="row g-3 mb-2">
          <div className="col-md-12">
            <label className="form-label">Requirement</label>
            <textarea className="form-control" rows="2" {...register("requirement")}></textarea>
          </div>
          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="2" {...register("description")}></textarea>
          </div>
          <div className="col-md-12">
            <label className="form-label">Notes</label>
            <textarea className="form-control" rows="2" {...register("notes")}></textarea>
          </div>
        </div>

      </form>
    </Modal>
  );
}