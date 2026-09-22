import React from 'react';
import { Link } from 'react-router-dom';
import { productsData } from '../../pages/productsData';

const ProductsGridView = () => {
  return (
    <div className="row">
      {productsData.map((product) => {

        let statusBadgeClass = "bg-primary-transparent";
        let statusTextClass = "text-primary";
        if (product.status === "active") {
          statusBadgeClass = "bg-success-transparent";
          statusTextClass = "text-success";
        } else if (product.status === "inactive") {
          statusBadgeClass = "bg-warning-transparent";
          statusTextClass = "text-warning";
        } else if (product.status === "out of stock") {
          statusBadgeClass = "bg-danger-transparent";
          statusTextClass = "text-danger";
        }

        return (
          <div className="col-xxl-3 col-xl-4 col-md-6 mb-4" key={product.id}>
            <div className="card h-100 mb-0">
              <div className="card-header border-bottom d-flex align-items-center justify-content-between">
                <span className="badge bg-primary-transparent text-primary fw-semibold">{product.sku_code}</span>
                <span className={`badge ${statusBadgeClass} ${statusTextClass} text-capitalize`}>
                  <i className="ti ti-point-filled me-1"></i>{product.status}
                </span>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center flex-column mb-3">
                  <Link to="#" className="avatar avatar-xl border avatar-rounded mb-2">
                    <img src={product.image} className="img-fluid" alt="img" />
                  </Link>
                  <div className="text-center">
                    <h6 className="fw-medium mb-1"><Link to="#">{product.product_name}</Link></h6>
                    <span className="fs-12 text-muted">{product.brand_name} • {product.category}</span>
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <div className="p-2 border rounded text-center">
                      <span className="fs-11 text-muted d-block mb-1">Stock Qty</span>
                      <h6 className="fs-13 fw-medium mb-0">{product.initial_stock_qty} pcs</h6>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 border rounded text-center">
                      <span className="fs-11 text-muted d-block mb-1">Price</span>
                      <h6 className="fs-13 fw-medium mb-0">₹{product.retail_price.toLocaleString()}</h6>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center pt-2 border-top">
                  <div className="action-icon d-inline-flex">
                    <Link to="#" className="me-2 text-primary" data-bs-toggle="modal" data-bs-target="#edit_product"><i className="ti ti-edit"></i></Link>
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

export default ProductsGridView;
