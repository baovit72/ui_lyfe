import React from 'react';
import AuthenticationStackScreen from './navigators/authenticationstackscreen';

import {NavigationContainer} from '@react-navigation/native';

export default () => {
  return (
    <NavigationContainer>
      <AuthenticationStackScreen />
    </NavigationContainer>
  );
};
