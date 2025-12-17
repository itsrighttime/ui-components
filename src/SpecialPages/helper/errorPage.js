import {
  keyIcon,
  lockIcon,
  searchIcon,
  warningIcon,
  warningTimeIcon,
  warningWifiIcon,
} from "../../utils/icons.jsx";

export const getErrorIcon = (statusCode) => {
  const codeMap = {
    400: searchIcon,
    401: keyIcon,
    403: lockIcon,
    404: searchIcon,
    500: warningIcon,
    502: warningTimeIcon,
    503: warningTimeIcon,
    504: warningWifiIcon,
  };

  return codeMap[statusCode] || warningIcon;
};

export const getErrorTitle = (statusCode) => {
  const codeMap = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Access Denied",
    404: "Page Not Found",
    500: "Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
  };
  return codeMap[statusCode] || "Something went wrong";
};
