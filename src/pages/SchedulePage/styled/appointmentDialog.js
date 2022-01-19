import React from 'react';
import styled from 'styled-components';
import { Field } from 'react-final-form';
import {
  Button as MuiButton,
  InputAdornment,
  TextField as MuiTextField,
} from '@material-ui/core';
import { Autocomplete as RffAutocomplete } from 'mui-rff';

import { Autocomplete as AC, AutocompleteOptionUser } from 'components';
import { FormInput, Icon } from 'components/ui';
import colors from 'lib/colors';
import { SValidationError } from '../styled/appointmentAddDialog';

// const SValidationError = styled.div`
//   color: ${colors.red100};
//   margin-bottom: -5px;
//   margin-top: 4px;
// `;

export const Autocomplete = ({ resolveItem, ...props }) => {
  return (
    <Field name={props.name}>
      {({ input, meta }) => {
        return (
          <>
            <AC {...input} {...props} renderOption={AutocompleteOptionUser} />

            {!meta.valid && meta.touched && (
              <SValidationError>{[meta.error]}</SValidationError>
            )}
          </>
        );
      }}
    </Field>
  );
};

export const SaveButton = ({ title, icon, ...props }) => {
  return (
    <MuiButton
      color="primary"
      variant="contained"
      style={{
        padding: '5px 20px',
        borderRadius: '10px',
        height: '32px',
      }}
      {...props}
    >
      <Icon icon={icon} mr={5} />
      {title}
    </MuiButton>
  );
};

export const SimpleAC = (props) => {
  return (
    <RffAutocomplete
      label={null}
      variant="outlined"
      forcePopupIcon={'auto'}
      getOptionValue={(option) => option.value}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => {
        return (
          <FormInput
            {...params}
            name={props.name}
            placeholder={props.placeholder}
          />
        );
      }}
      {...props}
    />
  );
};

export const DateField = (props) => {
  return (
    <Field name={props.name}>
      {({ input, meta }) => {
        return (
          <>
            <SDateField
              {...input}
              value={props.selectedTimeSlot}
              variant="outlined"
              onClick={props.onClick}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="calendar" />
                  </InputAdornment>
                ),
              }}
              {...props}
            />
            {meta.error && meta.touched && (
              <SValidationError>{meta.error}</SValidationError>
            )}
          </>
        );
      }}
    </Field>
  );
};

export const SDateField = styled(MuiTextField)`
  width: 100%;
  .MuiOutlinedInput-input {
    padding: 7px 0 6px 0;
  }
  fieldset {
    border-color: ${colors.gray500};
  }
  .MuiOutlinedInput-multiline {
    padding: 7px 0 6px 14px;
  }
`;
