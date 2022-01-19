import { useEffect, useState } from 'react';
import { DashboardUser, PaginationInfo, useGet_Dashboard_UsersLazyQuery } from '../../../../generated/graphql';

const useLoadDashboardUsers = (searchUsers: string) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState<DashboardUser[]>();
  const [paginationInfo, setPaginationInfo] = useState<Partial<PaginationInfo>>({});
  const [rowsPerPage, setRowsPerPage] = useState<number | undefined>(paginationInfo?.perPage || 5);

  const [getUsers, { loading: loadingGetUsers, data }] = useGet_Dashboard_UsersLazyQuery({
    fetchPolicy: 'no-cache',
    variables: { page: currentPage, perPage: rowsPerPage || 5, filter: { name: searchUsers } }
  });

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (data) {
      setUsers(data?.user?.dashboard?.pagedList?.items as DashboardUser[]);
      setPaginationInfo(data?.user?.dashboard?.pagedList?.pageInfo as PaginationInfo);
    }
  }, [data]);

  return {
    currentPage,
    setCurrentPage,
    users,
    setUsers,
    rowsPerPage,
    setRowsPerPage,
    loadingGetUsers,
    getUsers,
    setPaginationInfo,
    paginationInfo,
  }
}

export default useLoadDashboardUsers
