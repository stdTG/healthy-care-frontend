import React from 'react';
import { Typography as MuiTypography, Box as MuiBox } from '@material-ui/core';

import SPaper from './styled/SPaper';

function Card(props) {
  const { children, title, getTitleIcon, EditButton = <div /> } = props;

  return (
    // <SPaper style={{ height: '100%' }}>
    <SPaper className="card">
      <MuiBox
        justifyContent="space-between"
        alignItems="baseline"
        display="flex"
        mb={2}
      >
        <MuiTypography variant="h4">
          {getTitleIcon && getTitleIcon({ style: { marginRight: '10px' } })}
          {title}
        </MuiTypography>

        {EditButton}
      </MuiBox>

      <section>{children}</section>
    </SPaper>
  );
}

export default Card;
