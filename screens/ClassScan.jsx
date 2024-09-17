import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomMenu from "../components/BottomMenu";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

const ScanAttendance = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { classId } = route.params;

  const [permission, requestPermission] = useCameraPermissions();
  const [scanData, setScanData] = React.useState();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 bg-blue-100 p-4 justify-between">
        <Text >
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    if (data) {
      Alert.alert(
        "Scanned successfully",
        `Scanned successfully for class ID: ${classId}`,
        setScanData(data),
        console.log(`Data: ${data}`),
        console.log(`Type: ${type}`)
      );
    }
  };

  return (
    <View className="flex-1 bg-blue-100 p-4 justify-between">
      <Text className="text-2xl font-bold text-center text-gray-800 mb-5">Scan Barcode for Class {classId}</Text>
      <View className="flex-1 gap-1 rounded-lg overflow-hidden p-0.5 mb-2.5 shadow-md shadow-black/10">
        <CameraView
          className="flex-1 w-full"
          facing={"back"}
          onBarcodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
        {scanData && (
          <Button title="Scan Again?" onPress={() => setScanData(undefined)} />
        )}
      </View>
      <TouchableOpacity className="bg-red-400 p-3.5 rounded-lg items-center mb-2.5" onPress={() => navigation.goBack()}>
        <Text className="text-lg font-bold text-white">Cancel</Text>
      </TouchableOpacity>

      <BottomMenu />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#e0f2fe",
//     padding: 16,
//     justifyContent: "space-between",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#1f2937",
//     marginBottom: 20,
//   },
//   cameraContainer: {
//     flex: 1,
//     gap: 4,
//     borderRadius: 10,
//     overflow: "hidden",
//     padding: 2,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   camera: {
//     flex: 1,
//     width: "100%",
//   },
//   cancelButton: {
//     backgroundColor: "#f56565",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   cancelButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

export default ScanAttendance;
