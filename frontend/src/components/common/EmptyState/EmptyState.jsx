import { FiInbox } from "react-icons/fi";
import "./EmptyState.css";
export default function EmptyState({
  icon: Icon = FiInbox,
  title = "Nothing here yet",
  description = "Data will appear once available.",
  action,
}) {
  return (
    <div className="aio-empty">
      <div className="aio-empty__icon"><Icon /></div>
      <h3 className="aio-empty__title">{title}</h3>
      <p className="aio-empty__desc">{description}</p>
      {action && <div className="aio-empty__action">{action}</div>}
    </div>
  );
}
