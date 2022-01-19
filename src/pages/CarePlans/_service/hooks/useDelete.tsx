import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { DELETE } from 'pages/CarePlans/_service/gqlSchemes/delete';

import { actions } from "pages/CarePlans/carePlanService";
import { GqlCarePlanType } from '../../../../generated/graphql';

export function useDelete(type: GqlCarePlanType, id_: string) {

  const dispatch = useDispatch()

  const { error, loading, data } = useQuery<any, { type: GqlCarePlanType, id_: string }>(
    DELETE,
    {
      fetchPolicy: 'no-cache',
      variables: {
        type,
        id_,
      }
    }
  );
  if (error) {
    console.error(error);
  }

  useEffect(() => {
    data && dispatch(actions.setItems({data, type}));
  }, [data]);

  return { data, loading };
}
