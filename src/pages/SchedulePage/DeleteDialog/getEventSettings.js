import React from 'react';

import { Typography } from 'components/ui';
import { Button, DeleteButton } from 'components';
import { useTranslation } from 'react-i18next';

const GetEventSettings = (props) => {
  const { close } = props;
  const { t } = useTranslation();

  return {
    title: t('Remove event'),
    content: (
      <>
        <Typography>{t('Do you want to remove this event')}</Typography>
        <Typography color="textSecondary">
          {t('The deletion will be definitive')}
        </Typography>
      </>
    ),
    actions: [
      <Button onClick={close} icon="times" title={t('Cancel')} />,
      <DeleteButton onClick={() => close(true)} title={t('Delete')} />,
    ],
  };
};

export default GetEventSettings;
