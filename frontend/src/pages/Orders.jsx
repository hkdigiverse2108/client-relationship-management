import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import { ordersData } from './ordersData';
import OrderFormModal from '../components/orders/OrderFormModal';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import OrdersGridView from '../components/orders/OrdersGridView';

const Contacts = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [statusFilter, setStatusFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');

  const hasFilters = startDate || endDate || statusFilter || platformFilter || paymentFilter;

  const clearFilters = () => {
    setDateRange([null, null]);
    setStatusFilter('');
    setPlatformFilter('');
    setPaymentFilter('');
  };
  // Pagination state for contacts
        
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
            <img src={row.avatar} className="img-fluid" alt="img" />
          </Link>
          <div>
            <h6 className="fw-medium mb-1"><Link to="#">{row.customer_name}</Link></h6>
            <span className="fs-13 fw-normal text-muted d-block">
              {[row.destination_city, row.destination_state, row.destination_country].filter(Boolean).join(", ")}
            </span>
            <span className="fs-12 fw-normal text-muted d-block mt-1">
              {[row.customer_email, row.customer_phone].filter(Boolean).join(" | ")}
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
          <Link to="#" className="me-2" data-bs-toggle="modal" data-bs-target="#edit_order"><i className="ti ti-edit"></i></Link>
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
							<a href="#" onClick={(e) => { e.preventDefault(); setIsOrderModalOpen(true); }}
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
										? `Showing ${ordersData.filter(order => order.platform === platformFilter).length} orders for ${platformFilter}` 
										: `Showing ${ordersData.length} total orders across all platforms`}
								</span>
							</div>
						</div>
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
										{ value: '', label: 'All Platforms' },
										{ value: 'Amazon', label: 'Amazon' },
										{ value: 'Flipkart', label: 'Flipkart' },
										{ value: 'Shopify', label: 'Shopify' },
										{ value: 'WooCommerce', label: 'WooCommerce' }
									]}
									value={platformFilter ? { value: platformFilter, label: platformFilter } : { value: '', label: 'All Platforms' }}
									onChange={(selected) => setPlatformFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="me-3 custom-select-wrapper" style={{ width: '150px' }}>
								<CustomSelect 
									options={[
										{ value: '', label: 'All Payments' },
										{ value: 'paid', label: 'Paid' },
										{ value: 'pending', label: 'Pending' },
										{ value: 'failed', label: 'Failed' }
									]}
									value={paymentFilter ? { value: paymentFilter, label: paymentFilter.charAt(0).toUpperCase() + paymentFilter.slice(1) } : { value: '', label: 'All Payments' }}
									onChange={(selected) => setPaymentFilter(selected ? selected.value : '')}
								/>
							</div>
							<div className="custom-select-wrapper" style={{ width: '140px' }}>
								<CustomSelect 
									options={[
										{ value: '', label: 'All Status' },
										{ value: 'processing', label: 'Processing' },
										{ value: 'shipped', label: 'Shipped' },
										{ value: 'in transit', label: 'In Transit' },
										{ value: 'delivered', label: 'Delivered' }
									]}
									value={statusFilter ? { value: statusFilter, label: statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1) } : { value: '', label: 'All Status' }}
									onChange={(selected) => setStatusFilter(selected ? selected.value : '')}
								/>
							</div>
							{hasFilters ? (
								<div className="ms-2">
									<button 
										className="btn btn-outline-danger btn-sm d-flex align-items-center"
										onClick={clearFilters}
									>
										<i className="ti ti-x me-1"></i>Clear
									</button>
								</div>
							) : null}
						</div>
					</div>
					<div className="card-body p-0">
						{viewMode === 'list' ? (
							<div className="custom-datatable-filter table-responsive">
								<CustomDataTable columns={columns} data={ordersData} />
							</div>
						) : (
							<div className="p-3">
								<OrdersGridView />
							</div>
						)}
					</div>
				</div>
				{/* /order list */}

			</div>

			

		</div>
		<OrderFormModal open={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />
    </>
  );
};

export default Contacts;
