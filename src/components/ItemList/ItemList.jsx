import React, { useState, useEffect } from 'react';
import { Text, View, Alert, Image, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {
  collection,
  getCountFromServer,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../firebase/config';

import { styles } from './ItemList.styled';

export const ItemList = ({ item, navigation }) => {
  const [count, setCount] = useState(0);

  const confirmationPopUp = postId =>
    Alert.alert('Confirm', 'Are you sure that you want to delete this post?', [
      { text: 'Cancel', onPress: () => null },
      { text: 'Yes', onPress: () => deletePost(postId) },
    ]);

  const deletePost = async postId => {
    try {
      await deleteDoc(doc(db, 'posts', `${postId}`));
    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      const coll = collection(db, `posts/${item.id}/comments`);
      const snapshot = await getCountFromServer(coll);
      setCount(snapshot.data().count);
    })();
  }, []);

  return (
    <View style={{ marginBottom: 32 }}>
      <Image style={styles.imagePosts} source={{ uri: `${item.photo}` }} />
      <View style={styles.wrapTitleAndDelete}>
        <Text style={styles.imageTitle}>{item.title}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => confirmationPopUp(item.id)}
        >
          <Feather name="trash-2" size={24} color="#b22222" />
        </TouchableOpacity>
      </View>

      <View style={styles.descriptionContainer}>
        <View style={styles.wrapContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate('Comments', {
                photo: item.photo,
                postId: item.id,
              })
            }
          >
            <FontAwesome
              name="comment"
              size={20}
              color={count > 0 ? '#FF6C00' : '#BDBDBD'}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...styles.textComment,
              color: count > 0 ? '#2a2a2a' : '#BDBDBD',
            }}
          >
            {count}
          </Text>
        </View>

        <View style={styles.wrapContainer}>
          <EvilIcons name="location" size={24} color="#BDBDBD" />
          <TouchableOpacity
            onPress={() => navigation.navigate('Map', { ...item.location })}
            activeOpacity={0.5}
          >
            <Text style={styles.textPlace}>{item.place}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
