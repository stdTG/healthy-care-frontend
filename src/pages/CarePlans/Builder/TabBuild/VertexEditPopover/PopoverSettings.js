import React, { useState } from 'react';
import { values, map } from 'ramda';
import { Form } from 'react-final-form';
import { Checkboxes as RffCheckboxes } from 'mui-rff';
import { Box as MuiBox, Popover as MuiPopover } from '@material-ui/core';

import { Typography, Space } from 'components/ui';
import { weekDaysEnum } from 'lib/enums/weekDays';
import {
  WeekDays,
  WeekDay,
  Checkbox,
  STimePicker,
} from '../styled/PopoverSettings';
import { useTranslation } from 'react-i18next';

function PopoverSettings(props) {
  const { id, close, isOpen, initialData } = props;
  const [weekDays, setWeekDays] = useState(
    map((item) => ({ checked: false, ...item }), weekDaysEnum)
  );
  const { t } = useTranslation();

  const triggers = [
    { label: 'Birthday', formName: 'birthday' },
    { label: 'PDF', formName: 'pdf' },
    { label: 'JPEG', formName: 'jpeg' },
  ];

  const dayTimes = [
    { label: 'Morning', formName: 'morning' },
    { label: 'Midday', formName: 'midday' },
    { label: 'Afternoon', formName: 'afternoon' },
    { label: 'Evening', formName: 'evening' },
  ];

  const onSubmit = (values) => {};
  return (
    <MuiPopover
      anchorEl={initialData.anchorEl.current}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
      id={id}
      open={isOpen}
      onClose={close}
    >
      <Form
        onSubmit={onSubmit}
        initialValues={initialData}
        render={({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <MuiBox m={2}>
                <Typography variant="h5" mb={4}>
                  {t('Set question periodicity')}
                </Typography>
                <MuiBox mb={3}>
                  <Space display="flex" justifyContent="space-between">
                    <Typography
                      variant="h6"
                      mb={4}
                      style={{ marginRight: '40px' }}
                    >
                      {t('Day of the week')}
                    </Typography>
                    <Space display="flex" justifyContent="space-between">
                      <Typography variant="h6">
                        {t('One time onboarding')}
                      </Typography>
                      <RffCheckboxes
                        name="oneTime"
                        size="small"
                        data={[
                          {
                            value: true,
                          },
                        ]}
                        style={{ marginTop: '-8px' }}
                      />
                    </Space>
                  </Space>

                  <WeekDays>
                    {map(
                      (item) => (
                        <div>
                          <WeekDay>{item.shortName}</WeekDay>
                          <WeekDay>
                            <Checkbox
                              checked={item.checked}
                              onChange={(value) =>
                                setWeekDays({
                                  ...weekDays,
                                  [item.key]: {
                                    ...item,
                                    checked: !item.checked,
                                  },
                                })
                              }
                              size="small"
                            />
                          </WeekDay>
                        </div>
                      ),
                      values(weekDays)
                    )}
                  </WeekDays>
                </MuiBox>

                <MuiBox mb={2}>
                  <Typography variant="h5">{t('Time of the day')}</Typography>
                  {dayTimes.map((item) => (
                    <Space display="flex" justifyContent="space-between">
                      <RffCheckboxes
                        name={item.formName}
                        size="small"
                        data={[
                          {
                            value: true,
                            label: item.label,
                          },
                        ]}
                      />
                      <STimePicker
                        // name={`${item.formName}_time`}
                        // defaultValue={time && parseISO('2020-11-30T' + time)}
                        // value={time && parseISO('2020-11-30T' + time)}
                        onChange={() => {}}
                        onSelect={() => {}}
                      />
                    </Space>
                  ))}
                </MuiBox>

                <MuiBox mb={2}>
                  <Typography variant="h5" mb={2}>
                    {t('Duration')}
                  </Typography>
                  <Space display="flex" justifyContent="space-between">
                    <Typography variant="h6">{t('Days')}</Typography>
                    <STimePicker
                      // defaultValue={time && parseISO('2020-11-30T' + time)}
                      // value={time && parseISO('2020-11-30T' + time)}
                      onChange={() => {}}
                      onSelect={() => {}}
                    />
                    <Typography variant="h6">{t('Weeks')}</Typography>
                    <STimePicker
                      // defaultValue={time && parseISO('2020-11-30T' + time)}
                      // value={time && parseISO('2020-11-30T' + time)}
                      onChange={() => {}}
                      onSelect={() => {}}
                    />
                  </Space>
                </MuiBox>

                <Typography variant="h5">{t('Triggers')}</Typography>
                <Space>
                  {triggers.map((item) => (
                    <RffCheckboxes
                      name={item.formName}
                      size="small"
                      data={[
                        {
                          value: true,
                          label: item.label,
                        },
                      ]}
                    />
                  ))}
                </Space>
              </MuiBox>
            </form>
          );
        }}
      />
    </MuiPopover>
  );
}

export default PopoverSettings;
