import { classNames } from "@/utils/helpers";
import "./Button.css";
/**
 * Reusable Button.
 * variant: primary | secondary | ghost | danger | outline
 * size:    sm | md | lg
 */
export default function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  block = false,
  className,
  children,
  ...rest
}) {
  return (
    <button
      type="button"
      className={classNames(
        "aio-btn",
        `aio-btn--${variant}`,
        `aio-btn--${size}`,
        block && "aio-btn--block",
        loading && "is-loading",
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className="aio-btn__spinner" aria-hidden />}
      {!loading && Icon && iconPosition === "left" && (
        <Icon className="aio-btn__icon" />
      )}
      <span className="aio-btn__label">{children}</span>
      {!loading && Icon && iconPosition === "right" && (
        <Icon className="aio-btn__icon" />
      )}
    </button>
  );
}