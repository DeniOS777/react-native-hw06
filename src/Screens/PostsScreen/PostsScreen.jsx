import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ItemList } from '../../components/ItemList';

import { styles } from './PostsScreen.styled';

const dummyAvatar = require('../../../assets/dummyUserProfile.png');

export const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { login, email, avatar } = useSelector(state => state.auth);

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
            source={avatar ? { uri: avatar } : dummyAvatar}
          />
        </View>

        <View>
          <Text style={styles.textName}>{login}</Text>
          <Text style={styles.textEmail}>{email}</Text>
        </View>
      </View>

      <View style={{ paddingBottom: 90 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({ item }) => (
            <ItemList navigation={navigation} item={item} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};
