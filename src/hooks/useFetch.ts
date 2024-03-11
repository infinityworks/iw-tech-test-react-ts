import { useEffect, useState } from "react";

export const useFetch = <Data>(
  url: string,
  options?: RequestInit | undefined
) => {
  const [data, setData] = useState<Data | undefined>();
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [input] = useState(url);
  const [init] = useState(options);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () =>
    setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1);
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        setData(undefined);
        const response = await fetch(input, init);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = (await response.json()) as Data;
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [input, init, refetchIndex]);

  return { data, error, loading, refetch };
};
