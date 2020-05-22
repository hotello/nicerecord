import color from 'color';

// Find color palette at:
// https://coolors.co/1c1c1e-eaeaed-f1f1f6-ffffff-623cea
const NAMED_COLORS = {
  cultured: '#f1f1f6',
  eerieBlack: '#1c1c1e',
  majorelleBlue: '#623cea',
  platinum: '#eaeaed',
  silverSand: '#c7c7cc',
  white: '#ffffff',
};

const THEME_COLORS = {
  background: NAMED_COLORS.cultured,
  border: NAMED_COLORS.platinum,
  muted: color(NAMED_COLORS.eerieBlack).alpha(0.5).rgb().string(),
  primary: NAMED_COLORS.majorelleBlue,
  surface: NAMED_COLORS.white,
  text: NAMED_COLORS.eerieBlack,
};

export default {
  ...NAMED_COLORS,
  ...THEME_COLORS,
};
