import React, { useState } from "react";
import styles from "../styles/FavouriteCheckbox.module.css";

interface FavouriteCheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const FavouriteCheckbox: React.FC<FavouriteCheckboxProps> = ({
  isChecked,
  onChange,
}) => {
  const [checked, setChecked] = useState(isChecked); 
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange && onChange(event.target.checked);
  };

  return (
    <label className={styles.styledCheckbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <span className={styles.styledDot} />
    </label>
  );
};

export default FavouriteCheckbox;
