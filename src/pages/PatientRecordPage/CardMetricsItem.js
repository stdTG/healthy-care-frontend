import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Typography as MuiTypography,
  Divider as MuiDivider,
  Box as MuiBox,
} from '@material-ui/core';

import {
  DatePicker,
  FormControl,
  FormTextField,
  IconButton,
} from 'components/ui';
import { Form } from 'react-final-form';
import { metricTypesData } from 'lib/enums/metrics';
import { makeValidate } from 'mui-rff';
import { schema } from './validation/cardMetricsItem';
import { useTranslation } from 'react-i18next';

const validate = makeValidate(schema);

function CardMetricsItem(props) {
  let submit;
  const { item, saveItem } = props;
  const [isEditMode, setEditMode] = useState();
  const { t } = useTranslation();

  const save = (values) => {
    saveItem({ ...item, ...values });
  };

  const editItem = (event) => {
    setEditMode(!isEditMode);

    if (isEditMode) {
      submit(event);
    }
  };

  return (
    <>
      {isEditMode ? (
        <Form
          onSubmit={save}
          initialValues={{
            value: item.value,
            date: new Date(item.date),
          }}
          validate={validate}
          render={({ values, handleSubmit, invalid }) => {
            submit = handleSubmit;
            return (
              <MuiBox
                justifyContent="space-between"
                display="flex"
                key={item.id}
                my={2}
              >
                <div>
                  <FormControl>
                    <FormTextField name="value" placeholder={t('Value')} />
                  </FormControl>
                  <FormControl>
                    <DatePicker
                      name="date"
                      id="date-picker-dialog"
                      placeholder="dd/mm/yyyy"
                      format="dd/MM/yyyy"
                      openTo="year"
                      variant="inline"
                      disableFuture={true}
                      KeyboardButtonProps={{
                        'aria-label': 'change date of start',
                      }}
                      inputVariant="outlined"
                    />
                  </FormControl>
                </div>
                <IconButton
                  onClick={editItem}
                  disabled={invalid}
                  color="primary"
                  icon="check"
                />
              </MuiBox>
            );
          }}
        />
      ) : (
        <MuiBox
          justifyContent="space-between"
          display="flex"
          key={item.id}
          my={2}
        >
          <div>
            <MuiTypography>
              {item.value} {metricTypesData[item.code].measure}
            </MuiTypography>
            <MuiTypography gutterBottom>
              {format(item.date, 'MMM do yyyy')}
            </MuiTypography>
          </div>
          <IconButton icon="pen" color="primary" onClick={editItem} />
        </MuiBox>
      )}
      <MuiDivider />
    </>
  );
}

export default CardMetricsItem;
