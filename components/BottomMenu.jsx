import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const BottomMenu = ({ children }) => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the current route to determine the active tab
  const [activeTab, setActiveTab] = useState(route.name); // Initialize activeTab with current route name

  const navigate = (routeName) => {
    setActiveTab(routeName);
    navigation.navigate(routeName);
  };

  useEffect(() => {
    // Update the activeTab when the route changes
    setActiveTab(route.name);
  }, [route.name]);

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
            color={activeTab === "Login" ? "blue" : "gray"}
            size={24}
          />
          <Text
            className={`${
              activeTab === "Login"
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
