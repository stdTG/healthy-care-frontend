import React from 'react';
import styled from 'styled-components';
import { Paper as MuiPaper } from '@material-ui/core';

const SPaper = styled((props) => <MuiPaper elevation={24} {...props} />)`
  padding: ${(props) => props.theme.spacing(3)}px;
  overflow: hidden;
`;
export default SPaper;
