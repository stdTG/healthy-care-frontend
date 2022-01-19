import { useGet_EventsLazyQuery } from '../../../generated/graphql';
import { formatISO, set, format, add } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as calendarActions } from 'services/calendar';

const currentDate = new Date()
const currentMonth = +format(currentDate, 'M')

const useLoadEvents = (userId: string) => {
  const dispatch = useDispatch()

  const [dateInterval, setDateInterval] = useState({
    startDate: formatISO(set(add(currentDate, { months: -1 }), {  date: 25 }), {
      representation: 'date',
    }),
    endDate: formatISO(set(currentDate, { month: currentMonth + 1, date: 10 }), {
      representation: 'date',
    }),
  })

  const [callCount, setCallCount] = useState(0)

  const filter = {
    ...dateInterval,
    user: userId
  }

  const [ getEvents, { data, loading } ] = useGet_EventsLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: () => setCallCount(callCount + 1),
    variables: {
      filter: userId ? filter : dateInterval,
    },
  })

  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    if (data && data.schedule) {
      dispatch(
        calendarActions.setEvents({
          events: data?.schedule?.eventMany?.items,
        })
      );
    }
  }, [data]);

  return {
    loadingGetEvents: loading,
    setDateInterval,
    callCount
  }
}

export default useLoadEvents