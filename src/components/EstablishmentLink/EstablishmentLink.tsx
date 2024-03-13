import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

type EstablishmentLinkProps = PropsWithChildren<{
  id: number;
}>;

export const EstablishmentLink = ({ id, children }: EstablishmentLinkProps) => {
  const navigate = useNavigate();
  const linkToEstablishment = `/establishment/${id}`;
  return (
    <a
      href={linkToEstablishment}
      onClick={(event) => {
        event.preventDefault();
        navigate(linkToEstablishment);
      }}
      className="establishment__link"
    >
      {children}
    </a>
  );
};
