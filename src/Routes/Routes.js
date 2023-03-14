import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  useNavigation,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { RegistrationScreen } from '../screens/RegistrationScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { PostsScreen } from '../screens/PostsScreen';
import { CreatePostsScreen } from '../screens/CreatePostsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CommentsScreen } from '../screens/CommentsScreen';
import { MapScreen } from '../screens/MapScreen';
import { authSignOutUser } from '../redux/auth/authOperations';

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isActiveTab = getFocusedRouteNameFromRoute(route);

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        options={({ route }) => ({
          title: 'Публикации',
          headerTitleAlign: 'center',
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: '#dcdcdc',
            backgroundColor: '#f8f8ff',
          },
          headerTitleStyle: { fontFamily: 'Roboto-Medium' },
          tabBarIconStyle: { marginLeft: 45 },
          tabBarStyle: { height: 82, borderTopWidth: 1 },
          tabBarItemStyle: { height: isActiveTab === 'Create' ? 0 : 82 },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => dispatch(authSignOutUser())}
              activeOpacity={0.6}
              style={{ paddingRight: 16 }}
            >
              <MaterialIcons name="logout" size={24} color="#b22222" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <View style={styles.buttonAllPosts}>
                <Ionicons name="ios-grid-outline" size={size} color="#ffffff" />
              </View>
            ) : (
              <Ionicons name="ios-grid-outline" size={size} color={color} />
            ),
        })}
        name="Posts"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          title: 'Создать публикацию',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontFamily: 'Roboto-Medium' },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: '#dcdcdc',
            backgroundColor: '#f8f8ff',
          },
          tabBarStyle: { height: 82, borderTopColor: 'transparent' },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Posts')}
              activeOpacity={0.6}
              style={{ paddingLeft: 16 }}
            >
              <SimpleLineIcons name="arrow-left" size={18} color="#4169e1" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <View style={styles.buttonAddPost}>
                <Feather name="trash-2" size={24} color="#BDBDBD" />
              </View>
            ) : (
              <Ionicons name="ios-add" size={size} color={color} />
            ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIconStyle: { marginRight: 45 },
          tabBarStyle: { height: 82, borderTopWidth: 1 },
          tabBarItemStyle: { height: isActiveTab === 'Create' ? 0 : 82 },
          tabBarIcon: ({ focused, size, color }) =>
            focused ? (
              <View style={styles.buttonProfile}>
                <Feather name="user" size={size} color="#ffffff" />
              </View>
            ) : (
              <Feather name="user" size={size} color={color} />
            ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export const chooseNavigation = isLogedIn => {
  if (!isLogedIn) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeTab}
      />
      <HomeStack.Screen
        options={{
          title: 'Комментарии',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: '#dcdcdc',
            backgroundColor: '#f8f8ff',
          },
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.6}
                style={{ paddingLeft: 16 }}
              >
                <SimpleLineIcons name="arrow-left" size={18} color="#4169e1" />
              </TouchableOpacity>
            );
          },
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <HomeStack.Screen
        options={{
          title: 'Карта',
          headerBackTitleVisible: false,
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: '#dcdcdc',
            backgroundColor: '#f8f8ff',
          },
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.6}
                style={{ paddingLeft: 16 }}
              >
                <SimpleLineIcons name="arrow-left" size={18} color="#4169e1" />
              </TouchableOpacity>
            );
          },
        }}
        name="Map"
        component={MapScreen}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonAllPosts: {
    backgroundColor: '#FF6C00',
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 30,
  },
  buttonAddPost: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 30,
  },
  buttonProfile: {
    backgroundColor: '#FF6C00',
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 30,
  },
});
