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

  // Generate an array of page numbers with ellipsis
  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };
  
  const pages = getVisiblePages();

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
        
        {pages.map((page, index) => (
          <li key={index} className={`page-item ${currentPage === page ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}>
            {page === '...' ? (
              <span className="page-link">...</span>
            ) : (
              <button className="page-link" onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            )}
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
