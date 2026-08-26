import { FiSearch } from "react-icons/fi";
import "./SearchBar.css";
export default function SearchBar({ value, onChange, placeholder = "Search…" }) {
  return (
    <div className="aio-search">
      <FiSearch className="aio-search__icon" />
      <input
        type="search"
        className="form-control aio-search__input"
        style={{ paddingLeft: '38px', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
