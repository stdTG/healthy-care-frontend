import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import { actions as calendarActions } from 'services/calendar';
import { GET_WORKING_HOURS } from '../../SchedulePage/gqlSchemes/getWorkingHours';

const useRefreshWorkingHours = () => {
  
  const dispatch = useDispatch();

  const { data } = useQuery(GET_WORKING_HOURS, { fetchPolicy: 'no-cache' });

  useEffect(() => {
    if (data?.user?.dashboard?.me?.workingHours) {
      dispatch(
        calendarActions.setWorkingHours(
          data?.user?.dashboard?.me?.workingHours
        )
      );
    }
  }, [data]);
}

export default useRefreshWorkingHours