import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { theme } from '../theme/theme';
import { typography } from '../theme/typography';
import Pill from './Pill';

const BalanceHeader = ({ amount }: { amount: string }) => (
  <BlurView style={styles.wrap} blurAmount={20} blurType="dark">
    <Text style={styles.balance}>${amount}</Text>
    <View style={styles.ctaRow}>
      <Pill label="+ Top Up" />
      <Pill label="→ Send Money" accent />
    </View>
  </BlurView>
);

const styles = StyleSheet.create({
  wrap: {
    borderRadius: theme.radius.card,
    padding: theme.spacing(5),
    marginHorizontal: theme.spacing(4),
    marginTop: theme.spacing(6),
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    overflow: 'hidden',
  },
  balance: {
    ...typography.heading,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing(3),
  },
  ctaRow: {
    flexDirection: 'row',
    marginTop: theme.spacing(2),
  },
});

export default BalanceHeader; 