import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons"
import Home from './public/Home';
import Login from './auth/Login';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

const HomeTab = React.memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Hom" 
        component={Home}
        options={{
          headerShown: false,
          headerTitle: "Home"
        }} 
      />
    </Stack.Navigator>
  )
})

const AuthTab = React.memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Auth" 
        component={Login}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Login",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          )
        })} 
      />
    </Stack.Navigator>
  )
})

export default function AppNavigator() {
  const navigationRef = React.useRef(null)

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { 
            // Add any custom styles for your tab bar
          }
        }}
      >
        <Tab.Screen
          name='Home'
          component={HomeTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            )
          }}
        />

        <Tab.Screen
          name='Authenti'
          component={AuthTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="key" size={size} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}