export const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // handle camelCase to kebab
    .replace(/\s+/g, "-") // spaces to dashes
    .replace(/_+/g, "-") // underscores to dashes
    .toLowerCase(); // all lowercase
};

export const fromKebabCase = (str, format = "camel") => {
  const words = str.split("-");

  if (format === "camel") {
    return words
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join("");
  }

  if (format === "pascal") {
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
  }

  if (format === "snake") {
    return words.map((word) => word.toLowerCase()).join("_");
  }

  if (format === "snake-upper") {
    return words.map((word) => word.toUpperCase()).join("_");
  }

  if (format === "sentence") {
    return words
      .map((word, index) =>
        index === 0
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : word.toLowerCase()
      )
      .join(" ");
  }

  return str; // fallback to original
};
