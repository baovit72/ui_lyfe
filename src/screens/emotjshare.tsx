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

import EMOJIS from '../../assets/emojis';
import Carousel from 'react-native-snap-carousel';
import Draggable from 'react-native-draggable';
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

export default ({navigation}: IProp) => {
  const {state, dispatch} = useContext(GlobalContext);

  const [thoughtModal, setThoughtModal] = useState(false);
  const theme = useTheme();
  const t_backgroundColor = theme['background-basic-color-1'];
  interface IRProp {
    item: any;
    index: any;
  }
  const _renderEmojiCard = ({item, index}) => {
    let meStyle = {};
    if (item.name === 'Me') {
      meStyle = {borderWidth: 1, borderColor: theme['color-primary-400']};
    }
    return (
      <Card
        style={{
          ...meStyle,
          ...styles.emotjCard,
          padding: 0,
          // borderColor: theme['color-primary-400'],
          // backgroundColor: theme['color-primary-200'],
        }}>
        {/* {state.group && (
          <Draggable
            x={200}
            y={300}
            renderColor={theme['color-primary-400']}
            renderText={'dksljlsjdlskjd'}
          />
        )} */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: -17,
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginBottom: 5,
              }}
              source={{uri: item.avtUrl}}
            />
            <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
          </View>
          <View
            style={{
              flex: 2,
            }}>
            <Image
              source={EMOJIS[`${item.emo}_PNG`]}
              style={{
                position: 'absolute',
                width: 150,
                height: 150,
                opacity: 0.7,
                right: -57,
                bottom: -57,
                transform: [{rotate: '-15deg'}],
              }}></Image>
            <Text
              style={{
                flex: 1,
                zIndex: 2,
                // color: theme['color-primary-400'],
                fontWeight: '600',
                color: 'gray',
              }}>
              {item.content}
            </Text>
          </View>
        </View>
      </Card>
    );
  };
  const _renderItem = ({item, index}: IRProp) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={{width: 70, height: '100%', flex: 1}}
        activeOpacity={1}
        onPress={() => {
          setSelectedEmo(item);
          setIsMakingThought(true);
          setThoughtModal(true);
        }}>
        <Image
          style={{width: 75, height: '100%', flex: 1, marginBottom: 20}}
          source={EMOJIS[item + '_GIF']}
        />
      </TouchableOpacity>
    );
  };
  const [userThought, setUserThought] = useState({
    avtUrl:
      'https://media-cdn.tripadvisor.com/media/photo-s/15/cb/7d/7d/fox.jpg',
    name: 'Me',
    content: 'Không biết nói gì luôn',
    emo: 'THUMBS_UP',
    backgroundColor: '',
  });

  const [isMakingThought, setIsMakingThought] = useState(false);
  const [selectedEmo, setSelectedEmo] = useState(false);
  const [content, setContent] = useState('');
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: t_backgroundColor,
      }}>
      <View
        style={{
          backgroundColor: theme['color-primary-400'],
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
          // paddingBottom: 20,
          borderBottomLeftRadius: 50,
          overflow: 'hidden',
        }}>
        <View
          style={{
            marginTop: 10,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text
            style={{
              color: t_backgroundColor,
              fontSize: 25,
              fontFamily: 'BubbleBobble',
            }}>
            I feel...
          </Text>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={{height: 75, marginTop: 5}}
          data={[
            'BIRTHDAY_CAKE',
            'ANGRY_EMOJI',
            'BLUSHING_EMOJI',
            'HEART',
            'HEARTEYE_EMOJI',
            'LAUGHING_EMOJI',
            // 'MEDAL',
            'PEACE',
            'SAD_EMOJI',
            'SAD_EMOJI_WITH_TEAR',
            'TEARS_OF_JOY',
          ]}
          renderItem={_renderItem}
        />
      </View>
      <View
        style={{
          flex: 7,
          backgroundColor: theme['color-primary-400'],
        }}>
        <View
          style={{
            borderTopRightRadius: 50,
            backgroundColor: t_backgroundColor,
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: 'column',
            paddingTop: 30,
          }}>
          {/* <Image source={require('./../../assets/emojis/BIRTHDAY_CAKEx.gif')} /> */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text category="h5" style={{color: theme['color-primary-400']}}>
              today feelings
            </Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            style={{...styles.container}}
            data={[
              userThought,
              {
                avtUrl:
                  'data:image/jpeg;base64,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',
                name: 'Adam Lee',
                content: 'Hôm nay là ngày đẹp trời',
                emo: 'BLUSHING_EMOJI',
              },
              {
                avtUrl:
                  'data:image/jpeg;base64,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',
                name: 'Sans Serun',
                content: 'Nay tức ghê',
                emo: 'ANGRY_EMOJI',
              },
              {
                avtUrl:
                  'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,g=0.5x0.5,f=auto/b5bd34054bc849159d949d50021d8926.png',
                name: 'Bao Ho',
                content: 'Có chuyện vui ghê đó...',
                emo: 'LAUGHING_EMOJI',
              },
              {
                avtUrl:
                  'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg',
                name: 'Robert Koyo',
                content: 'Thời tiết hôm nay bị sao đấy, chả hiểu, bực ',
                emo: 'ANGRY_EMOJI',
              },
              {
                avtUrl:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4it_Jqeo2FMOA-0f2yJk5uYJ3YTa1j7MVSA&usqp=CAU',
                name: 'Quoc Ho',
                content: 'Ui nay mưa rồi, không được đi đâu cả',
                emo: 'SAD_EMOJI_WITH_TEAR',
              },
              {
                avtUrl:
                  'https://c.ndtvimg.com/2020-08/1cvf367_yellow-cat_625x300_25_August_20.jpg',
                name: 'User Zero',
                content: 'Nay tự nhiên có hứng chạy bộ ghê',
                emo: 'PEACE',
              },
            ]}
            renderItem={_renderEmojiCard}
          />

          {/* <Carousel
        data={[
          'BIRTHDAY_CAKE.gif',
          'ANGRY_EMOJI',
          'BLUSHING_EMOJI',
          'HEART',
          'HEARTEYE_EMOJI',
          'LAUGHING_EMOJI',
          'MEDAL',
          'PEACE',
          'SAD_EMOJI',
          'SAD_EMOJI_WITH_TEAR',
          'TEARS_OF_JOY',
        ]}
        renderItem={_renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width}
        activeSlideAlignment={'start'}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      /> */}
        </View>
      </View>

      <Modal
        visible={thoughtModal}
        onBackdropPress={() => setThoughtModal(false)}
        style={{
          width: '85%',
          borderRadius: 30,

          borderWidth: 0,

          paddingBottom: 50,
        }}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        // onBackdropPress={() => setVisible(false)}
      >
        <Card
          style={{
            borderRadius: 30,
            backgroundColor: theme['color-primary-400'],
            borderWidth: 0,
            paddingTop: 0,
          }}
          disabled={true}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Input
              multiline
              textStyle={{
                height: 120,
                borderRadius: 30,
              }}
              placeholder={'write down your thoughts...'}
              style={{
                marginTop: 0,
                flex: 5,
                borderRadius: 30,
              }}></Input>
            <Image
              source={EMOJIS[`${selectedEmo}_PNG`]}
              style={{
                position: 'absolute',
                width: 50,
                height: 50,
                opacity: 0.5,
                right: 0,
                bottom: 0,
                zIndex: 2,
                transform: [{rotate: '-15deg'}],
              }}></Image>
            <Button
              appearance="outline"
              status="control"
              accessoryLeft={props => <Icon {...props} name="edit-outline" />}
              style={{flex: 1, borderRadius: 30, height: '95%', marginLeft: 10}}
              onPress={() => setThoughtModal(false)}></Button>
          </View>
        </Card>
        <Button
          style={{
            position: 'absolute',
            left: Dimensions.get('window').width / 2 - 50,
            bottom: -25,
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 0,
          }}
          appearance="outline"
          status="control"
          accessoryLeft={props => <Icon {...props} name="close-outline" />}
          onPress={() => setThoughtModal(false)}></Button>
      </Modal>
    </View>
  );
};
