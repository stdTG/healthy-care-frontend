import { Field } from 'react-final-form';
import { Input } from 'components/ui';
import React from 'react';
import SValidationError from '../../components/styled/SValidationError';

const FormInput = ({ name, placeholder, ...props }) => {
  return (
    <Field name={name}>
      {({ input, meta }) => {
        return (
          <div>
            <Input
              {...props}
              {...input}
              placeholder={placeholder}
              variant="outlined"
            />
            {meta.error && meta.touched && (
              <SValidationError>{meta.error}</SValidationError>
            )}
          </div>
        );
      }}
    </Field>
  );
};

export default FormInput;
