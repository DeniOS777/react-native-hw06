import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { authSignOutUser } from '../../redux/auth/authOperations';

import { styles } from './ProfileScreen.styled';

const imagePath = require('../../../assets/images/bg-photo.png');
const avatar = require('../../../assets/userPhoto.jpg');

const Item = ({ item, navigation }) => (
  <View style={{ marginBottom: 32 }}>
    <Image style={styles.imagePosts} source={{ uri: `${item.photo}` }} />
    <Text style={styles.imageTitle}>{item.title}</Text>
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

const ListTitle = ({ title }) => <Text style={styles.listTitle}>{title}</Text>;

export const ProfileScreen = ({ navigation }) => {
  const { userId, login } = useSelector(state => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  const dispatch = useDispatch();

  const getPostsCurrentUser = async () => {
    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    onSnapshot(q, data =>
      setUserPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getPostsCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={imagePath} style={styles.image}>
        <ScrollView style={{ paddingTop: 120, position: 'relative' }}>
          <View style={styles.containerAvatar}>
            <Image source={avatar} style={styles.avatar} />
          </View>

          <TouchableOpacity
            onPress={null}
            activeOpacity={0.5}
            style={styles.btnDeleteAvatar}
          >
            <Feather name="plus-circle" size={24} color="#E8E8E8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(authSignOutUser())}
            activeOpacity={0.6}
            style={styles.btnLogOut}
          >
            <MaterialIcons name="logout" size={24} color="#b22222" />
          </TouchableOpacity>

          <FlatList
            scrollEnabled={false}
            ListHeaderComponent={<ListTitle title={login} />}
            style={styles.postsList}
            data={userPosts}
            renderItem={({ item }) => (
              <Item navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
