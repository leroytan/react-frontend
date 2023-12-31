import { useState, useEffect } from 'react';
export interface Data  {
  id: number;
  title: string;
  body: string;
  updated_at: string;
  created_at: string;
}
export function isData(data: Data | Data[]): data is Data {
  return (data as Data).id !== undefined;
}

export const useFetch = (url: string) => {
  const [data, setData] = useState<Array<Data>|Data>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<Error|null>(null);
  useEffect(() => {
    const abortControl = new AbortController();
    setTimeout(() => {
    fetch(url, { signal: abortControl.signal })
    .then(res => {
      if (!res.ok) { // error coming back from server
        throw Error('could not fetch the data for that resource');
      } 
      return res.json();
    })
    .then(data => {
      setIsPending(false);
      setData(data);
      setError(null);
    })
    .catch((error : Error) => {
      if (error.name === 'AbortError') {
        console.log('fetch aborted')
      } else {
        // auto catches network / connection error
        setIsPending(false);
        setError(error);
      }
    })
  }, 1000);

  // abort the fetch
  return () => abortControl.abort();
}, [url])

return { data, isPending, error };
}