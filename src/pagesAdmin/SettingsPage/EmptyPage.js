import React from 'react';
import {
  Typography as MuiTypography,
  Button as MuiButton,
  Grid as MuiGrid,
} from '@material-ui/core';

import { Space, Icon } from 'components/ui';

function EmptyPage(props) {
  const { openNewDialog, text, buttonText, style } = props;

  return (
    <MuiGrid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: '90vh', ...style }}
    >
      <Space textAlign="center" size="medium" flexDirection="column">
        <MuiTypography variant="h3" color="textSecondary">
          {text}
        </MuiTypography>
        <MuiButton
          size="large"
          variant="contained"
          onClick={openNewDialog}
          style={{ borderRadius: '18px' }}
        >
          <Icon icon="user-plus" size="1x" mr={10} /> {buttonText}
        </MuiButton>
      </Space>
    </MuiGrid>
  );
}

export default EmptyPage;
