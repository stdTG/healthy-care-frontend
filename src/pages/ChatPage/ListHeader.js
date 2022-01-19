import React from 'react';
import { InputAdornment as MuiInputAdornment } from '@material-ui/core';

import { Search, Icon } from 'components/ui';

function ListHeader(props) {
  return (
    <>
      <Search
        size="small"
        variant="outlined"
        startAdornment={
          <MuiInputAdornment position="start">
            <Icon icon="search" />
          </MuiInputAdornment>
        }
      />
    </>
  );
}

export default ListHeader;
