import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  });

  const imageSrc = require('../assets/images/stafforshire.png');

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={imageSrc} style={styles.image}></ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: hp(25),
    width: wp(40),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default SplashScreen;
