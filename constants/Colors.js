import color from 'color';

// Find color palette at:
// https://coolors.co/1c1c1e-eaeaed-f7f7fa-fcfcfc-623cea
const NAMED_COLORS = {
  babyPowder: '#fcfcfc',
  cultured: '#f7f7fa',
  eerieBlack: '#1c1c1e',
  majorelleBlue: '#623cea',
  platinum: '#eaeaed',
  silverSand: '#c7c7cc',
};

const THEME_COLORS = {
  background: NAMED_COLORS.cultured,
  border: NAMED_COLORS.platinum,
  muted: color(NAMED_COLORS.eerieBlack).alpha(0.5).rgb().string(),
  primary: NAMED_COLORS.majorelleBlue,
  secondary: NAMED_COLORS.majorelleBlue,
  surface: NAMED_COLORS.babyPowder,
  text: NAMED_COLORS.eerieBlack,
};

export default {
  ...NAMED_COLORS,
  ...THEME_COLORS,
};
