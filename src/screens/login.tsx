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
    justifyContent: 'center',
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
  },
  forgotButton: {
    width: '90%',
    borderRadius: 15,
  },
  logoTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  signupButton: {},
  grayText: {},
});

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        placeholder="Username"
        size="large"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <Input
        style={styles.inputField}
        placeholder="Password"
        size="large"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button style={styles.loginButton}>Login</Button>
      <Button style={styles.loginButton} appearance="ghost">
        Forgot password?
      </Button>
      <View style={styles.flexRow}>
        <Text>Don't have an account?</Text>
        <Button style={styles.signupButton} appearance="ghost">
          Sign Up
        </Button>
      </View>
    </ImageBackground>
  );
};
