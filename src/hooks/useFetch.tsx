import { useState, useEffect } from "react"
import type { Option} from "../components/types/types"

export const useFetch = <T = unknown>(url: string, method = "GET") => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Option | null>(null);

  const postData = (postData: unknown) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (fetchOptions?: RequestInit) => {
      setIsPending(true);
      setError(null);
      
      try {
        const res = await fetch(url, { 
          ...fetchOptions, 
          signal: controller.signal 
        });
        
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            console.log("Request was aborted");
          } else {
            setError('Could not fetch the data');
            console.error(err);
          }
        }
      } finally {
        setIsPending(false);
      }
    };

    if (method === "GET") {
      fetchData();
    }
    if (method === "POST" && options) {
      fetchData(options);
    }

    return () => {
      controller.abort();
    };
  }, [url, method, options]); // Removed JSON.stringify

  return { data, isPending, error, postData };
};