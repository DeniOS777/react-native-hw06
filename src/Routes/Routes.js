import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RegistrationScreen } from '../Screens/RegistrationScreen';

import { LoginScreen } from '../Screens/LoginScreen';
import { PostsScreen } from '../Screens/PostsScreen';
import { CreatePostsScreen } from '../Screens/CreatePostsScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { CommentsScreen } from '../Screens/CommentsScreen';
import { MapScreen } from '../Screens/MapScreen';

import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = ({ navigation }) => (
  <Tab.Navigator
    initialRouteName="Posts"
    // screenOptions={{ tabBarShowLabel: false }}
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen
      options={({ route }) => ({
        title: 'Публикации',
        headerTitleAlign: 'center',
        headerStyle: { borderBottomWidth: 1 },
        headerTitleStyle: { fontFamily: 'Roboto-Medium' },
        tabBarIconStyle: { marginLeft: 45 },
        tabBarStyle: { height: 83, paddingBottom: 10, borderTopWidth: 1 },
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.6} style={{ paddingRight: 16 }}>
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
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
        headerStyle: { borderBottomWidth: 1 },
        tabBarStyle: {
          height: 83,
          paddingBottom: 10,
          borderTopColor: 'transparent',
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Posts')}
            activeOpacity={0.6}
            style={{ paddingLeft: 16 }}
          >
            <Feather name="arrow-left" size={24} color="#BDBDBD" />
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
        tabBarStyle: { height: 83, paddingBottom: 10, borderTopWidth: 1 },
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

export const chooseNavigation = isLogedIn => {
  if (!isLogedIn) {
    return (
      <AuthStack.Navigator initialRouteName="RegistrationScreen">
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
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.6}
                style={{ paddingLeft: 16 }}
              >
                <Feather name="arrow-left" size={24} color="#BDBDBD" />
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
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.6}
                style={{ paddingLeft: 16 }}
              >
                <Feather name="arrow-left" size={24} color="#BDBDBD" />
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
