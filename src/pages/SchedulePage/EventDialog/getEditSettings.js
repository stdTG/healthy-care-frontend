import React from 'react';
import { SActionsWrap } from 'pages/SchedulePage/styled/appointmentAddDialog';
import { Button } from 'components';
import { SaveButton } from 'pages/SchedulePage/styled/appointmentDialog';
import { IconButton } from 'components/ui';
import { useTranslation } from 'react-i18next';

function GetEditSettings(props) {
  const { close, deleteDialog } = props;
  const { t } = useTranslation();

  const actions = (
    <SActionsWrap isEditMode>
      <Button onClick={close} icon="times" title={t('Cancel')} />
      <SaveButton type="submit" title={t('Save')} icon="check" />
    </SActionsWrap>
  );
  const titleButton = (
    <IconButton icon={'trash'} color="warning" onClick={deleteDialog} />
  );

  const title = t('Edit event');
  return {
    actions,
    titleButton,
    title,
  };
}

export default GetEditSettings;
