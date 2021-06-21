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
  },
  loginButton: {
    width: '100%',
  },
});

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ImageBackground
      source={require('../../assets/authback.png')}
      //   imageStyle={styles.backgroundImage}
      style={styles.background}>
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
    </ImageBackground>
  );
};
