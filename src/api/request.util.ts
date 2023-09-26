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
      setLoading(true);

      const url = `${process.env.VITE_SERVER_URL}${path}`;

      const res = await fetch(url, {
        method,
        headers: {
          ...requestOptions?.headers,
          "Content-Type": "application/json",
        },
        body: method !== RequestMethods.GET ? JSON.stringify(body) : undefined,
      });

      const json = await res.json();
      setData(json);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Only run the effect for GET requests
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
