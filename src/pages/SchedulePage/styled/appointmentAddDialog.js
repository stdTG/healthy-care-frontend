import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const SActionsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(props) =>
    props.isEditMode ? 'space-between' : 'center'};
  align-items: center;
  margin: 15px;
`;

const STextField = styled(TextField)`
  width: 100%;
  .MuiOutlinedInput-input {
    padding: 12px;
  }
`;

const SValidationError = styled.div`
  font-size: 16px;
  color: red;
  margin-bottom: -5px;
  margin-top: 4px;
`;

export { SActionsWrap, STextField, SValidationError };
