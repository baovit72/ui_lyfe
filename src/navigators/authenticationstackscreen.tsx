import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login';
// import Register from '../screens/register';
const AuthenticationStack = createStackNavigator();

export default () => (
  <AuthenticationStack.Navigator>
    <AuthenticationStack.Screen
      name="Login"
      component={LoginScreen}></AuthenticationStack.Screen>
  </AuthenticationStack.Navigator>
);
