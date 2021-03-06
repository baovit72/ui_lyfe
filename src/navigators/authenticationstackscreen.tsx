import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import SignupScreen from '../screens/register';

import ForgotStackScreen from './forgotstackscreen';

const AuthenticationStack = createStackNavigator();

export default () => (
  <AuthenticationStack.Navigator initialRouteName="Login">
    <AuthenticationStack.Screen
      options={{
        headerShown: false,
        animationEnabled: true,
      }}
      name="Signup"
      component={SignupScreen}></AuthenticationStack.Screen>
    <AuthenticationStack.Screen
      options={{
        headerShown: false,
        animationEnabled: true,
      }}
      name="Login"
      component={LoginScreen}></AuthenticationStack.Screen>
    <AuthenticationStack.Screen
      options={{
        headerShown: false,
        animationEnabled: true,
      }}
      name="Forgot"
      component={ForgotStackScreen}></AuthenticationStack.Screen>
  </AuthenticationStack.Navigator>
);
