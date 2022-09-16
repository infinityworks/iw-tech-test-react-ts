import { useState, useEffect } from "react";
import { EstablishmentDetailCard } from "./EstablishmentDetailCard";
import Loader from "../../components/Loader";
import {
  getEstablishmentDetail,
  EstablishmentDetail
} from "../../api/ratingsAPI";

type EstablishmentDetailProps = {
  establishmentId: number;
  onGoBack: () => void
}

const backButtonStyle: { [key: string]: string | number } = {
  cursor: "pointer"
}

export const EstablishmentDetailView = ({ establishmentId, onGoBack }: EstablishmentDetailProps) => {
  const [establishmentDetail, setEstablishmentDetail] = useState<EstablishmentDetail | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string; [key: string]: string }>();

  useEffect(() => {
    async function fetchEstablishmentDetail(establishmentId: number): Promise<void> {
      try {
        setLoading(true);

        const establishmentDetailData = await getEstablishmentDetail(establishmentId);

        setEstablishmentDetail(establishmentDetailData);
        setError(undefined);
      } catch(error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchEstablishmentDetail(establishmentId);
  }, [establishmentId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <span
        style={backButtonStyle}
        onClick={() => onGoBack()}
      >
        &larr; back
      </span>

      {
        isLoading
          ? <Loader />
          : <EstablishmentDetailCard establishment={establishmentDetail!} />
      }
    </>
  );
};
