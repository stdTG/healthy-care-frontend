import { CareTeam, useDelete_Care_TeamMutation } from '../../../../generated/graphql';

const useDeleteCareTeam = (
  careTeams: CareTeam[],
  setCareTeams: (careTeams: CareTeam[]) => void
) => {

  const [deleteCareTeam, {data: deleteCareTeamData, loading: loadingDelete}] = useDelete_Care_TeamMutation()

  const onDeleteCareTeam = async (id: string) => {
    const response = await deleteCareTeam({
      variables: {
        id_: id
      }
    })

    if (response?.data?.orgUnit?.deleteCareTeam?.ok) {
      setCareTeams(careTeams?.filter((careTeam) => careTeam.id_ !== id))
    }
  }

  return {
    onDeleteCareTeam,
    loadingDelete,
  }
}

export default useDeleteCareTeam
