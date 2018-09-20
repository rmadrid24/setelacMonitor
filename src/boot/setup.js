import * as React from "react";
import App from "../App";
import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import { Root } from 'native-base';
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { graphql, ApolloProvider, compose } from 'react-apollo';
import AppSyncConfig from '../AppSync';
import { Auth } from 'aws-amplify';

Amplify.configure(aws_exports);

const client = new AWSAppSyncClient({
  url: AppSyncConfig.graphqlEndpoint,
  region: AppSyncConfig.region,
  auth: {
    type: AppSyncConfig.authenticationType,
    apiKey: AppSyncConfig.apiKey,
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken(),
  }
});


export default class Setup extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Root>
        <App />
      </Root>
    );
  }
}
