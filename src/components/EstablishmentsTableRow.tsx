const tableDataStyle: { [key: string]: string | number } = {
  fontSize: "20px"
};

export const EstablishmentsTableRow: React.FC<{
  establishment: { [key: string]: string } | null | undefined;
}> = ({ establishment }) => {
  return (
    <tr>
      <td style={tableDataStyle}>{establishment?.BusinessName}</td>
      <td style={tableDataStyle}>{establishment?.RatingValue}</td>
    </tr>
  );
};
