import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import ProductFormModal from '../components/products/ProductFormModal';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import ProductsGridView from '../components/products/ProductsGridView';
import { categoriesData } from './categoriesData'; // kept for legacy reference, can remove if unused
import CategoryFormModal from '../components/products/CategoryFormModal';
import CategoriesGridView from '../components/products/CategoriesGridView';
import toast from 'react-hot-toast';
import axiosClient from '../api/axiosClient';
import { APP_CONFIG } from '../config/appConfig';
import FilterBar from '../components/common/FilterBar';

const Products = () => {
  const [viewMode, setViewMode] = useState('list');
  const [activeTab, setActiveTab] = useState('products');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEditProduct, setCurrentEditProduct] = useState(null);
  const [currentEditCategory, setCurrentEditCategory] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, id: null, title: '', type: 'product' });

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryStatusFilter, setCategoryStatusFilter] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/products');
      const fetchedData = res.data?.data || res.data || res || [];
      const prodArray = Array.isArray(fetchedData) ? fetchedData : [];
      setProducts(prodArray);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/categories');
      const fetchedData = res.data?.data || res.data || res || [];
      const catArray = Array.isArray(fetchedData) ? fetchedData : [];
      setCategories(catArray);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Always fetch both so total_products count is accurate and ProductFormModal has dynamic categories
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeTab === 'categories') fetchCategories();
    if (activeTab === 'products') fetchProducts();
  }, [activeTab]);

  const handleSaveCategory = async (formData) => {
    try {
      if (currentEditCategory) {
        await axiosClient.put(`/categories/${currentEditCategory._id}`, formData);
        toast.success('Category updated successfully');
      } else {
        await axiosClient.post('/categories', formData);
        toast.success('Category created successfully');
      }
      fetchCategories();
      setIsCategoryModalOpen(false);
    } catch (error) {
      console.error(error);
      let errorMsg = 'Failed to save category';
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMsg = error.response.data.detail[0]?.msg || 'Validation Error';
        } else {
          errorMsg = error.response.data.detail;
        }
      }
      toast.error(errorMsg);
    }
  };

  const handleEditCategoryClick = (category) => {
    setCurrentEditCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleSaveProduct = async (formData) => {
    try {
      if (currentEditProduct) {
        await axiosClient.put(`/products/${currentEditProduct._id}`, formData);
        toast.success('Product updated successfully');
      } else {
        await axiosClient.post('/products', formData);
        toast.success('Product created successfully');
      }
      fetchProducts();
      setIsProductModalOpen(false);
    } catch (error) {
      console.error(error);
      let errorMsg = 'Failed to save product';
      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          errorMsg = error.response.data.detail[0]?.msg || 'Validation Error';
        } else {
          errorMsg = error.response.data.detail;
        }
      }
      toast.error(errorMsg);
    }
  };

  const handleEditClick = (product) => {
    setCurrentEditProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = async () => {
    if (!confirmDeleteModal.id) return;
    try {
      if (confirmDeleteModal.type === 'product') {
        await axiosClient.delete(`/products/${confirmDeleteModal.id}`);
        toast.success('Product deleted successfully');
        fetchProducts();
      } else if (confirmDeleteModal.type === 'category') {
        await axiosClient.delete(`/categories/${confirmDeleteModal.id}`);
        toast.success('Category deleted successfully');
        fetchCategories();
      }
      setConfirmDeleteModal({ isOpen: false, id: null, title: '', type: 'product', name: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete');
    }
  };

  const hasFilters = startDate || endDate || statusFilter || categoryFilter || brandFilter;
  const hasCategoryFilters = startDate || endDate || categoryStatusFilter;

  const clearFilters = () => {
    setDateRange([null, null]);
    setStatusFilter('');
    setCategoryFilter('');
    setBrandFilter('');
  };

  const clearCategoryFilters = () => {
    setDateRange([null, null]);
    setCategoryStatusFilter('');
  };

  const uniqueBrands = [...new Set(products.map(p => p.brand_name).filter(Boolean))].map(brand => ({ value: brand, label: brand }));

  const filteredProducts = products.filter(p => {
    let match = true;
    if (statusFilter && p.status !== statusFilter) match = false;
    if (categoryFilter && p.category !== categoryFilter) match = false;
    if (brandFilter && p.brand_name !== brandFilter) match = false;
    if (startDate && endDate && p.created_at) {
        const pDate = new Date(p.created_at);
        if (pDate < startDate || pDate > endDate) match = false;
    }
    return match;
  });

  const filteredCategories = categories.filter(c => {
    let match = true;
    if (categoryStatusFilter && c.status !== categoryStatusFilter) match = false;
    if (startDate && endDate && c.created_at) {
        const cDate = new Date(c.created_at);
        if (cDate < startDate || cDate > endDate) match = false;
    }
    return match;
  }).map(c => ({
    ...c,
    total_products: products.filter(p => p.category === c.name).length
  }));

  const productFilterConfig = [
    {
      type: 'date',
      value: dateRange,
      onChange: setDateRange,
      placeholder: 'Select Date Range'
    },
    {
      type: 'select',
      value: categoryFilter,
      onChange: setCategoryFilter,
      options: [{ value: '', label: 'All Categories' }, ...[...new Set(products.map(p => p.category).filter(Boolean))].map(c => ({ value: c, label: c }))]
    },
    {
      type: 'select',
      value: brandFilter,
      onChange: setBrandFilter,
      options: [{ value: '', label: 'All Brands' }, ...uniqueBrands]
    },
    {
      type: 'select',
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: '', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'out of stock', label: 'Out of Stock' }
      ]
    }
  ];

  const categoryFilterConfig = [
    {
      type: 'date',
      value: dateRange,
      onChange: setDateRange,
      placeholder: 'Select Date Range'
    },
    {
      type: 'select',
      value: categoryStatusFilter,
      onChange: setCategoryStatusFilter,
      options: [
        { value: '', label: 'All Status' },
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' }
      ]
    }
  ];

  const columns = [
    {
      name: 'Product Name',
      sortable: true,
      selector: row => row.product_name,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <a 
            href={row.image ? (row.image.startsWith('http') ? row.image : `${new URL(APP_CONFIG.apiBaseUrl).origin}${row.image}`) : '#'} 
            target={row.image ? "_blank" : "_self"} 
            rel="noreferrer"
            className={`avatar avatar-md border avatar-rounded me-2 d-flex align-items-center justify-content-center text-decoration-none ${!row.image ? 'bg-primary text-white fw-semibold' : ''}`}
          >
            {row.image ? (
              <img src={row.image.startsWith('http') ? row.image : `${new URL(APP_CONFIG.apiBaseUrl).origin}${row.image}`} className="img-fluid" alt={row.product_name} />
            ) : (
              <span>{row.product_name?.charAt(0)?.toUpperCase()}</span>
            )}
          </a>
          <h6 className="fw-medium mb-0"><Link to="#">{row.product_name}</Link></h6>
        </div>
      ),
      minWidth: '220px'
    },
    {
      name: 'SKU',
      sortable: true,
      selector: row => row.sku_code,
      cell: (row) => <span className="text-primary fw-semibold">{row.sku_code}</span>,
      minWidth: '120px'
    },
    {
      name: 'Category & Brand',
      sortable: true,
      selector: row => row.category,
      cell: (row) => (
        <div>
          <span className="fs-13 fw-normal text-muted d-block">{row.category}</span>
          <span className="fs-12 fw-normal text-muted d-block mt-1">{row.brand_name}</span>
        </div>
      ),
      minWidth: '180px'
    },
    {
      name: 'Price & Stock',
      sortable: true,
      selector: row => row.retail_price,
      cell: (row) => (
        <div>
          <span className="fs-13 fw-normal text-muted d-block">₹{row.retail_price.toLocaleString()}</span>
          <span className="fs-12 fw-normal text-muted d-block mt-1">{row.initial_stock_qty} in stock</span>
        </div>
      ),
      minWidth: '150px'
    },
    {
      name: 'Variants',
      cell: (row) => {
        if (!row.variants || row.variants.length === 0) return <span className="text-muted fs-12">-</span>;
        return (
          <div className="d-flex flex-column gap-1">
            {row.variants.map((v, i) => (
              <span key={i} className="fs-12 text-muted text-truncate" style={{ maxWidth: '160px' }} title={`${v.name}: ${v.values ? v.values.join(', ') : ''}`}>
                <strong className="text-dark">{v.name}:</strong> {v.values ? v.values.join(', ') : ''}
              </span>
            ))}
          </div>
        );
      },
      minWidth: '180px'
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
      cell: (row) => {
        let badgeClass = "badge-soft-secondary";
        let textClass = "text-secondary";
        if (row.status === "active") {
          badgeClass = "bg-success-transparent";
          textClass = "text-success";
        } else if (row.status === "inactive") {
          badgeClass = "bg-warning-transparent";
          textClass = "text-warning";
        } else if (row.status === "out of stock") {
          badgeClass = "bg-danger-transparent";
          textClass = "text-danger";
        }
        return (
          <span className={`badge ${badgeClass} ${textClass} d-inline-flex align-items-center badge-xs text-capitalize`}>
            <i className="ti ti-point-filled me-1"></i>{row.status}
          </span>
        );
      },
      minWidth: '120px'
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" onClick={(e) => { e.preventDefault(); handleEditClick(row); }}><i className="ti ti-edit"></i></Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); setConfirmDeleteModal({ isOpen: true, id: row._id || row.id, title: 'Delete Product', type: 'product', name: row.product_name }); }}><i className="ti ti-trash"></i></Link>
        </div>
      ),
    },
  ];

  const categoryColumns = [
    {
      name: 'Category Name',
      sortable: true,
      selector: row => row.name,
      cell: (row) => <h6 className="fw-medium mb-0"><Link to="#">{row.name}</Link></h6>,
      minWidth: '220px'
    },
    {
      name: 'Total Products',
      sortable: true,
      selector: row => row.total_products,
      cell: (row) => <span>{row.total_products}</span>,
      minWidth: '150px'
    },
    {
      name: 'Description',
      sortable: true,
      selector: row => row.description,
      cell: (row) => <span className="text-muted line-clamp-2">{row.description || "-"}</span>,
      minWidth: '250px'
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.status,
      cell: (row) => {
        let badgeClass = "badge-soft-secondary";
        let textClass = "text-secondary";
        if (row.status === "Active") {
          badgeClass = "bg-success-transparent";
          textClass = "text-success";
        } else if (row.status === "Inactive") {
          badgeClass = "bg-warning-transparent";
          textClass = "text-warning";
        }
        return (
          <span className={`badge ${badgeClass} ${textClass} d-inline-flex align-items-center badge-xs text-capitalize`}>
            <i className="ti ti-point-filled me-1"></i>{row.status}
          </span>
        );
      },
      minWidth: '120px'
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" onClick={(e) => { e.preventDefault(); handleEditCategoryClick(row); }}><i className="ti ti-edit"></i></Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); setConfirmDeleteModal({ isOpen: true, id: row._id || row.id, title: 'Delete Category', type: 'category', name: row.name }); }}><i className="ti ti-trash"></i></Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">

          {/* Breadcrumb */}
          <PageHeader 
            title="Manage Your E-Commerce Products"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'E-Commerce' },
              { label: activeTab === 'products' ? (viewMode === 'list' ? 'Products List' : 'Products Grid') : (viewMode === 'list' ? 'Categories List' : 'Categories Grid'), active: true }
            ]}
          >
            <div className="me-2 mb-2">
              <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
                <a href="#" onClick={(e) => { e.preventDefault(); setViewMode('list'); }} className={`btn btn-icon btn-sm me-1 ${viewMode === 'list' ? 'active bg-primary text-white' : ''}`}><i className="ti ti-list-tree"></i></a>
                <a href="#" onClick={(e) => { e.preventDefault(); setViewMode('grid'); }} className={`btn btn-icon btn-sm ${viewMode === 'grid' ? 'active bg-primary text-white' : ''}`}><i className="ti ti-layout-grid"></i></a>
              </div>
            </div>
            
            <div className="mb-2 d-flex gap-2">
              {activeTab === 'products' ? (
                <a href="#" onClick={(e) => { e.preventDefault(); setIsProductModalOpen(true); }} className="btn btn-primary d-flex align-items-center"><i className="ti ti-circle-plus me-2"></i>Create Product</a>
              ) : (
                <a href="#" onClick={(e) => { e.preventDefault(); setIsCategoryModalOpen(true); }} className="btn btn-primary d-flex align-items-center"><i className="ti ti-circle-plus me-2"></i>Create Category</a>
              )}
            </div>
            
          </PageHeader>
          {/* /Breadcrumb */}

          <div className="bg-white rounded mb-4">
            <ul className="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap" role="tablist">
              <li className="nav-item" role="presentation">
                <a className={`nav-link fw-medium d-flex align-items-center justify-content-center ${activeTab === 'products' ? 'active' : ''}`}
                  href="#bottom-justified-tab1" data-bs-toggle="tab" aria-selected={activeTab === 'products'} role="tab"
                  onClick={() => setActiveTab('products')}>
                  <i className="ti ti-box me-1"></i>
                  Products
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className={`nav-link fw-medium d-flex align-items-center justify-content-center ${activeTab === 'categories' ? 'active' : ''}`}
                  href="#bottom-justified-tab2" data-bs-toggle="tab" aria-selected={activeTab === 'categories'} role="tab"
                  onClick={() => setActiveTab('categories')}>
                  <i className="ti ti-category me-1"></i>
                  Categories
                </a>
              </li>
            </ul>
          </div>

          <div className="tab-content">
            {/* Products Tab */}
            <div className={`tab-pane ${activeTab === 'products' ? 'show active' : ''}`} id="bottom-justified-tab1" role="tabpanel">
              {/* Products List/Grid */}
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h5>{viewMode === 'list' ? 'Products List' : 'Products Grid'}</h5>
                  <FilterBar 
                    filters={productFilterConfig} 
                    onClear={clearFilters} 
                    hasActiveFilters={hasFilters} 
                  />
                </div>
                <div className="card-body p-0">
                  {viewMode === 'list' ? (
                    <div className="custom-datatable-filter table-responsive">
                      <CustomDataTable columns={columns} data={filteredProducts} />
                    </div>
                  ) : (
                    <div className="p-3">
                      <ProductsGridView 
                        products={filteredProducts} 
                        onEditClick={handleEditClick} 
                        onDeleteClick={(p) => setConfirmDeleteModal({ isOpen: true, id: p._id || p.id, title: 'Delete Product', type: 'product', name: p.product_name })} 
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Categories Tab */}
            <div className={`tab-pane ${activeTab === 'categories' ? 'show active' : ''}`} id="bottom-justified-tab2" role="tabpanel">
              {/* Categories List/Grid */}
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h5>{viewMode === 'list' ? 'Categories List' : 'Categories Grid'}</h5>
                  <FilterBar 
                    filters={categoryFilterConfig} 
                    onClear={clearCategoryFilters} 
                    hasActiveFilters={hasCategoryFilters} 
                  />
                </div>
                <div className="card-body p-0">
                  {viewMode === 'list' ? (
                    <div className="custom-datatable-filter table-responsive">
                      <CustomDataTable columns={categoryColumns} data={filteredCategories} />
                    </div>
                  ) : (
                    <div className="p-3">
                      <CategoriesGridView 
                        categories={filteredCategories} 
                        onEditClick={handleEditCategoryClick}
                        onDeleteClick={(c) => setConfirmDeleteModal({ isOpen: true, id: c._id || c.id, title: 'Delete Category', type: 'category', name: c.name })}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ProductFormModal 
        open={isProductModalOpen} 
        onClose={() => { setIsProductModalOpen(false); setCurrentEditProduct(null); }} 
        onSave={handleSaveProduct}
        initialData={currentEditProduct}
        categories={categories}
      />
      <CategoryFormModal 
        open={isCategoryModalOpen} 
        onClose={() => { setIsCategoryModalOpen(false); setCurrentEditCategory(null); }} 
        onSave={handleSaveCategory}
        initialData={currentEditCategory}
      />
      
      {/* Delete Confirmation Modal */}
      {confirmDeleteModal.isOpen && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{confirmDeleteModal.title}</h5>
                <button type="button" className="btn-close" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '', type: 'product', name: '' })} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center py-4">
                <i className="ti ti-alert-circle text-danger mb-3" style={{ fontSize: '48px' }}></i>
                <h5 className="mb-2">Are you sure?</h5>
                <p className="text-muted mb-0">
                  Do you really want to delete <strong>{confirmDeleteModal.name || `this ${confirmDeleteModal.type}`}</strong>? This process cannot be undone.
                </p>
              </div>
              <div className="modal-footer justify-content-center border-0 pt-0">
                <button className="btn btn-light px-4" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '', type: 'product', name: '' })}>Cancel</button>
                <button className="btn btn-danger px-4" onClick={handleDeleteProduct}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
