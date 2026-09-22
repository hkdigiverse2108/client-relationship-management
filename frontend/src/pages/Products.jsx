import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import { productsData } from './productsData';
import ProductFormModal from '../components/products/ProductFormModal';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import ProductsGridView from '../components/products/ProductsGridView';
import { categoriesData } from './categoriesData';
import CategoryFormModal from '../components/products/CategoryFormModal';
import CategoriesGridView from '../components/products/CategoriesGridView';

const Products = () => {
  const [viewMode, setViewMode] = useState('list');
  const [activeTab, setActiveTab] = useState('products');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categoryStatusFilter, setCategoryStatusFilter] = useState('');

  const hasFilters = startDate || endDate || statusFilter || categoryFilter;
  const hasCategoryFilters = startDate || endDate || categoryStatusFilter;

  const clearFilters = () => {
    setDateRange([null, null]);
    setStatusFilter('');
    setCategoryFilter('');
  };

  const clearCategoryFilters = () => {
    setDateRange([null, null]);
    setCategoryStatusFilter('');
  };

  const columns = [
    {
      name: 'Product Name',
      sortable: true,
      selector: row => row.product_name,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-md border avatar-rounded me-2">
            <img src={row.image} className="img-fluid" alt="img" />
          </Link>
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
          <Link to="#" className="me-2" data-bs-toggle="modal" data-bs-target="#edit_product"><i className="ti ti-edit"></i></Link>
          <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash"></i></Link>
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
      cell: (row) => <span className="text-muted line-clamp-2">{row.description}</span>,
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
          <Link to="#" className="me-2" data-bs-toggle="modal" data-bs-target="#edit_category"><i className="ti ti-edit"></i></Link>
          <Link to="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash"></i></Link>
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
            <div className="tab-pane show active" id="bottom-justified-tab1" role="tabpanel">
              {/* Products List/Grid */}
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h5>{viewMode === 'list' ? 'Products List' : 'Products Grid'}</h5>
                  <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                    <div className="me-3" style={{ minWidth: '220px' }}>
                      <CustomDatePicker 
                        isRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => setDateRange(update)}
                        placeholderText="Select Date Range"
                      />
                    </div>
                    <div className="me-3 custom-select-wrapper" style={{ width: '150px' }}>
                      <CustomSelect 
                        options={[
                          { value: '', label: 'All Categories' },
                          { value: 'Electronics', label: 'Electronics' },
                          { value: 'Clothing', label: 'Clothing' },
                          { value: 'Sports', label: 'Sports' }
                        ]}
                        value={categoryFilter ? { value: categoryFilter, label: categoryFilter } : { value: '', label: 'All Categories' }}
                        onChange={(selected) => setCategoryFilter(selected ? selected.value : '')}
                      />
                    </div>
                    <div className="custom-select-wrapper" style={{ width: '140px' }}>
                      <CustomSelect 
                        options={[
                          { value: '', label: 'All Status' },
                          { value: 'active', label: 'Active' },
                          { value: 'inactive', label: 'Inactive' },
                          { value: 'out of stock', label: 'Out of Stock' }
                        ]}
                        value={statusFilter ? { value: statusFilter, label: statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1) } : { value: '', label: 'All Status' }}
                        onChange={(selected) => setStatusFilter(selected ? selected.value : '')}
                      />
                    </div>
                    {hasFilters ? (
                      <div className="ms-2">
                        <button className="btn btn-outline-danger btn-sm d-flex align-items-center" onClick={clearFilters}>
                          <i className="ti ti-x me-1"></i>Clear
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="card-body p-0">
                  {viewMode === 'list' ? (
                    <div className="custom-datatable-filter table-responsive">
                      <CustomDataTable columns={columns} data={productsData} />
                    </div>
                  ) : (
                    <div className="p-3">
                      <ProductsGridView />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="tab-pane" id="bottom-justified-tab2" role="tabpanel">
              {/* Categories List/Grid */}
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h5>{viewMode === 'list' ? 'Categories List' : 'Categories Grid'}</h5>
                  <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                    <div className="me-3" style={{ minWidth: '220px' }}>
                      <CustomDatePicker 
                        isRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => setDateRange(update)}
                        placeholderText="Select Date Range"
                      />
                    </div>
                    <div className="custom-select-wrapper" style={{ width: '140px' }}>
                      <CustomSelect 
                        options={[
                          { value: '', label: 'All Status' },
                          { value: 'Active', label: 'Active' },
                          { value: 'Inactive', label: 'Inactive' }
                        ]}
                        value={categoryStatusFilter ? { value: categoryStatusFilter, label: categoryStatusFilter } : { value: '', label: 'All Status' }}
                        onChange={(selected) => setCategoryStatusFilter(selected ? selected.value : '')}
                      />
                    </div>
                    {hasCategoryFilters ? (
                      <div className="ms-2">
                        <button className="btn btn-outline-danger btn-sm d-flex align-items-center" onClick={clearCategoryFilters}>
                          <i className="ti ti-x me-1"></i>Clear
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="card-body p-0">
                  {viewMode === 'list' ? (
                    <div className="custom-datatable-filter table-responsive">
                      <CustomDataTable columns={categoryColumns} data={categoriesData} />
                    </div>
                  ) : (
                    <div className="p-3">
                      <CategoriesGridView />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <ProductFormModal open={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} />
      <CategoryFormModal open={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} />
    </>
  );
};

export default Products;
