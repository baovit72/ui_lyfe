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

const PersonIcon = (props: any) => <Icon {...props} name="person-outline" />;

const BellIcon = (props: any) => <Icon {...props} name="bell-outline" />;

const EmailIcon = () => <Icon name="email-outline" />;

const HomeTabs = createBottomTabNavigator();
interface IProp {
  navigation: any;
  state: any;
}
const BottomTabBar = ({navigation, state}: IProp) => (
  <BottomNavigation
    appearance="noIndicator"
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={PersonIcon} />
    <BottomNavigationTab icon={BellIcon} />
  </BottomNavigation>
);
export default () => (
  <HomeTabs.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <HomeTabs.Screen name="Home" component={EmotjShare} />
    <HomeTabs.Screen name="Event" component={EmotjShare} />
  </HomeTabs.Navigator>
);
