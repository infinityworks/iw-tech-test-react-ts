import "./index.css";

type EstablishmentsTablePaginationType = {
  pageNum: number;
  pageCount: number;
  isDisabled: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export const EstablishmentsTablePagination = ({
  pageNum,
  pageCount,
  onPreviousPage,
  onNextPage,
  isDisabled,
}: EstablishmentsTablePaginationType) => {
  return (
    <nav>
      {
        <button
          type="button"
          className="pagination-button"
          disabled={pageNum <= 1 || isDisabled}
          onClick={onPreviousPage}
        >
          -
        </button>
      }
      {pageNum}
      {
        <button
          type="button"
          className="pagination-button"
          disabled={pageNum >= pageCount || isDisabled}
          onClick={onNextPage}
        >
          +
        </button>
      }
    </nav>
  );
};
