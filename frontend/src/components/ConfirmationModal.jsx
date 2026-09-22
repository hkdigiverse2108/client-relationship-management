import React from 'react';

const ConfirmationModal = ({
  id = 'delete_modal',
  title = 'Confirm Delete',
  description = 'You want to delete all the marked items, this cant be undone once you delete.',
  onConfirm,
  confirmText = 'Yes, Delete',
  cancelText = 'Cancel',
  icon = 'ti ti-trash-x fs-36',
  iconColorClass = 'bg-transparent-danger text-danger',
  confirmBtnClass = 'btn-danger'
}) => {
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center">
            <span className={`avatar avatar-xl ${iconColorClass} mb-3`}>
              <i className={icon}></i>
            </span>
            <h4 className="mb-1">{title}</h4>
            <p className="mb-3">{description}</p>
            <div className="d-flex justify-content-center">
              <button 
                type="button" 
                className="btn btn-light me-3" 
                data-bs-dismiss="modal"
              >
                {cancelText}
              </button>
              <button 
                type="button" 
                className={`btn ${confirmBtnClass}`} 
                data-bs-dismiss="modal"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
