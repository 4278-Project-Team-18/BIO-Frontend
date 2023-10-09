/* eslint-disable autofix/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

/**
 * @interface RequestOptions - The options to pass to the fetch request
 *
 * @property method - The request method
 * @property headers - The request headers
 * @property body - The request body
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  body?: any;
}

/**
 * @function useCustomFetch - Custom hook to fetch data from the server.
 *
 * @param path - The path to fetch from
 * @param options - The options to pass to the fetch request
 *
 * @example
 * ```tsx
 * const { data, error, loading } = useCustomFetch("/class/allClasses", {
 *   method: "GET",
 *   options: {
 *       headers: {
 *           "test": "test"
 *       }
 *   }
 * });
 * ```
 */
export const useCustomFetch = <T>(
  path: string,
  method: RequestMethods = RequestMethods.GET,
  requestOptions: RequestOptions = {},
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const makeRequest = async (body?: any) => {
    try {
      // Reset the data and error
      setLoading(true);
      setError(null);

      // create the url
      const url = `${process.env.VITE_SERVER_URL}${path}`;

      // make the request
      const res = await fetch(url, {
        method,
        headers: {
          ...requestOptions?.headers,
          "Content-Type": "application/json",
        },
        body: method !== RequestMethods.GET ? JSON.stringify(body) : undefined,
      });

      // parse the response
      const json = await res.json();

      // if the status is not 200 or 201 throw an error
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(json.message);
      }

      // set the data if the request was successful
      setData(json);
    } catch (error) {
      // set the error if the request failed
      setError(error);

      // log the error
      console.error(error);
    } finally {
      // set loading to false
      setLoading(false);
    }
  };

  // Only immediately make the request if the method is GET
  useEffect(() => {
    if (method === RequestMethods.GET) {
      makeRequest();
    }
  }, []);

  return { data, error, loading, makeRequest };
};

/**
 * @property GET - GET request method
 * @property POST - POST request method
 * @property PUT - PUT request method
 * @property PATCH - PATCH request method
 * @property DELETE - DELETE request method
 */
export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
