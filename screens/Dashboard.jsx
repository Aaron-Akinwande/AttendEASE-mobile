import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import BottomMenu from '../components/BottomMenu';


const attendanceRecords = [
  { date: '2024-09-01', status: 'Present' },
  { date: '2024-09-02', status: 'Absent' },
  { date: '2024-09-03', status: 'Present' },
];

const upcomingClasses = [
  { course: 'Mathematics 101', date: '2024-09-10', time: '10:00 AM' },
  { course: 'History 202', date: '2024-09-11', time: '2:00 PM' },
];

const notifications = [
  { message: 'Attendance below 75% in Physics 102', type: 'alert' },
  { message: 'Upcoming quiz in Biology 105', type: 'info' },
];

const Dashboard = () => {
  const navigation = useNavigation();  



  return (
    <BottomMenu>
    <View style={styles.container}>
      <Text style={styles.header}>Student Dashboard</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attendance Records</Text>
        {attendanceRecords.map((record, index) => (
          <View key={index} style={styles.listItem}>
            <Text>{record.date}</Text>
            <View style={styles.statusContainer}>
              <Icon
                name={record.status === 'Present' ? 'check-circle' : 'times-circle'}
                size={20}
                color={record.status === 'Present' ? 'green' : 'red'}
              />
              <Text style={styles.statusText}>{record.status}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Classes</Text>
        {upcomingClasses.map((cls, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.classInfo}>
              <Icon name="calendar" size={20} color="#2563eb" />
              <Text style={styles.classText}>{cls.course}</Text>
            </View>
            <Text>{cls.date} at {cls.time}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {notifications.map((notification, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.listItem}
            onPress={() => navigation.navigate('Notifications')}  
          >
            <Icon
              name="bell"
              size={20}
              color={notification.type === 'alert' ? 'red' : '#2563eb'}
            />
            <Text style={styles.notificationText}>{notification.message}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
    </BottomMenu>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2fe',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1f2937',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 8,
    fontSize: 16,
  },
  classInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classText: {
    marginLeft: 8,
    fontSize: 16,
  },
  notificationText: {
    marginLeft: 8,
    fontSize: 16,
  },
});

export default Dashboard;
