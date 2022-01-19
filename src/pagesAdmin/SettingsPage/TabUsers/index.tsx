import React, { FC, useState } from 'react';
import { Icon, Search, Space } from 'components/ui';
import { Button as MuiButton } from '@material-ui/core';

import useDialog from 'lib/hooks/useDialog';
import EmptyPage from '../EmptyPage';
import CreateSuccessDialog from './CreateSuccessDialog';
import UserDialog from './UserDialog';
import UsersTable from './UsersTable';
import { DashboardUser } from '../../../generated/graphql';
import { useDebounce } from 'use-debounce';
import useLoadDashboardUsers from './hooks/useLoadDashboardUsers';
import useCreateDashboardUser from './hooks/useCreateDashboardUser';
import useDeleteDashboardUser from './hooks/useDeleteDashboardUser';
import useUpdateDashboardUser from './hooks/useUpdateDasboardUser';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import { completeTeamMembersInfo } from 'lib/fakeData/fakeTeamMemberData';

const TabUsers: FC<Props> = (props) => {
  const userDialog = useDialog();
  const createSuccessDialog = useDialog();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [isEditMode, setIsEditMode] = useState(false);

  const [searchUsers, setSearchUsers] = useState('')
  const [searchUsersWithDelay] = useDebounce(searchUsers, 200)
  const { t } = useTranslation();

  // const {
  var {
    users,
    getUsers,
    setPaginationInfo,
    paginationInfo,
    setUsers,
    loadingGetUsers,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
  } = useLoadDashboardUsers(searchUsersWithDelay)

  users = completeTeamMembersInfo(users)

  const { handleNewUserDialog, loadingCreateUser } = useCreateDashboardUser(userDialog, createSuccessDialog, getUsers, paginationInfo, setPaginationInfo, enqueueSnackbar)

  const { onDelete, deleteUserLoading } = useDeleteDashboardUser(users, setUsers, paginationInfo, setPaginationInfo)

  const { onEditUser, updateUserLoading } = useUpdateDashboardUser(userDialog, setIsEditMode, users, setUsers)

  return (
    <>
      <div>
        <Space display="flex" mb={2} flex="auto">
          <Search placeholder={t('Search users')} onChange={(event: any) => setSearchUsers(event.target.value)}/>
          <MuiButton
            size="medium"
            variant="contained"
            onClick={handleNewUserDialog}
          >
            <Icon icon="user-plus" size="1x" mr={10}/>
            {t('Add user')}
          </MuiButton>
        </Space>
        {
          users?.length === 0 ? (
            <EmptyPage
              text={t('You have no users yet')}
              buttonText={t('New user')}
              openNewDialog={handleNewUserDialog}
            />
          ) : (
            <>
              <UsersTable
                users={users as DashboardUser[]}
                loading={loadingGetUsers || loadingCreateUser || deleteUserLoading || updateUserLoading}
                paginationInfo={paginationInfo}
                setPageNumber={setCurrentPage}
                pageNumber={currentPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                onDelete={onDelete}
                onEdit={onEditUser}
              />
            </>
          )
        }
      </div>

      <UserDialog
        isOpen={userDialog.isOpen}
        close={userDialog.close}
        initialData={userDialog.initialData}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onDelete={onDelete}
      />

      <CreateSuccessDialog
        isOpen={createSuccessDialog.isOpen}
        close={createSuccessDialog.close}
        initialData={createSuccessDialog.initialData}
      />
    </>
  );
};

export default TabUsers;

interface Props {

}

