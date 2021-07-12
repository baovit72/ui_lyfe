import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import SignupScreen from '../screens/register';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import ForgotStackScreen from './forgotstackscreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import EmotjShare from '../screens/emotjshare';
import ImageScreen from '../screens/images';
import ChatRoom from '../screens/chatroom';
import Profile from '../screens/profile';
import {View} from 'react-native';

const HomeIcon = (props: any) => <Icon {...props} name="home-outline" />;

const MessageIcon = (props: any) => (
  <Icon {...props} name="message-square-outline" />
);
const ImageIcon = (props: any) => <Icon {...props} name="image-outline" />;

const PersonIcon = (props: any) => <Icon {...props} name="person-outline" />;

const HomeTabs = createBottomTabNavigator();
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
export default () => (
  <HomeTabs.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      keyboardHidesTabBar: true,
      style: {position: 'absolute'},
    }}
    tabBar={props => <BottomTabBar {...props} />}>
    <HomeTabs.Screen name="Home" component={EmotjShare} />
    <HomeTabs.Screen name="Chat" component={ChatRoom} />
    <HomeTabs.Screen name="Image" component={ImageScreen} />
    <HomeTabs.Screen name="Profile" component={Profile} />
  </HomeTabs.Navigator>
);
