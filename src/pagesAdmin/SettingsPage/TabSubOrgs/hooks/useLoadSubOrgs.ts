import { PageInfo, SubOrganization, useGet_Sub_OrgsLazyQuery } from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { GET_SUB_ORGS } from '../../gqlSchemes/getSubOrgs';

const useLoadSubOrgs = (searchSubOrgs: string) => {
  const [subOrgs, setSubOrgs] = useState<SubOrganization[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo>({} as PageInfo)
  const [callCount, setCallCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loadingSubOrgs, setLoadingSubOrgs] = useState(false)

  const [getSubOrgs, {data: subOrgsData, loading, client }] = useGet_Sub_OrgsLazyQuery({
    onCompleted: (data) => {
      if (callCount > 0) {
        return
      }

      setSubOrgs(data?.orgUnit?.subOrgPagination?.items as SubOrganization[])
      setPageInfo({
        ...data?.orgUnit?.subOrgPagination?.pageInfo as PageInfo
      })
      setCallCount(callCount + 1)
      setLoadingSubOrgs(false)
    },
    variables: { page: currentPage, perPage: 50 },
  })

  useEffect(() => {
    getSubOrgs()
  }, [])

  const queryForSearch = {
    query: GET_SUB_ORGS,
    loading,
    variables: {
      page: 0,
      perPage: 50,
      filter: { name: searchSubOrgs}
    }
  }

  useEffect(() => {
    setLoadingSubOrgs(true)
    client && client.query(queryForSearch).then((res) => {
      setSubOrgs(res.data?.orgUnit?.subOrgPagination?.items)
      setPageInfo(res.data?.orgUnit?.subOrgPagination?.pageInfo)
      setCurrentPage(0)
    }).finally(() => setLoadingSubOrgs(false))
  }, [searchSubOrgs, client])

  const queryForPagination = {
    query: GET_SUB_ORGS,
    fetchPolicy: "no-cache" as 'no-cache',
    variables: {
      page: currentPage + 1,
      perPage: 50
    },
  };

  const fetchData = () => {
    if (!pageInfo.hasNextPage) {
      return;
    }

    client?.query(queryForPagination)
      .then((res) => {
        setSubOrgs(subOrgs?.concat(res.data?.orgUnit?.subOrgPagination?.items))
        setPageInfo(res.data?.orgUnit?.subOrgPagination?.pageInfo)
        setCurrentPage((currentPage) => currentPage + 1)
      })
  };

  return {
    subOrgs,
    setSubOrgs,
    pageInfo,
    fetchData,
    loadingSubOrgs,
    callCount,
  }
}

export default useLoadSubOrgs
