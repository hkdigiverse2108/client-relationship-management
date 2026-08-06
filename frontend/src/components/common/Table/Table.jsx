import { useMemo, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { classNames, paginate, sortBy } from "@/utils/helpers";
import EmptyState from "@/components/common/EmptyState/EmptyState";
import Loader from "@/components/common/Loader/Loader";
import Pagination from "@/components/common/Pagination/Pagination";
import { APP_CONFIG } from "@/config/appConfig";
import "./Table.css";
/**
 * Data table with sorting + pagination handled client-side. When a backend is
 * connected, pass sorted/paginated data directly and hide the built-in
 * pagination by passing pageSize={data.length}.
 *
 * columns: [{ key, label, render?, sortable?, width?, align? }]
 */
export default function Table({
  columns = [],
  data = [],
  loading = false,
  pageSize = APP_CONFIG.defaultPageSize,
  onRowClick,
  emptyTitle = "No records found",
  emptyDescription = "Adjust your filters or add a new record.",
}) {
  const safeData = Array.isArray(data) ? data : [];
  const [sort, setSort] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);
  const sorted = useMemo(
    () => (sort.key ? sortBy(safeData, sort.key, sort.direction) : safeData),
    [safeData, sort]
  );
  const paged = useMemo(() => paginate(sorted, page, pageSize), [sorted, page, pageSize]);
  const handleSort = (col) => {
    if (!col.sortable) return;
    setSort((s) =>
      s.key === col.key
        ? { key: col.key, direction: s.direction === "asc" ? "desc" : "asc" }
        : { key: col.key, direction: "asc" }
    );
  };
  if (loading) return <Loader />;
  if (!safeData.length)
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  return (
    <div className="aio-table-wrap">
      <div className="table-responsive">
        <table className="table aio-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col)}
                  className={classNames(col.sortable && "is-sortable")}
                  style={{ width: col.width, textAlign: col.align || "left", whiteSpace: "nowrap" }}
                >
                  <span className="aio-table__th">
                    {col.label}
                    {col.sortable && sort.key === col.key && (
                      sort.direction === "asc" ? <FiChevronUp /> : <FiChevronDown />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row) => (
              <tr
                key={row.id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={onRowClick ? { cursor: "pointer" } : undefined}
              >
                {columns.map((col) => (
                  <td key={col.key} style={{ textAlign: col.align || "left" }}>
                    {col.render ? col.render(row) : row[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="aio-table__footer">
        <span className="text-muted-2" style={{ fontSize: 13 }}>
          Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}
        </span>
        <Pagination
          page={page}
          pageSize={pageSize}
          total={sorted.length}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}