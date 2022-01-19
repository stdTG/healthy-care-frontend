import React from 'react';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import {
  Typography as MuiTypography,
  Button as MuiButton,
} from '@material-ui/core';

import { Icon } from 'components/ui';
import CircularProgress from '@material-ui/core/CircularProgress';

const AddButton = styled(({ title, className, icon, loading, ...props }) => (
  <MuiButton
    {...props}
    variant="outlined"
    size="small"
    className={className}
    classes={{ disabled: 'disabled' }}
  >
    {!loading ? (
      <div className="content-wrap">
        <Icon icon={icon || 'plus'} className="icon" mr={10} />
        <MuiTypography variant="h5" color="inherit">
          {title}
        </MuiTypography>
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
    margin-right: 10px;
    font-size: 16px;
  }
  .content-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export default AddButton;
