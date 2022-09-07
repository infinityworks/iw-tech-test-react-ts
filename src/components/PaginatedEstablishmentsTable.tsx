import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { getEstablishmentRatings } from "../api/ratingsAPI";

const tableStyle: { [key: string]: string | number } = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
  minHeight: "400px",
  minWidth: "550px",
  display: "flex",
  flexDirection: "column"
};

const loaderStyle: { [key: string]: string | number } = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] = useState<{ message: string; [key: string]: string }>();
  const [establishments, setEstablishments] = useState<{ [key: string]: string }[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [pageCount] = useState(100);

  useEffect(() => {
    fetchEstablishmentRatingsPage(pageNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePreviousPage() {
    pageNum > 1 && setPageNum(pageNum - 1);
    fetchEstablishmentRatingsPage(pageNum);
  }

  function handleNextPage() {
    pageNum < pageCount && setPageNum(pageNum + 1);
    fetchEstablishmentRatingsPage(pageNum);
  }

  async function fetchEstablishmentRatingsPage(page: number): Promise<void> {
    try {
      setLoading(true);
      setEstablishments([]);

      const result = await getEstablishmentRatings(pageNum);
      setEstablishments(result.establishments);
    } catch(error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div style={tableStyle}>
        <h2>Food Hygiene Ratings</h2>
        <EstablishmentsTable
          establishments={establishments}
        />

        {
          isLoading && <span style={loaderStyle}>Loading...</span>
        }

        <EstablishmentsTableNavigation
          pageNum={pageNum}
          pageCount={pageCount}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </div>
    );
  }
};
