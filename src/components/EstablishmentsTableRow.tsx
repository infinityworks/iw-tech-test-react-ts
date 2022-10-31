import { useNavigate } from "react-router-dom";

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

  const handleClick = (e: any) => {
    if (e !== undefined) {
      const id = e.target.getAttribute("id");
      if (id != null) navigate(`/detail/${id}`);
    }
  };

  return (
    <tr>
      {Object.keys(headerAttr).map((attr: string, index: number) => {
        if (establishment !== undefined && establishment !== null) {
          switch (attr) {
            case "Favorite":
              return (
                <td
                  id={establishment.FHRSID}
                  key={index}
                  style={styledCheckBoxes}
                >
                  <input type="checkbox" />
                </td>
              );
            case "BusinessName":
              return (
                <td
                  id={establishment.FHRSID}
                  onClick={handleClick}
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
