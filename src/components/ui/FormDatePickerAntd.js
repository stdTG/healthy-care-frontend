import DatePickerAntd from 'components/ui/DatePickerAntd';
import React from 'react';
import { Field } from 'react-final-form';
import styled from 'styled-components';

const FormDatePicker = ({ name, ...props }) => {
  return (
    <>
      <Field name={name}>
        {({ input, meta }) => {
          return <SDatePicker {...props} {...input} />;
        }}
      </Field>
    </>
  );
};

export default FormDatePicker;

const SDatePicker = styled((props) => <DatePickerAntd {...props} />)`
  font-weight: 600;
  margin-bottom: 6px;
  border-radius: 10px;
  input {
    font-weight: 600;
  }
  :hover {
    border-color: black;
  }
`;
