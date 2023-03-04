import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/firebase/config';

import { chooseNavigation } from './src/routes';

const fontsMap = {
  'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(fontsMap);
  const [user, setUser] = useState(false); //----------------------

  onAuthStateChanged(auth, user => {
    setUser(user);
  });

  const routes = chooseNavigation(user);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>{routes}</NavigationContainer>
    </Provider>
  );
}
