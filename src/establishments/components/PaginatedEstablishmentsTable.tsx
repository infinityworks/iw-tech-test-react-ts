import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { Country, Establishment } from "../types";
import { getEstablishmentRatingsComplex } from "../api/ratingsAPI";
import { CountryPicker } from "./CountryPicker";
import { countries } from "../model/countries";
import { RatingMappingServiceFactory } from "../services/RatingMappingServiceFactory";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  table: {
    background: "rgba(51, 51, 51, 0.9)",
    padding: "10px",
    width: "max-content",
    marginLeft: "50px",
    color: "white",
  }
});

type EstablishmentsRetrievalError = {
  message: string;
  [key: string]: string
}

export const PaginatedEstablishmentsTable = () => {
  const [error, setError] = useState<EstablishmentsRetrievalError>();
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(100);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();

  const fetchRatings = async () => {
    try {
      const ratings = await getEstablishmentRatingsComplex(pageNum, selectedCountry);
      const ratingMapper = RatingMappingServiceFactory.createFor(selectedCountry);
      setEstablishments(ratings.establishments.map(establishment => ({
        BusinessName: establishment.BusinessName,
        RatingValue: `${ratingMapper.convert(establishment.RatingValue)} (originally ${establishment.RatingValue})`
      })));
      setPageCount(Math.min(100, ratings.meta.totalPages));
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, selectedCountry]);

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

  const handleCountrySelect = (newCountry: Country) => {
    if (selectedCountry !== newCountry) {
      setSelectedCountry(newCountry);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={classes.table}>
      <h2>Food Hygiene Ratings</h2>
      <CountryPicker onSelectCountry={handleCountrySelect}/>
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