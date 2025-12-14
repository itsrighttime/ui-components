/**
 * Converts a string to kebab-case.
 * Examples:
 *  "helloWorld" -> "hello-world"
 *  "Hello World" -> "hello-world"
 *  "some_value" -> "some-value"
 *
 * @param {string} str - The input string.
 * @returns {string} - The kebab-cased string.
 */
export const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // handle camelCase to kebab
    .replace(/\s+/g, "-") // spaces to dashes
    .replace(/_+/g, "-") // underscores to dashes
    .toLowerCase(); // all lowercase
};


/**
 * Converts a kebab-case string to other formats.
 *
 * Supported formats:
 *  - "camel"         : camelCase
 *  - "pascal"        : PascalCase
 *  - "snake"         : snake_case
 *  - "snake-upper"   : SNAKE_UPPER_CASE
 *  - "sentence"      : Sentence case
 *  - "capitalized"   : Capitalized words
 *
 * @param {string} str - The kebab-case input string.
 * @param {string} [format="camel"] - Desired output format.
 * @returns {string} - Converted string.
 *
 * @example
 * fromKebabCase("hello-world") => "helloWorld"
 * fromKebabCase("hello-world", "pascal") => "HelloWorld"
 * fromKebabCase("hello-world", "snake") => "hello_world"
 */
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

  if (format === "capitalized") {
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return str; // fallback to original
};
