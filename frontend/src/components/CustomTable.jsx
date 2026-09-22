import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

/**
 * CustomTable - Reusable Table Component
 * ========================================
 * Template ke exact same UI ke sath ek reusable table component.
 *
 * Props:
 *   columns     - Array of column header strings ya objects {label, key, sortable}
 *   data        - Array of row data objects
 *   renderRow   - Function(row, index) => JSX <tr> element
 *   defaultRows - Default rows per page (default: 10)
 *   searchFields- Array of keys to search in (default: all string fields)
 *
 * Usage Example:
 *   <CustomTable
 *     columns={['Title', 'Type', 'Due Date', 'Owner', 'Created Date', '']}
 *     data={activityData}
 *     renderRow={(row, i) => (
 *       <tr key={i}>
 *         <td>{row.title}</td>
 *         <td>{row.type}</td>
 *         ...
 *       </tr>
 *     )}
 *   />
 */
const CustomTable = ({
  columns = [],
  data = [],
  renderRow,
  defaultRows = 10,
  searchFields = null,
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRows);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Search filter
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter(row => {
      const fields = searchFields || Object.keys(row);
      return fields.some(field => {
        const val = row[field];
        return val && String(val).toLowerCase().includes(q);
      });
    });
  }, [data, searchQuery, searchFields]);

  // Sort
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key] ?? '';
      const bVal = b[sortConfig.key] ?? '';
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortConfig.direction === 'asc' ? cmp : -cmp;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalRows = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalRows);
  const currentRows = sortedData.slice(startIndex, endIndex);

  const handleSort = (key) => {
    if (!key) return;
    setSortConfig(prev =>
      prev.key === key
        ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    );
  };

  // Page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push('...');
      for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) {
        pages.push(i);
      }
      if (safePage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className={`custom-table-wrapper ${className}`}>
      {/* ---- Toolbar: Row Per Page + Search ---- */}
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
        <div className="d-flex align-items-center">
          <span className="me-2 text-gray-9 fs-14">Row Per Page</span>
          <select
            className="form-select form-select-sm w-auto"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="input-icon-start position-relative">
          <span className="input-icon-addon">
            <i className="ti ti-search"></i>
          </span>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* ---- Table ---- */}
      <div className="table-responsive">
        <table className="table datatable">
          <thead className="thead-light">
            <tr>
              {columns.map((col, i) => {
                const colKey = typeof col === 'object' ? col.key : null;
                const colLabel = typeof col === 'object' ? col.label : col;
                const isSortable = typeof col === 'object' ? col.sortable : false;
                return (
                  <th
                    key={i}
                    onClick={() => isSortable && handleSort(colKey)}
                    style={isSortable ? { cursor: 'pointer', userSelect: 'none' } : {}}
                  >
                    {colLabel}
                    {isSortable && sortConfig.key === colKey && (
                      <i className={`ti ti-chevron-${sortConfig.direction === 'asc' ? 'up' : 'down'} ms-1`}></i>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, index) =>
                renderRow ? renderRow(row, startIndex + index) : null
              )
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted py-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---- Footer: Showing entries + Pagination ---- */}
      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
        <p className="mb-0 text-gray-9 fs-14">
          {totalRows === 0
            ? 'No entries found'
            : `Showing ${startIndex + 1}-${endIndex} of ${totalRows} entries`}
        </p>
        <ul className="pagination mb-0">
          <li className={`page-item ${safePage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={safePage === 1}
            >
              <i className="ti ti-chevron-left"></i>
            </button>
          </li>
          {getPageNumbers().map((page, i) =>
            page === '...'
              ? <li key={`ellipsis-${i}`} className="page-item disabled"><span className="page-link">...</span></li>
              : <li key={page} className={`page-item ${safePage === page ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                </li>
          )}
          <li className={`page-item ${safePage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={safePage === totalPages}
            >
              <i className="ti ti-chevron-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomTable;
