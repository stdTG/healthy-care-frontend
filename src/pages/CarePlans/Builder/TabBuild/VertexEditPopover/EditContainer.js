import React, { useRef, useState } from 'react';
import { Form } from 'react-final-form';
import { Box as MuiBox, IconButton as MuiIconButton } from '@material-ui/core';

import { Icon, Space, Typography } from 'components/ui';
import { Checkboxes as RffCheckboxes } from 'mui-rff';
import {
  Checkbox,
  STimePicker,
  WeekDay,
  WeekDays,
} from 'pages/CarePlans/Builder/TabBuild/styled/PopoverSettings';
import { map, values } from 'ramda';
import { weekDaysEnum } from 'lib/enums/weekDays';
import { useTranslation } from 'react-i18next';

function EditContainer(props) {
  const { onSave, initialValues, settingsPopover } = props;

  return <ContainerSettings {...props} />;
}

function ContainerSettings(props) {
  const { onSave, initialValues, settingsPopover } = props;
  const { t } = useTranslation();

  const [weekDays, setWeekDays] = useState(
    map((item) => ({ checked: false, ...item }), weekDaysEnum)
  );

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

  return (
    <Form
      onSubmit={onSave}
      initialValues={initialValues}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <MuiBox m={2}>
              <Typography variant="h5" mb={4}>
                <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
                {t('Container setting')}
              </Typography>
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
            </MuiBox>
          </form>
        );
      }}
    />
  );
}
export default EditContainer;
