import { FiChevronDown } from "react-icons/fi";
import "./Select.css";

export default function Select({
  value,
  onChange,
  options = [],
  className = "",
}) {
  return (
    <div className={`aio-select ${className}`}>
      <select value={value} onChange={onChange} className="aio-select__input">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <FiChevronDown className="aio-select__icon" />
    </div>
  );
}