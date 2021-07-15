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
} from '@ui-kitten/components';

import Lightbox from 'react-native-lightbox';
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
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';

import EMOJIS from '../../assets/emojis';
import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';
import Carousel from 'react-native-snap-carousel';
import {launchImageLibrary} from 'react-native-image-picker';
import {Keyboard} from 'react-native';
TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo('en-US');
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

const emojiIcon = (props: any) => (
  <Icon {...props} name="smiling-face-outline" />
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
let options = {
  title: 'Select Image',
  customButtons: [
    {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default ({navigation}: IProp) => {
  const [image, setImage] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [thoughtModal, setThoughtModal] = useState(true);
  const emojiState = useChatRoomState(false);
  const theme = useTheme();

  useEffect(() => {
    image && setAddNew(true);
  }, [image]);
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
  const _renderItem = data => (
    <View
      style={{
        // width: Dimensions.get('window').width * 0.9,
        borderRadius: 30,
        padding: 0,
        marginLeft: 20,
        marginRight: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 1,
        borderColor: theme['color-primary-400'],
        height: Dimensions.get('window').width * 0.9,
        // elevation: 5,
        // height: Dimensions.get('window').width / 0.9,
      }}>
      <Lightbox
        activeProps={{
          style: {
            flex: 1,
            resizeMode: 'contain',
          },
        }}>
        <Image
          style={{
            margin: 0,
            width: '100%',
            height: Dimensions.get('window').width * 0.5,
            resizeMode: 'cover',
          }}
          source={{
            uri: 'https://images.unsplash.com/photo-1623920483953-e0e9b7e64600?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
          }}
        />
      </Lightbox>
      <View style={{padding: 30, paddingTop: 10, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 30, height: 30, borderRadius: 15}}
              source={{
                uri: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,g=0.5x0.5,f=auto/b5bd34054bc849159d949d50021d8926.png',
              }}></Image>
            <View>
              <Text style={{fontWeight: 'bold', marginLeft: 10}}>Adam Lee</Text>
              <Text style={{marginLeft: 10, color: 'gray'}}>
                {timeAgo.format(new Date())}
              </Text>
            </View>
          </View>
        </View>

        <Text style={{color: 'black', marginTop: 10, fontStyle: 'italic'}}>
          {'\t'}Lorem ipsum dolor sit amet consectetur adipisicing elit. Non vel
          harum, distinctio alias nisi architecto ea eum dolorum at sit,
        </Text>
      </View>
      <Button
        style={{position: 'absolute', right: -5, bottom: 5}}
        appearance="ghost"
        accessoryLeft={props => (
          <Icon {...props} name="trash-outline"></Icon>
        )}></Button>
    </View>
  );
  Keyboard.addListener('keyboardDidShow', hideEmoji);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            backgroundColor: theme['color-primary-400'],
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            //   paddingBottom: 30,
            borderBottomLeftRadius: 50,
            overflow: 'hidden',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontFamily: 'BubbleBobble',
              }}>
              we've been through...
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 22,
            paddingTop: 20,
          }}>
          <Carousel
            data={[
              'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
              'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
              'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
              'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
              'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
              'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
              'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
              'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
              'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
              'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
            ]}
            vertical
            // layoutCardOffset={`18`}
            // layout="tinder"
            renderItem={_renderItem}
            sliderWidth={Dimensions.get('window').width * 0.9}
            itemWidth={Dimensions.get('window').width * 0.9}
            itemHeight={Dimensions.get('window').width * 0.9}
            sliderHeight={Dimensions.get('window').width * 0.9}
          />

          <Button
            style={{
              position: 'absolute',
              right: 15,
              backgroundColor: theme['color-primary-400'],
              bottom: 15,
              width: 60,
              height: 60,
              borderRadius: 35,
              borderWidth: 0,
              zIndex: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}
            appearance="outline"
            status="control"
            accessoryLeft={props => <Icon {...props} name="plus-outline" />}
            onPress={() =>
              launchImageLibrary({mediaType: 'photo'}, (response: any) => {
                console.log('Response = ', response);
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log(
                    'User tapped custom button: ',
                    response.customButton,
                  );
                } else if (response.assets.length) {
                  setImage(response.assets[0]);
                  console.log(response.uri);
                }
              })
            }></Button>
        </View>
      </View>
      {/* <Modal
        visible={addNew}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          padding: 0,
          top: 0,
          zIndex: 2,
        }}
        // onBackdropPress={() => setVisible(false)}
      > */}
      {addNew && (
        <ScrollView
          style={{
            position: 'absolute',
            width: '100%',
            left: 0,
            top: 0,
            height: '100%',
            backgroundColor: 'white',
            borderWidth: 0,
            paddingTop: 0,
            marginTop: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
                margin: 15,
              }}>
              <Image
                style={{width: 50, height: 50, borderRadius: 25}}
                source={{
                  uri: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,g=0.5x0.5,f=auto/b5bd34054bc849159d949d50021d8926.png',
                }}></Image>
              <View>
                <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                  Adam Lee
                </Text>
              </View>
            </View>
            <Button
              appearance="outline"
              // accessoryLeft={props => <Icon {...props} name="edit-outline" />}
              style={{
                height: 50,
                borderRadius: 30,

                marginRight: 10,
                marginLeft: 10,
                zIndex: 10,
              }}
              onPress={() => setAddNew(false)}>
              create
            </Button>
          </View>
          <Input
            multiline
            textStyle={{
              width: '100%',
            }}
            style={{width: '100%', borderWidth: 0, backgroundColor: 'white'}}
            placeholder={'say something about the image...'}></Input>

          <Image
            source={{
              uri: image?.uri || '',
            }}
            style={{
              marginTop: 10,
              width: Dimensions.get('window').width,
              height:
                (Dimensions.get('window').width * image.height) / image.width,
              resizeMode: 'cover',
              zIndex: 2,
            }}></Image>
        </ScrollView>
      )}
      {/* </Modal> */}
      {addNew && (
        <Button
          style={{
            position: 'absolute',
            left: Dimensions.get('window').width / 2 - 25,
            bottom: 50,
            width: 50,
            height: 50,
            borderRadius: 25,
            // borderWidth: 0,
            zIndex: 10,
          }}
          appearance="outline"
          accessoryLeft={props => <Icon {...props} name="close-outline" />}
          onPress={() => setAddNew(false)}></Button>
      )}
    </View>
  );
};
