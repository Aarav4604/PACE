import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

const { width, height } = Dimensions.get('window');
const BORDER_RADIUS = 40;

interface SignInScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export default function SignInScreen({ navigation }: SignInScreenProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            'https://storage.googleapis.com/a1aa/image/ff608d3d-18ce-4d54-3196-fb7b28a955ee.jpg',
        }}
        style={styles.background}
        imageStyle={styles.imageStyle}
      >
        {/* Demo button */}
        <View style={styles.topRight}>
          <TouchableOpacity activeOpacity={0.7}>
            <View style={styles.demoButton}>
              <Text style={styles.demoText}>PACE</Text>
              <Text style={styles.chevronText}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Headline & sub-copy */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Easy for{'\n'}
            Beginners,{'\n'}
            Powerful for All
          </Text>

          <View style={styles.subtitleContainer}>
            <Text style={[styles.arrowText, { marginTop: 4 }]}>↗</Text>
            <Text style={styles.subtitle}>
              Effortless Investing for Everyone:{'\n'}
              Discover How Simple Steps{'\n'}
              Can Make Financial Growth Easy
            </Text>
          </View>
        </View>

        {/* Floating CTA pill */}
        <TouchableOpacity
          style={styles.revolutionizeButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.revolutionizeText}>Revolutionize Your Trading</Text>
          <Text style={styles.arrowText}>→</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  /* shell */
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  /* phone mock frame */
  background: {
    width: 390,
    height: 844,
    borderRadius: BORDER_RADIUS,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    padding: 32,
  },
  imageStyle: { borderRadius: BORDER_RADIUS },

  /* top-right demo */
  topRight: { alignItems: 'flex-end' },
  demoButton: { flexDirection: 'row', alignItems: 'center' },
  demoText: { color: 'white', fontSize: 15, fontWeight: '400', marginRight: 4 },
  chevronText: { color: 'white', fontSize: 16, fontWeight: 'bold' },

  /* headline area — fixed position */
  content: {
    position: 'absolute',
    top: 330,      // ⇧ adjust this to move block down/up
    left: 32,
    maxWidth: 280,
  },
  title: {
    color: 'white',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400',
    marginBottom: 24,
  },
  subtitleContainer: { flexDirection: 'row', maxWidth: 280 },
  arrowText: { color: 'white', fontSize: 17, fontWeight: 'bold' },
  subtitle: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    marginLeft: 8,
  },

  /* floating CTA pill */
  revolutionizeButton: {
    position: 'absolute',
    bottom: 150,     // ⇩ raise/lower pill here
    left: 24,
    right: 24,
    zIndex: 1000,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.85)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 24,
    
    // Button effects
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  revolutionizeText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    textShadowColor: 'rgba(255,255,255,0.2)',  // subtle glow
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    },
});
