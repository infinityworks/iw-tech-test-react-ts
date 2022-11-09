interface Props {
  defaulteEstablishment: { [key: string]: any };
  onChange: any;
  indexRow: number;
}

const Checkbox: React.FC<Props> = ({
  defaulteEstablishment,
  onChange,
  indexRow,
}) => {
  return (
    <input
      key={indexRow}
      id={indexRow.toString()}
      type="checkbox"
      onChange={() => onChange(defaulteEstablishment.isFavorite, indexRow)}
      // checked={defaulteEstablishment.isFavorite}
      value ={defaulteEstablishment.isFavorite}
    />
  );
};
export default Checkbox;
