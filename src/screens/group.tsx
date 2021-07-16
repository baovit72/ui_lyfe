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
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
const {isValidCode, createGroup, joinGroup} = require('../utils/index').default;

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
  // if (state.group) navigation.push('HomeTab');
  // if (state.group) return null;
  useEffect(() => {
    if (state.group) {
      navigation.push('HomeTab');
    }
  }, [state.group]);
  const code = getState('');

  const onCreateGroup = () => {
    dispatch({type: 'LOAD_BEGIN'});
    console.log(state);
    createGroup(state.token)
      .then((data: any) => {
        dispatch({type: 'LOAD_END'});
        console.log(data.data);
        if (data.errors) {
          Toast.show({
            type: 'error',
            text1: 'You are already in a group',
          });
        } else {
          dispatch({
            type: 'JOIN_GROUP',
            payload: {group: data.data.createGroup},
          });
          Toast.show({
            type: 'success',
            text1: 'Your group has been created successfully!',
          });
        }
      })
      .catch(e => {
        Toast.show({
          type: 'error',
          text1: 'You are already in a group',
        });
        console.log(e);
        dispatch({type: 'LOAD_END'});
      });
  };

  const onJoinGroup = () => {
    code.setInvalid(!isValidCode(code.value));
    if (isValidCode(code.value)) {
      dispatch({type: 'LOAD_BEGIN'});
      console.log(state);
      joinGroup(state.token, code.value)
        .then((data: any) => {
          dispatch({type: 'LOAD_END'});
          console.log(data.data);
          if (data.errors) {
            return Toast.show({
              type: 'error',
              text1: 'Join code not found',
            });
          }
          dispatch({
            type: 'JOIN_GROUP',
            payload: {group: data.data.joinGroup},
          });
          Toast.show({
            type: 'success',
            text1: 'You has joined the group successfully!',
          });
        })
        .catch(e => {
          Toast.show({
            type: 'error',
            text1: 'Join code not found',
          });
          console.log(e);
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
      <View
        style={{
          marginTop: Dimensions.get('window').height / 2 - 200,
        }}></View>

      <Button
        onPress={onCreateGroup}
        style={styles.loginButton}
        appearance="outline">
        Create group
      </Button>
      <View
        style={{
          borderTopWidth: 1,
          borderColor: 'rgba(0,0,0,0.1)',
          width: '70%',
          marginTop: 40,
          marginBottom: 20,
        }}>
        <Text
          style={{
            color: 'rgba(0,0,0,0.5)',
            fontSize: 10,
            paddingTop: 5,
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
          Already have a group code?
        </Text>
      </View>
      <Input
        maxLength={5}
        autoCapitalize="characters"
        style={styles.inputField}
        placeholder="Code"
        size="large"
        status={code.invalid && 'danger'}
        caption={
          code.invalid && (
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
                Code must be 5 letters
              </Text>
            </View>
          )
        }
        value={code.value}
        onChangeText={text => code.setValue(text)}
      />

      <Button
        style={styles.loginButton}
        appearance="outline"
        onPress={onJoinGroup}>
        Join this group
      </Button>
    </ImageBackground>
  );
};
