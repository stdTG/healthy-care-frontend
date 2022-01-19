import { SubOrganization } from '../../../../generated/graphql';
import { useMutation } from '@apollo/client';
import { CREATE_SUB_ORG } from '../../gqlSchemes/createSubOrg';

const useAddSubOrg = (
  subOrgDialog: any, subOrgs: SubOrganization[],
  setSubOrgs: (SubOrgs: SubOrganization[]) => void
) => {
  const [createSubOrg, { loading: loadingCreateSubOrg }] = useMutation(
    CREATE_SUB_ORG
  );

  async function onAddSubOrg() {
    const result = await subOrgDialog.open();

    if (!result || !result.data) return;

    const getRecordFromData = () => {
      return {
        name: result?.data.name,
        email: result?.data.email,
        phone: result?.data.phone,
        site: result?.data.site,
        fullAddress: {
          country: result?.data?.country,
          city: result?.data?.city,
          address: result?.data?.address,
          zipcode: result?.data?.zipcode
        },
        careTeams: result?.data.careTeams,
        supervisors: result?.data.supervisors,
        users: result?.data.users
      }
    }

    const response = await createSubOrg({
      variables: {
        record: getRecordFromData()
      }
    });

    if (response?.data?.orgUnit?.createSubOrg?.ok) {
      setSubOrgs([...subOrgs, {
        id_: response?.data?.orgUnit?.createSubOrg?.resultId,
        ...getRecordFromData(),
      }]);
    }
  }

  return {
    onAddSubOrg,
    loadingCreateSubOrg,
  }
}

export default useAddSubOrg
