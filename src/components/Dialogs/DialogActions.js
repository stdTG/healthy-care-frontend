import { DialogActions as MuiDialogActions } from '@material-ui/core';
import styled from 'styled-components';

const DialogActions = styled(MuiDialogActions)`
  align-self: flex-end;
  padding-bottom: ${(props) => props.theme.spacing(3)}px;
  justify-content: center;
`;

export default DialogActions;
