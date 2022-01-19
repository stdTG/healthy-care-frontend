import React from 'react';

import { Typography } from 'components/ui';
import { Button, DeleteButton } from 'components';
import { useTranslation } from 'react-i18next';

const GetAppointmentSettings = (props) => {
  const { close } = props;
  const { t } = useTranslation();

  return {
    title: t('Cancel appointment'),
    content: (
      <>
        <Typography>{t('Do you want to cancel this appointment')}</Typography>
        <Typography color="textSecondary" style={{ textAlign: 'center' }}>
          {t(
            'The patient will be notified of the cancellation by email and will receive a notification'
          )}
        </Typography>
      </>
    ),
    actions: [
      <Button onClick={close} icon="times" title={t('Cancel')} />,
      <DeleteButton onClick={() => close(true)} title={t('Delete')} />,
    ],
  };
};

export default GetAppointmentSettings;
