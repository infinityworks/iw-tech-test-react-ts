import { Establishment } from "../../api/ratingsAPI";

const tableDataStyle: { [key: string]: string | number } = {
  fontSize: "20px"
};

const linkStyle: { [key: string]: string | number } = {
  cursor: "pointer"
}

export const EstablishmentListRow: React.FC<{
  establishment: Establishment;
  onclick: (establishmentId: number) => void;
}> = ({ establishment, onclick }) => {
  return (
    <tr>
      <td style={tableDataStyle}>
        <span
          style={linkStyle}
          onClick={() => onclick(establishment.FHRSID)}
        >
            {establishment.BusinessName}
        </span>
      </td>
      <td style={tableDataStyle}>{establishment.RatingValue}</td>
    </tr>
  );
};
