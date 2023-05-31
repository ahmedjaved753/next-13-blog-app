type FetcherParamsType = {
  url: string;
  method: string;
  body?: any;
};
const fetcher = async ({ url, method, body }: FetcherParamsType) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const data = await res.json();
  return data;
};

export default fetcher;
