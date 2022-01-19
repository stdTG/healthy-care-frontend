import React from 'react';

import { Icon } from 'components/ui';
import { adminRouteTemplates } from '../routeTemplates';
import Sidebar from 'components/Sidebar';
import { actions as authActions } from 'services/auth';
import { useDispatch } from 'react-redux';

function NavigationSidebar() {
  const dispatch = useDispatch();

  function logout() {
    dispatch(authActions.logout());
  }

  const logoutIcon = [
    {
      text: 'User settings',
      icon: <Icon icon="sign-out" />,
      link: adminRouteTemplates.profileSettingsPage,
      onClick: () => logout(),
    },
  ];

  return <Sidebar bottom={logoutIcon} />;
}

export default NavigationSidebar;
