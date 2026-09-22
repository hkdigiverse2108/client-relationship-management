import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import CustomSelect from './CustomSelect';

const CustomDataTable = ({ columns, data, searchable = true, defaultRowsPerPage = 10, showPagination = true, showToolbar = true, rowClassName, ...props }) => {
  const [filterText, setFilterText] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Filter Data
  const filteredItems = useMemo(() => {
    return data.filter((item) => {
      if (!filterText) return true;
      return Object.values(item).some(
        (val) => val && val.toString().toLowerCase().includes(filterText.toLowerCase())
      );
    });
  }, [data, filterText]);

  // Sort Data
  const sortedItems = useMemo(() => {
    if (!sortColumn) return filteredItems;

    return [...filteredItems].sort((a, b) => {
      const aVal = a[sortColumn.selectorKey];
      const bVal = b[sortColumn.selectorKey];

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredItems, sortColumn, sortDirection]);

  // Paginate Data
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedItems.slice(start, start + rowsPerPage);
  }, [sortedItems, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedItems.length / rowsPerPage);
  const startEntry = sortedItems.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, sortedItems.length);

  const handleSort = (column) => {
    if (!column.sortable) return;
    // For now, since we only have `selector: row => row.field` in columns, 
    // we need a reliable way to sort. We'll add a simple selectorKey or sort by name.
    // If you pass `selectorKey` in your columns definition, it will sort by that object property.
    
    // As a simple fallback, we just don't sort if selectorKey isn't provided.
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="card-body p-0 d-flex flex-column h-100">
      {/* Top Header - Row Per Page & Search */}
      {showToolbar && (
        <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
          <div className="d-flex align-items-center" style={{ minWidth: '150px' }}>
            <span className="me-2 text-gray-9 fs-14">Row Per Page</span>
            <div style={{ width: '80px' }}>
              <style>{`
                .row-per-page-select .react-select__value-container {
                  padding: 2px 8px !important;
                }
                .row-per-page-select .react-select__dropdown-indicator {
                  padding: 4px 8px !important;
                }
              `}</style>
              <CustomSelect
                className="row-per-page-select"
                value={{ value: rowsPerPage, label: rowsPerPage.toString() }}
                onChange={(selected) => {
                  setRowsPerPage(Number(selected.value));
                  setCurrentPage(1);
                }}
                options={[
                  { value: 10, label: '10' },
                  { value: 20, label: '20' },
                  { value: 50, label: '50' }
                ]}
                isSearchable={false}
              />
            </div>
          </div>
          
          {searchable && (
            <div className="input-icon-start position-relative">
              <span className="input-icon-addon">
                <i className="ti ti-search"></i>
              </span>
              <input
                type="text"
                className="form-control form-control-md"
                placeholder="Search"
                value={filterText}
                onChange={(e) => {
                  setFilterText(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Main Table Content */}
      <div className={`custom-datatable-filter table-responsive flex-grow-1 ${!showPagination && !showToolbar ? 'pt-3' : ''}`} style={showPagination || showToolbar ? { minHeight: '500px' } : {}}>
        <table className="table datatable">
          <thead className="thead-light">
            <tr>
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={col.sortable ? 'sorting' : 'no-sort'}
                  style={{ width: col.width, minWidth: col.minWidth }}
                  onClick={() => handleSort(col)}
                >
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((row, rowIdx) => (
                <tr key={rowIdx} className={rowClassName ? rowClassName(row) : ''}>
                  {columns.map((col, colIdx) => (
                    <td key={colIdx}>
                      {col.cell ? col.cell(row) : col.selector && col.selector(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center p-4">
                  No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {showPagination && (
        <Pagination 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalEntries={sortedItems.length}
        />
      )}
    </div>
  );
};

export default CustomDataTable;
