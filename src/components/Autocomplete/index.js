import React from 'react';
import styled from 'styled-components';
import { TextField as MuiTextField } from '@material-ui/core';
import { default as MuiAutocomplete } from '@material-ui/lab/Autocomplete';

import colors from 'lib/colors';

const Autocomplete = (props) => {
  const {
    getOptionValue,
    getOptionLabel,
    renderOption,
    placeholder,
    multiple,
    onChange,
    options,
    value,
    ...rest
  } = props;

  return (
    <SAutocomplete
      multiple={multiple}
      id="size-small-outlined"
      size="small"
      options={options}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      getOptionSelected={(option, value) => option.id_ === value.id_}
      renderInput={({ ...params }) => (
        <TextField {...params} variant="outlined" placeholder={placeholder} />
      )}
      onChange={(event, value) => {
        return onChange(value);
      }}
      value={value}
      {...rest}
    />
  );
};

export default Autocomplete;

const SAutocomplete = styled(({ className, ...props }) => {
  return (
    <MuiAutocomplete
      {...props}
      className={className}
      classes={{ option: className }}
    />
  );
})`
  &.MuiAutocomplete-option {
    margin: 5px 10px;
    border-radius: 18px;
  }

  &[aria-selected='true'] {
    background: ${(props) => props.theme.palette.primary.main};
  }

  .MuiAutocomplete-inputRoot {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    padding-left: 8px !important;
    border-color: ${colors.gray500};
  }
`;

//TODO refactor move to separate reusable component
const TextField = styled(MuiTextField)`
  margin-bottom: ${(props) => props.mb || 0}px;
  width: 100%;

  .formControl {
    padding-top: ${(props) => props.multiline && '6px'};
    padding-bottom: ${(props) => props.multiline && '6px'};
    height: ${(props) => (props.multiline ? 'auto' : '32px')};
  }
  .input {
    height: ${(props) => (props.multiline ? 'auto' : '32px')};
    border-color: ${colors.gray500};
  }
  fieldset {
    border-color: ${colors.gray500};
  }
  .MuiInputAdornment-root {
    margin: 0 7px;
  }
`;
