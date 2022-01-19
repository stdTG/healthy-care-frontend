import React, { useContext, useState } from 'react';
import { Dialog, DialogActions } from '../../../../components';
import { Form } from 'react-final-form';
import { SActionsWrap } from '../../styled/detailsDialog';
import Button from '../../../../components/Buttons/Button';
import { useSnackbar } from 'notistack';
import { ConfirmDeleteDialogContext } from '../../../../routing/index';
import getEventDetails from './getEventDetails';
import DeleteButton from '../../../../components/Buttons/DeleteButton/index';
import useDeleteEvent from '../hooks/useDeleteEvent';
import useUpdateEvent from '../hooks/useUpdateEvent';
import EventForm from '../eventForm';
import { useTranslation } from 'react-i18next';

const EventDetailsDialog = (props) => {
  const {
    initialData,
    eventDetailsDialog,
    close,
    careTeamId,
    subOrgId,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [isEditMode, setIsEditMode] = useState(false);
  const { t } = useTranslation();

  const { open: openConfirmDeleteDialog } = useContext(
    ConfirmDeleteDialogContext
  );
  const { onDeleteEvent, loadingDeleteEvent } = useDeleteEvent(
    close,
    enqueueSnackbar
  );
  const { onUpdateEvent, loadingUpdateEvent } = useUpdateEvent(
    isEditMode,
    setIsEditMode
  );

  const dialogDetails = getEventDetails({ initialData, ...props });

  return (
    <>
      <Dialog
        title={isEditMode ? t('Edit event') : dialogDetails.title}
        isFormDialog={true}
        onClose={close}
        titleButton={
          isEditMode && (
            <div>
              <DeleteButton
                loading={loadingDeleteEvent}
                onClick={() => {
                  openConfirmDeleteDialog?.({
                    dialogTitle: t('Delete event'),
                    dialogWarningMessage: t('Do you want to delete event'),
                  }).then(
                    ({ isDeleted }) =>
                      isDeleted && onDeleteEvent(initialData?.id_)
                  );
                }}
              />
            </div>
          )
        }
        {...props}
      >
        <Form
          onSubmit={(values) =>
            !isEditMode ? setIsEditMode(true) : onUpdateEvent(values)
          }
          initialValues={initialData}
        >
          {({ values, form, handleSubmit }) => {
            return (
              <>
                {!isEditMode ? (
                  <div>{dialogDetails.content}</div>
                ) : (
                  <div style={{ padding: '24px' }}>
                    <EventForm
                      initialData={initialData}
                      form={form}
                      isEditMode={isEditMode}
                      careTeamId={careTeamId}
                      subOrgId={subOrgId}
                    />
                  </div>
                )}
                <DialogActions>
                  <SActionsWrap>
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      title={isEditMode ? t('Save changes') : t('Edit event')}
                      icon="pen"
                      loading={loadingUpdateEvent}
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

export default EventDetailsDialog;
