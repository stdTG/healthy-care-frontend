import React from 'react';
import { Grid as MuiGrid } from '@material-ui/core';
import useGetOneCarePlan from '../../_service/hooks/useGetOneCarePlan';
import { useSelector } from 'react-redux';
import useGetCarePlanVariables from '../../_service/hooks/useGetCarePlanVariables';
import DrawingBoard from '../FlowChart/DrawingBoard';
import Toolbar from '../FlowChart/Toolbar';
import { selectors as widgetSelectors } from '../../../../services/widget';

const TabBuild = (props) => {
  const { carePlanId } = props;
  const widgets = useSelector(widgetSelectors.getWidgets);
  const {} = useGetOneCarePlan(carePlanId);

  const variables = useGetCarePlanVariables(widgets);

  return (
    <MuiGrid item>
      <Toolbar />
      <DrawingBoard />
    </MuiGrid>
  );
};

export default TabBuild;
