import React, { useEffect, useState } from 'react';
import { FormApi } from 'final-form';
import useDialog from '../../../lib/hooks/useDialog';
import { Grid as MuiGrid, InputAdornment } from '@material-ui/core';
import FormAutocomplete from '../../../components/ui/FormAutocomplete';
import { isEmpty } from 'ramda';
import { DateField } from '../styled/appointmentDialog';
import { format } from "date-fns";
import Icon from '../../../components/ui/Icon';
import ChooseDateDialog from '../ChooseDateDialog';
import useLoadOrgUnitMembers from './hooks/useLoadOrgUnitMembers';
import FormInput from '../../../components/ui/FormInput';
import AutocompleteOptionUser from '../../../components/Autocomplete/AutocompleteOptionUser';
import getDateFormat from '../../../lib/utils/getDateFormat';
import { useTranslation } from 'react-i18next';

const EventForm = (props: Props) => {
  const { initialData, careTeamId, subOrgId, form } = props;

  const chooseDateDialog = useDialog();
  const { t } = useTranslation();

  const [patientsList, setPatientsList] = useState(
    initialData?.patientStatuses
  );

  const {
    orgUnitMembers,
    fetchData: fetchOrgUnitMembers,
  } = useLoadOrgUnitMembers(careTeamId, subOrgId);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>({});

  useEffect(() => {
    if (!initialData) return;

    setPatientsList(initialData.patients);
    setSelectedTimeSlot({
      startTime: getDateFormat(initialData.startDate),
      endTime: getDateFormat(initialData.endDate),
    });
  }, [initialData]);

  // if (!isOpen || !dataCalled || dataLoading) return null;

  const openChooseDateDialog = async (form: FormApi) => {
    const { selectedTime } = await chooseDateDialog.open({
      selectedTimeSlot,
      form,
    });
    if (!selectedTime) return;

    setSelectedTimeSlot(selectedTime);
  };

  return (
    <div>
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
            options={orgUnitMembers}
            renderOption={AutocompleteOptionUser}
            getOptionLabel={(option) =>
              isEmpty(option)
                ? ''
                : option.firstName + ' ' + option.lastName
            }
            getOptionValue={(option) => option?.id_}
            onScroll={() => fetchOrgUnitMembers()}
          />
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
              ),
            }}
          />
        </MuiGrid>
      </MuiGrid>
      {chooseDateDialog.isOpen && (
        <ChooseDateDialog
          isOpen={chooseDateDialog.isOpen}
          close={chooseDateDialog.close}
          initialData={chooseDateDialog.initialData}
        />
      )}
    </div>
  )
}

export default EventForm

interface Props {
  initialData: any
  form: FormApi,
  isEditMode: boolean
  careTeamId: string
  subOrgId: string
}
