import { useContext, useEffect, useState } from "react";
import { FavoriteContext, FavoriteDeletionContext } from "../../../App";

const styledValues: { [key: string]: string | number } = {
    paddingBottom: "10px",
    textAlign: "left",
    fontSize: "20px",
  };

interface Props {
  establishment: { [key: string]: any } | null | undefined;
  headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
  setState: any;
  state: any;
}

const buttonLabel = "Remove";


export const FavoriteTableRow: React.FC<Props> = ({
  establishment,
  headerAttr,
  setState,
  state,
}) => {
    const { favorite, setFavorite } = useContext(FavoriteContext);
    const { setFavoriteDeletion } = useContext(FavoriteDeletionContext);

  const handleDelete = (e: any) => {
    if (e !== undefined) {
      const id = e.target.getAttribute("id");
      const filtered = favorite.filter((obj: any) => {
        if (obj.FHRSID === parseInt(id)) setFavoriteDeletion(obj.FHRSID);
        return obj.FHRSID !== parseInt(id);
      });
      if (filtered.length === 0) setFavorite([]);
      setFavorite(filtered);
    }
  };

  return (
    <tr>
      {Object.keys(headerAttr).map((attr: string, index: number) => {
        if (establishment !== undefined && establishment !== null) {
          switch (attr) {
            case "BusinessName":
              return (
                <td
                  id={establishment.FHRSID}
                  key={index}
                  style={styledValues}
                >
                  {establishment[attr]}
                </td>
              );
            case "RatingValue":
              return (
                <td key={index} style={styledValues}>
                  {establishment[attr]}
                </td>
              );
            case "Favorite":
              return (
                <td key={index} >
                  <button id={establishment.FHRSID} onClick={handleDelete}>
                    {buttonLabel}
                  </button>
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
