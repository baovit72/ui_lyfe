import React, {useState, useEffect, useContext} from 'react';
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
import Carousel, {getInputRangeFromIndexes} from 'react-native-snap-carousel';
import {launchImageLibrary} from 'react-native-image-picker';
import {Keyboard} from 'react-native';
import GlobalContext from '../contexts/global.context';

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
  const {state, dispatch} = useContext(GlobalContext);

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
  const _renderItem = ({item}) => {
    if (item.placeholder) {
      if (state.diaryDeck) return null;
      return (
        <View
          style={{
            width: '100%',
            height: Dimensions.get('window').width * 0.8,
          }}></View>
      );
    }
    console.log('render item');
    return (
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
          height: Dimensions.get('window').width * 0.8,
          // elevation: 5,
          // height: Dimensions.get('window').width / 0.9,
        }}>
        <View style={{position: 'absolute', right: 10, top: 10, zIndex: 5}}>
          <Button
            size="small"
            style={{borderRadius: 100, marginBottom: 5}}
            appearance="outline"
            status="control"
            accessoryLeft={props => (
              <Icon {...props} name="download-outline"></Icon>
            )}></Button>
          <Button
            size="small"
            style={{borderRadius: 100, marginBottom: 5}}
            appearance="outline"
            status="control"
            accessoryLeft={props => (
              <Icon {...props} name="share-outline"></Icon>
            )}></Button>
          <Button
            size="small"
            style={{borderRadius: 100, marginBottom: 5}}
            appearance="outline"
            status="control"
            accessoryLeft={props => (
              <Icon {...props} name="message-circle-outline"></Icon>
            )}></Button>

          <Button
            size="small"
            style={{borderRadius: 100, marginBottom: 5}}
            appearance="outline"
            status="danger"
            accessoryLeft={props => (
              <Icon {...props} name="trash-outline"></Icon>
            )}></Button>
        </View>
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
              height: Dimensions.get('window').width * 0.45,
              resizeMode: 'cover',
            }}
            source={{
              uri: item.url,
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
                <Text style={{fontWeight: 'bold', marginLeft: 10}}>Bao Ho</Text>
                <Text style={{marginLeft: 10, color: 'gray'}}>
                  {timeAgo.format(new Date())}
                </Text>
              </View>
            </View>
          </View>

          <Text style={{color: 'black', marginTop: 10, fontStyle: 'italic'}}>
            {'\t'}
            {item.description}
          </Text>
        </View>
      </View>
    );
  };
  Keyboard.addListener('keyboardDidShow', hideEmoji);
  const snapProps = state.diaryDeck
    ? {
        layoutCardOffset: '15',
        layout: 'tinder',
        scrollIntepolator: (index, carouselProps) => {
          const range = [3, 2, 1, 0, -1];
          const inputRange = getInputRangeFromIndexes(
            range,
            index,
            carouselProps,
          );
          const outputRange = range;

          return {inputRange, outputRange};
        },
        slideInterpolatedStyle: (index, animatedValue, carouselProps) => {
          const sizeRef = carouselProps.vertical
            ? carouselProps.itemHeight
            : carouselProps.itemWidth;
          const translateProp = carouselProps.vertical
            ? 'translateY'
            : 'translateX';

          return {
            zIndex: carouselProps.data.length - index,
            opacity: animatedValue.interpolate({
              inputRange: [2, 3],
              outputRange: [1, 0],
            }),
            transform: [
              {
                rotate: animatedValue.interpolate({
                  inputRange: [-1, 0, 1, 2, 3],
                  outputRange: ['-25deg', '0deg', '-3deg', '1.8deg', '0deg'],
                  extrapolate: 'clamp',
                }),
              },
              {
                [translateProp]: animatedValue.interpolate({
                  inputRange: [-1, 0, 1, 2, 3],
                  outputRange: [
                    -sizeRef * 0.5,
                    0,
                    -sizeRef, // centered
                    -sizeRef * 2, // centered
                    -sizeRef * 3, // centered
                  ],
                  extrapolate: 'clamp',
                }),
              },
            ],
          };
        },
        useScrollView: true,
      }
    : {vertical: true, padddingTop: 70};
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
            borderBottomRightRadius: 50,
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
              we've been through{' '}
              {Math.ceil(
                (new Date() -
                  Date.parse(state?.group?.createdAt || new Date())) /
                  1000 /
                  60 /
                  60 /
                  24,
              )}{' '}
              days ...
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 22,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          {state.diaryDeck && (
            <Text
              style={{
                color: theme['color-primary-400'],
                paddingTop: 30,
                paddingBottom: 20,
              }}></Text>
          )}
          <Carousel
            data={[
              {
                url: 'https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/08/watermelon.jpg',
                description: 'Watermelon for summer',
              },
              {
                url: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
                description: 'Anyone wants a puppy?',
              },
              {
                url: 'https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/08/watermelon.jpg',
                description: 'Watermelon for summer',
              },
              {
                url: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
                description: 'Anyone wants a puppy?',
              },
              {
                url: 'https://i0.wp.com/www.eatthis.com/wp-content/uploads/2020/08/watermelon.jpg',
                description: 'Watermelon for summer',
              },
              {
                url: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
                description: 'Anyone wants a puppy?',
              },
              {
                placeholder: true,
              },
            ]}
            {...snapProps}
            renderItem={_renderItem}
            sliderWidth={Dimensions.get('window').width * 0.8}
            itemWidth={Dimensions.get('window').width * 0.8}
            itemHeight={Dimensions.get('window').width * 0.8}
            sliderHeight={Dimensions.get('window').width * 0.8}
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
                <Text style={{fontWeight: 'bold', marginLeft: 10}}>Bao Ho</Text>
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
