import { CareTeam, PageInfo, useGet_Care_TeamsLazyQuery } from '../../../../generated/graphql';
import { useEffect, useState } from 'react';
import { GET_CARE_TEAMS } from '../../gqlSchemes';


const useLoadCareTeams = (searchCareTeams: string) => {
  const [careTeams, setCareTeams] = useState<CareTeam[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({} as PageInfo);
  const [callCount, setCallCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingCareTeams, setLoadingCareTeams] = useState(false)

  const [getCareTeams, { client, loading }] = useGet_Care_TeamsLazyQuery({
    onCompleted: (data) => {
      if (callCount > 0) {
        return;
      }

      setCareTeams(data?.orgUnit?.careTeamPagination?.items as CareTeam[]);
      setPageInfo({
        ...data?.orgUnit?.careTeamPagination?.pageInfo as PageInfo
      });
      setCallCount(callCount + 1);
      setLoadingCareTeams(false)
    },
    variables: { page: 0, perPage: 50 }
  });

  useEffect(() => {
    getCareTeams();
  }, []);

  const queryForSearch = {
    query: GET_CARE_TEAMS,
    loading,
    variables: {
      page: 0,
      perPage: 50,
      filter: { name: searchCareTeams}
    }
  }

  useEffect(() => {
    setLoadingCareTeams(true)
    client && client.query(queryForSearch).then((res) => {
      setCareTeams(res.data?.orgUnit?.careTeamPagination?.items)
      setPageInfo(res.data?.orgUnit?.careTeamPagination?.pageInfo)
      setCurrentPage(0)
    }).finally(() => setLoadingCareTeams(false))
  }, [searchCareTeams, client])

  const queryForPagination = {
    query: GET_CARE_TEAMS,
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
      setCareTeams(careTeams?.concat(res.data?.orgUnit?.careTeamPagination?.items))
      setPageInfo(res.data?.orgUnit?.careTeamPagination?.pageInfo)
      setCurrentPage((currentPage) => currentPage + 1)
    })
  };

  return {
    careTeams,
    setCareTeams,
    loadingCareTeams,
    fetchData,
    pageInfo,
    setPageInfo,
    callCount
  };
};

export default useLoadCareTeams;
