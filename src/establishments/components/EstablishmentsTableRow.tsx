import { Establishment } from "../types";

interface Props {
  establishment: Establishment;
}

export const EstablishmentsTableRow = ({ establishment }: Props) => {
  return (
    <tr>
      <td>{establishment?.BusinessName}</td>
      <td>{establishment?.RatingValue}</td>
    </tr>
  );
};
