import { getTrackingCode as getTrackingCodeHelper } from "./get-tracking-code.js";
import { __logger } from "./helper/logger.helper.js";

// ---------- CONFIGURABLE FROM OUTSIDE ------------

// ----------- Tracking Code Types -----------

const codeTypes = {
  info: "info",
  error: "error",
  warn: "warn",
  verbose: "verbose",
  debug: "debug",
  silly: "silly",
};

// Default types
let allowedTypes = [codeTypes.error, codeTypes.warn, codeTypes.info];

/**
 * Consumer project can override this.
 * Example usage:
 *
 * import { UtilsLogger } from "@itsrighttime/ui-components";
 * UtilsLogger.setAllowedTypes([codeTypes.error, codeTypes.warn, codeTypes.info]);
 */
export const setAllowedTypes = (types) => {
  if (Array.isArray(types)) {
    allowedTypes = types;
  }
};

// -------------------------------------------------

const SERVICE_NAME = "ui-components";
const loggerManager = __logger(SERVICE_NAME);

// ----------- UTILITY METHODS -----------

const getTrackingCode = (codeType, code) =>
  getTrackingCodeHelper(SERVICE_NAME, codeType, code);

// ----------- LOG WRAPPER -----------

const logWrapper = (logFn, type) => {
  return ({ message, context = null, code = "NA-LOGGER" }) => {
    const formattedCode = getTrackingCode(type, code);

    if (allowedTypes.includes(type)) {
      logFn({ message, context, code: formattedCode });
    }
  };
};

const errorLogWrapper = (logFn, type) => {
  return ({ message, error, context = null, code = "NA-LOGGER" }) => {
    if (allowedTypes.includes(type)) {
      logFn({
        error,
        message,
        context,
        code: getTrackingCode(type, code),
      });
    }
  };
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

// ----------- EXPORT UTILS LOGGER -----------

export const UtilsLogger = {
  logger,
  codeTypes,
  getTrackingCode,
  setAllowedTypes, // 🔥 consumer can configure log types
};

/*
Example usage:

import { UtilsLogger } from "@itsrighttime/ui-components";

UtilsLogger.setAllowedTypes([codeTypes.error, codeTypes.warn, codeTypes.info]);
UtilsLogger.logger.debug({ message: "Test debug" });

*/
