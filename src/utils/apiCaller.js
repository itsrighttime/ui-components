// utils/api/apiCaller.js
import axios from "axios";
import { UtilsLogger } from "./logger/logger.util.js";

const logger = UtilsLogger.logger;

/**
 * apiCaller
 *
 * A generic utility function to make HTTP API requests with Axios,
 * integrated with structured logging using `logger`.
 *
 * @param {Object} options - Configuration object for the API call.
 * @param {string} [options.endpoint="/"] - API endpoint URL.
 * @param {string} [options.method="GET"] - HTTP method ("GET", "POST", "PUT", "DELETE", etc.).
 * @param {Object|null} [options.body=null] - Request payload for POST/PUT requests.
 * @param {Object} [options.headers={}] - Custom HTTP headers.
 * @param {Object} [options.params={}] - Query parameters for GET requests.
 * @param {number} [options.timeout=10000] - Timeout in milliseconds.
 * @param {boolean|string} [options.printResult=false] - If true or "true", logs API response to console.
 *
 * @returns {Promise<Object>} - Returns a promise that resolves to an object:
 *  - success {boolean} : Indicates if the request succeeded.
 *  - error {Object|null} : Error object if the request failed.
 *  - data {any} : Response data from the API.
 *  - status {number} : HTTP status code of the response.
 *
 * @example
 * const result = await apiCaller({
 *   endpoint: "/users",
 *   method: "POST",
 *   body: { name: "John Doe" },
 *   headers: { Authorization: "Bearer token" },
 * });
 *
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   console.error(result.error);
 * }
 */
export const apiCaller = async ({
  endpoint = "/",
  method = "GET",
  body = null,
  headers = {},
  params = {},
  timeout = 10000,
  printResult = false,
}) => {
  try {
    logger.debug({
      message: `API Call → ${method} ${endpoint}`,
      context: { method, body, params, headers },
      code: "00002",
    });

    const response = await axios({
      url: endpoint,
      method,
      data: body,
      headers,
      params,
      timeout,
      withCredentials: true,
    });

    const data = response.data;

    logger.info({
      message: `API Success → ${method} ${endpoint}`,
      context: { status: response?.status, data },
      code: "00003",
    });

    if (printResult === "true")
      console.log(`API Response of endpoint (${endpoint}): `, data);

    return { success: true, error: null, data, status: response.status };
  } catch (error) {
    logger.error({
      message: `API Error → ${method} ${endpoint}`,
      context: { body, params, headers },
      code: "00004",
      error,
    });

    return {
      message: error.message,
      data: error.response.data,
      success: false,
      status: error.status,
    };
  }
};
