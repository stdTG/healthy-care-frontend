import React from 'react';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import {
  Typography as MuiTypography,
  Button as MuiButton,
} from '@material-ui/core';

import { Icon } from 'components/ui';
import CircularProgress from '@material-ui/core/CircularProgress';

const Button = styled(({ title, className, icon, loading, ...props }) => (
  <MuiButton
    {...props}
    size="small"
    variant="outlined"
    className={className}
    classes={{ disabled: 'disabled' }}
  >
    {/*{icon && <Icon icon={icon} className="icon" mr={10} />}*/}
    {/*<MuiTypography variant="h5">{title}</MuiTypography>*/}
    {!loading ? (
      <div className="content-wrap">
        {icon && <Icon icon={icon || 'plus'} className="icon" mr={10} />}
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

    .MuiTypography-root {
      color: ${(props) => props.theme.palette.common.white};
    }
    .icon {
      color: ${(props) => props.theme.palette.common.white};
    }
  }

  .MuiTypography-root {
    color: ${(props) => props.theme.palette.primary.main};
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

export default Button;
