import styled from 'styled-components';
import { Box as MuiBox } from '@material-ui/core';

import colors from 'lib/colors';

export const SBlock = styled(MuiBox)`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.geometry.width}px;
  height: ${(props) => props.geometry.height}px;
  background-color: white;
  white-space: normal;

  overflow-y: scroll;
  border-radius: 10px;
  border: 1px solid ${colors.gray001};
  box-shadow: 0 2px 4px 0 ${colors.gray002};
`;

export const AdditionScoresContainer = styled.div`
  ${({ scores }) => (scores.length > 0 ? 'border-top: 1px solid gray;' : null)}
  ${({ scores }) =>
    scores.length > 0 ? 'border-bottom: 1px solid gray;' : null}
  ${({ scores }) => (scores.length > 0 ? 'padding-top: 15px;' : null)}
  ${({ scores }) => (scores.length > 0 ? 'margin-bottom: 15px;' : null)}  
`;
