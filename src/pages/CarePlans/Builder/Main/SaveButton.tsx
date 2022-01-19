import React, { useCallback, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Icon } from 'components/ui';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/reducer';
import { careTeamMemberRouteTemplates as routes } from 'routing/routeTemplates';
import { useHistory } from 'react-router-dom';
import { CarePlanType } from 'pages/CarePlans/constants';
import { useSaveHandler } from '../useSaveHandler';
import { useTranslation } from 'react-i18next';

const SaveButton = ({ onClick }: Props) => {
  const { t } = useTranslation();

  return (
    <Button
      size="medium"
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      <Icon icon="stethoscope" mr={8}/>
      {t('Save')}
    </Button>
  );
};

export default SaveButton;

interface Props {
  onClick: () => void
}
