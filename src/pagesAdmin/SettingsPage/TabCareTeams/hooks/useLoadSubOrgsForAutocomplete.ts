import { PaginationInfo, SubOrganization, useGet_Sub_Orgs_For_AutocompleteQuery } from '../../../../generated/graphql';

const useLoadSubOrgsForAutocomplete = (searchSubOrgs: string) => {
  const {
    data: subOrgsData,
    fetchMore: fetchMoreSubOrgs,
    loading: loadingGetSubOrg
  } = useGet_Sub_Orgs_For_AutocompleteQuery({
    variables: { page: 0, perPage: 15, filter: { name: searchSubOrgs } }
  });

  const subOrgs = subOrgsData?.orgUnit?.subOrgPagination?.items || [] as SubOrganization[];
  const subOrgsPageInfo = subOrgsData?.orgUnit?.subOrgPagination?.pageInfo || {} as PaginationInfo;

  const loadMore = <T>(
    getItems: (state: T) => SubOrganization[],
    getPageInfo: (state: T) => PaginationInfo
  ) => {
    if (!subOrgsPageInfo?.hasNextPage) {
      return;
    }

    fetchMoreSubOrgs({
      variables: {
        page: (subOrgsPageInfo?.page || 0) + 1
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          orgUnit: {
            subOrgPagination: {
              items: [
                ...getItems(prev),
                ...getItems(fetchMoreResult)
              ],
              pageInfo: {
                ...getPageInfo(fetchMoreResult)
              }
            }
          }
        };
      }
    });
  };

  return {
    subOrgs,
    loadingGetSubOrg,
    loadMore
  };

};

export default useLoadSubOrgsForAutocomplete;
