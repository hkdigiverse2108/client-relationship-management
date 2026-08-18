import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { orderSchema } from "@/utils/validators";
import "./OrderFormModal.css";

const PLATFORMS = [
  "Amazon",
  "Flipkart",
  "Meesho",
  "Shopify",
  "WooCommerce",
  "Myntra",
  "Ajio",
  "Warehouse",
  "Other"
];

const PAYMENT_STATUSES = [
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "failed", label: "Failed" }
];

const ORDER_STATUSES = [
  { value: "processing", label: "Processing" },
  { value: "packed", label: "Packed" },
  { value: "shipped", label: "Shipped" },
  { value: "in transit", label: "In Transit" },
  { value: "out for delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" }
];

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

export default function OrderFormModal({ open, onClose, onSubmit, initialValues, submitting }) {
  const isEdit = !!(initialValues?.id || initialValues?._id);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues: initialValues || {
      product_name: "",
      platform: "Amazon",
      quantity: 1,
      unit_price: "",
      discount: 0,
      tax: 0,
      payment_status: "pending",
      order_status: "processing",
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      destination_city: "",
      destination_state: "",
      destination_country: "",
      description: ""
    }
  });

  useEffect(() => {
    if (open) {
      if (initialValues) {
        reset(initialValues);
      } else {
        reset({
          product_name: "",
          platform: "Amazon",
          quantity: 1,
          unit_price: "",
          discount: 0,
          tax: 0,
          payment_status: "pending",
          order_status: "processing",
          customer_name: "",
          customer_email: "",
          customer_phone: "",
          destination_city: "",
          destination_state: "",
          destination_country: "",
          description: ""
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
      title={isEdit ? "Edit Simulated Order" : "Simulate E-commerce Order"}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(submit)} loading={submitting}>
            {isEdit ? "Save Changes" : "Simulate Order"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)} noValidate className="order-form-scrollable">
        
        <h5 className="form-section-title">Customer & Destination</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <Input 
              label="Customer Name *" 
              placeholder="e.g. Rahul Sharma"
              error={errors.customer_name?.message} 
              {...register("customer_name")} 
            />
          </div>
          <div className="col-md-4">
            <Input 
              label="Email" 
              placeholder="e.g. rahul@example.com"
              error={errors.customer_email?.message} 
              {...register("customer_email")} 
            />
          </div>
          <div className="col-md-4">
            <Input 
              label="Phone Number" 
              placeholder="e.g. +91 9876543210"
              error={errors.customer_phone?.message} 
              {...register("customer_phone")} 
            />
          </div>
          <div className="col-md-4">
            <Input 
              label="Destination City *" 
              placeholder="Type to search city..."
              list="city-list"
              error={errors.destination_city?.message} 
              {...register("destination_city")} 
            />
            <datalist id="city-list">
              {CITIES.map(city => <option key={city} value={city} />)}
            </datalist>
          </div>
          <div className="col-md-4">
            <Input 
              label="State" 
              placeholder="e.g. Maharashtra"
              error={errors.destination_state?.message} 
              {...register("destination_state")} 
            />
          </div>
          <div className="col-md-4">
            <Input 
              label="Country" 
              placeholder="e.g. India"
              error={errors.destination_country?.message} 
              {...register("destination_country")} 
            />
          </div>
        </div>

        <h5 className="form-section-title">Platform & Order Info</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Platform *</label>
            <select className={`form-select ${errors.platform ? 'is-invalid' : ''}`} {...register("platform")}>
              {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.platform && <div className="invalid-feedback d-block">{errors.platform.message}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Payment Status *</label>
            <select className={`form-select ${errors.payment_status ? 'is-invalid' : ''}`} {...register("payment_status")}>
              {PAYMENT_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            {errors.payment_status && <div className="invalid-feedback d-block">{errors.payment_status.message}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Order Status *</label>
            <select className={`form-select ${errors.order_status ? 'is-invalid' : ''}`} {...register("order_status")}>
              {ORDER_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            {errors.order_status && <div className="invalid-feedback d-block">{errors.order_status.message}</div>}
          </div>
        </div>

        <h5 className="form-section-title">Product Details & Pricing</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <Input 
              label="Product Name *" 
              placeholder="e.g. iPhone 15 Pro Max"
              error={errors.product_name?.message} 
              {...register("product_name")} 
            />
          </div>
          <div className="col-md-6">
            <Input 
              label="Quantity *" 
              type="number"
              min="1"
              error={errors.quantity?.message} 
              {...register("quantity")} 
            />
          </div>
          <div className="col-md-4">
            <Input 
              label="Unit Price (₹) *" 
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              error={errors.unit_price?.message} 
              {...register("unit_price")} 
            />
          </div>
          <div className="col-md-4">
            <Input 
              label="Discount (₹) *" 
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              error={errors.discount?.message} 
              {...register("discount")} 
            />
          </div>
          <div className="col-md-4">
            <Input 
              label="Tax (₹) *" 
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              error={errors.tax?.message} 
              {...register("tax")} 
            />
          </div>
        </div>

        <h5 className="form-section-title">Additional Info</h5>
        <div className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Descriptions</label>
            <textarea 
              className="form-control" 
              rows="3" 
              placeholder="Enter optional description or delivery notes..."
              {...register("description")}
            ></textarea>
          </div>
        </div>

      </form>
    </Modal>
  );
}
