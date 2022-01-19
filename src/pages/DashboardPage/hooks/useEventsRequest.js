import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { formatISO, set } from 'date-fns';

import { GET_EVENTS } from '../gqlSchemes/getEvents';
import { actions as calendarActions } from 'services/calendar';

function useEventsRequest(props) {
  const dispatch = useDispatch();

  const { called, loading, error, data } = useQuery(GET_EVENTS, {
    fetchPolicy: 'no-cache',
    variables: {
      filter: {
        startDate: formatISO(new Date(), {
          representation: 'date',
        }),
        endDate: formatISO(new Date(), {
          representation: 'date',
        }),
      },
    },
  });

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (data && data.schedule) {
      dispatch(
        calendarActions.setEvents({
          events: data.schedule.eventMany.items,
        })
      );
    }
  }, [data]);

  return { events: data, loading };
}

export default useEventsRequest;
