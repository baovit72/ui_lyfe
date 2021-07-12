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
            onPress={() => setThoughtModal(false)}></Button>
        </View>
      </View>
    </React.Fragment>
  );
};
