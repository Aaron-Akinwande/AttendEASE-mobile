import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { RNCamera } from "react-native-camera";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomMenu from "../components/BottomMenu";
import { Camera } from "expo-camera";

const ScanAttendance = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { classId } = route.params;
  const [torchOn, setTorchOn] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);

  //   useEffect(() => {
  //     (async () => {
  //       const { status } = await Camera.requestPermissionsAsync();
  //       setHasPermission(status === 'granted');
  //     })();
  //   }, []);

  //   if (hasPermission === null) {
  //     return <View><Text>Requesting for camera permission</Text></View>;
  //   }
  //   if (hasPermission === false) {
  //     return <View><Text>No access to camera</Text></View>;
  //   }

  const handleBarCodeScanned = (result) => {
    if (result) {
      Alert.alert(
        "Scanned successfully",
        `Scanned successfully for class ID: ${classId}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scan Barcode for Class {classId}</Text>
      <View style={styles.cameraContainer}>
        {/* <RNCamera
          style={styles.camera}
          onBarCodeRead={(e) => handleBarCodeScanned(e.data)}
          flashMode={torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
          captureAudio={false}
        /> */}
      </View>
      <Button
        title={`Switch Torch ${torchOn ? "Off" : "On"}`}
        onPress={() => setTorchOn(!torchOn)}
      />
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2fe",
    padding: 16,
    justifyContent: "space-between",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: 20,
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});

export default ScanAttendance;
