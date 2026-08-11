import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import api from "@/api/axiosClient";
import "./ProjectFormModal.css";

const projectSchema = yup.object().shape({
  title: yup.string().required("Project Name is required"),
  client_id: yup.string().required("Client is required"),
  category: yup.string().required("Category is required"),
  priority: yup.string().required("Priority is required"),
  department: yup.string().required("Department is required"),
  start_date: yup.string().nullable(),
  end_date: yup.string().nullable(),
  budget: yup.number().typeError("Budget must be a number").required("Budget is required"),
  project_value: yup.number().typeError("Project Value must be a number").required("Project Value is required"),
  assigned_to: yup.string().required("Assigned To is required"),
  status: yup.string().required("Status is required"),
  stage: yup.string().required("Stage is required"),
  tags: yup.string().nullable(),
  description: yup.string().nullable(),
});

const CATEGORIES = ["Web Development", "App Development", "SEO", "Digital Marketing", "Design", "Consulting", "Other"];
const DEPARTMENTS = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Other"];
const PRIORITIES = ["critical", "high", "medium", "low"];
const STATUSES = {
  active: "Active",
  hold: "On Hold",
  completed: "Completed",
  cancelled: "Cancelled"
};
const STAGES = {
  new: "New",
  in_progress: "In Progress",
  review: "In Review",
  completed: "Completed",
  hold: "On Hold"
};

export default function ProjectFormModal({ open, onClose, onSubmit, initialValues, submitting }) {
  const isEdit = !!(initialValues?.id || initialValues?._id);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(projectSchema),
    defaultValues: initialValues || {
      title: "", client_id: "", category: "Web Development", priority: "medium",
      department: "Engineering", start_date: "", end_date: "",
      budget: "", project_value: "", assigned_to: "", status: "active", stage: "new",
      tags: "", description: ""
    },
  });

  useEffect(() => {
    if (open) {
      if (initialValues) {
        reset(initialValues);
      } else {
        reset({
          title: "", client_id: "", category: "Web Development", priority: "medium",
          department: "Engineering", start_date: "", end_date: "",
          budget: "", project_value: "", assigned_to: "", status: "active", stage: "new",
          tags: "", description: ""
        });
      }
      
      api.get("/users").then((res) => setUsers(res || [])).catch(console.error);
      api.get("/clients").then((res) => setClients(res || [])).catch(console.error);
    }
  }, [open, initialValues, reset]);

  const submit = async (values) => {
    await onSubmit(values);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Project" : "Create New Project"}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(submit)} loading={submitting}>
            {isEdit ? "Save Changes" : "Create Project"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)} noValidate className="project-form-scrollable">
        
        <h5 className="form-section-title">General Details</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <Input label="Project Name *" error={errors.title?.message} {...register("title")} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Client Name *</label>
            <select className={`form-select ${errors.client_id ? 'is-invalid' : ''}`} {...register("client_id")}>
              <option value="">Select Client</option>
              {clients.map(c => <option key={c.id || c._id} value={c.id || c._id}>{c.company_name || c.client_name || c.name || "Unknown Client"}</option>)}
            </select>
            {errors.client_id && <div className="invalid-feedback">{errors.client_id.message}</div>}
          </div>
        </div>

        <h5 className="form-section-title">Classification</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Category *</label>
            <select className={`form-select ${errors.category ? 'is-invalid' : ''}`} {...register("category")}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Department *</label>
            <select className={`form-select ${errors.department ? 'is-invalid' : ''}`} {...register("department")}>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.department && <div className="invalid-feedback">{errors.department.message}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Priority *</label>
            <select className={`form-select ${errors.priority ? 'is-invalid' : ''}`} {...register("priority")}>
              {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
            {errors.priority && <div className="invalid-feedback">{errors.priority.message}</div>}
          </div>
        </div>

        <h5 className="form-section-title">Schedule & Financials</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <Input label="Start Date" type="date" error={errors.start_date?.message} {...register("start_date")} />
          </div>
          <div className="col-md-3">
            <Input label="End Date" type="date" error={errors.end_date?.message} {...register("end_date")} />
          </div>
          <div className="col-md-3">
            <Input label="Budget (₹) *" type="number" error={errors.budget?.message} {...register("budget")} />
          </div>
          <div className="col-md-3">
            <Input label="Project Value (₹) *" type="number" error={errors.project_value?.message} {...register("project_value")} />
          </div>
        </div>

        <h5 className="form-section-title">Management</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Assign To *</label>
            <select className={`form-select ${errors.assigned_to ? 'is-invalid' : ''}`} {...register("assigned_to")}>
              <option value="">Select User</option>
              {users.map(u => <option key={u.id || u._id} value={u.id || u._id}>{u.name} ({u.role})</option>)}
            </select>
            {errors.assigned_to && <div className="invalid-feedback">{errors.assigned_to.message}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Status *</label>
            <select className={`form-select ${errors.status ? 'is-invalid' : ''}`} {...register("status")}>
              {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Stage *</label>
            <select className={`form-select ${errors.stage ? 'is-invalid' : ''}`} {...register("stage")}>
              {Object.entries(STAGES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            {errors.stage && <div className="invalid-feedback">{errors.stage.message}</div>}
          </div>
        </div>

        <h5 className="form-section-title">Additional Info</h5>
        <div className="row g-3 mb-2">
          <div className="col-md-12">
            <Input label="Tags (comma-separated)" placeholder="e.g. Phase 1, High-profile" error={errors.tags?.message} {...register("tags")} />
          </div>
          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="3" {...register("description")}></textarea>
          </div>
        </div>

      </form>
    </Modal>
  );
}
