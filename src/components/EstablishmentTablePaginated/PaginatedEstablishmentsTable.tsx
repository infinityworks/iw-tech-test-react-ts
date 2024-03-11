import { useState, useEffect } from "react";
import { EstablishmentsTable } from "../EstablishmentTable";
import { EstablishmentsTablePagination } from "../EstablishmentTablePagination";
import { useFetchRatings } from "../../hooks/useFetchRatings";

import "./index.css";

export const PaginatedEstablishmentsTable = () => {
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { error, data, loading, refetch } = useFetchRatings(pageNum);

  useEffect(() => {
    setTotalPages(data?.meta?.totalCount ?? 1);
  }, [data]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="establishment-container">
      <h2>Food Hygiene Ratings</h2>
      <EstablishmentsTable
        establishments={data?.establishments ?? []}
        isLoading={loading}
      />
      <EstablishmentsTablePagination
        pageNum={pageNum}
        pageCount={totalPages}
        onPreviousPage={() => {
          setPageNum(pageNum - 1);
          refetch();
        }}
        onNextPage={() => {
          setPageNum(pageNum + 1);
          refetch();
        }}
        isDisabled={loading}
      />
    </div>
  );
};
