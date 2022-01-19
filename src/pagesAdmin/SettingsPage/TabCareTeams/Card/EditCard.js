import React, { useState, useEffect } from 'react';
import { Form } from 'react-final-form';

import { FormControl, FormTextField, Input } from 'components/ui';
import { AutocompleteOption, AutocompleteOptionUser, Button } from 'components';
import useRequest from '../hooks/useRequest';
import { Autocomplete as RffAutocomplete } from 'mui-rff';
import { useTranslation } from 'react-i18next';

const EditCard = (props) => {
  const { id, initialValues, saveChanges } = props;
  const { onGetData } = useRequest();
  const [usersArr, setUsersArr] = useState([]);
  const [subOrgsArr, setSubOrgArr] = useState([]);
  const { t } = useTranslation();

  async function onEdit() {
    const response = await onGetData();

    if (response) {
      setSubOrgArr(response.subOrgsArr);
      setUsersArr(response.usersArr);
    }
  }

  useEffect(() => {
    onEdit();
  }, []);

  const onSave = (values) => {
    saveChanges({
      ...values,
      id_: id,
      subOrgId: values.subOrg,
      supervisors: values.supervisors,
    });
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSave}
      render={({ handleSubmit, values }) => {
        return (
          <>
            <FormControl label={t('Full name')}>
              <FormTextField name="name" />
            </FormControl>

            <FormControl label={t('Sub organisation')}>
              <RffAutocomplete
                label=""
                name="subOrg"
                options={subOrgsArr}
                variant="outlined"
                getOptionValue={(option) => option.id_}
                getOptionLabel={(option) => option.name}
                renderOption={AutocompleteOption}
                renderInput={(params) => (
                  <FormControl fullWidth style={{ marginBottom: '15px' }}>
                    <Input
                      {...params}
                      placeholder={t('Choose sub organisation')}
                      variant="outlined"
                    />
                  </FormControl>
                )}
              />
            </FormControl>

            <FormControl label={t('Supervisor')}>
              <RffAutocomplete
                multiple
                label=""
                name="supervisors"
                options={usersArr}
                variant="outlined"
                getOptionValue={(option) => option.id_}
                getOptionLabel={(option) =>
                  option.firstName + ' ' + option.lastName
                }
                renderOption={AutocompleteOptionUser}
                renderInput={(params) => (
                  <FormControl fullWidth style={{ marginBottom: '15px' }}>
                    <Input
                      {...params}
                      placeholder={t('Choose supervisor')}
                      variant="outlined"
                    />
                  </FormControl>
                )}
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
        );
      }}
    />
  );
};

export default EditCard;
