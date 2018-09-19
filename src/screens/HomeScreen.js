import React from 'react';
import { View, Button, StyleSheet, AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-splash-screen'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome to the app!',
    };
    
    componentDidMount(){
        SplashScreen.hide();
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Show me more of the app" onPress={this._showMoreApp} />
                <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            </View>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Other');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });