import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PATIENTS } from 'pages/SchedulePage/gqlSchemes/getPatients';

function useRequest() {
  const [
    getPatients,
    {
      called: patientsCalled,
      loading: patientsLoading,
      error: getPatientsError,
      data: patients,
    },
  ] = useLazyQuery(GET_PATIENTS, {
    fetchPolicy: 'no-cache',
    variables: { page: 0, perPage: 10 },
  });
  const patientsArr = patients?.user?.patient?.pagedList?.items;

  useEffect(() => {
    getPatients();
  }, []);

  return {
    patientsArr,
    dataLoading: patientsLoading,
    dataCalled: patientsCalled,
  };
}

export default useRequest;
