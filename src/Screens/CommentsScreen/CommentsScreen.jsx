import React, { useState, useEffect } from 'react';
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
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { styles } from './CommentsScreen.styled';

const dummyUrl = 'https://dummyimage.com/28x28/0e8488/0E8388.jpg';

const Item = ({ item }) => (
  <View style={styles.itemComments}>
    <View style={styles.imageWrap}>
      <Image style={styles.imageAvatar} source={{ uri: dummyUrl }} />
    </View>

    <View style={styles.textCommentsWrap}>
      <Text style={styles.text}>{item.comment}</Text>
      <Text style={styles.date}>{new Date().toLocaleString()}</Text>
    </View>
  </View>
);

export const CommentsScreen = ({ route }) => {
  const { photo, postId } = route.params;
  const { login } = useSelector(state => state.auth);
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const handleInput = text => setComment(text);

  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);

  const uploadCommentToServer = async () => {
    const postsRef = collection(db, 'posts');
    await addDoc(collection(postsRef, postId, 'comments'), {
      login,
      comment,
    });
  };

  const downloadCommentsFromServer = async () => {
    const postsRef = collection(db, 'posts');
    onSnapshot(collection(postsRef, postId, 'comments'), data =>
      setAllComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    downloadCommentsFromServer();
  }, []);

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
            <Image
              source={{ uri: photo }}
              style={{
                ...styles.image,
                width: isFocus ? 300 : '100%',
                height: isFocus ? 140 : 220,
              }}
            />
          </View>

          <View style={{ height: isFocus ? 70 : 240, marginBottom: 20 }}>
            <FlatList
              data={allComments}
              renderItem={({ item }) => <Item item={item} />}
              keyExtractor={item => item.id}
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              onFocus={handleFocus}
              onBlur={handleBlur}
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
