import {
  CareTeam,
  PaginationInfo,
  useGet_Care_Teams_For_AutocompleteQuery,
} from '../../../../generated/graphql';

const useLoadOrgUnitsForAutocomplete = (searchCareTeams: string) => {
  const {
    data: careTeamsData,
    fetchMore: fetchMoreCareTeams,
    loading: loadingCareTeams
  } = useGet_Care_Teams_For_AutocompleteQuery({
    variables: { page: 0, perPage: 100, filter: {name: searchCareTeams || ''} },
  });

  const careTeams = careTeamsData?.orgUnit?.careTeamPagination?.items || [];
  const careTeamPageInfo = careTeamsData?.orgUnit?.careTeamPagination?.pageInfo || {} as PaginationInfo

  const loadMore = <T> (
    getItems: (state: T) => CareTeam[],
    getPageInfo: (state: T) => PaginationInfo
  ) => {
    if (!careTeamPageInfo?.hasNextPage) {
      return;
    }

    fetchMoreCareTeams({
      variables: {
        page: (careTeamPageInfo?.page || 0) + 1,
      },

      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          orgUnit: {
            careTeamPagination: {
              items: [
                ...getItems(prev),
                ...getItems(fetchMoreResult),
              ],
              pageInfo: {
                ...getPageInfo(fetchMoreResult),
              },
            },
          },
        };
      },
    });
  };

  return {
    careTeams,
    careTeamPageInfo,
    loadingCareTeams,
    loadMore,
  }
}

export default useLoadOrgUnitsForAutocomplete
