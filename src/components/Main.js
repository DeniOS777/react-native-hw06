import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { chooseNavigation } from '../routes/Routes';
import { authChangeStateUser } from '../redux/auth/authOperations';

export const Main = () => {
  const { isLogedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authChangeStateUser());
  }, []);

  const routes = chooseNavigation(isLogedIn);

  return <NavigationContainer>{routes}</NavigationContainer>;
};
