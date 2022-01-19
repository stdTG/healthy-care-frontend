import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
import { useDispatch } from 'react-redux';
import { useDelete_EventMutation } from '../../../../generated/graphql';
import { actions as calendarActions } from '../../../../services/calendar';

const useDeleteEvent = (
  close: Function,
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey,
) => {
  const dispatch = useDispatch()
  const [ deleteEvent, { loading } ] = useDelete_EventMutation()

  const onDeleteEvent = (id: string) => {
    deleteEvent({
      variables: {
        id
      }
    }).then((res) => {
      if (res?.data?.schedule?.cancelEvent?.ok) {
        dispatch(calendarActions.cancelEvent({
          id: res?.data?.schedule?.cancelEvent?.resultId,
          users: res?.data?.schedule?.cancelEvent?.result?.users,
          isEvent: true
        }))

        enqueueSnackbar('Event canceled', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })

      } else {
        enqueueSnackbar('An unexpected error occurred', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
      }
      close()
    });
  }
  return {
    onDeleteEvent,
    loadingDeleteEvent: loading,
  }
}

export default useDeleteEvent