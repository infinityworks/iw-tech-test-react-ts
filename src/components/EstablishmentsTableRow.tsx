import { Establishment } from "../api/ratingsAPI";

const tableDataStyle: { [key: string]: string | number } = {
  fontSize: "20px"
};

export const EstablishmentsTableRow: React.FC<{
  establishment: Establishment | null | undefined;
}> = ({ establishment }) => {
  return (
    <tr>
      <td style={tableDataStyle}>{establishment?.BusinessName}</td>
      <td style={tableDataStyle}>{establishment?.RatingValue}</td>
    </tr>
  );
};
