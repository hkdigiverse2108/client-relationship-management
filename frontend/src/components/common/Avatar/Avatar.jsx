import { initials } from "@/utils/formatters";
import { classNames } from "@/utils/helpers";
import "./Avatar.css";
export default function Avatar({ name = "", src, size = 36, className }) {
  const style = { width: size, height: size, fontSize: size * 0.4 };
  if (src) {
    return <img className={classNames("aio-avatar", className)} style={style} src={src} alt={name} />;
  }
  return (
    <div className={classNames("aio-avatar aio-avatar--initials", className)} style={style} aria-label={name}>
      {initials(name) || "?"}
    </div>
  );
}
