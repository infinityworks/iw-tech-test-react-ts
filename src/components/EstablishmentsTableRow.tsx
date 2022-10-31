import { useNavigate } from "react-router-dom";

const styledValues: { [key: string]: string | number } = {
  fontSize: "20px",
};

export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: any } | null | undefined;
  headerAttr: { BusinessName: string; RatingValue: string };
}> = ({ establishment, headerAttr }) => {
  let navigate = useNavigate();

  const handleClick = (e: any) => {
    if (e !== undefined) {
      const id = e.target.getAttribute("id");
      if (id != null) navigate(`/detail/${id}`);
    }
  };
  return (
    <tr style={styledValues}>
      {Object.keys(headerAttr).map((attr: string, index: number) => {
        if (establishment !== undefined && establishment !== null) {
          return (
            <td
              onClick={handleClick}
              id={establishment.LocalAuthorityBusinessID}
              key={index}
            >
              {establishment ? establishment[attr] : null}
            </td>
          );
        } else return null;
      })}
    </tr>
  );
};
