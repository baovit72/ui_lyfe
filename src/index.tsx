import React from 'react';
import AuthenticationStackScreen from './navigators/authenticationstackscreen';
import HomeStackScreen from './navigators/homestackscreen';

import {NavigationContainer} from '@react-navigation/native';

export default () => {
  // return (
  //   <NavigationContainer>
  //     <AuthenticationStackScreen />
  //   </NavigationContainer>
  // );
  return (
    <NavigationContainer>
      <HomeStackScreen />
    </NavigationContainer>
  );
};
