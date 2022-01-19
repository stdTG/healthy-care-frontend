import React, { useState } from 'react';
import { Form } from 'react-final-form';

import { FormControl, FormTextField, Input } from 'components/ui';
import { Autocomplete as AC, AutocompleteOptionUser, Button } from 'components';
import { Autocomplete as RffAutocomplete } from 'mui-rff';
import { isEmpty, map, pipe, toPairs } from 'ramda';
import { countries } from 'countries-list';
import useRequest from 'pagesAdmin/SettingsPage/TabSubOrgs/hooks/useRequest';
import { useTranslation } from 'react-i18next';

function EditCard(props) {
  const { saveChanges } = props;
  const { onGetData, usersArr } = useRequest();
  const [usersList, setUsersList] = useState([]);
  const { t } = useTranslation();

  const countriesArr = pipe(
    toPairs,
    map((item) => ({ code: item[0], name: item[1] }))
  )(countries);

  const onSave = (values) => {
    saveChanges({
      site: values.site,
      name: values.name,
      email: values.email,
      phone: values.phone,
      fullAddress: values.fullAddress,
      supervisors: usersList.map((item) => item.id_),
    });
  };

  return (
    <Form
      initialValues={props.data}
      onSubmit={onSave}
      render={({ handleSubmit, values }) => (
        <>
          <FormControl label={t('Sub organization name')} style>
            <FormTextField name="name" placeholder={t('Name')} />
          </FormControl>

          <FormControl label={t('Email')}>
            <FormTextField name="email" placeholder={t('Email')} />
          </FormControl>

          <FormControl label={t('Phone')}>
            <FormTextField name="phone" placeholder={t('Phone')} />
          </FormControl>

          <FormControl label={t('Web site')}>
            <FormTextField name="site" placeholder={t('Web site')} />
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

          <FormControl label={t('Supervisor')}>
            <AC
              multiple
              name="supervisors"
              placeholder={t('Choose supervisor')}
              options={usersArr}
              renderOption={AutocompleteOptionUser}
              getOptionLabel={(option) =>
                isEmpty(option) ? '' : option.firstName + ' ' + option.lastName
              }
              value={usersList}
              onChange={setUsersList}
            />
          </FormControl>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              title={t('Save changes')}
              type="submit"
              icon="check"
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
    />
  );
}

export default EditCard;
