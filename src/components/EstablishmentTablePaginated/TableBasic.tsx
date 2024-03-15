import { useState } from "react";
import { EstablishmentsTable } from "../EstablishmentTable";
import { EstablishmentsTablePagination } from "../EstablishmentTablePagination";
import { getRatings } from "../../api/getRatings";
import { useQuery } from "@tanstack/react-query";

export const TableBasic = () => {
  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["getRatings", getRatings],
    queryFn: () => getRatings(pageNum),
  });

  if (error) {
    return <div>Error: {error?.message} </div>;
  }

  return (
    <>
      <EstablishmentsTable
        establishments={data?.establishments ?? []}
        isLoading={isLoading || isFetching}
      />
      <EstablishmentsTablePagination
        pageNum={pageNum}
        pageCount={data?.meta?.totalCount ?? 1}
        onPreviousPage={() => {
          setPageNum(pageNum - 1);
          refetch();
        }}
        onNextPage={() => {
          setPageNum(pageNum + 1);
          refetch();
        }}
        isDisabled={isLoading || isFetching}
      />
    </>
  );
};
