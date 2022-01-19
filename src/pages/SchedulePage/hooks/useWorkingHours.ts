import React, { useEffect, useRef } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { indexBy, prop } from 'ramda';
import { format } from 'date-fns';
import { GET_WORKING_HOURS } from '../gqlSchemes/getWorkingHours';
import { SET_WORKING_HOURS } from '../gqlSchemes/setWorkingHours';
import { useDispatch } from 'react-redux';
import { actions as calendarActions } from 'services/calendar';

function useWorkingHours(isOpen: boolean) {
  const resolveRef = useRef(null);
  const dispatch = useDispatch();

  const [
    getWorkingHours,
    { loading: loadingGetWorkingHours, error, data },
  ] = useLazyQuery(GET_WORKING_HOURS, { fetchPolicy: 'no-cache' });

  const [setWorkingHours, { error: updateError, loading: loadingSetWorkingHours }] = useMutation(
    SET_WORKING_HOURS
  );

  if (error || updateError) {
    console.log(error || updateError);
  }

  useEffect(() => {
    if (!isOpen) {
      getWorkingHours();
    }
  }, [isOpen]);

  useEffect(() => {
    if (data?.user?.dashboard?.me?.workingHours) {
      dispatch(
        calendarActions.setWorkingHours(
          data?.user?.dashboard?.me?.workingHours
        )
      );
    }
  }, [data]);

  const formattedTime = (date: Date) => {
    return date.toISOString().split('T')[1]?.split('.')[0]
  }

  const saveWorkingHours = (payload: any) => {
    const formatTime = payload?.workingHours.map((time: any) => {
      console.log(formattedTime(time?.startTime))
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
      },
    }).then((res) => {
      dispatch(calendarActions.setWorkingHours(res?.data?.user?.dashboardUser?.addHoursMe?.result?.workingHours))
    });
  };

 //TODO delete ts-ignore
  const onGet = () => {
    getWorkingHours();
    return new Promise((resolve) => {
      // @ts-ignore
      resolveRef.current = resolve;
    });
  };

  const workingHours = data
    // @ts-ignore
    ? indexBy(prop('dayOfWeek'), data?.user?.dashboard?.me?.workingHours)
    : [];

  if (data) {
    // @ts-ignore
    resolveRef.current && resolveRef.current(workingHours);
    resolveRef.current = null;
  }

  return {
    workingHours,
    loadingSetWorkingHours,
    loadingGetWorkingHours,
    saveWorkingHours,
    getWorkingHours: onGet,
  };
}

export default useWorkingHours;
