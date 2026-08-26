import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";

const customerSchema = yup.object().shape({
  name: yup.string().required("Customer name is required"),
  email: yup.string().email("Must be a valid email").nullable(),
  phone: yup.string().nullable(),
  city: yup.string().nullable(),
  state: yup.string().nullable(),
  country: yup.string().nullable(),
  status: yup.string().required("Status is required"),
});

const CITIES = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna",
  "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli",
  "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Prayagraj",
  "Howrah", "Ranchi", "Gwalior", "Jabalpur", "Coimbatore", "Vijayawada", "Jodhpur", "Madurai", "Raipur",
  "Kota", "Chandigarh", "Guwahati", "Solapur", "Hubli-Dharwad", "Bareilly", "Moradabad", "Mysore", "Gurgaon",
  "Noida", "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Warangal", "Guntur", "Jhansi",
  "Nellore", "Jamnagar", "Rajamahendravaram", "Mangalore", "Belgaum", "Tirupur", "Kozhikode", "Thrissur",
  "Kollam", "Kochi", "Gandhinagar", "Dehradun", "Haridwar", "Rishikesh", "Shimla", "Gangtok", "Shillong",
  "Imphal", "Aizawl", "Agartala", "Kohima", "Itanagar", "Panaji"
];

export default function CustomerFormModal({ open, onClose, onSubmit, initialValues, submitting }) {
  const isEdit = !!(initialValues?.id || initialValues?._id);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: initialValues || {
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      country: "",
      status: "Active",
    }
  });

  useEffect(() => {
    if (open) {
      if (initialValues) {
        reset(initialValues);
      } else {
        reset({
          name: "",
          email: "",
          phone: "",
          city: "",
          state: "",
          country: "",
          status: "Active",
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
      title={isEdit ? "Edit Customer" : "New Customer"}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(submit)} loading={submitting}>
            {isEdit ? "Save Changes" : "Create Customer"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)} noValidate>
        
        <h5 className="form-section-title">Customer Details</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-12">
            <Input 
              label="Customer Name *" 
              placeholder="e.g. Rahul Sharma"
              error={errors.name?.message} 
              {...register("name")} 
            />
          </div>
          <div className="col-md-6">
            <Input 
              label="Email" 
              placeholder="e.g. rahul@example.com"
              error={errors.email?.message} 
              {...register("email")} 
            />
          </div>
          <div className="col-md-6">
            <Input 
              label="Phone Number" 
              placeholder="e.g. +91 9876543210"
              error={errors.phone?.message} 
              {...register("phone")} 
            />
          </div>
        </div>

        <h5 className="form-section-title">Location Info</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <Input 
              label="City" 
              placeholder="Type to search city..."
              list="city-list"
              error={errors.city?.message} 
              {...register("city")} 
            />
            <datalist id="city-list">
              {CITIES.map(city => <option key={city} value={city} />)}
            </datalist>
          </div>
          <div className="col-md-4">
            <Input 
              label="State" 
              placeholder="e.g. Maharashtra"
              error={errors.state?.message} 
              {...register("state")} 
            />
          </div>
          <div className="col-md-4">
            <Input 
              label="Country" 
              placeholder="e.g. India"
              error={errors.country?.message} 
              {...register("country")} 
            />
          </div>
        </div>

        <h5 className="form-section-title">Status</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Status *</label>
            <select className={`form-select ${errors.status ? 'is-invalid' : ''}`} {...register("status")}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>
            {errors.status && <div className="invalid-feedback d-block">{errors.status.message}</div>}
          </div>
        </div>

      </form>
    </Modal>
  );
}
