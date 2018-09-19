import React from 'react';
import { View, Button, StyleSheet, AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    componentDidMount(){
        SplashScreen.hide();
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Sign in!" onPress={this._signInAsync} />
            </View>
        );
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });