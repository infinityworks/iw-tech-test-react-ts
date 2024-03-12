import { useEffect, useState } from "react";
import { EstablishmentsTable } from "../EstablishmentTable";
import { EstablishmentsTablePagination } from "../EstablishmentTablePagination";
import { useFetchRatings } from "../../hooks/useFetchRatings";

export const TableBasic = () => {
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, error, loading, refetch } = useFetchRatings(pageNum);

  useEffect(() => {
    setTotalPages(data?.meta?.totalCount ?? 1);
  }, [data]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  if (error) {
    return <div>Error: {error?.message} </div>;
  }

  return (
    <>
      <EstablishmentsTable
        establishments={data?.establishments ?? []}
        isLoading={loading}
      />
      <EstablishmentsTablePagination
        pageNum={pageNum}
        pageCount={totalPages}
        onPreviousPage={() => {
          setPageNum(pageNum - 1);
        }}
        onNextPage={() => {
          setPageNum(pageNum + 1);
        }}
        isDisabled={loading}
      />
    </>
  );
};
