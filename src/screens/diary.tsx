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
  console.log(theme);
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
          }}>
          <Card>
            <Lightbox navigator={navigator}>
              <Image
                style={{height: 300}}
                source={{
                  uri: 'http://knittingisawesome.com/wp-content/uploads/2012/12/cat-wearing-a-reindeer-hat1.jpg',
                }}
              />
            </Lightbox>
          </Card>
          <Button
            style={{
              position: 'absolute',
              left: Dimensions.get('window').width / 2 - 50,
              top: 100,
              width: 50,
              height: 50,
              borderRadius: 25,
              borderWidth: 0,
              zIndex: 2,
            }}
            appearance="outline"
            status="control"
            accessoryLeft={props => <Icon {...props} name="close-outline" />}
            onPress={() => setThoughtModal(false)}></Button>
        </View>
      </View>
    </React.Fragment>
  );
};
