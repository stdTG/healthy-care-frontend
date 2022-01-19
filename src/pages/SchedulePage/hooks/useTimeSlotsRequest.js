import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_TIME_SLOTS } from 'pages/SchedulePage/gqlSchemes/getTimeSlots';
import { formatISO, parseISO, set } from 'date-fns';
import { forEach } from 'ramda';

function useTimeSlotsRequest(selectedDate) {
  const [
    getTimeSlots,
    { called, loading, error, data: timeSlots },
  ] = useLazyQuery(GET_TIME_SLOTS);

  useEffect(() => {
    getTimeSlots({
      variables: {
        filter: {
          date: selectedDate
            ? formatISO(selectedDate, { representation: 'date' })
            : formatISO(new Date(), { representation: 'date' }),
        },
      },
    });
  }, [selectedDate]);

  if (error) {
    console.log('Get time slots error:', error);
  }

  const morning = [];
  const afternoon = [];
  const evening = [];

  timeSlots &&
    forEach((item) => {
      const startTime = parseISO(item.startTime);
      const endTime = parseISO(item.endTime);

      if (startTime < set(startTime, { hours: 12, minutes: 0 })) {
        morning.push({ startTime, endTime });
        return;
      }
      if (startTime < set(startTime, { hours: 16, minutes: 0 })) {
        afternoon.push({ startTime, endTime });
        return;
      }

      evening.push({ startTime, endTime });
    }, timeSlots.schedule.timeslotMany.items);

  return { loading, timeSlots, morning, afternoon, evening };
}

export default useTimeSlotsRequest;
