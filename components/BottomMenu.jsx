import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome'; 

const BottomMenu = ({ children }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Home");

  const navigate = (route) => {
    setActiveTab(route);
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>

      <View style={styles.content}>{children}</View>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigate("Dashboard")}
        >
          <Icon name="home" color={activeTab === "Dashboard" ? "blue" : "gray"} size={24} />
          <Text style={activeTab === "Dashboard" ? styles.activeText : styles.text}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigate("Profile")}
        >
          <Icon name="user" color={activeTab === "Profile" ? "blue" : "gray"} size={24} />
          <Text style={activeTab === "Profile" ? styles.activeText : styles.text}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigate("Classes")}
        >
          <Icon name="book" color={activeTab === "Classes" ? "blue" : "gray"} size={24} />
          <Text style={activeTab === "Classes" ? styles.activeText : styles.text}>Classes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigate("Notifications")}
        >
          <Icon name="bell" color={activeTab === "Notifications" ? "blue" : "gray"} size={24} />
          <Text style={activeTab === "Notifications" ? styles.activeText : styles.text}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigate("Login")}
        >
          <Icon name="sign-out" color={activeTab === "Login" ? "blue" : "gray"} size={24} />
          <Text style={activeTab === "Login" ? styles.activeText : styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  menuItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "gray",
    fontSize: 12,
  },
  activeText: {
    color: "blue",
    fontSize: 12,
  },
});

export default BottomMenu;
