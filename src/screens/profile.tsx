import React, {useState, useEffect} from 'react';
import {
  ApplicationProvider,
  Button,
  Icon,
  Layout,
  Text,
  Input,
  Card,
  List,
  ListItem,
  useTheme,
  Modal,
  Toggle,
  Datepicker,
} from '@ui-kitten/components';
import {
  AsyncStorage,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  LogBox,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const {getImageCode} = require('../utils').default;

import ImagePicker from 'react-native-image-crop-picker';
import {Keyboard} from 'react-native';
import {useContext} from 'react';
import GlobalContext from '../contexts/global.context';
const {showConfirmDialog, leaveGroup, updateGroup, showInput} =
  require('../utils').default;
import ThemeContext from '../contexts/theme.context';
import Toast from 'react-native-toast-message';

/**
 * Stylesheet for the component
 */
const styles = StyleSheet.create({
  emotjCard: {
    borderRadius: 15,
    // backgroundColor: 'rgba(0,0,0,0.02)',
    marginBottom: 20,
    flex: 1,
  },
  emotjText: {
    color: 'white',
  },
  container: {
    // height: '90%',
    // borderRadius: 15,
    // backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  logoTitle: {
    color: '#fff',
    fontSize: 70,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'LemonJellyPersonalUse',
  },
});

interface IProp {
  navigation: any;
}

const editIcon = (props: any) => (
  <TouchableOpacity {...props} style={{margin: 0}} appearance="ghost">
    <Icon {...props} name="edit-outline" />
  </TouchableOpacity>
);
const attachmentIcon = (props: any) => (
  <Icon {...props} name="attach-outline" />
);
const sendIcon = (props: any) => (
  <Icon {...props} name="arrowhead-right-outline" />
);

const useChatRoomState = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  return {value, setValue};
};

