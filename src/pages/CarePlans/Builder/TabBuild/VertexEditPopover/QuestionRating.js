import React, { useState, useMemo } from 'react';
import { Form } from 'react-final-form';
import { Box as MuiBox, Tooltip, Slider } from '@material-ui/core';
import { FormControl, Icon, Typography } from 'components/ui';
import STextField from 'pages/CarePlans/Builder/TabBuild/styled/STextField';
import { Button } from 'components';
import { Radios } from 'mui-rff';
import { useTranslation } from 'react-i18next';

function QuestionRating(props) {
  const { onSave, initialValues, type } = props;

  const [stepsValue, setStepsValue] = useState(() => {
    if (initialValues) {
      return initialValues.stepsValue ? initialValues.stepsValue : 5;
    }
  });

  const onSubmit = (values) => {
    onSave({
      ...values,
      questionType: type,
      stepsValue,
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <MuiBox m={2} display="flex" flexDirection="column" width="350px">
              <FormTitle />
              <QuestionText />
              <StepsRange value={stepsValue} setValue={setStepsValue} />
              <RatingShape />
              <FormFooter handleSubmit={handleSubmit} />
            </MuiBox>
          </form>
        );
      }}
    />
  );
}

export default QuestionRating;

const FormTitle = React.memo(() => {
  const { t } = useTranslation();

  return (
    <Typography variant="h5" mb={4}>
      <Icon icon="sliders-h" size="1x" mr={10} color="primary" />
      {t('Edit question: Rating')}
    </Typography>
  );
});
const QuestionText = React.memo(() => {
  const { t } = useTranslation();
  return (
    <FormControl label={t('Question text')}>
      <STextField name="text" placeholder={t('Your text here')} />
    </FormControl>
  );
});
const StepsRange = React.memo(({ value, setValue }) => {
  const { t } = useTranslation();

  const Label = useMemo(
    () => <Typography variant="h5">{t('Steps value')}</Typography>,
    []
  );

  const handleChange = (v, n) => {
    setValue(n);
    console.log('Steps range value: ', n);
  };
  return (
    <FormControl>
      <MuiBox display="flex" alignItems="center" mb={2}>
        {Label}
        <Slider
          name="stepsValue"
          type="range"
          min={0}
          max={10}
          value={value}
          onChange={handleChange}
          style={{ width: '50%', marginLeft: '16px' }}
        />
      </MuiBox>
    </FormControl>
  );
});
const RatingShape = React.memo(() => {
  const { t } = useTranslation();

  return (
    <FormControl label={t('Select the rating Shape')}>
      <MuiBox display="flex" alignItems="center" justifyContent="space-between">
        <div>
          <Radios
            name="ratingShape"
            required={true}
            data={[
              { label: 'Stars', value: 'stars' },
              { label: 'Emoticons', value: 'emoticons' },
              { label: 'Hearts', value: 'hearts' },
            ]}
          />
        </div>
        <div>
          <div>⭐⭐⭐⭐⭐</div>
          <div style={{ margin: '20px 0' }}>😡🙁😕🙂😍</div>
          <div>💙💙💙💙💙</div>
        </div>
      </MuiBox>
    </FormControl>
  );
});
const FormFooter = React.memo(({ handleSubmit }) => {
  const { t } = useTranslation();

  return (
    <MuiBox display="flex" alignItems="center" justifyContent={'space-between'}>
      <div style={{ width: '12px' }} />
      <Button type="submit" onClick={handleSubmit} title={t('Save')} />
      <InfoIcon />
    </MuiBox>
  );
});
const InfoIcon = React.memo(() => {
  const { t } = useTranslation();
  return (
    <Tooltip
      title={t('Let your audience the possibility to give quality feedback')}
      placement="top-end"
    >
      <div>
        <Icon
          icon="info-circle"
          color="primary"
          style={{ width: '18px', height: '18px' }}
        />
      </div>
    </Tooltip>
  );
});
