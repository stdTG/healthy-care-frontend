import React, { FC, useEffect, useState } from 'react';
import { values } from 'ramda';

import { convertToTitleCase } from 'lib/utils';
import { Icon, Typography } from 'components/ui';
import { Dialog, DialogActions } from 'components';
import {
  SFormRow,
  SFormTitle,
  SSaveButton,
} from 'pages/SchedulePage/styled/workHoursDialog.js';
import WorkHoursPicker from '../../../components/ui/WorkingHoursPicker/index';
import getIsActiveDay from 'lib/utils/getIsActiveDay';
import SDayTitle from './styled/SDayTitle';
import STimePickerWrap from '../WorkingHoursPicker/styled/STimePickerWrap';
import DialogContent from '../../Dialogs/DialogContent/Index';
import { generateAvailabilitiesFormValue } from '../../../lib/utils/generateAvailabilitiesFormValue';
import { validationSchema } from './validation';
import { useTranslation } from 'react-i18next';

const WorkHoursDialog: FC<Props> = (props) => {
  const { initialData, close } = props;

  const [availabilitiesFormErrors, setAvailabilitiesFormErrors] = useState<any>();
  const { t } = useTranslation();

  const [availableHours, setAvailableHours] = useState(
    generateAvailabilitiesFormValue({
      dayOfWeek: '',
      startTime: null,
      endTime: null,
      startLunchTime: null,
      endLunchTime: null,
    })
  );

  useEffect(() => {
    setInitialTime(initialData?.workingHours);
  }, []);

  const validate = async () => {
    try {
      await validationSchema.validate(availableHours, { abortEarly: false });
      setAvailabilitiesFormErrors(undefined);
    } catch (errors) {
      setAvailabilitiesFormErrors(errors);
    }
  };

  useEffect(() => {
    validate();
  }, [availableHours]);

  const resolveError = (weekDay: string, timeType :string) => {
    return availabilitiesFormErrors?.inner?.find((error: any) => {
      return error.path === `${weekDay.toUpperCase()}.${timeType}`;
    })?.message;
  };

  const onSave = () => {
    const workingHours = values(availableHours).filter((item) =>
      getIsActiveDay(item)
    );

    close({ workingHours });
  };

  const updateTime = (item: WorkingHours, parameter: string) => (value: WorkingHours) => {
    setAvailableHours({
      ...availableHours,
      [item.dayOfWeek]: {
        ...availableHours[item.dayOfWeek],
        dayOfWeek: item.dayOfWeek,
        [parameter]: value,
      },
    });
  };

  const setInitialTime = (initialTimes: WorkingHours[]) => {
    initialTimes.forEach((item) => {
      setAvailableHours((availableHours) => {
        return {
          ...availableHours,
          [item.dayOfWeek]: item,
        };
      });
    });
  };

  return (
    // @ts-ignore
    <Dialog
      title={t('Set availabilities')}
      isFormDialog={true}
      maxWidth="md"
      onClose={close}
      {...props}
    >
      <>
        <DialogContent maxWidth="700px">
          <Typography color="initial" gutterBottom mb={3}>
            {t('Set your daily availabilities here as well as your lunch time. Appointments cannot be scheduled when you are not available.')}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {t('Leave a field blank for the default value, set in the account settings.')}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {t('Times must be multiple of 30 minutes. You can change this is the account settings.')}
          </Typography>
        </DialogContent>

        <DialogContent>
          <SFormRow>
            <SFormTitle>{t('Daily schedule')}</SFormTitle>
            <SFormTitle>{t('Lunch time')}</SFormTitle>
          </SFormRow>

          {Object.entries(availableHours).map(([weekDay, item], index) => (
            <SFormRow key={weekDay}>
              <SDayTitle isActive={true}>{convertToTitleCase(weekDay)}</SDayTitle>

              <STimePickerWrap padding="0 12px">
                <WorkHoursPicker
                  time={item.startTime}
                  error={resolveError(weekDay, 'startTime')}
                  onChange={updateTime(
                    { ...item, dayOfWeek: weekDay?.toUpperCase() },
                    'startTime'
                  )}
                  icon='sign-in'
                />
                <WorkHoursPicker
                  time={item?.endTime}
                  error={resolveError(weekDay, 'endTime')}
                  onChange={updateTime(
                    { ...item, dayOfWeek: weekDay?.toUpperCase() },
                    'endTime'
                  )}
                  icon='sign-out'
                />
              </STimePickerWrap>

              <STimePickerWrap padding="0 0 0 12px">
                <WorkHoursPicker
                  isLunchTime={true}
                  time={item?.startLunchTime}
                  error={resolveError(weekDay, 'startLunchTime')}
                  onChange={updateTime(
                    { ...item, dayOfWeek: weekDay?.toUpperCase() },
                    'startLunchTime'
                  )}
                  icon='utensils'
                />
                <WorkHoursPicker
                  isLunchTime={true}
                  time={item?.endLunchTime}
                  error={resolveError(weekDay, 'endLunchTime')}
                  onChange={updateTime(
                    { ...item, dayOfWeek: weekDay?.toUpperCase() },
                    'endLunchTime'
                  )}
                />
              </STimePickerWrap>
            </SFormRow>
          ))}
        </DialogContent>

        <DialogActions style={{ paddingRight: 24 }}>
          <SSaveButton
            onClick={onSave}
            type="submit"
            disabled={availabilitiesFormErrors}
          >
            <Icon icon="calendar-check" mr={10} />
            {t('Set availabilities')}
          </SSaveButton>
        </DialogActions>
      </>
    </Dialog>
  );
}

export default WorkHoursDialog;

interface Props {
  isOpen: boolean,
  close: Function,
  initialData: any
}

interface WorkingHours {
  dayOfWeek: string,
  startTime: string | Date | null | undefined,
  endTime: string | Date | null | undefined,
  startLunchTime: string | Date | null | undefined,
  endLunchTime: string | Date | null | undefined,
}
