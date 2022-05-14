/* eslint-disable no-shadow */
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/addPost';

import {AuthContext} from '../navigation/AuthProvider';
import RNFetchBlob from 'rn-fetch-blob';
import {addPostData} from '../utils/storage';
import {useNavigation} from '@react-navigation/native';

const AddPostScreen = () => {
  const navigation = useNavigation();
  const {user, logout} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      const base64Data = image.data;
      const fileName = getUniqueFileName('jpg');
      writeFileToStorage(base64Data, fileName);
      setImage(image.path);
    });
  };

  const getUniqueFileName = fileExt => {
    //It is better naming file with current timestamp to achieve unique name
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var fileName = 'IMG' + year + month + date + hour + minute + '.' + fileExt;
    return fileName;
  };

  const writeFileToStorage = async (base64Data, fileName) => {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        const dirs = RNFetchBlob.fs.dirs;
        var folderPath = dirs.SDCardDir + '/SocialChats/';
        var fullPath = folderPath + fileName;

        RNFetchBlob.fs.exists(folderPath).then(exist => {
          if (!exist) {
            RNFetchBlob.fs.mkdir(folderPath).then(res => {
              console.log('res', res);
            });
          }
          RNFetchBlob.fs.writeFile(fullPath, base64Data, 'base64').then(res => {
            console.log('file saved :', res);
          });
        });
      } else {
        console.log('Permission Not Granted');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitPost = async () => {
    if (image === null) {
      return;
    }
    const postData = {
      id: 'id' + new Date().getTime(),
      likes: null,
      comments: null,
      publishDate: new Date(),
      text: post,
      image: image,
      owner: {
        id: user.uid,
        tile: 'mr',
        firstName: 'Akande',
        lastName: 'David',
        picture: '',
      },
    };
    await addPostData(postData);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <InputWrapper>
        {image != null ? <AddImage source={{uri: image}} /> : null}

        <InputField
          placeholder="What's on your mind?"
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={content => setPost(content)}
        />

        <SubmitBtn onPress={submitPost}>
          <SubmitBtnText>Post</SubmitBtnText>
        </SubmitBtn>
      </InputWrapper>
      <ActionButton buttonColor="#ff003b">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default AddPostScreen;
