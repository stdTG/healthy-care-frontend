import { Form } from 'react-final-form';
import { Box as MuiBox, Typography as MuiTypography } from '@material-ui/core';
import React, { FC } from 'react';
import { makeValidate } from 'mui-rff';
import { schema } from '../../validation/cardVaccines';
import { DatePicker, FormControl, FormTextField } from '../../../../components/ui';
import { AddButton } from '../../../../components';
import { useTranslation } from 'react-i18next';

const validate = makeValidate(schema);

const VaccineForm: FC<Props> = ({ isCreateMode, onAdd, onEdit, values, loading }) => {
  const initialValues = {
    name: null,
    date: new Date()
  };

  const { t } = useTranslation();
  const edit = (values: any) => onEdit && onEdit(values)
  const add = (values: any) => onAdd && onAdd(values)

  return (
    <Form
      onSubmit={isCreateMode ? add : edit}
      initialValues={isCreateMode ? initialValues : { ...values }}
      validate={validate}
      render={({ handleSubmit, invalid }) => (
        <form>
          <MuiBox mb={2}>
            <MuiTypography variant="h5">
              {isCreateMode ? t('Add a vaccine') : t('Edit a vaccine')}
            </MuiTypography>
          </MuiBox>
          <FormControl>
            <FormTextField name="name" placeholder={`${t('Name')}...`}/>
          </FormControl>
          <FormControl>
            <DatePicker
              required={true}
              name="date"
              id="date-picker-dialog"
              placeholder={`${t('Done on')}...`}
              format="dd/MM/yyyy"
              openTo="year"
              variant="inline"
              disableFuture={true}
              KeyboardButtonProps={{
                'aria-label': 'change date of start'
              }}
              inputVariant="outlined"
            />
          </FormControl>

          <MuiBox display="flex" justifyContent="flex-end">
            <AddButton
              onClick={handleSubmit}
              disabled={invalid || loading}
              title={isCreateMode ? t('Add vaccine') : t('Save changes')}
              type="submit"
              loading={loading}
            />
          </MuiBox>
        </form>
      )}
    />
  );
};

export default VaccineForm
interface Props {
  isCreateMode: boolean
  onAdd?: (values: any) => void
  onEdit?: (values: any) => void
  values?: any
  loading: boolean
}
