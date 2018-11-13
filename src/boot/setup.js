import * as React from "react";
import App from "../App";
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';
import { Root } from 'native-base';
import { graphql, ApolloProvider, compose } from 'react-apollo';
import ApolloClient from 'apollo-boost';

Amplify.configure(aws_exports);

import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://172.24.76.20:8080/graphql"
});

export default class Setup extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Root>
          <App />
        </Root>
      </ApolloProvider>
    );
  }
}
