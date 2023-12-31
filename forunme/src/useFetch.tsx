import { useState, useEffect } from 'react';



export const useFetch = (url: string) => {
  const [data, setData] = useState<Array<any>|any>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<Error|null>(null);
  useEffect(() => {
    const abortControl = new AbortController();

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
;

  // abort the fetch
  return () => abortControl.abort();
}, [url])

return { data, isPending, error };
}