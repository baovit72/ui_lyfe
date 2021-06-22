import React from 'react';
import AuthenticationStackScreen from './navigators/authenticationstackscreen';
import HomeTabScreen from './navigators/hometabscreen';

import {NavigationContainer} from '@react-navigation/native';

export default () => {
  // return (
  //   <NavigationContainer>
  //     <AuthenticationStackScreen />
  //   </NavigationContainer>
  // );
  return (
    <NavigationContainer>
      <HomeTabScreen />
    </NavigationContainer>
  );
};
