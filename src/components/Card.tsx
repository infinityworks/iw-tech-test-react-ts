import { ReactNode, FC } from 'react';

type Props = { children: ReactNode };

const cardStyle: { [key: string]: string | number } = {
  background: "rgba(51, 51, 51, 0.9)",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
  minHeight: "440px",
  minWidth: "550px",
  display: "flex",
  flexDirection: "column"
};

const Card: FC<Props> = ({ children }) => {
  return (
    <div style={cardStyle}>
      { children }
    </div>
  );
};

export default Card;
