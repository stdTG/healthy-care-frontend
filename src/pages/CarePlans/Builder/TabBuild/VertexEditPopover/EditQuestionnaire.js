import React, { useRef, useState } from 'react';
import { Form } from 'react-final-form';
import { Box as MuiBox, IconButton as MuiIconButton } from '@material-ui/core';

import { Button } from 'components';
import {
  Icon,
  Space,
  Typography,
  FormTextField,
  FormControl,
  Input,
} from 'components/ui';
import { Checkboxes as RffCheckboxes } from 'mui-rff';
import {
  Checkbox,
  STimePicker,
  WeekDay,
  WeekDays,
} from 'pages/CarePlans/Builder/TabBuild/styled/PopoverSettings';
import { map } from 'ramda';
import { values as randaValues } from 'ramda';
import { weekDaysEnum } from 'lib/enums/weekDays';
import { useTranslation } from 'react-i18next';

import { Autocomplete as RffAutocomplete } from 'mui-rff';

function Select({ name, options, label, placeholder }) {
  return (
    <RffAutocomplete
      label=""
      name={name}
      variant="outlined"
      options={options}
      getOptionValue={(option) => option}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <FormControl label={label} fullWidth>
          <Input {...params} placeholder={placeholder} variant="outlined" />
        </FormControl>
      )}
      onChange={(event, newValue) => {
        console.log(newValue);
      }}
    />
  );
}

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

  const questionnaireName = [
    'Patient Health Questionnaire (PHQ-9)',
    'Generalized Anxiety Disorder (GAD-7)',
    'Social Phobia Inventory (SPIN)',
    'IES-R',
    'EORTC QLQ-C30',
    'EPIC-26',
    'MDS-UPDRS',
    'MDS-UPDRS',
    'MNSQ',
    'PDQ-8',
    'EORTC QLQ-C30',
  ];

  const dayTimes = [
    { label: 'Morning', formName: 'morning' },
    { label: 'Midday', formName: 'midday' },
    { label: 'Afternoon', formName: 'afternoon' },
    { label: 'Evening', formName: 'evening' },
  ];

  const onSubmit = (values) => {
    console.log(values);
    onSave({
      ...values,
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ values, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <MuiBox m={2}>
              <Typography variant="h5" mb={4}>
                <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
                {t('Questionnaire setting')}
              </Typography>

              <Select
                name="questionnaire"
                options={questionnaireName}
                label={t('Questionnaire')}
                placeholder={t('Select the questionnaire you want.')}
              />

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
                    randaValues(weekDays)
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
                    // onChange={() => {}}
                    // onSelect={() => {}}
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
                  // onChange={() => {}}
                  // onSelect={() => {}}
                  />
                  <Typography variant="h6">{t('Weeks')}</Typography>
                  <STimePicker
                  // defaultValue={time && parseISO('2020-11-30T' + time)}
                  // value={time && parseISO('2020-11-30T' + time)}
                  // onChange={() => {}}
                  // onSelect={() => {}}
                  />
                </Space>
              </MuiBox>

              <MuiBox
                display="flex"
                justifyContent="space-between"
                style={{ marginTop: '30px' }}
              >
                <Button onClick={handleSubmit} title="Save" />
              </MuiBox>
            </MuiBox>
          </form>
        );
      }}
    />
  );
}
export default EditContainer;
