import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_USERS } from 'pages/SchedulePage/gqlSchemes/getUsers';
import { GET_PATIENTS } from 'pages/SchedulePage/gqlSchemes/getPatients';
import { DashboardUser, PageInfo, PaginationInfo, PatientUser, SubOrganization } from '../../../../generated/graphql';
import { GET_SUB_ORGS } from '../../../../pagesAdmin/SettingsPage/gqlSchemes/getSubOrgs';

const useLoadPatients = (searchPatients: string) => {
  const [patients, setPatients] = useState<PatientUser[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo>({} as PageInfo)
  const [callCount, setCallCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const [getPatients, {
    loading: patientsLoading,
    client
  }] = useLazyQuery(GET_PATIENTS, {
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (callCount > 0) {
        return
      }

      setPatients(data?.user?.patient?.pagedList?.items as PatientUser[])
      setPageInfo({
        ...data?.user?.patient?.pagedList?.pageInfo as PageInfo
      })
      setCallCount(callCount + 1)
    },
    variables: { page: 0, perPage: 100, filter: { name: searchPatients }},
  })

  useEffect(() => {
    getPatients()
  }, [])

  const queryForSearch = {
    query: GET_PATIENTS,
    variables: {
      page: 0,
      perPage: 100,
      filter: { name: searchPatients}
    }
  }

  useEffect(() => {
    client && client.query(queryForSearch).then((res) => {
      setPatients(res?.data?.user?.patient?.pagedList?.items)
      setPageInfo(res.data?.user?.patient?.pagedList?.pageInfo)
      setCurrentPage(0)
    })
  }, [searchPatients, client])

  const queryForPagination = {
    query: GET_PATIENTS,
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
        setPatients(patients?.concat(res.data?.user?.patient?.pagedList?.items))
        setPageInfo(res.data?.user?.patient?.pagedList?.pageInfo)
        setCurrentPage((currentPage) => currentPage + 1)
      })
  };

  return {
    patients,
    setPatients,
    pageInfo,
    fetchData,
    patientsLoading,
    callCount,
  }
}

export default useLoadPatients;
