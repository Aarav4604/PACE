import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const BORDER_RADIUS = 40;
const BG_URI = 'https://storage.googleapis.com/a1aa/image/ff608d3d-18ce-4d54-3196-fb7b28a955ee.jpg';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: BG_URI }}
        style={styles.background}
        imageStyle={styles.imageStyle}
      >
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  },
  background: {
    width: 390,
    height: 844,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    padding: 32
  },
  imageStyle: {
    borderRadius: BORDER_RADIUS
  },
}); 