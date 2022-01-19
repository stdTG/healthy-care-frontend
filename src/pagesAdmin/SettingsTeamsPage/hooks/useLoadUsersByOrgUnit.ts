import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { PaginationInfo } from '../../../generated/graphql';
import { SUB_ORG_USER_PAGINATION } from '../../SettingsPage/gqlSchemes/subOrgUserPagination';
import { CARE_TEAM_USER_PAGINATION } from '../../SettingsPage/gqlSchemes/careTeamUserPagination';
import { GET_CARE_TEAM_BY_ID } from '../../SettingsPage/gqlSchemes/getCareTeamById';
import { GET_SUB_ORG_BY_ID } from '../../SettingsPage/gqlSchemes/getSubOrgById';

export enum Teams {
  careTeam = 'care team',
  subOrg = 'sub organization',
};

const useLoadUsersByOrgUnit = (teamId: string, teamName: string, searchOrgUnit: string ) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>();
  const [rowsPerPage, setRowsPerPage] = useState(paginationInfo?.perPage || 5);

  const [
    getUsersBySubOrg,
    { data: subOrgPaginationData, loading: getSubOrgUsersLoading },
  ] = useLazyQuery(SUB_ORG_USER_PAGINATION, {
    variables: {
      page: currentPage,
      perPage: rowsPerPage,
      subOrgId: teamId,
      filter: { name: searchOrgUnit }
    },
  });

  const [
    getUsersByCareTeam,
    { data: careTeamPaginationData, loading: getCareTeamUsersLoading },
  ] = useLazyQuery(CARE_TEAM_USER_PAGINATION, {
    variables: {
      page: currentPage || 0,
      perPage: rowsPerPage || 5,
      careTeamId: teamId,
      filter: { name: searchOrgUnit }
    },
  });

  const [getOrgUnitById, { data: orgUnitData }] = useLazyQuery(
    teamName === Teams.careTeam ? GET_CARE_TEAM_BY_ID : GET_SUB_ORG_BY_ID,
    {
      variables: {
        id: teamId,
      },
    }
  );

  useEffect(() => {
    if (teamName === Teams.careTeam) {
      getUsersByCareTeam();
    } else {
      getUsersBySubOrg();
    }
    getOrgUnitById();
  }, [currentPage]);

  useEffect(() => {
    if (subOrgPaginationData) {
      setUsers(subOrgPaginationData?.orgUnit?.subOrgUserPagination?.items);
      setPaginationInfo(
        subOrgPaginationData?.orgUnit?.subOrgUserPagination?.pageInfo
      );
    }
  }, [subOrgPaginationData]);

  useEffect(() => {
    if (careTeamPaginationData) {
      setUsers(careTeamPaginationData?.orgUnit?.careTeamUserPagination?.items);
      setPaginationInfo(
        careTeamPaginationData?.orgUnit?.careTeamUserPagination?.pageInfo
      );
    }
  }, [careTeamPaginationData]);

  return {
    users,
    setUsers,
    orgUnitData,
    paginationInfo,
    currentPage,
    rowsPerPage,
    setCurrentPage,
    setRowsPerPage,
    getSubOrgUsersLoading,
    getCareTeamUsersLoading,
    setPaginationInfo
  }
}

export default useLoadUsersByOrgUnit
