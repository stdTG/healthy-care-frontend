import React from 'react';
import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import getClient from 'apolloClient';
import { selectors as authSelectors } from 'services/auth';
import GlobalStyle from 'components/Calendar/globalStyles';
import { localizer } from 'lib/providers/localizer';
import { LocalizerProvider } from 'lib/providers';
import { careTeamMemberRouteTemplates as routeTemplates } from '../routeTemplates';
import NavigationSidebar from './NavigationSidebar';
import { Content, Root } from '../styled/styled';

import ProfileSettingsPage from 'pages/ProfileSettingsPage';
import PatientRecordPage from '../../pages/PatientRecordPage/index';
import DashboardPage from 'pages/DashboardPage';
import PatientsPage from 'pages/PatientsPage';
import ChatPage from 'pages/ChatPage';
import CarePlanBuilder from 'pages/CarePlans/Builder/index';
import CarePlansPage from 'pages/CarePlans/List/index';
import { useRefreshUserInfo } from 'lib/hooks/useRefreshUserInfo';
import ChatsPage from 'pages/Chats';

const SchedulePage = loadable(() => import('pages/SchedulePage'));

function TeamMemberRouting() {
  useRefreshUserInfo();
  const accessToken = useSelector(authSelectors.getAccessToken);
  const workspace = useSelector(authSelectors.getWorkspace);

  const dispatch = useDispatch();

  return (
    <ApolloProvider client={getClient(accessToken, workspace)}>
      <Root>
        <GlobalStyle />
        <NavigationSidebar />
        <Content>
          <LocalizerProvider value={localizer}>
            <Switch>
              <Route
                exact
                path={routeTemplates.dashboardPage}
                component={DashboardPage}
              />
              <Route
                exact
                path={routeTemplates.schedulePage}
                component={SchedulePage}
              />
              <Route
                exact
                path={routeTemplates.patientsPage}
                component={PatientsPage}
              />
              <Route
                path={routeTemplates.patientRecordPage}
                component={PatientRecordPage}
              />
              <Route path={routeTemplates.chatPage} component={ChatsPage} />
              <Route
                exact
                path={routeTemplates.carePlansWorkspace_List}
                component={CarePlansPage}
              />
              <Route
                exact
                path={routeTemplates.carePlansTemplate_List}
                component={CarePlansPage}
              />
              <Route
                path={routeTemplates.carePlanTemplate_One}
                component={CarePlanBuilder}
              />
              <Route
                exact
                path={routeTemplates.carePlanWorkspace_New}
                component={CarePlanBuilder}
              />
              <Route
                path={routeTemplates.carePlanWorkspace_One}
                component={CarePlanBuilder}
              />
              <Route
                exact
                path={routeTemplates.profileSettingsPage}
                component={ProfileSettingsPage}
              />
            </Switch>
          </LocalizerProvider>
        </Content>
      </Root>
    </ApolloProvider>
  );
}

export default TeamMemberRouting;
