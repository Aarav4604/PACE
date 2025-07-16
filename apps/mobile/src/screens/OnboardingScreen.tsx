import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { darkTheme as theme } from '../theme/theme';

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={theme.colors.cardGradient} style={styles.root}>
      <Animated.View style={[styles.logoWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}> 
        {/* Replace with your SVG or PNG logo if available */}
        <View style={styles.logoArt} />
        <Text style={styles.appName}>PACE</Text>
        <Text style={styles.tagline}>Bank Smarter. Quickly. Globally.</Text>
      </Animated.View>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <TouchableOpacity style={styles.ctaBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.ctaText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoArt: {
    width: 120,
    height: 120,
    borderRadius: 32,
    backgroundColor: '#23262F',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
  },
  appName: {
    color: theme.colors.textPrimary,
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
  },
  tagline: {
    color: theme.colors.textSecondary,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaBtn: {
    backgroundColor: theme.colors.accent,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 48,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  ctaText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
}); 