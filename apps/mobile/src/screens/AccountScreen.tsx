import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
import { AuthContext } from '../contexts/AuthContext';

export default function AccountScreen() {
  const { user, logout } = React.useContext(AuthContext);
  if (!user) return null;
  return (
    <ScrollView contentContainerStyle={{ padding: 24 }}>
      <BlurView style={styles.card} blurType="dark" blurAmount={40} reducedTransparencyFallbackColor="rgba(0,0,0,0.55)">
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </BlurView>
      <List.Section>
        <List.Item title="Profile" left={props => <List.Icon {...props} icon="account" />} />
        <List.Item title="Security" left={props => <List.Icon {...props} icon="shield-lock" />} />
        <List.Item title="Notifications" left={props => <List.Icon {...props} icon="bell" />} />
        <List.Item title="Settings" left={props => <List.Icon {...props} icon="cog" />} />
        <List.Item title="Logout" onPress={logout} left={props => <List.Icon {...props} icon="logout" />} />
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 24,
    marginBottom: 32,
    overflow: 'hidden',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#B0B0B0',
    fontSize: 16,
    marginBottom: 8,
  },
}); 