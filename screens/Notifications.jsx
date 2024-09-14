import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomMenu from '../components/BottomMenu';

const notifications = [
  { message: 'Upcoming class reminder: Mathematics 101', type: 'info' },
  { message: 'Attendance below 75% in Physics 102', type: 'warning' },
  { message: 'System maintenance on September 15th', type: 'alert' },
];

const Notifications = () => {
  const renderNotification = ({ item }) => (
    <View
      style={[
        styles.notificationContainer,
        item.type === 'alert'
          ? styles.alertNotification
          : item.type === 'warning'
          ? styles.warningNotification
          : styles.infoNotification,
      ]}
    >
      <Icon
        name={item.type === 'alert' ? 'exclamation-circle' : item.type === 'warning' ? 'exclamation-circle' : 'info-circle'}
        size={24}
        color={
          item.type === 'alert'
            ? 'red'
            : item.type === 'warning'
            ? 'yellow'
            : 'green'
        }
        style={styles.icon}
      />
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

  return (
    <BottomMenu>
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNotification}
      />
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
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 16,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderLeftWidth: 4,
  },
  alertNotification: {
    borderLeftColor: 'red',
    backgroundColor: '#ffe5e5',
  },
  warningNotification: {
    borderLeftColor: 'yellow',
    backgroundColor: '#fffde5',
  },
  infoNotification: {
    borderLeftColor: 'green',
    backgroundColor: '#e5f1ff',
  },
  icon: {
    marginRight: 10,
  },
  messageText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
});

export default Notifications;
