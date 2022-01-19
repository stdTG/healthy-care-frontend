import {
  DashboardUser,
  PaginationInfo,
  useGet_Dashboard_Users_For_AutocompleteQuery
} from '../../../../generated/graphql';

const useLoadDashBoardUsersForAutocomplete = (searchDashboardUsers: string, isFree?: boolean) => {
  const {
    data: usersData,
    fetchMore: fetchMoreUsers,
    loading: loadingGetUsers
  } = useGet_Dashboard_Users_For_AutocompleteQuery({
    variables: { page: 0, perPage: 150, filter: { name: searchDashboardUsers, isFree } },
  });

  const users = usersData?.user?.dashboard?.pagedList?.items || [];
  const usersPageInfo = usersData?.user?.dashboard?.pagedList?.pageInfo || {} as PaginationInfo

  const loadMore = <T> (
    getItems: (state: T) => DashboardUser[],
    getPageInfo: (state: T) => PaginationInfo
  ) => {
    if (!usersPageInfo?.hasNextPage) {
      return;
    }

    fetchMoreUsers({
      variables: {
        page: (usersPageInfo?.page || 0) + 1,
      },

      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          user: {
            dashboard: {
              pagedList: {
                items: [
                  ...getItems(prev),
                  ...getItems(fetchMoreResult),
                ],
                pageInfo: {
                  ...getPageInfo(fetchMoreResult),
                },
              }
            }
          }
        };
      },
    });
  };

  return {
    users,
    fetchMoreUsers,
    loadingGetUsers,
    loadMore
  }

}

export default useLoadDashBoardUsersForAutocomplete
