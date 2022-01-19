import React, { useContext, useState } from 'react';
import { Dialog, DialogActions } from '../../../../components';
import getAppointmentsDetails from './getAppointmentsDetails';
import AppointmentForm from '../appointmentForm';
import { Form } from 'react-final-form';
import { SActionsWrap } from '../../styled/detailsDialog';
import Button from '../../../../components/Buttons/Button/index';
import useUpdateAppointment from '../hooks/useUpdateAppointment';
import DeleteButton from '../../../../components/Buttons/DeleteButton/index';
import { ConfirmDeleteDialogContext } from '../../../../routing/index';
import useDeleteAppointment from '../hooks/useDeleteAppointment';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

const AppointmentDetailsDialog = (props) => {
  const { initialData, appointmentDetailsDialog, close } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [isEditMode, setIsEditMode] = useState(false);

  const { open: openConfirmDeleteDialog } = useContext(
    ConfirmDeleteDialogContext
  );

  const {
    onUpdateAppointment,
    loadingUpdateAppointment,
  } = useUpdateAppointment(isEditMode, setIsEditMode);

  const {
    onDeleteAppointment,
    loadingDeleteAppointment,
  } = useDeleteAppointment(close, enqueueSnackbar);

  if (
    !appointmentDetailsDialog?.initialData?.patient &&
    !appointmentDetailsDialog?.initialData?.patientStatuses
  )
    return null;

  const dialogDetails = getAppointmentsDetails({ ...props, t });

  return (
    <>
      <Dialog
        title={isEditMode ? t('Edit appointment') : dialogDetails.title}
        isFormDialog={true}
        titleButton={
          isEditMode && (
            <div>
              <DeleteButton
                loading={loadingDeleteAppointment}
                onClick={() => {
                  openConfirmDeleteDialog?.({
                    dialogTitle: t('Delete appointment'),
                    dialogWarningMessage: t('Do you want delete appointment?'),
                  }).then(
                    ({ isDeleted }) =>
                      isDeleted && onDeleteAppointment(initialData?.id_)
                  );
                }}
              />
            </div>
          )
        }
        onClose={close}
        {...props}
      >
        <Form
          onSubmit={(values) =>
            !isEditMode ? setIsEditMode(true) : onUpdateAppointment(values)
          }
          initialValues={{
            ...initialData,
            location: !initialData?.isOnline ? 'MEDICAL_CLINIC' : 'ONLINE',
          }}
        >
          {({ values, form, handleSubmit }) => {
            return (
              <>
                {!isEditMode ? (
                  <div>{dialogDetails.content}</div>
                ) : (
                  <div style={{ padding: '24px' }}>
                    <AppointmentForm
                      initialData={initialData}
                      form={form}
                      isEditMode={isEditMode}
                    />
                  </div>
                )}
                <DialogActions>
                  <SActionsWrap>
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      title={
                        isEditMode ? t('Save changes') : t('Edit appointment')
                      }
                      icon="pen"
                      loading={loadingUpdateAppointment}
                    />
                  </SActionsWrap>
                </DialogActions>
              </>
            );
          }}
        </Form>
      </Dialog>
    </>
  );
};

export default AppointmentDetailsDialog;
