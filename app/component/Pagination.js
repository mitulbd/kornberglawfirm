const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  const showEllipsisThreshold = 2;

  if (totalPages <= showEllipsisThreshold * 2 + 3) {
    // Show all page numbers if total pages are less than or equal to a threshold
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Always show the first page, the last page, and pages around the current page
    let startPage = Math.max(2, currentPage - showEllipsisThreshold);
    let endPage = Math.min(totalPages - 1, currentPage + showEllipsisThreshold);

    // Handle leading ellipsis
    if (startPage > 2) {
      pageNumbers.push(1, '...');
    } else {
      for (let i = 1; i < startPage; i++) {
        pageNumbers.push(i);
      }
    }

    // Add page numbers around the current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Handle trailing ellipsis
    if (endPage < totalPages - 1) {
      pageNumbers.push('...', totalPages);
    } else {
      for (let i = endPage + 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    }
  }

  return (
    <nav className="navigation pagination">
      <div className="nav-links">
        {currentPage > 1 && (
          <a className="prev page-numbers" onClick={() => onPageChange(currentPage - 1)}>&lt;</a>
        )}
        {pageNumbers.map((number, index) => (
          number === '...' ? (<span key={index} className="page-numbers dots">...</span>) : (<a key={index} className={number === currentPage ? 'page-numbers current' : 'page-numbers'} onClick={() => onPageChange(number)}> {number} </a>)
        ))}
        {currentPage < totalPages && (
          <a className="next page-numbers" onClick={() => onPageChange(currentPage + 1)}>&gt;</a>
        )}
      </div>
    </nav>
  );
};
export default Pagination;
