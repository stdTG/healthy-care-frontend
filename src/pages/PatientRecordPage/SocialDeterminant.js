import React, { useState, memo } from 'react';
import Card from './Card';
import { Icon, IconButton } from 'components/ui';

import { useParams } from 'react-router-dom';

import { getCorrespondingFakeDataFromFakePatient } from 'lib/fakeData/fakePatientData';

import {
  Typography as MuiTypography,
  MenuItem as MuiMenuItem,
  Box as MuiBox,
} from '@material-ui/core';

import SocialDeterminantModal from './SocialDeterminantModal';
import { useTranslation } from 'react-i18next';

const SocialDeterminant = memo(function SocialDeterminant(props) {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const socialDeterminant = getCorrespondingFakeDataFromFakePatient(
    id,
    'socialDeterminant'
  );

  const onEdit = () => {
    setOpen(!open);
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

  return (
    <Card
      title={t('Social Determinants')}
      getTitleIcon={getTitleIcon}
      EditButton={<IconButton icon={open ? 'check' : 'pen'} onClick={onEdit} />}
    >
      <Info
        title={t('Gender identity')}
        value={socialDeterminant.genderIdentity}
      />
      <Info
        title={t('Sexual orientation')}
        value={socialDeterminant.sexualOrientation}
      />
      <Info
        title={t('Educational level')}
        value={socialDeterminant.educationalLevel}
      />
      <Info
        title={t('Marital status')}
        value={socialDeterminant.maritalStatus}
      />
      <Info
        title={t('Housing status')}
        value={socialDeterminant.housingStatus}
      />
      <Info title={t('Loneliness')} value={socialDeterminant.loneliness} />
      <Info
        title={t('Transportation access')}
        value={socialDeterminant.transportationAccess}
      />
      <Info
        title={t('Safety at place of life')}
        value={socialDeterminant.safety}
      />
      <Info title={t('Violence')} value={socialDeterminant.violence} />
      <Info title={t('Finance')} value={socialDeterminant.finance} />

      <SocialDeterminantModal open={open} onClose={() => setOpen(false)} />
    </Card>
  );
});

export default SocialDeterminant;
