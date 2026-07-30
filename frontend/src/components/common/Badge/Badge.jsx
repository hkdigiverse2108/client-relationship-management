import { classNames } from "@/utils/helpers";
import "./Badge.css";
/** variant: primary | success | warning | danger | info | accent | neutral */
export default function Badge({ variant = "neutral", size = "md", children, className }) {
  return (
    <span className={classNames("aio-badge", `aio-badge--${variant}`, `aio-badge--${size}`, className)}>
      {children}
    </span>
  );
}
