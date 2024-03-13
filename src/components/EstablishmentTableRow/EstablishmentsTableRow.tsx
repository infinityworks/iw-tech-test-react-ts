import { useNavigate } from "react-router-dom";
import "./index.css";

type EstablishmentsTableRowProps = {
  establishment: Pick<
    EstablishmentDto,
    "BusinessName" | "RatingValue" | "FHRSID"
  >;
};

export const EstablishmentsTableRow = ({
  establishment,
}: EstablishmentsTableRowProps) => {
  const navigate = useNavigate();
  const linkToEstablishment = `/establishment/${establishment.FHRSID}`;
  return (
    <tr>
      <td>
        <a
          href={linkToEstablishment}
          onClick={(event) => {
            event.preventDefault();
            navigate(linkToEstablishment);
          }}
          className="establishment__link"
        >
          {establishment.BusinessName}
        </a>
      </td>
      <td>{establishment.RatingValue}</td>
    </tr>
  );
};
