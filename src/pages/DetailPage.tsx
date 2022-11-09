import { useState, useEffect } from "react";
import {
  getEstablishmentDetail,
  EstablishmentsType,
} from "../services/detailApi";
import { useNavigate } from "react-router-dom";
import { getDate } from "../services/helper";

const headerStyle: { [key: string]: string | number } = {
  padding: "10px",
  textAlign: "left",
  fontSize: "20px",
  color: "white",
  opacity: "1",
};

const backgroundStyled: { [key: string]: string | number } = {
  background: "rgba(214,86,34,0.3)",
  width: "50%",
};
const pageLabel = "Detail Page";
const labelHomeButton = "<-- Go to HomePage";

const DetailPage = () => {
  let initialState = {
    data: [],
    headerAttr: {
      AddressLine1: "AddressLine1",
      AddressLine2: "AddressLine2",
      AddressLine3: "AddressLine3",
      AddressLine4: "AddressLine4",
      RatingValue: "RatingValue",
      RatingDate: "RatingDate",
    },
    isLoading: false,
  };

  const [state, setState] = useState<{
    data: any;
    headerAttr: {
      AddressLine1: string;
      AddressLine2: string;
      AddressLine3: string;
      AddressLine4: string;
      RatingValue: string;
      RatingDate: string;
    };
    isLoading: boolean;
  }>(initialState);
  const [error, setError] = useState<{
    message: string;
    [key: string]: string;
  }>();
  let navigate = useNavigate();

  useEffect(() => {
    const id = window.location.href.split("/detail/")[1];
    setState({ ...state, isLoading: true });
    getEstablishmentDetail(id).then(
      (result: EstablishmentsType) => {
        setState({ ...state, data: result?.establishments, isLoading: false });
      },
      (error) => {
        setState({ ...state, isLoading: false });
        setError(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    navigate(`/`);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else
    return (
      <section style={backgroundStyled}>
        <article style={headerStyle}>
          <h1 style={headerStyle}>{pageLabel}</h1>
          {Object.keys(state.headerAttr).map((attr: string, index: number) => {
            if (state?.data.length > 0 && state?.data !== undefined) {
              switch (attr) {
                case "RatingDate":
                  return (
                    <div key={index}>Date: {getDate(state.data[0][attr])}</div>
                  );
                case "RatingValue":
                  return <div key={index}>Rating: {state.data[0][attr]}</div>;
                default:
                  return <div key={index}>Address: {state.data[0][attr]}</div>;
              }
            } else return null;
          })}
          <button onClick={handleClick}> {labelHomeButton} </button>
        </article>
      </section>
    );
};
export default DetailPage;
