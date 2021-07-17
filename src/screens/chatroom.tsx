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
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  InputField,
} from 'react-native-gifted-chat';
import {launchImageLibrary} from 'react-native-image-picker';

import EMOJIS from '../../assets/emojis';
import EmojiBoard from 'react-native-emoji-board';
import Carousel from 'react-native-snap-carousel';
import {Keyboard} from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  gql,
  useSubscription,
  useQuery,
} from '@apollo/client';

import {setContext} from '@apollo/client/link/context';
import GlobalContext from '../contexts/global.context';
import {copyFileSync} from 'fs';
import utils from '../utils';

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
  const chatState = useChatRoomState('');
  const theme = useTheme();
  const {state, dispatch} = useContext(GlobalContext);
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
  const GET_MESSAGES = gql`
    query {
      chat {
        text
        image
        video
        user
        createdAt
        id
      }
    }
  `;
  const POLL_MESSAGES = gql`
    subscription {
      chatSubscription {
        text
        image
        video
        user
        createdAt
        id
      }
    }
  `;

  const {data: queryMsg, refetch, loading} = useQuery(GET_MESSAGES);
  const {data: pollMsg, error} = useSubscription(POLL_MESSAGES, {
    variables: {token: 'Bearer ' + state.token},
  });
  const [messages, setMessages] = useState([]);
  const mapChat = chat => ({
    _id: chat.id,
    text: chat.text,
    createdAt: new Date(chat.createdAt),
    image: chat.image.length > 0 ? chat.image : null,
    video: chat.video.length > 0 ? chat.video : null,
    user: {...JSON.parse(chat.user), _id: JSON.parse(chat.user).id},
  });
  useEffect(() => {
    console.log(pollMsg, error);
    if (!pollMsg) return;
    const chat = pollMsg.chatSubscription;
    setMessages([...messages, mapChat(chat)]);
  }, [pollMsg, error]);
  useEffect(() => {
    if (!queryMsg) return;
    const chats = queryMsg.chat;
    if (chats.length > messages.length)
      setMessages(chats.map((chat: any) => mapChat(chat)));
  }, [queryMsg]);

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
              backgroundColor: '#fff',
            }}
            onPress={() => {
              hideEmoji();
              Keyboard.dismiss();
            }}>
            <GiftedChat
              renderAvatarOnTop={true}
              user={{_id: state.user.id}}
              renderSend={props => (
                <View style={{flexDirection: 'row'}}>
                  <Button
                    appearance="ghost"
                    size="medium"
                    onPress={() => {
                      launchImageLibrary(
                        {mediaType: 'photo'},
                        (response: any) => {
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
                            const image = response.assets[0];
                            console.log('image', image);
                            dispatch({type: 'LOAD_BEGIN'});
                            utils
                              .getImageCode(state.token, image.uri)
                              .then(data => {
                                console.log('data', data);
                                utils
                                  .sendChat(state.token, {image: data.id})
                                  .then(data => dispatch({type: 'LOAD_END'}))
                                  .catch(e => dispatch({type: 'LOAD_END'}));
                              })
                              .catch(error => {
                                dispatch({type: 'LOAD_END'});
                                console.log('error', error);
                              });
                          }
                        },
                      );
                    }}
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
                    onPress={() => {
                      utils
                        .sendChat(state.token, {text: chatState.value})
                        .then(data => console.log(data))
                        .catch(e => console.log(e));
                      chatState.setValue('');
                    }}
                    appearance="ghost"
                    size="large"
                    accessoryLeft={sendIcon}
                  />
                </View>
              )}
              isTyping={true}
              // renderInputToolbar={props => <InputToolbar {...props}  />}
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
              messages={messages.sort(
                (a: any, b: any) => b.createdAt - a.createdAt,
              )}
              //   renderInputToolbar={props => (
              //     <TouchableOpacity onPress={}>
              //       <InputToolbar {...props} />
              //     </TouchableOpacity>
              //   )}
              //   renderAccessory={props => <Icon name="person-outline" />}
              onSend={messages => onSend(messages)}
              text={chatState.value}
              onInputTextChanged={text => {
                chatState.setValue(text);
                console.log(text);
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <EmojiBoard
        // hideBackSpace={true}
        showBoard={emojiState.value}
        containerStyle={{position: emojiState.value ? 'relative' : 'absolute'}}
        onClick={(emoji: Object) => {
          chatState.setValue(chatState.value + emoji.code);
        }}
      />
    </React.Fragment>
  );
};
