import React from 'react';
import styled from 'styled-components';
import {
  Button as MuiButton,
  IconButton as MuiIconButton,
} from '@material-ui/core';

import colors from 'lib/colors';

const SIconButton = styled(({ fullWidth, disableElevation, ...props }) => (
  <MuiIconButton {...props} />
))`
  border: 1px solid ${colors.gray500};
  background-color: ${colors.white};
  height: 32px;
  border-radius: 10px;
  color: black;
`;

const SButton = styled(MuiButton)`
  border-color: ${colors.gray500};
  background-color: ${colors.white};
  height: 32px;
  color: ${(props) => props.color};
  transform: none;
  text-transform: none;
`;

export { SIconButton, SButton };
