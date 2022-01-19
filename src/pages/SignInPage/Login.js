import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Form } from 'react-final-form';
import { makeValidate } from 'mui-rff';
import { useFetch } from 'use-http';
import * as Yup from 'yup';
import {
  Typography as MuiTypography,
  Link as MuiLink,
  Box as MuiBox,
} from '@material-ui/core';

import { getUserPool } from 'userPool.js';
import {
  actions as authActions,
  selectors as authSelectors,
} from 'services/auth';
import SInput from './styled/SInput';
import { Icon } from 'components/ui';
import SButton from './styled/SButton';
import LoginFirstTime from './LoginFirstTime';
import useDialog from 'lib/hooks/useDialog';
import config from 'config';
import { useTranslation } from 'react-i18next';

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});
const validate = makeValidate(schema);

function SignInPage(props) {
  const { restorePassword } = props;

  const workspace = useSelector(authSelectors.getWorkspace);
  const dispatch = useDispatch();
  const poolData = useSelector(authSelectors.getUserPoolIds);
  const [error, setError] = useState(null);
  const setNewPassword = useDialog();
  const { t } = useTranslation();

  // const { get, post, response, error: getSendbirdError } = useFetch(
  //   `https://api-${config.SENDBIRD_APP_ID}.sendbird.com/v3/users`,
  //   (globalOptions) => {
  //     globalOptions.headers['Api-Token'] =
  //       'e5925a9ca2f93256f34287cb403a4ca0e966a495';
  //     return globalOptions;
  //   }
  // );

  function onSubmit(values) {
    const user = new CognitoUser({
      Username: values.username,
      Pool: getUserPool({
        UserPoolId: poolData.userPoolId,
        ClientId: poolData.clientId,
      }),
    });

    const authDetails = new AuthenticationDetails({
      Username: values.username,
      Password: values.password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (data) => {
        //TODO remove post when back is connected

        // const sendbirdData = await post(null, {
        //   user_id: values.username,
        //   issue_session_token: true,
        //   nickname: '',
        //   profile_url: ''
        // });

        // const sendbirdData = await get(values.username);

        const sendbirdData = await fetch(
          'https://alakine.backend.staging.ignilife.com/sendbird/dashboard-user/auth',
          {
            headers: {
              workspace: 'ignilife',
              Authorization: `Bearer ${data.getAccessToken().getJwtToken()}`,
            },
          }
        );

        if (sendbirdData) {
          sendbirdData
            .json()
            .then((response) =>
              dispatch(authActions.setSendbirdData({ ...response }))
            );
        }

        // if (response.ok) {
        //   console.log('Sendbird user data', sendbirdData);
        // }

        dispatch(
          authActions.login({
            username: values.username,
            userProfile: data.getAccessToken().payload,
            accessToken: data.getAccessToken().getJwtToken(),
            sendbirdSessionTokens: sendbirdData.session_tokens,
          })
        );
      },
      onFailure: (err) => {
        setError(err.message);
      },
      newPasswordRequired: async (userAttributes, data) => {
        delete userAttributes.email_verified;

        const result = await setNewPassword.open(userAttributes);

        user.completeNewPasswordChallenge(result.password, userAttributes, {
          onSuccess: (data) => {
            dispatch(
              authActions.login({
                username: values.username,
                userProfile: data.getAccessToken().payload,
                accessToken: data.getAccessToken().getJwtToken(),
              })
            );
          },
          onFailure: (err) => {
            console.log('Set new password failed', err);
          },
        });
      },
    });
  }

  return setNewPassword.isOpen ? (
    <LoginFirstTime workspace={workspace} setNewPassword={setNewPassword} />
  ) : (
    <Form
      onSubmit={onSubmit}
      initialValues={{ username: '', password: '' }}
      // validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <MuiBox display="flex" flexDirection="column" alignItems="center">
            <MuiTypography
              style={{ marginTop: '40px', marginBottom: '10px' }}
              variant="h1"
              align="center"
            >
              {t('Sign in to Alakine')}
            </MuiTypography>

            {error ? (
              <MuiTypography
                align="center"
                color="error"
                style={{ marginBottom: '48px' }}
              >
                {error}
              </MuiTypography>
            ) : (
              <MuiTypography
                align="center"
                variant="h5"
                style={{ marginBottom: '48px' }}
                color="textSecondary"
              >
                {t('You are registered with')} <b>{workspace}</b>
              </MuiTypography>
            )}
            <SInput
              autoFocus={true}
              placeholder={t('Email or phone number')}
              name="username"
            />
            <SInput
              type="password"
              placeholder={t('Password')}
              name="password"
            />
            <SButton type="submit">{t('Sign in')}</SButton>

            <MuiLink
              color="primary"
              style={{ fontSize: '16px', fontWeight: '600' }}
              onClick={restorePassword}
            >
              <Icon icon="lock-alt" className="icon" mr={10} />
              {t('Forgot your password')}
            </MuiLink>
          </MuiBox>
        </form>
      )}
    />
  );
}

export default SignInPage;
