import "./GridTable.css";

export default function GridTable({
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="aio-view-toggle">
      {options.map((item) => (
        <button
          key={item.value}
          type="button"
          className={`aio-view-toggle__btn ${
            value === item.value ? "is-active" : ""
          }`}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}