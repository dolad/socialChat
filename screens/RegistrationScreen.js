import React, {useContext} from 'react';
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
import {AuthContext} from '../navigation/AuthProvider';

const App = () => {
  const navigation = useNavigation();
  const {register} = React.useContext(AuthContext);
  const imageSrc = require('../assets/images/stafforshire.png');

  const submitHandler = values => {
    console.log(values);
    const {email, fullName, password} = values;
    register(email, fullName, password);
    navigation.navigate('LoginScreen');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Image source={imageSrc} style={styles.imageStyle} />
        <Text style={styles.headerText}>Sign Up</Text>

        <View style={styles.signupContainer}>
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              fullName: '',
              email: '',
              phoneNumber: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values => submitHandler(values)}>
            {({handleSubmit, isValid, values}) => (
              <>
                <Field
                  component={CustomInput}
                  name="fullName"
                  title="Full Name"
                  placeholder="Fullname"
                />
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomInput}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry
                />
                <Field
                  component={CustomInput}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  secureTextEntry
                />

                <View style={styles.btn}>
                  <Button
                    color="#ff000d"
                    onPress={handleSubmit}
                    title="SIGN UP"
                    // disabled={!isValid || values.email === ''}
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
  },
});

export default App;
