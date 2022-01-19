import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  concat,
  HttpLink,
} from '@apollo/client';
import config from 'config';

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? config.API_HOST_DEV + '/graphql'
      : config.API_HOST + '/graphql',
});

const getAuthMiddleware = (accessToken, workspace) =>
  new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        ['Content-Type']: `application/json`,
        ['Authorization']: 'Bearer ' + accessToken,
        ['Workspace']: workspace,
      },
    });

    return forward(operation);
  });

const getClient = (accessToken, workspace) =>
  new ApolloClient({
    link: concat(getAuthMiddleware(accessToken, workspace), httpLink),
    cache: new InMemoryCache({ addTypename: false }),
    connectToDevTools: true,
  });

export default getClient;
