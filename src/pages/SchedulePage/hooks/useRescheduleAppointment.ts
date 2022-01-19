import { Appointment, useReschedule_AppointmentMutation } from '../../../generated/graphql';
import { actions as calendarActions } from '../../../services/calendar';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const useRescheduleAppointment = () => {
  const dispatch = useDispatch()

  const [rescheduleAppointment, { loading }] = useReschedule_AppointmentMutation()
  const [loadingRescheduleAppointment, setLoadingRescheduleAppointment] = useState({
    loadingReschedule: false,
    id: '',
  })

  const onRescheduleAppointment = async (id: string, selectedTime: {startTime: Date, endTime: Date}) => {
    setLoadingRescheduleAppointment({
      id,
      loadingReschedule: true
    })

    const rescheduleAppointmentResponse = await rescheduleAppointment({
      variables: {
        id_: id,
        startDate: selectedTime?.startTime?.toISOString(),
        endDate: selectedTime?.endTime?.toISOString()
      }
    })

    if ( rescheduleAppointmentResponse?.data?.schedule?.rescheduleAppointment?.ok) {
      const data = {
        ...rescheduleAppointmentResponse?.data?.schedule?.rescheduleAppointment?.result,
        startDate: rescheduleAppointmentResponse?.data?.schedule?.rescheduleAppointment?.result?.startDate?.split('+')[0],
        endDate: rescheduleAppointmentResponse?.data?.schedule?.rescheduleAppointment?.result?.endDate?.split('+')[0]
      }

      dispatch(calendarActions.updateEvent({ data }))

      setLoadingRescheduleAppointment({
        id,
        loadingReschedule: false
      })
    }
  }
  return {
    onRescheduleAppointment,
    loadingRescheduleAppointment,
  }
}

export default useRescheduleAppointment