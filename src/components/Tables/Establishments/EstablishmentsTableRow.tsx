import { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteContext, FavoriteDeletionContext } from "../../../App";
import Checkbox from "../../Checkbox/checkbox";

const styledValues: { [key: string]: string | number } = {
  fontSize: "20px",
};

const styledClickableValues: { [key: string]: string | number } = {
  fontSize: "20px",
  cursor: "pointer",
};

const styledCheckBoxes: { [key: string]: string | number } = {
  display: "flex",
  justifyContent: "center",
};

interface Props {
  establishment: { [key: string]: any } | null | undefined;
  headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
  setState: any;
  state: any;
  handleChange:any;
  indexRow: number;
}

export const EstablishmentsTableRow: React.FC<Props> = ({
  establishment,
  headerAttr,
  setState,
  state,
  handleChange,
  indexRow
}) => {
  let navigate = useNavigate();
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const { favoriteDeletion, setFavoriteDeletion } = useContext(
    FavoriteDeletionContext
  );
  const [defaulteEstablishment] = useState(establishment);

  const handleNavigate = (e: any) => {
    if (e !== undefined) {
      const id = e.target.getAttribute("id");
      if (id != null) navigate(`/detail/${id}`);
    }
  };

  // const handleFavorite = (e: any) => {
  //   if (e !== undefined && e.target.value !== undefined) {
  //     const id = e.target.getAttribute("id");
  //     const value = e.target.checked;
  //     console.log(Boolean(value));

  //     if (Boolean(value) === true) {
  //       // mapping to big payload
  //       const data = state.data.map((fav: any) => {
  //         if (fav.FHRSID === parseInt(id)) {
  //           fav.isFavorite = true;
  //         }
  //         return fav;
  //       });
  //       setState({ ...state, data: data });
  //       // putting establishment into favorite context
  //       const index = favorite.findIndex((fav: any) => {
  //         return fav.FHRSID === parseInt(id);
  //       });
  //       if (index === -1) setFavorite([...favorite, defaulteEstablishment]);
  //     } else if (Boolean(value) === false) {
  //       // mapping to big payload
  //       const data = state.data.map((fav: any) => {
  //         if (fav.FHRSID === parseInt(id)) {
  //           fav.isFavorite = false;
  //         }
  //         return fav;
  //       });
  //       setState({ ...state, data: data });
  //       // putting defaulteEstablishment into favorite context
  //       const filtered = favorite.filter(
  //         (obj: any) => obj.FHRSID !== parseInt(id)
  //       );
  //       console.log(filtered);
  //       if (filtered.length === 0) setFavorite([]);
  //       setFavorite(filtered);
  //     }
  //   }
  // };

  
  // useEffect(() => {
  //   if (
  //     defaulteEstablishment &&
  //     favoriteDeletion !== 0 &&
  //     defaulteEstablishment?.FHRSID === favoriteDeletion
  //   ) {
  //     defaulteEstablishment.isFavorite = false;
  //     setFavoriteDeletion(0);
  //   }
  // }, [favoriteDeletion, defaulteEstablishment, setFavoriteDeletion]);


  return (
    <tr>
      {Object.keys(headerAttr).map((attr: string, index: number) => {
        if (
          defaulteEstablishment !== undefined &&
          defaulteEstablishment !== null
        ) {
          switch (attr) {
            case "BusinessName":
              return (
                <td
                  id={defaulteEstablishment.FHRSID}
                  onClick={handleNavigate}
                  key={index}
                  style={styledClickableValues}
                >
                  {defaulteEstablishment[attr]}
                </td>
              );
            case "RatingValue":
              return (
                <td key={index} style={styledValues}>
                  {defaulteEstablishment[attr]}
                </td>
              );
            case "Favorite":
              return (
                <td key={index} style={styledCheckBoxes}>
                  <Checkbox
                    defaulteEstablishment={defaulteEstablishment}
                    onChange={handleChange}
                    indexRow={indexRow}
                  />
                </td>
              );
            default:
              return null;
          }
        } else return null;
      })}
    </tr>
  );
};
