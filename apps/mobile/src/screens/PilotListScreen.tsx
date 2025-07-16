import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PilotListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>🧑‍✈️ Pilot List Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F8FA' },
  txt: { fontSize: 22, fontWeight: '600', color: '#1C1C1E' },
}); 