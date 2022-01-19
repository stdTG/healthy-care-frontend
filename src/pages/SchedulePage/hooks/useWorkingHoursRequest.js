import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

import { GET_WORKING_HOURS } from 'pages/SchedulePage/gqlSchemes/getWorkingHours';
import { actions as calendarActions } from 'services/calendar';

function useWorkingHoursRequest(props) {
  const dispatch = useDispatch();

  const [
    getWorkingHours,
    { called, loading, error, data: workingHours },
  ] = useLazyQuery(GET_WORKING_HOURS);

  useEffect(() => {
    getWorkingHours();
  }, []);

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (workingHours?.user?.dashboard?.me?.workingHours) {
      dispatch(
        calendarActions.setWorkingHours(
          workingHours?.user?.dashboard?.me?.workingHours
        )
      );
    }
  }, [workingHours]);

  return { workingHours, loading };
}

export default useWorkingHoursRequest;
