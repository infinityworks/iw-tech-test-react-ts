import { useState } from "react";
import { EstablishmentListView } from "./EstablishmentListView";
import { EstablishmentDetailView } from "./EstablishmentDetailView";
import Background from "../static/logo.svg";
import Card from '../components/Card';

const logoStyle: { [key: string]: string | number } = {
  width: "640px",
  height: "25px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

const HomePage = () => {
  const [selectedEstablishmentId, setSelectedEstablishment] = useState<number | null>(null);

  return (
    <>
      <header style={logoStyle} />

      <Card>
        {
          selectedEstablishmentId
            ? (
              <EstablishmentDetailView
                establishmentId={selectedEstablishmentId}
                onGoBack={() => setSelectedEstablishment(null)}
              />
            ) : (
              <EstablishmentListView
                onEstablishmentClick={(establishmentId) => setSelectedEstablishment(establishmentId)}
              />
            )
        }
      </Card>
    </>
  );
};

export default HomePage;
