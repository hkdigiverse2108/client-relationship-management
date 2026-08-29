import React, { useState, useEffect } from "react";
import Modal from "@/components/common/Modal/Modal";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import toast from "react-hot-toast";
import api from "@/api/axiosClient";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function EmployeeForm({ open, onClose, onSuccess, employee }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  
  const [selectedUserId, setSelectedUserId] = useState("custom");
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "sales", // default role
    designation: "",
    department: "",
    joining_date: "",
    manager_id: "",
    attendance_status: "Present",
    gender: "",
    dob: "",
    basic_salary: "",
    hra_allowance: "",
    special_allowances: ""
  });

  useEffect(() => {
    if (open) {
      setErrors({});
      // Fetch users for the dropdowns
      api.get("/users").then((res) => {
        setUsers(res || []);
      }).catch(() => toast.error("Failed to load users"));
      
      if (employee) {
        setSelectedUserId(employee.id);
        setFormData({
          employee_id: employee.employee_id || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
          name: employee.name || "",
          email: employee.email || "",
          password: "", // don't show password for existing
          phone: employee.phone || "",
          role: employee.role || "sales",
          designation: employee.designation || "",
          department: employee.department || "",
          joining_date: employee.joining_date || "",
          manager_id: employee.manager_id || "",
          attendance_status: employee.attendance_status || "Present",
          gender: employee.gender || "",
          dob: employee.dob ? employee.dob.split("T")[0] : "",
          basic_salary: employee.basic_salary || "",
          hra_allowance: employee.hra_allowance || "",
          special_allowances: employee.special_allowances || ""
        });
      } else {
        setSelectedUserId("custom");
        setFormData({
          employee_id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
          name: "",
          email: "",
          password: "",
          phone: "",
          role: "sales",
          designation: "",
          department: "",
          joining_date: new Date().toISOString().split("T")[0],
          manager_id: "",
          attendance_status: "Present",
          gender: "",
          dob: "",
          basic_salary: "",
          hra_allowance: "",
          special_allowances: ""
        });
      }
    }
  }, [open, employee]);

  const handleUserSelect = (e) => {
    const val = e.target.value;
    setSelectedUserId(val);
    if (val !== "custom") {
      const u = users.find(x => x.id === val);
      if (u) {
        setFormData(prev => ({
          ...prev,
          name: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
          role: u.role || "sales",
          designation: u.designation || "",
          department: u.department || "",
          // If they already have an employee ID, use it, else keep the auto-generated one
          employee_id: u.employee_id || prev.employee_id,
          password: u.plain_password || "Password Not Available"
        }));
      }
    } else {
      // Clear specific fields if going back to custom
      setErrors({});
      setFormData(prev => ({
        ...prev, name: "", email: "", phone: "", password: ""
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Full Name is required";
    if (!formData.email?.trim()) newErrors.email = "Email Address is required";
    if (isCustom && !formData.password?.trim()) newErrors.password = "Password is required";
    if (!formData.phone?.trim()) newErrors.phone = "Mobile Number is required";
    if (!formData.designation?.trim()) newErrors.designation = "Designation is required";
    if (!formData.department?.trim()) newErrors.department = "Department is required";
    if (!formData.joining_date) newErrors.joining_date = "Joining Date is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.basic_salary) newErrors.basic_salary = "Basic Salary is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setSubmitting(true);
    
    // Prepare payload
    const payload = { ...formData };
    payload.basic_salary = parseFloat(payload.basic_salary) || 0;
    payload.hra_allowance = parseFloat(payload.hra_allowance) || 0;
    payload.special_allowances = parseFloat(payload.special_allowances) || 0;
    
    // Convert dob back to ISO if needed, or leave as YYYY-MM-DD string
    if (payload.dob) {
      payload.dob = new Date(payload.dob).toISOString();
    }

    try {
      if (employee) {
        // Edit mode (existing employee)
        if (!payload.password) delete payload.password; // don't send empty password
        await api.put(`/users/${employee.id}`, payload);
        toast.success("Employee updated successfully");
      } else {
        // Create mode
        if (selectedUserId !== "custom") {
          // Link existing user to employee
          delete payload.password;
          await api.put(`/users/${selectedUserId}`, payload);
          toast.success("Existing user linked as employee");
        } else {
          // Create brand new user + employee
          if (!payload.password) {
            toast.error("Password is required for new custom employee");
            setSubmitting(false);
            return;
          }
          await api.post("/users", payload);
          toast.success("New employee created successfully");
        }
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.detail || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const isCustom = selectedUserId === "custom";

  return (
    <Modal title={employee ? "Edit Employee" : "Add New Employee"} open={open} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="row g-3">
          
          <div className="col-md-6">
            <Input 
              label="Employee ID" 
              name="employee_id" 
              value={formData.employee_id} 
              disabled 
              readOnly 
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Select User (Optional)</label>
            <select 
              className="form-select" 
              value={selectedUserId} 
              onChange={handleUserSelect}
              disabled={!!employee} // Can't change linked user if editing
            >
              <option value="custom">-- Custom Employee (Create New) --</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <Input 
              label={<>Full Name <span className="text-danger">*</span></>} 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              error={errors.name}
              disabled={!isCustom && !employee} // Can't edit name if linked to existing unless editing
            />
          </div>

          <div className="col-md-6">
            <Input 
              label={<>Email Address <span className="text-danger">*</span></>} 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              error={errors.email}
              disabled={!isCustom} // read-only if existing user
            />
          </div>

          {!employee && (
            <div className="col-md-6 mb-3">
              <label className="form-label">Account Password {isCustom && <span className="text-danger">*</span>}</label>
              <div className="input-group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  disabled={!isCustom}
                />
                <button 
                  className="btn btn-outline-secondary d-flex align-items-center" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
            </div>
          )}

          <div className="col-md-6">
            <Input 
              label={<>Mobile Number <span className="text-danger">*</span></>} 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              error={errors.phone}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">System Role</label>
            <select 
              className="form-select" 
              name="role" 
              value={formData.role} 
              onChange={handleChange}
              disabled={!isCustom && !employee}
            >
              <option value="Super Admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="HR">HR</option>
              <option value="manager">Manager</option>
              <option value="sales">Sales</option>
              <option value="support">Support</option>
            </select>
          </div>

          <div className="col-md-6">
            <Input 
              label={<>Designation (Job Title) <span className="text-danger">*</span></>} 
              name="designation" 
              value={formData.designation} 
              onChange={handleChange} 
              error={errors.designation}
            />
          </div>

          <div className="col-md-6">
            <Input 
              label={<>Department <span className="text-danger">*</span></>} 
              name="department" 
              value={formData.department} 
              onChange={handleChange} 
              error={errors.department}
            />
          </div>

          <div className="col-md-6">
            <Input 
              label={<>Joining Date <span className="text-danger">*</span></>} 
              type="date" 
              name="joining_date" 
              value={formData.joining_date} 
              onChange={handleChange} 
              error={errors.joining_date}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Reporting Manager</label>
            <select className="form-select" name="manager_id" value={formData.manager_id} onChange={handleChange}>
              <option value="">None</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Attendance Status</label>
            <select className="form-select" name="attendance_status" value={formData.attendance_status} onChange={handleChange}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Gender <span className="text-danger">*</span></label>
            <select className={`form-select ${errors.gender ? 'is-invalid' : ''}`} name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
          </div>

          <div className="col-md-6">
            <Input 
              label={<>Date of Birth <span className="text-danger">*</span></>} 
              type="date" 
              name="dob" 
              value={formData.dob} 
              onChange={handleChange} 
              error={errors.dob}
            />
          </div>

          <div className="col-md-4">
            <Input 
              label={<>Basic Salary (₹) <span className="text-danger">*</span></>} 
              type="number" 
              name="basic_salary" 
              value={formData.basic_salary} 
              onChange={handleChange} 
              error={errors.basic_salary}
            />
          </div>

          <div className="col-md-4">
            <Input 
              label="HRA Allowance (₹)" 
              type="number" 
              name="hra_allowance" 
              value={formData.hra_allowance} 
              onChange={handleChange} 
            />
          </div>

          <div className="col-md-4">
            <Input 
              label="Special Allowances (₹)" 
              type="number" 
              name="special_allowances" 
              value={formData.special_allowances} 
              onChange={handleChange} 
            />
          </div>

        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="secondary" type="button" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" loading={submitting}>
            {employee ? "Save Changes" : "Save Employee"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
