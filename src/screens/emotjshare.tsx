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
} from '@ui-kitten/components';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';

import EMOJIS from '../../assets/emojis';
import Carousel from 'react-native-snap-carousel';

/**
 * Stylesheet for the component
 */
const styles = StyleSheet.create({
  emotjCard: {
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.02)',
    marginBottom: 20,
    flexDirection: 'row',
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

export default ({navigation}: IProp) => {
  const theme = useTheme();
  console.log(theme);
  interface IRProp {
    item: any;
    index: any;
  }
  const _renderEmojiCard = ({item, index}) => {
    return (
      <Card
        style={{
          ...styles.emotjCard,
          borderColor: theme['color-primary-400'],
          flexDirection: 'row',
          // backgroundColor: theme['color-primary-200'],
        }}>
        <View style={{flex: 1}}>
          <Image
            style={{
              flex: 1,
              width: 50,
              height: 50,
              borderRadius: 25,
              marginBottom: 20,
            }}
            source={EMOJIS['BLUSHING_EMOJI_GIF']}
          />
          <Text>User Zero</Text>
        </View>
        <View
          style={{
            flex: 6,
          }}>
          <Text
            style={{
              flex: 6,
              color: theme['color-primary-400'],
              fontFamily: 'BubbleBobble',
            }}>
            The Maldives, officially the Republic of Maldives, is a small
            country in South Asia, located in the Arabian Sea of the Indian
            Ocean. It lies southwest of Sri Lanka and India, about 1,000
            kilometres (620 mi) from the Asian continent
          </Text>
        </View>
      </Card>
    );
  };
  const _renderItem = ({item, index}: IRProp) => {
    console.log(item);
    return (
      <Image
        style={{width: 80, height: '100%', flex: 1, marginBottom: 20}}
        source={EMOJIS[item + '_GIF']}
      />
    );
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {/* <Text
        style={{
          ...styles.logoTitle,
          color: theme['color-primary-400'],
          backgroundColor: '#fff',
        }}
        status="primary">
        Lyfe
      </Text> */}
      <View
        style={{
          backgroundColor: theme['color-primary-400'],
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 30,
          borderBottomLeftRadius: 50,
          overflow: 'hidden',
        }}>
        <Text
          style={{
            marginLeft: 10,
            flex: 1,
            color: '#fff',
            // fontWeight: 'bold',
            fontSize: 17,
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            paddingTop: 20,
            lineHeight: 17,
            fontFamily: 'BubbleBobble',
          }}>
          how do you feel now?
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.container}
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
            backgroundColor: '#fff',
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: 'column',
            paddingTop: 30,
          }}>
          {/* <Image source={require('./../../assets/emojis/BIRTHDAY_CAKEx.gif')} /> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            style={styles.container}
            data={[
              'Data',
              'Data',
              'Data',
              'Data',
              'Data',
              'Data',
              'Data',
              'Data',
              'Data',
              'Data',
              'Data',
              'Data',
              'Data',
              'Data',
              'Data',
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
    </View>
  );
};
