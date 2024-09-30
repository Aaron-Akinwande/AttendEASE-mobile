import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import BottomMenu from '../components/BottomMenu';
import { getRequest } from '../api/apiCall'; // Assuming you have a fetch API utility
import { STUDENT } from '../api/apiURL'; // The URL to fetch student details
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { queryKeys } from '../api/queryKey';


const Dashboard = () => {
  const navigation = useNavigation();
  const [studentId, setStudentId] = useState(null);
  const [adminId, setAdminId] = useState(null);


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
  
  // Fetch student details from API
  const { data: studentDetails, isLoading, isError } = useQuery({
    queryKey: [queryKeys.getstudent,adminId, studentId],
    queryFn: () => getRequest({ url: STUDENT(adminId, studentId) }), // Fetching details for student ID 1 as an example
  });

  if (isLoading) {
    return (
      <View className="flex-1 bg-blue-100 p-4 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-blue-100 p-4 justify-center items-center">
        <Text>Error fetching student details.</Text>
      </View>
    );
  }

  const { fullName, department, courses } = studentDetails;

  return (
    <BottomMenu>
      <View className="flex-1 bg-blue-100 p-4">
        <Text className="text-2xl font-bold text-gray-800 text-center mb-4">Student Dashboard</Text>

        {/* Student Information */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-md shadow-black/10">
          <Text className="text-xl font-semibold text-gray-800 mb-2.5">Student Information</Text>
          <Text className="text-base text-gray-600">Name: {fullName}</Text>
          <Text className="text-base text-gray-600">Department: {department}</Text>
        </View>

        {/* Course Attendance Records */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-md shadow-black/10">
          <Text className="text-xl font-semibold text-gray-800 mb-2.5">Course Attendance</Text>
          {courses.map((course, index) => (
            <View key={index} className="flex flex-row justify-between items-center border-b border-gray-300 py-2">
              <View className="flex flex-row items-center">
                <Icon name="book" size={20} color="#2563eb" />
                <Text className="ml-2 text-base">{course.courseName}</Text>
              </View>
              <Text>{course.attendancePercentage}%</Text>
            </View>
          ))}
        </View>

        {/* Navigate to Detailed Attendance */}
        <TouchableOpacity
          className="bg-blue-500 p-3.5 rounded-lg items-center"
          onPress={() => navigation.navigate('Courses')}
        >
          <Text className="text-lg font-bold text-white">View Attendance Details</Text>
        </TouchableOpacity>
      </View>
    </BottomMenu>
  );
};

export default Dashboard;
