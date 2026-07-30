import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { classNames } from "@/utils/helpers";
import "./Pagination.css";
export default function Pagination({ page, pageSize, total, onPageChange }) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  if (pageCount <= 1) return null;
  const pages = [];
  const window_ = 1;
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= page - window_ && i <= page + window_)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }
  return (
    <nav className="aio-pagination" aria-label="Pagination">
      <button
        className="aio-pagination__btn"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} className="aio-pagination__ellipsis">…</span>
        ) : (
          <button
            key={p}
            className={classNames("aio-pagination__btn", p === page && "is-active")}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}
      <button
        className="aio-pagination__btn"
        onClick={() => onPageChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </nav>
  );
}