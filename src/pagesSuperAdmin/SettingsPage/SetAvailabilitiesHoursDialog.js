import FormDialog from 'components/Dialogs/FormDialog';
import React from 'react';
import { Button as MuiButton } from '@material-ui/core';
import { Icon } from 'components/ui';
import useDialog from 'lib/hooks/useDialog';
import { useTranslation } from 'react-i18next';

const SetAvailabilitiesHoursDialog = (props) => {
  const { close } = props;
  const { t } = useTranslation();

  const onSave = (values) => {
    close({ data: values });
  };
  const actions = [
    <MuiButton key="save" type="submit" color="primary" variant="contained">
      <Icon icon="user-plus" size="1x" mr={10} /> Set availabilities hours
    </MuiButton>,
  ];
  return (
    <>
      <FormDialog
        title={t('Availabilities hours')}
        onSubmit={console.log}
        actions={actions}
        close={close}
        {...props}
      />
    </>
  );
};

export default SetAvailabilitiesHoursDialog;
