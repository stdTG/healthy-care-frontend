import { useEffect } from 'react';
import { useGet_Org_Unit_MembersLazyQuery } from 'generated/graphql';

interface IHookProps {
  careTeamId: string
  subOrgId: string
}

export const useOrgUnitMembers = ({ careTeamId, subOrgId }:IHookProps) => {
  const [getOrgUnitMembers, { data }] = useGet_Org_Unit_MembersLazyQuery();

  useEffect(() => {
    getOrgUnitMembers({
      variables: {
        page: 0,
        perPage: 100,
        filter: { careTeam: careTeamId, subOrg: subOrgId },
      },
    });
    
  }, [careTeamId, subOrgId]);

  return {
    orgUnitMembers: data?.user?.dashboard?.pagedList?.items,
  };
};
