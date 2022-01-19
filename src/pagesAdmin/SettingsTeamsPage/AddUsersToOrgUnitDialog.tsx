import FormAutocomplete from '../../components/ui/FormAutocomplete';
import React, { FC, useEffect, useState } from 'react';
import FormDialog from '../../components/Dialogs/FormDialog';
import { Button as MuiButton } from '@material-ui/core';
import Icon from '../../components/ui/Icon';
import FormControl from '../../components/ui/FormControl';
import useLoadDashBoardUsersForAutocomplete
  from '../SettingsPage/TabSubOrgs/hooks/useLoadDashboardUsersForAutocomplete';
import { useDebounce } from 'use-debounce';
import AutocompleteOptionUser from '../../components/Autocomplete/AutocompleteOptionUser';
import { useTranslation } from 'react-i18next';

const AddUsersToOrgUnitDialog: FC<Props> = (props) => {
  const { close, initialData, isOpen } = props;

  const [searchUsers, setSearchUsers] = useState('');
  const [searchUsersWithDelay] = useDebounce(searchUsers, 200);
  const { t } = useTranslation();

  const {
    users,
    loadingGetUsers,
    loadMore: loadMoreUsers,
    fetchMoreUsers
  } = useLoadDashBoardUsersForAutocomplete(searchUsersWithDelay, true);

  useEffect(() => {
    fetchMoreUsers({
      variables: {
        page: 0,
        perPage: 50,
        filter: { name: searchUsersWithDelay, isFree: true }
      }
    })

  }, [isOpen])

  const actions = [
    <MuiButton key="save" type="submit" color="primary" variant="contained">
      <div>
        <Icon icon="user-plus" size="1x" mr={10}/> {t('Add users')}
      </div>
    </MuiButton>
  ];

  const onSave = async (values: any) => {
    close({ data: values });
  };

  return (
    // @ts-ignore
    <FormDialog
      title={t('Add users')}
      onSubmit={onSave}
      actions={actions}
      onClose={close}
      {...props}
    >
      {() => {
        return (
          <div style={{ width: '550px'}}>
            <FormControl label={t('Add users (optional)')}>
              <FormAutocomplete
                name="users"
                loading={loadingGetUsers}
                multiple={true}
                placeholder={t('Select users')}
                options={users}
                inputOnChange={(value) => setSearchUsers(value)}
                getOptionLabel={(option) =>
                  option?.firstName + '' + option?.lastName
                }
                renderOption={AutocompleteOptionUser}
                getOptionValue={(option) => option?.id_}
                onScroll={() =>
                  loadMoreUsers(
                    (state: any) =>
                      state?.user?.dashboard?.pagedList?.items || users,
                    (state: any) => state.user?.dashboard?.pagedList?.pageInfo
                  )
                }
              />
            </FormControl>
          </div>
        );
      }}
    </FormDialog>
  );
};

export default AddUsersToOrgUnitDialog;

interface Props {
  close: Function,
  initialData: any,
  isOpen: boolean
}
