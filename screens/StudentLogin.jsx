import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useMutation } from '@tanstack/react-query';
import { STUD_LOGIN } from "../api/apiURL";
import { login } from "../api/apiCall";

export default function StudentLogin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (newLogin) =>
      await login({ url: STUD_LOGIN, data: newLogin }),
    onSuccess: async (data) => {
      try {
        const adminID = JSON.stringify(data.adminId); 
        const studID = JSON.stringify(data.id); 
        // console.log(studID)
        await AsyncStorage.setItem('adminID', adminID);
        await AsyncStorage.setItem('studID', studID);
        navigation.navigate("Dashboard");
      } catch (e) {
        console.error('Failed to save adminID:', e);
      }
    },
    onError: (error) => {
      console.error("")
      console.error('Login failed:', error.message);
    },
  });

  const handleLogin = () => {
    mutate({ email, password });
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

        {isError && <Text className="text-red-600 text-sm">Error: {error.message}</Text>}

        <TouchableOpacity
          className="bg-blue-600 py-3 rounded-md items-center"
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text className="text-white text-base font-bold">{isLoading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
