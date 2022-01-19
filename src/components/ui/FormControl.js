import React from 'react';
import {
  FormControl as MuiFormControl,
  Typography as MuiTypography,
} from '@material-ui/core';
import styled from 'styled-components';

import colors from 'lib/colors';

const FormControl = styled((props) => {
  const { children, label, color, ...controlProps } = props;

  return (
    <MuiFormControl {...controlProps}>
      {label && (
        <MuiTypography variant="h5" color={color} gutterBottom>
          {label}
        </MuiTypography>
      )}
      {children}
    </MuiFormControl>
  );
})`
  width: 100%;
  margin-bottom: 15px;

  fieldset {
    border-color: ${colors.gray500};
  }
`;

export default FormControl;
