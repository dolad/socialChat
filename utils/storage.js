import AsyncStorage from '@react-native-async-storage/async-storage';

export const addPostData = async value => {
  try {
    let prevPost = [];
    prevPost = await getPostData();
    const data = prevPost ? prevPost.unshift(value) : prevPost.push(value);
    console.log(prevPost);
    const jsonValue = JSON.stringify(prevPost);
    await AsyncStorage.setItem('user_poster', jsonValue);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const addUserIdToLocalStorage = async value => {
  try {
    await AsyncStorage.setItem('user_id', value);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const removeUserIdFromLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem('user_id');
  } catch (error) {
    console.log(error);
  }
};

export const getUserIdFromLocalStorage = async () => {
  try {
    const userId = await AsyncStorage.getItem('user_id');
    return userId;
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const getPostData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user_poster');
    console.log('inside jsonvalue', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e);
    // error reading value
  }
};
