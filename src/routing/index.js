import React, { useEffect, useMemo, useState } from 'react';
import { includes } from 'ramda';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import { getModuleState } from 'services/auth';
import { dashboardUserRoles } from 'lib/enums/roles';
import SuperAdminRouting from 'routing/SuperAdminRouting';
import ConfirmDeleteDialog from 'components/ui/ConfirmDeleteDialog';
import useDialog from 'lib/hooks/useDialog';
import getClient from '../apolloClient';
import { ApolloProvider, useLazyQuery } from '@apollo/client';
import { selectors as authSelectors } from '../services/auth/index';
import { GET_USER_INFO } from '../pages/SchedulePage/gqlSchemes/getUserInfo';

const TeamMemberRouting = loadable(() => import('./TeamMemberRouting'));
const AdminRouting = loadable(() => import('./AdminRouting'));
const LoginRouting = loadable(() => import('./LoginRouting'));

export const ConfirmDeleteDialogContext = React.createContext({});

export default function Routing() {
  const authState = useSelector(getModuleState);
  const role = getRole(authState);

  const accessToken = useSelector(authSelectors.getAccessToken);
  const workspace = useSelector(authSelectors.getWorkspace);

  const confirmDeleteDialog = useDialog();
  const [dialogTitle, setDialogTitle] = useState('Delete');
  const [dialogWarningMessage, setDialogWarningMessage] = useState(
    'Do you want to delete this?'
  );

  const Routing = useMemo(() => {
    switch (role) {
      case dashboardUserRoles.unknown:
        return <LoginRouting />;
      case dashboardUserRoles.careTeamMember:
        return <TeamMemberRouting />;
      case dashboardUserRoles.admin:
        return <AdminRouting />;
      case dashboardUserRoles.superAdmin:
        return <SuperAdminRouting />;
    }
  }, [role]);

  return (
    <ApolloProvider client={getClient(accessToken, workspace)}>
      <Router>
        <ConfirmDeleteDialogContext.Provider
          value={{
            open: (config) => {
              setDialogTitle(config?.dialogTitle || 'Delete');
              setDialogWarningMessage(
                config?.dialogWarningMessage || 'Do you want to delete this?'
              );

              return confirmDeleteDialog.open(config?.initialData);
            },
          }}
        >
          <CssBaseline />
          {Routing}
          <ConfirmDeleteDialog
            isOpen={confirmDeleteDialog.isOpen}
            close={confirmDeleteDialog.close}
            initialData={confirmDeleteDialog.initialData}
            dialogTitle={dialogTitle}
            warningMessage={dialogWarningMessage}
          />
        </ConfirmDeleteDialogContext.Provider>
      </Router>
    </ApolloProvider>
  );
}

const getRole = (authState) => {
  const currentUserRoles = authState.userProfile['cognito:groups'] || [];

  const isAdminRole = includes(dashboardUserRoles.admin, currentUserRoles);
  const isSuperAdminRole = includes(
    dashboardUserRoles.superAdmin,
    currentUserRoles
  );

  if (!authState.isAuthenticated) {
    return dashboardUserRoles.unknown;
  }

  if (isAdminRole) {
    return dashboardUserRoles.admin;
  }

  if (isSuperAdminRole) {
    return dashboardUserRoles.superAdmin;
  }

  return dashboardUserRoles.careTeamMember;
};
