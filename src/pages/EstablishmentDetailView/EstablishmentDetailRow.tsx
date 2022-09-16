const tableDataStyle: { [key: string]: string | number } = {
  fontSize: "20px"
};

export const EstablishmentDetailRow: React.FC<{
  label: string;
  value: string | number | boolean;
}> = ({ label, value }) => {
  return (
    <tr>
      <td style={tableDataStyle}>{label}</td>
      <td style={tableDataStyle}>{value}</td>
    </tr>
  );
};
