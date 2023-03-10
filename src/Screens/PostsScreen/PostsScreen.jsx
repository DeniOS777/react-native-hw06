import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { styles } from './PostsScreen.styled';

const Item = ({ item, navigation }) => {
  const deletePost = async postId => {
    try {
      await deleteDoc(doc(db, 'posts', `${postId}`));
    } catch (error) {}
  };

  return (
    <View style={{ marginBottom: 32 }}>
      <Image style={styles.imagePosts} source={{ uri: `${item.photo}` }} />

      <View style={styles.wrapTitleAndDelete}>
        <Text style={styles.imageTitle}>{item.title}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => deletePost(item.id)}
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
            <EvilIcons name="comment" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.textComment}>1</Text>
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

export const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { login, email } = useSelector(state => state.auth);

  const getAllPosts = () => {
    onSnapshot(collection(db, 'posts'), data =>
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerProfile}>
        <View style={styles.wrapImageProfile}>
          <Image
            style={styles.imageProfile}
            source={require('../../../assets/userPhoto.jpg')}
          />
        </View>

        <View>
          <Text style={styles.textName}>{login}</Text>
          <Text style={styles.textEmail}>{email}</Text>
        </View>
      </View>

      <View style={{ paddingBottom: 90 }}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <Item navigation={navigation} item={item} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
