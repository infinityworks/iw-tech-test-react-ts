const headerStyle: { [key: string]: string | number } = {
  padding: "10px",
  textAlign: "left",
  fontSize: "20px",
  color: "white",
  opacity: "1",
};
interface Props {
  name: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  options: any;
  optionLabel: string;
}
const Dropdown = ({
  name,
  label,
  onChange,
  value,
  options,
  optionLabel,
}: Props) => {
  return (
    <div>
      <label style={headerStyle}>{label} </label>
      <select name={name} id={name} onChange={onChange} value={value}>
        {options.map((value: any, index: number) => {
          return (
            <option value={index} key={index}>
              {value[optionLabel]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
