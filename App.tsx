import React from 'react';

import ThemeContext from './src/contexts/theme.context';

import {ImageProps, StyleSheet} from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Entry from './src/index';
// require('dotenv').config();

const theme = require('./assets/theme.json');
// const HeartIcon = (
//   props?: Partial<ImageProps>,
// ): React.ReactElement<ImageProps> => <Icon {...props} name="heart" />;

export default (): React.ReactFragment => {
  const [themeMode, setThemeMode] = React.useState('light');

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{themeMode, setThemeMode}}>
        <ApplicationProvider {...eva} theme={{...eva[themeMode], ...theme}}>
          <Entry />
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
