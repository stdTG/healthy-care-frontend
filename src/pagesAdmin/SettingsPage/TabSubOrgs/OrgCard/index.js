import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Icon, IconButton } from 'components/ui';
import Card from 'pagesAdmin/SettingsPage/Card';
import { adminRouteTemplates } from 'routing/routeTemplates';
import ReadCard from './ReadCard';
import DeleteButton from '../../../../components/Buttons/DeleteButton/index';
import { ConfirmDeleteDialogContext } from '../../../../routing/index';
import { useTranslation } from 'react-i18next';

const OrgCard = (props) => {
  const { id, data, onClick, openEditModal, onDelete } = props;
  const history = useHistory();
  const { t } = useTranslation();

  const onViewUsers = () => {
    history.push(adminRouteTemplates.subOrgPage.replace(':id', id));
  };

  const { open: openConfirmDeleteDialog } = useContext(
    ConfirmDeleteDialogContext
  );

  return (
    <Card
      title={data.name}
      onClick={onClick}
      style={{ position: 'relative' }}
      getTitleIcon={() => <Icon icon="hospital-symbol" mr={10} />}
      EditButton={<IconButton icon={'pen'} onClick={() => openEditModal()} />}
      deleteButton={
        <DeleteButton
          onClick={() => {
            openConfirmDeleteDialog?.({
              dialogTitle: t('Delete sub organization'),
              dialogWarningMessage: t(
                'Do you want delete this sub organization?'
              ),
            }).then(({ isDeleted }) => isDeleted && onDelete && onDelete(id));
          }}
        />
      }
    >
      <ReadCard {...props} viewUsers={onViewUsers} />
    </Card>
  );
};

export default OrgCard;
