import React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import { Icon, IconButton } from 'components/ui';

function GetAddSettings(t) {
  const actions = (
    <MuiButton color="primary" variant="contained" type="submit">
      <Icon icon="calendar-plus" size="1x" mr={10} /> {t('Create event')}
    </MuiButton>
  );

  const title = t('New event');

  return {
    actions,
    title,
  };
}

export default GetAddSettings;
