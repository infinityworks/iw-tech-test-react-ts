import { EstablishmentsTableRow } from "../EstablishmentTableRow";
import "./index.css";

type EstablishmentsTableProps = {
  establishments: EstablishmentDto[];
  isLoading: boolean;
};

export const EstablishmentsTable = ({
  establishments,
  isLoading,
}: EstablishmentsTableProps) => {
  return (
    <table className="establishment-table">
      <thead>
        <tr>
          <th>Business Name</th>
          <th>Rating Value</th>
        </tr>
        {isLoading && (
          <tr>
            <th colSpan={2}>Loading ...</th>
          </tr>
        )}
      </thead>
      <tbody>
        {establishments.map((establishment, index) => (
          <EstablishmentsTableRow key={index} establishment={establishment} />
        ))}
      </tbody>
    </table>
  );
};
