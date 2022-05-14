/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';

import PostCard from '../components/PostCard';

import {Container} from '../styles/homefeed';

import {fetchPosts} from '../utils/post';
import {getPostData} from '../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = useState(null);
  const handleDelete = () => {
    console.log('deleted function');
  };

  const getPostFromStorage = async () => {
    try {
      const remotePost = await post();
      const jsonValue = await AsyncStorage.getItem('user_poster');
      const postFromStorage = JSON.parse(jsonValue);
      if (postFromStorage.length > 0) {
        setPosts([...postFromStorage, ...remotePost]);
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  const post = async () => {
    const response = await fetchPosts();
    return response;
  };

  useEffect(() => {
    getPostFromStorage();
  }, []);

  const ListHeader = () => {
    return null;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <FlatList
          data={posts}
          renderItem={({item}) => (
            <PostCard
              item={item}
              onDelete={handleDelete}
              onPress={() =>
                navigation.navigate('HomeScreen', {userId: item.userId})
              }
            />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListHeader}
          showsVerticalScrollIndicator={false}
        />
      </Container>
    </SafeAreaView>
  );
};

export default HomeScreen;
