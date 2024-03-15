import { useNavigate, useParams } from "react-router-dom";
import { getEstablishment } from "../api/getEstablishment";
import { useEffect } from "react";
import { PageTemplate } from "../components/PageTemplate";
import { useQuery } from "@tanstack/react-query";

const formatDate = (isoString: string) =>
  new Intl.DateTimeFormat("in", { dateStyle: "short" }).format(
    new Date(isoString)
  );

const Establishment = () => {
  const { establishmentId } = useParams();
  const navigate = useNavigate();
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery({
    queryKey: ["getEstablishment", establishmentId],
    queryFn: () => getEstablishment(establishmentId ?? ""),
  });

  useEffect(() => {
    if (!establishmentId) {
      navigate("/", { replace: true });
    }
  }, [establishmentId, navigate]);

  if (!establishmentId) {
    return <></>;
  }

  return (
    <PageTemplate>
      <button type="button" onClick={() => navigate(-1)}>
        Go Back
      </button>
      {error && <>Error: {error?.message} </>}
      {loading && <>Loading ...</>}
      {data && (
        <>
          <h1>{data?.BusinessName}</h1>
          <address>
            {data?.AddressLine1}
            <br />
            {data?.AddressLine2}
            <br />
            {data?.AddressLine3}
            {data?.AddressLine4}
            <br />
          </address>
          <br />
          <div data-cy="rating">Rating: {data?.RatingValue}</div>
          <div data-cy="rating-date">
            Rating Date: {data?.RatingDate && formatDate(data.RatingDate)}
          </div>
        </>
      )}
      {!loading && !error && !data && <>There is no data.</>}
    </PageTemplate>
  );
};

export default Establishment;
