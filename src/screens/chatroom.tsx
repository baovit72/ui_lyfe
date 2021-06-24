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
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';

import EMOJIS from '../../assets/emojis';
import EmojiBoard from 'react-native-emoji-board';
import Carousel from 'react-native-snap-carousel';
import {Keyboard} from 'react-native';

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

export default ({navigation}: IProp) => {
  const [thoughtModal, setThoughtModal] = useState(true);
  const emojiState = useChatRoomState(false);
  const theme = useTheme();
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
            borderBottomLeftRadius: 30,
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
              talk to each other...
            </Text>
          </View>
        </View>
        <View style={{flex: 22, backgroundColor: theme['color-primary-400']}}>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: '100%',
              height: '100%',
              borderTopRightRadius: 30,
              backgroundColor: '#fff',
            }}
            onPress={() => {
              hideEmoji();
              Keyboard.dismiss();
            }}>
            <GiftedChat
              renderAvatarOnTop={true}
              user={{_id: 1}}
              renderSend={props => (
                <View style={{flexDirection: 'row'}}>
                  <Button
                    appearance="ghost"
                    size="medium"
                    accessoryLeft={attachmentIcon}
                  />
                  <Button
                    onPress={() => {
                      Keyboard.dismiss();
                      emojiState.setValue(!emojiState.value);
                    }}
                    appearance="ghost"
                    size="medium"
                    style={{paddingLeft: 0, paddingRight: 0}}
                    accessoryLeft={emojiIcon}
                  />
                  <Button
                    appearance="ghost"
                    size="large"
                    accessoryLeft={sendIcon}
                  />
                </View>
              )}
              isTyping={true}
              renderBubble={props => (
                <Bubble
                  {...props}
                  wrapperStyle={{
                    right: {
                      backgroundColor: theme['color-primary-400'],
                      marginBottom: 5,
                    },
                    left: {
                      marginBottom: 5,
                    },
                  }}
                />
              )}
              messages={[
                {
                  _id: 1,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  image: 'https://placeimg.com/1400/1400/any',
                  user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                },
                {
                  _id: 2,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  image: 'https://placeimg.com/1400/1400/any',
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                },
                {
                  _id: 3,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                },
                {
                  _id: 4,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                },
                {
                  _id: 5,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                },
              ]}
              //   renderInputToolbar={props => (
              //     <TouchableOpacity onPress={}>
              //       <InputToolbar {...props} />
              //     </TouchableOpacity>
              //   )}
              //   renderAccessory={props => <Icon name="person-outline" />}
              onSend={messages => onSend(messages)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <EmojiBoard
        // hideBackSpace={true}
        showBoard={emojiState.value}
        containerStyle={{position: emojiState.value ? 'relative' : 'absolute'}}
        onClick={(emoji: Object) => {
          console.log(emoji);
        }}
      />
    </React.Fragment>
  );
};
