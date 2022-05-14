import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../../styles/homefeed';

import ProgressiveImage from './progressiveImage';

import {AuthContext} from '../../navigation/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PostCard = ({item, onDelete, onPress}) => {
  const {user, logout} = useContext(AuthContext);
  let likeIcon = item.liked ? 'heart' : 'heart-outline';
  let likeIconColor = item.liked ? '#2e64e5' : '#333';
  let likeText;
  let commentText;
  if (item.likes === 1) {
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes';
  } else {
    likeText = 'Like';
  }

  if (item.comments === 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }

  const userImg = item?.owner?.picture
    ? {uri: item.owner.picture}
    : require('../../assets/users/authUser.png');

  return (
    <Card key={item.id}>
      <UserInfo>
        <UserImg source={userImg} />
        <UserInfoText>
          <TouchableOpacity onPress={onPress}>
            <UserName>
              {item?.owner?.firstName
                ? item?.owner?.firstName || 'Test'
                : 'Test'}{' '}
              {item?.owner?.lastName ? item?.owner?.lastName || 'User' : 'User'}
            </UserName>
          </TouchableOpacity>
          <PostTime>{moment(item.publishDate).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.text}</PostText>
      {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */}
      {item.image != null ? (
        <ProgressiveImage
          defaultImageSource={require('../../assets/default-img.jpg')}
          source={{uri: item.image}}
          style={{width: '100%', height: 250}}
          resizeMode="cover"
        />
      ) : (
        <Divider />
      )}

      <InteractionWrapper>
        <Interaction active={true}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <InteractionText active={true}>{likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
        {user.uid === item?.owner?.id ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} />
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
