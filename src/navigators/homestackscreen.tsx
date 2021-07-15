import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabScreen from './hometabscreen';
import {View} from 'react-native';
import GroupScreen from '../screens/group';

const AuthenticationStack = createStackNavigator();

export default () => (
  <AuthenticationStack.Navigator initialRouteName="Group">
    <AuthenticationStack.Screen
      options={{
        headerShown: false,
        animationEnabled: true,
      }}
      name="Group"
      component={GroupScreen}></AuthenticationStack.Screen>
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
