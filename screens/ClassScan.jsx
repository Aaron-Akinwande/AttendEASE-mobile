import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomMenu from "../components/BottomMenu";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useQuery, useMutation } from '@tanstack/react-query';
import { getRequest, patchRequest } from "../api/apiCall"; // For fetching and patching data
import { GET_COURSE } from "../api/apiURL"; // API endpoint
import AsyncStorage from '@react-native-async-storage/async-storage';
import { queryKeys } from "../api/queryKey";

const ScanAttendance = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { classId } = route.params;

  const [permission, requestPermission] = useCameraPermissions();
  const [scanData, setScanData] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [adminId, setAdminId] = useState(null);


  // Fetch student ID from AsyncStorage
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

  // Fetch course details using the courseId from the route
  const { data: courseData, isLoading, isError } = useQuery({
    queryKey: [queryKeys.getCourseDetails,adminId, classId],
    queryFn: async () => await getRequest({ url: GET_COURSE(adminId, classId) }), // Fetch course details
    enabled: !!classId,
    onError: (error) => console.error("Error fetching course data:", error),
  });

  // Mutation to update attendance when barcode is scanned
  const { mutate: updateAttendance } = useMutation({
    mutationFn: async () => {
      const updatedStudents = courseData.students.map((student) => {
        if (student.id === parseInt(studentId)) {
          return { ...student, attendedSessions: student.attendedSessions + 1 };
        }
        return student;
      });

      // Send PATCH request to update students array in course
      console.log(updatedStudents)
      await patchRequest({
        url: GET_COURSE(adminId, classId), // Reusing the same URL
        body: {
          ...courseData,
          students: updatedStudents,
        },
      });
    },
    onSuccess: () => {
      Alert.alert("Success", "Attendance updated successfully!");
      setScanData(null); // Reset scan data after successful update
    },
    onError: (error) => {
      console.error("Error updating attendance:", error);
      Alert.alert("Error", "Could not update attendance.");
    },
  });

  // Handle camera permission
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View className="flex-1 bg-blue-100 p-4 justify-between">
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Handle barcode scan
  const handleBarCodeScanned = ({ type, data }) => {
    if (data) {
      const scannedClassId = data; // Assuming the scanned data contains the class ID
  
      // Compare scanned class ID with the existing class ID from the route
      if (scannedClassId === (`class-${classId}`)) {
        setScanData(data); // Store scan data
        Alert.alert(
          "Scanned successfully",
          `Scanned successfully for class ID: ${classId}`,
          [
            {
              text: "OK",
              onPress: () => updateAttendance(), // Trigger the mutation to update attendance
            },
          ]
        );
      } else {
        // Show alert if the scanned class ID doesn't match the current class ID
        Alert.alert(
          "Error",
          `Scanned class ID (${scannedClassId}) does not match the current class ID (${classId}).`
        );
      }
    }
  };
  

  // Handle loading and error states
  if (isLoading) {
    return (
      <View className="flex-1 bg-blue-100 justify-center items-center">
        <Text>Loading course details...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-blue-100 justify-center items-center">
        <Text>Error loading course details.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-blue-100 p-4 justify-between">
      <Text className="text-2xl font-bold text-center text-gray-800 mb-5">
        Scan Barcode for Class {courseData?.courseName || classId}
      </Text>
      <View className="flex-1 gap-1 rounded-lg overflow-hidden p-0.5 mb-2.5 shadow-md shadow-black/10">
        <CameraView
          className="flex-1 w-full"
          facing={"back"}
          onBarcodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
        {scanData && (
          <Button title="Scan Again?" onPress={() => setScanData(null)} />
        )}
      </View>
      <TouchableOpacity
        className="bg-red-400 p-3.5 rounded-lg items-center mb-2.5"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-lg font-bold text-white">Cancel</Text>
      </TouchableOpacity>

      <BottomMenu />
    </View>
  );
};

export default ScanAttendance;
