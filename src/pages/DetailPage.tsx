import { useState, useEffect } from "react";
import { getEstablishmentDetail } from "../services/detailApi";

const DetailPage = () => {
  let initialState = {
    data: [],
    headerAttr: {
      RatingDate: "RatingDate",
      RatingValue: "RatingValue",
    },
    isLoading: false,
  };

  // const [state, setState] = useState<{
  //   data: {}[];
  //   headerAttr: { BusinessName: string; RatingValue: string };
  //   isLoading: boolean;
  // }>(initialState);

  useEffect(() => {
    // setState({ ...state, isLoading: true });
    const id = window.location.href.split("/detail/")[1]
    getEstablishmentDetail(id).then(
      (result) => {
        console.log(result)
        // setState({ ...state, isLoading: false });
        // setEstablishments(result?.establishments);
      },
      (error) => {
        // setState({ ...state, isLoading: false });
        // setError(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <> Detail Page</>;
};
export default DetailPage;
