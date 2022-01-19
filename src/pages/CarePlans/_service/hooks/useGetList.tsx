import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { GET_LIST, GetList_ResponseData } from '../gqlSchemes/getList';

import { CarePlanType } from 'pages/CarePlans/constants';
import { CarePlan } from 'pages/CarePlans/models';
import { actions } from 'pages/CarePlans/carePlanService';
import { GqlCarePlanType } from '../../../../generated/graphql';

export function useGetList(type: GqlCarePlanType, page: number, pageSize: number) {

  const dispatch = useDispatch();


  const { data, called, loading, error  } = useQuery(
    GET_LIST,
    {
      fetchPolicy: 'no-cache',
      variables: {
        type,
        page,
        perPage: pageSize
      }
    }
  );
  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (!data) return;
    dispatch(actions.setItems({data, type}));
  }, [data]);

  return { data, called, loading };
}
