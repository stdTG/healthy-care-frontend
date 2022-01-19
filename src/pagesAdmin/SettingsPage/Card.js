import React from 'react';
import { Typography as MuiTypography, Box as MuiBox } from '@material-ui/core';

import SPaper from './styled/SPaper';

function Card(props) {
  const {
    children,
    title,
    getTitleIcon,
    EditButton = <div />,
    deleteButton = <div />,
    style,
  } = props;

  return (
    <SPaper style={{ height: '100%', ...style }}>
      <MuiBox
        justifyContent="space-between"
        alignItems="baseline"
        display="flex"
        mb={2}
      >
        <MuiTypography variant="h4">
          {getTitleIcon && getTitleIcon({ style: { marginRight: '10px' } })}
          {title?.length > 15 ? `${title.slice(0, 15)}...` : title}
        </MuiTypography>

        {deleteButton ? (
          <div style={{ display: 'flex' }}>
            {EditButton}
            <div style={{ marginLeft: '10px' }}>{deleteButton}</div>
          </div>
        ) : (
          <div>{EditButton}</div>
        )}
      </MuiBox>

      <section>{children}</section>
    </SPaper>
  );
}

export default Card;
