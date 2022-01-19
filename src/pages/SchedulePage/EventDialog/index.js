import React, { useState, useEffect } from 'react';
import { isEmpty } from 'ramda';
import { format } from 'date-fns';
import { Grid as MuiGrid, InputAdornment } from '@material-ui/core';

import ChooseDateDialog from 'pages/SchedulePage/ChooseDateDialog';
import { DateField } from '../styled/appointmentDialog';
import { Icon, FormInput } from 'components/ui';
import getEditSettings from './getEditSettings';
import getAddSettings from './getAddSettings';
import useDialog from 'lib/hooks/useDialog';
import { getDateFormat } from 'lib/utils';
import useRequest from './hooks/useRequest';
import { AutocompleteOptionUser, FormDialog } from 'components';
import { makeValidate } from 'mui-rff';
import { schema } from '../validation/eventValidation';
import FormAutocomplete from '../../../components/ui/FormAutocomplete/index';
import useLoadOrgUnitMembers from './hooks/useLoadOrgUnitMembers';
import { useTranslation } from 'react-i18next';

const validate = makeValidate(schema);

const EventDialog = (props) => {
  const {
    close,
    initialData,
    isOpen,
    careTeamId,
    subOrgId,
    orgUnitMembers,
  } = props;

  // const {
  //   orgUnitMembers,
  //   fetchData: fetchOrgUnitMembers,
  // } = useLoadOrgUnitMembers(careTeamId, subOrgId);

  const [patientsList, setPatientsList] = useState(
    initialData?.patientStatuses
  );

  const [selectedTimeSlot, setSelectedTimeSlot] = useState({});
  const { patientsArr, dataLoading, dataCalled } = useRequest();

  const chooseDateDialog = useDialog();
  const { t } = useTranslation();

  useEffect(() => {
    if (!initialData) return;

    setPatientsList(initialData.patients);
    setSelectedTimeSlot({
      startTime: initialData.startDate,
      endTime: initialData.endDate,
    });
  }, [initialData]);

  if (!isOpen || !dataCalled || dataLoading) return null;

  const openChooseDateDialog = async (form) => {
    const { selectedTime } = await chooseDateDialog.open({
      selectedTimeSlot,
      form,
    });
    if (!selectedTime) return;

    setSelectedTimeSlot(selectedTime);
  };

  const onSave = (values) => {
    close({
      data: {
        title: values.title,
        users: values.users,
        startDate: selectedTimeSlot.startTime,
        endDate: selectedTimeSlot.endTime,
      },
    });
    setSelectedTimeSlot({});
  };

  const onDeleteEvent = () => {
    close();
    props.deleteDialog({ isEvent: true, id: initialData.id_ });
  };

  const dialogSettings = initialData.isEditMode
    ? getEditSettings({ ...props, deleteDialog: onDeleteEvent })
    : getAddSettings(t);

  return (
    <>
      <FormDialog
        validate={validate}
        {...dialogSettings}
        onSubmit={onSave}
        // initialValues={initialData}
        onClose={close}
        {...props}
      >
        {(formValues, { form }) => {
          return (
            <MuiGrid container spacing={2} direction="column">
              <MuiGrid item>
                <FormInput
                  fullWidth
                  name="title"
                  placeholder={`${t('Event name')}...`}
                  variant="outlined"
                />
              </MuiGrid>
              <MuiGrid item>
                <FormAutocomplete
                  multiple
                  name="users"
                  placeholder={`${t('Select members')}...`}
                  options={orgUnitMembers || []}
                  renderOption={AutocompleteOptionUser}
                  getOptionLabel={(option) =>
                    isEmpty(option)
                      ? ''
                      : option.firstName + ' ' + option.lastName
                  }
                  getOptionValue={(option) => option?.id_}
                  // onScroll={() => fetchOrgUnitMembers()}
                />
              </MuiGrid>

              <MuiGrid item>
                <DateField
                  rows={2}
                  fullWidth
                  name="date"
                  multiline={!!getDateFormat(selectedTimeSlot.startTime)}
                  selectedTimeSlot={
                    selectedTimeSlot.startTime &&
                    format(
                      getDateFormat(selectedTimeSlot.startTime),
                      'EEE. d MMM. yyyy '
                    ) +
                      '\n' +
                      format(
                        getDateFormat(selectedTimeSlot.startTime),
                        'h:mm a'
                      ) +
                      ' - ' +
                      format(getDateFormat(selectedTimeSlot.endTime), 'h:mm a')
                  }
                  onClick={() => openChooseDateDialog(form)}
                  placeholder={`${t('Choose date')}...`}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon="calendar" />
                      </InputAdornment>
                    ),
                  }}
                />
              </MuiGrid>
            </MuiGrid>
          );
        }}
      </FormDialog>
      {chooseDateDialog.isOpen && (
        <ChooseDateDialog
          isOpen={chooseDateDialog.isOpen}
          close={chooseDateDialog.close}
          initialData={chooseDateDialog.initialData}
        />
      )}
    </>
  );
};

export default EventDialog;
