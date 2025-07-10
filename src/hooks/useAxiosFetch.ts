// src/hooks/useAxiosFetch.ts
import { useState, useEffect } from "react";
import api from "../api";
import type { ApiResponse } from "../api";
export const useAxiosFetch = <T = unknown>(url: string, method: "GET" | "POST" = "GET") => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
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
        let response: ApiResponse<T>;
        
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
};