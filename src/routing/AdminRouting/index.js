import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { useSelector } from 'react-redux';

import {
  adminRouteTemplates,
  careTeamMemberRouteTemplates as routeTemplates,
} from 'routing/routeTemplates';
import { selectors as authSelectors } from 'services/auth';
import { localizer } from 'lib/providers/localizer';
import { LocalizerProvider } from 'lib/providers';
import getClient from 'apolloClient';
import NavigationSidebar from './NavigationSidebar';
import { Root, Content } from '../styled/styled';

import DashboardPage from 'pagesAdmin/DashboardPage';
import SettingsPage from 'pagesAdmin/SettingsPage';
import SettingsTeamsPage from 'pagesAdmin/SettingsTeamsPage';
import ProfileSettingsPage from 'pages/ProfileSettingsPage';

function AdminRouting() {
  const accessToken = useSelector(authSelectors.getAccessToken);
  const workspace = useSelector(authSelectors.getWorkspace);

  return (
    <ApolloProvider client={getClient(accessToken, workspace)}>
      <Root>
        <NavigationSidebar />
        <Content>
          <LocalizerProvider value={localizer}>
            <Switch>
              <Route
                exact
                path={adminRouteTemplates.dashboardPage}
                component={DashboardPage}
              />
              <Route
                exact
                path={routeTemplates.profileSettingsPage}
                component={ProfileSettingsPage}
              />
              <Route
                exact
                path={adminRouteTemplates.settingsPage}
                component={SettingsPage}
              />
              <Route
                exact
                path={adminRouteTemplates.subOrgPage}
                component={SettingsTeamsPage}
              />
              <Route
                path={adminRouteTemplates.careTeamPage}
                component={SettingsTeamsPage}
              />
            </Switch>
          </LocalizerProvider>
        </Content>
      </Root>
    </ApolloProvider>
  );
}

export default AdminRouting;
