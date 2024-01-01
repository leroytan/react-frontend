import { useState, useEffect } from 'react';



export const useFetch = (url: string) => {
  const [data, setData] = useState<Array<any>|any>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [error, setError] = useState<Error|null>(null);
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchData = async()=>{
      try{
        const response =await fetch(url, {signal});
        if (!response.ok){
          throw Error("could not fetch that resource");
        }
        try{
          const respjson = await response.json();
          setIsPending(false);
          setData(respjson);
          setError(null);
          
        }
        catch (error:any){
          setIsPending(false);
          setError(error);
          
        }
  
      }
      catch (error: any){
        if (error.name === 'AbortError') {
          console.log('fetch aborted')
        }
        setIsPending(false);
        setError(error);
        
      }
      
    }
    fetchData()
    
    return ()=>{controller.abort()}
},[url])


return { data, isPending, error };
}