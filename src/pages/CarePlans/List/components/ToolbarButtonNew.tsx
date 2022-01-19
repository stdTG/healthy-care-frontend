import React, { FC } from 'react';
import { Icon } from 'components/ui';
import { Button } from '@material-ui/core';
import { CarePlanType } from 'pages/CarePlans/constants';
import { GqlCarePlanType } from '../../../../generated/graphql';
import { useTranslation } from 'react-i18next';

const ToolbarButtonNew: FC<{ type: GqlCarePlanType, onClick: any }> = (props) => {
  const { t } = useTranslation();
  return props.type == GqlCarePlanType.Template ? (<></>) : (
    <Button
      size="medium"
      variant="contained"
      color="primary"
      onClick={props.onClick}
    >
      <Icon icon="folders" style={{ fontSize: '20px' }} mr={10}/>
      {t('Build a protocol')}
    </Button>
  );
};

export default ToolbarButtonNew;
