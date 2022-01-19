import React, { useState, useContext } from 'react';
import * as Yup from 'yup';
import {
  Button as MuiButton,
  Grid as MuiGrid,
  Box as MuiBox,
} from '@material-ui/core';
import { makeValidate } from 'mui-rff';

import { Icon, Avatar, Typography } from 'components/ui';
import FormAutocomplete from '../../../components/ui/FormAutocomplete/index';
import useLoadOrgUnitsForAutocomplete from './hooks/useLoadOrgUnitForAutocomplete';
import { useDebounce } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { roles } from './UsersTable';
import FormDialog from '../styled/FormDialog';
import { languages } from 'lib/enums/languages';
import { ConfirmDeleteDialogContext } from 'routing';
import { FormTextField, FormControl, DatePicker, Input } from 'components/ui';
import PhoneInput from 'react-phone-input-2';
import { Select as RffSelect, Autocomplete as RffAutocomplete } from 'mui-rff';
import { countries, languagesAll } from 'countries-list';
import { map, pipe, toPairs, values } from 'ramda';
import Upload from 'pages/PatientRecordPage/components/UploadFile';
import { Field } from 'react-final-form';

const schema = Yup.object().shape({
  firstName: Yup.string().required('Required field'),
  lastName: Yup.string().required('Required field'),
  email: Yup.string().email('Enter a valid email ').required('Required field'),
  role: Yup.string().required('Required field').nullable(),
});

const userRoles = Object.keys(roles);

const validate = makeValidate(schema);

const getFormattedRole = (role) => {
  if (roles[role]) {
    return roles[role];
  }
  return role;
};

function Select({ name, options, label, placeholder }) {
  return (
    <RffAutocomplete
      label=""
      name={name}
      variant="outlined"
      options={options}
      getOptionValue={(option) => option}
      getOptionLabel={(option) => getFormattedRole(option)}
      renderInput={(params) => (
        <FormControl label={label} fullWidth>
          <Input {...params} placeholder={placeholder} variant="outlined" />
        </FormControl>
      )}
    />
  );
}

