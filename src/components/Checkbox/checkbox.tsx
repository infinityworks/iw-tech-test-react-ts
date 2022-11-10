interface Props {
  value: boolean;
  onChange: (newValue: boolean) => void;
}

const Checkbox = ({ value, onChange }: Props) => (
  <input
    type="checkbox"
    onChange={(event) => {
      const { checked } = event.target;
      onChange(checked);
    }}
    checked={value}
  />
);

export default Checkbox;

