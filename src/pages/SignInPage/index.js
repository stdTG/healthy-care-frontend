import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors as authSelectors } from 'services/auth';
import { Box as MuiBox, Container as MuiContainer } from '@material-ui/core';

import { Typography } from 'components/ui';
import SLogoContainer from 'pages/SignInPage/styled/SLogo';
// import { ReactComponent as Logo } from 'lib/icons/logo.svg';
import RestorePassword from './RestorePassword';
import SelectWorkspace from './SelectWorkspace';
import Login from './Login';
import { useTranslation } from 'react-i18next';
import logo from 'lib/icons/logo.png';

const Logo = () => <img src={logo} width={80} height={80} />;

function SignInPage() {
  const workspace = useSelector(authSelectors.getWorkspace);
  const [isRestorePasswordForm, setIsRestorePassword] = useState(false);
  const { t } = useTranslation();

  const Content = () => {
    if (!workspace) {
      return <SelectWorkspace />;
    }
    if (isRestorePasswordForm) {
      return <RestorePassword goBack={() => setIsRestorePassword(false)} />;
    }

    return <Login restorePassword={() => setIsRestorePassword(true)} />;
  };

  return (
    <>
      <Typography variant="subtitle1" color="textSecondary">
        Version 0.111
      </Typography>
      <MuiContainer style={{ paddingTop: '155px' }}>
        <MuiBox style={{ textAlign: 'center' }}>
          {/* <SLogoContainer> */}
          <Logo />
          {/* </SLogoContainer> */}
        </MuiBox>

        <Content />
      </MuiContainer>
    </>
  );
}

export default SignInPage;
