import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
      <View className="flex-1 bg-blue-100 p-4">
        <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
          Your Profile
        </Text>

        <View className="bg-white rounded-lg p-4 shadow-lg shadow-black/10">
          <View className=" mb-4">
            <Text className="text-base font-semibold mb-2 text-gray-800">
              Name
            </Text>
            <TextInput
              className={`text-base border font-semibold mb-2 text-gray-800 p-2 rounded-lg ${
                !editMode && `bg-gray-200 border-white`
              }`}
              value={studentInfo.name}
              onChangeText={(value) => handleChange("name", value)}
              editable={editMode}
            />
          </View>

          <View className=" mb-4">
            <Text className="text-base font-semibold mb-2 text-gray-800">
              Email
            </Text>
            <TextInput
              className={`text-base border font-semibold mb-2 text-gray-800 p-2 rounded-lg ${
                !editMode && `bg-gray-200 border-white`
              }`}
              value={studentInfo.email}
              onChangeText={(value) => handleChange("email", value)}
              editable={editMode}
              keyboardType="email-address"
            />
          </View>

          <View className=" mb-4">
            <Text className="text-base font-semibold mb-2 text-gray-800">
              Phone
            </Text>
            <TextInput
              className={`text-base border font-semibold mb-2 text-gray-800 p-2 rounded-lg ${
                !editMode && `bg-gray-200 border-white`
              }`}
              value={studentInfo.phone}
              onChangeText={(value) => handleChange("phone", value)}
              editable={editMode}
              keyboardType="phone-pad"
            />
          </View>

          <View className=" mb-4">
            <Text className="text-base font-semibold mb-2 text-gray-800">
              Password
            </Text>
            <View className="flex flex-row items-center">
              <TextInput
                className={`text-base border font-semibold mb-2 text-gray-800 p-2 rounded-lg w-[70vw] mr-3 ${
                  !editMode && `bg-gray-200 border-white`
                }`}
                value={studentInfo.password}
                onChangeText={(value) => handleChange("password", value)}
                editable={editMode}
                secureTextEntry={!showPassword}
              />
              {editMode && (
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className=" border p-2 rounded-lg mb-2"
                >
                  <Icon
                    name={showPassword ? "eye-slash" : "eye"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View className="flex flex-row justify-between mt-4">
            {editMode ? (
              <>
                <Button
                  title="Cancel"
                  color="#f56565"
                  onPress={() => setEditMode(false)}
                />
                <Button
                  title="Save Changes"
                  color="#48bb78"
                  onPress={handleSubmit}
                />
              </>
            ) : (
              <Button
                title="Edit Profile"
                color="#4299e1"
                onPress={() => setEditMode(true)}
              />
            )}
          </View>
        </View>
      </View>
    </BottomMenu>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#e0f2fe",
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1f2937",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   form: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   inputContainer: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//     color: "#1f2937",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     fontSize: 16,
//     backgroundColor: "#fff",
//     width: "100%",
//   },
//   disabledInput: {
//     backgroundColor: "#f0f0f0",
//   },
//   passwordContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   icon: {
//     marginLeft: -35,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 16,
//   },
// });

export default Profile;
