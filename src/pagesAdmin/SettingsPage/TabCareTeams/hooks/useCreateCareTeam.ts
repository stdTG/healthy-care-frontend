import { useMutation } from '@apollo/client';
import { CREATE_CARE_TEAM } from '../../gqlSchemes';
import { CareTeam } from '../../../../generated/graphql';

const useCreateCareTeam = (
  careTeamDialog: any,
  careTeams: CareTeam[],
  setCareTeams: (careTeams: CareTeam[]) => void
) => {
  const [createCareTeam, { loading: loadingCreate }] = useMutation(
    CREATE_CARE_TEAM
  );

  async function onAddCareTeam() {
    const result = await careTeamDialog.open();

    if (!result || !result.data) return;

    const response = await createCareTeam({
      variables: {
        record: {
          name: result.data.name,
          subOrgId: result.data.subOrg,
          users: result.data.users,
          supervisors: result.data.supervisors,
        },
      },
    });

    if (response?.data?.orgUnit?.createCareTeam?.ok) {
      setCareTeams([
        ...careTeams,
        response?.data?.orgUnit?.createCareTeam?.result,
      ]);
    }
  }

  return {
    onAddCareTeam,
    loadingCreate,
  }
}

export default useCreateCareTeam
