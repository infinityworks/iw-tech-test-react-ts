import { PropsWithChildren } from "react";
import { Logo } from "../Logo";
import "./index.css";
import { Container } from "../Container";
import { EstablishmentFavouriteTable } from "../EstablishmentFavoriteTable";

export const PageTemplate = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <header className="header">
        <Logo />
      </header>
      <main>
        <Container>{children}</Container>
        <Container>
          <EstablishmentFavouriteTable />
        </Container>
      </main>
    </>
  );
};
