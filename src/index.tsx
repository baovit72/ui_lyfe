import React, {createContext, useContext, useEffect, useReducer} from 'react';
import AuthenticationStackScreen from './navigators/authenticationstackscreen';
import HomeStackScreen from './navigators/homestackscreen';
import GlobalContext from './contexts/global.context';
import {NavigationContainer} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AsyncStorage, View} from 'react-native';
import {useTheme} from '@ui-kitten/components';
const {sendValidate} = require('./utils').default;
import Toast from 'react-native-toast-message';

interface IAction {
  type: string;
  payload: any;
}
export default () => {
  const theme = useTheme();
  const reducer = (state: any, action: IAction): any => {
    console.log(action);
    const {type, payload} = action;
    switch (type) {
      case 'AUTHENTICATE':
        const {user, token} = payload;
        AsyncStorage.setItem('token', token);
        console.log('authenticate', token);
        return {...state, user, token};
      case 'JOIN_GROUP':
        const {group} = payload;
        return {...state, group};
      case 'LOAD_BEGIN':
        return {...state, spinner: true};
      case 'LOAD_END':
        return {...state, spinner: false};
      case 'FIRST_LOAD_DONE':
        return {...state, firstLoad: false};
      default:
        return {...state};
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    token: '',
    spinner: false,
    firstLoad: true,
    group: null,
  });
  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch({type: 'LOAD_BEGIN', payload: {}});
      sendValidate(token)
        .then(data => {
          console.log('set token', token);
          dispatch({
            type: 'AUTHENTICATE',
            payload: {token: token, user: data.user},
          });
          dispatch({type: 'FIRST_LOAD_DONE', payload: {}});
          dispatch({type: 'LOAD_END', payload: {}});
        })
        .catch(e => {
          console.log(e);
          dispatch({type: 'FIRST_LOAD_DONE', payload: {}});
          dispatch({type: 'LOAD_END', payload: {}});
        });
    } else {
      dispatch({type: 'FIRST_LOAD_DONE', payload: {}});
    }
  }, []);
  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      <NavigationContainer>
        {state.firstLoad ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: theme['color-primary-400'],
            }}></View>
        ) : !state.user ? (
          <AuthenticationStackScreen />
        ) : (
          <HomeStackScreen />
        )}
        <Spinner visible={state.spinner}></Spinner>
        <Toast ref={ref => Toast.setRef(ref)} />
      </NavigationContainer>
    </GlobalContext.Provider>
  );
};
