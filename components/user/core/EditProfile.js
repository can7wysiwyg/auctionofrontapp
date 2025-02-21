import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function EditProfile({ navigation }) {
  const handleProfilePicUpload = () => {
    navigation.navigate('UploadPicture');
  };

  const handleEmailUpdate = () => {
    navigation.navigate('UpdateEmail');
  };

  const handlePhoneUpdate = () => {
    navigation.navigate('UpdatePhone');
  };

  const handleNameChange = () => {
    navigation.navigate('ChangeName');
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={handleProfilePicUpload}>
          <Ionicons name="image-outline" size={24} color="#666" />
          <Text style={styles.optionText}>Upload Profile Picture</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handleEmailUpdate}>
          <Ionicons name="mail-outline" size={24} color="#666" />
          <Text style={styles.optionText}>Update Email</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handlePhoneUpdate}>
          <Ionicons name="call-outline" size={24} color="#666" />
          <Text style={styles.optionText}>Update Phone Number</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={handleNameChange}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.optionText}>Change Name</Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

       
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
    textAlign: 'left',
  }
});