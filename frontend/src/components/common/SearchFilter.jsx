import React from 'react';

const SearchFilter = ({ 
  rowsPerPage, 
  setRowsPerPage, 
  searchQuery, 
  setSearchQuery,
  setCurrentPage 
}) => {
  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
      <div className="d-flex align-items-center">
        <span className="me-2 text-gray-9 fs-14">Row Per Page</span>
        <select
          className="form-select form-select-sm w-auto"
          value={rowsPerPage}
          onChange={(e) => { 
            setRowsPerPage(Number(e.target.value)); 
            if (setCurrentPage) setCurrentPage(1); 
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
            if (setCurrentPage) setCurrentPage(1); 
          }}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
