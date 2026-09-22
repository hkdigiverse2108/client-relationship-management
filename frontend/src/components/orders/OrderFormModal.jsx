import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';

const PLATFORMS = [
  "Amazon", "Flipkart", "Meesho", "Shopify", "WooCommerce", 
  "Myntra", "Ajio", "Warehouse", "Other"
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

const INITIAL_STATE = {
  customer_name: "", customer_email: "", customer_phone: "",
  destination_city: "", destination_state: "", destination_country: "",
  platform: "Amazon", payment_status: "pending", order_status: "processing",
  product_name: "", quantity: 1, unit_price: "", discount: 0, tax: 0, description: ""
};

export default function OrderFormModal({ open, onClose }) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (selected) => {
    setFormData(prev => ({ ...prev, [name]: selected ? selected.value : "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Simulated order submitted: ", formData);
    onClose();
    // Optional: Reset form on close/submit
    setFormData(INITIAL_STATE);
  };

  const getSelectValue = (val, options = []) => {
    if (!val) return null;
    const found = options.find(o => o.value === val);
    if (found) return found;
    return { value: val, label: val.charAt(0).toUpperCase() + val.slice(1).replace('_', ' ') };
  };

  const platformOptions = PLATFORMS.map(p => ({ value: p, label: p }));

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="Simulate E-commerce Order" 
      size="lg"
      footer={
        <div className="d-flex align-items-center justify-content-end w-100">
          <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Simulate Order</button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        
        <h6 className="fw-semibold mb-3 text-primary">Customer & Destination</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Customer Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="customer_name" placeholder="e.g. Rahul Sharma" value={formData.customer_name} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="customer_email" placeholder="e.g. rahul@example.com" value={formData.customer_email} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Phone Number</label>
            <input type="text" className="form-control" name="customer_phone" placeholder="e.g. +91 9876543210" value={formData.customer_phone} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Destination City <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="destination_city" placeholder="Type to search city..." list="city-list" value={formData.destination_city} onChange={handleChange} required />
            <datalist id="city-list">
              {CITIES.map(city => <option key={city} value={city} />)}
            </datalist>
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input type="text" className="form-control" name="destination_state" placeholder="e.g. Maharashtra" value={formData.destination_state} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Country</label>
            <input type="text" className="form-control" name="destination_country" placeholder="e.g. India" value={formData.destination_country} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Platform & Order Info</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Platform <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                options={platformOptions}
                value={getSelectValue(formData.platform, platformOptions)} 
                onChange={handleSelectChange('platform')} 
              />
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Payment Status <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                options={PAYMENT_STATUSES}
                value={getSelectValue(formData.payment_status, PAYMENT_STATUSES)} 
                onChange={handleSelectChange('payment_status')} 
              />
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Order Status <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                options={ORDER_STATUSES}
                value={getSelectValue(formData.order_status, ORDER_STATUSES)} 
                onChange={handleSelectChange('order_status')} 
              />
            </div>
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Product Details & Pricing</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Product Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="product_name" placeholder="e.g. Wireless Mouse" value={formData.product_name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Quantity <span className="text-danger">*</span></label>
            <input type="number" className="form-control" name="quantity" min="1" value={formData.quantity} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Unit Price (₹) <span className="text-danger">*</span></label>
            <input type="number" className="form-control" name="unit_price" min="0" step="0.01" placeholder="0.00" value={formData.unit_price} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Discount (₹)</label>
            <input type="number" className="form-control" name="discount" min="0" step="0.01" placeholder="0.00" value={formData.discount} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Tax (₹)</label>
            <input type="number" className="form-control" name="tax" min="0" step="0.01" placeholder="0.00" value={formData.tax} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Additional Info</h6>
        <div className="row g-3 mb-2">
          <div className="col-md-12">
            <label className="form-label">Descriptions</label>
            <textarea 
              className="form-control" 
              name="description"
              rows="3" 
              placeholder="Enter optional description or delivery notes..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

      </form>
    </Modal>
  );
}
