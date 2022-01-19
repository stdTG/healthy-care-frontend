import React, { useRef } from 'react';
import { operationName, useLazyQuery } from '@apollo/client';
import { GET_CARE_TEAM_EDIT_DATA } from 'pagesAdmin/SettingsPage/gqlSchemes/getCareTeamEditData';

function useRequest() {
  const resolveRef = useRef(null);
  const [getData, { called, loading, error, data }] = useLazyQuery(
    GET_CARE_TEAM_EDIT_DATA,
    {
      fetchPolicy: 'no-cache',
      variables: { page: 0, perPage: 100 },
    }
  );

  const onGetData = (id) => {
    getData();

    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const usersArr = data?.user?.dashboard?.pagedList?.items || [];
  const subOrgsArr = data?.orgUnit.subOrgPagination.items || [];

  if (data) {
    resolveRef.current && resolveRef.current({ usersArr, subOrgsArr });
    resolveRef.current = null;
  }

  return {
    dataLoading: loading,
    dataCalled: called,
    onGetData,
  };
}

export default useRequest;
