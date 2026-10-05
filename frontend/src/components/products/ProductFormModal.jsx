import React, { useState } from 'react';
import Modal from '../common/Modal';
import CustomSelect from '../common/CustomSelect';
import axiosClient from '../../api/axiosClient';
import { APP_CONFIG } from '../../config/appConfig';
import { toast } from 'react-hot-toast';

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


const INITIAL_STATE = {
  product_name: "", sku_code: "", category: "", brand_name: "", image: "", status: "active",
  initial_stock_qty: "", safety_stock_limit: "", fulfillment_warehouse: "Main Warehouse",
  cost_price: "", retail_price: "", tax: "", discount: "", platforms: [], description: "", variants: []
};

export default function ProductFormModal({ open, onClose, onSave, initialData, categories = [] }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (open) {
      if (initialData) {
        const data = { ...INITIAL_STATE, ...initialData };
        if (data.variants && Array.isArray(data.variants)) {
          data.variants = data.variants.map(v => ({
            ...v,
            valuesString: Array.isArray(v.values) ? v.values.join(', ') : (v.values || "")
          }));
        }
        setFormData(data);
      } else {
        setFormData(INITIAL_STATE);
      }
      setErrors({});
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate 18% tax when retail_price changes
      if (name === 'retail_price') {
        const price = Number(updated.retail_price) || 0;
        updated.tax = (price * 0.18).toFixed(2);
      }
      
      return updated;
    });
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectChange = (name) => (selected) => {
    setFormData(prev => ({ ...prev, [name]: selected ? selected.value : "" }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handlePlatformChange = (platform) => {
    setFormData(prev => {
      const platforms = prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms };
    });
    if (errors.platforms) {
      setErrors(prev => ({ ...prev, platforms: null }));
    }
  };

  const handleAddVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { name: "", values: [], valuesString: "" }]
    }));
  };

  const handleRemoveVariant = (index) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setFormData(prev => {
      const newVariants = [...prev.variants];
      if (field === 'values') {
        newVariants[index].valuesString = value;
        newVariants[index].values = value.split(',').map(v => v.trim()).filter(Boolean);
      } else {
        newVariants[index][field] = value;
      }
      return { ...prev, variants: newVariants };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const uploadData = new FormData();
    uploadData.append('file', file);
    
    try {
      const res = await axiosClient.post('/products/upload-image', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, image: res.url || res.data?.url || "" }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.product_name) newErrors.product_name = "Product Name is required";
    if (!formData.sku_code) newErrors.sku_code = "SKU Code is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.brand_name) newErrors.brand_name = "Brand Name is required";
    if (!formData.fulfillment_warehouse) newErrors.fulfillment_warehouse = "Fulfillment is required";
    if (!formData.cost_price && formData.cost_price !== 0) newErrors.cost_price = "Cost Price is required";
    if (!formData.retail_price && formData.retail_price !== 0) newErrors.retail_price = "Retail Price is required";
    if (!formData.platforms || formData.platforms.length === 0) newErrors.platforms = "At least one Platform is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (onSave) {
        const dataToSave = { ...formData };
        dataToSave.initial_stock_qty = Number(dataToSave.initial_stock_qty) || 0;
        dataToSave.safety_stock_limit = Number(dataToSave.safety_stock_limit) || 0;
        dataToSave.cost_price = Number(dataToSave.cost_price) || 0;
        dataToSave.retail_price = Number(dataToSave.retail_price) || 0;
        dataToSave.tax = Number(dataToSave.tax) || 0;
        dataToSave.discount = Number(dataToSave.discount) || 0;
        onSave(dataToSave);
      }
      onClose();
    }
  };

  const getSelectValue = (val, options = []) => {
    if (!val) return null;
    const found = options.find(o => o.value === val || o === val);
    if (found?.value) return found;
    if (found) return { value: found, label: found };
    return { value: val, label: val.charAt(0).toUpperCase() + val.slice(1).replace('_', ' ') };
  };

  // Build category options from DB-backed categories prop (only Active ones)
  const categoryOptions = categories
    .filter(c => c.status !== 'Inactive')
    .map(c => ({ value: c.name, label: c.name }));
  const warehouseOptions = WAREHOUSES.map(w => ({ value: w, label: w }));

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title={initialData ? "Edit Product" : "Create Product"} 
      size="lg"
      footer={
        <div className="d-flex align-items-center justify-content-end w-100">
          <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            {initialData ? "Update Product" : "Create Product"}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        
        <h6 className="fw-semibold mb-3 text-primary">Basic Information</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label">Product Name <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.product_name ? 'is-invalid' : ''}`} name="product_name" placeholder="e.g. Wireless Headphones" value={formData.product_name} onChange={handleChange} />
            {errors.product_name && <div className="invalid-feedback">{errors.product_name}</div>}
          </div>
          <div className="col-md-2">
            <label className="form-label">SKU Code <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.sku_code ? 'is-invalid' : ''}`} name="sku_code" placeholder="e.g. WH-1001" value={formData.sku_code} onChange={handleChange} />
            {errors.sku_code && <div className="invalid-feedback">{errors.sku_code}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Category <span className="text-danger">*</span></label>
            <div className={`custom-select-wrapper ${errors.category ? 'is-invalid' : ''}`}>
              <CustomSelect 
                className={`select ${errors.category ? 'is-invalid' : ''}`}
                options={categoryOptions}
                value={getSelectValue(formData.category, categoryOptions)} 
                onChange={handleSelectChange('category')} 
              />
            </div>
            {errors.category && <div className="invalid-feedback d-block">{errors.category}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label">Brand Name <span className="text-danger">*</span></label>
            <input type="text" className={`form-control ${errors.brand_name ? 'is-invalid' : ''}`} name="brand_name" placeholder="e.g. Sony" value={formData.brand_name} onChange={handleChange} />
            {errors.brand_name && <div className="invalid-feedback">{errors.brand_name}</div>}
          </div>
          <div className="col-md-5">
            <label className="form-label">Product Image</label>
            <div className="input-group">
              <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} />
              {formData.image && (
                <span className="input-group-text p-1" title={formData.image.split('/').pop()} style={{ cursor: 'help' }}>
                  <img src={formData.image.startsWith('http') ? formData.image : `${new URL(APP_CONFIG.apiBaseUrl).origin}${formData.image}`} alt="Preview" className="rounded" style={{ height: '30px', width: '30px', objectFit: 'cover' }} />
                </span>
              )}
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">Status</label>
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
            <div className={`custom-select-wrapper ${errors.fulfillment_warehouse ? 'is-invalid' : ''}`}>
              <CustomSelect 
                className={`select ${errors.fulfillment_warehouse ? 'is-invalid' : ''}`}
                options={warehouseOptions}
                value={getSelectValue(formData.fulfillment_warehouse, warehouseOptions)} 
                onChange={handleSelectChange('fulfillment_warehouse')} 
              />
            </div>
            {errors.fulfillment_warehouse && <div className="invalid-feedback d-block">{errors.fulfillment_warehouse}</div>}
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Financials</h6>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Cost Price (₹) <span className="text-danger">*</span></label>
            <input type="number" className={`form-control ${errors.cost_price ? 'is-invalid' : ''}`} name="cost_price" min="0" step="0.01" value={formData.cost_price} onChange={handleChange} />
            {errors.cost_price && <div className="invalid-feedback">{errors.cost_price}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Retail Price (₹) <span className="text-danger">*</span></label>
            <input type="number" className={`form-control ${errors.retail_price ? 'is-invalid' : ''}`} name="retail_price" min="0" step="0.01" value={formData.retail_price} onChange={handleChange} />
            {errors.retail_price && <div className="invalid-feedback">{errors.retail_price}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Tax (%)</label>
            <input type="number" className="form-control" name="tax" min="0" step="0.01" value={formData.tax} onChange={handleChange} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Discount (₹)</label>
            <input type="number" className="form-control" name="discount" min="0" step="0.01" value={formData.discount} onChange={handleChange} />
          </div>
        </div>

        <h6 className="fw-semibold mb-3 text-primary">Selling Platforms <span className="text-danger">*</span></h6>
        <div className={`mb-4 d-flex flex-wrap gap-3 ${errors.platforms ? 'is-invalid border border-danger p-2 rounded' : ''}`}>
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
        {errors.platforms && <div className="invalid-feedback d-block mt-[-1rem] mb-4">{errors.platforms}</div>}

        <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
          <h6 className="fw-semibold text-primary mb-0">Product Variants</h6>
          <button type="button" className="btn btn-sm btn-primary-light" onClick={handleAddVariant}>
            <i className="ti ti-plus me-1"></i> Add Variant
          </button>
        </div>
        {formData.variants.length > 0 ? (
          <div className="mb-4 bg-light p-3 rounded">
            {formData.variants.map((variant, index) => (
              <div className="row g-2 align-items-end mb-3" key={index}>
                <div className="col-md-4">
                  <label className="form-label fs-12 text-muted mb-1">Variant Type (e.g., Size, Color)</label>
                  <input type="text" className="form-control" placeholder="Type" value={variant.name} onChange={(e) => handleVariantChange(index, 'name', e.target.value)} />
                </div>
                <div className="col-md-7">
                  <label className="form-label fs-12 text-muted mb-1">Options (comma separated)</label>
                  <input type="text" className="form-control" placeholder="e.g., Small, Medium, Large" value={variant.valuesString !== undefined ? variant.valuesString : (variant.values ? variant.values.join(', ') : '')} onChange={(e) => handleVariantChange(index, 'values', e.target.value)} />
                </div>
                <div className="col-md-1 text-end">
                  <button type="button" className="btn btn-icon btn-danger-light" onClick={() => handleRemoveVariant(index)}>
                    <i className="ti ti-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted fs-13 mb-4 bg-light p-3 rounded text-center border-dashed">
            No variants added. Click 'Add Variant' to create product options.
          </div>
        )}

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
