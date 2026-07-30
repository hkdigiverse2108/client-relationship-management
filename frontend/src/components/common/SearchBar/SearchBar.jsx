import { FiSearch } from "react-icons/fi";
import "./SearchBar.css";
export default function SearchBar({ value, onChange, placeholder = "Search…" }) {
  return (
    <div className="aio-search">
      <FiSearch className="aio-search__icon" />
      <input
        type="search"
        className="aio-search__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
