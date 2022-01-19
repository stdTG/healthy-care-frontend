import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid as MuiGrid, InputAdornment, Typography } from '@material-ui/core';
import FormAutocomplete from '../../../components/ui/FormAutocomplete';
import { isEmpty, values } from 'ramda';
import AutocompleteOptionUser from '../../../components/Autocomplete/AutocompleteOptionUser';
import { DateField, SimpleAC } from '../styled/appointmentDialog';
import { format } from 'date-fns';
import { useDebounce } from 'use-debounce';
import useLoadPatients from './hooks/useLoadPatients';
import { getDateFormat } from 'lib/utils';
import useDialog from '../../../lib/hooks/useDialog';
import { FormApi } from 'final-form';
import { locationTypesData, meetingTypesData } from '../../../lib/enums/meetingTypes';
import Icon from '../../../components/ui/Icon';
import FormInput from '../../../components/ui/FormInput';
import ChooseDateDialog from '../ChooseDateDialog';
import { usePreselectedPatient } from './hooks/usePreselectedPatient'
import { FormFieldsContainer } from './styled/layout';
import { useTranslation } from 'react-i18next';

const AppointmentForm = (props: Props) => {
  const {
    initialData,
    form,
    isEditMode
  } = props;

  const chooseDateDialog = useDialog();
  const { t } = useTranslation();

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    initialData?.startDate
      ? {
        startTime: getDateFormat(initialData.startDate),
        endTime: getDateFormat(initialData.endDate)
      }
      : {}
  );

  useEffect(() => {
    initialData?.startDate &&
    setSelectedTimeSlot({
      startTime: getDateFormat(initialData.startDate),
      endTime: getDateFormat(initialData.endDate)
    });
  }, [initialData]);

  const [searchPatients, setSearchPatients] = useState('');
  const [searchPatientsWithDelay] = useDebounce(searchPatients, 200);

  const { patients, fetchData, patientsLoading } = useLoadPatients(
    searchPatientsWithDelay
  );

  const preselectedPatient = usePreselectedPatient({patients, patientId: initialData?.patient, form})

  const openChooseDateDialog = async (form: FormApi) => {
    const { selectedTime } = await chooseDateDialog.open({
      selectedTimeSlot,
      form
    });

    if (!selectedTime) return;

    setSelectedTimeSlot(selectedTime);
  };

  // const onSave = (values: any) => {
  //   //@ts-ignore
  //   close({
  //     data: {
  //       ...values,
  //       user: initialData?.userId,
  //       startDate: selectedTimeSlot.startTime,
  //       endDate: selectedTimeSlot.endTime
  //     }
  //   });
  //   setSelectedTimeSlot({});
  // };

  // const onDeleteEvent = () => {
  //   close();
  //   props.deleteDialog({ isEvent: false });
  // };

  // const dialogSettings = isEditMode
  //   ? getEditSettings({ ...props, deleteDialog: onDeleteEvent })
  //   : getAddSettings();

  return (
    <div>
      <FormFieldsContainer>
        {
          patientsLoading
            ? <div className='preloader'>
                <CircularProgress />
              </div>
            : <>
              <MuiGrid item>
                {
                  preselectedPatient
                    ? <Typography>{preselectedPatient}</Typography>
                    : <FormAutocomplete
                      name="patient"
                      disabled={isEditMode}
                      loading={patientsLoading}
                      placeholder={t('Select patients')}
                      options={patients}
                      autoSelect={true}
                      getOptionLabel={(option) =>
                        isEmpty(option)
                          ? ''
                          : option.firstName + ' ' + option.lastName
                      }
                      renderOption={AutocompleteOptionUser}
                      getOptionValue={(option) => option?.id_}
                      onScroll={() => fetchData()}
                    />
                }
              </MuiGrid>

              <MuiGrid item>
                <DateField
                  rows={2}
                  fullWidth
                  name="date"
                  multiline={!!selectedTimeSlot.startTime}
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
                    )
                  }}
                />
              </MuiGrid>
              <MuiGrid item>
                <FormAutocomplete
                  name="eventType"
                  options={values(meetingTypesData)}
                  placeholder={`${t('Choose event type')}...`}
                  getOptionLabel={(option) => option?.label}
                  getOptionValue={(option) => option?.value}
                />
              </MuiGrid>
              <MuiGrid item>
                <FormAutocomplete
                  name="location"
                  options={values(locationTypesData)}
                  placeholder={`${t('Choose meeting type')}...`}
                  getOptionLabel={(option) => option?.label}
                  getOptionValue={(option) => option?.value}
                />
              </MuiGrid>

              <MuiGrid item>
                <FormInput
                  name="note"
                  placeholder={t('Add a note')}
                  multiline
                  rowsMax={6}
                  fullWidth={true}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon="sticky-note" />
                      </InputAdornment>
                    )
                  }}
                />
              </MuiGrid>
            </>
        }
      </FormFieldsContainer>
      {chooseDateDialog?.isOpen && (
        <ChooseDateDialog
          isOpen={chooseDateDialog.isOpen}
          close={chooseDateDialog.close}
          initialData={chooseDateDialog.initialData}
        />
      )}
    </div>
  );
};

export default AppointmentForm;

interface Props {
  initialData: any
  form: FormApi,
  isEditMode: boolean
}
