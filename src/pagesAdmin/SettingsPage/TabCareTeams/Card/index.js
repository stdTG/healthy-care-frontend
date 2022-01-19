import React, { useContext } from 'react';

import Card from 'pagesAdmin/SettingsPage/Card';
import { Icon, IconButton } from 'components/ui';
import ReadCard from './ReadCard';
import DeleteButton from '../../../../components/Buttons/DeleteButton/index';
import { ConfirmDeleteDialogContext } from '../../../../routing/index';
import { useTranslation } from 'react-i18next';

const CardCareTeam = (props) => {
  const { id_, name } = props.data;

  const { openEditModal, onDelete } = props;
  const { t } = useTranslation();

  const { open: openConfirmDeleteDialog } = useContext(
    ConfirmDeleteDialogContext
  );

  return (
    <Card
      title={name}
      getTitleIcon={() => <Icon icon="users" mr={10} />}
      EditButton={<IconButton icon={'pen'} onClick={() => openEditModal()} />}
      deleteButton={
        <DeleteButton
          onClick={() => {
            openConfirmDeleteDialog?.({
              dialogTitle: t('Delete care team'),
              dialogWarningMessage: t('Do you want delete this care team?'),
            }).then(({ isDeleted }) => isDeleted && onDelete && onDelete(id_));
          }}
        />
      }
    >
      <ReadCard {...props.data} />
    </Card>
  );
};

export default CardCareTeam;
