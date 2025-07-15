import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LinkBrokerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Link Broker</Text>
      <Text style={styles.subtitle}>Connect your brokerage account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#374151',
    opacity: 0.8,
  },
});

export default LinkBrokerScreen; 