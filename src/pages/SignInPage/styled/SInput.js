import React from 'react';
import styled from 'styled-components';
import { TextField as RffTextField } from 'mui-rff';

const SInput = styled((props) => (
  <RffTextField
    variant='outlined'
    autoComplete='off'
    InputProps={{ className: 'formControl' }}
    inputProps={{ className: 'input' }}
    {...props}
  />
))`
  width: 480px;
  .formControl {
    padding-top: ${(props) => props.multiline && '6px'};
    padding-bottom: ${(props) => props.multiline && '6px'};
    height: ${(props) => (props.multiline ? 'auto' : '32px')};

    margin-bottom: 48px;
  }
  .input {
    background-color: ${(props) => props.theme.palette.common.white};
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.1);

    border-radius: 18px;
    padding: 0 20px;
    height: 46px;
    display: flex;
    flex: auto;
    width: 480px;
  }
  fieldset {
    border: none;
  }
`;
export default SInput;
