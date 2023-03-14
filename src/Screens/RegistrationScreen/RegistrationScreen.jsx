import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import uuid from 'react-native-uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/config';
import { authSignUpUser } from '../../redux/auth/authOperations';

import { styles } from './RegistrationScreen.styled';

const imagePath = require('../../../assets/images/bg-photo.png');
const dummyAvatar = require('../../../assets/dummyUserProfile.png');

export const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [isFocusedLogin, setFocusedLogin] = useState(false);
  const [isFocusedEmail, setFocusedEmail] = useState(false);
  const [isFocusedPassword, setFocusedPassword] = useState(false);
  const [isSpaceKeyboard, setIsSpaceKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = text => setLogin(text);
  const handleEmail = text => setEmail(text);

  const handleShowPassword = text => {
    if (!text) setIsShowPassword(false);
    setPassword(text);
  };

  const notificationPopUp = () =>
    Alert.alert('Notification', 'Please, fill in all fields to register', [
      { text: 'OK', onPress: () => null },
    ]);

  //------------------------------------------------------------------------------//
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  //------------------------------------------------------------------------------//

  const handleFocusLogin = () => {
    setFocusedLogin(true);
    setIsSpaceKeyboard(true);
  };
  const handleBlurLogin = () => {
    setFocusedLogin(false);
    setIsSpaceKeyboard(false);
  };

  const handleFocusEmail = () => {
    setFocusedEmail(true);
    setIsSpaceKeyboard(true);
  };
  const handleBlurEmail = () => {
    setFocusedEmail(false);
    setIsSpaceKeyboard(false);
  };

  const handleFocusPassword = () => {
    setFocusedPassword(true);
    setIsSpaceKeyboard(true);
  };
  const handleBlurPassword = () => {
    setFocusedPassword(false);
    setIsSpaceKeyboard(false);
  };

  const showPassword = () => {
    if (!password) return;
    setIsShowPassword(isShowPassword => !isShowPassword);
  };

  const uploadPhotoToStorage = async () => {
    try {
      const response = await fetch(image);
      const file = await response.blob();
      const photoId = uuid.v4();
      const storageRef = ref(storage, `userAvatar/${photoId}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(ref(storage, `userAvatar/${photoId}`));
    } catch (error) {}
  };

  const handleSubmit = async () => {
    if (!login || !email || !password) return notificationPopUp();
    try {
      setIsLoading(true);
      const userPhoto = await uploadPhotoToStorage();
      dispatch(authSignUpUser({ userPhoto, login, email, password }));
      setImage('');
      setLogin('');
      setEmail('');
      setPassword('');
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  console.log(image);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerPage}>
        <ImageBackground source={imagePath} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.containerForm}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isSpaceKeyboard ? -30 : 0,
              }}
            >
              <View style={styles.containerAvatar}>
                <Image
                  source={image ? { uri: image } : dummyAvatar}
                  alt="user photo"
                  style={styles.avatar}
                />
              </View>

              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.5}
                style={styles.btnDeleteAvatar}
              >
                <Feather name="plus-circle" size={24} color="#FF6C00" />
              </TouchableOpacity>

              <Text style={styles.title}>Регистрация</Text>

              <TextInput
                onFocus={handleFocusLogin}
                onBlur={handleBlurLogin}
                onChangeText={handleLogin}
                value={login}
                keyboardType="default"
                placeholderTextColor="#BDBDBD"
                style={{
                  ...styles.input,
                  borderColor: isFocusedLogin ? '#FF6C00' : '#E8E8E8',
                  backgroundColor: isFocusedLogin ? '#ffffff' : '#F6F6F6',
                }}
                placeholder="Login"
              />

              <TextInput
                onFocus={handleFocusEmail}
                onBlur={handleBlurEmail}
                onChangeText={handleEmail}
                value={email}
                keyboardType="email-address"
                placeholderTextColor="#BDBDBD"
                style={{
                  ...styles.input,
                  borderColor: isFocusedEmail ? '#FF6C00' : '#E8E8E8',
                  backgroundColor: isFocusedEmail ? '#ffffff' : '#F6F6F6',
                }}
                placeholder="Адрес электронной почты"
              />

              <View style={styles.inputWrapper}>
                <TextInput
                  onFocus={handleFocusPassword}
                  onBlur={handleBlurPassword}
                  onChangeText={handleShowPassword}
                  maxLength={23}
                  value={password}
                  keyboardType="default"
                  placeholderTextColor="#BDBDBD"
                  style={{
                    ...styles.input,
                    marginBottom: 0,
                    borderColor: isFocusedPassword ? '#FF6C00' : '#E8E8E8',
                    backgroundColor: isFocusedPassword ? '#ffffff' : '#F6F6F6',
                  }}
                  secureTextEntry={isShowPassword ? false : true}
                  placeholder="Пароль"
                />
                <TouchableOpacity
                  onPress={showPassword}
                  activeOpacity={0.8}
                  style={styles.buttonShowPassword}
                >
                  <Text style={{ ...styles.buttonTitle, color: '#000080' }}>
                    Показать
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.8}
                style={styles.button}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.buttonTitle}>Зарегистрироваться</Text>
                )}
              </TouchableOpacity>

              <View style={styles.wrapTextAndLink}>
                <Text style={styles.text}>Уже есть аккаунт?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                  activeOpacity={0.6}
                >
                  <Text style={styles.redirectLinkTitle}>Войти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
