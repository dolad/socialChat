/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Image, useWindowDimensions} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {Feather} from '@expo/vector-icons';
import React, {useContext, useState, useEffect} from 'react';
import NotFoundScreen from '../screens/NotFoundScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

//  import ChatRoomScreen from '../screens/ChatRoomScreen';
import HomeScreen from '../screens/HomeScreen';
import HomeScreen2 from '../screens/HomeScreen2';
import Color from '../constants/Colors';

import SplashScreen from '../screens/SplashScreens';
import OnboardingScreen from '../screens/OnboardingScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import EmailConfirmation from '../screens/EmailConfirmation';
import LoginScreen from '../screens/LoginScreen';
import {AuthContext, AuthProvider} from './AuthProvider';
import auth from '@react-native-firebase/auth';
import AddPostScreen from '../screens/AddPostScreen';
import {getUserIdFromLocalStorage} from '../utils/storage';

function Navigation({colorScheme}) {
  const [userId, setUserid] = useState(null);
  const {user, setUser, logout} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  const checkLocalStorageUser = async () => {
    const localStorageUser = await getUserIdFromLocalStorage();
    setUserid(localStorageUser);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    checkLocalStorageUser();
    return subscriber; // unsubscribe on unmount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  console.log(user);

  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

const AppStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen2}
        options={{
          headerTitle: props => (
            <HomeHeader navigation={navigation} {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerTitle: HomeHeader}}
      />
      <Stack.Screen
        name="AddPostScreen"
        component={AddPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScren">
      <Stack.Screen
        name="SplashScren"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EmailConfirmation"
        component={EmailConfirmation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerTitle: HomeHeader}}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
    </Stack.Navigator>
  );
};

const HomeHeader = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const {logout, setUser} = useContext(AuthContext);

  const signOut = async () => {
    await logout();
  };

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width,
        padding: 10,
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/users/authUser.png')}
        style={{width: 30, height: 30, borderRadius: 30}}
      />
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          textAlign: 'center',
          fontWeight: 'bold',
          left: 20,
        }}>
        Social Chat
      </Text>
      <FontAwesome5.Button
        name="plus"
        size={22}
        backgroundColor="#fff"
        color={Color.red.background}
        onPress={() => navigation.navigate('AddPostScreen')}
      />
      <AntDesign
        name="logout"
        size={18}
        color="red"
        style={{marginHorizontal: 10, left: -10}}
        onPress={signOut}
      />
    </View>
  );
};

export default function Provider() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
