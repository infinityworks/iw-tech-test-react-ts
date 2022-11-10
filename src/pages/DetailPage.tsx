import { useState, useEffect } from "react";
import { getEstablishmentDetail } from "../services/detailApi";
import { useNavigate } from "react-router-dom";
import { getDate } from "../services/helper";
import { EstablishmentsType } from "../types/Establishment";

const headerStyle: { [key: string]: string | number } = {
  padding: "10px",
  textAlign: "left",
  fontSize: "20px",
  color: "white",
  opacity: "1",
};

const backgroundStyled = {
  background: "rgba(214,86,34,0.3)",
  width: "50%",
};

const pageLabel = "Detail Page";
const labelHomeButton = "<-- Go to HomePage";

const DetailPage = () => {
  let initialState = {
    data: [],
    headerAttr: {
      AddressLine1: "Address",
      AddressLine2: "Address",
      AddressLine3: "Address",
      AddressLine4: "Address",
      RatingValue: "Rating",
      RatingDate: "Date of Inspection",
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
              const name = Object.values(state.headerAttr)[index]
              switch (attr) {
                case "RatingDate":
                  return (
                    <div key={index}>{name}: {getDate(state.data[0][attr])}</div>
                  );
                case "RatingValue":
                  return <div key={index}>{name}: {state.data[0][attr]}</div>;
                default:
                  return <div key={index}>{name}: {state.data[0][attr]}</div>;
              }
            } else return null;
          })}
          <button onClick={handleClick}> {labelHomeButton} </button>
        </article>
      </section>
    );
};
export default DetailPage;
