import React, { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { CREATE, Create_ResponseData } from '../gqlSchemes/create';

import { CarePlanType } from 'pages/CarePlans/constants';
import { CarePlan } from 'pages/CarePlans/models';
import { actions } from 'pages/CarePlans/carePlanService';
import { RootState } from '../../../../store/reducer';
import { careTeamMemberRouteTemplates as routeTemplates } from 'routing/routeTemplates';
import { useHistory } from 'react-router-dom';
import { GqlCarePlanType } from '../../../../generated/graphql';

export function useCreate(type: CarePlanType) {

  const history = useHistory();
  const dispatch = useDispatch();
  const moduleState = useSelector((state: RootState) => state.carePlans);

  const [execute, { data, error, loading }] = useMutation<Create_ResponseData, { type: CarePlanType, data: CarePlan }>(CREATE);

  const create = async (values: CarePlan) => {
    const {
      name,
      subtitle,
      description,
      durationMonths,
      durationWeeks,
      durationDays
    } = values;

    execute({
      variables: {
        type,
        data: {
          name,
          subtitle,
          description,
          durationMonths,
          durationWeeks,
          durationDays
        }
      }
    });
  };

  if (error) {
    console.error(error);
  }
  const getRouteUrl = (id_: string) => {
    if (moduleState.currentType == GqlCarePlanType.Workspace) {
      return routeTemplates.carePlanWorkspace_One.replace(':id_', id_);
    }
    return routeTemplates.carePlanTemplate_One.replace(':id_', id_);
  };

  useEffect(() => {
    data && dispatch(actions.setBuilder_CreateData(data));
    if (data) {
      history.push(getRouteUrl(data.carePlan.create.resultId))
    }
  }, [data]);

  return { create };
}
