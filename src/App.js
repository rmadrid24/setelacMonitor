import React from 'react';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import OtherScreen from './screens/OtherScreen';
import SignInScreen from './screens/SignInScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import Sidebar from './screens/Sidebar';

const AppStack = createDrawerNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: "Home",
		contentComponent: props => <Sidebar {...props} />
  }
);
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);