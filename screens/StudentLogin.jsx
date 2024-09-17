import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function StudentLogin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <View className="flex-1 flex justify-center items-center bg-blue-500">
      <View className="bg-white rounded-lg p-5 w-[90%] max-w-[400px] min-h-[50%] flex justify-center shadow-lg shadow-black/20">
        <View className="flex flex-row justify-center items-center mb-5">
          <Image
            source={require("../assets/Logo.png")}
            className=" w-12 h-12 mr-2 rounded-md"
          />
          <Text className="text-2xl font-bold text-gray-800">AttendEase</Text>
        </View>

        <Text className="text-center text-xl font-bold mb-5 text-gray-800">
          Student Login
        </Text>

        <View className="flex flex-row items-center border border-gray-300 rounded-md mb-5 px-2.5 py-2">
          <TextInput
            placeholder="Enter your email"
            className="flex-1 text-base pl-2.5"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="flex flex-row items-center border border-gray-300 rounded-md mb-5 px-2.5 py-2">
          <TextInput
            placeholder="Enter your password"
            className="flex-1 text-base pl-2.5"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity className="bg-blue-600 py-3 rounded-md items-center" onPress={handleLogin}>
          <Text className="text-white text-base font-bold">Login</Text>
        </TouchableOpacity>

        {/* <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text style={styles.registerLink} 
        //   onPress={() => navigation.navigate('Register')}
          >
            Register
          </Text>
        </Text> */}
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#3b82f6",
//   },
//   loginBox: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     width: "90%",
//     maxWidth: 400,
//     minHeight: "50%",
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   logoContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   logoText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   loginHeader: {
//     textAlign: "center",
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#333",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     paddingLeft: 10,
//   },
//   loginButton: {
//     backgroundColor: "#2563eb",
//     paddingVertical: 12,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   loginButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   registerText: {
//     marginTop: 20,
//     textAlign: "center",
//     color: "#6b7280",
//   },
//   registerLink: {
//     color: "#2563eb",
//     fontWeight: "bold",
//   },
// });
