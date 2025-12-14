const COLOR = {
  simple: "#404040",
  blue: "#00b0f0",
  yellow: "#dbac2b",
  red: "#ff5969",
  cyan: "#52c9bd",
  green: "#92d050",
  skyBlue: "#05e1e7",
  gray1: "#f2f2f2",
  gray2: "#f7f7f7",
  gray3: "#d9d9d9",
  gray4: "#bbb9b9",
  gray5: "#7f7f7f",
  gray6: "#404040",
  white: "#fff",
  black: "#221d1d",
};

/**
 * Returns the hex color code for a given color name.
 * Defaults to 'cyan' if the color name is not found.
 *
 * @param {string} colorName - The name of the color (e.g., 'red', 'blue').
 * @returns {string} - Hex color code (e.g., '#ff5969').
 */
export const getColorCode = (colorName) => COLOR[colorName] || COLOR.cyan;
