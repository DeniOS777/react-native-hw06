import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Alert,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  collection,
  getCountFromServer,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { authSignOutUser } from '../../redux/auth/authOperations';
import { ItemList } from '../../components/ItemList/';

import { styles } from './ProfileScreen.styled';

const imagePath = require('../../../assets/images/bg-photo.png');
const dummyAvatar = require('../../../assets/dummyUserProfile.png');

// const Item = ({ item, navigation }) => {
//   const [count, setCount] = useState(0);

//   const confirmationPopUp = postId =>
//     Alert.alert('Confirm', 'Are you sure that you want to delete this post?', [
//       { text: 'Cancel', onPress: () => null },
//       { text: 'Yes', onPress: () => deletePost(postId) },
//     ]);

//   const deletePost = async postId => {
//     try {
//       await deleteDoc(doc(db, 'posts', `${postId}`));
//     } catch (error) {}
//   };

//   useEffect(() => {
//     (async () => {
//       const coll = collection(db, `posts/${item.id}/comments`);
//       const snapshot = await getCountFromServer(coll);
//       setCount(snapshot.data().count);
//     })();
//   }, []);

//   return (
//     <View style={{ marginBottom: 32 }}>
//       <Image style={styles.imagePosts} source={{ uri: `${item.photo}` }} />
//       <View style={styles.wrapTitleAndDelete}>
//         <Text style={styles.imageTitle}>{item.title}</Text>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           onPress={() => confirmationPopUp(item.id)}
//         >
//           <Feather name="trash-2" size={24} color="#b22222" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.descriptionContainer}>
//         <View style={styles.wrapContainer}>
//           <TouchableOpacity
//             activeOpacity={0.5}
//             onPress={() =>
//               navigation.navigate('Comments', {
//                 photo: item.photo,
//                 postId: item.id,
//               })
//             }
//           >
//             <FontAwesome
//               name="comment"
//               size={20}
//               color={count > 0 ? '#FF6C00' : '#BDBDBD'}
//             />
//           </TouchableOpacity>
//           <Text
//             style={{
//               ...styles.textComment,
//               color: count > 0 ? '#2a2a2a' : '#BDBDBD',
//             }}
//           >
//             {count}
//           </Text>
//         </View>

//         <View style={styles.wrapContainer}>
//           <EvilIcons name="location" size={24} color="#BDBDBD" />
//           <TouchableOpacity
//             onPress={() => navigation.navigate('Map', { ...item.location })}
//             activeOpacity={0.5}
//           >
//             <Text style={styles.textPlace}>{item.place}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

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
