import { useUpdate_AppointmentMutation } from '../../../../generated/graphql';
import { useDispatch } from 'react-redux';
import { actions as calendarActions } from 'services/calendar/index';
import { formatISO } from 'date-fns';

const useUpdateAppointment = (
  isEditMode: boolean,
  setIsEditMode: (isEditMode: boolean) => void
) => {
  const dispatch = useDispatch()
  const [updateAppointment, { data, loading, error}] = useUpdate_AppointmentMutation()

  const onUpdateAppointment = (values: any) => {
    console.log(values, 'values');
    updateAppointment({
      variables: {
        recordAppointment: {
          id_: values?.id_,
          eventType: values?.eventType,
          user: values?.user?.id_,
          note: values?.note,
          isOnline: values?.location === 'ONLINE'
        },
        recordReschedule: {
          id_: values?.id_,
          startDate: values?.date?.startTime ? values?.date?.startTime : values?.startDate,
          endDate: values?.date?.endTime ? values?.date?.endTime : values?.endDate
        }
      }
    }).then((res) => {
      if (res?.data?.schedule?.updateAppointment?.ok && res?.data?.schedule?.rescheduleAppointment?.ok) {
        const data = {
          ...res?.data?.schedule?.updateAppointment?.result,
          startDate: res?.data?.schedule?.rescheduleAppointment?.result?.startDate?.split('+')[0],
          endDate: res?.data?.schedule?.rescheduleAppointment?.result?.endDate?.split('+')[0]
        }

        dispatch(calendarActions.updateEvent({ data }))
      }
    })

    setIsEditMode(!isEditMode)
  }

  return {
    onUpdateAppointment,
    loadingUpdateAppointment: loading
  }
}

export default useUpdateAppointment