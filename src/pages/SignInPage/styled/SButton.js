import styled from 'styled-components';
import { Button as MuiButton } from '@material-ui/core';
import React from 'react';

const SButton = styled((props) => (
  <MuiButton color="primary" variant="contained" {...props} />
))`
  border-radius: 18px;
  width: 166px;
  margin-bottom: 20px;
  margin-top: 14px;
`;

export default SButton;
