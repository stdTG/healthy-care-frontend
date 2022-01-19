import { SubOrganization, useDelete_Sub_OrgMutation } from '../../../../generated/graphql';

const useDeleteSubOrg = (
  subOrg: SubOrganization[],
  setSubOrgs: (subOrg: SubOrganization[]) => void
) => {

  const [deleteSubOrg, {data: deleteSubOrgsData, loading: loadingDelete}] = useDelete_Sub_OrgMutation()

  const onDeleteSubOrg = async (id: string) => {
    const response = await deleteSubOrg({
      variables: {
        id_: id
      }
    })

    if (response?.data?.orgUnit?.deleteSubOrg?.ok) {
      setSubOrgs(subOrg?.filter((subOrg) => subOrg.id_ !== id))
    }
  }

  return {
    onDeleteSubOrg,
    loadingDelete,
  }
}

export default useDeleteSubOrg
