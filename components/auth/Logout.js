import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Animated } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { LinearGradient } from 'expo-linear-gradient';


import * as SecureStore from 'expo-secure-store';

export default function Logout({ navigation }) {
  const dispatch = useDispatch();

  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };


  const handleLogout = async () => {
    try {

      dispatch(logout());

    
      await SecureStore.deleteItemAsync('accesstoken'); 

    
      navigation.navigate('Home');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
   
    <LinearGradient
      colors={['#6C63FF', '#3B3790']}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Ready to take a break?</Text>
        <Text style={styles.subtitle}>We'll keep your spot warm!</Text>
        
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FF6B6B', '#FF4757']}
              style={styles.gradientButton}
            >
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>

  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 28,
      color: '#ffffff',
      marginBottom: 10,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: '#E0E0E0',
      marginBottom: 40,
      textAlign: 'center',
    },
    buttonContainer: {
      width: '100%',
      maxWidth: 300,
    },
    logoutButton: {
      width: '100%',
      borderRadius: 15,
      overflow: 'hidden',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    gradientButton: {
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoutButtonText: {
      fontSize: 18,
      color: '#ffffff',
      fontWeight: '700',
      textAlign: 'center',
    },
  });
  
