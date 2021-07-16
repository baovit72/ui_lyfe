import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabScreen from './hometabscreen';
import {View} from 'react-native';
import GroupScreen from '../screens/group';
import GlobalContext from '../contexts/global.context';

const AuthenticationStack = createStackNavigator();

export default () => {
  const {state, dispatch} = useContext(GlobalContext);
  return (
    <AuthenticationStack.Navigator
      initialRouteName={state.group ? 'HomeTab' : 'Group'}>
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
};
