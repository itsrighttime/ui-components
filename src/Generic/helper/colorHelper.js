import { BRAND_COLORS } from "../../utils/COLOR.js";

export const COLOR = [
  BRAND_COLORS.BLUE,
  BRAND_COLORS.GREEN,
  BRAND_COLORS.CYAN,
  BRAND_COLORS.YELLOW,
  BRAND_COLORS.RED,
  BRAND_COLORS.DARK_BLUE,
  BRAND_COLORS.SKY_BLUE,
];

export const getColor = (indx, colorStart = 0) => {
  const color = COLOR[(indx + colorStart) % COLOR.length];
  const previousColor = COLOR[(indx + 1 + colorStart) % COLOR.length];
  return { color, previousColor };
};
