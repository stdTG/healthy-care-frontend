import React from 'react';
import {
  Typography as MuiTypography,
  Button as MuiButton,
  Grid as MuiGrid,
} from '@material-ui/core';

import { Space, Icon } from 'components/ui';
import { useTranslation } from 'react-i18next';

function EmptyPage(props) {
  const { openNewPatientDialog } = props;
  const { t } = useTranslation();

  return (
    <MuiGrid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: '90vh' }}
    >
      <Space textAlign="center" size="medium" flexDirection="column">
        <MuiTypography variant="h3" color="textSecondary">
          {t('You have no patient yet.')}
        </MuiTypography>
        <MuiButton
          size="large"
          variant="contained"
          onClick={openNewPatientDialog}
          style={{ borderRadius: '18px' }}
        >
          <Icon icon="user-plus" size="1x" mr={10} /> {t('New patient')}
        </MuiButton>
      </Space>
    </MuiGrid>
  );
}

export default EmptyPage;
