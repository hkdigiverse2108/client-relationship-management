import { useCallback, useMemo, useState } from "react";
import { FiPlus, FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader/PageHeader";
import Button from "@/components/common/Button/Button";
import Table from "@/components/common/Table/Table";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import Badge from "@/components/common/Badge/Badge";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import { productService } from "@/api/services/productService";
import { useAsync } from "@/hooks/useAsync";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBySearch } from "@/utils/helpers";
import { formatCurrency } from "@/utils/formatters";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import { APP_CONFIG } from "@/config/appConfig";
import ProductFormModal from "./ProductFormModal";
import CategoryFormModal from "./CategoryFormModal";
import { categoryService } from "@/api/services/categoryService";
import toast from "react-hot-toast";

export default function ProductsList() {
  const [activeTab, setActiveTab] = useState("products"); // "products" or "categories"

  const [modalOpen, setModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittingCategory, setSubmittingCategory] = useState(false);
  
  const [search, setSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const debounced = useDebounce(search, 250);
  const debouncedCat = useDebounce(categorySearch, 250);

  const load = useCallback(() => productService.list(), []);
  const { data: rawProducts, loading, refetch } = useAsync(load, [], []);
  const products = useMemo(() => rawProducts || [], [rawProducts]);

  const loadCategories = useCallback(() => categoryService.list(), []);
  const { data: rawCategories, loading: categoriesLoading, refetch: refetchCategories } = useAsync(loadCategories, [], []);
  const categories = useMemo(() => rawCategories || [], [rawCategories]);

  const filtered = useMemo(() => {
    let result = products;
    if (debounced) {
      result = filterBySearch(result, debounced, ["product_name", "sku_code", "category", "brand_name"]);
    }
    if (statusFilter !== "all") {
      result = result.filter(p => p.status?.toLowerCase() === statusFilter.toLowerCase());
    }
    return result;
  }, [products, debounced, statusFilter]);

  const filteredCategories = useMemo(() => {
    if (!debouncedCat) return categories;
    return filterBySearch(categories, debouncedCat, ["name"]);
  }, [categories, debouncedCat]);

  const handleCategorySubmit = async (values) => {
    try {
      setSubmittingCategory(true);
      if (editingCategory) {
        const idToUpdate = editingCategory.id || editingCategory._id;
        await categoryService.update(idToUpdate, values);
        toast.success("Category updated successfully!");
      } else {
        await categoryService.create(values);
        toast.success("Category created successfully!");
      }
      setCategoryModalOpen(false);
      setEditingCategory(null);
      refetchCategories();
    } catch (error) {
      console.error("Failed to save category:", error);
      toast.error(error?.message || "Failed to save category");
    } finally {
      setSubmittingCategory(false);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setCategoryModalOpen(true);
  };

  const handleDeleteCategory = async (category) => {
    const ok = await confirmDialog({
      title: "Delete category?",
      text: `Category "${category.name}" will be permanently removed.`,
    });
    if (!ok) return;

    try {
      const idToDelete = category.id || category._id;
      await categoryService.remove(idToDelete);
      toast.success("Category deleted successfully");
      refetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error(error?.message || "Failed to delete category");
    }
  };

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      if (editing) {
        const idToUpdate = editing.id || editing._id;
        await productService.update(idToUpdate, values);
        toast.success("Product updated successfully!");
      } else {
        await productService.create(values);
        toast.success("Product created successfully!");
      }
      setModalOpen(false);
      setEditing(null);
      refetch();
    } catch (error) {
      console.error("Failed to save product:", error);
      toast.error(error?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditing(product);
    setModalOpen(true);
  };

  const handleDelete = async (product) => {
    const ok = await confirmDialog({
      title: "Delete product?",
      text: `Product ${product.product_name} (${product.sku_code}) will be permanently removed.`,
    });
    if (!ok) return;

    try {
      const idToDelete = product.id || product._id;
      await productService.remove(idToDelete);
      toast.success("Product deleted successfully");
      refetch();
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error(error?.message || "Failed to delete product");
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "inactive":
        return <Badge variant="warning">Inactive</Badge>;
      case "out of stock":
        return <Badge variant="danger">Out of Stock</Badge>;
      default:
        return <Badge variant="neutral">{status || "Active"}</Badge>;
    }
  };

  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('/')) return APP_CONFIG.apiBaseUrl.replace('/api/v1', '') + url;
    return url;
  };

  const columns = [
    {
      key: "product",
      label: "Product Info",
      sortable: true,
      render: (r) => (
        <div className="d-flex align-items-center gap-3">
          {r.image ? (
            <img src={getImageUrl(r.image)} alt={r.product_name} style={{ width: 45, height: 45, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} onError={(e) => { e.target.src = 'https://placehold.co/45x45?text=No+Img'; }} />
          ) : (
            <div style={{ width: 45, height: 45, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#aaa' }}>
              No Img
            </div>
          )}
          <div>
            <div style={{ fontWeight: 600 }}>{r.product_name}</div>
            <div className="text-subtle" style={{ fontSize: 12 }}>
              SKU: {r.sku_code} | Brand: {r.brand_name}
            </div>
          </div>
        </div>
      )
    },
    { key: "category", label: "Category", sortable: true },
    {
      key: "inventory",
      label: "Inventory",
      align: "center",
      render: (r) => {
        const qty = Number(r.initial_stock_qty) || 0;
        const limit = Number(r.safety_stock_limit) || 0;
        const isLow = qty > 0 && qty <= limit;
        return (
          <div>
            <div style={{ fontWeight: 500, color: qty === 0 ? 'var(--color-danger)' : (isLow ? 'var(--color-warning)' : 'inherit') }}>
              {qty} in stock
            </div>
          </div>
        );
      }
    },
    { 
      key: "price", 
      label: "Price", 
      sortable: true, 
      align: "right", 
      render: (r) => <div style={{ fontWeight: 600 }}>{formatCurrency(r.retail_price)}</div> 
    },
    { 
      key: "status", 
      label: "Status", 
      sortable: true, 
      align: "center", 
      render: (r) => getStatusBadge(r.status) 
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (r) => (
        <Dropdown
          trigger={({ onClick }) => (
            <button className="btn btn-sm btn-light" onClick={(e) => { e.stopPropagation(); onClick(); }}>
              <FiMoreVertical />
            </button>
          )}
          items={[
            { label: "Edit", icon: FiEdit2, onClick: () => handleEdit(r) },
            { label: "Delete", icon: FiTrash2, danger: true, onClick: () => handleDelete(r) }
          ]}
        />
      )
    }
  ];

  const categoryColumns = [
    { key: "name", label: "Category Name", sortable: true },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (r) => (
        <Dropdown
          trigger={({ onClick }) => (
            <button className="btn btn-sm btn-light" onClick={(e) => { e.stopPropagation(); onClick(); }}>
              <FiMoreVertical />
            </button>
          )}
          items={[
            { label: "Edit", icon: FiEdit2, onClick: () => handleEditCategory(r) },
            { label: "Delete", icon: FiTrash2, danger: true, onClick: () => handleDeleteCategory(r) }
          ]}
        />
      )
    }
  ];

  return (
    <>
      <PageHeader
        title="Products"
        description="Manage your E-Commerce catalog and inventory"
        actions={
          <div className="d-flex gap-2">
            {activeTab === "categories" ? (
              <Button icon={FiPlus} variant="primary" onClick={() => { setEditingCategory(null); setCategoryModalOpen(true); }}>
                Add Category
              </Button>
            ) : (
              <Button icon={FiPlus} variant="primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
                Create Product
              </Button>
            )}
          </div>
        }
      />

      <div className="card mb-3">
        <div className="card-header bg-transparent border-bottom-0 pt-3 pb-0">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "products" ? "active" : ""}`} 
                onClick={() => setActiveTab("products")}
                style={{ cursor: "pointer", fontWeight: activeTab === "products" ? 600 : 400 }}
              >
                Products
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === "categories" ? "active" : ""}`} 
                onClick={() => setActiveTab("categories")}
                style={{ cursor: "pointer", fontWeight: activeTab === "categories" ? 600 : 400 }}
              >
                Categories
              </button>
            </li>
          </ul>
        </div>
        
        <div className="card-body">
          {activeTab === "products" ? (
            <>
              <div className="row g-2 align-items-center mb-3">
                <div className="col-12 col-md-5">
                  <SearchBar 
                    value={search} 
                    onChange={setSearch} 
                    placeholder="Search by name, SKU, category or brand..." 
                  />
                </div>
                <div className="col-8 col-md-3">
                  <select 
                    className="form-select" 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ height: 38 }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="out of stock">Out of Stock</option>
                  </select>
                </div>
                <div className="col-4 col-md-4 text-end d-flex justify-content-end align-items-center gap-2">
                  {(statusFilter !== "all" || search !== "") && (
                    <button 
                      className="btn btn-sm btn-link text-danger p-0 m-0" 
                      onClick={() => {
                        setStatusFilter("all");
                        setSearch("");
                      }}
                      style={{ fontSize: 13, textDecoration: "none", fontWeight: 500 }}
                    >
                      Clear
                    </button>
                  )}
                   <span className="text-muted-2 ms-2" style={{ fontSize: 13 }}>
                    {filtered.length} products
                  </span>
                </div>
              </div>
              <Table columns={columns} data={filtered} loading={loading} />
            </>
          ) : (
            <>
              <div className="row g-2 align-items-center mb-3">
                <div className="col-12 col-md-5">
                  <SearchBar 
                    value={categorySearch} 
                    onChange={setCategorySearch} 
                    placeholder="Search categories..." 
                  />
                </div>
                <div className="col-12 col-md-7 text-end d-flex justify-content-end align-items-center gap-2">
                   <span className="text-muted-2 ms-2" style={{ fontSize: 13 }}>
                    {filteredCategories.length} categories
                  </span>
                </div>
              </div>
              <Table columns={categoryColumns} data={filteredCategories} loading={categoriesLoading} />
            </>
          )}
        </div>
      </div>

      {modalOpen && (
        <ProductFormModal
          open={modalOpen}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          onSubmit={handleSubmit}
          initialValues={editing}
          submitting={submitting}
        />
      )}
      
      {categoryModalOpen && (
        <CategoryFormModal 
          open={categoryModalOpen}
          onClose={() => { setCategoryModalOpen(false); setEditingCategory(null); }}
          onSubmit={handleCategorySubmit}
          submitting={submittingCategory}
          initialValues={editingCategory}
        />
      )}
    </>
  );
}