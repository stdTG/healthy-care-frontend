import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useSetDefaultFilter = (setFilters) => {
  const orgUnit = useSelector((state) => state.user && state.user.user.orgUnit);

  useEffect(() => {
    if (orgUnit) {
      const patientsFilterByCareTeamIdOrSubOrgIdParams = {
        [orgUnit?.__typename === 'SubOrganization'
          ? 'subOrgId'
          : 'careTeamId']: orgUnit?.id_,
      };

      setFilters({
        startAge: 0,
        endAge: 100,
        location: '',
        gender: [],
        ...(patientsFilterByCareTeamIdOrSubOrgIdParams || {}),
      });
    }
  }, [orgUnit]);
};

export default useSetDefaultFilter;
