import React from 'react';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { pipe, toPairs, values, map } from 'ramda';
import { languagesAll, countries } from 'countries-list';
import { Select as RffSelect, Autocomplete as RffAutocomplete } from 'mui-rff';
import {
  Typography as MuiTypography,
  MenuItem as MuiMenuItem,
  Button as MuiButton,
  Grid as MuiGrid,
  CircularProgress,
} from '@material-ui/core';

import { actions as patientRecordActions } from 'services/patientRecord';
import { sexData } from 'lib/enums/sex';
import {
  FormTextField,
  FormControl,
  DatePicker,
  Input,
  Space,
  Icon,
} from 'components/ui';
import { formatISO } from 'date-fns';
import { useSet_Basic_InfoMutation } from '../../generated/graphql';
import { useTranslation } from 'react-i18next';

const Typography = ({ children, ...props }) => (
  <MuiTypography variant="h5" gutterBottom {...props}>
    {children}
  </MuiTypography>
);

function BasicInformationForm(props) {
  const { setEditMode, initialData } = props;

  const {
    id,
    lastName,
    firstName,
    birthDate,
    language,
    email,
    phone,
    sex,
    fullAddress,
  } = initialData;

  const dispatch = useDispatch();
  const [setBasicInfo, { loading }] = useSet_Basic_InfoMutation();
  const { t } = useTranslation();

  const onSubmit = async ({ email, phone, ...values }) => {
    const response = await setBasicInfo({
      variables: {
        id,
        ...values,
        address: {
          city: values.fullAddress.city,
          address: values.fullAddress.address,
          zipcode: values.fullAddress.zipcode,
          country: values.fullAddress.country,
        },
        birthDate:
          typeof values.birthDate === 'string'
            ? values.birthDate
            : formatISO(values?.birthDate, { representation: 'date' }),
      },
    });

    if (response.data?.user?.patientUser.update.ok) {
      dispatch(
        patientRecordActions.setBasicInformation({
          patientData: {
            ...initialData,
            ...values,
            birthDate:
              typeof values.birthDate === 'string'
                ? values.birthDate
                : formatISO(values?.birthDate, { representation: 'date' }),
          },
        })
      );
    }

    setEditMode(false);
  };

  const languagesArr = pipe(
    toPairs,
    map((item) => ({ code: item[0], name: item[1] }))
  )(languagesAll);

  const countriesArr = pipe(
    toPairs,
    map((item) => ({ code: item[0], name: item[1] }))
  )(countries);

  const initialValues = {
    email,
    phone,
    birthDate,
    firstName,
    lastName,
    sex,
    fullAddress,
    language,
  };

  return (
    <>
      {!loading ? (
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Space display="flex" justifyContent="space-between" mb={3}>
                <MuiTypography variant="h4">
                  <Icon icon="user-circle" size="1x" mr={10} />
                  {t('Basic information')}
                </MuiTypography>
                <Space size="small">
                  <MuiButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="small"
                  >
                    <Icon icon="check" mr={10} />
                    {t('Confirm')}
                  </MuiButton>
                </Space>
              </Space>

              <MuiGrid container spacing={3}>
                <MuiGrid item xs={4}>
                  <FormControl label={t('Image')}>
                    <FormTextField
                      name="image"
                      placeholder={t('Choose file')}
                    />
                  </FormControl>

                  <FormControl label={t('First name')}>
                    <FormTextField name="firstName" />
                  </FormControl>

                  <FormControl label={t('Last name')}>
                    <FormTextField name="lastName" />
                  </FormControl>

                  <FormControl label={t('Sex')}>
                    <RffSelect
                      variant="outlined"
                      size="small"
                      name="sex"
                      style={{ height: '32px' }}
                    >
                      {values(sexData).map((item, index) => (
                        <MuiMenuItem key={index} value={item.value}>
                          {item.label}
                        </MuiMenuItem>
                      ))}
                    </RffSelect>
                  </FormControl>
                </MuiGrid>
                <MuiGrid item xs={4}>
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
                        style={{ margin: '15px 0' }}
                      >
                        <Input
                          {...params}
                          placeholder={t('Type')}
                          variant="outlined"
                        />
                      </FormControl>
                    )}
                  />

                  <FormControl label={t('Email')}>
                    <FormTextField name="email" disabled />
                  </FormControl>
                </MuiGrid>
                <MuiGrid item xs={4}>
                  <FormControl label={t('Phone number')}>
                    <FormTextField name="phone" disabled />
                  </FormControl>

                  <FormControl label={t('Address')}>
                    <FormTextField
                      name="fullAddress.address"
                      placeholder={t('Street')}
                      mb={20}
                    />
                    <FormTextField
                      name="fullAddress.city"
                      placeholder={t('City')}
                      mb={20}
                    />
                    <FormTextField
                      name="fullAddress.zipcode"
                      placeholder={t('Postcode')}
                      mb={5}
                    />
                  </FormControl>

                  <RffAutocomplete
                    label=""
                    name="fullAddress.country"
                    variant="outlined"
                    options={countriesArr}
                    getOptionValue={(option) => option.code}
                    getOptionLabel={(option) => option.name.name}
                    renderInput={(params) => (
                      <FormControl fullWidth style={{ marginBottom: '15px' }}>
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
            </form>
          )}
        />
      ) : (
        <MuiGrid
          container
          justify="center"
          alignItems="center"
          style={{ height: '300px' }}
        >
          <CircularProgress />
        </MuiGrid>
      )}
    </>
  );
}

export default BasicInformationForm;
