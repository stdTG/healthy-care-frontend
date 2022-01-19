import React from 'react';
import { CircularProgress as MuiCircularProgress } from '@material-ui/core';
import styled from 'styled-components';

const SCircularProgress = styled(({ className, color, placement, ...props }) => {
  return (
    <MuiCircularProgress
      {...props}
      className={className}
      classes={{ circle: 'circle', root: placement }}
    />
  );
})`
  &.top {
    color: ${(props) =>
      props.color === 'success'
        ? props.theme.palette.success.main
        : props.color === 'info'
        ? props.theme.palette.info.main
        : props.theme.palette.warning.main};
    position: absolute;
    left: 0;
  }
  &.bottom {
    color: ${(props) => props.theme.palette.grey[200]};
  }

  circle {
    stroke-linecap: round;
  }
`;

function CircularProgress(props) {
  return (
    <div style={{ position: 'relative' }}>
      <SCircularProgress
        placement='top'
        variant='determinate'
        size={19}
        thickness={5}
        {...props}
        value={100}
      />
      <SCircularProgress
        placement='bottom'
        variant='static'
        disableShrink
        size={19}
        thickness={5}
        {...props}
      />
    </div>
  );
}

export default CircularProgress;
