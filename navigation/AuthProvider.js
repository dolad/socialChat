import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {
  addUserIdToLocalStorage,
  removeUserIdFromLocalStorage,
} from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          addUserIdToLocalStorage(auth().currentUser.uid);
        });
    } catch (e) {
      Alert.alert('Invalid User credentials');
    }
  };

  const register = async (email, fullname, password) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .set({
              fullname,
              email,
              createdAt: firestore.Timestamp.fromDate(new Date()),
              userImg: null,
            })
            .catch(error => {
              console.log(
                'Something went wrong with added user to firestore: ',
                error,
              );
            });
        })
        .catch(error => {
          console.log('Something went wrong with sign up: ', error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    try {
      await removeUserIdFromLocalStorage();
      await auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
