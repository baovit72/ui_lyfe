import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabScreen from './hometabscreen';
import {View} from 'react-native';

const AuthenticationStack = createStackNavigator();

export default () => (
  <AuthenticationStack.Navigator initialRouteName="HomeTab">
    <AuthenticationStack.Screen
      options={{
        headerShown: false,
        animationEnabled: true,
        title: 'Lyfe',
        headerTitleStyle: {
          alignSelf: 'center',
          color: 'white',
          fontFamily: 'LemonJellyPersonalUse',
        },
        headerStyle: {
          backgroundColor: '#FF5B2D',
        },
      }}
      name="HomeTab"
      component={HomeTabScreen}></AuthenticationStack.Screen>
  </AuthenticationStack.Navigator>
);
