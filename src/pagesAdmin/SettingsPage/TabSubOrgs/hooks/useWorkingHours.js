import React, { useEffect, useRef } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_WORKING_HOURS } from '../../gqlSchemes/getWorkingHours';
import { SET_WORKING_HOURS } from '../../gqlSchemes/setWorkingHours';
import { indexBy, prop } from 'ramda';
import { formatISO, format } from 'date-fns';

function useWorkingHours() {
  const resolveRef = useRef(null);
  const [
    getWorkingHours,
    { loading, error, data },
  ] = useLazyQuery(GET_WORKING_HOURS, { fetchPolicy: 'no-cache' });
  const [setWorkingHours, { error: updateError }] = useMutation(
    SET_WORKING_HOURS
  );

  if (error || updateError) {
    console.log(error || updateError);
  }

  const saveWorkingHours = (payload) => {
    const formatTime = payload?.workingHours.map((time) => {
      return {
        dayOfWeek: time?.dayOfWeek,
        startTime: format(time?.startTime, 'HH:mm'),
        endTime: format(time?.endTime, 'HH:mm'),
        startLunchTime: format(time?.startLunchTime, 'HH:mm'),
        endLunchTime: format(time?.endLunchTime, 'HH:mm'),
      };
    });

    setWorkingHours({
      variables: {
        workingHours: formatTime,
        subOrg: payload?.subOrgId,
      },
    });
  };

  const onGet = (id) => {
    getWorkingHours({ variables: { id } });
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const workingHours = data
    ? indexBy(prop('dayOfWeek'), data?.orgUnit.subOrgById.workingHours)
    : [];

  if (data) {
    resolveRef.current && resolveRef.current(workingHours);
    resolveRef.current = null;
  }

  return {
    workingHours,
    loading,
    saveWorkingHours,
    getWorkingHours: onGet,
  };
}

export default useWorkingHours;
