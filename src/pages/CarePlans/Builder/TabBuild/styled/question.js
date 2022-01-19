import React from 'react';
import styled from 'styled-components';
import { Autocomplete as RffAutocomplete } from 'mui-rff';
import { FormControl as MuiFormControl } from '@material-ui/core';

import colors from 'lib/colors';
import { Input, Typography } from 'components/ui';

export const SFormControl = styled((props) => {
  const { children, label, ...controlProps } = props;

  return (
    <MuiFormControl {...controlProps}>
      {label && (
        <Typography variant="h6" gutterBottom style={{ minWidth: '100px' }}>
          {label}
        </Typography>
      )}
      {children}
    </MuiFormControl>
  );
})`
  align-items: baseline;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;

  fieldset {
    border-color: ${colors.gray500};
  }
`;

export const AC = styled((props) => {
  const { onChange, placeholder, options, name, className, ...rest } = props;
  return (
    <RffAutocomplete
      className={className}
      onChange={onChange}
      label=""
      name={name}
      variant="outlined"
      options={options}
      getOptionValue={(option) => option.type}
      getOptionLabel={(option) => option.text}
      renderInput={(params) => (
        <Input {...params} placeholder={placeholder} variant="outlined" />
      )}
      {...rest}
    />
  );
})`
  width: 100%;
`;
