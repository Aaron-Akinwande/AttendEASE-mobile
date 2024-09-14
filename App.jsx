import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StudentLogin from './screens/StudentLogin';
import Dashboard from './screens/Dashboard';
import Notifications from './screens/Notifications';
import Profile from './screens/Profile';
import Classes from './screens/Classes';
import ScanAttendance from './screens/ClassScan';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={StudentLogin} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Classes" component={Classes} />
        <Stack.Screen name="Class Scan" component={ScanAttendance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
