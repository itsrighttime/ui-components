import { COLORS } from "./colors.helper.js";
import { getTime } from "./time.helper.js";

export const formatMessage = ({
  level,
  serviceName,
  message,
  context = null,
  code = "NA",
  stack = null,
}) => {
  const time = `${COLORS.timestamp}${getTime()}${COLORS.reset}`;
  const service = `${COLORS.service}${serviceName}${COLORS.reset}`;
  const levelColor = COLORS.levels[level] || COLORS.reset;

  const base = `[${service} - ${time}] ${levelColor}${level.toUpperCase()}${
    COLORS.reset
  }: ${message}`;
  const codeLine = `| Code: ${code}`;
  const contextLine = context
    ? `| Context: ${JSON.stringify(context, null, 2)}`
    : "";
  const stackLine = stack ? `|- ${stack}` : "";

  return [base, codeLine, contextLine, stackLine].filter(Boolean).join("\n");
};
