import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../gqlSchemes';
import { PaginationInfo } from '../../../../generated/graphql';
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';

const useCreateDashboardUser = (
  userDialog: any,
  createSuccessDialog: any,
  getUsers: Function,
  paginationInfo: Partial<PaginationInfo> ,
  setPaginationInfo: (paginationInfo: PaginationInfo) => void,
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey,
) => {
  const [createUser, { loading: loadingCreateUser}] = useMutation(CREATE_USER);

  async function handleNewUserDialog() {
    const result = await userDialog.open();

    if (!result || !result.data) return;

    const data = await saveUserRequested(result.data);

    const successResult = await createSuccessDialog.open(data);
    if (!successResult || !successResult.createNew) return;

    handleNewUserDialog();
  }

  const saveUserRequested = async (values: any) => {
    const response = await createUser({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
        byPhone: values.phone
          ? { phone: values.phone || '', sendSms: values.sendSms }
          : null,
        byEmail: { email: values.email, sendEmail: values.sendEmail },
        orgUnitId: values.careTeam || values.subOrg
      }
    });

    if (response.data?.user?.dashboardUser?.create?.ok) {
      const id = response.data?.user?.dashboardUser.create.resultId;

      getUsers();

      setPaginationInfo({
        ...paginationInfo as PaginationInfo,
        totalItems: (paginationInfo?.totalItems || 0) + 1
      })

      return { ...values, id };

    } else {
      enqueueSnackbar('An unexpected error occurred', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  };

  return {
    handleNewUserDialog,
    loadingCreateUser,
  }
}

export default useCreateDashboardUser
