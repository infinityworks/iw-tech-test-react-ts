type EstablishmentsTableRowProps = {
  establishment: EstablishmentDto;
};

export const EstablishmentsTableRow = ({
  establishment,
}: EstablishmentsTableRowProps) => {
  return (
    <tr className="establishment-table__row">
      <td>{establishment?.BusinessName}</td>
      <td>{establishment?.RatingValue}</td>
    </tr>
  );
};
