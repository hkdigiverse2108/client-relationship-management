import { forwardRef } from "react";
import { classNames } from "@/utils/helpers";
const Input = forwardRef(function Input(
  { label, error, hint, icon: Icon, className, id, ...rest },
  ref
) {
  const inputId = id || rest.name;
  return (
    <div className={classNames("mb-3", className)}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {Icon && (
          <Icon
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-text-subtle)",
              pointerEvents: "none",
            }}
          />
        )}
        <input
          id={inputId}
          ref={ref}
          className={classNames(
            "form-control",
            error && "is-invalid"
          )}
          style={Icon ? { paddingLeft: 38 } : undefined}
          {...rest}
        />
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
      {!error && hint && (
        <div className="mt-1" style={{ fontSize: 12, color: "var(--color-text-subtle)" }}>
          {hint}
        </div>
      )}
    </div>
  );
});
export default Input;