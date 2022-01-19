import React from 'react';
import { Provider } from 'use-http';
import { useSelector } from 'react-redux';

import { selectors as authSelectors } from 'services/auth';
import config from 'config';

function FetchProvider(props) {
  const accessToken = useSelector(authSelectors.getAccessToken);
  const workspace = useSelector(authSelectors.getWorkspace);

  const fetchOptions = {
    interceptors: {
      request: async ({ options, url, path, route }) => {
        options.headers['Content-Type'] = `application/json`;
        // options.headers['Authorization'] = accessToken || '';
        // options.headers['Api-Token'] = 'e5925a9ca2f93256f34287cb403a4ca0e966a495';

        return options;
      },
      response: async ({ response }) => {
        const res = response;
        return res;
      },
    },
  };

  return (
    <Provider
      url={
        process.env.NODE_ENV === 'development'
          ? config.API_HOST_DEV
          : config.API_HOST
      }
      options={fetchOptions}
      {...props}
    />
  );
}

export default FetchProvider;
