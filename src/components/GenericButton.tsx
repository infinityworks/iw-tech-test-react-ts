import React from "react";
import styles from "../styles/GenericButton.module.css";

const GenericButton: React.FC<{ text: string; onClick?: () => void }> = ({
  text,
  onClick,
}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default GenericButton;
