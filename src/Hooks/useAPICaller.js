import { useState, useEffect, useCallback } from "react";
import { apiCaller } from "../utils/apiCaller.js";

/**
 * useAPICaller Hook
 *
 * Custom React hook for performing API requests with built-in
 * loading, error, and response state management.
 *
 * Automatically triggers API calls based on provided dependencies
 * and exposes a `refetch` method for manual re-execution.
 *
 * Designed as a reusable abstraction over `apiCaller` for
 * consistent API interaction patterns across the application.
 *
 * @hook
 *
 * @param {Object} options - Configuration options for the API call
 *
 * @param {string} [options.endpoint="/"]
 * API endpoint to call.
 *
 * @param {string} [options.method="GET"]
 * HTTP method to use for the request.
 *
 * @param {Object|null} [options.body=null]
 * Request payload for methods like POST or PUT.
 *
 * @param {Object} [options.headers={}]
 * Custom HTTP headers to include in the request.
 *
 * @param {Object} [options.params={}]
 * Query parameters appended to the request URL.
 *
 * @param {Array<any>} [options.dependencies=[]]
 * Dependency array that determines when the API call
 * should automatically re-run.
 *
 * @returns {Object} API call state and helpers
 *
 * @property {*} data
 * Response data returned from the API call, or `null` if not available.
 *
 * @property {*} error
 * Error object or message if the API call fails, otherwise `null`.
 *
 * @property {boolean} loading
 * Indicates whether the API request is currently in progress.
 *
 * @property {Function} refetch
 * Manually triggers the API request again.
 *
 * @property {Function} reset
 * Resets data, error, and loading states to their initial values.
 *
 * @example
 * const { data, error, loading, refetch } = useAPICaller({
 *   endpoint: "/users",
 *   method: "GET",
 *   dependencies: []
 * });
 *
 * @example
 * const { data, loading } = useAPICaller({
 *   endpoint: "/login",
 *   method: "POST",
 *   body: credentials,
 *   dependencies: [credentials]
 * });
 *
 * @notes
 * - Automatically cancels state updates on re-render via stable dependencies
 * - Suitable for REST-style API calls
 * - Works well with component-level data fetching patterns
 */
export const useAPICaller = ({
  endpoint = "/",
  method = "GET",
  body = null,
  headers = {},
  params = {},
  dependencies = [],
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await apiCaller({
      endpoint,
      method,
      body,
      headers,
      params,
    });

    if (response.error) {
      setData(null);
      setError(response.error);
    } else {
      setData(response);
      setError(null);
    }

    setLoading(false);
  }, [endpoint, method, body, headers, params]);

  useEffect(() => {
    if (!endpoint) return;
    fetchData();
  }, [fetchData, ...dependencies]);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    error,
    loading,
    refetch: fetchData,
    reset,
  };
};
