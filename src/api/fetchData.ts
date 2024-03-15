export const fetchData = async <Data>(
  url: string,
  options?: RequestInit | undefined
) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = (await response.json()) as Data;
  return data;
};
