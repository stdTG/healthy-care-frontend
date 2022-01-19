import React from 'react';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import {
  Typography as MuiTypography,
  Button as MuiButton,
  CircularProgress,
} from '@material-ui/core';

import { Icon } from 'components/ui';
import SSpinerWrap from '../../../components/styled/SSpinerWrap';

const DeleteButton = styled(({ title, className, icon, loading, ...props }) => (
  <MuiButton
    {...props}
    variant="outlined"
    size="small"
    style={{ minWidth: '33px' }}
    className={className}
    classes={{ disabled: 'disabled' }}
  >
    {loading ? (
      <SSpinerWrap>
        <CircularProgress size={15} />
      </SSpinerWrap>
    ) : (
      <>
        <Icon icon="trash-alt" className="icon" mr={title && 10} />
        {title && (
          <>
            <MuiTypography variant="h5">{title}</MuiTypography>
          </>
        )}
      </>
    )}
  </MuiButton>
))`
  background-color: ${(props) => fade(props.theme.palette.warning.main, 0.05)};
  color: ${(props) => props.theme.palette.warning.main};
  border: none;
  height: 32px;

  &.disabled {
    background-color: ${(props) =>
      fade(props.theme.palette.warning.main, 0.05)};
    color: ${(props) => props.theme.palette.common.white};
    border: none;
  }

  &:hover {
    background-color: ${(props) => props.theme.palette.warning.main};
    color: ${(props) => props.theme.palette.common.white};

    .MuiTypography-root {
      color: ${(props) => props.theme.palette.common.white};
    }
  }

  .icon {
    font-size: 16px;
  }

  .MuiTypography-root {
    color: ${(props) => props.theme.palette.warning.main};
  }
`;

export default DeleteButton;
