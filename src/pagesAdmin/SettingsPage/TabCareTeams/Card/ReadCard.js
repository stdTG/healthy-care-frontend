import SButton from 'pagesAdmin/SettingsPage/styled/SButton';
import React from 'react';
import { adminRouteTemplates } from 'routing/routeTemplates';
import { useHistory } from 'react-router-dom';
import { SEmptyHint, SIcon } from '../../styled/tabCareTeams';
import { useTranslation } from 'react-i18next';

function ReadCard(props) {
  const { id_: id, users, supervisors, subOrg } = props;

  const history = useHistory();
  const { t } = useTranslation();

  const openUsersPage = () =>
    history.push(adminRouteTemplates.careTeamPage.replace(':id', id));

  return (
    <>
      <div>
        <SIcon icon="hospital-symbol" color="success" />
        {subOrg?.name ? (
          <>
            <b>{subOrg?.name}</b> {t('sub organisation')}
          </>
        ) : (
          <SEmptyHint>{t('No sub organisation')}</SEmptyHint>
        )}
      </div>
      <div>
        <SIcon icon="user" color="primary" />
        {users?.length === 0 ? (
          <SEmptyHint>{t('No users')}</SEmptyHint>
        ) : (
          <>
            <b>{users?.length}</b> {t('total users')}
          </>
        )}
      </div>
      <div>
        <SIcon icon="crown" color="info" />
        {supervisors?.length === 1 ? (
          <>
            <b>
              {supervisors[0]?.firstName} {supervisors[0]?.lastName}
            </b>
            {` ${t('have supervisor role')}`}
          </>
        ) : (
          <>
            <b>{supervisors?.length}</b> {t('users have supervisor role')}
          </>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <SButton icon="users" title={t('View users')} onClick={openUsersPage} />
      </div>
    </>
  );
}

export default ReadCard;
