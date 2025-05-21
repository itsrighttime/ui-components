import { getTrackingCode as getTrackingCodeHelper } from "./get-tracking-code.js";
import { __logger } from "./helper/logger.helper.js";

const allowedTypes = import.meta.env.VITE_LOG_TYPES?.split(",") || [
  "error",
  "warn",
];

const SERVICE_NAME = "ui-components";

// Initialize a single logger manager instance for the product
const loggerManager = __logger(SERVICE_NAME);

// ----------- UTILITY METHODS -----------

const getTrackingCode = (codeType, code) =>
  getTrackingCodeHelper(SERVICE_NAME, codeType, code);

// ----------- LOG WRAPPER -----------

const logWrapper = (logFn, type) => {
  return ({ message, context = null, code = "NA-LOGGER" }) => {
    const formatedCode = getTrackingCode(type, code);

    if (allowedTypes.includes(type)) {
      logFn({ message, context, code: formatedCode });
    }
  };
};

const errorLogWrapper = (logFn, type) => {
  return ({ message, error, context = null, code = "NA-LOGGER" }) => {
    if (allowedTypes.includes(type)) {
      logFn({error, message, context, code: getTrackingCode(type, code) });
    }
  };
};

// ----------- Tracking Code Types -----------
const codeTypes = {
  info: "info",
  error: "error",
  warn: "warn",
  verbose: "verbose",
  debug: "debug",
  silly: "silly",
};

// ----------- FILE LOGGER -----------

const logger = {
  info: logWrapper(loggerManager.info, codeTypes.info),
  warn: logWrapper(loggerManager.warn, codeTypes.warn),
  verbose: logWrapper(loggerManager.verbose, codeTypes.verbose),
  debug: logWrapper(loggerManager.debug, codeTypes.debug),
  silly: logWrapper(loggerManager.silly, codeTypes.silly),
  error: errorLogWrapper(loggerManager.error, codeTypes.error),
};

// ----------- FOLDER LOGGER -----------

// ----------- EXPORT UTILS LOGGER -----------

export const UtilsLogger = {
  logger,
  codeTypes,
  getTrackingCode,
};

/*

const { getTrackingCode, logger, codeTypes } = UtilsLogger;

*/
