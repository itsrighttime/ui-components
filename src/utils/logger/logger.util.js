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

/**
 * UtilsLogger
 *
 * A configurable logging utility for UI components with support for
 * different log levels, tracking codes, and consumer-defined allowed types.
 *
 * Features:
 * 1. Predefined log types: info, error, warn, verbose, debug, silly.
 * 2. Allows consumer projects to override allowed log types via `setAllowedTypes`.
 * 3. Generates a tracking code per log entry using `getTrackingCodeHelper`.
 * 4. Wraps logging methods (`info`, `warn`, `error`, etc.) to enforce allowed types.
 * 5. Special wrapper for `error` logs that supports passing actual error objects.
 *
 * @example
 * Usage:
 *
 * import { UtilsLogger } from "@itsrighttime/ui-components";
 *
 * // Configure which log types are allowed
 * UtilsLogger.setAllowedTypes([UtilsLogger.codeTypes.error, UtilsLogger.codeTypes.warn]);
 *
 * // Logging examples
 * UtilsLogger.logger.info({ message: "Informational log", context: { userId: 123 }, code: "INFO-001" });
 * UtilsLogger.logger.error({ message: "Error occurred", error: someErrorObject, code: "ERR-500" });
 *
 * Helper Methods:
 * - getTrackingCode(codeType, code): Returns formatted tracking code for a log.
 * - setAllowedTypes(types: string[]): Override the allowed log types.
 *
 * Logger object:
 * UtilsLogger.logger has the following methods:
 *  - info, warn, verbose, debug, silly, error
 */

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