function UserDialog(props) {
  const {
    close,
    initialData,
    isEditMode,
    setIsEditMode,
    isOpen,
    onDelete,
  } = props;

  const [searchCareTeams, setSearchCareTeams] = useState('');
  const [searchSubOrgs, setSearchSubOrgs] = useState('');

  const [searchCareTeamsWithDelay] = useDebounce(searchCareTeams, 500);
  const [searchSubOrgsWithDelay] = useDebounce(searchSubOrgs, 500);
  const { t } = useTranslation();

  const { open: openConfirmDeleteDialog } = useContext(
    ConfirmDeleteDialogContext
  );

  const onSave = async (values, form) => {
    const data = {
      ...values,
      sendEmail: values.hasOwnProperty('email'),
      sendSms: values.hasOwnProperty('phone'),
    };

    close({ data });

    form.pauseValidation();
    setTimeout(() => setIsEditMode(false), 150);
  };

  const onClose = () => {
    close();
    setTimeout(() => setIsEditMode(false), 150);
  };

  const {
    careTeams,
    subOrgs,
    fetchMoreCareTeams,
    fetchMoreSubOrgs,
    loadMore,
    loadingCareTeams,
    loadingSubOrgs,
  } = useLoadOrgUnitsForAutocomplete(
    searchCareTeamsWithDelay,
    searchSubOrgsWithDelay
  );

  const getCareTeamsBySubOrg = (id) => {
    return subOrgs?.find((subOrg) => subOrg.id_ === id)?.careTeams;
  };

  const initialValues = !isEditMode
    ? { subOrg: '' }
    : {
        ...initialData?.values,
        email: initialData?.values?.byEmail?.email,
        phone: initialData?.values?.byPhone?.phone,
        careTeam:
          initialData?.values?.orgUnit?.__typename === 'CareTeam'
            ? initialData?.values?.orgUnit?.id_
            : '',
        subOrg:
          (initialData?.values?.orgUnit?.__typename === 'SubOrganization' &&
            initialData?.values?.orgUnit?.id_) ||
          initialData?.values?.orgUnit?.subOrg?.id_,
      };

  const languagesArr = pipe(
    toPairs,
    map((item) => ({ code: item[0], name: item[1] }))
  )(languagesAll);

  return (
    <FormDialog
      onSubmit={onSave}
      validate={validate}
      onClose={onClose}
      initialValues={initialValues}
      maxWidth="md"
      {...props}
    >
      {(values, { form }) => {
        const language = values.language
          ? languages.find((l) => l.code === values.language)
          : '';
        return (
          <MuiBox paddingLeft={5} paddingRight={3}>
            <MuiBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <div>
                <Icon icon="user-circle" size="1x" mr={10} />
                {t('Manage User')}
              </div>
              <MuiBox display="flex">
                {isEditMode && (
                  <>
                    <MuiBox mr={2}>
                      <MuiButton color="primary" variant="contained">
                        {t('Send message')}
                      </MuiButton>
                    </MuiBox>
                    <MuiBox mr={2}>
                      <MuiButton
                        color="primary"
                        variant="contained"
                        onClick={() => {
                          openConfirmDeleteDialog?.({
                            dialogTitle: t('Delete user'),
                            dialogWarningMessage: t(
                              'Do you want remove this user?'
                            ),
                          }).then(
                            ({ isDeleted }) =>
                              isDeleted && onDelete && onDelete(values.id_)
                          );
                        }}
                      >
                        {t('Delete user')}
                      </MuiButton>
                    </MuiBox>
                  </>
                )}
                <MuiBox>
                  <MuiButton type="submit" color="primary" variant="contained">
                    <Icon icon="check" size="1x" mr={10} />
                    {t('Confirm')}
                  </MuiButton>
                </MuiBox>
              </MuiBox>
            </MuiBox>
            <MuiGrid container alignItems="center" spacing={4}>
              <MuiGrid item xs={3}>
                <MuiBox display="inline-block">
                  <MuiGrid item xs={6}>
                    <MuiBox
                      display="flex"
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                    >
                      <Upload />
                    </MuiBox>
                  </MuiGrid>
                  <MuiBox marginTop={2}>
                    <FormControl label={t('First Name')}>
                      <FormTextField name="firstName" />
                    </FormControl>
                    <FormControl label={t('Last Name')}>
                      <FormTextField name="lastName" />
                    </FormControl>
                    <Select
                      name="role"
                      options={userRoles}
                      label={t('Role')}
                      placeholder={t('Select the role')}
                    />
                  </MuiBox>
                </MuiBox>
              </MuiGrid>
              <MuiGrid item xs={9}>
                <MuiGrid container items="center" spacing={4}>
                  <MuiGrid item xs={4}>
                    {isEditMode && (
                      <MuiBox
                        display="flex"
                        flexDirection="column"
                        height="100%"
                      >
                        <FormControl label={t('Status')}>
                          <FormTextField name="status" />
                        </FormControl>
                      </MuiBox>
                    )}
                  </MuiGrid>
                  <MuiGrid item xs={4}>
                    <MuiBox display="flex" flexDirection="column" height="100%">
                      <FormControl label={t('Email')}>
                        <FormTextField name="email" />
                      </FormControl>
                    </MuiBox>
                  </MuiGrid>
                  <MuiGrid item xs={4}>
                    <Typography variant="body1" color="textSecondary">
                      {t('Sub organization')}
                    </Typography>
                    <FormAutocomplete
                      name="subOrg"
                      loading={loadingSubOrgs}
                      disabled={
                        values.careTeam &&
                        (values.subOrg === '' ||
                          !values.hasOwnProperty('subOrg'))
                      }
                      placeholder={t('Type sub organization')}
                      options={subOrgs}
                      getOptionLabel={(option) => option?.name}
                      getOptionValue={(option) => option?.id_}
                      onChange={() => {
                        form?.change('careTeam', '');
                      }}
                      onScroll={() =>
                        loadMore(
                          'subOrg',
                          (variables) => fetchMoreSubOrgs(variables),
                          (state) =>
                            state?.orgUnit?.subOrgPagination?.items || subOrgs,
                          (state) => state.orgUnit?.subOrgPagination?.pageInfo
                        )
                      }
                    />
                  </MuiGrid>
                  <MuiGrid item xs={4}>
                    {isEditMode && (
                      <MuiBox
                        display="flex"
                        flexDirection="column"
                        height="100%"
                      >
                        <Typography variant="body1" color="textSecondary">
                          {t('Member since')}
                        </Typography>
                        <MuiBox display="flex" alignItems="center" flexGrow={1}>
                          <Typography variant="body1">
                            {values.memberSince
                              ? format(values.memberSince, 'dd/MM/yy')
                              : ''}
                          </Typography>
                        </MuiBox>
                      </MuiBox>
                    )}
                  </MuiGrid>
                  <MuiGrid item xs={4}>
                    <MuiBox display="flex" flexDirection="column" height="100%">
                      <FormControl label={t('Phone number')}>
                        <Field name="phone">
                          {({ input }) => (
                            <PhoneInput
                              {...input}
                              country={'fr'}
                              inputStyle={{
                                width: '100%',
                                height: 32,
                                borderRadius: 10,
                              }}
                              buttonStyle={{
                                background: 'white',
                                borderTopLeftRadius: 10,
                                borderBottomLeftRadius: 10,
                                borderRight: 'none',
                              }}
                            />
                          )}
                        </Field>
                      </FormControl>
                    </MuiBox>
                  </MuiGrid>
                  <MuiGrid item xs={4}>
                    <Typography variant="body1" color="textSecondary">
                      {t('Care team')}
                    </Typography>
                    <FormAutocomplete
                      name="careTeam"
                      loading={loadingCareTeams}
                      placeholder={t('Type care team')}
                      options={
                        getCareTeamsBySubOrg(values?.subOrg) || careTeams
                      }
                      getOptionLabel={(option) => option?.name}
                      getOptionValue={(option) => option?.id_}
                      inputOnChange={(value) => setSearchCareTeams(value)}
                      onScroll={() =>
                        loadMore(
                          'careTeam',
                          (variables) => fetchMoreCareTeams(variables),
                          (state) =>
                            state?.orgUnit?.careTeamPagination?.items ||
                            careTeams,
                          (state) => state.orgUnit?.careTeamPagination?.pageInfo
                        )
                      }
                    />
                  </MuiGrid>
                </MuiGrid>
              </MuiGrid>
              <MuiGrid item xs={9}>
                <FormControl label={t('Description')}>
                  <FormTextField name="description" />
                </FormControl>
              </MuiGrid>
              <MuiGrid item xs={3}>
                <MuiGrid container items="center" spacing={3}>
                  <MuiGrid item xs={12}>
                    <MuiBox display="flex" flexDirection="column" height="100%">
                      <Typography>{t('Date of birth')}</Typography>
                      <DatePicker
                        name="birthDate"
                        id="date-picker-dialog"
                        placeholder="dd/mm/yyyy"
                        format="dd/MM/yyyy"
                        openTo="year"
                        variant="inline"
                        disableFuture={true}
                        KeyboardButtonProps={{
                          'aria-label': 'change date of birth',
                        }}
                        inputVariant="outlined"
                      />
                    </MuiBox>
                  </MuiGrid>
                  <MuiGrid item xs={12}>
                    <MuiBox display="flex" flexDirection="column" height="100%">
                      <RffAutocomplete
                        label=""
                        name="language"
                        variant="outlined"
                        options={languagesArr}
                        getOptionValue={(option) => option.code}
                        getOptionLabel={(option) => option.name.name}
                        renderInput={(params) => (
                          <FormControl
                            label={t('Preferred language')}
                            fullWidth
                          >
                            <Input
                              {...params}
                              placeholder={t('Type')}
                              variant="outlined"
                            />
                          </FormControl>
                        )}
                      />
                    </MuiBox>
                  </MuiGrid>
                </MuiGrid>
              </MuiGrid>
            </MuiGrid>
          </MuiBox>
        );
      }}
    </FormDialog>
  );
}

export default UserDialog;
