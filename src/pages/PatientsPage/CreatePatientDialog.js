import React from 'react';
import * as Yup from 'yup';
import { values as getValues } from 'ramda';
import { Button as MuiButton } from '@material-ui/core';
import {
  makeValidate,
  Checkboxes as RffCheckboxes,
  Radios as RffRadios,
} from 'mui-rff';

import { DatePicker, FormTextField, FormControl, Icon } from 'components/ui';
import FormDialog from 'components/Dialogs/FormDialog';
import { sexData } from 'lib/enums/sex';
import { formatISO } from 'date-fns';
import { useTranslation } from 'react-i18next';

const schema = Yup.object().shape({
  firstName: Yup.string().required('Required field'),
  lastName: Yup.string().required('Required field'),
  email: Yup.string().email('Enter a valid email ').required('Required'),
  birthDate: Yup.date().nullable().required('Required'),
  sex: Yup.string().required('Required'),
});

const validate = makeValidate(schema);

function CreatePatientDialog(props) {
  const { close } = props;
  const { t } = useTranslation();

  const initialValues = {
    birthDate: new Date(),
  };
  const onSave = (values) => {
    const newValues = {
      ...values,
      birthDate: formatISO(values.birthDate, { representation: 'date' }),
    };
    close({ data: newValues });
  };

  const actions = [
    <MuiButton key="save" type="submit" color="primary" variant="contained">
      <Icon icon="user-plus" size="1x" mr={10} /> Create patient
    </MuiButton>,
  ];

  return (
    <FormDialog
      title={t('New patient')}
      onSubmit={onSave}
      initialValues={initialValues}
      validate={validate}
      actions={actions}
      onClose={close}
      {...props}
    >
      {(values) => {
        return (
          <div>
            <FormControl label={t('First name')}>
              <FormTextField name="firstName" placeholder="John" />
            </FormControl>

            <FormControl label={t('Last name')}>
              <FormTextField name="lastName" placeholder="Doe" />
            </FormControl>

            <FormControl label={t('Date of birth')}>
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
            </FormControl>

            <FormControl label={t('Sex')}>
              <RffRadios
                name="sex"
                data={getValues(sexData)}
                radioGroupProps={{ row: true }}
              />
            </FormControl>

            <FormControl label={t('Email')}>
              {/*TODO checkbox should be available when email is filled*/}
              <FormTextField name="email" placeholder="user@email.com" />
              <RffCheckboxes
                name="sendEmail"
                disabled={!values.email}
                data={[
                  {
                    label: t('Send email invitation'),
                    value: 'sendEmail',
                    disabled: !values.email,
                  },
                ]}
              />
            </FormControl>

            <FormControl label={t('Phone number')}>
              {/*TODO checkbox should be available when email is filled*/}
              <FormTextField name="phone" placeholder="0123456789" />
              <RffCheckboxes
                name="sendSms"
                disabled={!values.phone}
                data={[
                  {
                    label: t('Send SMS invitation'),
                    value: 'sendSms',
                    disabled: !values.phone,
                  },
                ]}
              />
            </FormControl>
          </div>
        );
      }}
    </FormDialog>
  );
}

export default CreatePatientDialog;
