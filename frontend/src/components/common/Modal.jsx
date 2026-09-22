import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ open, onClose, title, size = "md", children, footer }) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <>
      <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        role="dialog"
        aria-modal="true"
        onClick={onClose}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div 
          className={`modal-dialog modal-dialog-centered modal-dialog-scrollable modal-${size}`} 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title fw-semibold">{title}</h5>
              <button type="button" className="btn-close custom-btn-close fs-14" onClick={onClose} aria-label="Close">
                <i className="ti ti-x"></i>
              </button>
            </div>
            <div className="modal-body hide-scrollbar">
              <style>
                {`
                  .hide-scrollbar::-webkit-scrollbar {
                      display: none;
                  }
                  .hide-scrollbar {
                      -ms-overflow-style: none;
                      scrollbar-width: none;
                  }
                `}
              </style>
              {children}
            </div>
            {footer && (
              <div className="modal-footer border-0 pt-0">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
