import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
const FontAwesome5 = require('react-native-vector-icons/FontAwesome5').default;

export default function FloatingNavBar() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        <TouchableOpacity style={styles.btn} accessibilityLabel="Home">
          <FontAwesome5 name="home" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} accessibilityLabel="Portfolios">
          <FontAwesome5 name="gem" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} accessibilityLabel="Account">
          <FontAwesome5 name="th" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // outer wrapper supplies deep shadow
  wrapper: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 24,
  },
  // pill itself
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 40,                    // fully round
    backgroundColor: 'rgba(0,0,0,0.85)', // translucent
    overflow: 'hidden',
  },
  btn: {
    marginHorizontal: 16,
    padding: 12,                         // 44 px hit-area
  },
}); 