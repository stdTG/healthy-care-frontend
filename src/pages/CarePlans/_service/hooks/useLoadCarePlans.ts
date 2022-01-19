import { useEffect, useState } from 'react';
import {
  Get_Care_PlansQuery, GqlCarePlanType,
  PageInfo,
  SubOrganization,
  useGet_Care_PlansLazyQuery,
  useGet_Sub_OrgsLazyQuery
} from '../../../../generated/graphql';
import { CarePlan } from '../../models';
import { GET_SUB_ORGS } from '../../../../pagesAdmin/SettingsPage/gqlSchemes/getSubOrgs';
import { CarePlanType } from '../../constants';

const useLoadCarePlans = (type: GqlCarePlanType) => {
  const [carePlans, setCarePlans] = useState<CarePlan[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo>({} as PageInfo)
  const [callCount, setCallCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loadingCarePlans, setLoadingCarePlans] = useState(false)

  const [getCarePlans, {data: carePlansData, loading, client }] = useGet_Care_PlansLazyQuery({
    onCompleted: (data: Get_Care_PlansQuery) => {
      if (callCount > 0) {
        return
      }

      setCarePlans(data?.carePlan?.list?.items as unknown as CarePlan[])
      setPageInfo({
        ...data?.carePlan?.list?.pageInfo as PageInfo
      })
      setCallCount(callCount + 1)
      setLoadingCarePlans(false)
    },
    variables: { page: currentPage, pageSize: 50, type },
  })

  useEffect(() => {
    getCarePlans()
  }, [])

  // const queryForSearch = {
  //   query: GET_SUB_ORGS,
  //   loading,
  //   variables: {
  //     page: 0,
  //     perPage: 50,
  //     filter: { name: searchSubOrgs}
  //   }
  // }

  // useEffect(() => {
  //   setLoadingSubOrgs(true)
  //   client && client.query(queryForSearch).then((res) => {
  //     setSubOrgs(res.data?.orgUnit?.subOrgPagination?.items)
  //     setPageInfo(res.data?.orgUnit?.subOrgPagination?.pageInfo)
  //     setCurrentPage(0)
  //   }).finally(() => setLoadingSubOrgs(false))
  // }, [searchSubOrgs, client])

  const queryForPagination = {
    query: GET_SUB_ORGS,
    fetchPolicy: "no-cache" as 'no-cache',
    variables: {
      page: currentPage + 1,
      perPage: 50
    },
  };

  // const fetchData = () => {
  //   if (!pageInfo.hasNextPage) {
  //     return;
  //   }
  //
  //   client?.query(queryForPagination)
  //     .then((res) => {
  //       setSubOrgs(subOrgs?.concat(res.data?.orgUnit?.subOrgPagination?.items))
  //       setPageInfo(res.data?.orgUnit?.subOrgPagination?.pageInfo)
  //       setCurrentPage((currentPage) => currentPage + 1)
  //     })
  // };

  return {
    carePlans,
  }
}

export default useLoadCarePlans