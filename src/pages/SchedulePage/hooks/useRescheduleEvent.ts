import {
  useReschedule_EventMutation
} from '../../../generated/graphql';
import { actions as calendarActions } from '../../../services/calendar';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const useRescheduleEvent = () => {
  const dispatch = useDispatch()

  const [rescheduleEvent, { loading }] = useReschedule_EventMutation()
  const [loadingRescheduleEvent, setLoadingRescheduleEvent] = useState({
    loadingReschedule: false,
    id: '',
  })

  const onRescheduleEvent = async (id: string, selectedTime: {startTime: Date, endTime: Date}) => {
    setLoadingRescheduleEvent({
      id,
      loadingReschedule: true
    })

    const rescheduleAppointmentResponse = await rescheduleEvent({
      variables: {
        id_: id,
        startDate: selectedTime?.startTime?.toISOString(),
        endDate: selectedTime?.endTime?.toISOString()
      }
    })

    if ( rescheduleAppointmentResponse?.data?.schedule?.rescheduleEvent?.ok) {
      const data = {
        ...rescheduleAppointmentResponse?.data?.schedule?.rescheduleEvent?.result,
        startDate: rescheduleAppointmentResponse?.data?.schedule?.rescheduleEvent?.result?.startDate?.split('+')[0],
        endDate: rescheduleAppointmentResponse?.data?.schedule?.rescheduleEvent?.result?.endDate?.split('+')[0]
      }

      dispatch(calendarActions.updateEvent({ data }))

      setLoadingRescheduleEvent({
        id,
        loadingReschedule: false
      })
    }
  }
  return {
    onRescheduleEvent,
    loadingRescheduleEvent,
  }
}

export default useRescheduleEvent