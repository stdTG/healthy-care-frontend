import styled from 'styled-components';
import { Box as MuiBox } from '@material-ui/core';
import colors from 'lib/colors';

const SFrame = styled(MuiBox)`
  border: 1px solid ${colors.gray500};
  border-radius: 10px;
`;

export default SFrame;
