import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'
import *  as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {ApiUrl} from "../../../../helpers/ApiUrl"

export default function UploadPicture({navigation}) {
  const { user, token } = useSelector((state) => state.auth);
  const[picture, setPicture] = useState('')
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need access to your camera roll to upload photos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setPicture(selectedUri);
      } else {
        Alert.alert('Image selection was cancelled.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };



  const handleSubmit = async () => {
    if (!picture) {
      Alert.alert('Error', 'Please upload  photo.');
      return;
    }

    
    const formData = new FormData();
    
    formData.append('picture', {
      uri: picture,
      name: 'picture.jpg',
      type: 'image/jpeg',
    });

    try {
      setUploading(true);

      if(!user) {
        return ""
      }

      
    const response =   await axios.put(
        `${ApiUrl}/update_profile/${user?._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        Alert.alert(response.data.msg);

        navigation.goBack()
      } else {
        Alert.alert('Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error:  Please try again.');
    } finally {
      setUploading(false);
    }
  };




  

  return (
    <View style={styles.container}>
    <Text style={styles.headerText}>Upload Your  Photo</Text>

          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
      {picture ? (
        <Image source={{ uri: picture }} style={styles.image} />
      ) : (
        <Text style={styles.imagePickerText}>Upload Photo</Text>
      )}
    </TouchableOpacity>

    {uploading ? (
      <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />
    ) : (
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    )}
  </View>

  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  
  imagePicker: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    marginBottom: 20,
  },
  imagePickerText: {
    fontSize: 16,
    color: '#888',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  loader: {
    marginTop: 20,
  },
});

