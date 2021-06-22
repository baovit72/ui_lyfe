import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotCodeScreen from '../screens/forgot-code';
import ForgotPassScreen from '../screens/forgot-pass';

const ForgotStack = createStackNavigator();

export default () => (
  <ForgotStack.Navigator initialRouteName="forgotcode">
    <ForgotStack.Screen
      options={{
        headerShown: false,
        animationEnabled: true,
      }}
      name="forgotcode"
      component={ForgotCodeScreen}></ForgotStack.Screen>
    <ForgotStack.Screen
      options={{
        headerShown: false,
        animationEnabled: true,
      }}
      name="forgotpass"
      component={ForgotPassScreen}></ForgotStack.Screen>
  </ForgotStack.Navigator>
);
