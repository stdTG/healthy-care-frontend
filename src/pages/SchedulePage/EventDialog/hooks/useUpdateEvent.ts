import { useDispatch } from 'react-redux';
import { DashboardUser, useUpdate_EventMutation } from '../../../../generated/graphql';
import { formatISO } from "date-fns";
import { actions as calendarActions } from '../../../../services/calendar';

const useUpdateEvent = (
  isEditMode: boolean,
  setIsEditMode: (isEditMode: boolean) => void
) => {
  const dispatch = useDispatch()
  const [ updateEvent, { loading } ] = useUpdate_EventMutation()

  const onUpdateEvent = (values: any) => {
    updateEvent({
      variables: {
        recordEvent: {
          id_: values?.id_,
          title: values?.title,
          //ToDo refactor
          users: typeof values?.users[0] === 'string' ? values?.users : values?.users?.map((user: DashboardUser) => user?.id_),
          isOnline: values?.location === 'ONLINE'
        },
        recordReschedule: {
          id_: values?.id_,
          startDate: values?.date?.startTime ? values?.date?.startTime : values?.startDate,
          endDate: values?.date?.endTime ? values?.date?.endTime : values?.endDate
        }
      }
    }).then((res) => {
      if (res?.data?.schedule?.updateEvent?.ok && res?.data?.schedule?.rescheduleEvent?.ok) {
        const data = {
          ...res?.data?.schedule?.updateEvent?.result,
          startDate: res?.data?.schedule?.rescheduleEvent?.result?.startDate?.split('+')[0],
          endDate: res?.data?.schedule?.rescheduleEvent?.result?.endDate?.split('+')[0]
        }

        dispatch(calendarActions.updateEvent({ data }))
      }
    })

    setIsEditMode(!isEditMode)
  }

  return {
    onUpdateEvent,
    loadingUpdateEvent: loading,
  }
}

export default useUpdateEvent