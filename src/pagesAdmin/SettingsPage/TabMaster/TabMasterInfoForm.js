import React from 'react';
import { Form } from 'react-final-form';
import {
  FormControl,
  FormTextField,
  Icon,
  IconButton,
  Input,
} from 'components/ui';
import { Button as MuiButton, Grid as MuiGrid } from '@material-ui/core';
import Card from 'components/Card';
import { Autocomplete as RffAutocomplete } from 'mui-rff';
import { map, pipe, toPairs } from 'ramda';
import { countries } from 'countries-list';
import { languages } from '../../../lib/enums/languages';
import FormFileUploader from 'components/ui/FormFileUploader';
import { useTranslation } from 'react-i18next';

function TabMasterInfoForm(props) {
  const { setEditMode, initialData, onEdit } = props;
  const { t } = useTranslation();

  const onSubmit = async (values) => {
    setEditMode(false);
    onEdit(values);
  };

  // const languagesArr = pipe(
  //   toPairs,
  //   map((item) => ({ code: item[0], name: item[1] }))
  // )(languagesAll);

  const countriesArr = pipe(
    toPairs,
    map((item) => ({ code: item[0], name: item[1] }))
  )(countries);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialData}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Card
            icon="info-circle"
            title={t('Organisation information')}
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
            <MuiGrid container spacing={3}>
              <MuiGrid item xs={6}>
                <FormControl label={t('Logo')}>
                  <FormFileUploader
                    name="logo"
                    placeholder={t('Choose file')}
                    withTitle
                  />
                </FormControl>

                <FormControl label={t('Organisation name')}>
                  <FormTextField
                    name="name"
                    placeholder={t('Organization name')}
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
                      <FormTextField
                        name="zipcode"
                        placeholder={t('Postcode')}
                      />
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

                <RffAutocomplete
                  label=""
                  name="language"
                  variant="outlined"
                  options={languages}
                  getOptionValue={(option) => option.code}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <FormControl
                      label={t('Default language')}
                      fullWidth
                      style={{ marginBottom: '15px' }}
                    >
                      <Input
                        {...params}
                        placeholder={t('Type')}
                        variant="outlined"
                      />
                    </FormControl>
                  )}
                />
              </MuiGrid>

              <MuiGrid item xs={6}>
                <FormControl label={t('Organisation email')}>
                  <FormTextField
                    name="email"
                    placeholder={t('Organisation email')}
                  />
                </FormControl>

                <FormControl label={t('Organisation phone number')}>
                  <FormTextField
                    name="phone"
                    placeholder={t('Organisation phone number')}
                  />
                </FormControl>

                <FormControl label={t('Organisation website')}>
                  <FormTextField
                    name="site"
                    placeholder={t('Organisation website')}
                  />
                </FormControl>

                <FormControl label={t('Facebook')}>
                  <FormTextField name="facebook" placeholder={t('Facebook')} />
                </FormControl>

                <FormControl label={t('LinkedIn')}>
                  <FormTextField name="linkedin" placeholder={t('LinkedIn')} />
                </FormControl>

                <FormControl label={t('Instagram')}>
                  <FormTextField
                    name="instagram"
                    placeholder={t('Instagram')}
                  />
                </FormControl>
              </MuiGrid>
            </MuiGrid>

            <FormControl label={t('Description')}>
              <FormTextField
                name="description"
                placeholder={t(
                  'Write a quick description of the organisation for the patients to see...'
                )}
                multiline
                rows={2}
              />
            </FormControl>
          </Card>
        </form>
      )}
    />
  );
}

export default TabMasterInfoForm;
