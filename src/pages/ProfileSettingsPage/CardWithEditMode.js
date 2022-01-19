import React from 'react';
import { Button as MuiButton, Grid as MuiGrid } from '@material-ui/core';

import { FormControl, FormTextField, Icon, Input } from 'components/ui';
import { Card } from 'components';
import FormSelect from 'components/ui/FormSelect';
import FormFileUploader from 'components/ui/FormFileUploader';
import FormDatePicker from 'components/ui/FormDatePickerAntd';
import { Autocomplete as RffAutocomplete } from 'mui-rff';
import { map, pipe, toPairs } from 'ramda';
import { countries } from 'countries-list';
import { genders } from 'lib/enums/genders';
import { languages } from 'lib/enums/languages';
import { speciality } from 'lib/enums/speciality';
import { useTranslation } from 'react-i18next';

function CardWithEditMode(props) {
  const { handleSubmit, values } = props;
  const { t } = useTranslation();

  const countriesArr = pipe(
    toPairs,
    map((item) => ({ code: item[0], name: item[1] }))
  )(countries);

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Card
          icon="user-circle"
          title={t('Edit your profile')}
          EditButton={
            <MuiButton
              variant="contained"
              color="primary"
              type="submit"
              size="small"
            >
              <Icon icon="check" mr={10} />
              {t('Confirm')}
            </MuiButton>
          }
        >
          <MuiGrid container spacing={4}>
            <MuiGrid
              container
              item
              xs={4}
              alignItems="center"
              direction="column"
            >
              <FormControl label={t('Image')}>
                <FormFileUploader name="image" withTitle />
              </FormControl>

              <FormControl label={t('First name')}>
                <FormTextField name="firstName" placeholder={t('First name')} />
              </FormControl>

              <FormControl label={t('Last name')}>
                <FormTextField name="lastName" placeholder={t('Last name')} />
              </FormControl>

              <FormControl label={t('Speciality')}>
                <FormSelect
                  name="speciality"
                  options={speciality}
                  getItemId={(item) => item.value}
                  getItemName={(item) => item.name}
                />
              </FormControl>
            </MuiGrid>

            <MuiGrid
              container
              item
              xs={4}
              alignItems="center"
              direction="column"
            >
              <FormControl label={t('Date of birth')}>
                <FormDatePicker name="birthDate" />
              </FormControl>

              <FormControl label={t('Sex')}>
                <FormSelect
                  name="sex"
                  options={genders}
                  getItemId={(item) => item.value}
                  getItemName={(item) => item.name}
                />
              </FormControl>

              <FormControl label={t('Preferred language')}>
                <FormSelect
                  name="language"
                  options={languages}
                  getItemId={(item) => item.id}
                  getItemName={(item) => item.name}
                />
              </FormControl>
              <FormControl label={t('Email')}>
                <FormTextField name="email" placeholder={t('Email')} disabled />
              </FormControl>
            </MuiGrid>

            <MuiGrid
              container
              item
              xs={4}
              alignItems="center"
              direction="column"
            >
              <FormControl label={t('Phone number')}>
                <FormTextField
                  name="phoneNumber"
                  placeholder={t('Phone number')}
                  disabled
                />
              </FormControl>

              <FormControl label={t('Address')}>
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
            </MuiGrid>
          </MuiGrid>
          <MuiGrid item>
            <FormTextField
              name="description"
              placeholder={t('Description')}
              multiline
            />
          </MuiGrid>
        </Card>
      </form>
    </>
  );
}

export default CardWithEditMode;
