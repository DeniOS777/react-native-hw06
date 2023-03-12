import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { authSignInUser } from '../../redux/auth/authOperations';
import { useSelector, useDispatch } from 'react-redux';

import { styles } from './LoginScreen.styled';

const imagePath = require('../../../assets/images/bg-photo.png');

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocusedEmail, setFocusedEmail] = useState(false);
  const [isFocusedPassword, setFocusedPassword] = useState(false);
  const [isSpaceKeyboard, setIsSpaceKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.auth);

  const handleEmail = text => setEmail(text);
  const handlePassword = text => {
    if (!text) setIsShowPassword(false);
    setPassword(text);
  };

  const notificationPopUp = () =>
    Alert.alert('Notification', 'Please, fill in all fields to login', [
      { text: 'OK', onPress: () => null },
    ]);

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

  const handleSubmit = () => {
    if (!email || !password) return notificationPopUp();
    dispatch(authSignInUser({ email, password }));
    setEmail('');
    setPassword('');
  };

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
                marginBottom: isSpaceKeyboard ? -20 : 0,
              }}
            >
              <Text style={styles.title}>Войти</Text>
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
                  onChangeText={handlePassword}
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
                  <Text style={styles.buttonTitle}>Войти</Text>
                )}
              </TouchableOpacity>

              <View style={styles.wrapTextAndLink}>
                <Text style={styles.text}>Нет аккаунта?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Registration')}
                  activeOpacity={0.6}
                >
                  <Text style={styles.redirecLinkTitle}>
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
