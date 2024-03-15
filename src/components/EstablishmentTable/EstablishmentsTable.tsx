import { ComponentProps } from "react";
import { EstablishmentsTableRow } from "../EstablishmentTableRow";
import "./index.css";

type EstablishmentsTableProps = {
  establishments: ComponentProps<
    typeof EstablishmentsTableRow
  >["establishment"][];
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
          <th></th>
        </tr>
        {isLoading && (
          <tr>
            <th colSpan={3}>Loading ...</th>
          </tr>
        )}
      </thead>
      <tbody>
        {!isLoading &&
          establishments.map((establishment, index) => (
            <EstablishmentsTableRow key={index} establishment={establishment} />
          ))}
      </tbody>
    </table>
  );
};
