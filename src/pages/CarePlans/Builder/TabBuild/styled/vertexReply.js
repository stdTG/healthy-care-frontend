import styled from 'styled-components';
import { Box as MuiBox } from '@material-ui/core';

import colors from 'lib/colors';

export const SBlock = styled(MuiBox)`
  border-radius: 10px;
  border: 1px solid ${colors.gray001};
  box-shadow: 0 2px 4px 0 ${colors.gray002};
  background-color: ${(props) => props.theme.palette.primary.light};
  color: ${(props) => props.theme.palette.primary.main};
  padding: 15px;
  width: ${(props) => props.geometry?.width}px;
  height: ${(props) => props.geometry?.height}px;
`;
