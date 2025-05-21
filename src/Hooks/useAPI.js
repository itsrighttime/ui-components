import { useState, useEffect } from "react";
import { apiCaller } from "../utils/apiCaller";

/**
 * React hook for automatic data fetching with dependency safety.
 */
export const useAPI = ({
  endpoint = "/",
  method = "GET",
  body = null,
  headers = {},
  params = {},
  activeTab = null,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiCaller({
          endpoint,
          method,
          body,
          headers,
          params,
        });
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, activeTab]);

  return { data, loading, error };
};
