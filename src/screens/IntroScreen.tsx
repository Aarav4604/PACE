import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../theme/theme';
import { typography } from '../theme/typography';
import PrimaryButton from '../components/PrimaryButton';

const IntroScreen = ({ navigation }: any) => (
  <LinearGradient colors={['#0B0F1C', '#06080F']} style={styles.root}>
    <Image source={require('../assets/hero.png')} style={styles.hero} />
    <View style={styles.textBlock}>
      <Text style={styles.h1}>{`Bank Smarter.\nQuickly. Globally.`}</Text>
      <Text style={styles.sub}>
        Enjoy confident and effortless banking, wherever you are, whenever you need it, always.
      </Text>
    </View>
    <PrimaryButton
      label="Revolutionize Your Banking"
      onPress={() => navigation.replace('Home')}
    />
  </LinearGradient>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.bg,
  },
  hero: {
    width: 220,
    height: 220,
    marginBottom: theme.spacing(8),
    resizeMode: 'contain',
  },
  textBlock: {
    alignItems: 'center',
    marginBottom: theme.spacing(6),
  },
  h1: {
    ...typography.heading,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  sub: {
    ...typography.subBody,
    textAlign: 'center',
    maxWidth: 280,
  },
});

export default IntroScreen; 