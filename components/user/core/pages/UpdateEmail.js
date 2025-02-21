import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import {  useSelector } from 'react-redux';
import {ApiUrl} from "../../../../helpers/ApiUrl"


export default function UpdateEmail({navigation}) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, token } = useSelector((state) => state.auth);
   
    let id = user?._id;
  
    // Function to handle email update
    const EmailUpdate = async() => {
      try {
        if (!email) {
          Alert.alert("Error", "Email field is required.");
          return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
          Alert.alert("Error", "Please enter a valid email address.");
          return;
        }
  
        setLoading(true);
        const userData = { email };
  
        const response = await axios.put(
          `${ApiUrl}/update_profile_info/${id}`, 
          userData, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
  
        Alert.alert("Success", response.data.msg);
        navigation.goBack();
        
      } catch (error) {
        Alert.alert(
          "Error", 
          error.response?.data?.msg || "Failed to update email. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Update Your Email</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Update Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={!loading}
        />
               
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={EmailUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.buttonText}>Update Email</Text>
          )}
        </TouchableOpacity>
        
      </ScrollView>
    );
  }




const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center", 
    alignItems: "center",     
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  error: { color: 'red', 
    marginBottom: 12 
  },

  
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: "#007bff",
    fontSize: 14,
  },
});

