import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import Icon from "react-native-vector-icons/FontAwesome";
import BottomMenu from "../components/BottomMenu";
import { STUDENT } from "../api/apiURL";
import { queryKeys } from "../api/queryKey";
import { getRequest } from "../api/apiCall";

const Profile = () => {
  const [studentId, setStudentId] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    const fetchIds = async () => {
      const storedAdminId = await AsyncStorage.getItem('adminID');
      const storedStudentId = await AsyncStorage.getItem('studID');
      if (storedAdminId && storedStudentId) {
        setAdminId(storedAdminId);
        setStudentId(storedStudentId);
      }
    };
    fetchIds();
  }, []);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKeys.getstudent, studentId, adminId],
    queryFn: async () => await getRequest({ url: STUDENT(studentId, adminId) }),
    onError: (error) => console.error("Error fetching student data:", error),
  });

  useEffect(() => {
    if (data) {
      setStudentInfo({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <BottomMenu>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </BottomMenu>
    );
  }

  if (isError) {
    return (
      <BottomMenu>
        <View className="flex-1 justify-center items-center">
          <Text>Error fetching student data.</Text>
          <Button title="Retry" onPress={refetch} />
        </View>
      </BottomMenu>
    );
  }

  return (
    <BottomMenu>
      <View className="flex-1 bg-blue-100 p-4">
        <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
          Your Profile
        </Text>

        <View className="bg-white rounded-lg p-4 shadow-lg shadow-black/10">
          <View className=" mb-4">
            <Text className="text-base font-semibold mb-2 text-gray-800">
              First Name
            </Text>
            <TextInput
              className="text-base border font-semibold mb-2 text-gray-800 p-2 rounded-lg bg-gray-200 border-white"
              value={studentInfo.firstName}
              editable={false}
            />
          </View>

          <View className=" mb-4">
            <Text className="text-base font-semibold mb-2 text-gray-800">
              Last Name
            </Text>
            <TextInput
              className="text-base border font-semibold mb-2 text-gray-800 p-2 rounded-lg bg-gray-200 border-white"
              value={studentInfo.lastName}
              editable={false}
            />
          </View>

          <View className=" mb-4">
            <Text className="text-base font-semibold mb-2 text-gray-800">
              Email
            </Text>
            <TextInput
              className="text-base border font-semibold mb-2 text-gray-800 p-2 rounded-lg bg-gray-200 border-white"
              value={studentInfo.email}
              editable={false}
              keyboardType="email-address"
            />
          </View>

          <View className=" mb-4">
            <Text className="text-base font-semibold mb-2 text-gray-800">
              Phone
            </Text>
            <TextInput
              className="text-base border font-semibold mb-2 text-gray-800 p-2 rounded-lg bg-gray-200 border-white"
              value={studentInfo.phoneNumber}
              editable={false}
              keyboardType="phone-pad"
            />
          </View>

          <View className=" mb-4">
            <Text className="text-base font-semibold mb-2 text-gray-800">
              Password
            </Text>
            <View className="flex flex-row items-center">
              <TextInput
                className="text-base border font-semibold mb-2 text-gray-800 p-2 rounded-lg w-[70vw] mr-3 bg-gray-200 border-white"
                value={studentInfo.password}
                editable={false}
                secureTextEntry={!showPassword} // Toggle password visibility
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)} // Toggle show/hide password
                className="border p-2 rounded-lg mb-2"
              >
                <Icon
                  name={showPassword ? "eye-slash" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </BottomMenu>
  );
};

export default Profile;
