import { PropsWithChildren } from "react";
import "./index.css";

export const Container = ({ children }: PropsWithChildren<{}>) => {
  return <div className="establishment-container">{children}</div>;
};
