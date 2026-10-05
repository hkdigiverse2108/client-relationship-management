import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesGridView = ({ categories = [], onEditClick, onDeleteClick }) => {
  return (
    <div className="row">
      {categories.map((category) => {

        let statusBadgeClass = "bg-primary-transparent";
        let statusTextClass = "text-primary";
        if (category.status === "Active") {
          statusBadgeClass = "bg-success-transparent";
          statusTextClass = "text-success";
        } else if (category.status === "Inactive") {
          statusBadgeClass = "bg-warning-transparent";
          statusTextClass = "text-warning";
        }

        return (
          <div className="col-xxl-3 col-xl-4 col-md-6 mb-4" key={category._id || category.id}>
            <div className="card h-100 mb-0">
              <div className="card-header border-bottom d-flex align-items-center justify-content-between">
                <h6 className="fw-medium mb-0"><Link to="#">{category.name}</Link></h6>
                <span className={`badge ${statusBadgeClass} ${statusTextClass} text-capitalize`}>
                  <i className="ti ti-point-filled me-1"></i>{category.status}
                </span>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <span className="fs-13 text-muted d-block line-clamp-2">{category.description || "No description provided."}</span>
                </div>

                <div className="p-2 border rounded text-center mb-3">
                  <span className="fs-11 text-muted d-block mb-1">Total Products</span>
                  <h6 className="fs-13 fw-medium mb-0">{category.total_products}</h6>
                </div>

                <div className="d-flex align-items-center justify-content-center pt-2 border-top">
                  <div className="action-icon d-inline-flex">
                    <Link to="#" className="me-2 text-primary" onClick={(e) => { e.preventDefault(); onEditClick && onEditClick(category); }}><i className="ti ti-edit"></i></Link>
                    <Link to="#" className="text-danger" onClick={(e) => { e.preventDefault(); onDeleteClick && onDeleteClick(category); }}><i className="ti ti-trash"></i></Link>
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

export default CategoriesGridView;
