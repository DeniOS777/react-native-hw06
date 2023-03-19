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
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { authSignOutUser } from '../../redux/auth/authOperations';
import { ItemList } from '../../components/ItemList/';

import { styles } from './ProfileScreen.styled';

const imagePath = require('../../../assets/images/bg-photo.png');
const dummyAvatar = require('../../../assets/dummyUserProfile.png');

const ListTitle = ({ title }) => <Text style={styles.listTitle}>{title}</Text>;

export const ProfileScreen = ({ navigation }) => {
  const { userId, login, avatar } = useSelector(state => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  const dispatch = useDispatch();

  const getPostsCurrentUser = async () => {
    try {
      const q = query(collection(db, 'posts'), where('userId', '==', userId));
      onSnapshot(q, data =>
        setUserPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      );
    } catch (error) {}
  };

  useEffect(() => {
    getPostsCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={imagePath} style={styles.image}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 120, position: 'relative' }}
        >
          <View style={styles.containerAvatar}>
            <Image
              source={avatar ? { uri: avatar } : dummyAvatar}
              style={styles.avatar}
            />
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
              <ItemList navigation={navigation} item={item} />
            )}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
