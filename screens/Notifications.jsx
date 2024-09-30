import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomMenu from "../components/BottomMenu";
import { useQuery } from '@tanstack/react-query';
import { getRequest } from "../api/apiCall"; // Ensure this is your request function
import { NOTIFICATIONS } from "../api/apiURL"; // Your API URL for notifications
import { queryKeys } from "../api/queryKey";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notifications = () => {
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const fetchIds = async () => {
      const storedAdminId = await AsyncStorage.getItem('adminID');
      if (storedAdminId) {
        setAdminId(storedAdminId);
      }
    };
    fetchIds();
  }, []);
  
  // Fetch notifications using tanstack query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKeys.getNotifications, adminId], 
    queryFn: async () => await getRequest({ url: NOTIFICATIONS(adminId) }), 
    onError: (error) => console.error("Error fetching notifications:", error),
  });

  const renderNotification = ({ item }) => (
    <View
      className={`flex flex-row items-center p-4 rounded-lg mb-3 bg-white border-l-4 border-gray-300 ${
        item.type === 'alert'
          ? `border-l-4 border-red-500 `
          : item.type === 'warning'
          ? `border-l-4 border-yellow-500 `
          : `border-l-4 border-green-500 `
      }`}
    >
      <Icon
        name={
          item.type === "alert"
            ? "exclamation-circle"
            : item.type === "warning"
            ? "exclamation-circle"
            : "info-circle"
        }
        size={24}
        color={
          item.type === "alert"
            ? "red"
            : item.type === "warning"
            ? "yellow"
            : "green"
        }
        className="mr-3"
      />
      <Text className="flex-1 text-base text-gray-800 px-3">{item.message}</Text>
    </View>
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
          <Text>Error fetching notifications.</Text>
          <Button title="Retry" onPress={refetch} />
        </View>
      </BottomMenu>
    );
  }

  return (
    <BottomMenu>
      <View className="flex-1 bg-blue-100 p-4">
        <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
          Notifications
        </Text>
        <FlatList
          data={data} // Use the fetched data
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNotification}
        />
      </View>
    </BottomMenu>
  );
};

export default Notifications;
