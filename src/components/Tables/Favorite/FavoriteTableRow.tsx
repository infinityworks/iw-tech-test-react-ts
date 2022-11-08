const styledValues: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

interface Props {
  establishment: { [key: string]: any } | null | undefined;
  handleDelete?:any;
  headerAttr: { BusinessName: string; RatingValue: string; Favorite: string };
}

const buttonLabel = "Remove";

export const FavoriteTableRow: React.FC<Props> = ({
  establishment,
  handleDelete,
  headerAttr,
}) => {
  return (
    <tr>
      {Object.keys(headerAttr).map((attr: string, index: number) => {
        if (establishment !== undefined && establishment !== null) {
          switch (attr) {
            case "BusinessName":
              return (
                <td id={establishment.FHRSID} key={index} style={styledValues}>
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
                <td key={index}>
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
