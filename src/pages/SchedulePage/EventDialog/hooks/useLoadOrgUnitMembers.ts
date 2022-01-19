import { useEffect, useState } from 'react';
import {
  DashboardUser,
  Get_Org_Unit_MembersDocument,
  PageInfo,
  useGet_Org_Unit_MembersLazyQuery
} from '../../../../generated/graphql';

const useLoadOrgUnitMembers = (careTeamId: string, subOrgId: string, searchMembers?: string) => {
  const [orgUnitMembers, setOrgUnitMembers] = useState<DashboardUser[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo>({} as PageInfo)
  const [callCount, setCallCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const [ getOrgUnitMembers, { data, loading, client }] = useGet_Org_Unit_MembersLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (callCount > 0) {
        return
      }

      setOrgUnitMembers(data?.user?.dashboard?.pagedList?.items as DashboardUser[])
      setPageInfo({
        ...data?.user?.dashboard?.pagedList?.pageInfo as PageInfo
      })
      setCallCount(callCount + 1)
    },
    variables: { page: 0, perPage: 100, filter: { careTeam: careTeamId, subOrg: subOrgId }},
  })

  useEffect(() => {
    getOrgUnitMembers()
  }, [])

  const queryForSearch = {
    query: Get_Org_Unit_MembersDocument,
    variables: {
      page: 0,
      perPage: 100,
      filter: { name: searchMembers }
    }
  }

  useEffect(() => {
    client && client.query(queryForSearch).then((res) => {
      setOrgUnitMembers(res?.data?.user?.dashboard?.pagedList?.items)
      setPageInfo(res.data?.user?.dashboard?.pagedList?.pageInfo)
      setCurrentPage(0)
    })
  }, [searchMembers, client])

  const queryForPagination = {
    query: Get_Org_Unit_MembersDocument,
    fetchPolicy: "no-cache" as 'no-cache',
    variables: {
      page: currentPage + 1,
      perPage: 100
    },
  };

  const fetchData = () => {
    if (!pageInfo.hasNextPage) {
      return;
    }

    client?.query(queryForPagination)
      .then((res) => {
        setOrgUnitMembers(orgUnitMembers?.concat(res.data?.user?.dashboard?.pagedList?.items))
        setPageInfo(res.data?.user?.dashboard?.pagedList?.pageInfo)
        setCurrentPage((currentPage) => currentPage + 1)
      })
  };

  return {
    orgUnitMembers,
    setOrgUnitMembers,
    pageInfo,
    fetchData,
    loadingGetOrgUnitMembers: loading,
    callCount,
  }
}

export default useLoadOrgUnitMembers
