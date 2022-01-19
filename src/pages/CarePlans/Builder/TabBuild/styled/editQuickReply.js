import React from 'react';
import styled from 'styled-components';
import { TextField as RffTextField } from 'mui-rff';

export const SReplyField = styled((props) => (
  <RffTextField
    variant="outlined"
    fullWidth={true}
    multiline
    rows={2}
    {...props}
  />
))`
  margin-bottom: 10px;
  max-width: 300px;
`;
