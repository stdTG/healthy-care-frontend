import React from 'react';
import { TextField as RffTextField } from 'mui-rff';

const STextField = (props) => (
  <RffTextField
    autoComplete="off"
    variant="outlined"
    autoFocus={true}
    size="small"
    multiline
    rows={2}
    {...props}
  />
);
export default STextField;
