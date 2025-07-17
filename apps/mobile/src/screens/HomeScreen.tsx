import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.h1}>Home</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome to PACE</Text>
          <Text style={styles.cardText}>
            Your trading dashboard is coming soon. This is where you'll see your portfolio overview, 
            recent trades, and market insights.
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <Text style={styles.cardText}>
            • View your portfolios{'\n'}
            • Check account settings{'\n'}
            • Monitor market trends
          </Text>
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
  card: {
    width: 340,
    backgroundColor: '#141414',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardText: {
    color: '#8b8b8b',
    fontSize: 16,
    lineHeight: 24,
  },
}); 