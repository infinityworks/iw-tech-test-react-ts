interface Props {
  value: boolean;
  onChange: (newValue: boolean) => void;
}

const Checkbox = ({ value, onChange }: Props) => {
  return (
    <input
      type="checkbox"
      checked={value}
      onChange={(event) => {
        const { checked } = event.target;
        onChange(checked);
      }}
    />
  );
};

export default Checkbox;
