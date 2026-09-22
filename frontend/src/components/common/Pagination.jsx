import React from 'react';

const Pagination = ({ 
  currentPage, 
  setCurrentPage, 
  rowsPerPage, 
  setRowsPerPage,
  totalEntries 
}) => {
  const totalPages = Math.ceil(totalEntries / rowsPerPage) || 1;
  const startEntry = Math.min((currentPage - 1) * rowsPerPage + 1, totalEntries);
  const endEntry = Math.min(currentPage * rowsPerPage, totalEntries);

  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top mt-auto">
      <p className="mb-0 text-gray-9 fs-14">
        Showing {totalEntries > 0 ? startEntry : 0}-{endEntry} of {totalEntries} entries
      </p>
      <ul className="pagination mb-0">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <i className="ti ti-chevron-left"></i>
          </button>
        </li>
        
        {pages.map(page => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <i className="ti ti-chevron-right"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
