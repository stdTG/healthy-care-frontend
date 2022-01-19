import styled from 'styled-components';
import {
  CardContent as MuiCardContent,
  Paper as MuiPaper,
} from '@material-ui/core';

export const Paper = styled(MuiPaper)`
  margin: 5px 0;
  &:hover {
    cursor: pointer;
  }
  overflow: hidden;
`;

export const CardContent = styled(MuiCardContent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 17px !important;
  border-left: 4px solid
    ${(props) => (props.isSelected ? props.theme.palette.info.main : 'white')};
  border-radius: 9px;
`;
