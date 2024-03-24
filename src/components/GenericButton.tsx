import React from "react";
import styles from "../styles/GenericButton.module.css";

const GenericButton: React.FC<{ text: string; onClick?: () => void; classes?: string[] }> = ({
  text,
  onClick,
  classes
}) => {
  const buttonClasses = [styles.button, classes]; 
  
  return (
    <button className={buttonClasses.join(' ')} onClick={onClick}>
      {text}
    </button>
  );
};

export default GenericButton;
