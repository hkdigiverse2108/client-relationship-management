import React from 'react';
import { Link } from 'react-router-dom';
import { ordersData } from '../../pages/ordersData';

const OrdersGridView = () => {
  return (
    <div className="row">
      {ordersData.map((order) => {
        const qty = Number(order.quantity) || 0;
        const price = Number(order.unit_price) || 0;
        const disc = Number(order.discount) || 0;
        const tax = Number(order.tax) || 0;
        const total = (qty * price) - disc + tax;

        let paymentBadgeClass = "badge-soft-secondary";
        let paymentTextClass = "text-secondary";
        if (order.payment_status === "paid") {
          paymentBadgeClass = "bg-success-transparent";
          paymentTextClass = "text-success";
        } else if (order.payment_status === "pending") {
          paymentBadgeClass = "bg-warning-transparent";
          paymentTextClass = "text-warning";
        } else if (order.payment_status === "failed") {
          paymentBadgeClass = "bg-danger-transparent";
          paymentTextClass = "text-danger";
        }

        let orderBadgeClass = "bg-info-transparent";
        let orderTextClass = "text-info";
        if (order.order_status === "delivered") {
          orderBadgeClass = "bg-success-transparent";
          orderTextClass = "text-success";
        } else if (order.order_status === "processing") {
          orderBadgeClass = "bg-primary-transparent";
          orderTextClass = "text-primary";
        } else if (order.order_status === "shipped" || order.order_status === "in transit" || order.order_status === "out for delivery") {
          orderBadgeClass = "bg-warning-transparent";
          orderTextClass = "text-warning";
        }

        return (
          <div className="col-xxl-3 col-xl-4 col-md-6 mb-4" key={order.id}>
            <div className="card h-100 mb-0">
              <div className="card-header border-bottom d-flex align-items-center justify-content-between">
                <span className="badge bg-primary-transparent text-primary fw-semibold">{order.order_id}</span>
                <span className={`badge ${orderBadgeClass} ${orderTextClass} text-capitalize`}>
                  {order.order_status}
                </span>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link to="#" className="avatar avatar-md border avatar-rounded me-2">
                    <img src={order.avatar} className="img-fluid" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fw-medium mb-0"><Link to="#">{order.customer_name}</Link></h6>
                    <span className="fs-12 text-muted">{order.destination_city}, {order.destination_state}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="fs-14 fw-medium text-dark mb-1">{order.product_name}</h6>
                  <span className="fs-12 text-muted">Platform: <span className="text-primary fw-medium">{order.platform}</span></span>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="p-2 border rounded">
                      <span className="fs-11 text-muted d-block mb-1">Quantity</span>
                      <h6 className="fs-13 fw-medium mb-0">{order.quantity} pcs</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 border rounded">
                      <span className="fs-11 text-muted d-block mb-1">Total Amount</span>
                      <h6 className="fs-13 fw-medium mb-0">₹{total.toLocaleString()}</h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                  <div>
                    <span className="fs-12 text-muted d-block">Payment</span>
                    <span className={`badge ${paymentBadgeClass} ${paymentTextClass} badge-sm text-capitalize mt-1`}>
                      <i className="ti ti-point-filled me-1"></i>{order.payment_status}
                    </span>
                  </div>
                  <div className="action-icon d-inline-flex mt-2">
                    <Link to="#" className="me-2 text-primary" data-bs-toggle="modal" data-bs-target="#edit_order"><i className="ti ti-edit"></i></Link>
                    <Link to="#" className="text-danger" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersGridView;
