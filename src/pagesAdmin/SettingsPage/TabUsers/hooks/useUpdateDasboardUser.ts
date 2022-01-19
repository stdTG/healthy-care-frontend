import { DashboardUser, useUpdate_Dashboard_UserMutation } from '../../../../generated/graphql';

const useUpdateDashboardUser = (
  userDialog: any,
  setIsEditMode: (isEditMode: boolean) => void,
  users: DashboardUser[] | undefined,
  setUsers: (users: DashboardUser[]) => void
) => {
  const [ updateUser, {data: updateUserData, loading: updateUserLoading}] = useUpdate_Dashboard_UserMutation()

  const onEditUser = async (values: DashboardUser) => {
    setIsEditMode(true);
    const result = await userDialog.open({
      values: {
        ...values
      },
    });

    if (!result || !result.data) {
      return;
    }

    const response = await updateUser({
      variables: {
        user: result.data.id_,
        record: {
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          role: result.data.role,
          orgUnit: result.data.careTeam || result.data.subOrg
        }
      }
    });

    if (response?.data?.user?.dashboardUser?.update?.ok) {
      users && setUsers(
        users?.map((user) => {
          return result?.data?.id_ === user.id_
            ? {
              ...user,
              ...response?.data?.user?.dashboardUser?.update?.result || {} as DashboardUser,
            }
            : user;
        })
      );
    }
  };

  return {
    onEditUser,
    updateUserLoading,
  }
}

export default useUpdateDashboardUser
