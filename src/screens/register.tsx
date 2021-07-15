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
import global from '../contexts/global.context';
import GlobalContext from '../contexts/global.context';
import Toast from 'react-native-toast-message';

const {
  sendSignup,
  isValidName,
  isValidPassword,
  isValidEmail,
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
  const name = getState('');
  const email = getState('');
  const securePassword = getState(true);

  const signup = () => {
    username.setInvalid(!isValidUsername(username.value));
    password.setInvalid(!isValidPassword(password.value));
    name.setInvalid(!isValidName(name.value));
    email.setInvalid(!isValidEmail(email.value));
    if (
      isValidUsername(username.value) &&
      isValidPassword(password.value) &&
      isValidName(name.value) &&
      isValidEmail(email.value)
    ) {
      dispatch({type: 'LOAD_BEGIN'});
      sendSignup(name.value, username.value, email.value, password.value)
        .then((data: any) => {
          dispatch({type: 'LOAD_END'});
          Toast.show({
            type: 'success',
            text1: 'Your account has been created successfully!',
          });
          navigation.push('Login');
        })
        .catch(e => {
          console.log(e);
          console.log(e.response);
          const data = e.response.data;
          Toast.show({
            type: 'error',
            text1:
              data.duplicate &&
              data.duplicate[0].toUpperCase() +
                data.duplicate.slice(1) +
                ' has been taken!',
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
        status={name.invalid && 'danger'}
        caption={
          name.invalid && (
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
                Name must not be empty
              </Text>
            </View>
          )
        }
        style={styles.inputField}
        placeholder="Name"
        size="large"
        value={name.value}
        onChangeText={text => name.setValue(text)}
      />
      <Input
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
        autoCapitalize="none"
        style={styles.inputField}
        placeholder="Username"
        size="large"
        value={username.value}
        onChangeText={text => username.setValue(text)}
      />
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

      <Input
        status={password.invalid && 'danger'}
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
        secureTextEntry={securePassword.value}
        autoCapitalize="none"
        style={styles.inputField}
        placeholder="Password"
        size="large"
        value={password.value}
        onChangeText={text => password.setValue(text)}
      />
      <Button style={styles.loginButton} onPress={signup}>
        Signup
      </Button>
      <View style={styles.flexRow}>
        <Text style={styles.noAccountDesc}>Already have an account?</Text>
        <Button
          style={styles.signupButton}
          onPress={() => {
            navigation.push('Login');
          }}
          appearance="ghost">
          Log In
        </Button>
      </View>
    </ImageBackground>
  );
};
