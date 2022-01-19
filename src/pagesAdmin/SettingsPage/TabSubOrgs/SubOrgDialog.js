import React, { useState } from 'react';
import * as Yup from 'yup';
import { makeValidate } from 'mui-rff';
import { Button as MuiButton, Grid as MuiGrid } from '@material-ui/core';

import { FormControl, FormTextField, Icon } from 'components/ui';
import { AutocompleteOptionUser, FormDialog } from 'components';
import FormAutocomplete from '../../../components/ui/FormAutocomplete/index';
import useLoadOrgUnitsForAutocomplete from './hooks/useLoadCareTeamsForAutocomplete';
import { useDebounce } from 'use-debounce';
import useLoadDashBoardUsersForAutocomplete from './hooks/useLoadDashboardUsersForAutocomplete';
import { Autocomplete as RffAutocomplete } from 'mui-rff';
import { map, pipe, toPairs } from 'ramda';
import { countries } from 'countries-list';
import Input from '../../../components/ui/Input';
import { useTranslation } from 'react-i18next';

const schema = Yup.object().shape({
  name: Yup.string().required('Required field'),
});

const validate = makeValidate(schema);

const SubOrgDialog = (props) => {
  const { close, isEditMode, initialData, setIsEditMode } = props;

  const [searchCareTeams, setSearchCareTeams] = useState('');
  const [searchCareTeamsWithDelay] = useDebounce(searchCareTeams, 200);

  const [searchUsers, setSearchUsers] = useState('');
  const [searchUsersWithDelay] = useDebounce(searchUsers, 200);
  const { t } = useTranslation();

  const {
    careTeams,
    loadMore,
    loadingCareTeams,
  } = useLoadOrgUnitsForAutocomplete(searchCareTeamsWithDelay);

  const {
    users,
    loadMore: loadMoreUsers,
    loadingGetUsers,
  } = useLoadDashBoardUsersForAutocomplete(searchUsersWithDelay);

  const onSave = (values) => {
    close({ data: values });
  };

  const onClose = () => {
    close();
    setTimeout(() => setIsEditMode(false), 150);
  };

  const countriesArr = pipe(
    toPairs,
    map((item) => ({ code: item[0], name: item[1] }))
  )(countries);

  const actions = [
    <MuiButton key="save" type="submit" color="primary" variant="contained">
      {isEditMode ? (
        <span>{t('Save changes')}</span>
      ) : (
        <>
          <Icon icon="user-plus" size="1x" mr={10} />{' '}
          {t('Create sub organization')}
        </>
      )}
    </MuiButton>,
  ];

  return (
    <FormDialog
      title={
        isEditMode ? t('Edit sub organization') : t('New sub organization')
      }
      onSubmit={onSave}
      initialValues={
        isEditMode
          ? {
              ...initialData?.values,
              address: initialData?.values?.fullAddress?.address,
              city: initialData?.values?.fullAddress?.city,
              country: initialData?.values?.fullAddress?.country,
              zipcode: initialData?.values?.fullAddress?.zipcode,
            }
          : { name: '' }
      }
      validate={validate}
      actions={actions}
      onClose={onClose}
      {...props}
    >
      {(values) => {
        return (
          <div>
            <FormControl label={t('Sub organization name')}>
              <FormTextField
                name="name"
                placeholder={t('Sub organization name')}
              />
            </FormControl>
            <FormControl label={t('Email (optional)')}>
              <FormTextField name="email" placeholder={t('Email')} />
            </FormControl>
            <FormControl label={t('Phone (optional)')}>
              <FormTextField name="phone" placeholder={t('Phone')} />
            </FormControl>
            <FormControl label={t('Web site (optional)')}>
              <FormTextField name="site" placeholder={t('Web site')} />
            </FormControl>
            <FormControl label={t('Address (optional)')}>
              <MuiGrid container spacing={2} direction="column">
                <MuiGrid item>
                  <FormTextField name="address" placeholder={t('Street')} />
                </MuiGrid>

                <MuiGrid item>
                  <FormTextField name="city" placeholder={t('City')} />
                </MuiGrid>

                <MuiGrid item>
                  <FormTextField name="zipcode" placeholder={t('Postcode')} />
                </MuiGrid>

                <MuiGrid item>
                  <RffAutocomplete
                    label=""
                    name="country"
                    variant="outlined"
                    options={countriesArr}
                    getOptionValue={(option) => option.code}
                    getOptionLabel={(option) => option.name.name}
                    renderInput={(params) => (
                      <FormControl fullWidth>
                        <Input
                          {...params}
                          placeholder={t('Type country name')}
                          variant="outlined"
                        />
                      </FormControl>
                    )}
                  />
                </MuiGrid>
              </MuiGrid>
            </FormControl>
            <FormControl label={t('Add care teams (optional)')}>
              <FormAutocomplete
                name="careTeams"
                multiple={true}
                loading={loadingCareTeams}
                placeholder={t('Type care team')}
                options={careTeams}
                filterOptions={(options, state) => {
                  return options.filter((careTeam) => {
                    return (
                      !careTeam?.subOrg?.id_ ||
                      careTeam?.subOrg?.id_ === initialData?.values?.id_
                    );
                  });
                }}
                getOptionLabel={(option) => option?.name}
                getOptionValue={(option) => option?.id_}
                // inputOnChange={(value) => setSearchCareTeams(value)}
                onScroll={() =>
                  loadMore(
                    (state) =>
                      state?.orgUnit?.careTeamPagination?.items || careTeams,
                    (state) => state.orgUnit?.careTeamPagination?.pageInfo
                  )
                }
              />
            </FormControl>
            {/*//Todo make search in autocomplete when it will be in BE*/}
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
            {/*//TODO make search in autocomplete when it will be in BE*/}
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

export default SubOrgDialog;
