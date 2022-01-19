import React from 'react';
import styled from 'styled-components';
import { Field } from 'react-final-form';

export const SCodeInput = styled((props) => {
  const { name, type, fieldProps, ...rest } = props;

  return (
    <Field name={name} type={type} {...fieldProps}>
      {({ input, meta }) => (
        <input {...input} maxLength={6} {...rest} autoComplete="off" />
      )}
    </Field>
  );
})`
  height: 46px;
  width: 200px;
  background: white;
  top: 0;
  left: 0;
  margin-right: 10px;
  border-radius: 10px;
  border: none;
  padding-left: 25px;
  z-index: 1;
  font-size: 20px;
  letter-spacing: 15px;

  &:focus {
    outline: none;
  }

  .MuiInputBase-root {
    border: none;
  }
`;
