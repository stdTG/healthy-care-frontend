import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_ONE, GetOne_ResponseData } from '../gqlSchemes/getOne';
import { CarePlanType } from 'pages/CarePlans/constants';
import { CarePlan } from 'pages/CarePlans/models';
import { useDispatch } from 'react-redux';
import { actions } from 'pages/CarePlans/carePlanService';

const useGetOne = (type: CarePlanType, id_: string) => {
  const dispatch = useDispatch();
  const [fetch, { data, called, loading, error }] = useLazyQuery<GetOne_ResponseData, { type: CarePlanType, id_: string }>(
    GET_ONE,
    {
      fetchPolicy: 'no-cache',
      variables: {
        type,
        id_
      }
    }
  );
  if (error) {
    console.error(error);
  }

  useEffect(() => {
    dispatch(actions.setBuilder_GetOneData({data, called, loading, error}));
  }, [loading]);

  useEffect(() => {
    if (!data) return;
    dispatch(actions.setBuilder_GetOneData({data, called, loading, error}));
  }, [data]);

  return {fetch};
}

export default useGetOne;
