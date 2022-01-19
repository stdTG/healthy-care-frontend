import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { useSelector } from 'react-redux';

import { superAdminRouteTemplates } from 'routing/routeTemplates';
import { selectors as authSelectors } from 'services/auth';
import { localizer } from 'lib/providers/localizer';
import { LocalizerProvider } from 'lib/providers';
import getClient from 'apolloClient';
import NavigationSidebar from './NavigationSidebar';
import { Content, Root } from '../styled/styled';
import SettingsPage from 'pagesSuperAdmin/SettingsPage';

function SuperAdminRouting() {
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
                path={superAdminRouteTemplates.settingsPage}
                component={SettingsPage}
              />
            </Switch>
          </LocalizerProvider>
        </Content>
      </Root>
    </ApolloProvider>
  );
}

export default SuperAdminRouting;
