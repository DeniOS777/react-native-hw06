import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { styles } from './RegistrationScreen.styled';

const imagePath = require('../../../assets/images/bg-photo.png');

export const RegistrationScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocusedLogin, setFocusedLogin] = useState(false);
  const [isFocusedEmail, setFocusedEmail] = useState(false);
  const [isFocusedPassword, setFocusedPassword] = useState(false);
  const [isSpaceKeyboard, setIsSpaceKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleLogin = text => setLogin(text);
  const handleEmail = text => setEmail(text);
  const handlePassword = text => {
    if (!text) setIsShowPassword(false);
    setPassword(text);
  };

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

  const handleSubmit = () => {
    if (!login || !email || !password) return;
    console.log({ login, email, password });
    setLogin('');
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
                marginBottom: isSpaceKeyboard ? -173 : 0,
              }}
            >
              <Text style={styles.title}>Регистрация</Text>

              <View
                style={{
                  position: 'absolute',
                  top: -60,
                  alignSelf: 'center',
                  width: 120,
                  height: 120,
                  backgroundColor: '#F6F6F6',
                  borderRadius: 16,
                }}
              >
                <TextInput />
              </View>

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
                  <Text style={{ ...styles.buttonTitle, color: '#1B4371' }}>
                    Показать
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.8}
                style={styles.button}
              >
                <Text style={styles.buttonTitle}>Зарегистрироваться</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                activeOpacity={0.6}
                style={styles.buttonRedirect}
              >
                <Text style={styles.redirectTitle}>
                  Уже есть аккаунт? Войти
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
