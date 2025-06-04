import { useLocation, useNavigate } from "react-router-dom";

/**
 * A custom hook for managing URL query parameters in React Router.
 */
export const useQueryParams = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const query = new URLSearchParams(search);

  // Get a specific parameter
  const getParam = (key) => query.get(key);

  // Set or update a parameter
  const setParam = (key, value) => {
    query.set(key, value);
    navigate(`${pathname}?${query.toString()}`, { replace: true });
  };

  // Delete a parameter
  const deleteParam = (key) => {
    query.delete(key);
    navigate(`${pathname}?${query.toString()}`, { replace: true });
  };

  // Replace all query parameters
  const replaceParams = (paramsObj = {}) => {
    const newQuery = new URLSearchParams();
    Object.entries(paramsObj).forEach(([key, value]) =>
      newQuery.set(key, value)
    );
    navigate(`${pathname}?${newQuery.toString()}`, { replace: true });
  };

  // Toggle a boolean parameter (e.g., true/false)
  const toggleParam = (key) => {
    const current = query.get(key);
    const newValue = current === "true" ? "false" : "true";
    query.set(key, newValue);
    navigate(`${pathname}?${query.toString()}`, { replace: true });
  };

  // Append a value to a comma-separated parameter
  const appendParam = (key, value) => {
    const existing = query.get(key);
    const values = existing ? existing.split(",") : [];
    if (!values.includes(value)) {
      values.push(value);
      query.set(key, values.join(","));
      navigate(`${pathname}?${query.toString()}`, { replace: true });
    }
  };

  // Clear all query parameters
  const clearAllParams = () => {
    navigate(pathname, { replace: true });
  };

  return {
    getParam,
    setParam,
    deleteParam,
    replaceParams,
    toggleParam,
    appendParam,
    clearAllParams,
  };
};
