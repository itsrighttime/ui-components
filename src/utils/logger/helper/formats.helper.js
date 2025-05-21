import { COLORS } from "./colors.helper.js";
import { getTime } from "./time.helper.js";

export const formatMessage = ({
  level,
  serviceName,
  message,
  context = null,
  code = "NA",
}) => {
  const time = `${COLORS.timestamp}${getTime()}${COLORS.reset}`;
  const service = `${COLORS.service}${serviceName}${COLORS.reset}`;
  const levelColor = COLORS.levels[level] || COLORS.reset;

  const base = `[${service} - ${time}] ${levelColor}${level.toUpperCase()}${
    COLORS.reset
  }: ${message}\n`;

  const contextLine = {
    context,
    code,
  };

  return {
    message: base,
    information: contextLine,
  };
};
