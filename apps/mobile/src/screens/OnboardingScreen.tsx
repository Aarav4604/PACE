import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.root}>
      {/* Decorative background shapes */}
      <LinearGradient colors={["#000", "#1e293b", "#000"]} style={StyleSheet.absoluteFill} />
      <View style={styles.bgDecor1} />
      <View style={styles.bgDecor2} />
      <View style={styles.bgDecor3} />
      <View style={styles.bgDecor4} />
      <View style={styles.bgDecor5} />
      {/* Ambient lighting effect */}
      <LinearGradient
        colors={["rgba(31,41,55,0.2)", "transparent"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      {/* Main content */}
      <View style={styles.contentWrap}>
        {/* Logo/Icon area with depth */}
        <View style={styles.logoWrap}>
          <View style={styles.logoLayer1} />
          <View style={styles.logoLayer2} />
          <View style={styles.logoLayer3} />
          <View style={styles.logoSvgWrap}>
            <Svg width={48} height={48} viewBox="0 0 24 24">
              <Path
                d="M2 18 L7 12 L12 14 L22 6"
                stroke="#111"
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
              />
              <Circle cx={7} cy={12} r={2.5} fill="#111" />
              <Circle cx={12} cy={14} r={2.5} fill="#111" />
              <Circle cx={22} cy={6} r={2.5} fill="#111" />
            </Svg>
          </View>
        </View>
        {/* Headline */}
        <Text style={styles.headline}>
          <Text style={styles.headlineThin}>Trade </Text>
          <Text style={styles.headlineGradient}>Smarter</Text>
          <Text style={styles.headlineDot}>.</Text>
          {"\n"}
          <Text style={styles.headlineThin}>Quickly</Text>
          <Text style={styles.headlineDot2}>.</Text>
          <Text style={styles.headlineLight}> Globally</Text>
          <Text style={styles.headlineDot3}>.</Text>
        </Text>
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Enjoy confident and effortless trading, wherever you are, whenever you need it, <Text style={styles.subtitleBold}>always</Text>.
        </Text>
        {/* CTA Button */}
        <TouchableOpacity
          style={styles.ctaBtn}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.ctaText}>Revolutionize Your Trading</Text>
        </TouchableOpacity>
      </View>
      {/* Bottom indicator with glow */}
      <LinearGradient
        colors={["transparent", "#fff", "transparent"]}
        style={styles.bottomGlow}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 24,
    zIndex: 2,
  },
  logoWrap: {
    marginBottom: 36,
    alignItems: 'center',
    justifyContent: 'center',
    width: 112,
    height: 112,
  },
  logoLayer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 112,
    height: 112,
    borderRadius: 24,
    backgroundColor: '#6b7280',
    opacity: 0.6,
    transform: [{ rotate: '12deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  logoLayer2: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#9ca3af',
    opacity: 0.5,
    transform: [{ rotate: '-6deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  logoLayer3: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#fff',
    opacity: 0.8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  logoSvgWrap: {
    position: 'absolute',
    top: 32,
    left: 32,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 44,
    letterSpacing: 0.5,
  },
  headlineThin: {
    fontWeight: '200',
    color: '#fff',
  },
  headlineGradient: {
    fontWeight: '400',
    color: '#e5e7eb',
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  headlineDot: {
    color: '#d1d5db',
    fontWeight: '400',
  },
  headlineDot2: {
    color: '#9ca3af',
    fontWeight: '400',
  },
  headlineDot3: {
    color: '#6b7280',
    fontWeight: '400',
  },
  headlineLight: {
    fontWeight: '300',
    color: '#e5e7eb',
  },
  subtitle: {
    color: '#d1d5db',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 26,
    fontWeight: '300',
  },
  subtitleBold: {
    color: '#fff',
    fontWeight: '400',
  },
  ctaBtn: {
    backgroundColor: 'rgba(17,24,39,0.85)',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 40,
    marginTop: 8,
    shadowColor: '#fff',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
  },
  ctaText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  // Decorative background shapes
  bgDecor1: {
    position: 'absolute',
    top: 80,
    left: 24,
    width: 100,
    height: 100,
    backgroundColor: '#6b7280',
    borderRadius: 24,
    opacity: 0.5,
    transform: [{ rotate: '12deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    zIndex: 0,
  },
  bgDecor2: {
    position: 'absolute',
    top: 180,
    right: 32,
    width: 70,
    height: 120,
    backgroundColor: '#374151',
    borderRadius: 20,
    opacity: 0.4,
    transform: [{ rotate: '-12deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 0,
  },
  bgDecor3: {
    position: 'absolute',
    bottom: 180,
    left: 16,
    width: 50,
    height: 80,
    backgroundColor: '#9ca3af',
    borderRadius: 16,
    opacity: 0.25,
    transform: [{ rotate: '45deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 0,
  },
  bgDecor4: {
    position: 'absolute',
    top: 140,
    left: 60,
    width: 40,
    height: 60,
    backgroundColor: '#111827',
    borderRadius: 12,
    opacity: 0.18,
    transform: [{ rotate: '6deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 0,
  },
  bgDecor5: {
    position: 'absolute',
    bottom: 120,
    right: 60,
    width: 80,
    height: 40,
    backgroundColor: '#374151',
    borderRadius: 16,
    opacity: 0.22,
    transform: [{ rotate: '-6deg' }],
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 0,
  },
  // Bottom glow indicator
  bottomGlow: {
    position: 'absolute',
    bottom: 32,
    left: width / 2 - 64,
    width: 128,
    height: 8,
    borderRadius: 4,
    opacity: 0.7,
    zIndex: 2,
    shadowColor: '#fff',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
}); 