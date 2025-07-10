// src/hooks/useFetch.ts
import { useState, useEffect } from "react";
import api from "../api";

type FetchOptions = {
  method?: "GET" | "POST";
  useAxios?: boolean;
};

export const useFetch = <T = unknown>(url: string, options: FetchOptions = {}) => {
  const { method = "GET", useAxios = true } = options;
  
  if (useAxios) {
    // Use the Axios-based implementation
    const [data, setData] = useState<T | any>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [postData, setPostData] = useState<unknown>(null);

    const executePost = (postData: unknown) => {
      setPostData(postData);
    };

    useEffect(() => {
      const controller = new AbortController();

      const fetchData = async () => {
        setIsPending(true);
        setError(null);

        try {
          let response;
          
          if (method === "GET") {
            response = await api.get<T>(url, { signal: controller.signal });
          } else if (method === "POST" && postData) {
            response = await api.post<T>(url, postData, { signal: controller.signal });
          } else {
            return;
          }

          setData(response.data);
        } catch (err:any) {
          if (err.name === "CanceledError") {
            console.log("Request was aborted");
          } else {
            setError(err.response?.data?.error || 'Could not fetch the data');
            console.error(err);
          }
        } finally {
          setIsPending(false);
        }
      };

      fetchData();

      return () => {
        controller.abort();
      };
    }, [url, method, postData]);

    return { 
      data, 
      isPending, 
      error, 
      postData: executePost 
    };
  } else {
    // Fall back to original fetch implementation
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fetchOptions, setFetchOptions] = useState<RequestInit | null>(null);

    const executePost = (postData: unknown) => {
      setFetchOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
    };

    useEffect(() => {
      const controller = new AbortController();

      const fetchData = async (options?: RequestInit) => {
        setIsPending(true);
        setError(null);
        
        try {
          const res = await fetch(url, { 
            ...options, 
            signal: controller.signal 
          });
          
          if (!res.ok) throw new Error(res.statusText);
          
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

      if (method === "GET") fetchData();
      if (method === "POST" && fetchOptions) fetchData(fetchOptions);

      return () => {
        controller.abort();
      };
    }, [url, method, fetchOptions]);

    return { data, isPending, error, postData: executePost };
  }
};