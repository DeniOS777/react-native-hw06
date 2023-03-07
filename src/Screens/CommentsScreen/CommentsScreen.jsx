import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { styles } from './CommentsScreen.styled';

const list = [
  {
    id: '1',
    text: 'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!',
    url: 'https://via.placeholder.com/28x28',
    date: '09 июня, 2020 | 08:40',
  },
  {
    id: '2',
    text: 'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.',
    url: 'https://via.placeholder.com/28x28',
    date: '09 июня, 2020 | 09:14',
  },
  {
    id: '3',
    text: 'Thank you! That was very helpful!',
    url: 'https://via.placeholder.com/28x28',
    date: '09 июня, 2020 | 09:20',
  },
];

const Item = ({ item }) => (
  <View style={styles.itemComments}>
    <View style={styles.imageWrap}>
      <Image style={styles.imageAvatar} source={{ uri: `${item.url}` }} />
    </View>

    <View style={styles.textCommentsWrap}>
      <Text style={styles.text}>{item.text}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  </View>
);

export const CommentsScreen = ({ route }) => {
  const { photo, postId } = route.params;
  const { login } = useSelector(state => state.auth);
  const [comment, setComment] = useState('');

  const handleInput = text => setComment(text);

  const uploadCommentToServer = async () => {
    const postsRef = collection(db, 'posts');
    await addDoc(collection(postsRef, postId, 'comments'), {
      login,
      comment,
    });
  };

  const submitComment = async () => {
    if (!comment) return;
    uploadCommentToServer();
    setComment('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: photo }} style={styles.image} />
          </View>

          <View style={{ height: 210 }}>
            <FlatList
              data={list}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={item => item.id}
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              onFocus={null}
              onBlur={null}
              onChangeText={handleInput}
              value={comment}
              keyboardType="default"
              placeholderTextColor="#BDBDBD"
              placeholder="Комментировать..."
              style={styles.input}
            />
            <TouchableOpacity
              onPress={submitComment}
              activeOpacity={0.8}
              style={styles.btnSendComment}
            >
              <Feather name="arrow-up" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
