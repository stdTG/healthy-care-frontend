import React from 'react';
import PropTypes from 'prop-types';
import { makeValidate } from 'mui-rff';

import { FormDialog } from 'components';
import getAddSettings from './getAddSettings';
import getEditSettings from './getEditSettings';
import { schema } from '../validation/appoitmentAddDialog';
import AppointmentForm from './appointmentForm';

const validate = makeValidate(schema);

export function AppointmentDialog(props) {
  const { close, isEditMode, isOpen, initialData } = props;

  const onSave = (values) => {
    close({
      data: {
        ...values,
        user: initialData?.userId,
        startDate: values?.date?.startTime,
        endDate: values?.date?.endTime,
      },
    });
    // setSelectedTimeSlot({});
  };

  const onDeleteEvent = () => {
    close();
    props.deleteDialog({ isEvent: false });
  };

  const dialogSettings = isEditMode
    ? getEditSettings({ ...props, deleteDialog: onDeleteEvent })
    : getAddSettings();

  return (
    <>
      <FormDialog
        onSubmit={onSave}
        validate={validate}
        onClose={close}
        contentStyle={{ overflowY: 'visible' }}
        {...dialogSettings}
        {...props}
      >
        {(formValues, { form }) => {
          return (
            <AppointmentForm
              initialData={initialData}
              form={form}
              isEditMode={false}
            />
          );
        }}
      </FormDialog>
    </>
  );
}

AppointmentDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  open: PropTypes.func,
};

export default AppointmentDialog;
