import styled from 'styled-components';
import { Button as MuiButton } from '@material-ui/core';
import colors from 'lib/colors';
import React from 'react';

const SRecordActionButton = styled((props) => (
  <MuiButton
    variant="outlined"
    {...props}
    color="primary"
    classes={{ label: 'label' }}
  />
))`
  border-color: ${colors.gray500};
  margin-bottom: ${(props) => props.theme.spacing(2)}px;
  height: 106px;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.main};
    color: ${(props) => props.theme.palette.common.white};
  }

  &:last-child {
    margin-bottom: 0;
  }
  .label {
    display: block;
  }
  @media only screen and (max-width: 1099.98px) {
    p {
      display: none;
    }
  }
`;

export default SRecordActionButton;
