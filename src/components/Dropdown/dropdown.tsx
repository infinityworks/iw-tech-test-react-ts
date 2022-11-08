

const headerStyle: { [key: string]: string | number } = {
  padding: "10px",
  textAlign: "left",
  fontSize: "20px",
  color: "white",
  opacity: "1",
};

const Dropdown: React.FC<{
  name: string;
  label: string;
  onChange: any;
  value: string;
  options: {}[];
  optionLabel: string;
}> = ({ name, label, onChange, value, options, optionLabel }) => {
  return (
    <div >
      <label style={headerStyle}>{label} </label>
      <select name={name} id={name} onChange={onChange} value={value}>
        {options.map((value: any, index: number) => {
          return <option value={index} key={index}>{value[optionLabel]}</option>;
        })}
      </select>
    </div>
  );
};

export default Dropdown;
