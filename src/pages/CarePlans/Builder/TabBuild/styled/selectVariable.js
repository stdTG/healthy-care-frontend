import React from 'react';
import styled from 'styled-components';
import { Autocomplete as RffAutocomplete } from 'mui-rff';
import { Input } from 'components/ui';

export const SelectVariable = styled((props) => {
  const { onChange, placeholder, options, name, className, ...rest } = props;
  return (
    <RffAutocomplete
      className={className}
      onChange={onChange}
      label=""
      name={name}
      variant="outlined"
      options={options}
      getOptionValue={(option) => option.variableName}
      getOptionLabel={(option) => option.variableName}
      renderInput={(params) => (
        <Input {...params} placeholder={placeholder} variant="outlined" />
      )}
      {...rest}
    />
  );
})`
  width: 100%;
  margin-bottom: 15px;
`;
