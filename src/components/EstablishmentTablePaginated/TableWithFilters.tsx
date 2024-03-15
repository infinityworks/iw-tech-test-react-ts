import { useEffect, useState } from "react";
import { getRatingsByAuthority } from "../../api/getRatingsByAuthority";
import { EstablishmentsTable } from "../EstablishmentTable";
import { EstablishmentsTablePagination } from "../EstablishmentTablePagination";
import { useQuery } from "@tanstack/react-query";

type TableWithFiltersProps = {
  localAuthorityId: string;
};

export const TableWithFilters = ({
  localAuthorityId: initLocalAuthorityId,
}: TableWithFiltersProps) => {
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [localAuthorityId, setLocalAuthorityId] =
    useState(initLocalAuthorityId);

  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: [
      "getRatings",
      {
        pageNumber: pageNum,
        localAuthorityId: localAuthorityId ?? "",
        pageSize: 10,
      },
    ],
    queryFn: () =>
      getRatingsByAuthority({
        pageNumber: pageNum,
        localAuthorityId: localAuthorityId ?? "",
        pageSize: 10,
      }),
  });

  useEffect(() => {
    setTotalPages(data?.meta?.totalCount ?? 1);
  }, [data]);

  useEffect(() => {
    //refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  useEffect(() => {
    setLocalAuthorityId(initLocalAuthorityId);
    setPageNum(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initLocalAuthorityId]);

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
