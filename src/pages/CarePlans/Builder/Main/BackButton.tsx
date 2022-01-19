import React from 'react';
import { Button } from '@material-ui/core';
import { Icon } from 'components/ui';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';
import { careTeamMemberRouteTemplates as routes } from 'routing/routeTemplates';
import { useHistory } from 'react-router-dom';
import { CarePlanType } from 'pages/CarePlans/constants';
import { GqlCarePlanType } from '../../../../generated/graphql';
import { useTranslation } from 'react-i18next';

const BackButton = () => {
  const history = useHistory();
  const moduleState = useSelector((state: RootState) => state.carePlans);
  const { t } = useTranslation();

  const backToList = () => {
    if (moduleState.currentType == GqlCarePlanType.Workspace) {
      history.push(routes.carePlansWorkspace_List);
    } else {
      history.push(routes.carePlansTemplate_List);
    }
  };

  return (
    <Button
      size="medium"
      variant="contained"
      color="default"
      onClick={backToList}
    >
      <Icon icon="arrow-left" mr={8} />
      {t('Protocols')}
    </Button>
  );
};

export default BackButton;
