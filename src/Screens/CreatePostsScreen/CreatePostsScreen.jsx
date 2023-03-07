import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { nanoid } from 'nanoid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import { storage, db } from '../../firebase/config';

import { styles } from './CreatePostsScreen.styled';

export const CreatePostsScreen = ({ navigation }) => {
  const { login, userId } = useSelector(state => state.auth);
  const isFocused = useIsFocused();
  const [type, setType] = useState(CameraType.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [isFocus, setIsFocus] = useState(true);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  const handleTitle = text => setTitle(text);
  const handlePlace = text => setPlace(text);
  const handleFocus = () => setIsFocus(false);

  const makePhoto = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    setPhoto(uri);
  };

  const isPostReady = () => {
    if (!photo || !title || !place) return false;
    return true;
  };

  const uploadPhotoToStorage = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const photoId = nanoid();
    const storageRef = ref(storage, `postImage/${photoId}`);
    await uploadBytes(storageRef, file);

    return await getDownloadURL(ref(storage, `postImage/${photoId}`));
  };

  const uploadPostToServer = async () => {
    if (!isPostReady()) return;
    const response = await Location.getCurrentPositionAsync({});
    const location = {
      longitude: response.coords.longitude,
      latitude: response.coords.latitude,
    };
    const photoFromStorage = await uploadPhotoToStorage();
    await addDoc(collection(db, 'posts'), {
      userId,
      login,
      photo: photoFromStorage,
      title,
      place,
      location,
    });
    navigation.navigate('Posts');
    setPhoto('');
    setTitle('');
    setPlace('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {isFocused ? (
            <Camera ref={setCameraRef} type={type} style={styles.camera}>
              {photo && <Image source={{ uri: photo }} style={styles.image} />}
              <TouchableOpacity
                onPress={makePhoto}
                activeOpacity={0.8}
                style={styles.addPhotoButton}
              >
                <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>
          ) : null}
          <Text style={styles.downloadTitle}>Загрузите фото</Text>

          <View style={{ paddingBottom: isFocus ? 100 : 20 }}>
            <TextInput
              onChangeText={handleTitle}
              onFocus={handleFocus}
              value={title}
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
              style={styles.inputTitle}
            />
            <TextInput
              onChangeText={handlePlace}
              value={place}
              placeholder="Местность..."
              placeholderTextColor="#BDBDBD"
              style={styles.inputLocation}
            />
            <TouchableOpacity
              onPress={uploadPostToServer}
              activeOpacity={0.8}
              style={{
                ...styles.button,
                backgroundColor: isPostReady() ? '#FF6C00' : '#F6F6F6',
              }}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: isPostReady() ? '#ffffff' : '#BDBDBD',
                }}
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
