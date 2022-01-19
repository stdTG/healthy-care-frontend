import { CareTeam, DashboardUser, PaginationInfo, useAdd_UsersMutation } from '../../../generated/graphql';

const useAddUsersToOrgUnit = (
  addUsersDialog: any,
  teamId: string,
  users: DashboardUser[],
  setUsers: (users: DashboardUser[]) => void,
  paginationInfo: Partial<PaginationInfo>,
  setPaginationInfo: (paginationInfo: PaginationInfo) => void
  ) => {
  const [addUsers, { loading: addUsersLoading }] = useAdd_UsersMutation();

  async function onAddUsers() {
    const result = await addUsersDialog.open();

    if (!result || !result.data) return;

    const response = await addUsers({
      variables: {
        record: {
          orgUnit: teamId,
          users: result.data.users,
        },
      },
    });

    if (response?.data?.orgUnit?.addUsers?.ok) {
      setUsers([...response?.data?.orgUnit?.addUsers?.result?.users as DashboardUser[]]);
      setPaginationInfo({
        ...paginationInfo as PaginationInfo,
        totalItems: response?.data?.orgUnit?.addUsers?.result?.users?.length,
      });
    }
  }

  return {
    onAddUsers,
    addUsersLoading
  }
}

export default useAddUsersToOrgUnit
