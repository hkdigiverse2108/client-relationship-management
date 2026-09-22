import React from 'react';
import { contactsData } from '../../pages/contactsData';

const ContactsKanbanView = () => {
  return (
    <div className="row">
      {contactsData.map((contact, index) => (
        <div key={index} className="col-xl-3 col-lg-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="form-check form-check-md">
                  <input className="form-check-input" type="checkbox" />
                </div>
                <div>
                  <a href="#" onClick={(e) => e.preventDefault()}
                    className="avatar avatar-xl avatar-rounded online border p-1 border-primary rounded-circle">
                    <img src={contact.avatar} className="img-fluid h-auto w-auto" alt="img" />
                  </a>
                </div>
                <div className="dropdown">
                  <button className="btn btn-icon btn-sm rounded-circle" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="ti ti-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
                        data-bs-toggle="modal" data-bs-target="#edit_contact"><i
                          className="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a className="dropdown-item rounded-1" href="#" onClick={(e) => e.preventDefault()}
                        data-bs-toggle="modal" data-bs-target="#delete_modal"><i
                          className="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center mb-3">
                <h6 className="mb-1"><a href="#" onClick={(e) => e.preventDefault()}>{contact.name}</a></h6>
                <span className="badge bg-pink-transparent fs-10 fw-medium">{contact.role}</span>
              </div>
              <div className="d-flex flex-column">
                <p className="text-dark d-inline-flex align-items-center mb-2">
                  <i className="ti ti-mail-forward text-gray-5 me-2"></i>
                  {contact.email}
                </p>
                <p className="text-dark d-inline-flex align-items-center mb-2">
                  <i className="ti ti-phone text-gray-5 me-2"></i>
                  {contact.phone}
                </p>
                <p className="text-dark d-inline-flex align-items-center">
                  <i className="ti ti-map-pin text-gray-5 me-2"></i>
                  {contact.location}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div className="icons-social d-flex align-items-center">
                  <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-rounded avatar-sm me-1"><i
                      className="ti ti-mail"></i></a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-rounded avatar-sm me-1"><i
                      className="ti ti-phone-call"></i></a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-rounded avatar-sm me-1"><i
                      className="ti ti-message-2"></i></a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-rounded avatar-sm me-1"><i
                      className="ti ti-brand-skype"></i></a>
                  <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-rounded avatar-sm"><i
                      className="ti ti-brand-facebook"></i></a>
                </div>
                <span className="d-inline-flex align-items-center"><i
                    className="ti ti-star-filled text-warning me-1"></i>{contact.rating}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsKanbanView;
