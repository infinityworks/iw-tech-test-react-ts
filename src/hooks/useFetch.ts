import { useEffect, useState } from "react";

export const useFetch = <Data>(
  url: string,
  options?: RequestInit | undefined
) => {
  const [data, setData] = useState<Data | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(url);
  const [init, setInit] = useState(options);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = () => {
    setInput(url);
    setInit(options);
    setRefetchIndex((prevRefetchIndex) => prevRefetchIndex + 1);
  };

  useEffect(() => {
    (async function () {
      try {
        setError(undefined);
        setData(undefined);
        setLoading(true);
        const response = await fetch(input, init);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = (await response.json()) as Data;
        setData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [input, init, refetchIndex]);

  return { data, error, loading, refetch };
};
