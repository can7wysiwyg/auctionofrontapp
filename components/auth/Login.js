import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, loginUser } from '../../redux/slices/authSlice';



export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false); 



  const dispatch = useDispatch();
  const { user, token, error, errorType } = useSelector((state) => state.auth);

    // Watch for authentication errors
    useEffect(() => {
      if (error && errorType === 'LOGIN_ERROR') {
        Alert.alert("Login Failed", error);
        dispatch(clearError());
      }
    }, [error, errorType]);
  
    // Watch for successful authentication
    useEffect(() => {
      if (token && user) {
        navigation.replace("Home"); // Use replace instead of navigate
      }
    }, [token, user, navigation]);
  


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      setIsButtonLoading(true); // Show loader when button is clicked

      await dispatch(loginUser({ email, password })).unwrap();

     
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    } finally {
      setIsButtonLoading(false); // Hide loader after action completes
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails());
      navigation.navigate("Home"); // Automatically navigate if token exists
    }
  }, [token, dispatch, navigation]);




  return (
    <ScrollView contentContainerStyle={styles.container}>

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

    >
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <MaterialIcons name="email" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrapper}>
          <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Feather 
              name={showPassword ? "eye" : "eye-off"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>

        
        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
                


        <TouchableOpacity style={[styles.loginButton, isButtonLoading && styles.buttonDisabled ]}
         onPress={handleLogin}
         disabled={isButtonLoading}
        
        >

{isButtonLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#FFFFFF" size="small" />
            <Text style={[styles.loginButtonText, styles.loadingText]}>
              Logging in...
            </Text>
          </View>
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}

          



        </TouchableOpacity>

       
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}




const styles = StyleSheet.create({
  container: {
  flexGrow: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
 
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 10,
  },
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    paddingHorizontal: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 32,
    
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

