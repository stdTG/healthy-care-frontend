import React from 'react';
import {
  Box as MuiBox,
  Button as MuiButton,
  Typography as MuiTypography,
} from '@material-ui/core';
import PageTitle from 'components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getModuleState as getAuthModuleState } from 'services/auth';
import { actions as authActions } from 'services/auth';
import { useTranslation } from 'react-i18next';

function DashboardPage() {
  const dispatch = useDispatch();
  const authState = useSelector(getAuthModuleState);
  const { t } = useTranslation();

  function logout() {
    dispatch(authActions.logout());
  }

  return (
    <MuiBox m={3}>
      <MuiBox display="flex">
        <PageTitle title={t('Dashboard')} />
      </MuiBox>
      <MuiTypography variant={'h4'}>
        {t('Welcome')}, {authState.username}
      </MuiTypography>
      <MuiButton onClick={logout}>{t('Logout')}</MuiButton>
    </MuiBox>
  );
}

export default DashboardPage;
