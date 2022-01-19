import { useMutation } from '@apollo/client';
import { UPDATE_SUB_ORG } from '../../gqlSchemes/updateSubOrg';
import { CareTeam, DashboardUser, SubOrganization } from '../../../../generated/graphql';

const useEditSubOrg = (
  subOrgs: SubOrganization[],
  setSubOrgs: (subOrgs: SubOrganization[]) => void,
  setIsEditMode: (isEditMode: boolean) => void,
  subOrgDialog: any
) => {
  const [updateSubOrg, { loading: loadingUpdate }] = useMutation(
    UPDATE_SUB_ORG
  );

  const onEditSubOrg = async (item: SubOrganization) => {
    setIsEditMode(true);

    const getItemsId = (getItems: (subOrg: SubOrganization) => DashboardUser[]) => {
      return getItems(item)?.map((i) => typeof i === 'string' ? i : i?.id_)
    }

    const result = await subOrgDialog.open({
      values: {
        ...item,
        users: getItemsId((item) => item?.users as any),
        supervisors: getItemsId((item) => item?.supervisors as any ),
      },
    });

    if (!result || !result.data) {
      return;
    }

    const getRecordFromData = () => {
      //Todo refactor
      const getCareTeamsValue = (careTeams: any) => {
        if (typeof careTeams[0] === 'string') {
          return careTeams
        }
        return careTeams?.map((team: CareTeam) => {
          return team.id_
        })
      }

      return {
        id_: result?.data?.id_,
        name: result?.data?.name,
        email: result?.data?.email,
        phone: result?.data?.phone,
        site: result?.data?.site,
        fullAddress: {
          country: result?.data?.country,
          city: result?.data?.city,
          address: result?.data?.address,
          zipcode: result?.data?.zipcode
        },
        careTeams: getCareTeamsValue(result?.data.careTeams),
        supervisors: result?.data.supervisors,
        users: result?.data.users
      }
    }

    const response = await updateSubOrg({
      variables: {
        record: getRecordFromData(),
      },
    });

    if (response?.data?.orgUnit?.updateSubOrg?.ok) {
      setSubOrgs(
        subOrgs?.map((subOrg) => {
          return result?.data?.id_ === subOrg?.id_ ? { ...getRecordFromData() } : subOrg;
        })
      );
    }
  };

  return {
    onEditSubOrg,
    loadingUpdate
  }
}

export default useEditSubOrg
