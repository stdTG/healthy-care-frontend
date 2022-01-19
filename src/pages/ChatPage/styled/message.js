import styled from 'styled-components';
import { CardContent as MuiCardContent } from '@material-ui/core';

export const CardContent = styled(MuiCardContent)`
  display: flex;
  justify-content: space-between;
  flex: 1 0 auto;
  background-color: ${(props) =>
    props.isMyMessage
      ? props.theme.palette.primary.light
      : props.theme.palette.grey['100']};

  // color: ${(props) => (props.isMyMessage ? 'white' : 'black')};
  padding: 5px 15px !important;
`;

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.isMyMessage ? 'flex-end' : 'flex-start'};
  margin-bottom: 10px;
`;

export const Card = styled('div')`
  border: 1px solid ${(props) => props.theme.palette.grey['100']};
  display: flex;
  max-width: 600px;
  overflow: hidden;
  border-radius: 18px;
`;
