import * as React from "react";
import App from "../App";
import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import { Root } from 'native-base';

Amplify.configure(aws_exports);

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
