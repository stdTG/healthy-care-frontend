import React from 'react';
import { Typography as MuiTypography } from '@material-ui/core';

function Title(props) {
  const { title } = props;

  return (
    <MuiTypography variant={'h4'} style={{ marginBottom: '40px' }}>
      {title}
    </MuiTypography>
  );
}
export default Title;
