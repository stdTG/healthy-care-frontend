import React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import { Icon, IconButton } from 'components/ui';
import { useTranslation } from 'react-i18next';

function GetAddSettings(props) {
  const { t } = useTranslation();
  const actions = (
    <MuiButton color="primary" variant="contained" type="submit">
      <Icon icon="calendar-plus" size="1x" mr={10} /> {t('Create appointment')}
    </MuiButton>
  );

  const title = t('New appointment');

  return {
    actions,
    title,
  };
}

export default GetAddSettings;
