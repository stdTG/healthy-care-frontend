import React, { useEffect, useState } from 'react';
import { Tabs as MuiTabs, Box } from '@material-ui/core';
import { TabContext as MuiTabContext } from '@material-ui/lab';
import { useHistory, useLocation } from 'react-router-dom';

import TabMaster from 'pagesAdmin/SettingsPage/TabMaster/index';
import TabSubOrganizations from 'pagesAdmin/SettingsPage/TabSubOrgs';
import TabCareTeams from 'pagesAdmin/SettingsPage/TabCareTeams';
import TabUsers from 'pagesAdmin/SettingsPage/TabUsers';
import STab from 'pagesAdmin/SettingsPage/styled/STab';

import { Icon } from 'components/ui';
import { adminRouteTemplates } from 'routing/routeTemplates';
import { useTranslation } from 'react-i18next';
import { STabPanel } from './styled/STab';

export const adminSettingsTabs = {
  users: '1',
  careTeams: '2',
  subOrgs: '3',
};

function SettingsPage() {
  const history = useHistory();
  const location = useLocation();
  const currentTabNumber = location?.search.split('=')[1];
  const [currentTab, setCurrentTab] = useState(
    currentTabNumber || adminSettingsTabs.users
  );
  const { t } = useTranslation();

  useEffect(() => {
    setCurrentTab(currentTabNumber);
  }, [currentTabNumber]);

  const handleChange = (event, tabNumber) => {
    setCurrentTab(tabNumber);
    history.push({
      pathname: adminRouteTemplates.settingsPage,
      search: `?tab=${tabNumber}`,
    });
  };

  return (
    <Box padding={3}>
      <TabMaster />
      <MuiTabContext value={currentTab}>
        <MuiTabs
          value={currentTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          variant="fullWidth"
        >
          <STab
            icon={<Icon icon="address-card" />}
            label={t('Manage users')}
            value={adminSettingsTabs.users}
          />
          <STab
            icon={<Icon icon="users" />}
            label={t('Manage care teams')}
            value={adminSettingsTabs.careTeams}
          />
          <STab
            icon={<Icon icon="hospital-symbol" />}
            label={t('Manage sub organisations')}
            value={adminSettingsTabs.subOrgs}
          />
        </MuiTabs>
        <STabPanel value={adminSettingsTabs.users}>
          <TabUsers />
        </STabPanel>
        <STabPanel value={adminSettingsTabs.careTeams}>
          <TabCareTeams />
        </STabPanel>
        <STabPanel value={adminSettingsTabs.subOrgs}>
          <TabSubOrganizations />
        </STabPanel>
      </MuiTabContext>
    </Box>
  );
}

export default SettingsPage;
