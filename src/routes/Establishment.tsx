import { useNavigate, useParams } from "react-router-dom";
import { useFetchEstablishment } from "../hooks/useFetchEstablishment";
import { useEffect } from "react";
import { PageTemplate } from "../components/PageTemplate";

const formatDate = (isoString: string) =>
  new Intl.DateTimeFormat("in", { dateStyle: "short" }).format(
    new Date(isoString)
  );

const Establishment = () => {
  const { establishmentId } = useParams();
  const navigate = useNavigate();
  const { error, data, loading } = useFetchEstablishment(establishmentId ?? "");

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
          <div>Rating: {data?.RatingValue}</div>
          <div>
            Rating Date: {data?.RatingDate && formatDate(data.RatingDate)}
          </div>
        </>
      )}
      {!loading && !error && !data && <>There is no data.</>}
    </PageTemplate>
  );
};

export default Establishment;
