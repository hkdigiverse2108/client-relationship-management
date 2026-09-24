import React from 'react';
import { getInitials } from '../../utils/exportUtils';

const ContactsKanbanView = ({ contacts = [], onEdit, onDelete }) => {
  return (
    <div className="row">
      {contacts.map((contact, index) => (
        <div key={index} className="col-xl-3 col-lg-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div style={{ width: '24px' }}></div>
                <div>
                  <div className="avatar avatar-xl avatar-rounded border p-1 border-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    {contact.avatar ? (
                      <img src={contact.avatar} className="img-fluid rounded-circle" alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold w-100 h-100" style={{ fontSize: '24px' }}>
                        {getInitials(contact.contact_name)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="dropdown">
                  <button className="btn btn-icon btn-sm rounded-circle" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="ti ti-dots-vertical"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end p-3">
                    <li>
                      <a className="dropdown-item rounded-1" href="#" onClick={(e) => onEdit(e, contact)}><i
                          className="ti ti-edit me-1"></i>Edit</a>
                    </li>
                    <li>
                      <a className="dropdown-item rounded-1" href="#" data-bs-toggle="modal" data-bs-target="#delete_modal" onClick={(e) => onDelete(e, contact)}><i
                          className="ti ti-trash me-1"></i>Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-center mb-3">
                <h6 className="mb-1"><a href="#" onClick={(e) => e.preventDefault()}>{contact.contact_name || '-'}</a></h6>
                <span className="badge bg-pink-transparent fs-10 fw-medium">{contact.department || 'No Dept'}</span>
              </div>
              <div className="d-flex flex-column">
                <p className="text-dark d-inline-flex align-items-center mb-2">
                  <i className="ti ti-building text-gray-5 me-2"></i>
                  {contact.company_name || '-'}
                </p>
                <p className="text-dark d-inline-flex align-items-center mb-2">
                  <i className="ti ti-mail-forward text-gray-5 me-2"></i>
                  {contact.email || '-'}
                </p>
                <p className="text-dark d-inline-flex align-items-center mb-2">
                  <i className="ti ti-phone text-gray-5 me-2"></i>
                  {contact.contact_number || '-'}
                </p>
                <p className="text-dark d-inline-flex align-items-center">
                  <i className="ti ti-map-pin text-gray-5 me-2"></i>
                  {contact.city ? `${contact.city}, ${contact.country || ''}` : '-'}
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                <div className="icons-social d-flex align-items-center">
                  <span className={`d-inline-flex align-items-center badge ${contact.status === 'active' ? 'bg-success-transparent' : 'bg-secondary-transparent'}`} style={{ textTransform: 'capitalize' }}>
                    {contact.status || 'inactive'}
                  </span>
                </div>
                <span className="d-inline-flex align-items-center text-muted fs-12"><i
                    className="ti ti-tag text-warning me-1"></i>{contact.tags ? contact.tags.split(',')[0] : 'None'}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsKanbanView;
