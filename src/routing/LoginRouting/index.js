import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignInPage from 'pages/SignInPage';

function LoginRouting() {
  return (
    <Switch>
      <Route path="/">
        <SignInPage />
      </Route>
    </Switch>
  );
}

export default LoginRouting;
