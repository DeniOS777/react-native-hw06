import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { authSignOutUser } from '../../redux/auth/authOperations';

import { styles } from './ProfileScreen.styled';

const imagePath = require('../../../assets/images/bg-photo.png');

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
    const querySnapshot = await getDocs(q);
    setUserPosts(
      querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getPostsCurrentUser();
  }, []);

  console.log(userPosts);

  return (
    <View style={styles.container}>
      <ImageBackground source={imagePath} style={styles.image}>
        <ScrollView style={{ paddingTop: 120 }}>
          <SafeAreaView style={{ position: 'relative' }}>
            <View style={styles.containerAvatar}></View>
            <TouchableOpacity
              onPress={() => dispatch(authSignOutUser())}
              activeOpacity={0.6}
              style={styles.btnLogOut}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
            <FlatList
              ListHeaderComponent={<ListTitle title={login} />}
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 16,
                paddingTop: 90,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                paddingBottom: 120,
              }}
              data={userPosts}
              renderItem={({ item }) => (
                <Item navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
