import React, {useState, useEffect, useContext} from 'react';
import {
  ApplicationProvider,
  Button,
  Icon,
  Layout,
  Text,
  Input,
} from '@ui-kitten/components';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import global from '../contexts/global.context';
import GlobalContext from '../contexts/global.context';
import Toast from 'react-native-toast-message';

const {
  sendSignup,
  isValidName,
  isValidPassword,
  isValidEmail,
  sendRestore,
  isValidUsername,
} = require('../utils').default;

/**
 * Stylesheet for the component
 */
const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    padding: 5,
    resizeMode: 'cover',
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
    flex: 1,
  },
  inputField: {
    marginBottom: 10,
    width: '90%',
    borderRadius: 15,
  },
  loginButton: {
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowColor: '#FFEAD5',
    width: '90%',
    borderRadius: 15,
    marginBottom: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
  },
  forgotButton: {
    width: '90%',
    borderRadius: 15,
  },
  logoTitle: {
    fontSize: 85,
    marginBottom: 55,
    marginTop: 55,
    fontFamily: 'LemonJellyPersonalUse',
  },
  noAccountDesc: {
    color: 'gray',
  },
  signupButton: {},
  grayText: {},
});

interface IProp {
  navigation: any;
}
const getState = (defValue: any) => {
  const [value, setValue] = useState(defValue);
  const [invalid, setInvalid] = useState(false);
  return {value, setValue, invalid, setInvalid};
};

export default ({navigation}: IProp) => {
  const {state, dispatch} = useContext(GlobalContext);
  const email = getState('');
  const restore = () => {
    email.setInvalid(!isValidEmail(email.value));
    if (isValidEmail(email.value)) {
      dispatch({type: 'LOAD_BEGIN'});
      sendRestore(email.value)
        .then((data: any) => {
          dispatch({type: 'LOAD_END'});
          Toast.show({
            type: 'success',
            text1:
              "We've sent you an email, please follow the instructions to restore your password!",
            autoHide: false,
          });
        })
        .catch(e => {
          Toast.show({
            type: 'error',
            text1: "Email doesn't exist",
          });
          dispatch({type: 'LOAD_END'});
        });
    }
  };
  return (
    <ImageBackground
      source={require('../../assets/authback.png')}
      //   imageStyle={styles.backgroundImage}
      style={styles.background}>
      <Text style={styles.logoTitle} status="primary">
        Lyfe
      </Text>
      <Input
        status={email.invalid && 'danger'}
        caption={
          email.invalid && (
            <View>
              <Text
                style={{
                  color: 'red',
                  paddingTop: 5,
                  paddingLeft: 10,
                  textAlign: 'center',
                  fontSize: 10,
                  fontStyle: 'italic',
                }}>
                Email must be valid
              </Text>
            </View>
          )
        }
        autoCapitalize="none"
        style={styles.inputField}
        placeholder="Email"
        size="large"
        value={email.value}
        onChangeText={text => email.setValue(text)}
      />
      <Button style={styles.loginButton} onPress={restore}>
        Restore my password
      </Button>
      <Button
        onPress={() => {
          navigation.push('Login');
        }}
        appearance="ghost">
        Log In
      </Button>
    </ImageBackground>
  );
};
