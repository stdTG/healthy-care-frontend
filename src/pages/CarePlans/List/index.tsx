import React, { ChangeEvent, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid, Tabs } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';

import { Icon, Tab } from 'components/ui';
import { careTeamMemberRouteTemplates as routes } from 'routing/routeTemplates';
import TabPane from './components/TabPane';

import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'pages/CarePlans/carePlanService';
import { RootState } from '../../../store/reducer';
import { GqlCarePlanType } from '../../../generated/graphql';
import { useTranslation } from 'react-i18next';

function List() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const moduleState = useSelector((state: RootState) => state.carePlans);
  const listType = location?.pathname?.split('/')[2]?.toUpperCase()
  const { t } = useTranslation();

  useEffect(() => {
    if (location.pathname == routes.carePlansWorkspace_List) {
      dispatch(actions.changeType(GqlCarePlanType.Workspace));
    } else {
      dispatch(actions.changeType(GqlCarePlanType.Template));
    }
  }, [location])

  const handleChange = (event: ChangeEvent<{}>, newValue: GqlCarePlanType) => {
    if (moduleState.currentType == newValue) return;
    if (newValue == GqlCarePlanType.Workspace) {
      history.push(routes.carePlansWorkspace_List);
    } else {
      history.push(routes.carePlansTemplate_List);
    }
  };

  return (
    <Grid container>
      <TabContext value={moduleState.currentType}>
        <Tabs
          value={moduleState.currentType}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          variant="fullWidth"
          style={{ width: '100%' }}
        >
          <Tab
            icon={<Icon icon="hospital"/>}
            label={t('Protocols')}
            value={GqlCarePlanType.Workspace}
          />
          <Tab
            icon={<Icon icon="address-card"/>}
            label={t('Templates')}
            value={GqlCarePlanType.Template}
          />
        </Tabs>
        <TabPanel value={GqlCarePlanType.Workspace} style={{ width: '100%' }}>
          <TabPane type={GqlCarePlanType.Workspace}/>
        </TabPanel>
        <TabPanel value={GqlCarePlanType.Template} style={{ width: '100%' }}>
          <TabPane type={GqlCarePlanType.Template}/>
        </TabPanel>
      </TabContext>
    </Grid>
  );
}

export default List;
