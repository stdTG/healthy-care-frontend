import styled from 'styled-components';
import { TextField as MuiTextField } from '@material-ui/core';

const SActionsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;
const STextField = styled(MuiTextField)`
  width: 100%;
  .MuiOutlinedInput-input {
    padding: 12px;
  }
`;

export { SActionsWrap, STextField };
