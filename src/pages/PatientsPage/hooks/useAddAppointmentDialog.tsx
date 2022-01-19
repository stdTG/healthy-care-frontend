import { useSelector } from 'react-redux';
import { selectors } from 'services/user';

import useDialog from 'lib/hooks/useDialog';
import useCreateRequest from '../../SchedulePage/hooks/useCreateRequest';

function useAddAppointmentDialog () {

  const user = useSelector(selectors.getUser);
  const userId = user?.id_;

  const { onCreateAppointment } = useCreateRequest();

  const appointmentDialog = useDialog();

  async function onOpenAppointmentDialog(patientId:string) {
    const result = await appointmentDialog.open({ userId, patient: patientId });

    if (!result || !result.data) return;
    
    onCreateAppointment(result.data);
  }

  return {
    appointmentDialog,
    onOpenAppointmentDialog
  }
}

interface IUseNewAppointmentProps {
}

export default useAddAppointmentDialog
