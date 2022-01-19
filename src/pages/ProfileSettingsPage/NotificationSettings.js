import Card from 'components/Card';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { Button as MuiButton, Grid as MuiGrid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTranslation } from 'react-i18next';

const NotificationSettings = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <Card icon="engine-warning" title={t('Notification settings')}>
        <MuiGrid container spacing={2}>
          <MuiGrid item>
            <FormControlLabel
              control={<Switch />}
              label={t('Notifications via SMS')}
            />
          </MuiGrid>

          <MuiGrid item>
            <FormControlLabel
              control={<Switch />}
              label={t('Notifications via Email')}
            />
          </MuiGrid>
        </MuiGrid>
      </Card>
    </>
  );
};

export default NotificationSettings;
