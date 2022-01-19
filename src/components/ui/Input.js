import React from 'react';
import styled from 'styled-components';
import { TextField as MuiTextField } from '@material-ui/core';

import colors from 'lib/colors';

const Input = styled(MuiTextField)`
  .MuiInputBase-root {
    padding: 0 10px;
  }
  .MuiOutlinedInput-multiline {
    padding: 6px 14px;
  }
  .MuiInputBase-input {
    border-radius: 10px;
    background-color: ${(props) => props.theme.palette.common.white};
    font-size: 16px;
    padding: 0 6px;
    height: 32px;
    box-sizing: border-box;
  }
  fieldset {
    border-color: ${colors.gray500};
  }
`;

export default Input;
