import React from 'react';
import { ThemeProvider as StyleThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import theme from 'lib/theme';

function ThemeProvider(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <StyleThemeProvider theme={theme}>{props.children}</StyleThemeProvider>
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
