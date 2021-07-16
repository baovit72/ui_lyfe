import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login';
import SignupScreen from '../screens/register';
import {
  BottomNavigation,
  BottomNavigationTab,
  DateService,
  useTheme,
} from '@ui-kitten/components';
import ForgotStackScreen from './forgotstackscreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  AnimatedTabBarNavigator,
  DotSize, // optional
  TabElementDisplayOptions, // optional
  TabButtonLayout, // optional
  IAppearanceOptions, // optional
} from 'react-native-animated-nav-tab-bar';

import EmotjShare from '../screens/emotjshare';
import DiaryScreen from '../screens/diary';
import ChatRoom from '../screens/chatroom';
import Profile from '../screens/profile';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import GlobalContext from '../contexts/global.context';

const HomeIcon = (props: any) => <Icon {...props} name="home-outline" />;

const MessageIcon = (props: any) => (
  <Icon {...props} name="message-square-outline" />
);
const ImageIcon = (props: any) => <Icon {...props} name="image-outline" />;

const PersonIcon = (props: any) => <Icon {...props} name="person-outline" />;

const HomeTabs = AnimatedTabBarNavigator();
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
  const {state, dispatch} = useContext(GlobalContext);
  return (
    <HomeTabs.Navigator
      lazy={false}
      initialRouteName="Profile"
      // barStyle={{backgroundColor: 'white'}}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {position: 'absolute'},
        activeTintColor: theme['color-primary-400'],
        inactiveTintColor: '#222222',
      }}
      // tabBar={props => <BottomTabBar {...props} />}
    >
      <HomeTabs.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="share-2"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
        name="Home"
        component={EmotjShare}
      />
      <HomeTabs.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="message-circle"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
        name="Chat"
        component={ChatRoom}
      />
      <HomeTabs.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="image"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
        name="Diary"
        component={DiaryScreen}
      />
      <HomeTabs.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="user"
              size={size ? size : 24}
              color={focused ? color : '#222222'}
              focused={focused}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </HomeTabs.Navigator>
  );
};
