// Find color palette at:
// https://coolors.co/fff8f0-9e2b25-51355a-2a0c4e-011627-f5f8de
const NAMED_COLORS = {
  auburn: '#9e2b25',
  beige: '#f5f8de',
  englishViolet: '#51355a',
  floralWhite: '#fff8f0',
  richBlack: '#011627',
  russianViolet: '#2a0C4e',
};

const THEME_COLORS = {
  background: NAMED_COLORS.floralWhite,
  primary: NAMED_COLORS.auburn,
  text: NAMED_COLORS.richBlack,
};

export default {
  ...NAMED_COLORS,
  ...THEME_COLORS,
};
