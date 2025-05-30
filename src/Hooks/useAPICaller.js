import { useState, useEffect, useCallback } from "react";
import { apiCaller } from "../utils/apiCaller";

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
    try {
      const response = await apiCaller({
        endpoint,
        method,
        body,
        headers,
        params,
      });
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
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
