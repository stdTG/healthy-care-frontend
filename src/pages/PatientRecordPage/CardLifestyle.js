import React, { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select as RffSelect } from 'mui-rff';
import { useParams } from 'react-router-dom';

import {
  Typography as MuiTypography,
  MenuItem as MuiMenuItem,
  Box as MuiBox,
} from '@material-ui/core';

import Card from './Card';
import { FormControl, Icon, IconButton } from 'components/ui';

import {
  actions as patientRecordActions,
  selectors as patientRecordSelectors,
} from 'services/patientRecord';
import LifestyleModal from './LifestyleModal';
import { useTranslation } from 'react-i18next';

import { getCorrespondingFakeDataFromFakePatient } from 'lib/fakeData/fakePatientData';

const CardLifestyle = memo(function CardLifestyle(props) {
  const { id } = useParams();

  let submit;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  var lifestyle = useSelector(patientRecordSelectors.getLifestyle);
  const { t } = useTranslation();

  const currentLifeStyle = getCorrespondingFakeDataFromFakePatient(
    id,
    'lifeStyle'
  );
  lifestyle = currentLifeStyle;

  const onEdit = (event) => {
    setOpen(!open);

    if (open) {
      submit(event);
    }
  };
  const onAdd = (values) => {
    dispatch(
      patientRecordActions.setBasicInformation({
        data: {
          cardName: 'lifestyle',
          value: values,
        },
      })
    );
  };
  const getTitleIcon = (props) => <Icon icon="walking" {...props} />;

  const Info = ({ title, value }) => (
    <MuiBox mb={2}>
      <MuiTypography variant="h6" color="textSecondary">
        {title}
      </MuiTypography>
      {value ? (
        <MuiTypography variant="h5">{value}</MuiTypography>
      ) : (
        <MuiTypography variant="subtitle2" color="textSecondary">
          {t('Not selected')}
        </MuiTypography>
      )}
    </MuiBox>
  );
  const FormSelect = ({ name, label, itemsArr }) => (
    <FormControl label={label}>
      <RffSelect
        variant="outlined"
        size="small"
        name={name}
        style={{ height: '32px' }}
      >
        {itemsArr.map((item, index) => (
          <MuiMenuItem key={index} value={item}>
            {item}
          </MuiMenuItem>
        ))}
      </RffSelect>
    </FormControl>
  );

  return (
    <Card
      title={t('Lifestyle')}
      getTitleIcon={getTitleIcon}
      EditButton={<IconButton icon={open ? 'check' : 'pen'} onClick={onEdit} />}
    >
      <Info title={t('Health rating')} value={lifestyle.healthRating} />
      <Info title={t('Sleep health')} value={lifestyle.sleepHealth} />
      <Info title={t('Fitness')} value={lifestyle.fitness} />
      <Info title={t('Smoking')} value={lifestyle.smoking} />
      <Info title={t('Drinking')} value={lifestyle.drinking} />
      <Info title={t('Nutrition')} value={lifestyle.nutrition} />
      <Info title={t('Drugs')} value={lifestyle.drugs} />
      {/* <Info title={t('Sex life')} value={lifestyle.sexLife} /> */}
      <Info title={t('Diet')} value={lifestyle.diet} />
      <LifestyleModal open={open} onClose={() => setOpen(false)} />
    </Card>
  );
});

export default CardLifestyle;
