
import axios from 'axios';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ApiUrl } from '../../helpers/ApiUrl';


export default function VerifyEmail() {
    const [email, setEmail] = useState("");
    const[verificationCode, setCode] = useState("")
    const[veriMessage, setVeriMsg] = useState()
    const [loading, setLoading] = useState(false); // Loading state



    const handleVeri = async() => {
        if(!email || !verificationCode) {
            Alert.alert("Fields cannot be empty")
        }

        setLoading(true); // Start loading



        try {
          const items = { email, verificationCode };
          const response = await axios.post(`${ApiUrl}/verify_email`, items);
        
          setVeriMsg(response.data.msg);
    
          
          Alert.alert("Success", response.data.msg);
        } catch (error) {
          Alert.alert("Error", "Verification failed. Please try again.");
        } finally {
          setLoading(false); // Stop loading
        }
    
        



    }


  return (
     <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.headerContainer}>

            <MaterialIcons name="mail-outline" size={24} color="#3b82f6" style={styles.inputIcon} />
      <Text style={styles.title}>Email Verification Required</Text>
      <Text style={styles.subtitle}>
        Check your email inbox or spam box for the verification code to activate your account.
      </Text>
             
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                            <MaterialIcons
                              name="email"
                              size={20}
                              color="#666"
                              style={styles.inputIcon}
                            />
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
                            <MaterialIcons
                              name="vpn-key"
                              size={20}
                              color="#666"
                              style={styles.inputIcon}
                            />
                            <TextInput
                              style={styles.input}
                              placeholder="Verification Code"
                              value={verificationCode}
                              onChangeText={setCode}
                            
                              
                            />
                          </View>
                

                          <TouchableOpacity style={styles.registerButton} onPress={handleVeri} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Activate Account</Text>
        )}
      </TouchableOpacity>

            
     
{
  veriMessage && (
    <TouchableOpacity style={{marginTop: 23, alignItems: "center"}} onPress={() => navigation.navigate('Login')}>
      <Text style={{textAlign: "center", fontWeight: "bold", color: "red",   fontSize: 18, 
  marginVertical: 10 
}}>
        {veriMessage}
      </Text>
    </TouchableOpacity>
  )
}






            </View>

            </ScrollView>
            </KeyboardAvoidingView>
    
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 30,
    },
    logoContainer: {
      alignItems: "center",
      marginTop: 60,
      marginBottom: 40,
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    headerContainer: {
      alignItems: "center",
      marginTop: 60,
      marginBottom: 40,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#333",
    },
    subtitle: {
      fontSize: 16,
      color: "#666",
      marginTop: 5,
    },
    inputContainer: {
      paddingHorizontal: 30,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      borderWidth: 1,
      borderColor: "#ddd",
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
      alignItems: "flex-end",
      marginBottom: 20,
    },
    forgotPasswordText: {
      color: "#666",
      fontSize: 14,
    },
    loginButton: {
      backgroundColor: "#007AFF",
      borderRadius: 10,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
    },
    loginButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    registerButton: {
      backgroundColor: "#007AFF",
      borderRadius: 10,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 15,
    },
    registerButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    googleButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      height: 50,
      marginBottom: 20,
    },
    googleIcon: {
      marginRight: 10,
    },
    googleButtonText: {
      color: "#333",
      fontSize: 16,
    },
    signupContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    signupText: {
      color: "#666",
      fontSize: 14,
    },
    error: {
      color: "red",
      marginBottom: 10,
    },
    signupLink: {
      color: "#007AFF",
      fontSize: 14,
      fontWeight: "bold",
    },
    loginContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    loginText: {
      color: "#666",
      fontSize: 14,
    },
    loginLink: {
      color: "#007AFF",
      fontSize: 14,
      fontWeight: "bold",
    },
  });
  