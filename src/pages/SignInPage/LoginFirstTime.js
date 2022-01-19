import React from 'react';
import { Form } from 'react-final-form';
import {
  Box as MuiBox,
  Link as MuiLink,
  Typography as MuiTypography,
} from '@material-ui/core';
import SInput from 'pages/SignInPage/styled/SInput';
import { Checkboxes as RffCheckboxes } from 'mui-rff';
import SButton from 'pages/SignInPage/styled/SButton';
import { useTranslation } from 'react-i18next';

function LoginFirstTime(props) {
  const { workspace, setNewPassword } = props;
  const { t } = useTranslation();

  const onSubmit = (values) => {
    if (values.password !== values.confirm_password) {
      return;
    }
    setNewPassword.close(values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ confirm_password: '', password: '' }}
      // validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <MuiBox display="flex" flexDirection="column" alignItems="center">
            <MuiTypography
              style={{ marginTop: '40px', marginBottom: '10px' }}
              variant="h1"
              align="center"
            >
              {t('Sign in to')} {workspace}
            </MuiTypography>

            <MuiTypography
              align="center"
              variant="h5"
              style={{ marginBottom: '48px' }}
              color="textSecondary"
            >
              {t(
                'As it is the first time you log into your account, please set a password'
              )}
            </MuiTypography>

            <SInput
              type="password"
              placeholder={t('Password')}
              name="password"
            />
            <SInput
              type="password"
              placeholder={t('Confirm your password')}
              name="confirm_password"
            />

            <RffCheckboxes
              name="isAgreeTerms"
              size="small"
              data={[
                {
                  label: (
                    <MuiTypography variant="subtitle2">
                      {t('I agree to the')}
                      <MuiLink color="primary"> {t('terms')} </MuiLink>
                      {t('and')}
                      <MuiLink color="primary"> {t('privacy')} </MuiLink>
                      {t('policy')}
                    </MuiTypography>
                  ),
                  value: true,
                },
              ]}
            />

            <SButton type="submit">{t('Sign in')}</SButton>
          </MuiBox>
        </form>
      )}
    />
  );
}

export default LoginFirstTime;
