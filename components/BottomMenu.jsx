import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const BottomMenu = ({ children }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navigate = (route) => {
    setActiveTab(route);
    navigation.navigate(route);
  };

  return (
    <View className="flex-1 bg-gray-200 ">
      <View className="flex-1 p-4">{children}</View>

      <View className="flex flex-row justify-around items-center bg-white py-2.5 border-t border-gray-300 rounded-lg">
        <TouchableOpacity
          className="flex justify-center items-center"
          onPress={() => navigate("Dashboard")}
        >
          <Icon
            name="home"
            color={activeTab === "Dashboard" ? "blue" : "gray"}
            size={24}
          />
          <Text
            className={`${
              activeTab === "Dashboard"
                ? `text-blue-500 text-xs`
                : `text-gray-500 text-xs`
            }`}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex justify-center items-center"
          onPress={() => navigate("Profile")}
        >
          <Icon
            name="user"
            color={activeTab === "Profile" ? "blue" : "gray"}
            size={24}
          />
          <Text
            className={`${
              activeTab === "Profile"
                ? `text-blue-500 text-xs`
                : `text-gray-500 text-xs`
            }`}
          >
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex justify-center items-center"
          onPress={() => navigate("Courses")}
        >
          <Icon
            name="book"
            color={activeTab === "Courses" ? "blue" : "gray"}
            size={24}
          />
          <Text
            className={`${
              activeTab === "Courses"
                ? `text-blue-500 text-xs`
                : `text-gray-500 text-xs`
            }`}
          >
            Courses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex justify-center items-center"
          onPress={() => navigate("Notifications")}
        >
          <Icon
            name="bell"
            color={activeTab === "Notifications" ? "blue" : "gray"}
            size={24}
          />
          <Text
            className={`${
              activeTab === "Notifications"
                ? `text-blue-500 text-xs`
                : `text-gray-500 text-xs`
            }`}
          >
            Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex justify-center items-center"
          onPress={() => navigate("Login")}
        >
          <Icon
            name="sign-out"
            color={activeTab === "Logout" ? "blue" : "gray"}
            size={24}
          />
          <Text
            className={`${
              activeTab === "Logout"
                ? `text-blue-500 text-xs`
                : `text-gray-500 text-xs`
            }`}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomMenu;
