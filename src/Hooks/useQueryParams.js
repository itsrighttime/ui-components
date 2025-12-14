import { useCallback } from "react";

/**
 * useQueryParams Hook
 *
 * Custom React hook for managing URL query parameters
 * when using React Router navigation.
 *
 * Provides a declarative API to read, write, update, delete,
 * toggle, and batch-manage query parameters while keeping
 * navigation behavior consistent.
 *
 * Particularly useful for filters, pagination, feature flags,
 * and UI state that should be reflected in the URL.
 *
 * @hook
 *
 * @param {Object} options - Hook configuration
 *
 * @param {Function} options.navigate
 * Navigation function from React Router (`useNavigate`).
 *
 * @param {Object} options.location
 * Location object from React Router (`useLocation`).
 *
 * @returns {Object} Query parameter helpers
 *
 * @property {Function} getParam
 * Retrieves the value of a specific query parameter.
 * @param {string} key
 * @returns {string|null}
 *
 * @property {Function} hasParam
 * Checks whether a query parameter exists.
 * @param {string} key
 * @returns {boolean}
 *
 * @property {Function} setParam
 * Sets or updates a single query parameter.
 * @param {string} key
 * @param {string} value
 * @param {Object} [options={ replace: true }]
 *
 * @property {Function} setParams
 * Replaces all query parameters with the provided set.
 * Removes any existing parameters not included.
 * @param {Object} newParams
 * @param {Object} [options={ replace: true }]
 *
 * @property {Function} deleteParam
 * Removes a specific query parameter.
 * @param {string} key
 * @param {Object} [options={ replace: true }]
 *
 * @property {Function} replaceParams
 * Replaces all existing query parameters.
 * @param {Object} paramsObj
 * @param {Object} [options={ replace: true }]
 *
 * @property {Function} toggleParam
 * Toggles a boolean query parameter (`true` / `false`).
 * @param {string} key
 * @param {Object} [options={ replace: true }]
 *
 * @property {Function} appendParam
 * Appends a value to a comma-separated query parameter.
 * Prevents duplicate values.
 * @param {string} key
 * @param {string} value
 * @param {Object} [options={ replace: true }]
 *
 * @property {Function} clearAllParams
 * Removes all query parameters from the URL.
 * @param {Object} [options={ replace: true }]
 *
 * @example
 * const query = useQueryParams({ navigate, location });
 *
 * query.setParam("page", "2");
 * query.appendParam("tags", "react");
 * query.toggleParam("debug");
 *
 * @notes
 * - Uses `URLSearchParams` for safe query manipulation
 * - Defaults to `replace: true` to avoid polluting history
 * - Ideal for stateful URLs in dashboards and complex UIs
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
