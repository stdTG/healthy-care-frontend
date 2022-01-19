import { Button as MuiButton, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Icon, Search, Space } from 'components/ui';
import { convertToTitleCase } from 'lib/utils';
import UsersTable from 'pagesAdmin/SettingsPage/TabUsers/UsersTable';
import useDialog from 'lib/hooks/useDialog';
import BackButton from 'components/Buttons/BackButton';
import { adminRouteTemplates } from 'routing/routeTemplates';
import { adminSettingsTabs } from 'pagesAdmin/SettingsPage';
import useLoadUsersByOrgUnit, { Teams } from './hooks/useLoadUsersByOrgUnit';
import { useDebounce } from 'use-debounce';
import AddUsersToOrgUnitDialog from './AddUsersToOrgUnitDialog';
import useAddUsersToOrgUnit from './hooks/useAddUsersToOrgUnit';
import useDeleteUserInOrgUnit from './hooks/useDeleteUserInOrgUnit';
import { useTranslation } from 'react-i18next';

const SettingsTeamsPage = (props) => {
  const history = useHistory();
  const routeParams = useParams();
  const location = useLocation();
  const addUsersDialog = useDialog();

  const [search, setSearch] = useState('');
  const [searchWithDelay] = useDebounce(search, 200);
  const { t } = useTranslation();

  const teamName = location.pathname.includes('careTeam')
    ? 'care team'
    : 'sub organization';

  const teamId = routeParams.id;

  const {
    orgUnitData,
    users,
    getCareTeamUsersLoading,
    getSubOrgUsersLoading,
    paginationInfo,
    setCurrentPage,
    setRowsPerPage,
    currentPage,
    rowsPerPage,
    setUsers,
    setPaginationInfo,
  } = useLoadUsersByOrgUnit(teamId, teamName, searchWithDelay);

  const { onAddUsers, addUsersLoading } = useAddUsersToOrgUnit(
    addUsersDialog,
    teamId,
    users,
    setUsers,
    paginationInfo,
    setPaginationInfo
  );

  const { onDelete, deleteUserLoading } = useDeleteUserInOrgUnit(
    teamId,
    users,
    setUsers,
    paginationInfo,
    setPaginationInfo
  );

  const goBack = () => {
    history.push({
      pathname: adminRouteTemplates.settingsPage,
      search: `?tab=${
        teamName === Teams.careTeam
          ? adminSettingsTabs.careTeams
          : adminSettingsTabs.subOrgs
      }`,
    });
  };

  const title =
    teamName === Teams.careTeam
      ? orgUnitData?.orgUnit.careTeamById.name
      : orgUnitData?.orgUnit.subOrgById.name;

  return (
    <div style={{ padding: '24px' }}>
      <BackButton
        title={
          teamName === Teams.careTeam
            ? t('Manage care teams')
            : t('Manage sub organizations')
        }
        onClick={goBack}
      />

      <div style={{ marginBottom: '20px', marginTop: '20px', height: '38px' }}>
        <Typography variant="h1">
          {title && convertToTitleCase(title)}
        </Typography>
      </div>

      <>
        <div>
          <Space display="flex" mb={2} flex="auto">
            <Search
              placeholder={t('Search user')}
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
            <MuiButton
              size="medium"
              variant="contained"
              onClick={() => onAddUsers()}
            >
              <Icon icon="user-plus" style={{ fontSize: '20px' }} mr={10} />
              {t('Add user')}
            </MuiButton>
          </Space>

          <div>
            {users?.length === 0 && !getCareTeamUsersLoading ? (
              <Typography
                align={'center'}
                variant="h5"
                style={{ marginTop: '50px' }}
              >
                {searchWithDelay
                  ? t('Sorry, nothing found')
                  : t('You have no users yet')}
              </Typography>
            ) : (
              <>
                <UsersTable
                  users={users}
                  loading={
                    getCareTeamUsersLoading ||
                    getSubOrgUsersLoading ||
                    deleteUserLoading ||
                    addUsersLoading
                  }
                  paginationInfo={paginationInfo}
                  setPageNumber={setCurrentPage}
                  pageNumber={currentPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  onDelete={onDelete}
                />
              </>
            )}
          </div>
        </div>
      </>

      <AddUsersToOrgUnitDialog
        isOpen={addUsersDialog.isOpen}
        close={addUsersDialog.close}
        initialData={addUsersDialog.initialData}
      />
    </div>
  );
};

export default SettingsTeamsPage;
