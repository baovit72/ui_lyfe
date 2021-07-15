import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import SignupScreen from '../screens/register';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  useTheme,
} from '@ui-kitten/components';
import ForgotStackScreen from './forgotstackscreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import EmotjShare from '../screens/emotjshare';
import DiaryScreen from '../screens/diary';
import ChatRoom from '../screens/chatroom';
import Profile from '../screens/profile';
import {View} from 'react-native';

const HomeIcon = (props: any) => <Icon {...props} name="home-outline" />;

const MessageIcon = (props: any) => (
  <Icon {...props} name="message-square-outline" />
);
const ImageIcon = (props: any) => <Icon {...props} name="image-outline" />;

const PersonIcon = (props: any) => <Icon {...props} name="person-outline" />;

const HomeTabs = createMaterialBottomTabNavigator();
interface IProp {
  navigation: any;
  state: any;
}
const BottomTabBar = ({navigation, state}: IProp) => (
  <BottomNavigation
    style={{
      paddingTop: 20,
      paddingBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.98,
    }}
    appearance="noIndicator"
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={MessageIcon} />
    <BottomNavigationTab icon={ImageIcon} />
    <BottomNavigationTab icon={PersonIcon} />
  </BottomNavigation>
);
export default () => {
  const theme = useTheme();

  return (
    <HomeTabs.Navigator
      // shifting
      inactiveColor={theme['color-primary-400']}
      activeColor={theme['color-primary-400']}
      initialRouteName="Diary"
      // barStyle={{backgroundColor: 'white'}}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {position: 'absolute'},
      }}
      // tabBar={props => <BottomTabBar {...props} />}
    >
      <HomeTabs.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <Icon name="edit-outline"></Icon>,
          tabBarAccessibilityLabel: 'Home',
        }}
        name="Home"
        component={EmotjShare}
      />
      <HomeTabs.Screen
        options={{
          tabBarLabel: 'dsdsd',
          tabBarIcon: () => <Icon name="edit-outline"></Icon>,
          tabBarAccessibilityLabel: 'Home',
        }}
        name="Chat"
        component={ChatRoom}
      />
      <HomeTabs.Screen
        options={{
          tabBarLabel: 'dsdsd',
          tabBarIcon: () => <Icon name="edit-outline"></Icon>,
          tabBarAccessibilityLabel: 'Home',
        }}
        name="Diary"
        component={DiaryScreen}
      />
      <HomeTabs.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <Icon name="edit-outline"></Icon>,
          tabBarAccessibilityLabel: 'Home',
        }}
        name="Profile"
        component={Profile}
      />
    </HomeTabs.Navigator>
  );
};
