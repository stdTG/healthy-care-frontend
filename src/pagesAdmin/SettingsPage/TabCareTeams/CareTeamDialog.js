import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button as MuiButton } from '@material-ui/core';
import { makeValidate } from 'mui-rff';
import { FormControl, FormTextField, Icon } from 'components/ui';
import { AutocompleteOptionUser, FormDialog } from 'components';
import useLoadDashBoardUsersForAutocomplete from '../../SettingsPage/TabSubOrgs/hooks/useLoadDashboardUsersForAutocomplete';
import { useDebounce } from 'use-debounce';
import FormAutocomplete from '../../../components/ui/FormAutocomplete/index';
import useLoadSubOrgsForAutocomplete from './hooks/useLoadSubOrgsForAutocomplete';
import { useTranslation } from 'react-i18next';

const schema = Yup.object().shape({
  name: Yup.string().required('Required field'),
});

const validate = makeValidate(schema);

const CareTeamDialog = (props) => {
  const { close, initialData, isEditMode, setIsEditMode, isOpen } = props;

  const [searchSubOrgs, setSearchSubOrgs] = useState('');
  const [searchSubOrgsWithDelay] = useDebounce(searchSubOrgs, 200);

  const {
    subOrgs,
    loadingGetSubOrg,
    loadMore: loadMoreSubOrgs,
  } = useLoadSubOrgsForAutocomplete(searchSubOrgsWithDelay);

  const [searchUsers, setSearchUsers] = useState('');
  const [searchUsersWithDelay] = useDebounce(searchUsers, 200);

  const {
    users,
    loadingGetUsers,
    loadMore: loadMoreUsers,
  } = useLoadDashBoardUsersForAutocomplete(searchUsersWithDelay);

  const { t } = useTranslation();

  const onSave = async (values, form) => {
    close({ data: values });
    form.pauseValidation();
    setTimeout(() => setIsEditMode(false), 150);
  };

  const onClose = () => {
    close();
    setTimeout(() => setIsEditMode(false), 150);
  };

  const actions = [
    <MuiButton key="save" type="submit" color="primary" variant="contained">
      {isEditMode ? (
        t('Save changes')
      ) : (
        <div>
          <Icon icon="user-plus" size="1x" mr={10} /> {t('Create care team')}
        </div>
      )}
    </MuiButton>,
  ];

  return (
    <FormDialog
      title={isEditMode ? t('Edit care team') : t('New care team')}
      onSubmit={onSave}
      validate={validate}
      actions={actions}
      initialValues={
        isEditMode
          ? {
              ...initialData?.values,
            }
          : {}
      }
      onClose={onClose}
      {...props}
    >
      {(values) => {
        return (
          <div>
            <FormControl label={t('Care team name')}>
              <FormTextField name="name" placeholder={t('Care team name')} />
            </FormControl>

            <FormControl label={t('Select a sub organizations (optional)')}>
              <FormAutocomplete
                name="subOrg"
                loading={loadingGetSubOrg}
                placeholder={t('Select sub organization')}
                options={subOrgs}
                getOptionLabel={(option) => option?.name}
                getOptionValue={(option) => option?.id_}
                // inputOnChange={(value) => setSearchSubOrgs(value)}
                onScroll={() =>
                  loadMoreSubOrgs(
                    (state) =>
                      state?.orgUnit?.subOrgPagination?.items || subOrgs,
                    (state) => state.orgUnit?.subOrgPagination?.pageInfo
                  )
                }
              />
            </FormControl>

            <FormControl label={t('Add users (optional)')}>
              <FormAutocomplete
                name="users"
                loading={loadingGetUsers}
                multiple={true}
                placeholder={t('Select users')}
                options={users}
                // inputOnChange={(value) => setSearchUsers(value)}
                getOptionLabel={(option) =>
                  option?.firstName + '' + option?.lastName
                }
                renderOption={AutocompleteOptionUser}
                getOptionValue={(option) => option?.id_}
                onScroll={() =>
                  loadMoreUsers(
                    (state) =>
                      state?.user?.dashboard?.pagedList?.items || users,
                    (state) => state.user?.dashboard?.pagedList?.pageInfo
                  )
                }
              />
            </FormControl>

            <FormControl label={t('Assign a supervisor role (optional)')}>
              <FormAutocomplete
                name="supervisors"
                loading={loadingGetUsers}
                multiple={true}
                placeholder={t('Select users')}
                options={users}
                // inputOnChange={(value) => setSearchUsers(value)}
                getOptionLabel={(option) =>
                  option?.firstName + '' + option?.lastName
                }
                renderOption={AutocompleteOptionUser}
                getOptionValue={(option) => option?.id_}
                onScroll={() =>
                  loadMoreUsers(
                    (state) =>
                      state?.user?.dashboard?.pagedList?.items || users,
                    (state) => state.user?.dashboard?.pagedList?.pageInfo
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

export default CareTeamDialog;