export default ({navigation}: IProp) => {
  const [thoughtModal, setThoughtModal] = useState(true);
  const emojiState = useChatRoomState(false);
  const chatState = useChatRoomState('');
  const theme = useTheme();
  const {themeMode, setThemeMode} = useContext(ThemeContext);
  const {state, dispatch} = useContext(GlobalContext);

  const updateAvatar = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then(image => {
      console.log('image', image);
      getImageCode(state.token, image.path)
        .then(data => console.log('image code', data.code))
        .catch(error => console.log(error));
    });
  };

  const user = state.user;
  const group = state.group;
  console.log('group', group);
  LogBox.ignoreAllLogs();
  console.ignoredYellowBox = true;
  const onLeaveGroup = () => {
    console.log('leave group ');
    dispatch({type: 'LOAD_BEGIN'});
    console.log(state);
    leaveGroup(state.token, group.code)
      .then((data: any) => {
        dispatch({type: 'LOAD_END'});
        console.log(data.data);
        if (data.errors) {
          Toast.show({
            type: 'error',
            text1: 'You are not in a group',
          });
        } else {
          dispatch({
            type: 'LEAVE_GROUP',
            payload: {},
          });
          Toast.show({
            type: 'success',
            text1: 'Your have left the group!',
          });
          navigation.push('Group');
        }
      })
      .catch(e => {
        Toast.show({
          type: 'error',
          text1: 'Oops! Please check your internet connection',
        });
        console.log(e);
        dispatch({type: 'LOAD_END'});
      });
  };
  const onGroupDateChange = date => {
    console.log('change group date');
    dispatch({type: 'LOAD_BEGIN'});
    console.log(state);
    updateGroup(state.token, date)
      .then((data: any) => {
        dispatch({type: 'LOAD_END'});
        console.log(data.data);
        if (data.errors) {
          Toast.show({
            type: 'error',
            text1: 'You are not in a group',
          });
        } else {
          dispatch({
            type: 'UPDATE_GROUP',
            payload: {group: {...group, createdAt: date}},
          });
        }
      })
      .catch(e => {
        Toast.show({
          type: 'error',
          text1: 'Oops! Please check your internet connection',
        });
        console.log(e);
        dispatch({type: 'LOAD_END'});
      });
  };

  return (
    <React.Fragment>
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          backgroundColor: 'aliceblue',
        }}>
        <View
          style={{
            backgroundColor: theme['color-primary-400'],
            flex: 2,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            //   paddingBottom: 30,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            zIndex: 5,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-start',
              alignContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 110,
                height: 110,
                borderRadius: 55,
                borderWidth: 5,
                borderColor: 'white',
                position: 'absolute',
                bottom: -35,
              }}
              onPress={updateAvatar}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',

                  borderRadius: 55,
                  borderColor: 'white',
                }}
                source={{
                  uri: user.avatar,
                }}
              />
              <Button
                onPress={updateAvatar}
                size="small"
                style={{
                  position: 'absolute',
                  width: 30,
                  height: 30,
                  backgroundColor: 'white',
                  borderRadius: 30,
                  right: -5,
                  bottom: -5,
                  zIndex: 10,
                }}
                appearance="outline"
                accessoryRight={props => (
                  <Icon {...props} size="small" name="camera-outline"></Icon>
                )}></Button>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 8,
            backgroundColor: theme['color-primary-400'],
          }}>
          <ScrollView
            style={{
              width: '100%',
              height: '100%',
              // borderTopRightRadius: 50,
              backgroundColor: 'aliceblue',
            }}>
            <Card
              style={{
                marginTop: 50,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginBottom: 20,
                  color: theme['color-primary-400'],
                }}>
                Personal Information
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Name
                </Text>
                <TouchableOpacity
                  style={{flex: 2}}
                  onPress={() => {
                    showInput('Enter new name', text => console.log(text));
                  }}>
                  <Input
                    value={user.name}
                    disabled
                    accessoryRight={editIcon}></Input>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Username
                </Text>
                <Input style={{flex: 2}} value={user.username} disabled></Input>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Email
                </Text>
                <Input style={{flex: 2}} value={user.email} disabled></Input>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Phone
                </Text>
                <Input
                  style={{flex: 2}}
                  value={user.phone}
                  disabled
                  accessoryRight={editIcon}></Input>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Birthday
                </Text>
                <Datepicker
                  accessoryRight={props => <Icon {...props} name="calendar" />}
                  style={{flex: 2}}
                  date={Date.parse(user.birthday || new Date().toISOString())}
                  onSelect={nextDate => setDate(nextDate)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Password
                </Text>
                <Button
                  size="small"
                  style={{flex: 2, marginLeft: 18}}
                  appearance="outline"
                  status="warning">
                  Change
                </Button>
              </View>
            </Card>
            <Card
              style={{
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 7,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: theme['color-primary-400'],
                  }}>
                  Group
                </Text>
                <TouchableOpacity onPress={onLeaveGroup}>
                  <Text
                    onPress={() =>
                      showConfirmDialog(
                        onLeaveGroup,
                        'Leave group',
                        'Are you sure to leave your group?',
                        'Leave',
                      )
                    }
                    status="danger"
                    appearance="ghost"
                    style={{
                      flex: 1,
                      fontWeight: 'bold',
                      padding: 5,
                    }}>
                    Leave group
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Code
                </Text>
                <Input style={{flex: 2}} value={group?.code} disabled></Input>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Start on
                </Text>
                <Datepicker
                  accessoryRight={props => <Icon {...props} name="calendar" />}
                  style={{flex: 2}}
                  date={new Date(group?.createdAt || new Date())}
                  onSelect={date => onGroupDateChange(date)}
                />
              </View>
            </Card>
            <Card
              style={{
                marginTop: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginBottom: 20,
                  color: theme['color-primary-400'],
                }}>
                System
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Dark Mode
                </Text>
                <Toggle
                  checked={themeMode === 'dark'}
                  onChange={() => {
                    console.log('onChange');
                    const nextThemeMode =
                      themeMode === 'dark' ? 'light' : 'dark';
                    setThemeMode(nextThemeMode);
                    AsyncStorage.setItem('themeMode', nextThemeMode);
                  }}></Toggle>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Diary Deck
                </Text>
                <Toggle
                  checked={state.diaryDeck}
                  onChange={() => {
                    AsyncStorage.setItem('diaryDeck', !state.diaryDeck);
                    dispatch({type: 'DIARY_DECK_TOGGLE'});
                  }}></Toggle>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Button
                  onPress={() =>
                    showConfirmDialog(
                      () => dispatch({type: 'LOG_OUT'}),
                      'Log out',
                      'You will be returned to the login screen.',
                      'Log out',
                    )
                  }
                  style={{
                    width: '100%',
                    marginTop: 30,
                  }}
                  size="large"
                  status="danger"
                  appearance="outline">
                  Log out
                </Button>
              </View>
            </Card>
          </ScrollView>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};
