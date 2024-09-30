import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StudentLogin from "./screens/StudentLogin";
import Dashboard from "./screens/Dashboard";
import Notifications from "./screens/Notifications";
import Profile from "./screens/Profile";
import ScanAttendance from "./screens/ClassScan";
import Test from "./screens/Test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Courses from "./screens/Classes";

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={StudentLogin} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Courses" component={Courses} />
          <Stack.Screen name="Course Scan" component={ScanAttendance} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
