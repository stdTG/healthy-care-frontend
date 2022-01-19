import {
  CareTeam,
  PaginationInfo,
  SubOrganization,
  useGet_Care_Teams_For_AutocompleteQuery,
  useGet_Sub_Orgs_For_AutocompleteQuery
} from '../../../../generated/graphql';

const useLoadOrgUnitsForAutocomplete = (searchCareTeams: string, searchSubOrgs: string) => {
  const {
    data: careTeamsData,
    fetchMore: fetchMoreCareTeams,
    loading: loadingCareTeams
  } = useGet_Care_Teams_For_AutocompleteQuery({
    variables: { page: 0, perPage: 15, filter: {name: searchCareTeams || ''} },
  });

  const {
    data: subOrgsData,
    fetchMore: fetchMoreSubOrgs,
    loading: loadingSubOrgs
  } = useGet_Sub_Orgs_For_AutocompleteQuery({
    variables: { page: 0, perPage: 50, filter: {name: searchSubOrgs|| ''} }
  })

  const careTeams = careTeamsData?.orgUnit?.careTeamPagination?.items || [];
  const careTeamPageInfo = careTeamsData?.orgUnit?.careTeamPagination?.pageInfo || {};

  const subOrgs = subOrgsData?.orgUnit?.subOrgPagination?.items || [];
  const subOrgPageInfo = subOrgsData?.orgUnit?.subOrgPagination?.pageInfo || {} as PaginationInfo;

  const loadMore = <T> (
    orgUnitType: 'subOrg'| 'careTeam',
    fetchMore: (variables: any) => void,
    getItems: (state: T) => CareTeam[] | SubOrganization[],
    getPageInfo: (state: T) => PaginationInfo
  ) => {
    const orgUnitName = orgUnitType === 'subOrg' ? 'subOrg' : 'careTeam'
    const orgUnitPageInfo = (orgUnitType === 'subOrg' ? subOrgPageInfo : careTeamPageInfo) as PaginationInfo

    if (!orgUnitPageInfo?.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        page: (orgUnitPageInfo?.page || 0) + 1,
      },

      updateQuery: (prev: any, { fetchMoreResult }: any) => {

        if (!fetchMoreResult) {
          return prev;
        }

        return {
          orgUnit: {
            [`${orgUnitName}Pagination`]: {
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
    subOrgs,
    subOrgPageInfo,
    fetchMoreCareTeams,
    fetchMoreSubOrgs,
    loadingCareTeams,
    loadingSubOrgs,
    loadMore,
  }
}

export default useLoadOrgUnitsForAutocomplete
