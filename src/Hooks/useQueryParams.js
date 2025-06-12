import { useCallback } from "react";

/**
 * A custom hook for managing URL query parameters in React Router.
 */
export const useQueryParams = ({ navigate, location }) => {
  const { search, pathname } = location;
  const query = new URLSearchParams(search);

  // Get a specific parameter
  const getParam = useCallback((key) => query.get(key), [search]);

  // Check if a parameter exists
  const hasParam = useCallback((key) => query.has(key), [search]);

  // Set or update a parameter
  const setParam = useCallback(
    (key, value, options = { replace: true }) => {
      const updatedQuery = new URLSearchParams(search);
      updatedQuery.set(key, value.trim());
      navigate(`${pathname}?${updatedQuery.toString()}`, options);
    },
    [navigate, pathname, search]
  );

  /**
   * Update or add multiple query parameters, and remove any existing ones not included.
   * @param {Object} newParams - Key-value pairs of parameters to set.
   * @param {Object} options - Navigation options (default: replace true).
   */
  const setParams = useCallback(
    (newParams = {}, options = { replace: true }) => {
      const updatedQuery = new URLSearchParams();

      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          updatedQuery.set(key, value.toString().trim());
        }
      });

      navigate(`${pathname}?${updatedQuery.toString()}`, options);
    },
    [navigate, pathname]
  );

  // Delete a parameter
  const deleteParam = useCallback(
    (key, options = { replace: true }) => {
      const updatedQuery = new URLSearchParams(search);
      updatedQuery.delete(key);
      navigate(`${pathname}?${updatedQuery.toString()}`, options);
    },
    [navigate, pathname, search]
  );

  // Replace all query parameters
  const replaceParams = useCallback(
    (paramsObj = {}, options = { replace: true }) => {
      const newQuery = new URLSearchParams();
      Object.entries(paramsObj).forEach(([key, value]) =>
        newQuery.set(key, value.trim())
      );
      navigate(`${pathname}?${newQuery.toString()}`, options);
    },
    [navigate, pathname]
  );

  // Toggle a boolean parameter (e.g., true/false)
  const toggleParam = useCallback(
    (key, options = { replace: true }) => {
      const updatedQuery = new URLSearchParams(search);
      const current = updatedQuery.get(key);
      const newValue = current === "true" ? "false" : "true";
      updatedQuery.set(key, newValue);
      navigate(`${pathname}?${updatedQuery.toString()}`, options);
    },
    [navigate, pathname, search]
  );

  // Append a value to a comma-separated parameter
  const appendParam = useCallback(
    (key, value, options = { replace: true }) => {
      const updatedQuery = new URLSearchParams(search);
      const existing = updatedQuery.get(key);
      const values = existing ? existing.split(",") : [];
      if (!values.includes(value.trim())) {
        values.push(value.trim());
        updatedQuery.set(key, values.join(","));
        navigate(`${pathname}?${updatedQuery.toString()}`, options);
      }
    },
    [navigate, pathname, search]
  );

  // Clear all query parameters
  const clearAllParams = useCallback(
    (options = { replace: true }) => {
      navigate(pathname, options);
    },
    [navigate, pathname]
  );

  return {
    getParam,
    setParam,
    setParams,
    deleteParam,
    replaceParams,
    toggleParam,
    appendParam,
    clearAllParams,
    hasParam,
  };
};
