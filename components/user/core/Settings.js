import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Switch, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function Settings() {
  const { user } = useSelector((state) => state.auth);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bidUpdates, setBidUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => {
          // Add your logout logic here
          // dispatch(logout());
        }}
      ]
    );
  };

  const renderSettingsItem = (icon, label, value, onPress, type = "arrow") => (
    <TouchableOpacity 
      style={styles.settingsItem} 
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={24} color="#666" />
      <Text style={styles.settingsText}>{label}</Text>
      {type === "arrow" && (
        <MaterialIcons name="chevron-right" size={24} color="#666" />
      )}
      {type === "switch" && (
        <Switch 
          value={value} 
          onValueChange={onPress}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {renderSettingsItem("person", "Edit Profile", null, () => {})}
        {renderSettingsItem("lock", "Change Password", null, () => {})}
        {renderSettingsItem("email", "Email Address", null, () => {})}
        {renderSettingsItem("phone", "Phone Number", null, () => {})}
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {renderSettingsItem("notifications", "Push Notifications", pushNotifications, setPushNotifications, "switch")}
        {renderSettingsItem("mail", "Email Notifications", emailNotifications, setEmailNotifications, "switch")}
        {renderSettingsItem("gavel", "Bid Updates", bidUpdates, setBidUpdates, "switch")}
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {renderSettingsItem("language", "Language", "English", () => {})}
        {renderSettingsItem("attach-money", "Currency", "USD", () => {})}
        {renderSettingsItem("dark-mode", "Dark Mode", darkMode, setDarkMode, "switch")}
      </View>

      {/* Payment & Shipping */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment & Shipping</Text>
        {renderSettingsItem("credit-card", "Payment Methods", null, () => {})}
        {renderSettingsItem("local-shipping", "Shipping Addresses", null, () => {})}
        {renderSettingsItem("receipt", "Billing Information", null, () => {})}
      </View>

      {/* Privacy & Security */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        {renderSettingsItem("security", "Privacy Settings", null, () => {})}
        {renderSettingsItem("verified-user", "Two-Factor Authentication", null, () => {})}
        {renderSettingsItem("history", "Login History", null, () => {})}
      </View>

      {/* Help & Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help & Support</Text>
        {renderSettingsItem("help", "Help Center", null, () => {})}
        {renderSettingsItem("contact-support", "Contact Support", null, () => {})}
        {renderSettingsItem("description", "Terms of Service", null, () => {})}
        {renderSettingsItem("privacy-tip", "Privacy Policy", null, () => {})}
      </View>

      {/* Danger Zone */}
      <View style={[styles.section, styles.dangerZone]}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="#dc3545" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteText}>Delete Account</Text>
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
  section: {
    backgroundColor: '#fff',
    marginVertical: 8,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginVertical: 10,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingsText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  dangerZone: {
    marginTop: 20,
    marginBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoutText: {
    fontSize: 16,
    color: '#dc3545',
    marginLeft: 15,
  },
  deleteButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 16,
    color: '#dc3545',
  },
});