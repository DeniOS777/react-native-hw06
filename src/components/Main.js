import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
// import { useSelector } from 'react-redux';
import { auth } from '../firebase/config';
import { chooseNavigation } from '../routes/Routes';

export const Main = () => {
  const [user, setUser] = useState(false);

  onAuthStateChanged(auth, user => setUser(user));

  const routes = chooseNavigation(user);

  return <NavigationContainer>{routes}</NavigationContainer>;
};
