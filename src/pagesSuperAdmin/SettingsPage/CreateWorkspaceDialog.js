import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button as MuiButton } from '@material-ui/core';
import { makeValidate } from 'mui-rff';

import { FormControl, FormTextField, Icon } from 'components/ui';
import FormDialog from 'components/Dialogs/FormDialog';
import { Grid as MuiGrid } from '@material-ui/core';
import useDialog from 'lib/hooks/useDialog';
import SetAvailabilitiesHoursDialog from 'pagesSuperAdmin/SettingsPage/SetAvailabilitiesHoursDialog';
import useFetch from 'use-http';
import { Autocomplete as RffAutocomplete } from 'mui-rff';
import { CircularProgress as MuiCircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object().shape({
  shortName: Yup.string().required('Required field'),
  fullName: Yup.string().required('Required field'),
  adminEmail: Yup.string().email().required('Required field'),
  adminPhoneNumber: Yup.string()
    .required('Required field')
    .matches(phoneRegExp, 'Phone number is not valid'),
  awsRegion: Yup.string().required('Required field'),
  hostAlias1: Yup.string().required('Required field'),
  hostAlias2: Yup.string().required('Required field'),
  password: Yup.string()
    .required('Required field')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      ' ,must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
});

const validate = makeValidate(schema);

const awsRegionsMockData = [
  {
    label: 'Europe(ireland)',
    value: 'eu-west-1',
  },
  {
    label: 'USA',
    value: 'us-west-1',
  },
  {
    label: 'Spain',
    value: 'eu-east-1',
  },
];

const CreateWorkspaceDialog = (props) => {
  const { close, onWorkspaceCreated } = props;

  const { post } = useFetch({ data: [] });

  const [isLoading, setIsLoading] = useState(false);
  const setAvailabilityHours = useDialog();
  const { t } = useTranslation();

  const onSave = async (values) => {
    setIsLoading(true);

    await post(`/superadmin/workspaces/`, {
      shortName: values.shortName,
      fullName: values.fullName,
      awsRegion: values.awsRegion,
      dbHosts: {
        hostAlias1: values.hostAlias1,
        hostAlias2: values.hostAlias2,
      },
      admin: {
        email: values.adminEmail,
        phoneNumber: `+${values.adminPhoneNumber}`,
        password: values.password,
      },
    });

    setIsLoading(false);

    onWorkspaceCreated(true);

    close({ data: values });
  };

  const actions = [
    <MuiButton key="save" type="submit" color="primary" variant="contained">
      {isLoading ? (
        <MuiCircularProgress
          color="white"
          style={{ width: '25px', height: '25px' }}
        />
      ) : (
        <>
          <Icon icon="user-plus" size="1x" mr={10} /> {t('Create workspace')}
        </>
      )}
    </MuiButton>,
  ];

  const initialValues = {
    shortName: '',
    fullName: '',
    adminEmail: '',
    adminPhoneNumber: '',
    awsRegion: '',
    hostAlias1: '',
    hostAlias2: '',
    password: '',
  };

  return (
    <>
      <FormDialog
        title={t('New workspace')}
        onSubmit={onSave}
        initialValues={initialValues}
        validate={validate}
        actions={actions}
        close={close}
        {...props}
      >
        {(values) => {
          return (
            <div>
              <FormControl label={t('Workspace name')}>
                <FormTextField
                  name="shortName"
                  placeholder={t('Workspace name')}
                />
              </FormControl>

              <FormControl label={t('Org unit')}>
                <MuiGrid container spacing={2} direction="column">
                  <MuiGrid item>
                    <FormTextField
                      name="fullName"
                      placeholder={t('Organization name')}
                    />
                  </MuiGrid>
                </MuiGrid>
              </FormControl>

              <RffAutocomplete
                label=""
                name="awsRegion"
                variant="outlined"
                options={awsRegionsMockData}
                getOptionValue={(option) => option?.value}
                getOptionLabel={(option) => option?.label}
                renderInput={(params) => (
                  <FormControl label={t('AWS Region')}>
                    <FormTextField
                      {...params}
                      name="awsRegion"
                      placeholder={t('Select region')}
                      style={{}}
                    />
                  </FormControl>
                )}
              />

              <FormControl label={t('DB Hosts')}>
                <MuiGrid container spacing={2} direction="column">
                  <MuiGrid item>
                    <FormTextField
                      name="hostAlias1"
                      placeholder={t('Host alias1')}
                    />
                  </MuiGrid>

                  <MuiGrid item>
                    <FormTextField
                      name="hostAlias2"
                      placeholder={t('Host alias2')}
                    />
                  </MuiGrid>
                </MuiGrid>
              </FormControl>

              <FormControl label={t('Admin email')}>
                <FormTextField
                  name="adminEmail"
                  placeholder="user@example.com"
                />
              </FormControl>

              <FormControl label={t('Admin phone number')}>
                <FormTextField
                  name="adminPhoneNumber"
                  placeholder="0812684415"
                />
              </FormControl>

              <FormControl label={t('Password')}>
                <FormTextField name="password" placeholder={t('Password')} />
              </FormControl>
            </div>
          );
        }}
      </FormDialog>

      <SetAvailabilitiesHoursDialog
        isOpen={setAvailabilityHours.isOpen}
        close={setAvailabilityHours.close}
        initialData={setAvailabilityHours.initialData}
      />
    </>
  );
};

export default CreateWorkspaceDialog;
