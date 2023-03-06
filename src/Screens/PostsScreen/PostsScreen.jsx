import React, { useState, useEffect } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { collection, getDocs, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';

import { styles } from './PostsScreen.styled';

const Item = ({ item, navigation }) => (
  <View style={{ marginBottom: 32 }}>
    <Image style={styles.imagePosts} source={{ uri: `${item.photo}` }} />
    <Text style={styles.imageTitle}>{item.title}</Text>
    <View style={styles.descriptionContainer}>
      <View style={styles.wrapContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Comments', { photo: item.photo })}
        >
          <EvilIcons name="comment" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <Text style={styles.textComment}>{item.comments}</Text>
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

export const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    onSnapshot(collection(db, 'posts'), data =>
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  console.log('In state', posts);

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
          <Text style={styles.textName}>Derek Menson</Text>
          <Text style={styles.textEmail}>derek_menson@mail.com</Text>
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

// const getAllPosts = async () => {
//   const querySnapshot = await getDocs(collection(db, 'posts'));
//   setPosts(
//     querySnapshot.docs.map(doc => ({
//       ...doc.data(),
//       id: doc.id,
//     }))
//   );
// };
