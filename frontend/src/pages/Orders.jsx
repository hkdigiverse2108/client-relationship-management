import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import OrderFormModal from '../components/orders/OrderFormModal';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import OrdersGridView from '../components/orders/OrdersGridView';
import FilterBar from '../components/common/FilterBar';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

const Contacts = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [currentEditOrder, setCurrentEditOrder] = useState(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, id: null, title: '' });
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [statusFilter, setStatusFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');

  const hasFilters = startDate || endDate || statusFilter || platformFilter || paymentFilter;

  const filterConfig = [
    {
      type: 'date',
      value: dateRange,
      onChange: setDateRange,
      placeholder: "Select Date Range"
    },
    {
      type: 'select',
      value: platformFilter,
      onChange: setPlatformFilter,
      options: [
        { value: '', label: 'All Platforms' },
        { value: 'Amazon', label: 'Amazon' },
        { value: 'Flipkart', label: 'Flipkart' },
        { value: 'Shopify', label: 'Shopify' },
        { value: 'WooCommerce', label: 'WooCommerce' }
      ]
    },
    {
      type: 'select',
      value: paymentFilter,
      onChange: setPaymentFilter,
      options: [
        { value: '', label: 'All Payments' },
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' },
        { value: 'failed', label: 'Failed' }
      ]
    },
    {
      type: 'select',
      value: statusFilter,
      onChange: setStatusFilter,
      options: [
        { value: '', label: 'All Status' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'in transit', label: 'In Transit' },
        { value: 'delivered', label: 'Delivered' }
      ]
    }
  ];

  const clearFilters = () => {
    setDateRange([null, null]);
    setStatusFilter('');
    setPlatformFilter('');
    setPaymentFilter('');
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/orders');
      // Some interceptors return data inside data.data or similar
      const fetchedData = res.data?.data || res.data || res || [];
      setOrders(Array.isArray(fetchedData) ? fetchedData : []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSaveOrder = async (formData) => {
    try {
      if (currentEditOrder) {
        await axiosClient.put(`/orders/${currentEditOrder._id}`, formData);
        toast.success('Order updated successfully');
      } else {
        await axiosClient.post('/orders', formData);
        toast.success('Order simulated successfully');
      }
      fetchOrders();
      setIsOrderModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save order');
    }
  };

  const handleEditClick = (order) => {
    setCurrentEditOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleDeleteOrder = async () => {
    if (!confirmDeleteModal.id) return;
    try {
      await axiosClient.delete(`/orders/${confirmDeleteModal.id}`);
      toast.success('Order deleted successfully');
      fetchOrders();
      setConfirmDeleteModal({ isOpen: false, id: null, title: '' });
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete order');
    }
  };
  const getInitials = (name) => {
    if (!name) return 'UN';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const columns = [
    {
      name: 'Order ID',
      sortable: true,
      selector: row => row.order_id,
      cell: (row) => <span className="text-primary fw-semibold">{row.order_id}</span>,
      minWidth: '120px'
    },
    {
      name: 'Customer & Destination',
      sortable: true,
      selector: row => row.customer_name,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Link to="#" className="avatar avatar-md border avatar-rounded me-2">
            {row.avatar ? (
              <img src={row.avatar} className="img-fluid" alt="img" />
            ) : (
              <div className="d-flex align-items-center justify-content-center bg-primary text-white fs-13 fw-semibold w-100 h-100 rounded-circle">
                {getInitials(row.customer_name)}
              </div>
            )}
          </Link>
          <div>
            <h6 className="fw-medium mb-1"><Link to="#">{row.customer_name || '-'}</Link></h6>
            <span className="fs-13 fw-normal text-muted d-block">
              {[row.destination_city, row.destination_state, row.destination_country].filter(Boolean).join(", ") || '-'}
            </span>
            <span className="fs-12 fw-normal text-muted d-block mt-1">
              {[row.customer_email, row.customer_phone].filter(Boolean).join(" | ") || '-'}
            </span>
          </div>
        </div>
      ),
      minWidth: '250px'
    },
    {
      name: 'Product & Platform',
      sortable: true,
      selector: row => row.product_name,
      cell: (row) => (
        <div>
          <h6 className="fw-medium mb-1">{row.product_name}</h6>
          <span className="fs-13 fw-normal text-muted d-block">
            Platform: <span className="text-primary fw-medium">{row.platform}</span>
          </span>
        </div>
      ),
      minWidth: '180px'
    },
    {
      name: 'Qty & Unit Price',
      sortable: true,
      selector: row => row.quantity,
      cell: (row) => (
        <div>
          <div className="fw-medium mb-1">{row.quantity} pcs</div>
          <span className="fs-13 fw-normal text-muted d-block">
            ₹{row.unit_price} each
          </span>
        </div>
      ),
      minWidth: '150px'
    },
    {
      name: 'Order Financials',
      sortable: true,
      selector: row => row.unit_price, // Just for sorting
      cell: (row) => {
        const qty = Number(row.quantity) || 0;
        const price = Number(row.unit_price) || 0;
        const disc = Number(row.discount) || 0;
        const tax = Number(row.tax) || 0;
        const total = (qty * price) - disc + tax;
        return (
          <div className="text-end">
            <h6 className="fw-semibold mb-1">₹{total.toLocaleString()}</h6>
            <span className="fs-12 fw-normal text-muted d-block">
              Disc: -₹{disc} | Tax: +₹{tax}
            </span>
          </div>
        );
      },
      minWidth: '160px'
    },
    {
      name: 'Payment',
      sortable: true,
      selector: row => row.payment_status,
      cell: (row) => {
        let badgeClass = "badge-soft-secondary";
        let textClass = "text-secondary";
        if (row.payment_status === "paid") {
          badgeClass = "bg-success-transparent";
          textClass = "text-success";
        } else if (row.payment_status === "pending") {
          badgeClass = "bg-warning-transparent";
          textClass = "text-warning";
        } else if (row.payment_status === "failed") {
          badgeClass = "bg-danger-transparent";
          textClass = "text-danger";
        }
        return (
          <span className={`badge ${badgeClass} ${textClass} d-inline-flex align-items-center badge-xs text-capitalize`}>
            <i className="ti ti-point-filled me-1"></i>{row.payment_status}
          </span>
        );
      },
    },
    {
      name: 'Status',
      sortable: true,
      selector: row => row.order_status,
      cell: (row) => {
        let badgeClass = "bg-info-transparent";
        let textClass = "text-info";
        if (row.order_status === "delivered") {
          badgeClass = "bg-success-transparent";
          textClass = "text-success";
        } else if (row.order_status === "processing") {
          badgeClass = "bg-primary-transparent";
          textClass = "text-primary";
        } else if (row.order_status === "shipped" || row.order_status === "in transit" || row.order_status === "out for delivery") {
          badgeClass = "bg-warning-transparent";
          textClass = "text-warning";
        }
        return (
          <span className={`badge ${badgeClass} ${textClass} d-inline-flex align-items-center badge-xs text-capitalize`}>
            <i className="ti ti-point-filled me-1"></i>{row.order_status}
          </span>
        );
      },
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-icon d-inline-flex">
          <Link to="#" className="me-2" onClick={(e) => { e.preventDefault(); handleEditClick(row); }}><i className="ti ti-edit"></i></Link>
          <Link to="#" onClick={(e) => { e.preventDefault(); setConfirmDeleteModal({ isOpen: true, id: row._id, title: row.order_id }); }}><i className="ti ti-trash"></i></Link>
        </div>
      ),
    },
  ];

	const filteredOrders = (orders || []).filter(order => {
		let match = true;
		
		// Date filter
		if (startDate && endDate) {
			const orderDate = new Date(order.created_at || order.order_date);
			const start = new Date(startDate);
			start.setHours(0, 0, 0, 0);
			const end = new Date(endDate);
			end.setHours(23, 59, 59, 999);
			if (orderDate < start || orderDate > end) {
				match = false;
			}
		}

		// Platform filter
		if (platformFilter && order.platform !== platformFilter) {
			match = false;
		}

		// Payment filter
		if (paymentFilter && order.payment_status?.toLowerCase() !== paymentFilter.toLowerCase()) {
			match = false;
		}

		// Status filter
		if (statusFilter && order.order_status?.toLowerCase() !== statusFilter.toLowerCase()) {
			match = false;
		}

		return match;
	});

	return (
		<>
			<div className="page-wrapper">
				<div className="content">

					{/* Breadcrumb */}
					<PageHeader 
						title="Orders Management"
						breadcrumbs={[
							{ label: 'Dashboard' },
							{ label: 'E-Commerce' },
							{ label: viewMode === 'list' ? 'Orders List' : 'Orders Grid', active: true }
						]}
					>
						<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="#" onClick={(e) => { e.preventDefault(); setViewMode('list'); }} className={`btn btn-icon btn-sm me-1 ${viewMode === 'list' ? 'active bg-primary text-white' : ''}`}><i
										className="ti ti-list-tree"></i></a>
								<a href="#" onClick={(e) => { e.preventDefault(); setViewMode('grid'); }} className={`btn btn-icon btn-sm ${viewMode === 'grid' ? 'active bg-primary text-white' : ''}`}><i
										className="ti ti-layout-grid"></i></a>
							</div>
						</div>
						
						<div className="mb-2">
							<a href="#" onClick={(e) => { e.preventDefault(); setCurrentEditOrder(null); setIsOrderModalOpen(true); }}
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Simulate E-com Order</a>
						</div>
					
					</PageHeader>
					{/* /Breadcrumb */}

					{/*orders List */}
					<div className="card">
						
						<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
							<div>
								<h5 className="mb-1">{viewMode === 'list' ? 'Orders List' : 'Orders Grid'}</h5>
								<div className="fs-13 mb-0">
									<span className="d-inline-flex align-items-center bg-primary-transparent text-primary px-2 py-1 rounded fw-medium" style={{ border: '1px solid rgba(var(--bs-primary-rgb), 0.2)' }}>
										<span className="spinner-grow spinner-grow-sm text-primary me-2" role="status" aria-hidden="true" style={{ width: '0.6rem', height: '0.6rem' }}></span>
										{platformFilter 
											? `Showing ${filteredOrders.length} orders for ${platformFilter}` 
											: `Showing ${filteredOrders.length} total orders across all platforms`}
									</span>
								</div>
							</div>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<FilterBar 
                filters={filterConfig} 
                onClear={clearFilters} 
                hasActiveFilters={hasFilters} 
              />
						</div>
					</div>
					<div className="card-body p-0">
						{viewMode === 'list' ? (
							<div className="custom-datatable-filter table-responsive">
								<CustomDataTable columns={columns} data={filteredOrders} />
							</div>
						) : (
							<div className="p-3">
								<OrdersGridView 
                  data={filteredOrders} 
                  onEditClick={handleEditClick}
                  onDeleteClick={(row) => setConfirmDeleteModal({ isOpen: true, id: row._id, title: row.order_id })}
                />
							</div>
						)}
					</div>
				</div>
				{/* /order list */}

			</div>

			

		</div>
		<OrderFormModal 
      open={isOrderModalOpen} 
      onClose={() => setIsOrderModalOpen(false)} 
      onSave={handleSaveOrder} 
      initialData={currentEditOrder} 
    />
    
    {/* Delete Confirmation Modal */}
    {confirmDeleteModal.isOpen && (
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Order</h5>
              <button type="button" className="btn-close" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '' })} aria-label="Close"></button>
            </div>
            <div className="modal-body text-center py-4">
              <i className="ti ti-alert-circle text-danger mb-3" style={{ fontSize: '48px' }}></i>
              <h5 className="mb-2">Are you sure?</h5>
              <p className="text-muted mb-0">Do you really want to delete the order <strong>{confirmDeleteModal.title}</strong>? This process cannot be undone.</p>
            </div>
            <div className="modal-footer justify-content-center border-0 pt-0">
              <button className="btn btn-light px-4" onClick={() => setConfirmDeleteModal({ isOpen: false, id: null, title: '' })}>Cancel</button>
              <button className="btn btn-danger px-4" onClick={handleDeleteOrder}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Contacts;
