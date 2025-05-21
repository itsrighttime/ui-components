const COMPANY_CODES = {
  itsRIGHTtime: "RIGH",
  letsDiscuss: "DISC",
  letsCreate: "CREA",
  letsCollaborate: "COLL",
  letsSchedule: "SCHE",
  CREATIVE: "CRTI",
  letsSecure: "SECU",
  utils: "UTIL",
  brodcast: "BROD",
  "ui-components": "COMP",
};

const TYPE_CODES = {
  error: "ER",
  info: "IN",
  debug: "DE",
  warning: "WA",
  verbose: "VE",
  silly: "SI",
};

export const getTrackingCode = (companyName, codeType, unique) => {
  if (!companyName || !codeType || !unique)
    throw new Error({
      description: `All the Parameters Must Present for generating Trancking Code.`,
    });
  return `${COMPANY_CODES[companyName] || companyName}-${
    TYPE_CODES[codeType] || codeType
  }-${unique}`;
};
