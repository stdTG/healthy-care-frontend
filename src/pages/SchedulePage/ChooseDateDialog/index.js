import React, { useState } from 'react';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import {
  Box as MuiBox,
  Button as MuiButton,
  CircularProgress,
} from '@material-ui/core';

import '../styled/chooseDateDialog.css';
import colors from 'lib/colors';
import TimeSlot from './TimeSlot';
import DialogTitle from './DialogTitle';
import { Icon, Typography } from 'components/ui';
import useTimeSlotsRequest from '../hooks/useTimeSlotsRequest';
import { Dialog, DialogActions } from 'components';
import { SSelectedDate, SCalendarWrap } from '../styled/chooseDateDialog';
import DialogContent from '../../../components/Dialogs/DialogContent/Index';
import SSpinerWrap from '../../../components/styled/SSpinerWrap';
import { parseISO } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '@material-ui/lab';
import { Input } from 'components/ui';

const currentDate = new Date();

const maxCalendarDate = new Date();

maxCalendarDate.setFullYear(currentDate.getFullYear() + 1);
maxCalendarDate.setMonth(11);

function SelectDuration({ value, onChange }) {
  const options = [
    {
      label: '15 mins',
      value: 15,
    },
    {
      label: '30 mins',
      value: 30,
    },
    {
      label: '1 hour',
      value: 60,
    },
    {
      label: '2 hours',
      value: 120,
    },
  ];

  return (
    <MuiBox minWidth={310}>
      <Autocomplete
        label=""
        variant="outlined"
        options={options}
        getOptionLabel={(value) => {
          const option = options.find(
            (item) => item.value === value?.value || item.value === value
          );
          console.log('getOptionLabel', value, option);
          return option ? 'Appointment duration: ' + option.label : '';
        }}
        value={value}
        onChange={(e, value) => {
          console.log('onChange', value);
          onChange(value?.value);
        }}
        renderOption={(option) => option.label}
        renderInput={(params) => (
          <Input
            {...params}
            placeholder="Select duration..."
            variant="outlined"
          />
        )}
      />
    </MuiBox>
  );
}

const ChooseDateDialog = (props) => {
  const { close, initialData } = props;
  const { t } = useTranslation();
  const [duration, setDuration] = useState(30);

  const isRescheduleMode = initialData?.isRescheduleMode;

  const [selectedDate, setSelectedDate] = useState(
    isRescheduleMode
      ? parseISO(initialData?.selectedDate?.startDate)
      : currentDate
  );
  const [selectedTime, setSelectedTime] = useState(
    initialData?.selectedTimeSlot || null
  );
  const { morning, afternoon, evening, loading } = useTimeSlotsRequest(
    selectedDate
  );

  const onSave = () => {
    close({
      selectedTime,
    });

    initialData?.form?.change('date', selectedTime);
  };

  const actions = (
    <>
      <div
        style={{
          marginRight: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isRescheduleMode ? (
          <Typography variant="h5" color="success">
            {initialData?.selectedDate?.startDate
              ? format(
                  parseISO(initialData?.selectedDate?.startDate),
                  'd MMMM yyyy'
                )
              : format(selectedDate, 'd MMMM yyyy')}
          </Typography>
        ) : (
          <Typography variant="h5" color="success">
            {format(
              selectedTime?.startTime ? selectedTime?.startTime : selectedDate,
              'd MMMM yyyy'
            )}
          </Typography>
        )}
        <Typography variant="h6" color="primary">
          {selectedTime?.startTime
            ? format(selectedTime?.startTime, 'h:mm a') +
              format(selectedTime?.endTime, '- h:mm a')
            : 'From __:__ to __:__'}
        </Typography>
      </div>

      <MuiButton
        type="submit"
        color="primary"
        variant="contained"
        onClick={onSave}
        disabled={!selectedTime?.startTime}
      >
        <Icon icon="calendar-check" mr={10} />
        {selectedTime?.startTime ? t('Choose this time') : t('Choose time')}
      </MuiButton>
    </>
  );

  return (
    <>
      <Dialog
        title={isRescheduleMode ? t('Reschedule date') : t('Choose date')}
        maxWidth="auto"
        onClose={close}
        {...props}
        titleButton={<SelectDuration value={duration} onChange={setDuration} />}
      >
        <MuiBox display="grid" height="80vh">
          <SCalendarWrap>
            <Calendar
              locale="en-En"
              maxDetail="year"
              minDetail="year"
              defaultView="year"
              prev2Label={null}
              next2Label={null}
              value={selectedDate}
              maxDate={maxCalendarDate}
              formatMonth={(locale, date) => format(date, 'MMM')}
              onChange={setSelectedDate}
              minDate={currentDate}
            />
            <Calendar
              locale="en-En"
              minDate={currentDate}
              value={selectedDate}
              showNavigation={false}
              onChange={setSelectedDate}
              activeStartDate={selectedDate}
            />
          </SCalendarWrap>

          <SSelectedDate>
            <Typography>{t('Availabilities for')}</Typography>

            <Typography variant="h5">
              {format(selectedDate, 'EEEE dd, MMMM yyyy ')}
            </Typography>
          </SSelectedDate>

          {loading ? (
            <SSpinerWrap>
              <CircularProgress size={30} />
            </SSpinerWrap>
          ) : (
            <MuiBox display="flex" flexDirection="column">
              <TimeSlot
                icon="coffee"
                title={t('Morning')}
                timeSlots={morning}
                onSelect={setSelectedTime}
                selectedTime={selectedTime}
              />

              <TimeSlot
                icon="sun"
                title={t('Afternoon')}
                timeSlots={afternoon}
                onSelect={setSelectedTime}
                selectedTime={selectedTime}
              />

              <TimeSlot
                icon="moon"
                title={t('Evening')}
                timeSlots={evening}
                onSelect={setSelectedTime}
                selectedTime={selectedTime}
              />
            </MuiBox>
          )}
          <DialogActions>{actions}</DialogActions>
        </MuiBox>
      </Dialog>
    </>
  );
};

export default ChooseDateDialog;
