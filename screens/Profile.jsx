import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomMenu from "../components/BottomMenu";

const Profile = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    password: "password123", 
  });

  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (name, value) => {
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Profile updated:", studentInfo);
    setEditMode(false);
  };

  return (
    <BottomMenu>
    <View style={styles.container}>
      <Text style={styles.header}>Your Profile</Text>

      <View style={styles.form}>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={studentInfo.name}
            onChangeText={(value) => handleChange("name", value)}
            editable={editMode}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={studentInfo.email}
            onChangeText={(value) => handleChange("email", value)}
            editable={editMode}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={studentInfo.phone}
            onChangeText={(value) => handleChange("phone", value)}
            editable={editMode}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={studentInfo.password}
              onChangeText={(value) => handleChange("password", value)}
              editable={editMode}
              secureTextEntry={!showPassword}
            />
            {editMode && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? "eye-slash" : "eye"}
                  size={20}
                  color="gray"
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          {editMode ? (
            <>
              <Button title="Cancel" color="#f56565" onPress={() => setEditMode(false)} />
              <Button title="Save Changes" color="#48bb78" onPress={handleSubmit} />
            </>
          ) : (
            <Button title="Edit Profile" color="#4299e1" onPress={() => setEditMode(true)} />
          )}
        </View>
      </View>
    </View>
    </BottomMenu>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2fe',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1f2937',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    width: "100%" ,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: -35,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default Profile;
