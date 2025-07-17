import React from 'react';
import {
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
} from 'react-native';
import { default as Icon } from 'react-native-vector-icons/Feather';

export default function AccountScreen() {
  const user = {
    name: 'Terry Melton',
    email: 'melton89@gmail.com',
    phone: '+1 201 555-0123',
    address: '70 Rainey St, Austin TX 78701',
    profileImage: 'https://placehold.co/96x96',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>Account</Text>

        <View style={styles.avatarWrap}>
          <Image source={{ uri: user.profileImage }} style={styles.avatar} />
          <TouchableOpacity style={styles.editPen}>
            {React.createElement(Icon as any, { name: "edit-2", size: 16, color: "#000" })}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            {React.createElement(Icon as any, { name: "user", size: 18, color: "#8b8b8b" })}
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user.name}</Text>
          </View>
          <View style={styles.row}>
            {React.createElement(Icon as any, { name: "mail", size: 18, color: "#8b8b8b" })}
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
          <View style={styles.row}>
            {React.createElement(Icon as any, { name: "phone", size: 18, color: "#8b8b8b" })}
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            {React.createElement(Icon as any, { name: "home", size: 18, color: "#8b8b8b" })}
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Address</Text>
              <Text style={styles.value}>{user.address}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scroll: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 120,
  },
  h1: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 32,
  },
  avatarWrap: {
    marginBottom: 32,
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#1f1f1f',
  },
  editPen: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 340,
    backgroundColor: '#141414',
    borderRadius: 24,
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: '#8b8b8b',
    marginRight: 8,
    width: 60,
  },
  value: {
    fontSize: 16,
    color: '#fff',
    flexShrink: 1,
  },
}); 