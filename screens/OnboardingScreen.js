import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Swiper from 'react-native-swiper';
import Colors from '../constants/Colors';

const onboardingScreen1 = require('../assets/images/onboarding1.jpeg');
const onboardingScreen2 = require('../assets/images/onboarding2.jpeg');
const onboardingScreen3 = require('../assets/images/onboarding3.jpeg');

// credits for images
// https://unsplash.com/photos/E9uJ65vwGmE?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const onPressFunction = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <>
      <Swiper style={styles.wrapper} showsButtons={false}>
        <ImageBackground
          source={onboardingScreen3}
          resizeMode={'cover'}
          style={styles.slide1}>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Connect beyond Academics</Text>
          </View>
          <Pressable style={styles.skipBtn} onPress={onPressFunction}>
            <Text>Skip</Text>
          </Pressable>
        </ImageBackground>
        <ImageBackground
          source={onboardingScreen1}
          resizeMode={'cover'}
          style={styles.slide2}>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Connect beyond Academics</Text>
          </View>
          <Pressable style={styles.skipBtn} onPress={onPressFunction}>
            <Text>Skip</Text>
          </Pressable>
        </ImageBackground>

        <ImageBackground
          source={onboardingScreen2}
          resizeMode={'cover'}
          style={styles.slide3}>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Connect beyond Academics</Text>
          </View>
          <Pressable style={styles.skipBtn} onPress={onPressFunction}>
            <Text>Skip</Text>
          </Pressable>
        </ImageBackground>
      </Swiper>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: Colors.white.background,
    fontSize: 25,
    fontWeight: 'bold',
  },
  textWrapper: {
    position: 'relative',
    top: hp(32),
    left: wp(1),
  },
  skipBtn: {
    position: 'relative',
    top: hp(37),
    left: wp(35),
    height: hp(4),
    width: wp(20),
    backgroundColor: Colors.white.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(5),
  },
});

export default OnboardingScreen;
