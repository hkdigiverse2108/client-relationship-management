import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { classNames } from "@/utils/helpers";
import "./Modal.css";
/**
 * Accessible modal. Closes on ESC and backdrop click.
 * size: sm | md | lg | xl
 */
export default function Modal({ open, onClose, title, size = "md", children, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  
  return createPortal(
    <div className="aio-modal-backdrop" onClick={onClose} role="dialog" aria-modal>
      <div
        className={classNames("aio-modal", `aio-modal--${size}`)}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aio-modal__header">
          <h3 className="aio-modal__title">{title}</h3>
          <button className="aio-modal__close" onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </div>
        <div className="aio-modal__body">{children}</div>
        {footer && <div className="aio-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}