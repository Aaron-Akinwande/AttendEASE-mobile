import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BottomMenu from "../components/BottomMenu"; 


const Classes = () => {
  const navigation = useNavigation();

  
  const classes = [
    {
      id: 1,
      className: "Mathematics 101",
      lecturer: "Dr. John Doe",
      attendancePercentage: 85,
    },
    {
      id: 2,
      className: "Physics 202",
      lecturer: "Prof. Jane Smith",
      attendancePercentage: 90,
    },
    {
      id: 3,
      className: "Chemistry 303",
      lecturer: "Dr. Alice Brown",
      attendancePercentage: 75,
    },
    {
      id: 4,
      className: "History 404",
      lecturer: "Prof. Robert Green",
      attendancePercentage: 92,
    },
    {
      id: 5,
      className: "History 404",
      lecturer: "Prof. Robert Green",
      attendancePercentage: 92,
    },
    {
      id: 6,
      className: "History 404",
      lecturer: "Prof. Robert Green",
      attendancePercentage: 92,
    },
    {
      id: 7,
      className: "History 404",
      lecturer: "Prof. Robert Green",
      attendancePercentage: 92,
    },
  ];

  const handleClassClick = (classId) => {
    navigation.navigate("Class Scan", { classId });
  };

  const renderClassItem = ({ item }) => (
    <TouchableOpacity
      style={styles.classItem}
      onPress={() => handleClassClick(item.id)}
    >
      <Text style={styles.className}>{item.className}</Text>
      <Text style={styles.lecturer}>Lecturer: {item.lecturer}</Text>
      <Text style={styles.attendance}>
        Attendance: {item.attendancePercentage}%
      </Text>
    </TouchableOpacity>
  );

  return (
    <BottomMenu>
      <View style={styles.container}>
        <Text style={styles.header}>Class Attendance Records</Text>
        <FlatList
          data={classes}
          renderItem={renderClassItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </BottomMenu>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1f2937",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 100, 
  },
  classItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  className: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1f2937",
  },
  lecturer: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 4,
  },
  attendance: {
    fontSize: 14,
    color: "#10b981",
  },
});

export default Classes;
