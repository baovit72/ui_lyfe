import React, {createContext, useContext, useReducer} from 'react';
import AuthenticationStackScreen from './navigators/authenticationstackscreen';
import HomeStackScreen from './navigators/homestackscreen';

import {NavigationContainer} from '@react-navigation/native';

interface IAction {
  type: string;
  payload: any;
}
export default () => {
  const reducer = (state: any, action: IAction): any => {
    const {type, payload} = action;
    switch (type) {
      case 'AUTHENTICATE':
        const {user: any} = payload;
        return {...state, user};
      default:
        return {...state};
    }
  };
  const [state, dispatch] = useReducer(reducer, {user: null});
  const GlobalContext = createContext({state, dispatch});

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      <NavigationContainer>
        {state.user ? <AuthenticationStackScreen /> : <HomeStackScreen />}
      </NavigationContainer>
    </GlobalContext.Provider>
  );
};
