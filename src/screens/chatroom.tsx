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
  View,
} from 'react-native';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';

import EMOJIS from '../../assets/emojis';
import Carousel from 'react-native-snap-carousel';

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

const sendIcon = (props: any) => (
  <Icon {...props} name="arrowhead-right-outline" />
);

export default ({navigation}: IProp) => {
  const [thoughtModal, setThoughtModal] = useState(true);
  const theme = useTheme();
  interface IRProp {
    item: any;
    index: any;
  }
  function onSend(messages: any) {
    console.log(messages);
  }
  return (
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
              fontSize: 25,
              fontFamily: 'BubbleBobble',
            }}>
            talk to each other...
          </Text>
        </View>
      </View>
      <View style={{flex: 12}}>
        <GiftedChat
          user={{_id: 1}}
          renderSend={props => (
            <Button appearance="ghost" size="large" accessoryLeft={sendIcon} />
          )}
          isTyping={true}
          renderBubble={props => (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: theme['color-primary-400'],
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
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              image: 'https://placeimg.com/1400/1400/any',
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ]}
          //   renderAccessory={props => <Icon name="person-outline" />}
          onSend={messages => onSend(messages)}
        />
      </View>
    </View>
  );
};
