import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CardList from './CardList';
import EmptyPage from './EmptyPage';
import TabToolbar from 'pages/CarePlans/List/components/TabToolbar';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';
import { actions } from 'pages/CarePlans/carePlanService';

import { useGetList } from 'pages/CarePlans/_service/hooks/useGetList';
import { CarePlansContainer } from 'pages/CarePlans/models';
import { getContainer } from '../../carePlanService';
import { careTeamMemberRouteTemplates as routes } from 'routing/routeTemplates';
import { GqlCarePlanType } from '../../../../generated/graphql';
import { useTranslation } from 'react-i18next';

import { completeCarePlansInfo } from 'lib/fakeData/fakeCarePlanData';


const TabPane = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const container: CarePlansContainer = useSelector(
    (state: RootState) => getContainer(state.carePlans, props.type)
  );

  var temp = JSON.parse(JSON.stringify(container.items))
  var fakedCarePlans = completeCarePlansInfo(temp);
  // var fakedCarePlans = completeCarePlansInfo(container.items);


  useEffect(() => {
    dispatch(actions.changeType(props.type));
  }, []);

  const { data, called, loading  } = useGetList(props.type, 0, 1000);
  const { t } = useTranslation();

  const createNew = () => {
    history.push(routes.carePlanWorkspace_New);
  };

  const sync = () => {
  };


  // const isLoading = (container.items.length == 0) && !called || loading;
  // const loadedEmpty = (container.items.length == 0) && !loading;

  const isLoading = (fakedCarePlans.length == 0) && !called || loading;
  const loadedEmpty = (fakedCarePlans.length == 0) && !loading;

  return isLoading ? (
    <div>{t('Loading')}</div>
  ) : loadedEmpty ? (
    <EmptyPage onNew={createNew}/>
  ) : (
    <>
      <TabToolbar type={props.type} onRefresh={sync} onNew={createNew}/>
      {/* <CardList type={props.type} items={container.items}/> */}
      <CardList type={props.type} items={fakedCarePlans}/>
    </>
  );
};

export default TabPane;

interface Props {
  type: GqlCarePlanType,
}
