import React from 'react';

import { Icon } from 'components/ui';
import { careTeamMemberRouteTemplates as routeTemplates } from '../routeTemplates';
import Sidebar from 'components/Sidebar';
import { actions as authActions } from 'services/auth';

export const pages = [
  {
    text: 'Dashboard',
    icon: <Icon icon="home" />,
    link: routeTemplates.dashboardPage,
  },
  {
    text: 'Schedule',
    icon: <Icon icon="calendar-alt" />,
    link: routeTemplates.schedulePage,
  },
  {
    text: 'Patients',
    icon: <Icon icon="user-friends" />,
    link: routeTemplates.patientsPage,
  },
  {
    text: 'Chat',
    icon: <Icon icon="comment-lines" />,
    link: routeTemplates.chatPage,
  },
  {
    text: 'Alerts',
    icon: <Icon icon="engine-warning" />,
    link: routeTemplates.alertPage,
  },
];
export const settings = [
  {
    text: 'Care plans',
    icon: <Icon icon="hands-heart" />,
    link: routeTemplates.carePlansWorkspace_List,
  },
  {
    text: 'Profile settings',
    icon: <Icon icon="user-cog" />,
    link: routeTemplates.profileSettingsPage,
  },
  {
    text: 'Sign out',
    icon: <Icon icon="sign-out" />,
    link: '',
    onClick: (dispatch) => dispatch(authActions.logout()),
  },
];

function NavigationSidebar() {
  return <Sidebar middle={pages} bottom={settings} />;
}

export default NavigationSidebar;
