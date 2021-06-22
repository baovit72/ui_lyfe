import React, {useState, useEffect} from 'react';
import {
  ApplicationProvider,
  Button,
  Icon,
  Layout,
  Text,
  Input,
} from '@ui-kitten/components';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';

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

export default ({navigation}: IProp) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  return (
    <ImageBackground
      source={require('../../assets/authback.png')}
      //   imageStyle={styles.backgroundImage}
      style={styles.background}>
      <Text style={styles.logoTitle} status="primary">
        Lyfe
      </Text>
      <Input
        style={styles.inputField}
        placeholder="Email"
        size="large"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      {/* <Input
        style={styles.inputField}
        placeholder="Code"
        size="large"
        value={code}
        onChangeText={text => setCode(text)}
      /> */}
      <Button
        style={styles.loginButton}
        onPress={() => {
          navigation.push('forgotpass');
        }}>
        Send code
      </Button>
    </ImageBackground>
  );
};
