import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { productSchema } from "@/utils/validators";
import { productService } from "@/api/services/productService";
import { APP_CONFIG } from "@/config/appConfig";
import { categoryService } from "@/api/services/categoryService";
import { useAsync } from "@/hooks/useAsync";
import toast from "react-hot-toast";
import "./ProductFormModal.css";

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

export default function ProductFormModal({ open, onClose, onSubmit, initialValues, submitting }) {
  const isEdit = !!(initialValues?.id || initialValues?._id);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { data: rawCategories } = useAsync(() => categoryService.list(), [], []);
  const categoryOptions = (rawCategories || []).map(c => c.name);

  const { register, control, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: initialValues || {
      product_name: "",
      sku_code: "",
      category: "",
      brand_name: "",
      image: "",
      status: "active",
      initial_stock_qty: 0,
      safety_stock_limit: 0,
      cost_price: 0,
      retail_price: 0,
      tax: 0,
      discount: 0,
      fulfillment_warehouse: "Main Warehouse",
      platforms: [],
      variants: [],
      description: ""
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants"
  });

  const platformsWatch = watch("platforms") || [];

  useEffect(() => {
    if (open) {
      if (initialValues) {
        const transformed = {
           ...initialValues,
           variants: (initialValues.variants || []).map(v => ({
             name: v.name,
             value: Array.isArray(v.values) ? v.values.join(", ") : (v.values || "")
           }))
        };
        reset(transformed);
      } else {
        reset({
          product_name: "",
          sku_code: "",
          category: "",
          brand_name: "",
          image: "",
          status: "active",
          initial_stock_qty: 0,
          safety_stock_limit: 0,
          cost_price: 0,
          retail_price: 0,
          tax: 0,
          discount: 0,
          fulfillment_warehouse: "Main Warehouse",
          platforms: [],
          variants: [],
          description: ""
        });
      }
    }
  }, [open, initialValues, reset]);

  const handlePlatformChange = (platform) => {
    const newPlatforms = platformsWatch.includes(platform)
      ? platformsWatch.filter(p => p !== platform)
      : [...platformsWatch, platform];
    setValue("platforms", newPlatforms, { shouldValidate: true });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const res = await productService.uploadImage(file);
      setValue("image", res.url, { shouldValidate: true });
      toast.success("Image uploaded!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err?.message || "Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const submit = async (values) => {
    const transformedValues = {
      ...values,
      variants: values.variants.map(v => ({
        name: v.name,
        values: v.value.split(",").map(s => s.trim()).filter(Boolean)
      }))
    };
    await onSubmit(transformedValues);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Product" : "Create Product"}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(submit)} loading={submitting}>
            {isEdit ? "Save Changes" : "Create Product"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)} noValidate className="product-form-scrollable">
        
        <h5 className="form-section-title">Basic Information</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <Input 
              label="Product Name *" 
              placeholder="e.g. Wireless Headphones"
              error={errors.product_name?.message} 
              {...register("product_name")} 
            />
          </div>
          <div className="col-md-2">
            <Input 
              label="SKU Code *" 
              placeholder="e.g. WH-1001"
              error={errors.sku_code?.message} 
              {...register("sku_code")} 
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Category *</label>
            <select className={`form-select ${errors.category ? "is-invalid" : ""}`} {...register("category")}>
              <option value="">Select Category</option>
              {categoryOptions.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
          </div>
          
          <div className="col-md-4">
            <Input 
              label="Brand Name *" 
              placeholder="e.g. Sony"
              error={errors.brand_name?.message} 
              {...register("brand_name")} 
            />
          </div>
          <div className="col-md-5">
            <label className="form-label">Product Image *</label>
            <div className="d-flex gap-2">
              <input 
                type="file" 
                accept="image/*" 
                className="form-control" 
                onChange={handleImageUpload}
                disabled={uploadingImage}
              />
              {watch("image") && (
                <div style={{ width: 38, height: 38, flexShrink: 0, border: '1px solid #ddd', borderRadius: 4, overflow: 'hidden' }}>
                  <img 
                    src={watch("image").startsWith('/') ? APP_CONFIG.apiBaseUrl.replace('/api/v1', '') + watch("image") : watch("image")} 
                    alt="preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              )}
            </div>
            {uploadingImage && <div className="form-text text-primary" style={{ fontSize: 13 }}>Uploading...</div>}
            <input type="hidden" {...register("image")} />
            {errors.image && <div className="text-danger mt-1" style={{ fontSize: 13 }}>{errors.image.message}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Status *</label>
            <select className={`form-select ${errors.status ? 'is-invalid' : ''}`} {...register("status")}>
              {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            {errors.status && <div className="invalid-feedback d-block">{errors.status.message}</div>}
          </div>
        </div>

        <h5 className="form-section-title">Inventory & Warehousing</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <Input 
              label="Initial Stock Qty" 
              type="number"
              min="0"
              error={errors.initial_stock_qty?.message} 
              {...register("initial_stock_qty")} 
            />
          </div>
          <div className="col-md-4">
            <Input 
              label="Safety Stock Limit" 
              type="number"
              min="0"
              error={errors.safety_stock_limit?.message} 
              {...register("safety_stock_limit")} 
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Fulfillment Warehouse *</label>
            <select className={`form-select ${errors.fulfillment_warehouse ? 'is-invalid' : ''}`} {...register("fulfillment_warehouse")}>
              {WAREHOUSES.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
            {errors.fulfillment_warehouse && <div className="invalid-feedback d-block">{errors.fulfillment_warehouse.message}</div>}
          </div>
        </div>

        <h5 className="form-section-title">Financials</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <Input 
              label="Cost Price (₹)" 
              type="number"
              min="0"
              step="0.01"
              error={errors.cost_price?.message} 
              {...register("cost_price")} 
            />
          </div>
          <div className="col-md-3">
            <Input 
              label="Retail Price (₹) *" 
              type="number"
              min="0"
              step="0.01"
              error={errors.retail_price?.message} 
              {...register("retail_price")} 
            />
          </div>
          <div className="col-md-3">
            <Input 
              label="Tax (%) *" 
              type="number"
              min="0"
              step="0.01"
              error={errors.tax?.message} 
              {...register("tax")} 
            />
          </div>
          <div className="col-md-3">
            <Input 
              label="Discount (₹) *" 
              type="number"
              min="0"
              step="0.01"
              error={errors.discount?.message} 
              {...register("discount")} 
            />
          </div>
        </div>

        <h5 className="form-section-title">Selling Platforms *</h5>
        <div className="mb-4">
          <div className="platform-checkboxes">
            {PLATFORMS.map(platform => (
              <label key={platform} className="platform-checkbox cursor-pointer">
                <input 
                  type="checkbox"
                  className="form-check-input mt-0"
                  checked={platformsWatch.includes(platform)}
                  onChange={() => handlePlatformChange(platform)}
                />
                <span style={{ fontSize: 14 }}>{platform}</span>
              </label>
            ))}
          </div>
          {errors.platforms && <div className="text-danger mt-1" style={{ fontSize: 13 }}>{errors.platforms.message}</div>}
        </div>

        <h5 className="form-section-title d-flex justify-content-between align-items-center">
          <span>Variants</span>
          <Button variant="outline-primary" size="sm" icon={FiPlus} onClick={(e) => { e.preventDefault(); append({ name: "", value: "" }); }}>
            Add Variant
          </Button>
        </h5>
        <div className="mb-4">
          {fields.length === 0 ? (
            <div className="text-muted text-center p-3 border rounded" style={{ fontSize: 14 }}>
              No variants added. Click "Add Variant" to define options like Color, Size, etc.
            </div>
          ) : (
            fields.map((field, index) => (
              <div key={field.id} className="row g-2 mb-2 align-items-end">
                <div className="col-md-5">
                  <Input 
                    label={index === 0 ? "Variant Name (e.g. Color)" : ""} 
                    placeholder="Variant Name"
                    {...register(`variants.${index}.name`, { required: "Name is required" })} 
                    error={errors.variants?.[index]?.name?.message}
                  />
                </div>
                <div className="col-md-6">
                  <Input 
                    label={index === 0 ? "Value (e.g. Red, Blue)" : ""} 
                    placeholder="Comma separated values"
                    {...register(`variants.${index}.value`, { required: "Value is required" })} 
                    error={errors.variants?.[index]?.value?.message}
                  />
                </div>
                <div className="col-md-1 mb-3 d-flex justify-content-center">
                  <button 
                    type="button" 
                    className="btn btn-link text-danger p-2 border-0" 
                    onClick={() => remove(index)}
                    title="Remove Variant"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <h5 className="form-section-title">Descriptions</h5>
        <div className="row g-3">
          <div className="col-md-12">
            <textarea 
              className="form-control" 
              rows="4" 
              placeholder="Detailed product description..."
              {...register("description")}
            ></textarea>
          </div>
        </div>

      </form>
    </Modal>
  );
}
