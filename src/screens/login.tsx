import React, {useState, useEffect, useContext} from 'react';
import {
  ApplicationProvider,
  Button,
  Icon,
  Layout,
  Text,
  Input,
} from '@ui-kitten/components';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
const {isValidUsername, isValidPassword, sendLogin} =
  require('../utils/index').default;

import GlobalContext from './../contexts/global.context';
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
  flexContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    // fontWeight: 'bold',
    marginBottom: 55,
    marginTop: 55,
    //COPYRIGHT
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

  const username = getState('');
  const password = getState('');
  const securePassword = getState(true);

  const login = () => {
    username.setInvalid(!isValidUsername(username.value));
    password.setInvalid(!isValidPassword(password.value));
    if (isValidUsername(username.value) && isValidPassword(password.value)) {
      dispatch({type: 'LOAD_BEGIN'});
      sendLogin(username.value, password.value)
        .then((data: any) => {
          dispatch({type: 'LOAD_END'});
          dispatch({
            type: 'AUTHENTICATE',
            payload: {token: data.token, user: data.user},
          });
        })
        .catch(e => {
          console.log(JSON.stringify(e));
          Toast.show({
            type: 'error',
            text1: 'Please check your username or password',
          });
          dispatch({type: 'LOAD_END'});
        });
    }
  };

  // useEffect(() => {
  //   usernameValidator.setValue(username.value.length > 0);
  // }, [username.value]);
  // useEffect(() => {
  //   passwordValidator.setValue(
  //     validator.isStrongPassword(password.value, {minLength: 8}),
  //   );
  // }, [password.value]);
  return (
    <ImageBackground
      source={require('../../assets/authback.png')}
      //   imageStyle={styles.backgroundImage}
      style={styles.background}>
      <Text style={styles.logoTitle} status="primary">
        Lyfe
      </Text>

      <Input
        autoCapitalize="none"
        style={styles.inputField}
        placeholder="Username"
        size="large"
        status={username.invalid && 'danger'}
        caption={
          username.invalid && (
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
                Username must not be empty
              </Text>
            </View>
          )
        }
        value={username.value}
        onChangeText={text => username.setValue(text)}
      />
      <Input
        autoCapitalize="none"
        style={styles.inputField}
        placeholder="Password"
        size="large"
        secureTextEntry={securePassword.value}
        status={password.invalid && 'danger'}
        value={password.value}
        accessoryRight={props => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => securePassword.setValue(!securePassword.value)}>
            <Icon
              {...props}
              name={
                securePassword.value ? 'eye-off-outline' : 'eye-outline'
              }></Icon>
          </TouchableOpacity>
        )}
        caption={
          password.invalid && (
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
                Password must be at least 8 letters
              </Text>
            </View>
          )
        }
        onChangeText={text => password.setValue(text)}
      />
      <Button style={styles.loginButton} onPress={login}>
        Login
      </Button>
      <Button
        onPress={() => {
          navigation.push('Forgot');
        }}
        style={styles.loginButton}
        appearance="ghost">
        Forgot password?
      </Button>
      <View style={styles.flexRow}>
        <Text style={styles.noAccountDesc}>Don't have an account?</Text>
        <Button
          onPress={() => {
            navigation.push('Signup');
          }}
          style={styles.signupButton}
          appearance="ghost">
          Sign Up
        </Button>
      </View>
    </ImageBackground>
  );
};
