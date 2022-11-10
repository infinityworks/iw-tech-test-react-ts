import PropTypes from "prop-types";

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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    onChange(checked, indexRow);
  };

  return (
    <input
      key={indexRow}
      id={indexRow.toString()}
      type="checkbox"
      onChange={handleChange}
      value={defaulteEstablishment.isFavorite}
      defaultChecked={defaulteEstablishment.isFavorite}
    />
  );
};
export default Checkbox;

Checkbox.propTypes = {
  defaulteEstablishment: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  indexRow: PropTypes.number.isRequired,
};
