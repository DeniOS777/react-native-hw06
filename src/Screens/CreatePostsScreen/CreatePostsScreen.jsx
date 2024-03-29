import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import uuid from 'react-native-uuid';

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
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      setPhoto('');
      setPlace('');
      setTitle('');
      setIsLoading(false);
    }
  }, [isFocused]);

  const handleTitle = text => setTitle(text);
  const handlePlace = text => setPlace(text);

  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);

  const makePhoto = async () => {
    try {
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);
    } catch (error) {}
  };

  const deleteMadePhoto = () => setPhoto('');

  const isPostReady = () => {
    if (!photo || !title || !place) return false;
    return true;
  };

  const notificationPopUp = () =>
    Alert.alert(
      'Notification',
      'Please fill in all fields and make a photo to send the post.',
      [{ text: 'OK', onPress: () => null }]
    );

  const changeCameraType = () =>
    type === 'back' ? setType(CameraType.front) : setType(CameraType.back);

  const uploadPhotoToStorage = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const photoId = uuid.v4();
      const storageRef = ref(storage, `postImage/${photoId}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(ref(storage, `postImage/${photoId}`));
    } catch (error) {}
  };

  const uploadPostToServer = async () => {
    if (!isPostReady()) return notificationPopUp();
    try {
      setIsLoading(true);
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
      setIsLoading(false);
      navigation.navigate('Posts');
      setPhoto('');
      setTitle('');
      setPlace('');
    } catch (error) {}
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {isFocused ? (
            <Camera
              ref={setCameraRef}
              type={type}
              style={{ ...styles.camera, height: isFocus ? 140 : 240 }}
            >
              {photo && (
                <Image
                  source={{ uri: photo }}
                  style={{ ...styles.image, height: isFocus ? 140 : 240 }}
                />
              )}
              <TouchableOpacity
                onPress={makePhoto}
                activeOpacity={0.8}
                style={{
                  ...styles.addPhotoButton,
                  backgroundColor: photo
                    ? 'rgba(255, 255, 255, 0.3);'
                    : '#ffffff',
                }}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={24}
                  color={photo ? '#ffffff' : '#BDBDBD'}
                />
              </TouchableOpacity>
            </Camera>
          ) : null}

          <View style={styles.containerControls}>
            {photo ? (
              <TouchableOpacity onPress={deleteMadePhoto} activeOpacity={0.5}>
                <Text style={styles.deletePhoto}>Удалить фото</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.downloadTitle}>Загрузите фото</Text>
            )}
            <TouchableOpacity
              onPress={changeCameraType}
              activeOpacity={0.5}
              style={styles.btnChangeCameraType}
            >
              <Ionicons
                name="camera-reverse"
                size={26}
                color={type === 'back' ? '#000000' : '#ffffff'}
              />
            </TouchableOpacity>
          </View>

          <View>
            <TextInput
              onChangeText={handleTitle}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={title}
              maxLength={25}
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
              style={styles.inputTitle}
            />
            <TextInput
              onChangeText={handlePlace}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={place}
              maxLength={30}
              placeholder="Местность..."
              placeholderTextColor="#BDBDBD"
              style={styles.inputLocation}
            />
            <TouchableOpacity
              disabled={isLoading ? true : false}
              onPress={uploadPostToServer}
              activeOpacity={0.8}
              style={{
                ...styles.button,
                backgroundColor: isPostReady() ? '#FF6C00' : '#F6F6F6',
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text
                  style={{
                    ...styles.buttonText,
                    color: isPostReady() ? '#ffffff' : '#BDBDBD',
                  }}
                >
                  Опубликовать
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
