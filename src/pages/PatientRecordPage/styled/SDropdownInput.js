import React from 'react';
import styled from 'styled-components';
import { Field } from 'react-final-form';
import {
  TextField as MuiTextField,
  Select as MuiSelect,
} from '@material-ui/core';

import colors from 'lib/colors';

const Select = styled(({ name, className, menu }) => {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <MuiSelect
          {...input}
          variant='outlined'
          size='small'
          fullWidth={false}
          className={className}
          classes={{ selectMenu: 'select' }}
          formControlProps={{ fullWidth: false }}
        >
          {menu}
        </MuiSelect>
      )}
    </Field>
  );
})`
  height: 32px;
  width: 150px;

  .select {
    background: none;
    padding-bottom: 0;
    padding-top: 0;
  }

  fieldset {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const SDropdownInput = styled(
  ({ className, menu, placeholder, name, menuName, overlay, ...props }) => {
    return (
      <>
        <Field name={name}>
          {({ input, meta }) => (
            <MuiTextField
              {...input}
              autoComplete='off'
              variant='outlined'
              size='small'
              className={className}
              placeholder={placeholder}
              InputProps={{ className: 'input' }}
              inputProps={{ className: 'input' }}
            />
          )}
        </Field>

        <Select name={menuName} menu={menu} />
      </>
    );
  }
)`
  .input {
    height: 32px;
    border-color: ${colors.gray500};
    width: 350px;

    fieldset {
      border-color: ${colors.gray500};
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

export default SDropdownInput;
