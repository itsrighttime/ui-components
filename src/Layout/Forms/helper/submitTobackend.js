import { apiCaller } from "../../../utils/apiCaller";

export const submitToBackend = async (formData, endpoint) => {
  if (!endpoint) {
    return { success: false, message: "No endpoint provided in config" };
  }

  // Convert to FormData automatically
  const body = new FormData();

  const appendToFormData = (key, value) => {
    if (value === null || value === undefined) return;

    // Handle Files, Blobs, etc.
    if (
      value instanceof File ||
      value instanceof Blob ||
      (typeof value === "object" && value.type && value.size)
    ) {
      body.append(key, value);
      return;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === "object" && !(v instanceof File))
          body.append(`${key}[${i}]`, JSON.stringify(v));
        else body.append(`${key}[${i}]`, v);
      });
      return;
    }

    // Handle nested objects (like address, mobile)
    if (typeof value === "object") {
      Object.entries(value).forEach(([subKey, subValue]) => {
        appendToFormData(`${key}[${subKey}]`, subValue);
      });
      return;
    }

    // Handle primitive values
    body.append(key, value);
  };

  Object.entries(formData || {}).forEach(([key, value]) => {
    appendToFormData(key, value);
  });

  // Actual API call
  const response = await apiCaller({
    endpoint,
    method: "POST",
    body,
    headers: {}, // Let browser set multipart boundary
  });

  if (response?.status === 200 || response?.success)
    return { success: true, data: response };

  if (response?.status === 400)
    return { success: false, data: response.data.errors };

  return {
    success: false,
    message: response?.message || "Unknown server response",
  };
};
