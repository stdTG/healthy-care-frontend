import { createMuiTheme, createStyles } from '@material-ui/core/styles';

import themeConfig from 'lib/theme/themeConfig';

const theme = createMuiTheme({
  ...themeConfig,
  overrides: {
    MuiButton: createStyles({
      root: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
      },
      contained: {
        backgroundColor: themeConfig.palette.common.white,
        color: themeConfig.palette.primary.main,
        boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.1)',

        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    }),
    MuiPaper: createStyles({
      elevation24: {
        boxShadow: '0px 10px 30px 0px rgba(0,0,0,0.1)',
      },
    }),
    MuiAutocomplete: createStyles({
      option: {
        margin: '5px 10px',
        borderRadius: '18px',
        '&[aria-selected="true"]': {
          background: `${themeConfig.palette.primary.main} !important`,
        },
      },
    }),
  },
});
export default theme;
