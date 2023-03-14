import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

import { styles } from './CommentsScreen.styled';

const dummyAvatar = require('../../../assets/dummyUserProfile.png');

const Item = ({ item }) => {
  const formatedDate = new Date(
    item.createdAt?.seconds * 1000
  ).toLocaleString();

  return (
    <View style={styles.itemComments}>
      <View style={styles.imageWrap}>
        <Image style={styles.imageAvatar} source={item.avatar ?? dummyAvatar} />
      </View>

      <View style={styles.textCommentsWrap}>
        <Text style={styles.text}>{item.comment}</Text>
        <Text style={styles.date}>{formatedDate}</Text>
      </View>
    </View>
  );
};

export const CommentsScreen = ({ route }) => {
  const { photo, postId } = route.params;
  const { login, avatar } = useSelector(state => state.auth);
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const handleInput = text => setComment(text);

  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);

  const notificationPopUp = () =>
    Alert.alert('Notification', 'Please, enter the text to send a comment', [
      { text: 'OK', onPress: () => null },
    ]);

  const uploadCommentToServer = async () => {
    try {
      const postsRef = collection(db, 'posts');
      await addDoc(collection(postsRef, postId, 'comments'), {
        login,
        avatar,
        comment,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const downloadCommentsFromServer = () => {
    const postsRef = collection(db, 'posts');
    onSnapshot(collection(postsRef, postId, 'comments'), data =>
      setAllComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    downloadCommentsFromServer();
  }, []);

  const submitComment = () => {
    if (!comment) return notificationPopUp();
    uploadCommentToServer();
    setComment('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
        </TouchableWithoutFeedback>

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
  );
};
