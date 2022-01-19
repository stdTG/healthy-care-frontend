import React, { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { UPDATE } from '../gqlSchemes/update';

import { CarePlanType } from 'pages/CarePlans/constants';
import { CarePlan } from 'pages/CarePlans/models';
import { actions } from 'pages/CarePlans/carePlanService';

export function useUpdate(type: CarePlanType) {

  const dispatch = useDispatch();

  const [execute, { data, error, loading }] = useMutation<any, { type: CarePlanType, data: CarePlan }>(UPDATE);
  if (error) {
    console.error(error);
  }

  const update = async (values: CarePlan) => {
    const {
      id_,
      name,
      subtitle,
      description,
      durationMonths,
      durationWeeks,
      durationDays
    } = values;

    const response = execute({
      variables: {
        type,
        data: {
          id_,
          name,
          subtitle,
          description,
          durationMonths,
          durationWeeks,
          durationDays
        }
      }
    });

    // if (response?.data?.carePlan?.update.ok) {
    //   setCarePlan([
    //     values,
    //     ...carePlanDataCreate.filter((history) => history.id_ !== values.id),
    //   ]);
    // }
  };

  useEffect(() => {
    data && dispatch(actions.setBuilder_UpdateData());
  }, [data]);

  return {update};
}
