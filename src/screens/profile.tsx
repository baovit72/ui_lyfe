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
} from '@ui-kitten/components';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const {getImageBase64} = require('../utils').default;

import ImagePicker from 'react-native-image-crop-picker';
import {Keyboard} from 'react-native';
import {useContext} from 'react';
import GlobalContext from '../contexts/global.context';

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

const editIcon = (props: any) => <Icon {...props} name="edit-outline" />;
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

  const {state, dispatch} = useContext(GlobalContext);
  const updateAvatar = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
    }).then(image => {
      console.log('image', image);
      getImageBase64(state.token, image.path)
        .then(data => console.log(data))
        .catch(error => console.log(error));
    });
  };
  interface IRProp {
    item: any;
    index: any;
  }
  function onSend(messages: any) {
    console.log(messages);
  }

  function hideEmoji() {
    emojiState.setValue(false);
  }

  Keyboard.addListener('keyboardDidShow', hideEmoji);

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
                  uri: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,g=0.5x0.5,f=auto/b5bd34054bc849159d949d50021d8926.png',
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
                <Input
                  style={{flex: 2}}
                  value="Adam Lee"
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
                  Username
                </Text>
                <Input style={{flex: 2}} value="adamlee123" disabled></Input>
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
                <Input
                  style={{flex: 2}}
                  value="nguyenbaont2212@gmail.com"
                  disabled></Input>
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
                  value="0855765343"
                  disabled
                  accessoryRight={editIcon}></Input>
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
                Group
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Leave group
                </Text>
                <Toggle></Toggle>
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
                Setting
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 7,
                }}>
                <Text style={{marginRight: 10, flex: 1, fontWeight: 'bold'}}>
                  Dark Mode
                </Text>
                <Toggle></Toggle>
              </View>
            </Card>
          </ScrollView>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};
