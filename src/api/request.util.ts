/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import dotenv from "dotenv";
dotenv.config();

/**
 * @function useCustomFetch - Custom hook to fetch data from the server.
 *
 * @param path - The path to fetch from
 * @param options - The options to pass to the fetch request
 * @returns
 */
export const useCustomFetch = (path: string, options: any) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const url = `${process.env.SERVER_URL}${path}`;

  // add the content type header to the options
  const completedOptions = {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get the response from the server
        const res = await fetch(url, completedOptions);

        // parse the response as json
        const json = await res.json();

        // set the response
        setResponse(json);

        // set isLoading to false
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchData();
  }, []);
  return { response, error, isLoading };
};
