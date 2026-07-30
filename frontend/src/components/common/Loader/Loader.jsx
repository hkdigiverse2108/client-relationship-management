import "./Loader.css";
export default function Loader({ label = "Loading…" }) {
  return (
    <div className="aio-loader" role="status" aria-live="polite">
      <div className="aio-loader__spinner" />
      <span className="aio-loader__label">{label}</span>
    </div>
  );
}