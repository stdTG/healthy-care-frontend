import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_USERS } from 'pagesAdmin/SettingsPage/gqlSchemes/getUsers';

function useRequest() {
  const [
    getUsers,
    {
      called: usersCalled,
      loading: usersLoading,
      error: getUsersError,
      data: users,
    },
  ] = useLazyQuery(GET_USERS, {
    fetchPolicy: 'no-cache',
    variables: { page: 0, perPage: 10 },
  });
  const usersArr = users?.user?.dashboard?.pagedList?.items || [];

  useEffect(() => {
    getUsers();
  }, []);

  return {
    usersArr,
    dataLoading: usersLoading,
    dataCalled: usersCalled,
  };
}

export default useRequest;
