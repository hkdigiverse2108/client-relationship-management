import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';

const WAREHOUSES = [
  "Main Warehouse", "Fulfillment Center A", "Fulfillment Center B", "Dropship Partner"
];

const PLATFORMS = [
  "Amazon", "Flipkart", "Meesho", "Shopify", "WooCommerce", "Myntra", "Ajio", "Warehouse", "Other"
];

const STATUSES = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "out of stock", label: "Out of Stock" }
];

const CATEGORIES = [
  "Electronics", "Clothing", "Home & Kitchen", "Beauty", "Sports"
];

const INITIAL_STATE = {
  product_name: "", sku_code: "", category: "", brand_name: "", image: "", status: "active",
  initial_stock_qty: 0, safety_stock_limit: 0, fulfillment_warehouse: "Main Warehouse",
  cost_price: 0, retail_price: 0, tax: 0, discount: 0, platforms: [], description: ""
};

export default function ProductFormModal({ open, onClose }) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (selected) => {
    setFormData(prev => ({ ...prev, [name]: selected ? selected.value : "" }));
  };

  const handlePlatformChange = (platform) => {
    setFormData(prev => {
      const platforms = prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product form submitted: ", formData);
    onClose();
    setFormData(INITIAL_STATE);
  };

  const getSelectValue = (val, options = []) => {
    if (!val) return null;
    const found = options.find(o => o.value === val || o === val);
    if (found?.value) return found;
    if (found) return { value: found, label: found };
    return { value: val, label: val.charAt(0).toUpperCase() + val.slice(1).replace('_', ' ') };
  };

  const categoryOptions = CATEGORIES.map(c => ({ value: c, label: c }));
  const warehouseOptions = WAREHOUSES.map(w => ({ value: w, label: w }));

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="Create Product" 
      size="lg"
      footer={
        <div className="d-flex align-items-center justify-content-end w-100">
          <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create Product</button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        
        <h6 className="fw-semibold mb-3 text-primary">Basic Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Product Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="product_name" placeholder="e.g. Wireless Headphones" value={formData.product_name} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <label className="form-label">SKU Code <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="sku_code" placeholder="e.g. WH-1001" value={formData.sku_code} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Category <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                options={categoryOptions}
                value={getSelectValue(formData.category, categoryOptions)} 
                onChange={handleSelectChange('category')} 
              />
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Brand Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="brand_name" placeholder="e.g. Sony" value={formData.brand_name} onChange={handleChange} required />
          </div>
          <div className="col-md-5">
            <label className="form-label">Product Image</label>
            <input type="file" className="form-control" accept="image/*" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Status <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                options={STATUSES}
                value={getSelectValue(formData.status, STATUSES)} 
                onChange={handleSelectChange('status')} 
              />
            </div>
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Inventory & Warehousing</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Initial Stock Qty</label>
            <input type="number" className="form-control" name="initial_stock_qty" min="0" value={formData.initial_stock_qty} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Safety Stock Limit</label>
            <input type="number" className="form-control" name="safety_stock_limit" min="0" value={formData.safety_stock_limit} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Fulfillment Warehouse <span className="text-danger">*</span></label>
            <div className="custom-select-wrapper">
              <CustomSelect 
                className="select" 
                options={warehouseOptions}
                value={getSelectValue(formData.fulfillment_warehouse, warehouseOptions)} 
                onChange={handleSelectChange('fulfillment_warehouse')} 
              />
            </div>
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Financials</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Cost Price (₹)</label>
            <input type="number" className="form-control" name="cost_price" min="0" step="0.01" value={formData.cost_price} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Retail Price (₹) <span className="text-danger">*</span></label>
            <input type="number" className="form-control" name="retail_price" min="0" step="0.01" value={formData.retail_price} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Tax (%) <span className="text-danger">*</span></label>
            <input type="number" className="form-control" name="tax" min="0" step="0.01" value={formData.tax} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Discount (₹) <span className="text-danger">*</span></label>
            <input type="number" className="form-control" name="discount" min="0" step="0.01" value={formData.discount} onChange={handleChange} required />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Selling Platforms <span className="text-danger">*</span></h6>
        <div className="mb-4 d-flex flex-wrap gap-3">
          {PLATFORMS.map(platform => (
            <div className="form-check cursor-pointer" key={platform}>
              <input 
                className="form-check-input cursor-pointer" 
                type="checkbox" 
                id={`platform-${platform}`} 
                checked={formData.platforms.includes(platform)}
                onChange={() => handlePlatformChange(platform)}
              />
              <label className="form-check-label cursor-pointer" htmlFor={`platform-${platform}`}>
                {platform}
              </label>
            </div>
          ))}
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Description</h6>
        <div className="row g-3 mb-2">
          <div className="col-md-12">
            <textarea 
              className="form-control" 
              name="description"
              rows="3" 
              placeholder="Enter optional description..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

      </form>
    </Modal>
  );
}
