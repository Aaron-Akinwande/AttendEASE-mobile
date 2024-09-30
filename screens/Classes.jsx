import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomMenu from "../components/BottomMenu";
import { getRequest } from "../api/apiCall"; // Ensure this is your request function
import { STUDENT } from "../api/apiURL"; // Your API URL for fetching student data
import { queryKeys } from "../api/queryKey";

const Courses = () => {
  const navigation = useNavigation();
  const [studentId, setStudentId] = useState(null);
  const [adminId, setAdminId] = useState(null);

  // Fetch studentId and adminId from AsyncStorage
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

  // Fetch student data using react-query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKeys.getstudent, studentId, adminId],
    queryFn: async () => await getRequest({ url: STUDENT(studentId, adminId) }), // Fetch student data
    enabled: !!studentId && !!adminId, // Only fetch if IDs are available
    onError: (error) => console.error("Error fetching student data:", error),
  });

  const handleClassClick = (classId) => {
    navigation.navigate("Course Scan", { classId });
  };

  // Render each course item
  const renderClassItem = ({ item }) => (
    <TouchableOpacity
      className="bg-white p-4 mb-3 rounded-lg shadow-md shadow-black/10"
      onPress={() => handleClassClick(item.courseId)}
    >
      <Text className="text-lg font-semibold mb-2 text-gray-800">{item.courseName}</Text>
      <Text className="text-base text-gray-600 mb-1">Lecturer: {item.courseLecturer}</Text>
      <Text className="text-sm text-teal-500">
        Attendance: {item.attendancePercentage.toFixed(2)}%
      </Text>
    </TouchableOpacity>
  );

  // Handle loading state
  if (isLoading) {
    return (
      <BottomMenu>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </BottomMenu>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <BottomMenu>
        <View className="flex-1 justify-center items-center">
          <Text>Error fetching courses.</Text>
          <Button title="Retry" onPress={refetch} />
        </View>
      </BottomMenu>
    );
  }

  // Extract courses from student data
  const courses = data?.courses || [];

  return (
    <BottomMenu>
      <View className="flex-1 bg-blue-100 px-4 py-5">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-5">Class Attendance Records</Text>
        <FlatList
          data={courses}
          renderItem={renderClassItem}
          keyExtractor={(item) => item.courseId.toString()}
          className="pb-24"
        />
      </View>
    </BottomMenu>
  );
};

export default Courses;
