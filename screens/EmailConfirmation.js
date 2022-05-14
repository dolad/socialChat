import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Button,
} from 'react-native';
import {Formik, Field} from 'formik';

import CustomInput from '../components/FormInputs/CustomInput';
import {signUpValidationSchema} from '../validation/yup';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const imageSrc = require('../assets/images/stafforshire.png');

  const submitHandler = values => {
    console.log(values);
    navigation.navigate('LoginScreen');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Image source={imageSrc} style={styles.imageStyle} />
        <Text style={styles.headerText}>Email Confirmation</Text>
        <View style={styles.signupContainer}>
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              email: '',
              confirmationCode: '',
            }}
            onSubmit={values => submitHandler(values)}>
            {({handleSubmit, isValid, values}) => (
              <>
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomInput}
                  name="confirmationCode"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <View style={styles.btn}>
                  <Button
                    color="#ff000d"
                    onPress={handleSubmit}
                    title="Confirm"
                    //   disabled={!isValid || values.email === ''}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(10),
    alignItems: 'center',
  },
  signupContainer: {
    width: wp(90),
    margin: hp(5),
    alignItems: 'center',
    padding: 5,
  },
  btn: {
    top: hp(7),
    width: wp(85),
    height: hp(25),
    borderRadius: 5,
    margin: 10,
  },
  imageStyle: {
    height: hp(15),
    width: wp(30),
  },
  headerText: {
    fontSize: 20,
    paddingTop: 10,
  },
});

export default App;
