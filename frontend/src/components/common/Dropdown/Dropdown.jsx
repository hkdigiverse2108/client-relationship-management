import { useEffect, useRef, useState } from "react";
import { classNames } from "@/utils/helpers";
import "./Dropdown.css";
/**
 * Uncontrolled dropdown. `trigger` is a render function that receives an
 * onClick handler. `items` is an array of { label, icon?, onClick, danger? }.
 */
export default function Dropdown({ trigger, items = [], align = "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);
  return (
    <div className="aio-dropdown" ref={ref}>
      {trigger({ onClick: () => setOpen((v) => !v), isOpen: open })}
      {open && (
        <div className={classNames("aio-dropdown__menu", `aio-dropdown__menu--${align}`)}>
          {/* {items.map((item, i) => (
            <button
              key={i}
              className={classNames("aio-dropdown__item", item.danger && "is-danger")}
              onClick={() => { setOpen(false); item.onClick?.(); }}
            >
              {item.icon && <item.icon className="aio-dropdown__icon" />}
              <span>{item.label}</span>
            </button>
          ))} */}

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
        </div>
      )}
    </div>
  );
}