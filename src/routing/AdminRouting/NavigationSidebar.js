import React from 'react';

import { Icon } from 'components/ui';
import { adminRouteTemplates } from '../routeTemplates';
import Sidebar from 'components/Sidebar';
import { actions as authActions } from 'services/auth';

export const pages = [
  {
    text: 'Dashboard',
    icon: <Icon icon="home" />,
    link: adminRouteTemplates.dashboardPage,
  },
  {
    text: 'Team management',
    icon: <Icon icon="users-class" />,
    link: () => `${adminRouteTemplates.settingsPage}?tab=1`,
  },
];

export const settings = [
  {
    text: 'User settings',
    icon: <Icon icon="user-cog" />,
    link: adminRouteTemplates.profileSettingsPage,
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
