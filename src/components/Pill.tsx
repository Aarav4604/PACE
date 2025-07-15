import React from 'react';
import { Text, StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface PillProps {
  label: string;
  accent?: boolean;
  style?: ViewStyle;
}

const Pill = ({ label, accent, style }: PillProps) => (
  <View style={[styles.pill, accent && styles.accent, style]}>
    <Text style={[styles.label, accent && styles.accentLabel]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  pill: {
    backgroundColor: theme.colors.card,
    borderRadius: 999,
    paddingHorizontal: theme.spacing(4),
    paddingVertical: theme.spacing(2),
    marginRight: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.card,
  },
  accent: {
    borderColor: theme.colors.accent,
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  accentLabel: {
    color: theme.colors.accent,
  },
});

export default Pill; 