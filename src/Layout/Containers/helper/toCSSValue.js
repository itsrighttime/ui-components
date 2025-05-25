export const toCSSValue = (key, value) => {
  const map = {
    direction: {
      row: "row",
      column: "column",
    },
    justify: {
      start: "flex-start",
      center: "center",
      end: "flex-end",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
    },
    align: {
      start: "flex-start",
      center: "center",
      end: "flex-end",
      stretch: "stretch",
    },
    wrap: {
      wrap: "wrap",
      nowrap: "nowrap",
      "wrap-reverse": "wrap-reverse",
    },
  };
  return map[key]?.[value] || value;
};
