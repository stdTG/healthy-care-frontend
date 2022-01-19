import React from 'react';
import * as Yup from 'yup';
import useFetch from 'use-http';
import { makeValidate } from 'mui-rff';
import { Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import {
  Typography as MuiTypography,
  Button as MuiButton,
  Box as MuiBox,
} from '@material-ui/core';

import { actions as authActions } from 'services/auth';
import SInput from './styled/SInput';
import { useTranslation } from 'react-i18next';

const schema = Yup.object().shape({
  workspace: Yup.string().required(),
});
const validate = makeValidate(schema);

function SelectWorkspace() {
  const dispatch = useDispatch();
  const { get, response, error } = useFetch({ data: [] });
  const { t } = useTranslation();

  const onSubmit = async (values) => {
    const data = await get(`/workspace/${values.workspace}`);

    if (response.ok) {
      const { userPoolId, clientId } = data;

      if (userPoolId === '') {
        console.log('Got empty userPool ID');
        return;
      }

      dispatch(
        authActions.setWorkspace({
          workspace: values.workspace,
          userPoolId,
          clientId,
        })
      );
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ workspace: '' }}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <MuiBox textAlign="center">
            <MuiTypography
              style={{ marginTop: '40px', marginBottom: '10px' }}
              variant="h1"
              align="center"
            >
              {t('Welcome to Alakin')}
            </MuiTypography>
            <MuiTypography
              align="center"
              variant="h5"
              style={{ marginBottom: '48px' }}
              color="textSecondary"
            >
              {t('Sign in to your workspace')}
            </MuiTypography>

            <SInput
              autoFocus={true}
              placeholder={t('your_workspace')}
              name="workspace"
            />
            <MuiButton
              type="submit"
              color="primary"
              variant="contained"
              style={{
                borderRadius: '18px',
                width: '166px',
                display: 'block',
                margin: 'auto',
              }}
            >
              {t('Continue')}
            </MuiButton>

            {error && (
              <MuiTypography
                align={'center'}
                color="textSecondary"
                style={{ marginTop: '10px' }}
              >
                {error && t('Try again')}
              </MuiTypography>
            )}
          </MuiBox>
        </form>
      )}
    />
  );
}

export default SelectWorkspace;
