import { DashboardUser, PaginationInfo, useDelete_Dashboard_UserMutation } from '../../../../generated/graphql';

const useDeleteDashboardUser = (
  users: DashboardUser[] | undefined,
  setUsers: (user: DashboardUser[]) => void,
  paginationInfo: Partial<PaginationInfo>,
  setPaginationInfo: (paginationInfo: PaginationInfo) => void,
) => {
  const [deleteUser, { loading: deleteUserLoading }] = useDelete_Dashboard_UserMutation({
    fetchPolicy: 'no-cache',
    variables: {
      id_: ''
    }
  });

  const onDelete = async (id: string) => {
    const response = await deleteUser({
      fetchPolicy: 'no-cache',
      variables: {
        id_: id
      }
    });

    if (response?.data?.user?.dashboardUser?.delete?.ok) {
      users && setUsers(users.filter((user) => user.id_ !== id));
      setPaginationInfo({
        ...paginationInfo as PaginationInfo,
        totalItems: (paginationInfo?.totalItems || 0) - 1
      })
    }
  };
  
  return {
    onDelete,
    deleteUserLoading,
  }
}

export default useDeleteDashboardUser
