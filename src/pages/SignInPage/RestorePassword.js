import React, { useState } from 'react';
import { Form } from 'react-final-form';
import {
  Typography as MuiTypography,
  Link as MuiLink,
  Box as MuiBox,
} from '@material-ui/core';

import SButton from './styled/SButton';
import SInput from './styled/SInput';
import { SCodeInput } from './styled/SCodeInput';
import { Icon, Typography } from 'components/ui';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { getUserPool } from 'userPool';
import { useSelector } from 'react-redux';
import { selectors as authSelectors } from 'services/auth';
import colors from 'lib/colors';
import { fade } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

function RestorePassword(props) {
  const { goBack } = props;
  const poolData = useSelector(authSelectors.getUserPoolIds);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [username, setUsername] = useState(false);
  const [code, setCode] = useState();
  const { t } = useTranslation();

  const checkCode = (values) => {
    setCode(values.code);
    setIsCodeSent(false);
  };

  const savePassword = (values) => {
    const user = new CognitoUser({
      Username: username,
      Pool: getUserPool({
        UserPoolId: poolData.userPoolId,
        ClientId: poolData.clientId,
      }),
    });

    user.confirmPassword(code, values.password, {
      onSuccess() {
        setIsPasswordSet(true);
      },
      onFailure(err) {
        console.log('Password not confirmed!');
      },
    });
  };

  function onSubmit(values) {
    const user = new CognitoUser({
      Username: values.username,
      Pool: getUserPool({
        UserPoolId: poolData.userPoolId,
        ClientId: poolData.clientId,
      }),
    });

    user.forgotPassword({
      onSuccess: function (data) {
        console.log('ForgotPassword success!');
      },
      onFailure: function (data) {
        console.log('Forgot password failed!');
      },
      inputVerificationCode: function (data) {
        setUsername(values.username);
        setIsCodeSent(true);
      },
    });
  }

  return isPasswordSet ? (
    <MuiBox display="flex" flexDirection="column" alignItems="center">
      <MuiTypography
        style={{ marginTop: '40px', marginBottom: '10px' }}
        variant="h1"
        align="center"
      >
        {t('Forgot your password')}
      </MuiTypography>
      <MuiTypography
        align="center"
        variant="h5"
        style={{ marginBottom: '48px' }}
        color="textSecondary"
      >
        {t('No worries, we will help you set up a new one!')}
      </MuiTypography>
      <div
        style={{
          backgroundColor: fade(colors.green400, 0.1),
          borderRadius: '50%',
          width: '70px',
          height: '70px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon icon="lock-alt" size="2x" style={{ color: colors.green400 }} />
      </div>
      <MuiTypography
        style={{ marginTop: '10px', marginBottom: '35px' }}
        variant="h5"
        align="center"
        color="textSecondary"
      >
        {t('Your new password has been set!')}
      </MuiTypography>
      <SButton onClick={goBack}>{t('Return to login')}</SButton>
    </MuiBox>
  ) : (
    <Form
      onSubmit={isCodeSent ? checkCode : code ? savePassword : onSubmit}
      initialValues={{ code: '', username: '' }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <MuiBox display="flex" flexDirection="column" alignItems="center">
            <MuiTypography
              style={{ marginTop: '40px', marginBottom: '10px' }}
              variant="h1"
              align="center"
            >
              {t('Forgot your password')}
            </MuiTypography>

            <MuiTypography
              align="center"
              variant="h5"
              style={{ marginBottom: '48px' }}
              color="textSecondary"
            >
              {t('No worries, we will help you set up a new one!')}
            </MuiTypography>

            {isCodeSent && !code && (
              <>
                <Typography
                  color="textSecondary"
                  align="center"
                  variant="h5"
                  mb={2}
                >
                  {t('Enter the verification code')}
                </Typography>
                <SCodeInput name="code" autoFocus={true} />
                <SButton type="submit">{t('Next')}</SButton>
              </>
            )}
            {!isCodeSent && !code && (
              <>
                <SInput
                  placeholder={t('Email or phone number')}
                  name="username"
                />
                <MuiTypography
                  color="textSecondary"
                  align="center"
                  variant="h5"
                  gutterBottom
                >
                  {t('We will send you a verification code')}
                </MuiTypography>
                <SButton type="submit">{t('Next')}</SButton>
              </>
            )}

            {code && (
              <>
                <SInput
                  placeholder={t('New password')}
                  name="password"
                  type="password"
                />
                <SButton type="submit">{t('Save password')}</SButton>
              </>
            )}

            <MuiLink
              color="primary"
              style={{ fontSize: '16px', fontWeight: '600' }}
              onClick={goBack}
            >
              {t('Cancel')}
            </MuiLink>
          </MuiBox>
        </form>
      )}
    />
  );
}

export default RestorePassword;
