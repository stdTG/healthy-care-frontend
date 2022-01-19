import { createMuiTheme } from '@material-ui/core/styles';
import palette from 'lib/colors/palette';
import { fade, darken } from '@material-ui/core/styles';
import colors from '../colors';

const themeConfig = createMuiTheme({
  palette: {
    primary: {
      light: fade(palette.primary, 0.1),
      main: palette.primary,
      dark: darken(palette.primary, 0.1),
    },
    secondary: {
      light: fade(palette.secondary, 0.1),
      main: palette.secondary,
      dark: darken(palette.secondary, 0.1),
    },
    warning: {
      light: fade(palette.warning, 0.1),
      main: palette.warning,
    },
    error: {
      light: fade(palette.warning, 0.1),
      main: palette.warning,
    },
    info: {
      light: fade(palette.info, 0.1),
      main: palette.info,
    },
    success: {
      light: fade(palette.success, 0.1),
      main: palette.success,
    },
    text: {
      primary: palette.textPrimary,
      secondary: palette.textSecondary,
    },
    background: {
      default: colors.gray150,
    },
  },
  typography: {
    fontFamily: '"Avenir Next", Roboto, Arial',
    h1: {
      fontSize: '2rem',
      fontWeight: '600',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: '500',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: '500',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: '600',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: '600',
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: '600',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: '500',
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    subtitle2: {
      fontSize: '0.8125rem',
      fontWeight: '500',
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default themeConfig;
