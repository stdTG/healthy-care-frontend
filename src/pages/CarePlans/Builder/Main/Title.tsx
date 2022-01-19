import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';
import { useTranslation } from 'react-i18next';

const Title = () => {
  const { t } = useTranslation();
  const moduleState = useSelector((state: RootState) => state.carePlans);

  return moduleState.builder.isNew ? (
    <Typography variant="h4">
      {t('New Care Plan')}
    </Typography>
  ) : moduleState.builder.request.loadedData ? (
    <Typography variant="h4">
      {moduleState.builder.data?.name}
    </Typography>
  ) : (
    <Typography variant="h4">
    </Typography>
  );
};

export default Title;
