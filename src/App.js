import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

import HomeScreen from './screens/HomeScreen';
import OtherScreen from './screens/OtherScreen';
import SignInScreen from './screens/SignInScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
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