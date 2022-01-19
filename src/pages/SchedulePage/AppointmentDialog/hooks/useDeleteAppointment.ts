import { useDelete_AppointmentMutation } from '../../../../generated/graphql';
import { useDispatch } from 'react-redux';
import {actions as calendarActions} from '../../../../services/calendar/index'
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

const useDeleteAppointment = (
  close: Function,
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey,
) => {
  const dispatch = useDispatch()
  const [ deleteAppointment, { loading } ] = useDelete_AppointmentMutation();

  const onDeleteAppointment = (id: string) => {
    deleteAppointment({
      variables: {
        id_: id
      }
    }).then((res) => {
      if (res?.data?.schedule?.cancelAppointment?.ok) {
        dispatch(calendarActions.cancelEvent({
          id: res?.data?.schedule?.cancelAppointment?.resultId,
          isEvent: false
        }))

        enqueueSnackbar('Appointment canceled', {
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

  };

  return {
    onDeleteAppointment,
    loadingDeleteAppointment: loading
  };
};

export default useDeleteAppointment;