import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { Establishment } from "../types";
import { getEstablishmentRatings } from "../../api/ratingsAPI";

const tableStyle = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

type EstablishmentsRetrievalError = {
  message: string;
  [key: string]: string
}

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] = useState<EstablishmentsRetrievalError>();
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount] = useState(100);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRatings = async () => {
    try {
      const ratings = await getEstablishmentRatings(pageNum);
      setEstablishments(ratings.establishments);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  const handlePreviousPage = () => {
    if (pageNum > 1) {
      setPageNum((prevPageNum: number) => prevPageNum - 1);
      setIsLoading(true);
    } 
  }

  const handleNextPage = () => {
    if (pageNum < pageCount) {
      setPageNum((prevPageNum: number) => prevPageNum + 1);
      setIsLoading(true);
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={tableStyle}>
      <h2>Food Hygiene Ratings</h2>
      <EstablishmentsTable establishments={establishments} isLoading={isLoading}/>
      <EstablishmentsTableNavigation
        pageNum={pageNum}
        pageCount={pageCount}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};
