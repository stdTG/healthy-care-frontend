import styled from 'styled-components';
import { Button as MuiButton } from '@material-ui/core';

import colors from 'lib/colors';

export const SFrame = styled('div')`
  border: 1px solid ${colors.gray500};
  border-radius: 10px;

  position: relative;
  margin-bottom: 50px;
`;

export const SAlignButton = styled('div')`
  position: absolute;
  bottom: -16px;
  width: 100%;
  text-align: center;
`;

export const SButton = styled(MuiButton)`
  margin-top: 20px;
  background-color: ${(props) => props.theme.palette.primary.light};
  box-shadow: none;
  padding-top: 2px;
  padding-bottom: 2px;
`;
