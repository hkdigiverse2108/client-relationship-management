import React from 'react';
import { Link } from 'react-router-dom';
import { clientsData } from '../../pages/clientsData';

const ClientsGridView = () => {
  return (
    <div className="row">
      {clientsData.map((client) => (
        <div className="col-xl-3 col-lg-4 col-md-6" key={client.id}>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
                <div>
                  <Link to="/client-details" className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
                    <img src={client.clientAvatar} className="img-fluid h-auto w-auto" alt="img" />
                  </Link>
                </div>
                <div className="dropdown">
                  <button className="btn btn-icon btn-sm rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="ti ti-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <Link className="dropdown-item rounded-1" to="#" data-bs-toggle="modal" data-bs-target="#edit_client">
                        <i className="ti ti-edit me-1"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item rounded-1" to="#" data-bs-toggle="modal" data-bs-target="#delete_modal">
                        <i className="ti ti-trash me-1"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center mb-3">
                <h6 className="mb-1"><Link to="/client-details">{client.clientName}</Link></h6>
                <span className="badge bg-pink-transparent fs-10 fw-medium">{client.clientRole}</span>
              </div>
              <div>
                <p className="mb-2 text-truncate">Project : Office Management App</p>
                <div className="progress progress-xs mb-2">
                  <div className="progress-bar bg-purple" role="progressbar" style={{ width: '60%' }}></div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="avatar-list-stacked avatar-group-sm">
                    <span className="avatar avatar-rounded">
                      <img src="/assets/img/users/user-01.jpg" className="border border-white" alt="img" />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img src="/assets/img/users/user-02.jpg" className="border border-white" alt="img" />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img src="/assets/img/users/user-03.jpg" className="border border-white" alt="img" />
                    </span>
                    <Link className="avatar bg-primary avatar-rounded text-fixed-white fs-12" to="#">
                      +1
                    </Link>
                  </div>
                  <span className="text-purple">60%</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div>
                  <p className="mb-1 fs-12">Company</p>
                  <h6 className="fw-normal text-truncate">{client.companyName}</h6>
                </div>
                <div className="icons-social d-flex align-items-center">
                  <Link to="#" className="avatar avatar-rounded avatar-sm bg-light me-2"><i className="ti ti-message"></i></Link>
                  <Link to="#" className="avatar avatar-rounded avatar-sm bg-light"><i className="ti ti-phone"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientsGridView;
