import { formatMessage } from "./formats.helper.js";

export const __logger = (serviceName) => {
  const logWithLevel =
    (level) =>
    ({ message, context = null, code = "NA" }) => {
      const formatted = formatMessage({
        level,
        serviceName,
        message,
        context,
        code,
      });
      console.log(formatted);
    };

  const logWithError = ({ message, context = null, code = "NA", error }) => {
    const formatted = formatMessage({
      level: "error",
      serviceName,
      message: message,
      stack: error?.stack || null,
      context,
      code,
    });
    console.error(formatted);
  };

  return {
    error: logWithError,
    warn: logWithLevel("warn"),
    info: logWithLevel("info"),
    verbose: logWithLevel("verbose"),
    debug: logWithLevel("debug"),
    silly: logWithLevel("silly"),
  };
};
