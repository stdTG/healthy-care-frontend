import React from 'react';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import {
  Typography as MuiTypography,
  Button as MuiButton,
} from '@material-ui/core';

import { Icon } from 'components/ui';
import CircularProgress from '@material-ui/core/CircularProgress';

const SeeButton = styled(({ title, className, icon, loading, ...props }) => (
  <MuiButton
    {...props}
    variant="outlined"
    size="small"
    className={className}
    classes={{ disabled: 'disabled' }}
  >
    {!loading ? (
      <div className="content-wrap">
        <MuiTypography variant="h5" color="inherit">
          {title}
        </MuiTypography>
        <Icon icon={icon || 'arrow-right'} className="icon" ml={10} />
      </div>
    ) : (
      <CircularProgress size={20} />
    )}
  </MuiButton>
))`
  background-color: ${(props) => props.theme.palette.primary.light};
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
    color: ${(props) => props.theme.palette.common.white};
  }

  .icon {
    font-size: 16px;
  }
  .content-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export default SeeButton;
