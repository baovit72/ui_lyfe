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
            paddingLeft: 0,
            paddingRight: 0,
            flexDirection: 'column',
          }}>
          {/* <Image source={require('./../../assets/emojis/BIRTHDAY_CAKEx.gif')} /> */}

          {/* <Card style={styles.emotjCard}>
            <Text>
              The Maldives, officially the Republic of Maldives, is a small
              country in South Asia, located in the Arabian Sea of the Indian
              Ocean. It lies southwest of Sri Lanka and India, about 1,000
              kilometres (620 mi) from the Asian continent
            </Text>
          </Card> */}

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
