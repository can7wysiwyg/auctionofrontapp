import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import {  useSelector } from 'react-redux';
import {ApiUrl} from "../../../../helpers/ApiUrl"


export default function ChangeName({navigation}) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, token } = useSelector((state) => state.auth);
   
    let id = user?._id;
  

    const NameUpdate = async() => {
      try {
        if (!name) {
          Alert.alert("Error", "Name  is required.");
          return;
        }

        if (!/^[A-Za-z\s]+$/.test(name)) {
            Alert.alert("Error", "Name should only contain letters.");
            return;
          }

        setLoading(true);
        const userData = { name };
  
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
        console.log(error)
        Alert.alert(
          "Error", 
          error.response?.data?.msg || "Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Update Your Name</Text>
  
        <TextInput
          style={styles.input}
          placeholder="Update Name"
          value={name}
          onChangeText={setName}
    
          editable={!loading}
        />
               
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={NameUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.buttonText}>Name Update</Text>
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

