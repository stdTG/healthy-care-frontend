import React from 'react';
import styled from 'styled-components';
import { Typography as MuiTypography } from '@material-ui/core';

export const Title = styled(({ className, text }) => (
  <MuiTypography className={className}>{text.toUpperCase()}</MuiTypography>
))`
  font-size: 13px;
  font-weight: bold;
  color: #ccc;
  margin: 10px 0 0;
`;
