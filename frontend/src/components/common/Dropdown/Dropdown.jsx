import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { classNames } from "@/utils/helpers";
import "./Dropdown.css";

export default function Dropdown({ trigger, items = [], align = "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const menuRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, right: 0 });

  useEffect(() => {
    if (!open) return;

    const updateCoords = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setCoords({
          top: rect.bottom + 6,
          left: rect.left,
          right: window.innerWidth - rect.right,
        });
      }
    };

    updateCoords();

    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords, true); // true to catch scrolling in tables

    const onClick = (e) => {
      if (
        ref.current && !ref.current.contains(e.target) &&
        menuRef.current && !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords, true);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const menuStyle = {
    position: "fixed",
    top: coords.top,
    ...(align === "right" ? { right: coords.right } : { left: coords.left }),
    zIndex: 9999,
  };

  const menu = open ? createPortal(
    <div 
      className={classNames("aio-dropdown__menu", `aio-dropdown__menu--${align}`)}
      style={menuStyle}
      ref={menuRef}
    >
      {items.map((item, i) => {
        if (item.type === "user") {
          return (
            <div key={i} className="aio-dropdown__user">
              <div className="aio-dropdown__user-name">{item.name}</div>
              <div className="aio-dropdown__user-email">{item.email}</div>
            </div>
          );
        }
        if (item.type === "header") {
          return (
            <div key={i} className="aio-dropdown__header">
              {item.label}
            </div>
          );
        }
        if (item.type === "divider") {
          return <div key={i} className="aio-dropdown__divider" />;
        }
        return (
          <button
            key={i}
            className={classNames("aio-dropdown__item", item.danger && "is-danger")}
            onClick={() => {
              setOpen(false);
              item.onClick?.();
            }}
          >
            {item.icon && <item.icon className="aio-dropdown__icon" />}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>,
    document.body
  ) : null;

  return (
    <div className="aio-dropdown" ref={ref}>
      {trigger({ onClick: () => setOpen((v) => !v), isOpen: open })}
      {menu}
    </div>
  );
}