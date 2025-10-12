// utils/api/apiCaller.js
import axios from "axios";
import { UtilsLogger } from "./logger/logger.util.js";

const logger = UtilsLogger.logger;

/**
 * Base API caller function using Axios.
 * Usable in services, actions, or anywhere outside React.
 *
 * @param {Object} config
 * @param {string} config.endpoint - API endpoint (relative).
 * @param {string} [config.method="GET"] - HTTP method.
 * @param {Object|null} [config.body=null] - Request body.
 * @param {Object} [config.headers={}] - Custom headers.
 * @param {Object} [config.params={}] - URL query parameters.
 * @param {number} [config.timeout=10000] - Axios timeout in ms.
 * @returns {Promise<any>} - Axios response data.
 */
export const apiCaller = async ({
  endpoint = "/",
  method = "GET",
  body = null,
  headers = {},
  params = {},
  timeout = 10000,
}) => {
  // const baseURL = import.meta.env.VITE_APP_SERVER_API_PROXY;
  // const url = `${baseURL}${endpoint}`;

  // if (!baseURL)
  //   throw new Error(
  //     "Missing VITE_APP_SERVER_API_PROXY in environment variables"
  //   );

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

    if (import.meta.env.VITE_PRINT_API_RESULT === "true")
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
