import { DashboardUser, PaginationInfo, useDelete_Users_In_Org_UnitMutation } from '../../../generated/graphql';

const useDeleteUserInOrgUnit = (
  teamId: string,
  users: DashboardUser[],
  setUsers: (users: DashboardUser[]) => void,
  paginationInfo: Partial<PaginationInfo>,
  setPaginationInfo: (paginationInfo: PaginationInfo) => void
) => {
  const [
    deleteUserInOrgUnit,
    { data, loading: deleteUserLoading },
  ] = useDelete_Users_In_Org_UnitMutation();

  const onDelete = async (id: string) => {
    const response = await deleteUserInOrgUnit({
      variables: {
        record: {
          orgUnit: teamId,
          users: [id],
        },
      },
    });

    if (response?.data?.orgUnit?.deleteUsers?.ok) {
      setUsers(users.filter((user) => user.id_ !== id));
      setPaginationInfo({
        ...paginationInfo as PaginationInfo,
        totalItems: (paginationInfo.totalItems || 0) - 1,
      });
    }
  };

  return {
    onDelete,
    deleteUserLoading
  }
}

export default useDeleteUserInOrgUnit
