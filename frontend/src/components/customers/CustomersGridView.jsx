import React from 'react';
import { Link } from 'react-router-dom';
import { customersData } from '../../pages/customersData';

const CustomersGridView = () => {
  return (
    <div className="row">
      {customersData.map((customer) => {

        let statusBadgeClass = "bg-primary-transparent";
        let statusTextClass = "text-primary";
        if (customer.status === "Active") {
          statusBadgeClass = "bg-success-transparent";
          statusTextClass = "text-success";
        } else if (customer.status === "Inactive") {
          statusBadgeClass = "bg-warning-transparent";
          statusTextClass = "text-warning";
        } else if (customer.status === "Blocked") {
          statusBadgeClass = "bg-danger-transparent";
          statusTextClass = "text-danger";
        }

        return (
          <div className="col-xxl-3 col-xl-4 col-md-6 mb-4" key={customer.id}>
            <div className="card h-100 mb-0">
              <div className="card-header border-bottom d-flex align-items-center justify-content-between">
                <span className="badge bg-primary-transparent text-primary fw-semibold">Customer ID #{customer.id}</span>
                <span className={`badge ${statusBadgeClass} ${statusTextClass} text-capitalize`}>
                  <i className="ti ti-point-filled me-1"></i>{customer.status}
                </span>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <Link to="#" className="avatar avatar-md border avatar-rounded me-2">
                    <img src={customer.avatar} className="img-fluid" alt="img" />
                  </Link>
                  <div>
                    <h6 className="fw-medium mb-0"><Link to="#">{customer.name}</Link></h6>
                    <span className="fs-12 text-muted">{customer.city}, {customer.state}, {customer.country}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="fs-13 fw-medium text-dark d-block mb-1"><i className="ti ti-mail text-muted me-2"></i>{customer.email}</span>
                  <span className="fs-13 fw-medium text-dark d-block"><i className="ti ti-phone text-muted me-2"></i>{customer.phone}</span>
                </div>

                <div className="d-flex align-items-center justify-content-between pt-2 border-top">
                  <ul className="contact-icon d-flex align-items-center mb-0 list-unstyled">
                    <li className="me-2"><Link to="#" className="p-1 rounded-circle bg-light d-flex align-items-center justify-content-center"><i className="ti ti-message-2 text-muted"></i></Link></li>
                    <li><Link to="#" className="p-1 rounded-circle bg-light d-flex align-items-center justify-content-center"><i className="ti ti-brand-whatsapp text-muted"></i></Link></li>
                  </ul>
                  <div className="action-icon d-inline-flex">
                    <Link to="#" className="me-2 text-primary" data-bs-toggle="modal" data-bs-target="#edit_customer"><i className="ti ti-edit"></i></Link>
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

export default CustomersGridView;
