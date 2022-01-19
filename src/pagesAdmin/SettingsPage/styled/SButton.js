import React from 'react';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import {
  Typography as MuiTypography,
  Button as MuiButton,
} from '@material-ui/core';

import { Icon } from 'components/ui';

const SButton = styled(({ title, className, icon, ...props }) => (
  <MuiButton
    {...props}
    variant="outlined"
    size="small"
    className={className}
    classes={{ disabled: 'disabled' }}
  >
    <MuiTypography variant="h5">{title}</MuiTypography>
  </MuiButton>
))`
  border: none;
  color: ${(props) => props.theme.palette.primary.main};
  height: 32px;

  &.disabled {
    color: ${(props) => fade(props.theme.palette.primary.main, 0.3)};
    background-color: ${(props) =>
      fade(props.theme.palette.primary.main, 0.05)};
    border: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.palette.primary.main};

    .MuiTypography-root {
      color: ${(props) => props.theme.palette.common.white};
    }
  }

  .MuiTypography-root {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

export default SButton;
