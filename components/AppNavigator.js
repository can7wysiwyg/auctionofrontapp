import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons"
import { useSelector } from 'react-redux';
import Home from './public/Home';
import Login from './auth/Login';
import Register from './auth/Register'
import VerifyEmail from './auth/VerifyEmail';
import Logout from './auth/Logout';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Profile from './user/profile/Profile';
import Settings from './user/core/Settings';
import ProductDetail from './public/products/ProductDetail';
import EditProfile from './user/core/EditProfile';
import UploadPicture from './user/core/pages/UploadPicture';
import UpdateEmail from './user/core/pages/UpdateEmail';
import UpdatePhone from './user/core/pages/UpdatePhone';
import ChangeName from './user/core/pages/ChangeName';
import BidComp from './public/products/bids/BidComp';
import ActiveBids from './user/core/bids/ActiveBids';
import BidDetails from './user/core/bids/BidDetails';




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


<Stack.Screen 
        name="ProductDetail" 
        component={ProductDetail}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Product",
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


<Stack.Screen 
        name="BidComp" 
        component={BidComp}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "View Bids",
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

const AuthTab = React.memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="login" 
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


<Stack.Screen 
        name="register" 
        component={Register}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Register",
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


<Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPassword}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Recover Password",
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


<Stack.Screen 
        name="ResetPassword" 
        component={ResetPassword}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Reset Password",
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





<Stack.Screen 
        name="VerifyEmail" 
        component={VerifyEmail}
        options={{
          headerShown: false,
          headerTitle: "Verify Email"
        }} 
      />



<Stack.Screen 
        name="Home" 
        component={Home}
        options={{
          headerShown: false,
          headerTitle: "Home"
        }} 
      />




    </Stack.Navigator>
  )
})


const UserTab = React.memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Profile",
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


<Stack.Screen 
        name="ActiveBids" 
        component={ActiveBids}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "My Bids",
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



<Stack.Screen 
        name="BidDetails" 
        component={BidDetails}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Bid Details",
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





<Stack.Screen 
        name="Settings" 
        component={Settings}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Settings",
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


<Stack.Screen 
        name="EditProfile" 
        component={EditProfile}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Update Account",
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


<Stack.Screen 
        name="UploadPicture" 
        component={UploadPicture}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Upload Picture",
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


<Stack.Screen 
        name="UpdateEmail" 
        component={UpdateEmail}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Update Email",
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


<Stack.Screen 
        name="UpdatePhone" 
        component={UpdatePhone}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Update Phone",
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



<Stack.Screen 
        name="ChangeName" 
        component={ChangeName}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Change Name",
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
  const { token } = useSelector((state) => state.auth);
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


        {
          token && (
 <Tab.Screen 
 name="profile"
 component={UserTab}

 options={{ 
  tabBarIcon: ({color, size}) => (
    <Ionicons name="person" size={size} color={color} />
  )
 }}
 
 />

          )
        }


        {
          token ? (
            <Tab.Screen
              name="LOGOUT"
              component={Logout}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="log-out-outline" size={size} color={color} />
                ),
              }}
            />
          ) : (

            <Tab.Screen
            name='Log In'
            component={AuthTab}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="key" size={size} color={color} />
              )
            }}
          />
          )
        }

        
      </Tab.Navigator>
    </NavigationContainer>
  )
}