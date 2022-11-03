import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteContext } from "../../App";

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

export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: any } | null | undefined;
  headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
}> = ({ establishment, headerAttr }) => {
  let navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const { favorite, setFavorite } = useContext(FavoriteContext);
  const handleNavigate = (e: any) => {
    if (e !== undefined) {
      const id = e.target.getAttribute("id");
      if (id != null) navigate(`/detail/${id}`);
    }
  };

  const handleFavorite = (e: any) => {
    if (e !== undefined) {
      const id = e.target.getAttribute("id");
      setChecked(!checked);
      if (!checked) {
        setFavorite([...favorite, establishment]);
      } else if (!checked === false) {
        const filtered = favorite.filter(
          (obj: any) => obj.FHRSID !== parseInt(id)
        );
        if (filtered.length === 0) setFavorite([]);
        setFavorite(filtered);
      }
    }
  };
  return (
    <tr>
      {Object.keys(headerAttr).map((attr: string, index: number) => {
        if (establishment !== undefined && establishment !== null) {
          switch (attr) {
            case "Favorite":
              return (
                <td key={index} style={styledCheckBoxes}>
                  <input
                    id={establishment.FHRSID}
                    type="checkbox"
                    onChange={handleFavorite}
                    defaultChecked={false}
                  />
                </td>
              );
            case "BusinessName":
              return (
                <td
                  id={establishment.FHRSID}
                  onClick={handleNavigate}
                  key={index}
                  style={styledClickableValues}
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
            default:
              return null;
          }
        } else return "null";
      })}
    </tr>
  );
};
