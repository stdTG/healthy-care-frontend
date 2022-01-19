import { useMutation } from '@apollo/client';
import { UPDATE_CARE_TEAM } from '../../gqlSchemes/updateCateTeam';
import { CareTeam, DashboardUser } from '../../../../generated/graphql';

const useUpdateCareTeam = (
  careTeamDialog: any,
  setIsEditMode: (isEditMode: boolean) => void,
  careTeams: CareTeam[],
  setCareTeams: (careTeams: CareTeam[]) => void,
) => {
  const [updateCareTeam, { loading: loadingUpdate }] = useMutation(
    UPDATE_CARE_TEAM
  );

  const onEditCareTeam = async (item: CareTeam) => {

    const getItemsId = (users: DashboardUser[]) => {
      return users?.map((i) => i?.id_)
    }

    setIsEditMode(true);

    const result = await careTeamDialog.open({
      values: {
        ...item,
        subOrg: item?.subOrg?.id_,
        users: getItemsId(item?.users as DashboardUser[]),
        supervisors: getItemsId(item?.supervisors as DashboardUser[]),
      },
    });

    if (!result || !result.data) {
      return;
    }

    const response = await updateCareTeam({
      variables: {
        record: {
          id_: result?.data?.id_,
          name: result?.data?.name,
          subOrgId: result?.data?.subOrg,
          users: result?.data?.users,
          supervisors: result?.data?.supervisors,
        },
      },
    });

    if (response?.data?.orgUnit?.updateCareTeam?.ok) {
      setCareTeams(
        careTeams?.map((careTeam) => {
          return result?.data?.id_ === careTeam.id_
            ? {
              ...response?.data?.orgUnit?.updateCareTeam?.result,
            }
            : careTeam;
        })
      );
    }
  };

  return {
    onEditCareTeam,
    loadingUpdate,
  }
}

export default useUpdateCareTeam
