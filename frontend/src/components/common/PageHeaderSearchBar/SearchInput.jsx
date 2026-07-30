import { FiSearch } from "react-icons/fi";
import "./SearchInput.css";

export default function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
  dark = false,
}) {
  return (
    <div className={`aio-search ${dark ? "aio-search--dark" : ""} ${className}`}>
      <FiSearch className="aio-search__icon" />

      <input
        type="text"
        className="aio-search__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}